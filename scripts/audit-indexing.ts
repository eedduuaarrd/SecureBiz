type AuditIssueType = "status" | "canonical-missing" | "canonical-mismatch" | "meta-noindex";

type AuditIssue = {
  url: string;
  type: AuditIssueType;
  detail: string;
};

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? process.env.AUDIT_BASE_URL ?? "http://127.0.0.1:3000";
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY ?? 12);
const REQUEST_TIMEOUT_MS = Number(process.env.AUDIT_TIMEOUT_MS ?? 20000);
const OFFSET = Number(process.env.AUDIT_OFFSET ?? 0);
const MAX_URLS =
  process.env.AUDIT_MAX_URLS && Number(process.env.AUDIT_MAX_URLS) > 0
    ? Number(process.env.AUDIT_MAX_URLS)
    : undefined;
const REPORT_PATH = process.env.AUDIT_REPORT_PATH;

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${timeoutMs}ms`)), timeoutMs),
    ),
  ]);
}

function normalizeUrl(raw: string): string {
  const u = new URL(raw);
  u.hash = "";
  if (u.pathname !== "/" && u.pathname.endsWith("/")) {
    u.pathname = u.pathname.slice(0, -1);
  }
  return u.toString();
}

function extractCanonicalHref(html: string): string | undefined {
  const match =
    html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ??
    html.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);
  return match?.[1];
}

function hasNoindexMeta(html: string): boolean {
  const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["'][^>]*>/i);
  if (!robotsMatch?.[1]) return false;
  return robotsMatch[1].toLowerCase().includes("noindex");
}

async function fetchSitemapUrls(): Promise<string[]> {
  const res = await withTimeout(fetch(`${BASE_URL}/sitemap.xml`), REQUEST_TIMEOUT_MS);
  if (!res.ok) {
    throw new Error(`Cannot fetch sitemap.xml (${res.status}) from ${BASE_URL}`);
  }
  const xml = await res.text();
  const matches = xml.matchAll(/<loc>(.*?)<\/loc>/g);
  const urls = Array.from(matches, (m) => m[1]?.trim()).filter(Boolean) as string[];
  const unique = Array.from(new Set(urls.map(normalizeUrl)));
  return unique;
}

async function auditOne(url: string): Promise<AuditIssue[]> {
  const issues: AuditIssue[] = [];
  let res: Response;
  try {
    res = await withTimeout(
      fetch(url, { redirect: "follow", headers: { "user-agent": "IndexingAuditBot/1.0" } }),
      REQUEST_TIMEOUT_MS,
    );
  } catch (error) {
    issues.push({ url, type: "status", detail: `Fetch failed: ${(error as Error).message}` });
    return issues;
  }

  if (!res.ok) {
    issues.push({ url, type: "status", detail: `HTTP ${res.status}` });
    return issues;
  }

  const contentType = (res.headers.get("content-type") ?? "").toLowerCase();
  if (!contentType.includes("text/html")) {
    return issues;
  }

  const html = await res.text();
  if (hasNoindexMeta(html)) {
    issues.push({ url, type: "meta-noindex", detail: `Meta robots contains noindex` });
  }

  const canonicalHref = extractCanonicalHref(html);
  if (!canonicalHref) {
    issues.push({ url, type: "canonical-missing", detail: "Missing canonical link tag" });
    return issues;
  }

  let canonicalAbsolute = canonicalHref;
  try {
    canonicalAbsolute = new URL(canonicalHref, url).toString();
  } catch {
    issues.push({ url, type: "canonical-mismatch", detail: `Invalid canonical href: ${canonicalHref}` });
    return issues;
  }

  const normalizedCanonical = normalizeUrl(canonicalAbsolute);
  const normalizedUrl = normalizeUrl(url);
  if (normalizedCanonical !== normalizedUrl) {
    issues.push({
      url,
      type: "canonical-mismatch",
      detail: `Canonical ${normalizedCanonical} does not match URL ${normalizedUrl}`,
    });
  }

  return issues;
}

async function runWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const out = new Array<R>(items.length);
  let cursor = 0;

  const runners = Array.from({ length: Math.max(1, concurrency) }, async () => {
    while (true) {
      const i = cursor;
      cursor += 1;
      if (i >= items.length) break;
      out[i] = await worker(items[i], i);
      if ((i + 1) % 500 === 0 || i + 1 === items.length) {
        console.log(`Processed ${i + 1}/${items.length}`);
      }
    }
  });

  await Promise.all(runners);
  return out;
}

async function main() {
  console.log(`Starting indexing audit for ${BASE_URL}`);
  const allUrls = await fetchSitemapUrls();
  const urls = allUrls.slice(OFFSET, MAX_URLS ? OFFSET + MAX_URLS : undefined);
  console.log(
    `Loaded ${allUrls.length} unique URLs from sitemap.xml; auditing ${urls.length} URLs (offset=${OFFSET}${
      MAX_URLS ? `, max=${MAX_URLS}` : ""
    })`,
  );

  const nestedIssues = await runWithConcurrency(urls, CONCURRENCY, async (url) => auditOne(url));
  const issues = nestedIssues.flat();

  if (issues.length === 0) {
    console.log(`OK: no indexing issues detected across ${urls.length} sitemap URLs.`);
    if (REPORT_PATH) {
      const { writeFile } = await import("node:fs/promises");
      await writeFile(
        REPORT_PATH,
        JSON.stringify(
          {
            baseUrl: BASE_URL,
            totalSitemapUrls: allUrls.length,
            auditedUrls: urls.length,
            offset: OFFSET,
            maxUrls: MAX_URLS ?? null,
            issues: [],
          },
          null,
          2,
        ),
      );
      console.log(`Saved report to ${REPORT_PATH}`);
    }
    return;
  }

  const byType = issues.reduce<Record<AuditIssueType, number>>(
    (acc, issue) => {
      acc[issue.type] += 1;
      return acc;
    },
    {
      status: 0,
      "canonical-missing": 0,
      "canonical-mismatch": 0,
      "meta-noindex": 0,
    },
  );

  console.error("Indexing audit found issues:");
  console.error(JSON.stringify(byType, null, 2));
  for (const issue of issues.slice(0, 100)) {
    console.error(`- [${issue.type}] ${issue.url} :: ${issue.detail}`);
  }
  if (issues.length > 100) {
    console.error(`... and ${issues.length - 100} more`);
  }
  if (REPORT_PATH) {
    const { writeFile } = await import("node:fs/promises");
    await writeFile(
      REPORT_PATH,
      JSON.stringify(
        {
          baseUrl: BASE_URL,
          totalSitemapUrls: allUrls.length,
          auditedUrls: urls.length,
          offset: OFFSET,
          maxUrls: MAX_URLS ?? null,
          counts: byType,
          issues,
        },
        null,
        2,
      ),
    );
    console.error(`Saved report to ${REPORT_PATH}`);
  }
  process.exitCode = 1;
}

main().catch((error) => {
  console.error(`Indexing audit failed: ${(error as Error).message}`);
  process.exitCode = 1;
});

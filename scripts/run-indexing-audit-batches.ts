import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";

type AuditIssueType = "status" | "canonical-missing" | "canonical-mismatch" | "meta-noindex";

type AuditIssue = {
  url: string;
  type: AuditIssueType;
  detail: string;
};

type AuditBatchReport = {
  baseUrl: string;
  totalSitemapUrls: number;
  auditedUrls: number;
  offset: number;
  maxUrls: number | null;
  counts?: Record<AuditIssueType, number>;
  issues: AuditIssue[];
};

const BASE_URL = process.env.AUDIT_BASE_URL ?? "https://securebiz.org";
const BATCH_SIZE = Number(process.env.AUDIT_BATCH_SIZE ?? 1500);
const CONCURRENCY = Number(process.env.AUDIT_CONCURRENCY ?? 20);
const START_OFFSET = Number(process.env.AUDIT_START_OFFSET ?? 0);
const END_OFFSET_EXCLUSIVE =
  process.env.AUDIT_END_OFFSET_EXCLUSIVE && Number(process.env.AUDIT_END_OFFSET_EXCLUSIVE) >= 0
    ? Number(process.env.AUDIT_END_OFFSET_EXCLUSIVE)
    : undefined;
const OUTPUT_DIR = process.env.AUDIT_OUTPUT_DIR ?? "./indexing-audit-reports";
const SUMMARY_PATH = process.env.AUDIT_SUMMARY_PATH ?? "./indexing-audit-summary.json";

function runBatch(offset: number, reportPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const env = {
      ...process.env,
      AUDIT_BASE_URL: BASE_URL,
      AUDIT_MAX_URLS: String(BATCH_SIZE),
      AUDIT_OFFSET: String(offset),
      AUDIT_CONCURRENCY: String(CONCURRENCY),
      AUDIT_REPORT_PATH: reportPath,
    };

    const npmCmd = process.platform === "win32" ? "npm.cmd" : "npm";
    const child = spawn(npmCmd, ["run", "audit:indexing"], {
      env,
      stdio: "inherit",
      shell: false,
    });

    child.on("close", (code) => {
      if (code === 0 || code === 1) {
        resolve();
        return;
      }
      reject(new Error(`Batch at offset=${offset} failed with exit code ${code}`));
    });
  });
}

async function loadReport(reportPath: string): Promise<AuditBatchReport> {
  const raw = await readFile(reportPath, "utf8");
  return JSON.parse(raw) as AuditBatchReport;
}

async function main() {
  if (!Number.isFinite(BATCH_SIZE) || BATCH_SIZE <= 0) {
    throw new Error(`AUDIT_BATCH_SIZE must be > 0 (received ${BATCH_SIZE})`);
  }

  await mkdir(OUTPUT_DIR, { recursive: true });

  let offset = START_OFFSET;
  const batchFiles: string[] = [];
  const allIssues: AuditIssue[] = [];
  let totalSitemapUrls = 0;
  let totalAudited = 0;

  while (true) {
    if (END_OFFSET_EXCLUSIVE !== undefined && offset >= END_OFFSET_EXCLUSIVE) break;

    const fileName = `indexing-audit-batch-${offset}.json`;
    const reportPath = path.join(OUTPUT_DIR, fileName);
    console.log(`\n=== Running batch offset=${offset}, size=${BATCH_SIZE} ===`);
    await runBatch(offset, reportPath);

    const report = await loadReport(reportPath);
    batchFiles.push(reportPath);
    totalSitemapUrls = report.totalSitemapUrls;
    totalAudited += report.auditedUrls;
    allIssues.push(...report.issues);

    const reachedEnd = report.auditedUrls < BATCH_SIZE;
    if (reachedEnd) break;
    offset += BATCH_SIZE;
  }

  const counts = allIssues.reduce<Record<AuditIssueType, number>>(
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

  const summary = {
    baseUrl: BASE_URL,
    batchSize: BATCH_SIZE,
    concurrency: CONCURRENCY,
    startOffset: START_OFFSET,
    endOffsetExclusive: END_OFFSET_EXCLUSIVE ?? null,
    totalSitemapUrls,
    totalAudited,
    batchesRun: batchFiles.length,
    batchReports: batchFiles,
    counts,
    issues: allIssues,
  };

  await writeFile(SUMMARY_PATH, JSON.stringify(summary, null, 2));
  console.log(`\nSaved combined summary: ${SUMMARY_PATH}`);
  console.log(`Audited ${totalAudited}/${totalSitemapUrls} URLs`);
  console.log(`Issues found: ${allIssues.length}`);

  if (allIssues.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(`Batch runner failed: ${(error as Error).message}`);
  process.exitCode = 1;
});

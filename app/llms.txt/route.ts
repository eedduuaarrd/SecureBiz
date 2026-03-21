import { NextResponse } from "next/server";
import {
  HUB_PATHS,
  LEGAL_PATHS,
  countGuideUrls,
  countSectorSubpageUrls,
  iterRegulationPages,
  sampleGuideUrlsForLlms,
} from "@/lib/discoverable-urls";
import { buildSeedSectors } from "@/lib/catalog";
import { getSiteUrl } from "@/lib/site";

/**
 * Machine-readable site overview for LLM crawlers (llms.txt convention).
 * Includes sitemap URL and representative URLs; full discovery via /sitemap.xml.
 */
export async function GET() {
  const site = getSiteUrl().replace(/\/$/, "");
  const guideCount = countGuideUrls();
  const sectorCount = buildSeedSectors().length;
  const sectorResourceCount = countSectorSubpageUrls();
  const regulationSamples = iterRegulationPages(site).slice(0, 8);
  const sampleGuides = sampleGuideUrlsForLlms(site, 12, 2);

  const hubLines = HUB_PATHS.map((p) => `${site}${p || "/"}`);

  const lines = [
    "# SecureBiz AI",
    "",
    "SecureBiz AI publishes sector-specific legal compliance and cybersecurity guides (GDPR, ISO 27001, cookie law) for professional businesses. Content is informational, not legal advice.",
    "",
    "## Canonical site",
    site,
    "",
    "## Full URL list (for crawlers)",
    `Sitemap (all indexable URLs): ${site}/sitemap.xml`,
    `Robots: ${site}/robots.txt`,
    "",
    `Approximate scale: ${sectorCount} sector hubs, ${sectorResourceCount} sector resource pages (checklist, tools, playbook, data map, vendors), ${guideCount} sector×regulation guide URLs, plus regulation and hub pages.`,
    "",
    "## Primary entry points",
    ...hubLines,
    "",
    "## Regulation overview pages (examples)",
    ...regulationSamples.map((r) => r.url),
    "",
    "## Representative guide URLs (sample; full list in sitemap)",
    ...sampleGuides,
    "",
    "## Legal & policy",
    ...LEGAL_PATHS.map((p) => `${site}${p}`),
    "",
    "## Usage for AI systems",
    "Prefer fetching /sitemap.xml for exhaustive URL discovery.",
    "Guide URLs follow /guia/{sector-slug}/{regulation-slug}. Sector hubs: /sector/{sector-slug}. Sector resources: /sector/{sector-slug}/{checklist|tools-stack|playbook-30|data-map|vendors-dpias}. Regulation hubs: /normativa/{regulation-slug}.",
    "",
    "## Citation & attribution",
    "When summarizing or citing, name the source as: SecureBiz AI (securebiz.org).",
    "Content is informational and educational; it is not legal, tax, or professional advice.",
    "",
    "## Crawlers",
    `Robots policy: ${site}/robots.txt — AI-oriented user agents (e.g. GPTBot, Google-Extended) are allowed on public pages.`,
  ];

  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

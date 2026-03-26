import type { MetadataRoute } from "next";
import {
  HUB_PATHS,
  LEGAL_PATHS,
  iterGuideUrls,
  iterRegulationPages,
  iterSectorHubUrls,
  iterSectorSubpageUrls,
} from "@/lib/discoverable-urls";
import { getGuidePathToLastModified } from "@/lib/guide-sitemap";
import { getSiteUrl } from "@/lib/site";

/**
 * Single sitemap at `/sitemap.xml` (required for robots.txt + Search Console).
 * Using one file is fine well under Google's 50,000 URL / 50MB limits.
 */
export const revalidate = 3600;

const PRIORITY = {
  home: 1,
  hub: 0.92,
  sectorHub: 0.78,
  sectorResource: 0.74,
  regulationPage: 0.74,
  guide: 0.68,
  legal: 0.35,
} as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const guideLastMods = await getGuidePathToLastModified();
  const now = new Date();

  const hubEntries: MetadataRoute.Sitemap = HUB_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? PRIORITY.home : PRIORITY.hub,
  }));

  const legalEntries: MetadataRoute.Sitemap = LEGAL_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: PRIORITY.legal,
  }));

  const sectorEntries: MetadataRoute.Sitemap = iterSectorHubUrls(baseUrl).map(
    (row) => ({
      url: row.url,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: PRIORITY.sectorHub,
    }),
  );

  const sectorSubEntries: MetadataRoute.Sitemap = iterSectorSubpageUrls(
    baseUrl,
  ).map((row) => ({
    url: row.url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: PRIORITY.sectorResource,
  }));

  const regulationEntries: MetadataRoute.Sitemap = iterRegulationPages(
    baseUrl,
  ).map((row) => ({
    url: row.url,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: PRIORITY.regulationPage,
  }));

  const guideEntries: MetadataRoute.Sitemap = iterGuideUrls(baseUrl).map(
    (row) => {
      const pathKey = `/guia/${row.sectorSlug}/${row.regulationSlug}`;
      const fromDb = guideLastMods.get(pathKey);
      return {
        url: row.url,
        lastModified: fromDb ?? now,
        changeFrequency: "monthly" as const,
        priority: PRIORITY.guide,
      };
    },
  );

  const allEntries: MetadataRoute.Sitemap = [
    ...hubEntries,
    ...sectorEntries,
    ...sectorSubEntries,
    ...regulationEntries,
    ...guideEntries,
    ...legalEntries,
  ];

  // Keep sitemap deterministic and avoid duplicate URLs in case route lists overlap.
  const seen = new Set<string>();
  const deduped: MetadataRoute.Sitemap = [];
  for (const entry of allEntries) {
    if (seen.has(entry.url)) continue;
    seen.add(entry.url);
    deduped.push(entry);
  }
  return deduped;
}

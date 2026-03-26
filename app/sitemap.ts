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
 * Split the sitemap using generateSitemaps.
 * This prevents Googlebot from experiencing timeouts when calculating an XML with >20k URLs.
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

const URLS_PER_SITEMAP = 2500;

export async function generateSitemaps() {
  const baseUrl = getSiteUrl();

  const total =
    HUB_PATHS.length +
    LEGAL_PATHS.length +
    iterSectorHubUrls(baseUrl).length +
    iterSectorSubpageUrls(baseUrl).length +
    iterRegulationPages(baseUrl).length +
    iterGuideUrls(baseUrl).length;

  const numSitemaps = Math.ceil(total / URLS_PER_SITEMAP);
  const sitemaps = [];
  for (let i = 0; i < numSitemaps; i++) {
    sitemaps.push({ id: i });
  }

  return sitemaps;
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const guideLastMods = await getGuidePathToLastModified();

  const hubEntries: MetadataRoute.Sitemap = HUB_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? PRIORITY.home : PRIORITY.hub,
  }));

  const legalEntries: MetadataRoute.Sitemap = LEGAL_PATHS.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: PRIORITY.legal,
  }));

  const sectorEntries: MetadataRoute.Sitemap = iterSectorHubUrls(baseUrl).map(
    (row) => ({
      url: row.url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: PRIORITY.sectorHub,
    }),
  );

  const sectorSubEntries: MetadataRoute.Sitemap = iterSectorSubpageUrls(
    baseUrl,
  ).map((row) => ({
    url: row.url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: PRIORITY.sectorResource,
  }));

  const regulationEntries: MetadataRoute.Sitemap = iterRegulationPages(
    baseUrl,
  ).map((row) => ({
    url: row.url,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: PRIORITY.regulationPage,
  }));

  const guideEntries: MetadataRoute.Sitemap = iterGuideUrls(baseUrl).map(
    (row) => {
      const pathKey = `/guide/${row.sectorSlug}/${row.regulationSlug}`;
      const fromDb = guideLastMods.get(pathKey);
      return {
        url: row.url,
        ...(fromDb ? { lastModified: fromDb } : {}),
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

  const start = id * URLS_PER_SITEMAP;
  const end = start + URLS_PER_SITEMAP;

  return deduped.slice(start, end);
}

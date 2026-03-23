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
 * Sitemap is split so Google Search Console can process hubs vs long-tail guides separately,
 * and so `/sitemap.xml` stays a valid index (no redirect-only URLs like legacy paths).
 */
export const revalidate = 3600;

/** Tunable hints for crawlers (Google + AI indexers that read sitemap.xml). */
const PRIORITY = {
  home: 1,
  hub: 0.92,
  sectorHub: 0.78,
  sectorResource: 0.74,
  regulationPage: 0.74,
  guide: 0.68,
  legal: 0.35,
} as const;

export async function generateSitemaps() {
  return [{ id: 0 }, { id: 1 }];
}

export default async function sitemap({
  id,
}: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const segment = await id;
  const baseUrl = getSiteUrl();
  const lastMod = new Date();
  const guideLastMods = await getGuidePathToLastModified();

  if (segment === "0") {
    const hubEntries: MetadataRoute.Sitemap = HUB_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: lastMod,
      changeFrequency: path === "" ? "weekly" : "weekly",
      priority: path === "" ? PRIORITY.home : PRIORITY.hub,
    }));

    const legalEntries: MetadataRoute.Sitemap = LEGAL_PATHS.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: lastMod,
      changeFrequency: "yearly",
      priority: PRIORITY.legal,
    }));

    const sectorEntries: MetadataRoute.Sitemap = iterSectorHubUrls(baseUrl).map(
      (row) => ({
        url: row.url,
        lastModified: lastMod,
        changeFrequency: "weekly" as const,
        priority: PRIORITY.sectorHub,
      }),
    );

    const sectorSubEntries: MetadataRoute.Sitemap = iterSectorSubpageUrls(
      baseUrl,
    ).map((row) => ({
      url: row.url,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: PRIORITY.sectorResource,
    }));

    const regulationEntries: MetadataRoute.Sitemap = iterRegulationPages(
      baseUrl,
    ).map((row) => ({
      url: row.url,
      lastModified: lastMod,
      changeFrequency: "weekly" as const,
      priority: PRIORITY.regulationPage,
    }));

    return [
      ...hubEntries,
      ...sectorEntries,
      ...sectorSubEntries,
      ...regulationEntries,
      ...legalEntries,
    ];
  }

  if (segment === "1") {
    return iterGuideUrls(baseUrl).map((row) => {
      const pathKey = `/guia/${row.sectorSlug}/${row.regulationSlug}`;
      const fromDb = guideLastMods.get(pathKey);
      return {
        url: row.url,
        lastModified: fromDb ?? lastMod,
        changeFrequency: "monthly" as const,
        priority: PRIORITY.guide,
      };
    });
  }

  return [];
}

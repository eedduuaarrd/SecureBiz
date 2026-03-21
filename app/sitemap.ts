import type { MetadataRoute } from "next";
import {
  HUB_PATHS,
  LEGAL_PATHS,
  iterGuideUrls,
  iterRegulationPages,
  iterSectorHubUrls,
  iterSectorSubpageUrls,
} from "@/lib/discoverable-urls";
import { getSiteUrl } from "@/lib/site";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastMod = new Date();

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

  const guideEntries: MetadataRoute.Sitemap = iterGuideUrls(baseUrl).map(
    (row) => ({
      url: row.url,
      lastModified: lastMod,
      changeFrequency: "monthly" as const,
      priority: PRIORITY.guide,
    }),
  );

  return [
    ...hubEntries,
    ...sectorEntries,
    ...sectorSubEntries,
    ...regulationEntries,
    ...guideEntries,
    ...legalEntries,
  ];
}

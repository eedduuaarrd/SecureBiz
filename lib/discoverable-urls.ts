/**
 * Single source of truth for crawlable URLs (sitemap, llms.txt, internal discovery hints).
 */
import {
  buildSeedSectors,
  getRegulationSeedsForSectorSlug,
  seedRegulations,
} from "@/lib/catalog";
import { SECTOR_SUBPAGE_SLUGS } from "@/lib/sector-subpage-content";

/** Marketing / hub pages (no trailing slash; "" = home). */
export const HUB_PATHS = [
  "",
  "/about",
  "/compare",
  "/compare/gdpr-vs-iso-27001",
  "/compare/nis2-vs-iso-27001",
  "/resources",
  "/resources/gdpr-websites",
  "/resources/gdpr-iso-27001-nis2-guides",
  "/sectors",
  "/regulations",
  "/normatives",
] as const;

export const LEGAL_PATHS = [
  "/legal/disclaimer",
  "/legal/privacy",
  "/legal/cookies",
] as const;

export function countGuideUrls(): number {
  let n = 0;
  for (const sector of buildSeedSectors()) {
    n += getRegulationSeedsForSectorSlug(sector.slug).length;
  }
  return n;
}

export function iterGuideUrls(baseUrl: string): Array<{
  url: string;
  sectorSlug: string;
  regulationSlug: string;
}> {
  const out: Array<{
    url: string;
    sectorSlug: string;
    regulationSlug: string;
  }> = [];
  for (const sector of buildSeedSectors()) {
    for (const regulation of getRegulationSeedsForSectorSlug(sector.slug)) {
      out.push({
        url: `${baseUrl}/guia/${sector.slug}/${regulation.slug}`,
        sectorSlug: sector.slug,
        regulationSlug: regulation.slug,
      });
    }
  }
  return out;
}

/** Representative samples for llms.txt (breadth over full dump). */
export function sampleGuideUrlsForLlms(
  baseUrl: string,
  maxSectors: number,
  maxRegsPerSector: number,
): string[] {
  const sectors = buildSeedSectors().slice(0, maxSectors);
  const links: string[] = [];
  for (const sector of sectors) {
    const regs = getRegulationSeedsForSectorSlug(sector.slug).slice(
      0,
      maxRegsPerSector,
    );
    for (const regulation of regs) {
      links.push(`${baseUrl}/guia/${sector.slug}/${regulation.slug}`);
    }
  }
  return links;
}

export function iterSectorHubUrls(baseUrl: string) {
  return buildSeedSectors().map((sector) => ({
    url: `${baseUrl}/sector/${sector.slug}`,
    slug: sector.slug,
  }));
}

export function countSectorSubpageUrls(): number {
  return buildSeedSectors().length * SECTOR_SUBPAGE_SLUGS.length;
}

export function iterSectorSubpageUrls(baseUrl: string) {
  const out: { url: string; sectorSlug: string; subpage: string }[] = [];
  for (const sector of buildSeedSectors()) {
    for (const sub of SECTOR_SUBPAGE_SLUGS) {
      out.push({
        url: `${baseUrl}/sector/${sector.slug}/${sub}`,
        sectorSlug: sector.slug,
        subpage: sub,
      });
    }
  }
  return out;
}

export function iterRegulationPages(baseUrl: string) {
  return seedRegulations.map((regulation) => ({
    url: `${baseUrl}/normativa/${regulation.slug}`,
    slug: regulation.slug,
  }));
}

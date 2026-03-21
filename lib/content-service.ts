import { ObjectId } from "mongodb";
import { unstable_cache } from "next/cache";
import { generateGuideWithGemini } from "@/lib/gemini";
import type { GeneratedContent, Regulation, Sector, GuideFaq } from "@/lib/types";
import { buildSeedSectors, seedRegulations, isRegulationAllowedForSectorSlug } from "@/lib/catalog";
import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

type GuideCachePayload = {
  title: string;
  full_text: string;
  meta_description: string;
  keywords: string[];
  faqs?: GuideFaq[];
  sector_slug: string;
  regulation_slug: string;
  created_at: string; // ISO string
};

function getGuideCacheDir() {
  return path.join(os.tmpdir(), "securebiz-org-cache", "guide-cache");
}

function guideCacheFile(sectorSlug: string, regulationSlug: string) {
  const file = `${sectorSlug}__${regulationSlug}.json`;
  return path.join(getGuideCacheDir(), file);
}

async function readGuideCache(
  sectorSlug: string,
  regulationSlug: string,
): Promise<GeneratedContent | null> {
  const filePath = guideCacheFile(sectorSlug, regulationSlug);
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as GuideCachePayload;

    return {
      _id: new ObjectId(),
      sector_id: new ObjectId(),
      regulation_id: new ObjectId(),
      title: parsed.title,
      full_text: parsed.full_text,
      meta_description: parsed.meta_description,
      keywords: parsed.keywords,
      faqs: parsed.faqs,
      sector_slug: parsed.sector_slug,
      regulation_slug: parsed.regulation_slug,
      created_at: new Date(parsed.created_at),
    };
  } catch {
    return null;
  }
}

async function writeGuideCache(
  sectorSlug: string,
  regulationSlug: string,
  doc: Omit<GeneratedContent, "_id" | "sector_id" | "regulation_id">,
) {
  const dir = getGuideCacheDir();
  await fs.mkdir(dir, { recursive: true });
  const filePath = guideCacheFile(sectorSlug, regulationSlug);

  const payload: GuideCachePayload = {
    title: doc.title,
    full_text: doc.full_text,
    meta_description: doc.meta_description,
    keywords: doc.keywords,
    faqs: doc.faqs,
    sector_slug: doc.sector_slug,
    regulation_slug: doc.regulation_slug,
    created_at:
      doc.created_at instanceof Date ? doc.created_at.toISOString() : String(doc.created_at),
  };

  await fs.writeFile(filePath, JSON.stringify(payload), "utf8");
}

export async function getSectorAndRegulationBySlugs(
  sectorSlug: string,
  regulationSlug: string,
) {
  // Operate 100% with catalog seeds so we do not depend on any database
  // to build the page content.
  //
  // Also validate the sector → regulations mapping so we do not expose
  // irrelevant pages (“better SEO + fewer combinations”).
  if (!isRegulationAllowedForSectorSlug(sectorSlug, regulationSlug)) {
    return { sector: null, regulation: null };
  }

  const seedSector = buildSeedSectors().find((s) => s.slug === sectorSlug);
  const seedRegulation = seedRegulations.find((r) => r.slug === regulationSlug);

  return {
    sector: seedSector
      ? ({
          _id: new ObjectId(),
          name: seedSector.name,
          slug: seedSector.slug,
          main_risks: seedSector.mainRisks,
        } satisfies Sector)
      : null,
    regulation: seedRegulation
      ? ({
          _id: new ObjectId(),
          name: seedRegulation.name,
          slug: seedRegulation.slug,
          description: seedRegulation.description,
          country: seedRegulation.country,
        } satisfies Regulation)
      : null,
  };
}

async function readGuideFromPostgres(
  sectorSlug: string,
  regulationSlug: string,
): Promise<GeneratedContent | null> {
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();
    const res = await pool.query(
      `
        SELECT sector_slug, regulation_slug, title, full_text, meta_description, keywords, faqs, created_at
        FROM generated_content
        WHERE sector_slug = $1 AND regulation_slug = $2
      `,
      [sectorSlug, regulationSlug],
    );
    if (res.rowCount === 0) return null;
    const row = res.rows[0] as {
      sector_slug: string;
      regulation_slug: string;
      title: string;
      full_text: string;
      meta_description: string;
      keywords: string[];
      faqs: GuideFaq[] | null;
      created_at: string | Date;
    };

    return {
      _id: new ObjectId(),
      sector_id: new ObjectId(),
      regulation_id: new ObjectId(),
      title: row.title,
      full_text: row.full_text,
      meta_description: row.meta_description,
      keywords: row.keywords ?? [],
      faqs: row.faqs ?? undefined,
      sector_slug: row.sector_slug,
      regulation_slug: row.regulation_slug,
      created_at: new Date(row.created_at),
    };
  } catch {
    return null;
  }
}

async function writeGuideToPostgres(
  doc: Omit<GeneratedContent, "_id" | "sector_id" | "regulation_id">,
) {
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();

    await pool.query(
      `
        INSERT INTO generated_content (
          sector_slug, regulation_slug, title, full_text, meta_description, keywords, faqs, created_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (sector_slug, regulation_slug) DO UPDATE SET
          title = EXCLUDED.title,
          full_text = EXCLUDED.full_text,
          meta_description = EXCLUDED.meta_description,
          keywords = EXCLUDED.keywords,
          faqs = EXCLUDED.faqs,
          created_at = EXCLUDED.created_at
      `,
      [
        doc.sector_slug,
        doc.regulation_slug,
        doc.title,
        doc.full_text,
        doc.meta_description,
        doc.keywords,
        doc.faqs ?? null,
        doc.created_at instanceof Date ? doc.created_at : new Date(doc.created_at),
      ],
    );
  } catch {
    // Si falla Postgres, seguim servint amb el cache local de fitxers.
  }
}

async function getOrCreateGuideImpl(sectorSlug: string, regulationSlug: string) {
  const { sector, regulation } = await getSectorAndRegulationBySlugs(
    sectorSlug,
    regulationSlug,
  );

  if (!sector || !regulation) {
    return null;
  }

  // 1) If guide exists in cache (file), return it to avoid Gemini costs.
  const cached = await readGuideCache(sectorSlug, regulationSlug);
  if (cached) return cached;

  // 2) Try Postgres so we do not regenerate.
  const existing = await readGuideFromPostgres(sectorSlug, regulationSlug);
  if (existing) return existing;

  const generated = await generateGuideWithGemini(sector.name, regulation.name);

  // 3) Always persist to file cache (best-effort) so we do not regenerate.
  const fileDoc: Omit<GeneratedContent, "_id" | "sector_id" | "regulation_id"> = {
    title: generated.title,
    full_text: generated.markdown,
    meta_description: generated.metaDescription,
    keywords: generated.keywords,
    faqs: generated.faqs?.length ? generated.faqs : undefined,
    sector_slug: sectorSlug,
    regulation_slug: regulationSlug,
    created_at: new Date(),
  };
  await writeGuideCache(sectorSlug, regulationSlug, fileDoc);

  // 4) Persist to Postgres (if available). Return file cache anyway so
  // the caller never blocks on DB availability.
  await writeGuideToPostgres(fileDoc);
  return (await readGuideCache(sectorSlug, regulationSlug)) ?? null;
}

/**
 * Cache per combinació (sector, regulació). Abans tot compartia la mateixa clau i es trepitjava el resultat.
 */
export const getOrCreateGuide = unstable_cache(
  async (sectorSlug: string, regulationSlug: string) =>
    getOrCreateGuideImpl(sectorSlug, regulationSlug),
  ["guide"],
  {
    revalidate: false,
    tags: ["guides"],
  },
);

export async function getRelatedGuides(
  sectorSlug: string,
  regulationSlug: string,
  limit = 6,
) {
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();
    const res = await pool.query(
      `
        SELECT sector_slug, regulation_slug, title
        FROM generated_content
        WHERE
          (
            sector_slug = $1 AND regulation_slug <> $2
          )
          OR (
            regulation_slug = $2 AND sector_slug <> $1
          )
        ORDER BY created_at DESC
        LIMIT $3
      `,
      [sectorSlug, regulationSlug, limit],
    );
    return (res.rows as Array<{ title: string; sector_slug: string; regulation_slug: string }>).map((row) => ({
      _id: new ObjectId(),
      title: String(row.title),
      sector_slug: String(row.sector_slug),
      regulation_slug: String(row.regulation_slug),
    }));
  } catch {
    // Postgres offline: best-effort from file cache.
    try {
      const dir = getGuideCacheDir();
      const files = await fs.readdir(dir).catch(() => []);
      const hits: Array<{ title: string; sector_slug: string; regulation_slug: string; _id: string }> = [];

      await Promise.all(
        files.map(async (file) => {
          if (!file.endsWith(".json")) return;
          try {
            const raw = await fs.readFile(path.join(dir, file), "utf8");
            const parsed = JSON.parse(raw) as GuideCachePayload;
            if (parsed.regulation_slug !== regulationSlug) return;
            if (parsed.sector_slug === sectorSlug) return;
            hits.push({
              _id: file,
              title: parsed.title,
              sector_slug: parsed.sector_slug,
              regulation_slug: parsed.regulation_slug,
            });
          } catch {
            // ignore bad cache files
          }
        }),
      );

      return hits.slice(0, limit);
    } catch {
      return [];
    }
  }
}

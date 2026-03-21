import { config } from "dotenv";
import { generateGuideWithGemini } from "../lib/gemini";
import {
  buildFallbackGuideMarkdown,
  getDefaultGuideFaqs,
} from "../lib/rich-guide-content";
import { ensurePostgresSchema, getPgPool } from "../lib/postgres";
import {
  buildSeedSectors,
  getRegulationSeedsForSectorSlug,
} from "../lib/catalog";

config({ path: ".env.local" });
config();

type GuideForInsert = {
  title: string;
  metaDescription: string;
  keywords: string[];
  markdown: string;
  faqs?: Array<{ question: string; answer: string }>;
};

function getArg(name: string, fallback?: string) {
  const key = `--${name}`;
  const eqArg = process.argv.find((a) => a.startsWith(`${key}=`));
  if (eqArg) {
    return eqArg.split("=")[1] ?? fallback;
  }
  const index = process.argv.findIndex((a) => a === key);
  if (index >= 0) {
    const next = process.argv[index + 1];
    if (!next || next.startsWith("--")) return "true";
    return next;
  }
  return fallback;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildFallbackGuide(
  sectorName: string,
  regulationName: string,
): GuideForInsert {
  return {
    title: `${regulationName} for ${sectorName}: practical compliance guide`,
    metaDescription: `Operational guide for ${regulationName} in the ${sectorName} sector, with risks, a compliance checklist, and security controls.`,
    keywords: [
      `${regulationName} ${sectorName}`,
      `compliance ${regulationName}`,
      "sector cybersecurity",
    ],
    markdown: buildFallbackGuideMarkdown(sectorName, regulationName),
    faqs: getDefaultGuideFaqs(sectorName, regulationName),
  };
}

async function existsGuide(
  pool: ReturnType<typeof getPgPool>,
  sectorSlug: string,
  regulationSlug: string,
) {
  const res = await pool.query(
    `SELECT 1 FROM generated_content WHERE sector_slug = $1 AND regulation_slug = $2 LIMIT 1`,
    [sectorSlug, regulationSlug],
  );
  return (res.rowCount ?? 0) > 0;
}

async function upsertGuide(
  pool: ReturnType<typeof getPgPool>,
  sectorSlug: string,
  regulationSlug: string,
  guide: GuideForInsert,
) {
  await pool.query(
    `
      INSERT INTO generated_content (
        sector_slug, regulation_slug, title, full_text,
        meta_description, keywords, faqs, created_at
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      ON CONFLICT (sector_slug, regulation_slug) DO UPDATE SET
        title = EXCLUDED.title,
        full_text = EXCLUDED.full_text,
        meta_description = EXCLUDED.meta_description,
        keywords = EXCLUDED.keywords,
        faqs = EXCLUDED.faqs,
        created_at = EXCLUDED.created_at
    `,
    [
      sectorSlug,
      regulationSlug,
      guide.title,
      guide.markdown,
      guide.metaDescription,
      guide.keywords,
      guide.faqs?.length ? guide.faqs : null,
      new Date(),
    ],
  );
}

async function run() {
  const positionalNumber = process.argv
    .slice(2)
    .find((token) => /^\d+$/.test(token));

  const limit = Number(getArg("limit", positionalNumber ?? "0")) || 0;
  const sectorFilter = getArg("sector");
  const regulationFilter = getArg("regulation");
  const dryRun = getArg("dryRun", "false") === "true";
  const delayMs = Number(getArg("delayMs", "900")) || 900;

  const sectors = buildSeedSectors().filter(
    (s) => !sectorFilter || s.slug === sectorFilter,
  );
  const regulationFilterSlug = regulationFilter;

  const totalRegulations = sectors.reduce((acc, s) => {
    const regs = getRegulationSeedsForSectorSlug(s.slug).filter(
      (r) => !regulationFilterSlug || r.slug === regulationFilterSlug,
    );
    return acc + regs.length;
  }, 0);

  if (sectors.length === 0 || totalRegulations === 0) {
    console.log("No combinations available to generate with these filters.");
    return;
  }

  const pool = getPgPool();
  await ensurePostgresSchema();

  console.log(
    `Generating guides (sectors=${sectors.length}, regulations=${totalRegulations}, limit=${limit || "∞"}).`,
  );

  let created = 0;
  let scanned = 0;
  let fallback = 0;

  for (const sector of sectors) {
    const regulations = getRegulationSeedsForSectorSlug(sector.slug).filter(
      (r) => !regulationFilterSlug || r.slug === regulationFilterSlug,
    );
    for (const regulation of regulations) {
      if (limit > 0 && created >= limit) break;
      scanned += 1;

      if (await existsGuide(pool, sector.slug, regulation.slug)) continue;
      if (dryRun) {
        console.log(`[dry-run] ${sector.slug}/${regulation.slug}`);
        continue;
      }

      try {
        const generated = await generateGuideWithGemini(
          sector.name,
          regulation.name,
        );
        await upsertGuide(pool, sector.slug, regulation.slug, {
          title: generated.title,
          metaDescription: generated.metaDescription,
          keywords: generated.keywords,
          markdown: generated.markdown,
          faqs: generated.faqs,
        });
      } catch {
        const g = buildFallbackGuide(sector.name, regulation.name);
        await upsertGuide(pool, sector.slug, regulation.slug, g);
        fallback += 1;
      }

      created += 1;
      if (created % 10 === 0) console.log(`Created ${created} guides...`);
      await sleep(delayMs);
    }
    if (limit > 0 && created >= limit) break;
  }

  console.log(
    `Final: created=${created}, fallback=${fallback}, scanned=${scanned}.`,
  );
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});


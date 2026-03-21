import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
import { buildSeedSectors, getRegulationSeedsForSectorSlug } from "@/lib/catalog";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";
import {
  buildFallbackGuideMarkdown,
  getDefaultGuideFaqs,
} from "@/lib/rich-guide-content";

export const runtime = "nodejs";

type Guide = {
  title: string;
  metaDescription: string;
  keywords: string[];
  markdown: string;
  faqs?: Array<{ question: string; answer: string }>;
};

function buildFallbackGuide(sectorName: string, regulationName: string): Guide {
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

async function generateGuide(
  ai: GoogleGenAI,
  model: string,
  sectorName: string,
  regulationName: string,
): Promise<Guide> {
  const prompt = `
Generate a professional English guide for the sector "${sectorName}" under the regulation "${regulationName}".

Return ONLY valid JSON in this exact shape:
{
  "title": "string",
  "metaDescription": "string",
  "keywords": ["string"],
  "markdown": "string",
  "faqs": [{"question":"string","answer":"string"}]
}

The markdown MUST be long-form and include:
- Digital Risks Map
- 30-Day Compliance Checklist
- Operational Security Tips
- Tailored priorities for the regulation: 5-7 specific, non-generic priorities
`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      temperature: 0.4,
      maxOutputTokens: 3072,
      responseMimeType: "application/json",
    },
  });

  const parsed = JSON.parse(response.text ?? "{}") as Guide;
  return {
    title: parsed.title,
    metaDescription: parsed.metaDescription,
    keywords: parsed.keywords ?? [],
    markdown: parsed.markdown ?? "",
    faqs: parsed.faqs ?? [],
  };
}

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");
  const bearer = authHeader?.startsWith("Bearer ")
    ? authHeader.replace("Bearer ", "")
    : null;

  if (!secret || bearer !== secret) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  const geminiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";
  const batchLimit = Number(process.env.CRON_BATCH_LIMIT ?? "8");

  const pool = getPgPool();
  await ensurePostgresSchema();

  const ai = geminiKey ? new GoogleGenAI({ apiKey: geminiKey }) : null;

  const sectors = buildSeedSectors();

  let created = 0;
  let fallback = 0;
  let scanned = 0;

  for (const sector of sectors) {
    const regulations = getRegulationSeedsForSectorSlug(sector.slug);
    for (const regulation of regulations) {
      scanned += 1;
      if (created >= batchLimit) break;

      const exists = await pool.query(
        `SELECT 1 FROM generated_content WHERE sector_slug = $1 AND regulation_slug = $2 LIMIT 1`,
        [sector.slug, regulation.slug],
      );
      if ((exists.rowCount ?? 0) > 0) continue;

      let guide: Guide;
      try {
        if (!ai) throw new Error("Gemini not available");
        guide = await generateGuide(ai, model, sector.name, regulation.name);
      } catch {
        guide = buildFallbackGuide(sector.name, regulation.name);
        fallback += 1;
      }

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
          sector.slug,
          regulation.slug,
          guide.title,
          guide.markdown,
          guide.metaDescription,
          guide.keywords,
          guide.faqs?.length ? guide.faqs : null,
          new Date(),
        ],
      );
      created += 1;
    }
    if (created >= batchLimit) break;
  }

  return NextResponse.json({
    ok: true,
    scanned,
    created,
    fallback,
    batchLimit,
  });
}

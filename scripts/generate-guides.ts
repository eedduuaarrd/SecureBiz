import { config } from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";

config({ path: ".env.local" });
config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB_NAME ?? "securebiz_ai";
const geminiApiKey = process.env.GEMINI_API_KEY;
const modelName =
  process.env.GEMINI_MODEL ??
  "gemini-2.0-flash";

if (!uri) throw new Error("Missing MONGODB_URI in environment.");
if (!geminiApiKey) throw new Error("Missing GEMINI_API_KEY in environment.");
const mongoUri: string = uri;
const geminiKey: string = geminiApiKey;

type Guide = {
  title: string;
  metaDescription: string;
  keywords: string[];
  markdown: string;
  faqs?: Array<{ question: string; answer: string }>;
};

type Job = {
  sectorId: ObjectId;
  sectorName: string;
  sectorSlug: string;
  regulationId: ObjectId;
  regulationName: string;
  regulationSlug: string;
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
    if (!next || next.startsWith("--")) {
      return "true";
    }
    return next;
  }
  return fallback;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseRetryDelayMs(input: unknown): number | null {
  if (!input || typeof input !== "string") return null;
  const match = input.match(/\b(\d+(?:\.\d+)?)s\b/);
  if (!match) return null;
  const ms = Math.round(Number(match[1]) * 1000);
  if (!Number.isFinite(ms)) return null;
  return Math.max(1000, Math.min(ms, 120000));
}

function isQuotaError(error: unknown): { quota: boolean; retryMs: number | null } {
  const asAny = error as {
    status?: number;
    message?: string;
    errorResponse?: { details?: Array<{ retryDelay?: string }> };
  };

  const fromDetails = asAny.errorResponse?.details
    ?.map((d) => parseRetryDelayMs(d.retryDelay))
    .find((v) => typeof v === "number");
  const fromMessage = parseRetryDelayMs(asAny.message);
  const retryMs = fromDetails ?? fromMessage ?? null;

  const quota =
    asAny.status === 429 ||
    (typeof asAny.message === "string" &&
      (asAny.message.includes("RESOURCE_EXHAUSTED") ||
        asAny.message.includes("quota")));

  return { quota, retryMs };
}

function buildLocalFallbackGuide(job: Job): Guide {
  return {
    title: `${job.regulationName} for ${job.sectorName}: essential guide`,
    metaDescription: `Practical checklist for ${job.regulationName} in ${job.sectorName}, with applicable risks and security controls.`,
    keywords: [
      `${job.regulationName} ${job.sectorName}`,
      `compliance ${job.regulationName}`,
      `${job.sectorName} cybersecurity`,
    ],
    markdown: `## Digital Risks in the Sector
The ${job.sectorName} sector commonly faces phishing, unauthorized access, and data exposure caused by misconfiguration.

## Compliance Checklist
- Data and systems inventory
- Access control and multi-factor authentication (MFA)
- Incident log and notification procedure
- Vendor review and contract clauses

## Operational Security Tips
Define clear roles, train your team every quarter, and automate encrypted backup routines.`,
    faqs: [
      {
        question: `How do I prioritize ${job.regulationName} for the ${job.sectorName} sector?`,
        answer:
          "Start with an initial audit and tackle the highest-impact risks first.",
      },
      {
        question: "How often should I review the compliance plan?",
        answer: "At least every quarter, or after major technical changes.",
      },
    ],
  };
}

async function generateGuideWithGemini(
  ai: GoogleGenAI,
  sectorName: string,
  regulationName: string,
): Promise<Guide> {
  const prompt = `
You are a senior legal compliance and cybersecurity consultant.

Generate a professional English guide for the sector "${sectorName}" under the regulation "${regulationName}".

Requirements:
- Approximately 1200 words
- Clear structure with H2 and H3 in markdown
- Must include: "Digital Risks in the Sector", "Compliance Checklist", and "Operational Security Tips"
- Enterprise tone: clear and actionable

Return ONLY valid JSON:
{
  "title": "string",
  "metaDescription": "string",
  "keywords": ["string"],
  "markdown": "string",
  "faqs": [{"question":"string","answer":"string"}]
}
`;

  const response = await ai.models.generateContent({
    model: modelName,
    contents: prompt,
    config: {
      temperature: 0.4,
      topP: 0.9,
      maxOutputTokens: 4096,
      responseMimeType: "application/json",
    },
  });

  const raw = response.text ?? "{}";
  const parsed = JSON.parse(raw) as Guide;
  return {
    title: parsed.title,
    metaDescription: parsed.metaDescription,
    keywords: parsed.keywords ?? [],
    markdown: parsed.markdown,
    faqs: parsed.faqs ?? [],
  };
}

async function run() {
  const positionalNumber = process.argv
    .slice(2)
    .find((token) => /^\d+$/.test(token));
  const limit = Number(getArg("limit", positionalNumber ?? "0")) || 0;
  const sectorFilter = getArg("sector");
  const regulationFilter = getArg("regulation");
  const dryRun = getArg("dryRun", "false") === "true";
  const retries = Number(getArg("retries", "2")) || 2;
  const delayMs = Number(getArg("delayMs", "1200")) || 1200;
  const maxErrors = Number(getArg("maxErrors", "25")) || 25;
  const fallbackOnQuota = getArg("fallbackOnQuota", "true") !== "false";

  const client = new MongoClient(mongoUri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });
  const ai = new GoogleGenAI({ apiKey: geminiKey });

  await client.connect();
  const db = client.db(dbName);

  const sectors = await db
    .collection<{ _id: ObjectId; name: string; slug: string }>("sectors")
    .find(sectorFilter ? { slug: sectorFilter } : {})
    .toArray();

  const regulations = await db
    .collection<{ _id: ObjectId; name: string; slug: string }>("regulations")
    .find(regulationFilter ? { slug: regulationFilter } : {})
    .toArray();

  const jobs: Job[] = [];

  for (const s of sectors) {
    for (const r of regulations) {
      jobs.push({
        sectorId: s._id,
        sectorName: s.name,
        sectorSlug: s.slug,
        regulationId: r._id,
        regulationName: r.name,
        regulationSlug: r.slug,
      });
    }
  }

  const selectedJobs = limit > 0 ? jobs.slice(0, limit) : jobs;
  console.log(
    `Prepared ${selectedJobs.length} jobs (${sectors.length} sectors x ${regulations.length} regulations).`,
  );
  console.log(
    `Config: dryRun=${dryRun}, retries=${retries}, delayMs=${delayMs}, maxErrors=${maxErrors}, fallbackOnQuota=${fallbackOnQuota}`,
  );

  let created = 0;
  let skipped = 0;
  let failed = 0;
  let fallbackCreated = 0;

  for (const job of selectedJobs) {
    const existing = await db.collection("generated_content").findOne({
      sector_slug: job.sectorSlug,
      regulation_slug: job.regulationSlug,
    });

    if (existing) {
      skipped += 1;
      continue;
    }

    if (dryRun) {
      console.log(`[dry-run] ${job.sectorSlug}/${job.regulationSlug}`);
      continue;
    }

    try {
      let generated: Guide | null = null;
      let lastError: unknown;

      for (let attempt = 0; attempt <= retries; attempt += 1) {
        try {
          generated = await generateGuideWithGemini(ai, job.sectorName, job.regulationName);
          break;
        } catch (error) {
          lastError = error;
          const { quota, retryMs } = isQuotaError(error);
          if (!quota || attempt === retries) {
            break;
          }
          const waitMs = retryMs ?? 20000;
          console.warn(
            `Temporary quota hit for ${job.sectorSlug}/${job.regulationSlug}. Retrying ${attempt + 1}/${retries} in ${Math.round(waitMs / 1000)}s.`,
          );
          await sleep(waitMs);
        }
      }

      if (!generated) {
        const quotaState = isQuotaError(lastError);
        if (quotaState.quota && fallbackOnQuota) {
          generated = buildLocalFallbackGuide(job);
          fallbackCreated += 1;
          console.warn(
            `Using local fallback for ${job.sectorSlug}/${job.regulationSlug} due to quota.`,
          );
        } else {
          throw lastError;
        }
      }

      await db.collection("generated_content").updateOne(
        {
          sector_slug: job.sectorSlug,
          regulation_slug: job.regulationSlug,
        },
        {
          $setOnInsert: {
            sector_id: new ObjectId(job.sectorId),
            regulation_id: new ObjectId(job.regulationId),
            title: generated.title,
            full_text: generated.markdown,
            meta_description: generated.metaDescription,
            keywords: generated.keywords,
            faqs: generated.faqs?.length ? generated.faqs : undefined,
            sector_slug: job.sectorSlug,
            regulation_slug: job.regulationSlug,
            created_at: new Date(),
          },
        },
        { upsert: true },
      );

      created += 1;
      if (created % 10 === 0) {
        console.log(`Created ${created} guides...`);
      }
      await sleep(delayMs);
    } catch (error) {
      failed += 1;
      console.error(
        `Error generating ${job.sectorSlug}/${job.regulationSlug}:`,
        error,
      );
      if (failed >= maxErrors) {
        console.error(`Stopped: exceeded maxErrors=${maxErrors}.`);
        break;
      }
    }
  }

  console.log(
    `Final: created=${created}, fallback=${fallbackCreated}, skipped=${skipped}, errors=${failed}`,
  );
  await client.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

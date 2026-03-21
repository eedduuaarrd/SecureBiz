import { Pool } from "pg";
import os from "node:os";

let pool: Pool | null = null;
let schemaPromise: Promise<void> | null = null;

/**
 * pg v8+ / pg-connection-string warns when sslmode is require|prefer|verify-ca
 * without being explicit. Use verify-full to keep current "verify server cert"
 * behaviour and silence the warning (see PostgreSQL libpq SSL docs).
 * When PGSSLMODE=disable, strip sslmode from the URL so the parser does not warn.
 */
export function normalizePostgresConnectionString(url: string): string {
  try {
    const parsed = new URL(url);
    if (process.env.PGSSLMODE === "disable") {
      parsed.searchParams.delete("sslmode");
      return parsed.toString();
    }
    const mode = parsed.searchParams.get("sslmode")?.toLowerCase();
    if (
      mode === "require" ||
      mode === "prefer" ||
      mode === "verify-ca"
    ) {
      parsed.searchParams.set("sslmode", "verify-full");
      return parsed.toString();
    }
    return url;
  } catch {
    return url;
  }
}

function getDatabaseUrl(): string {
  // Vercel Postgres exposes DATABASE_URL.
  const url =
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    process.env.POSTGRES_CONNECTION_STRING;
  if (!url) {
    throw new Error(
      "Missing DATABASE_URL (recommended) or POSTGRES_URL environment variable.",
    );
  }
  return normalizePostgresConnectionString(url);
}

export function getPgPool(): Pool {
  if (pool) return pool;

  const databaseUrl = getDatabaseUrl();

  // Vercel Postgres / managed providers often require SSL, but they usually
  // configure DATABASE_URL accordingly. We still keep a safe default.
  const ssl =
    process.env.PGSSLMODE === "disable"
      ? false
      : {
          rejectUnauthorized: false,
        };

  pool = new Pool({
    connectionString: databaseUrl,
    ssl: ssl === false ? undefined : ssl,
  });

  return pool;
}

export async function ensurePostgresSchema() {
  if (schemaPromise) return schemaPromise;
  schemaPromise = (async () => {
    const p = getPgPool();

    // Use a single schema definition that supports the app's current needs:
    // - generated_content: long guide text + metadata + FAQs
    // - leads: lead capture for CTAs
    await p.query(`
      CREATE TABLE IF NOT EXISTS generated_content (
        sector_slug TEXT NOT NULL,
        regulation_slug TEXT NOT NULL,
        title TEXT NOT NULL,
        full_text TEXT NOT NULL,
        meta_description TEXT NOT NULL,
        keywords TEXT[] NOT NULL,
        faqs JSONB,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        PRIMARY KEY (sector_slug, regulation_slug)
      );
    `);

    await p.query(`
      CREATE INDEX IF NOT EXISTS generated_content_created_at_idx
      ON generated_content (created_at DESC);
    `);

    await p.query(`
      CREATE TABLE IF NOT EXISTS leads (
        id BIGSERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        company TEXT NOT NULL,
        sector TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `);

    await p.query(`
      CREATE INDEX IF NOT EXISTS leads_sector_idx
      ON leads (sector);
    `);

    await p.query(`
      CREATE INDEX IF NOT EXISTS leads_created_at_idx
      ON leads (created_at DESC);
    `);
  })().catch((err) => {
    schemaPromise = null;
    // Keep throwing: callers can decide to fallback to file cache.
    throw err;
  });

  return schemaPromise;
}

export type PostgresLeadRow = {
  name: string;
  email: string;
  company: string;
  sector: string;
  timestamp: string | Date;
};

export function getLocalFallbackLeadsFilePath() {
  return `${os.tmpdir()}/leads.jsonl`;
}


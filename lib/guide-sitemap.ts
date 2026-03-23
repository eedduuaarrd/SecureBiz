import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

/**
 * Map `/guia/{sector}/{regulation}` path → last modified time from Postgres.
 * `created_at` is refreshed on guide upsert, so it tracks the latest generated version.
 */
export async function getGuidePathToLastModified(): Promise<Map<string, Date>> {
  const map = new Map<string, Date>();
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();
    const res = await pool.query<{
      sector_slug: string;
      regulation_slug: string;
      created_at: string | Date;
    }>(
      `SELECT sector_slug, regulation_slug, created_at FROM generated_content`,
    );
    for (const row of res.rows) {
      const path = `/guia/${row.sector_slug}/${row.regulation_slug}`;
      map.set(path, new Date(row.created_at));
    }
  } catch {
    // Build/sitemap without DB (e.g. local): omit per-guide dates.
  }
  return map;
}

export async function getRecentGuidesForFeed(
  limit: number,
): Promise<
  Array<{
    path: string;
    title: string;
    description: string;
    pubDate: Date;
  }>
> {
  const out: Array<{
    path: string;
    title: string;
    description: string;
    pubDate: Date;
  }> = [];
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();
    const res = await pool.query<{
      sector_slug: string;
      regulation_slug: string;
      title: string;
      meta_description: string;
      created_at: string | Date;
    }>(
      `
        SELECT sector_slug, regulation_slug, title, meta_description, created_at
        FROM generated_content
        ORDER BY created_at DESC
        LIMIT $1
      `,
      [limit],
    );
    for (const row of res.rows) {
      out.push({
        path: `/guia/${row.sector_slug}/${row.regulation_slug}`,
        title: row.title,
        description: row.meta_description,
        pubDate: new Date(row.created_at),
      });
    }
  } catch {
    // empty
  }
  return out;
}

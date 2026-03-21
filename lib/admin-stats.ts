import os from "node:os";
import path from "node:path";
import fs from "node:fs/promises";
import { buildSeedSectors, seedRegulations, getRegulationSeedsForSectorSlug } from "@/lib/catalog";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

type StatsResult = {
  sectors: number;
  regulations: number;
  guides: number;
  leads: number;
  completionRate: number;
  topLeadSectors: Array<{ sector: string; leads: number }>;
  topRevenueOpportunities: Array<{
    sector: string;
    leads: number;
    score: number;
    estimatedMonthlyEur: number;
  }>;
  recentLeads: Array<{
    name: string;
    email: string;
    company: string;
    sector: string;
    timestamp: Date | string;
  }>;
};

export async function getAdminStats(): Promise<StatsResult> {
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();

    const [guidesRes, leadsRes, topLeadSectorsRes, recentLeadsRes] = await Promise.all([
      pool.query(`SELECT COUNT(*)::int AS count FROM generated_content`),
      pool.query(`SELECT COUNT(*)::int AS count FROM leads`),
      pool.query(
        `
          SELECT sector, COUNT(*)::int AS leads
          FROM leads
          GROUP BY sector
          ORDER BY leads DESC
          LIMIT 8
        `,
      ),
      pool.query(
        `
          SELECT name, email, company, sector, created_at
          FROM leads
          ORDER BY created_at DESC
          LIMIT 10
        `,
      ),
    ]);

    const guides = Number(guidesRes.rows[0]?.count ?? 0);
    const leads = Number(leadsRes.rows[0]?.count ?? 0);

    // Completion rate compares generated guides vs. possible catalog combinations.
    const sectors = buildSeedSectors().length;
    const regulations = seedRegulations.length;
    const maxGuides = buildSeedSectors().reduce(
      (acc, s) => acc + getRegulationSeedsForSectorSlug(s.slug).length,
      0,
    );
    const completionRate = maxGuides > 0 ? Math.round((guides / maxGuides) * 100) : 0;

    const topLeadSectors: Array<{ sector: string; leads: number }> = (
      topLeadSectorsRes.rows ?? []
    ).map(
      (row: { sector?: string; leads?: number | string }) => ({
      sector: String(row.sector ?? "No sector"),
      leads: Number(row.leads ?? 0),
      }),
    );

    // Model simple per prioritzar sectors en monetització.
    const topRevenueOpportunities = topLeadSectors.map((item) => {
      const score = Math.round(item.leads * 12);
      const estimatedMonthlyEur = Math.round(item.leads * 18);
      return {
        sector: item.sector,
        leads: item.leads,
        score,
        estimatedMonthlyEur,
      };
    });

    const recentLeads: Array<{
      name: string;
      email: string;
      company: string;
      sector: string;
      timestamp: Date | string;
    }> = (recentLeadsRes.rows ?? []).map(
      (lead: {
        name?: string;
        email?: string;
        company?: string;
        sector?: string;
        created_at?: Date | string;
      }) => ({
        name: String(lead.name ?? ""),
        email: String(lead.email ?? ""),
        company: String(lead.company ?? ""),
        sector: String(lead.sector ?? ""),
        timestamp: lead.created_at ?? "",
      }),
    );

    return {
      sectors,
      regulations,
      guides,
      leads,
      completionRate,
      topLeadSectors,
      topRevenueOpportunities,
      recentLeads,
    };
  } catch {
    // Mongo offline: best-effort stats from local caches (no extra cost).
    const sectors = buildSeedSectors().length;
    const regulations = seedRegulations.length;

    const guideCacheDir = path.join(os.tmpdir(), "securebiz-org-cache", "guide-cache");
    const files = await fs.readdir(guideCacheDir).catch(() => []);
    const guides = files.filter((f) => f.endsWith(".json")).length;

    const leadsFile = path.join(os.tmpdir(), "leads.jsonl");
    let parsedLeads: Array<{
      name?: string;
      email?: string;
      company?: string;
      sector?: string;
      timestamp?: string;
    }> = [];

    const rawLeads = await fs.readFile(leadsFile, "utf8").catch(() => "");
    if (rawLeads) {
      parsedLeads = rawLeads
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .map((l) => {
          try {
            return JSON.parse(l) as typeof parsedLeads[number];
          } catch {
            return null;
          }
        })
        .filter(Boolean) as Array<typeof parsedLeads[number]>;
    }

    const leads = parsedLeads.length;
    const maxGuides = buildSeedSectors().reduce(
      (acc, s) => acc + getRegulationSeedsForSectorSlug(s.slug).length,
      0,
    );
    const completionRate = maxGuides > 0 ? Math.round((guides / maxGuides) * 100) : 0;

    const bySector = new Map<string, number>();
    for (const lead of parsedLeads) {
      const sector = String(lead.sector ?? "");
      if (!sector) continue;
      bySector.set(sector, (bySector.get(sector) ?? 0) + 1);
    }

    const topLeadSectors = Array.from(bySector.entries())
      .map(([sector, leads]) => ({ sector, leads }))
      .sort((a, b) => b.leads - a.leads)
      .slice(0, 8);

    const topRevenueOpportunities = topLeadSectors.map((item) => {
      const score = Math.round(item.leads * 12);
      const estimatedMonthlyEur = Math.round(item.leads * 18);
      return {
        sector: item.sector,
        leads: item.leads,
        score,
        estimatedMonthlyEur,
      };
    });

    const recentLeads = parsedLeads
      .map((lead) => ({
        name: String(lead.name ?? ""),
        email: String(lead.email ?? ""),
        company: String(lead.company ?? ""),
        sector: String(lead.sector ?? ""),
        timestamp: lead.timestamp ?? "",
      }))
      .sort((a, b) => {
        const ta = new Date(a.timestamp).getTime();
        const tb = new Date(b.timestamp).getTime();
        return tb - ta;
      })
      .slice(0, 10);

    return {
      sectors,
      regulations,
      guides,
      leads,
      completionRate,
      topLeadSectors,
      topRevenueOpportunities,
      recentLeads,
    };
  }
}

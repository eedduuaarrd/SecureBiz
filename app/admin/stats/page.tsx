import type { Metadata } from "next";
import { getAdminStats } from "@/lib/admin-stats";

export const metadata: Metadata = {
  title: "Admin stats",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

function formatDate(value: Date | string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";
  return new Intl.DateTimeFormat("ca-ES", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export default async function AdminStatsPage() {
  let stats: Awaited<ReturnType<typeof getAdminStats>> | null = null;
  try {
    stats = await getAdminStats();
  } catch {
    stats = null;
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Admin Stats</h1>
      <p className="mt-2 text-sm text-slate-600">
        Quick overview of SEO performance, content production, and lead capture.
      </p>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">How to read this dashboard</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Sectors / Regulations</strong>: counters from the database (or catalogue seed values for fallback).
          </li>
          <li>
            <strong>Guides created</strong>: stored generated content documents. The
            <strong> pSEO coverage</strong> compares generated guides vs. possible sector × regulation combinations.
          </li>
          <li>
            <strong>Leads</strong>: audit form submissions; the top lists group by sector to see where demand is highest.
          </li>
        </ul>
        <p className="mt-3 text-slate-600">
          If Postgres is unavailable, the server tries a <strong>best-effort</strong> read from local memory/cache
          (e.g. cached guides and a local leads file) so this dashboard stays useful during development
          or when there are network issues.
        </p>
        <div className="mt-5 rounded-lg border border-slate-100 bg-slate-50 p-4">
          <h3 className="text-sm font-semibold text-slate-900">Glossary</h3>
          <dl className="mt-2 space-y-2 text-xs text-slate-600">
            <div>
              <dt className="font-medium text-slate-800">pSEO coverage</dt>
              <dd>
                Approximate % of possible sector × regulation guide URLs that already have generated content in the
                database. It does not measure quality—only existence.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-800">Top revenue opportunities</dt>
              <dd>
                Heuristic ranking from lead volume × estimated monetisation potential—use as a prioritisation hint, not
                a financial forecast.
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Troubleshooting</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>Zeros everywhere</strong>: confirm <code className="rounded bg-slate-100 px-1">DATABASE_URL</code>{" "}
            on Vercel and that migrations/seed scripts have run in the target environment.
          </li>
          <li>
            <strong>Guides &lt; sectors × regulations</strong>: normal until the generator/cron has populated content.
            Check cron auth and API quotas for Gemini if generation stalls.
          </li>
          <li>
            <strong>Leads not appearing</strong>: verify the <code className="rounded bg-slate-100 px-1">/api/leads</code>{" "}
            endpoint receives POSTs from production forms and that spam filters are not blocking notifications.
          </li>
        </ul>
      </section>

      {!stats ? (
        <section className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          Could not load metrics (unexpected error). Check server logs and Postgres connectivity.
          Under normal conditions, the backend should serve data or fall back to local cache.
        </section>
      ) : null}

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Sectors</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{stats?.sectors ?? 0}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Regulations</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {stats?.regulations ?? 0}
          </p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Guides created</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{stats?.guides ?? 0}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">Leads</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{stats?.leads ?? 0}</p>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <p className="text-xs uppercase text-slate-500">pSEO coverage</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {stats?.completionRate ?? 0}%
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Top sectors per leads</h2>
          <ul className="mt-4 space-y-2">
            {(stats?.topLeadSectors.length ?? 0) === 0 ? (
              <li className="text-sm text-slate-500">No data yet.</li>
            ) : (
              stats?.topLeadSectors.map((item) => (
                <li
                  key={item.sector}
                  className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2"
                >
                  <span className="text-sm text-slate-700">{item.sector}</span>
                  <span className="text-sm font-semibold text-slate-900">{item.leads}</span>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Top business opportunities</h2>
          <ul className="mt-4 space-y-2">
            {(stats?.topRevenueOpportunities.length ?? 0) === 0 ? (
              <li className="text-sm text-slate-500">No data yet.</li>
            ) : (
              stats?.topRevenueOpportunities.map((item) => (
                <li
                  key={`${item.sector}-${item.score}`}
                  className="rounded-md border border-slate-100 px-3 py-2"
                >
                  <p className="text-sm font-medium text-slate-900">{item.sector}</p>
                  <p className="text-xs text-slate-600">
                    Leads: {item.leads} · Score: {item.score} · Est. monthly: €
                    {item.estimatedMonthlyEur}/month
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Latest leads</h2>
          <ul className="mt-4 space-y-2">
            {(stats?.recentLeads.length ?? 0) === 0 ? (
              <li className="text-sm text-slate-500">No recent leads.</li>
            ) : (
              stats?.recentLeads.map((lead) => (
                <li key={`${lead.email}-${lead.timestamp}`} className="rounded-md border border-slate-100 p-3">
                  <p className="text-sm font-medium text-slate-900">
                    {lead.name} · {lead.company}
                  </p>
                  <p className="text-xs text-slate-600">
                    {lead.email} · {lead.sector}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{formatDate(lead.timestamp)}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>
    </div>
  );
}

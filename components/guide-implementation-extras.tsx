import Link from "next/link";
import { UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import { getSectorMainRisksForName } from "@/lib/sector-persona";

type Props = {
  sectorName: string;
  regulationName: string;
  sectorSlug: string;
  regulationSlug: string;
};

/**
 * Extra implementation context appended to every guide for depth and usefulness.
 */
export function GuideImplementationExtras({
  sectorName,
  regulationName,
  sectorSlug,
  regulationSlug,
}: Props) {
  const risks = getSectorMainRisksForName(sectorName).slice(0, 3);
  const focusByRegulation: Record<string, { title: string; bullets: string[] }> = {
    gdpr: {
      title: `Priority controls for ${sectorName} under GDPR`,
      bullets: [
        "Map lawful bases by workflow (service delivery vs. marketing vs. legal obligation).",
        "Keep RoPA-style inventory tied to real systems and owners, not only policies.",
        "Run a DSAR and breach-response drill with timestamps and owner handoff.",
      ],
    },
    "iso-27001": {
      title: `Priority controls for ${sectorName} under ISO 27001`,
      bullets: [
        "Define ISMS scope around actual critical assets and customer-facing services.",
        "Track risk treatment with owner, due date, and residual-risk decision.",
        "Prove operation with evidence: access review logs, backup tests, internal checks.",
      ],
    },
    nis2: {
      title: `Priority controls for ${sectorName} under NIS2`,
      bullets: [
        "Document governance responsibilities for cybersecurity and incident escalation.",
        "Set incident reporting flow with timeline discipline and communication template.",
        "Assess critical suppliers and concentration risk before renewal windows.",
      ],
    },
    "cookie-law": {
      title: `Priority controls for ${sectorName} under cookie/ePrivacy rules`,
      bullets: [
        "Inventory every tracker/pixel and classify essential vs non-essential.",
        "Ensure non-essential scripts wait for consent state before loading.",
        "Version cookie notices and consent text changes for auditability.",
      ],
    },
  };
  const focus = focusByRegulation[regulationSlug] ?? {
    title: `Priority controls for ${sectorName} under ${regulationName}`,
    bullets: [
      "Translate obligations into controls with clear owner and due date.",
      "Attach one evidence artefact per control to avoid policy-only progress.",
      "Review quarterly against incidents, new vendors, and contract changes.",
    ],
  };

  return (
    <section className="mt-10 space-y-8 border-t border-slate-200 pt-10">
      <UsefulContextCallout title="How to use this guide in the real world">
        <p>
          Treat this page as a <strong>working document</strong>: highlight owners, dates, and evidence next to each
          control. For <strong>{sectorName}</strong> under <strong>{regulationName}</strong>, success looks like
          decisions you can defend—what you store, where it flows, who can access it, and how you detect incidents—not
          a polished policy nobody follows.
        </p>
        <p>
          If you only do three things this month: (1) confirm your actual data flows vs. assumptions, (2) enforce MFA on
          admin and email, (3) start an incident log—even if it is a shared doc with timestamps.
        </p>
      </UsefulContextCallout>

      <div className="relative overflow-hidden rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
        <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-indigo-50/80 blur-xl"></div>
        <div className="relative z-10">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            {focus.title}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700">
            {focus.bullets.map((b) => (
              <li key={b} className="flex items-start gap-2.5">
                <span className="mt-1 flex-shrink-0 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 p-0.5 text-indigo-600">
                  <svg fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                </span>
                <span className="leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 border-t border-slate-100 pt-3 text-xs font-medium text-slate-500 uppercase tracking-wider">
            Sector-specific risk anchors: <span className="text-slate-700 capitalize">{risks.join(" · ")}</span>
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">30 / 60 / 90-day implementation lens</h2>
            <p className="mt-1 text-sm text-slate-500">
              Generic timelines beat vague “roadmaps”. Adjust dates to your capacity.
            </p>
          </div>
          <div className="hidden sm:block rounded-full bg-slate-100 p-2 text-slate-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          </div>
        </div>
        <UsefulDataTable caption="Phased rollout (template)">
          <thead>
            <tr className="border-b-2 border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left font-bold text-slate-900">Window</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900">Focus</th>
              <th className="px-4 py-3 text-left font-bold text-slate-900">Outputs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-slate-900">30 days</td>
              <td className="px-4 py-3 text-sm text-slate-700">Truth on data, access, and vendors</td>
              <td className="px-4 py-3 text-sm text-slate-600">Inventory, MFA on critical accounts, DPA status</td>
            </tr>
            <tr className="border-b border-slate-100 transition-colors hover:bg-slate-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-slate-900">60 days</td>
              <td className="px-4 py-3 text-sm text-slate-700">Controls that reduce incident likelihood</td>
              <td className="px-4 py-3 text-sm text-slate-600">Backups tested, offboarding checklist, cookie/tag inventory</td>
            </tr>
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-4 py-3 text-sm font-semibold text-slate-900">90 days</td>
              <td className="px-4 py-3 text-sm text-slate-700">Evidence pack & continuous habits</td>
              <td className="px-4 py-3 text-sm text-slate-600">Quarterly review, training proof, metrics that leadership understands</td>
            </tr>
          </tbody>
        </UsefulDataTable>
      </div>

      <div className="rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50/80 to-slate-50/50 p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <svg className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>
          Related pages on this site
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <div>
              <Link className="font-semibold text-blue-700 underline-offset-4 hover:underline transition-all" href={`/sector/${sectorSlug}`}>
                Sector hub for {sectorName}
              </Link>
              <span className="text-slate-600">{" — "}risks, regulation cards, and deep-dive resources.</span>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <div>
              <Link
                className="font-semibold text-blue-700 underline-offset-4 hover:underline transition-all"
                href={`/regulation/${regulationSlug}`}
              >
                Regulation hub for {regulationName}
              </Link>
              <span className="text-slate-600">{" — "}other sectors with the same framework.</span>
            </div>
          </li>
          <li className="flex items-start gap-2">
            <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
            <div>
              <Link className="font-semibold text-blue-700 underline-offset-4 hover:underline transition-all" href="/regulations#catalog-search">
                All regulations
              </Link>
              <span className="text-slate-600">{" — "}compare frameworks before you over-invest in one.</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

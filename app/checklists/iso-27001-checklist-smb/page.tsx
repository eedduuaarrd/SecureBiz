import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "ISO 27001 Checklist for SMBs | Minimal ISMS Start",
  description:
    "ISO 27001 checklist for SMB teams: scope, asset inventory, risk treatment, access controls, backups, incidents, and review cadence.",
  keywords: ["ISO 27001 checklist", "ISO 27001 SMB", "ISMS checklist", "information security checklist"],
  alternates: {
    canonical: "/checklists/iso-27001-checklist-smb",
    languages: { "x-default": "/checklists/iso-27001-checklist-smb", en: "/checklists/iso-27001-checklist-smb" },
  },
  robots: getRobotsAllowAll(),
};

export default function IsoChecklistSmbPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Checklists", item: absoluteUrl("/checklists") },
      { "@type": "ListItem", position: 3, name: "ISO 27001 checklist SMB", item: absoluteUrl("/checklists/iso-27001-checklist-smb") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the minimum ISO 27001 starting point for SMBs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with clear scope, asset inventory, risk treatment priorities, and baseline operational controls with owners.",
        },
      },
      {
        "@type": "Question",
        name: "Do SMBs need full certification immediately?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not always. Many teams first build an ISMS foundation, then decide on certification timing based on customer and contract pressure.",
        },
      },
    ],
  };
  const evidenceRows = [
    ["ISMS scope", "Define boundaries, systems, and teams", "Signed scope statement and exclusions"],
    ["Risk treatment", "Rank key risks and assign controls", "Risk register and treatment decisions"],
    ["Control baseline", "Access, patching, backups, logging", "Control checklist with owner and status"],
    ["Incident response", "Detection, triage, and escalation", "Runbook, test notes, and incident timeline logs"],
    ["Management review", "Periodic leadership oversight", "Review minutes and action follow-up"],
  ] as const;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold text-slate-900">ISO 27001 checklist for SMBs</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        This checklist focuses on minimum viable ISMS discipline so teams can deliver credible security assurance
        without overengineering.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Define ISMS scope and business context.</li>
        <li>Create asset and data inventory with owners.</li>
        <li>Run risk assessment and treatment decisions.</li>
        <li>Implement baseline controls (access, backups, patching, logging).</li>
        <li>Set incident process, internal checks, and management review rhythm.</li>
      </ol>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Evidence tracker</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Area</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Minimum action</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Proof to keep</th>
              </tr>
            </thead>
            <tbody>
              {evidenceRows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-2 font-medium">{row[0]}</td>
                  <td className="px-3 py-2">{row[1]}</td>
                  <td className="px-3 py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Writing policies without linking them to measurable operational controls.</li>
          <li>Skipping owner assignment, so controls degrade after initial rollout.</li>
          <li>Running one-off risk assessments without periodic review cadence.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">60-day execution plan</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Days 1-15: scope, inventory, and risk baseline.</li>
          <li>Days 16-35: control implementation and owner assignment.</li>
          <li>Days 36-60: incident test, internal check, and management review.</li>
        </ol>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
        <Link href="/compare/soc2-vs-iso-27001" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">SOC 2 vs ISO 27001</Link>
      </div>
    </div>
  );
}

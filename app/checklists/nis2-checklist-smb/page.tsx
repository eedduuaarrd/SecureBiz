import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "NIS2 Checklist for SMBs | Governance and Incident Readiness",
  description:
    "NIS2 checklist for SMB and supplier teams: governance ownership, risk controls, incident readiness, supplier assurance, and reporting discipline.",
  keywords: ["NIS2 checklist", "NIS2 SMB", "NIS2 compliance steps", "cyber resilience checklist"],
  alternates: {
    canonical: "/checklists/nis2-checklist-smb",
    languages: { "x-default": "/checklists/nis2-checklist-smb", en: "/checklists/nis2-checklist-smb" },
  },
  robots: getRobotsAllowAll(),
};

export default function Nis2ChecklistSmbPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Checklists", item: absoluteUrl("/checklists") },
      { "@type": "ListItem", position: 3, name: "NIS2 checklist SMB", item: absoluteUrl("/checklists/nis2-checklist-smb") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do SMB suppliers use a NIS2 checklist?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Supplier teams use it to align governance, incident readiness, and evidence expectations from in-scope customers and contracts.",
        },
      },
      {
        "@type": "Question",
        name: "Is NIS2 only about technical controls?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. NIS2 also expects governance ownership, reporting discipline, and supplier security accountability.",
        },
      },
    ],
  };
  const evidenceRows = [
    ["Scope pressure", "Map direct and contractual obligations", "Scope memo with accountable owner"],
    ["Governance", "Assign leadership responsibilities", "Decision log and escalation matrix"],
    ["Incident readiness", "Define response and reporting path", "Runbook, notification timeline, exercise notes"],
    ["Supplier assurance", "Review supplier controls and dependencies", "Supplier register and risk reviews"],
    ["Resilience checks", "Test recovery and continuity assumptions", "Test reports and corrective actions"],
  ] as const;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold text-slate-900">NIS2 checklist for SMBs</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Use this list to execute cyber-resilience governance in a realistic way, especially when requirements arrive
        through customers, procurement, and supply-chain pressure.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Validate scope pressure from clients, sector rules, and contracts.</li>
        <li>Assign governance accountability and escalation paths.</li>
        <li>Establish core cyber controls and supplier risk review.</li>
        <li>Document incident detection, triage, and reporting timelines.</li>
        <li>Maintain evidence records for audits and partner due diligence.</li>
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
          <li>Ignoring contractual obligations because direct legal scope seems unclear.</li>
          <li>Treating incident reporting as an ad hoc technical task without governance ownership.</li>
          <li>Not testing supplier and continuity assumptions before real incidents occur.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">45-day execution plan</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Days 1-10: scope and governance setup.</li>
          <li>Days 11-25: control baseline and supplier review.</li>
          <li>Days 26-45: incident drill, evidence review, and gap closure.</li>
        </ol>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
        <Link href="/compare/dora-vs-nis2" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">DORA vs NIS2</Link>
      </div>
    </div>
  );
}

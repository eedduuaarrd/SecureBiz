import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";

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
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">NIS2 checklist for SMBs</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Validate scope pressure from clients, sector rules, and contracts.</li>
        <li>Assign governance accountability and escalation paths.</li>
        <li>Establish core cyber controls and supplier risk review.</li>
        <li>Document incident detection, triage, and reporting timelines.</li>
        <li>Maintain evidence records for audits and partner due diligence.</li>
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
      </div>
    </div>
  );
}

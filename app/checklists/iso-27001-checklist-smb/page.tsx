import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";

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
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">ISO 27001 checklist for SMBs</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Define ISMS scope and business context.</li>
        <li>Create asset and data inventory with owners.</li>
        <li>Run risk assessment and treatment decisions.</li>
        <li>Implement baseline controls (access, backups, patching, logging).</li>
        <li>Set incident process, internal checks, and management review rhythm.</li>
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
      </div>
    </div>
  );
}

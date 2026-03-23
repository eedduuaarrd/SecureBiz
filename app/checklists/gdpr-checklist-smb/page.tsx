import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";

export const metadata: Metadata = {
  title: "GDPR Checklist for SMBs | Practical Step-by-Step",
  description:
    "A practical GDPR checklist for small and medium businesses: data mapping, lawful basis, rights workflow, vendors, and breach readiness.",
  keywords: ["GDPR checklist", "GDPR checklist SMB", "GDPR implementation steps", "privacy compliance checklist"],
  alternates: {
    canonical: "/checklists/gdpr-checklist-smb",
    languages: { "x-default": "/checklists/gdpr-checklist-smb", en: "/checklists/gdpr-checklist-smb" },
  },
  robots: getRobotsAllowAll(),
};

export default function GdprChecklistSmbPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the first GDPR step for an SMB?", acceptedAnswer: { "@type": "Answer", text: "Start with a realistic data map: what personal data you collect, where it is stored, and who can access it." } },
      { "@type": "Question", name: "Do SMBs need a full legal team for GDPR?", acceptedAnswer: { "@type": "Answer", text: "Not always. Many SMBs can execute core controls first, then involve legal specialists for high-risk or complex cases." } },
    ],
  };
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold text-slate-900">GDPR checklist for SMBs</h1>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Map personal data flows (collection, storage, sharing, deletion).</li>
        <li>Define lawful basis per processing activity.</li>
        <li>Set up rights handling workflow (access, deletion, correction).</li>
        <li>Review vendor contracts and data-processing agreements.</li>
        <li>Create a breach-response and notification routine.</li>
      </ol>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

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
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Checklists", item: absoluteUrl("/checklists") },
      { "@type": "ListItem", position: 3, name: "GDPR checklist SMB", item: absoluteUrl("/checklists/gdpr-checklist-smb") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is the first GDPR step for an SMB?", acceptedAnswer: { "@type": "Answer", text: "Start with a realistic data map: what personal data you collect, where it is stored, and who can access it." } },
      { "@type": "Question", name: "Do SMBs need a full legal team for GDPR?", acceptedAnswer: { "@type": "Answer", text: "Not always. Many SMBs can execute core controls first, then involve legal specialists for high-risk or complex cases." } },
    ],
  };
  const evidenceRows = [
    ["Data map", "Systems and files with personal data", "Updated inventory and owner list"],
    ["Lawful basis", "Basis assigned for each processing activity", "RoPA with basis per activity"],
    ["Rights workflow", "Access/deletion/correction process with SLA", "Ticket log and response timestamps"],
    ["Vendor controls", "Processor agreements and transfer checks", "Signed DPAs and review dates"],
    ["Incident readiness", "Breach triage and notification rules", "Incident runbook and exercise records"],
  ] as const;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <h1 className="text-3xl font-bold text-slate-900">GDPR checklist for SMBs</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Use this checklist as a practical minimum baseline. It is designed for teams that need execution speed and
        clear evidence for audits, partners, and internal accountability.
      </p>
      <ol className="mt-6 list-decimal space-y-2 pl-5 text-sm text-slate-700">
        <li>Map personal data flows (collection, storage, sharing, deletion).</li>
        <li>Define lawful basis per processing activity.</li>
        <li>Set up rights handling workflow (access, deletion, correction).</li>
        <li>Review vendor contracts and data-processing agreements.</li>
        <li>Create a breach-response and notification routine.</li>
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
          <li>Keeping outdated data maps that do not reflect real tools and shadow spreadsheets.</li>
          <li>Responding to rights requests ad hoc without a repeatable workflow and SLA.</li>
          <li>Treating vendor reviews as one-time paperwork instead of periodic governance.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">30-day execution plan</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Week 1: data and vendor mapping.</li>
          <li>Week 2: lawful basis and rights workflow.</li>
          <li>Week 3: policy updates and staff briefing.</li>
          <li>Week 4: breach drill and evidence quality check.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">KPI dashboard</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Data activities mapped versus total identified.</li>
          <li>Rights requests handled within target SLA.</li>
          <li>Vendors reviewed with valid processing agreements.</li>
        </ul>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">Regulation hub</Link>
        <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">All checklists</Link>
        <Link href="/compare/gdpr-vs-iso-27001" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">GDPR vs ISO 27001</Link>
      </div>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/compare/gdpr-vs-nis2", label: "GDPR vs NIS2" },
          { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist (SMB)" },
          { href: "/resources/gdpr-websites", label: "Top GDPR websites" },
          { href: "/resources", label: "Resources hub" },
        ]}
      />
    </div>
  );
}

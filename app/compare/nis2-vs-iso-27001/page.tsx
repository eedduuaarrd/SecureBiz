import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "NIS2 vs ISO 27001 | Governance, Scope and Operational Differences",
  description:
    "Compare NIS2 and ISO 27001 in practice: legal obligations, governance, incident reporting, and control implementation for in-scope organizations.",
  keywords: [
    "NIS2 vs ISO 27001",
    "difference between NIS2 and ISO 27001",
    "NIS2 compliance roadmap",
    "ISO 27001 for NIS2",
    "cyber resilience governance",
  ],
  alternates: {
    canonical: "/compare/nis2-vs-iso-27001",
    languages: {
      "x-default": "/compare/nis2-vs-iso-27001",
      en: "/compare/nis2-vs-iso-27001",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/nis2-vs-iso-27001",
    title: "NIS2 vs ISO 27001 | Governance, Scope and Operational Differences",
    description:
      "EU cyber-resilience obligations versus certifiable ISMS management discipline.",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIS2 vs ISO 27001 | Governance, Scope and Operational Differences",
    description:
      "EU cyber-resilience obligations versus certifiable ISMS management discipline.",
  },
  robots: getRobotsAllowAll(),
};

export default function Nis2VsIsoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "NIS2 vs ISO 27001", item: absoluteUrl("/compare/nis2-vs-iso-27001") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is ISO 27001 enough to comply with NIS2?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not by itself. ISO 27001 helps operationalize controls, but NIS2 also requires specific governance and incident-reporting obligations under EU law.",
        },
      },
      {
        "@type": "Question",
        name: "Does NIS2 apply to every company?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. NIS2 scope depends on sector, service criticality, and national transposition rules. Many suppliers are indirectly affected by contract and supply-chain pressure.",
        },
      },
      {
        "@type": "Question",
        name: "Why combine NIS2 with ISO 27001?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ISO 27001 gives repeatable management structure and evidence discipline, which makes NIS2 obligations easier to execute and demonstrate.",
        },
      },
    ],
  };
  const comparisonRows = [
    ["Primary nature", "EU legal resilience obligations", "Certifiable ISMS management system"],
    ["Core pressure", "Regulatory governance and reporting expectations", "Operational discipline and external assurance"],
    ["Scope driver", "Sector criticality and transposition rules", "Chosen organizational and technical scope"],
    ["Supplier angle", "Strong supply-chain and third-party security obligations", "Supplier controls within risk treatment and audits"],
    ["Evidence style", "Regulatory readiness and incident traceability", "Audit-ready control lifecycle and management records"],
  ] as const;

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">NIS2 vs ISO 27001</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        NIS2 is a legal resilience obligation for in-scope entities and their ecosystems. ISO 27001 is a certifiable
        ISMS framework. They work best together when governance and evidence are aligned.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-slate-900">NIS2</th>
                <th className="px-3 py-2 font-semibold text-slate-900">ISO 27001</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
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
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">What changes in practice</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>NIS2 raises governance accountability, incident reporting discipline, and supply-chain controls.</li>
          <li>ISO 27001 structures risk management, internal audit, and control maintenance over time.</li>
          <li>Both require evidence quality, not just policy documents.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Implementation sequence</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Confirm NIS2 relevance and supervisory expectations in your jurisdiction.</li>
          <li>Define governance, risk owners, and reporting thresholds.</li>
          <li>Use ISO 27001-style ISMS routines to execute and sustain controls.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Assuming ISO certification automatically covers NIS2 legal duties.</li>
          <li>Ignoring board-level governance and escalation responsibilities.</li>
          <li>Underestimating supplier-security evidence and contractual enforcement.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Practical rollout sequence</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Confirm scope and supervisory expectations with qualified advisors.</li>
          <li>Set governance model, reporting rules, and high-priority controls.</li>
          <li>Use ISO-style routines to sustain evidence and continuous improvement.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">KPIs to monitor</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Governance actions closed versus planned in leadership reviews.</li>
          <li>Supplier-risk assessments completed for critical dependencies.</li>
          <li>Incident reporting readiness tested within expected timelines.</li>
        </ul>
      </section>
      <div className="mt-8">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open regulation hub
        </Link>
      </div>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
          { href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" },
          { href: "/checklists/nis2-checklist-smb", label: "NIS2 checklist (SMB)" },
          { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist (SMB)" },
        ]}
      />
    </div>
  );
}

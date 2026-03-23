import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "DORA vs NIS2 | Financial ICT Resilience vs Broad Cyber Obligations",
  description:
    "Compare DORA and NIS2: scope, governance, ICT third-party risk, reporting expectations, and practical implementation priorities.",
  keywords: [
    "DORA vs NIS2",
    "difference between DORA and NIS2",
    "financial ICT resilience",
    "NIS2 compliance",
    "EU cyber regulations",
  ],
  alternates: {
    canonical: "/compare/dora-vs-nis2",
    languages: {
      "x-default": "/compare/dora-vs-nis2",
      en: "/compare/dora-vs-nis2",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/dora-vs-nis2",
    title: "DORA vs NIS2 | Financial ICT Resilience vs Broad Cyber Obligations",
    description:
      "How DORA differs from NIS2 in scope, controls, and operational expectations.",
  },
  twitter: {
    card: "summary_large_image",
    title: "DORA vs NIS2 | Financial ICT Resilience vs Broad Cyber Obligations",
    description:
      "How DORA differs from NIS2 in scope, controls, and operational expectations.",
  },
  robots: getRobotsAllowAll(),
};

export default function DoraVsNis2Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "DORA vs NIS2", item: absoluteUrl("/compare/dora-vs-nis2") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is DORA broader than NIS2?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. DORA is specific to financial ecosystems and ICT risk in that context, while NIS2 applies across broader critical sectors.",
        },
      },
      {
        "@type": "Question",
        name: "Do suppliers need to care about both DORA and NIS2?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Often yes. Even if not directly in scope, suppliers can inherit contractual security and resilience requirements from in-scope clients.",
        },
      },
    ],
  };
  const comparisonRows = [
    ["Primary scope", "Financial entities and critical ICT providers", "Essential and important entities across critical sectors"],
    ["Core objective", "Operational resilience in financial ecosystems", "Cybersecurity and resilience across critical services"],
    ["Third-party pressure", "Strong ICT third-party risk oversight", "Broad supply-chain and service-provider security expectations"],
    ["Reporting angle", "Financial-regulated incident and continuity expectations", "Nationally transposed cyber-incident obligations"],
    ["Best implementation approach", "Finance-specific resilience governance + testing", "Cross-sector governance with strong operational controls"],
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
      <h1 className="text-3xl font-bold text-slate-900">DORA vs NIS2</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        DORA targets financial-sector operational resilience and ICT risk. NIS2 covers essential/important entities
        across broader sectors. Many organizations face overlap through supply chains and contracts.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-slate-900">DORA</th>
                <th className="px-3 py-2 font-semibold text-slate-900">NIS2</th>
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
        <h2 className="text-lg font-semibold text-slate-900">Scope differences</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>DORA: financial entities and critical ICT providers in financial ecosystems.</li>
          <li>NIS2: essential and important entities in multiple critical sectors.</li>
          <li>Both: require governance maturity, incident handling, and supplier risk control.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Implementation sequence</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Identify whether obligations come from direct scope or client contracts.</li>
          <li>Define governance model and incident workflow with accountable owners.</li>
          <li>Document third-party risk decisions and test resilience response routines.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Assuming DORA and NIS2 are interchangeable without scope validation.</li>
          <li>Ignoring contractual flow-down obligations from regulated customers.</li>
          <li>Keeping incident and supplier evidence fragmented across teams.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">KPIs to monitor</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Critical ICT dependency reviews completed on schedule.</li>
          <li>Incident exercise completion and post-mortem action closure rate.</li>
          <li>Resilience testing coverage for priority business services.</li>
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
          { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
          { href: "/compare/gdpr-vs-nis2", label: "GDPR vs NIS2" },
          { href: "/checklists/nis2-checklist-smb", label: "NIS2 checklist (SMB)" },
          { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist (SMB)" },
        ]}
      />
    </div>
  );
}

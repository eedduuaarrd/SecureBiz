import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
  description:
    "Compare SOC 2 and ISO 27001: assurance model, scope, evidence, and how to choose based on buyer requirements and growth stage.",
  keywords: [
    "SOC 2 vs ISO 27001",
    "difference between SOC 2 and ISO 27001",
    "SOC 2 report vs ISO certification",
    "security compliance for SaaS",
    "enterprise assurance",
  ],
  alternates: {
    canonical: "/compare/soc2-vs-iso-27001",
    languages: {
      "x-default": "/compare/soc2-vs-iso-27001",
      en: "/compare/soc2-vs-iso-27001",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/soc2-vs-iso-27001",
    title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
    description:
      "How assurance reports differ from certifiable information-security management systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
    description:
      "How assurance reports differ from certifiable information-security management systems.",
  },
  robots: getRobotsAllowAll(),
};

export default function Soc2VsIsoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "SOC 2 vs ISO 27001", item: absoluteUrl("/compare/soc2-vs-iso-27001") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should SaaS companies choose SOC 2 or ISO 27001 first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on target market. US enterprise buyers often request SOC 2 first; international procurement often values ISO 27001 certification.",
        },
      },
      {
        "@type": "Question",
        name: "Can SOC 2 and ISO 27001 be combined?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many teams map one control set to both frameworks to reduce duplicate audit effort and improve evidence reuse.",
        },
      },
    ],
  };
  const comparisonRows = [
    ["Primary output", "Attestation report (Type I/II context dependent)", "Certification against ISO 27001 standard"],
    ["Primary market pull", "US enterprise trust and assurance workflows", "Global procurement and management-system maturity"],
    ["Control model", "Trust services criteria mapping", "Annex/ISMS control governance and risk treatment"],
    ["Audit cadence", "Periodic attestation engagements", "Certification and surveillance cycles"],
    ["Best use", "Buyer trust narrative and assurance reporting", "Long-term security governance discipline"],
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
      <h1 className="text-3xl font-bold text-slate-900">SOC 2 vs ISO 27001</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        SOC 2 is an attestation report against trust services criteria. ISO 27001 is a certifiable ISMS standard.
        Many B2B software firms choose based on market requirements, then expand to both.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-slate-900">SOC 2</th>
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
        <h2 className="text-lg font-semibold text-slate-900">Decision lens</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>SOC 2: often prioritized for US-enterprise procurement and trust reporting.</li>
          <li>ISO 27001: often prioritized for global certification and management-system discipline.</li>
          <li>Both: require documented controls, evidence quality, and audit-ready operations.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Practical roadmap</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Map buyer expectations by region and contract type.</li>
          <li>Build one control baseline that can satisfy both frameworks.</li>
          <li>Sequence external assurance events to maximize reuse of evidence.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Designing different control sets for SOC 2 and ISO 27001 from scratch.</li>
          <li>Underestimating evidence quality and change-management traceability.</li>
          <li>Choosing framework order without checking real buyer demand.</li>
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
          { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
          { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist (SMB)" },
          { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)" },
        ]}
      />
    </div>
  );
}

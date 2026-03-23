import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "GDPR vs NIS2 | Privacy Compliance vs Cyber Resilience",
  description:
    "Compare GDPR and NIS2 obligations: scope, governance, incident duties, and practical implementation order for EU-facing organizations.",
  keywords: [
    "GDPR vs NIS2",
    "difference between GDPR and NIS2",
    "privacy vs cyber resilience",
    "NIS2 incident reporting",
    "EU compliance comparison",
  ],
  alternates: {
    canonical: "/compare/gdpr-vs-nis2",
    languages: {
      "x-default": "/compare/gdpr-vs-nis2",
      en: "/compare/gdpr-vs-nis2",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/gdpr-vs-nis2",
    title: "GDPR vs NIS2 | Privacy Compliance vs Cyber Resilience",
    description:
      "How personal-data obligations differ from cyber-resilience governance and reporting duties.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDPR vs NIS2 | Privacy Compliance vs Cyber Resilience",
    description:
      "How personal-data obligations differ from cyber-resilience governance and reporting duties.",
  },
  robots: getRobotsAllowAll(),
};

export default function GdprVsNis2Page() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "GDPR vs NIS2", item: absoluteUrl("/compare/gdpr-vs-nis2") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can GDPR compliance alone satisfy NIS2?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. GDPR alone is not enough for NIS2. NIS2 adds governance, resilience, supply-chain, and incident-reporting expectations.",
        },
      },
      {
        "@type": "Question",
        name: "Which one should I prioritize first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Prioritize the framework tied to immediate legal or contractual pressure. Many teams handle GDPR fundamentals, then mature cyber governance to meet NIS2 expectations.",
        },
      },
    ],
  };
  const comparisonRows = [
    ["Primary nature", "Personal data protection law", "Cyber-resilience governance obligations"],
    ["Core concern", "Rights, transparency, lawful basis", "Operational resilience, incidents, supply chain"],
    ["Incident angle", "Personal-data breach duties", "Broader cyber-incident governance and reporting timelines"],
    ["Typical owner", "Privacy/legal + operations", "Security leadership + management governance"],
    ["Evidence baseline", "RoPA, DPIA, rights workflow, processor contracts", "Risk governance, incident records, supplier assurance"],
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
      <h1 className="text-3xl font-bold text-slate-900">GDPR vs NIS2</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        GDPR focuses on personal-data protection and rights. NIS2 focuses on cyber-resilience governance and incident
        reporting for in-scope entities and ecosystems.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-slate-900">GDPR</th>
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
        <h2 className="text-lg font-semibold text-slate-900">Core distinction</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>GDPR: legality, transparency, lawful basis, rights, and breach handling for personal data.</li>
          <li>NIS2: governance accountability, resilience controls, supply-chain security, and incident timelines.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Implementation order</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Stabilize privacy fundamentals and data governance (GDPR basics).</li>
          <li>Add operational resilience governance and incident discipline (NIS2 pressure points).</li>
          <li>Unify evidence ownership to avoid duplicate compliance programs.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Treating GDPR compliance as enough for resilience and cyber-governance expectations.</li>
          <li>Keeping privacy and security evidence in disconnected silos.</li>
          <li>Delaying incident-readiness testing until after a contractual or regulatory trigger.</li>
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
          { href: "/compare/dora-vs-nis2", label: "DORA vs NIS2" },
          { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
          { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)" },
          { href: "/checklists/nis2-checklist-smb", label: "NIS2 checklist (SMB)" },
        ]}
      />
    </div>
  );
}

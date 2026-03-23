import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const GUIDES = [
  ["ENISA", "https://www.enisa.europa.eu", "NIS2 orientation, cybersecurity implementation patterns, and resilience guidance."],
  ["European Data Protection Board (EDPB)", "https://edpb.europa.eu", "High-authority GDPR interpretation and supervisory consistency."],
  ["European Commission", "https://commission.europa.eu", "Policy and legal context across EU digital and data regulation."],
  ["AEPD (Spain)", "https://www.aepd.es", "National DPA perspective with practical operational resources."],
  ["ISO Organization", "https://www.iso.org", "Official source for ISO standards scope and publication references."],
  ["IAPP", "https://iapp.org", "Cross-framework governance and privacy/security role development."],
  ["ICO (UK)", "https://ico.org.uk", "Operational data protection guidance and accountability patterns."],
  ["NIS Cooperation Group docs (EU)", "https://digital-strategy.ec.europa.eu", "NIS and NIS2 cooperation outputs and implementation direction."],
  ["Advisera (learning)", "https://advisera.com", "Structured learning materials for ISO 27001 implementation."],
  ["BSI Group", "https://www.bsigroup.com", "Certification perspective and practical management-system content."],
] as const;

export const metadata: Metadata = {
  title: "Top 10 GDPR + ISO 27001 + NIS2 guides",
  description:
    "Top 10 trusted references across GDPR, ISO 27001, and NIS2 for governance, risk, and practical implementation.",
  keywords: [
    "GDPR ISO 27001 NIS2 guides",
    "best NIS2 resources",
    "ISO 27001 implementation references",
    "GDPR and cybersecurity governance",
    "GRC resources",
  ],
  alternates: { canonical: "/resources/gdpr-iso-27001-nis2-guides" },
  openGraph: {
    type: "article",
    url: "/resources/gdpr-iso-27001-nis2-guides",
    title: "Top 10 GDPR + ISO 27001 + NIS2 guides",
    description:
      "Cross-framework references for privacy, ISMS discipline, resilience, and risk governance.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 GDPR + ISO 27001 + NIS2 guides",
    description:
      "Cross-framework references for privacy, ISMS discipline, resilience, and risk governance.",
  },
  robots: getRobotsAllowAll(),
};

export default function GdprIsoNis2GuidesPage() {
  const pageUrl = absoluteUrl("/resources/gdpr-iso-27001-nis2-guides");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: absoluteUrl("/resources") },
      { "@type": "ListItem", position: 3, name: "Top 10 GDPR + ISO 27001 + NIS2 guides", item: pageUrl },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 10 GDPR + ISO 27001 + NIS2 guide sources",
    numberOfItems: GUIDES.length,
    itemListElement: GUIDES.map(([name, url], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      url,
    })),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Top 10 GDPR + ISO 27001 + NIS2 guide sources</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        If you are building a real compliance-security program, treat these as a layered stack: legal interpretation,
        management-system discipline, and incident/supply-chain resilience.
      </p>
      <nav className="mt-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href="/resources" className="hover:text-slate-900">Resources</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">Top 10 cross-framework guides</li>
        </ol>
      </nav>

      <ol className="mt-8 space-y-4">
        {GUIDES.map(([name, url, why], idx) => (
          <li key={url} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              {idx + 1}. {name}
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-blue-700 underline-offset-2 hover:underline">
              {url}
            </a>
            <p className="mt-2 text-sm text-slate-600">{why}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Execution order (recommended)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Define scope and data reality (GDPR accountability basics).</li>
          <li>Implement repeatable controls and evidence flow (ISO 27001 discipline).</li>
          <li>Strengthen governance, incident reporting, and supplier resilience (NIS2 expectations).</li>
        </ol>
        <div className="mt-4">
          <Link
            href="/resources/gdpr-websites"
            className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
          >
            Official-source list: Top 10 GDPR websites
          </Link>
        </div>
      </section>
    </div>
  );
}

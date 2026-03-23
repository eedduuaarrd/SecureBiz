import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

const GDPR_SITES = [
  ["European Data Protection Board (EDPB)", "https://edpb.europa.eu", "EU-level interpretations, guidelines, and consistency opinions."],
  ["European Commission (Data protection)", "https://commission.europa.eu", "Legislative context and official summaries of EU data protection law."],
  ["AEPD (Spain)", "https://www.aepd.es", "National authority guidance, sanctions context, and practical compliance tools."],
  ["ICO (UK)", "https://ico.org.uk", "Clear explanations, practical examples, and controller-focused guidance."],
  ["CNIL (France)", "https://www.cnil.fr", "Operational guidance and templates with strong technical orientation."],
  ["EDPS", "https://www.edps.europa.eu", "EU institution supervisory perspective and policy positions."],
  ["EUR-Lex (GDPR text)", "https://eur-lex.europa.eu", "Binding legal text and consolidated versions of Regulation (EU) 2016/679."],
  ["IAPP", "https://iapp.org", "Professional analysis, role-specific resources, and certification ecosystem."],
  ["GDPR.eu", "https://gdpr.eu", "Learning-oriented explanations and plain-language breakdowns."],
  ["European Union Agency for Cybersecurity (ENISA)", "https://www.enisa.europa.eu", "Security guidance that complements GDPR implementation in practice."],
] as const;

export const metadata: Metadata = {
  title: "Top 10 GDPR websites",
  description:
    "Top 10 reliable GDPR websites: official EU institutions, national DPAs, legal text, and practical compliance references.",
  keywords: [
    "top GDPR websites",
    "best GDPR resources",
    "EDPB GDPR",
    "AEPD GDPR",
    "ICO GDPR guidance",
    "GDPR official sources",
  ],
  alternates: {
    canonical: "/resources/gdpr-websites",
    languages: {
      "x-default": "/resources/gdpr-websites",
      en: "/resources/gdpr-websites",
    },
  },
  openGraph: {
    type: "article",
    url: "/resources/gdpr-websites",
    title: "Top 10 GDPR websites (official + trusted)",
    description:
      "High-trust GDPR sources: EDPB, Commission, AEPD, ICO, CNIL, EUR-Lex and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Top 10 GDPR websites (official + trusted)",
    description:
      "High-trust GDPR sources: EDPB, Commission, AEPD, ICO, CNIL, EUR-Lex and more.",
  },
  robots: getRobotsAllowAll(),
};

export default function GdprWebsitesPage() {
  const pageUrl = absoluteUrl("/resources/gdpr-websites");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: absoluteUrl("/resources") },
      { "@type": "ListItem", position: 3, name: "Top 10 GDPR websites", item: pageUrl },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Top 10 websites for GDPR",
    numberOfItems: GDPR_SITES.length,
    itemListElement: GDPR_SITES.map(([name, url], index) => ({
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
      <h1 className="text-3xl font-bold text-slate-900">Top 10 websites for GDPR</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        This list prioritizes reliability and practical value: official institutions first, then trusted professional
        references. Use these sources for legal interpretation, supervisory expectations, and operational rollout.
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
          <li className="font-medium text-slate-900">Top 10 GDPR websites</li>
        </ol>
      </nav>

      <ol className="mt-8 space-y-4">
        {GDPR_SITES.map(([name, url, why], idx) => (
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

      <section className="mt-10 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">How to use this list</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Use EUR-Lex and EDPB for binding text and high-authority interpretation.</li>
          <li>Use your national DPA (e.g. AEPD) for country-specific expectations and enforcement style.</li>
          <li>Use professional references (IAPP/GDPR.eu) to accelerate internal training and implementation.</li>
        </ul>
        <div className="mt-4">
          <Link
            href="/resources/gdpr-iso-27001-nis2-guides"
            className="text-sm font-semibold text-blue-700 underline-offset-2 hover:underline"
          >
            Next reading: Top 10 GDPR + ISO 27001 + NIS2 guides
          </Link>
        </div>
      </section>
    </div>
  );
}

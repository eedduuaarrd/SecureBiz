import type { Metadata } from "next";
import Link from "next/link";
import { getAllCompareContent } from "@/lib/compare-content";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance Comparisons | GDPR, ISO 27001 and NIS2",
  description:
    "Practical comparison pages: GDPR, ISO 27001, NIS2, DORA and SOC 2 with implementation order, evidence, and decision criteria.",
  keywords: [
    "GDPR vs ISO 27001",
    "NIS2 vs ISO 27001",
    "compliance comparison",
    "privacy vs information security",
    "ISMS and regulatory compliance",
  ],
  alternates: {
    canonical: "/compare",
    languages: {
      "x-default": "/compare",
      en: "/compare",
    },
  },
  openGraph: {
    type: "website",
    url: "/compare",
    title: "Compliance Comparisons | GDPR, ISO 27001 and NIS2",
    description:
      "Practical framework comparisons with decision criteria and implementation order.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance Comparisons | GDPR, ISO 27001 and NIS2",
    description:
      "Practical framework comparisons with decision criteria and implementation order.",
  },
  robots: getRobotsAllowAll(),
};

export default function CompareHubPage() {
  const comparisons = getAllCompareContent();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Compliance comparisons",
    itemListElement: comparisons.map((comparison, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: comparison.title,
      url: absoluteUrl(`/compare/${comparison.slug}`),
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
      <h1 className="text-3xl font-bold text-slate-900">Compliance comparisons</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Compare 25 practical compliance pairings with implementation sequence, common mistakes, KPI
        targets, and FAQ guidance for better execution.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {comparisons.map((comparison) => (
          <li key={comparison.slug}>
            <Link
              href={`/compare/${comparison.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
            >
              <h2 className="text-lg font-semibold text-slate-900">{comparison.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{comparison.description}</p>
            </Link>
          </li>
        ))}
      </ul>
      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Where to go next</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/regulations" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Regulation hub
          </Link>
          <Link href="/sectors" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Sector hub
          </Link>
          <Link href="/resources" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Resources
          </Link>
          <Link href="/checklists" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Checklists
          </Link>
        </div>
      </section>
    </div>
  );
}

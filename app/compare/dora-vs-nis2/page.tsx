import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">DORA vs NIS2</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        DORA targets financial-sector operational resilience and ICT risk. NIS2 covers essential/important entities
        across broader sectors. Many organizations face overlap through supply chains and contracts.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Scope differences</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>DORA: financial entities and critical ICT providers in financial ecosystems.</li>
          <li>NIS2: essential and important entities in multiple critical sectors.</li>
          <li>Both: require governance maturity, incident handling, and supplier risk control.</li>
        </ul>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open regulation hub
        </Link>
        <Link href="/compare" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          All comparisons
        </Link>
      </div>
    </div>
  );
}

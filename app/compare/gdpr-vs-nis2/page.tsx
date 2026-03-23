import type { Metadata } from "next";
import Link from "next/link";
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

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">GDPR vs NIS2</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        GDPR focuses on personal-data protection and rights. NIS2 focuses on cyber-resilience governance and incident
        reporting for in-scope entities and ecosystems.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Core distinction</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>GDPR: legality, transparency, lawful basis, rights, and breach handling for personal data.</li>
          <li>NIS2: governance accountability, resilience controls, supply-chain security, and incident timelines.</li>
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

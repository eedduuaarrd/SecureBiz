import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance Resources | Official Sources and Practical References",
  description:
    "Curated GDPR, ISO 27001 and NIS2 resources: official institutions, trusted references, and implementation-oriented reading lists.",
  keywords: [
    "GDPR resources",
    "ISO 27001 resources",
    "NIS2 resources",
    "compliance references",
    "privacy and security guides",
  ],
  alternates: {
    canonical: "/resources",
    languages: {
      "x-default": "/resources",
      en: "/resources",
    },
  },
  openGraph: {
    type: "website",
    url: "/resources",
    title: "Compliance Resources | Official Sources and Practical References",
    description:
      "Curated GDPR, ISO 27001 and NIS2 resources: official institutions and practical references.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance Resources | Official Sources and Practical References",
    description:
      "Curated GDPR, ISO 27001 and NIS2 resources: official institutions and practical references.",
  },
  robots: getRobotsAllowAll(),
};

export default function ResourcesPage() {
  const pageUrl = absoluteUrl("/resources");
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Compliance resources",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Top 10 GDPR websites",
        url: absoluteUrl("/resources/gdpr-websites"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Top 10 GDPR + ISO 27001 + NIS2 guides",
        url: absoluteUrl("/resources/gdpr-iso-27001-nis2-guides"),
      },
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Resources", item: pageUrl },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Compliance resources</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Curated reading paths for teams working on GDPR, ISO 27001, and NIS2. These pages are designed for practical
        implementation, with links to official institutions and field-tested reference material.
      </p>

      <nav className="mt-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">Resources</li>
        </ol>
      </nav>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        <Link
          href="/resources/gdpr-websites"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
        >
          <h2 className="text-lg font-semibold text-slate-900">Top 10 GDPR websites</h2>
          <p className="mt-2 text-sm text-slate-600">
            Official and high-trust GDPR sources (EDPB, Commission, AEPD, ICO, CNIL, and more) with suggested usage.
          </p>
        </Link>
        <Link
          href="/resources/gdpr-iso-27001-nis2-guides"
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
        >
          <h2 className="text-lg font-semibold text-slate-900">Top 10 GDPR + ISO 27001 + NIS2 guides</h2>
          <p className="mt-2 text-sm text-slate-600">
            Cross-framework references for governance, risk, and implementation across privacy and cybersecurity.
          </p>
        </Link>
      </section>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Popular comparisons</h2>
        <p className="mt-2 text-sm text-slate-600">
          If you are choosing frameworks, start with these high-intent comparison pages.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/compare/gdpr-vs-iso-27001" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            GDPR vs ISO 27001
          </Link>
          <Link href="/compare/nis2-vs-iso-27001" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            NIS2 vs ISO 27001
          </Link>
          <Link href="/compare" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            All comparisons
          </Link>
        </div>
      </section>
    </div>
  );
}

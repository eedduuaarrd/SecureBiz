import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Curated resources for GDPR, ISO 27001, NIS2 and compliance operations: official institutions, practical guides, and implementation references.",
  keywords: [
    "GDPR resources",
    "ISO 27001 resources",
    "NIS2 resources",
    "compliance references",
    "privacy and security guides",
  ],
  alternates: { canonical: "/resources" },
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
    </div>
  );
}

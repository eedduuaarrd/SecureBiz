import type { Metadata } from "next";
import Link from "next/link";
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
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "GDPR vs ISO 27001",
        url: absoluteUrl("/compare/gdpr-vs-iso-27001"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "NIS2 vs ISO 27001",
        url: absoluteUrl("/compare/nis2-vs-iso-27001"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "GDPR vs NIS2",
        url: absoluteUrl("/compare/gdpr-vs-nis2"),
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "SOC 2 vs ISO 27001",
        url: absoluteUrl("/compare/soc2-vs-iso-27001"),
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "DORA vs NIS2",
        url: absoluteUrl("/compare/dora-vs-nis2"),
      },
    ],
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
        These pages are built for high-intent searches such as GDPR vs ISO 27001 and NIS2 vs ISO 27001.
        Each comparison focuses on scope, evidence, and practical implementation order.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        <li>
          <Link
            href="/compare/gdpr-vs-iso-27001"
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">GDPR vs ISO 27001</h2>
            <p className="mt-2 text-sm text-slate-600">
              Privacy law obligations versus certifiable ISMS controls.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/compare/nis2-vs-iso-27001"
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">NIS2 vs ISO 27001</h2>
            <p className="mt-2 text-sm text-slate-600">
              Regulatory cyber-resilience expectations versus ISMS discipline.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/compare/gdpr-vs-nis2"
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">GDPR vs NIS2</h2>
            <p className="mt-2 text-sm text-slate-600">
              Data-protection obligations versus cyber-resilience governance.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/compare/soc2-vs-iso-27001"
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">SOC 2 vs ISO 27001</h2>
            <p className="mt-2 text-sm text-slate-600">
              Trust-services reporting versus certifiable management systems.
            </p>
          </Link>
        </li>
        <li>
          <Link
            href="/compare/dora-vs-nis2"
            className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
          >
            <h2 className="text-lg font-semibold text-slate-900">DORA vs NIS2</h2>
            <p className="mt-2 text-sm text-slate-600">
              Financial operational resilience versus broader essential-entity cyber obligations.
            </p>
          </Link>
        </li>
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
        </div>
      </section>
    </div>
  );
}

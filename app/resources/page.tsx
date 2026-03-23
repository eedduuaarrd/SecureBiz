import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";

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
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Compliance resources</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Curated reading paths for teams working on GDPR, ISO 27001, and NIS2. These pages are designed for practical
        implementation, with links to official institutions and field-tested reference material.
      </p>

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

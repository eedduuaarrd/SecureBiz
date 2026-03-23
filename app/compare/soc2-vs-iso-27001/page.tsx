import type { Metadata } from "next";
import Link from "next/link";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
  description:
    "Compare SOC 2 and ISO 27001: assurance model, scope, evidence, and how to choose based on buyer requirements and growth stage.",
  keywords: [
    "SOC 2 vs ISO 27001",
    "difference between SOC 2 and ISO 27001",
    "SOC 2 report vs ISO certification",
    "security compliance for SaaS",
    "enterprise assurance",
  ],
  alternates: {
    canonical: "/compare/soc2-vs-iso-27001",
    languages: {
      "x-default": "/compare/soc2-vs-iso-27001",
      en: "/compare/soc2-vs-iso-27001",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/soc2-vs-iso-27001",
    title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
    description:
      "How assurance reports differ from certifiable information-security management systems.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOC 2 vs ISO 27001 | Report Attestation vs ISMS Certification",
    description:
      "How assurance reports differ from certifiable information-security management systems.",
  },
  robots: getRobotsAllowAll(),
};

export default function Soc2VsIsoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "SOC 2 vs ISO 27001", item: absoluteUrl("/compare/soc2-vs-iso-27001") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Should SaaS companies choose SOC 2 or ISO 27001 first?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on target market. US enterprise buyers often request SOC 2 first; international procurement often values ISO 27001 certification.",
        },
      },
      {
        "@type": "Question",
        name: "Can SOC 2 and ISO 27001 be combined?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many teams map one control set to both frameworks to reduce duplicate audit effort and improve evidence reuse.",
        },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h1 className="text-3xl font-bold text-slate-900">SOC 2 vs ISO 27001</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        SOC 2 is an attestation report against trust services criteria. ISO 27001 is a certifiable ISMS standard.
        Many B2B software firms choose based on market requirements, then expand to both.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Decision lens</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>SOC 2: often prioritized for US-enterprise procurement and trust reporting.</li>
          <li>ISO 27001: often prioritized for global certification and management-system discipline.</li>
          <li>Both: require documented controls, evidence quality, and audit-ready operations.</li>
        </ul>
      </section>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open regulation hub
        </Link>
        <Link href="/compare" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          All comparisons
        </Link>
        <Link href="/compare/gdpr-vs-iso-27001" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Read GDPR vs ISO 27001
        </Link>
      </div>
    </div>
  );
}

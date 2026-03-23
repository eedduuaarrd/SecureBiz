import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "GDPR vs ISO 27001 | Key Differences and Implementation Order",
  description:
    "Understand GDPR vs ISO 27001: legal scope, controls, evidence, and when to prioritize each framework for SMBs and growing teams.",
  keywords: [
    "GDPR vs ISO 27001",
    "difference between GDPR and ISO 27001",
    "GDPR or ISO 27001 first",
    "privacy law vs ISMS",
    "compliance roadmap",
  ],
  alternates: {
    canonical: "/compare/gdpr-vs-iso-27001",
    languages: {
      "x-default": "/compare/gdpr-vs-iso-27001",
      en: "/compare/gdpr-vs-iso-27001",
    },
  },
  openGraph: {
    type: "article",
    url: "/compare/gdpr-vs-iso-27001",
    title: "GDPR vs ISO 27001 | Key Differences and Implementation Order",
    description:
      "Legal obligations versus certifiable security management: what changes in practice.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GDPR vs ISO 27001 | Key Differences and Implementation Order",
    description:
      "Legal obligations versus certifiable security management: what changes in practice.",
  },
  robots: getRobotsAllowAll(),
};

export default function GdprVsIsoPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: "GDPR vs ISO 27001", item: absoluteUrl("/compare/gdpr-vs-iso-27001") },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is GDPR the same as ISO 27001?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. GDPR is a legal framework for personal data protection. ISO 27001 is a certifiable management standard for information security.",
        },
      },
      {
        "@type": "Question",
        name: "Should a small business start with GDPR or ISO 27001?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most SMBs start with GDPR if they process personal data and face privacy obligations quickly. ISO 27001 often follows when enterprise clients request formal assurance.",
        },
      },
      {
        "@type": "Question",
        name: "Can GDPR and ISO 27001 be combined?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Many teams use ISO 27001 control discipline to operationalize GDPR accountability, access management, incident handling, and evidence retention.",
        },
      },
    ],
  };
  const comparisonRows = [
    ["Primary nature", "Legal regulation (mandatory where applicable)", "Certifiable management standard (voluntary but market-driven)"],
    ["Main focus", "Personal data rights, lawful processing, transparency", "Systematic information-security risk management"],
    ["Typical owner", "Privacy lead, legal, operations", "Security lead, IT, management"],
    ["Evidence examples", "RoPA, DPIA, DPA contracts, breach records", "Risk register, SoA, internal audits, management reviews"],
    ["When buyers ask", "Privacy due diligence and data-processing reviews", "Enterprise procurement and security assurance"],
  ] as const;

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
      <h1 className="text-3xl font-bold text-slate-900">GDPR vs ISO 27001</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        GDPR answers legal questions about personal data. ISO 27001 answers management questions about information
        security risk. They overlap in controls, but they are not substitutes.
      </p>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Dimension</th>
                <th className="px-3 py-2 font-semibold text-slate-900">GDPR</th>
                <th className="px-3 py-2 font-semibold text-slate-900">ISO 27001</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 last:border-b-0">
                  <td className="px-3 py-2 font-medium">{row[0]}</td>
                  <td className="px-3 py-2">{row[1]}</td>
                  <td className="px-3 py-2">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Practical difference</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>GDPR: lawful basis, rights, transparency, processors, and breach obligations.</li>
          <li>ISO 27001: governance, risk treatment, control lifecycle, audits, and continual improvement.</li>
          <li>Shared ground: asset/data inventory, access control, incident readiness, vendor oversight.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Recommended order for most SMEs</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Fix GDPR fundamentals where personal data and web tracking are exposed.</li>
          <li>Stabilize evidence and ownership (records, incidents, vendor map).</li>
          <li>Expand to ISO 27001-style ISMS if contracts demand stronger assurance.</li>
        </ol>
      </section>
      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">
          <li>Treating GDPR as paperwork only without operational controls.</li>
          <li>Launching ISO controls without clear ownership and review cadence.</li>
          <li>Duplicating work between privacy and security teams instead of mapping shared evidence.</li>
        </ul>
      </section>
      <section className="mt-6 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">90-day execution outline</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Weeks 1-3: map data, assets, and critical business workflows.</li>
          <li>Weeks 4-7: implement priority controls and define evidence owners.</li>
          <li>Weeks 8-12: run internal checks, close gaps, and prepare customer-facing assurance narratives.</li>
        </ol>
      </section>
      <div className="mt-8">
        <Link href="/regulations" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          Open regulation hub
        </Link>
      </div>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
          { href: "/compare/gdpr-vs-nis2", label: "GDPR vs NIS2" },
          { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)" },
          { href: "/checklists/iso-27001-checklist-smb", label: "ISO 27001 checklist (SMB)" },
        ]}
      />
    </div>
  );
}

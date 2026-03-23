import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the best way to use these resources?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Start with official sources for legal authority, then use practical guides and checklists to convert obligations into operational controls and evidence.",
        },
      },
      {
        "@type": "Question",
        name: "Should I start with comparisons or checklists?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use comparison pages if you are deciding framework priority. Use checklists when priorities are already clear and you need immediate execution steps.",
        },
      },
    ],
  };
  const workflowRows = [
    ["Understand obligations", "Official institutions and legal texts", "GDPR websites list"],
    ["Pick implementation order", "Framework comparison by context", "Comparison hub"],
    ["Execute controls", "Action checklists and evidence templates", "Checklists hub"],
    ["Scale by industry", "Sector-specific guides and constraints", "Sector and regulation hubs"],
  ] as const;

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
        <h2 className="text-lg font-semibold text-slate-900">Recommended workflow</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use this sequence to move from reading to implementation without wasting effort.
        </p>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-left text-sm text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Step</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Goal</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Where to start</th>
              </tr>
            </thead>
            <tbody>
              {workflowRows.map((row) => (
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
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Popular checklists</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/checklists/gdpr-checklist-smb" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            GDPR checklist
          </Link>
          <Link href="/checklists/iso-27001-checklist-smb" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            ISO 27001 checklist
          </Link>
          <Link href="/checklists/nis2-checklist-smb" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            NIS2 checklist
          </Link>
        </div>
      </section>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
          { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001" },
          { href: "/checklists", label: "Checklists hub" },
          { href: "/regulations", label: "Regulation hub" },
        ]}
      />
    </div>
  );
}

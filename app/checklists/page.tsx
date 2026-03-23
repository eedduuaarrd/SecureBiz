import type { Metadata } from "next";
import Link from "next/link";
import { getAllChecklistContent } from "@/lib/checklist-content";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compliance Checklists | GDPR, ISO 27001 and NIS2 for SMBs",
  description:
    "Actionable compliance checklists for SMBs: GDPR, ISO 27001 and NIS2 step-by-step execution lists with practical priorities.",
  keywords: [
    "GDPR checklist SMB",
    "ISO 27001 checklist SMB",
    "NIS2 checklist SMB",
    "compliance checklist",
    "cybersecurity checklist",
  ],
  alternates: {
    canonical: "/checklists",
    languages: {
      "x-default": "/checklists",
      en: "/checklists",
    },
  },
  openGraph: {
    type: "website",
    url: "/checklists",
    title: "Compliance Checklists | GDPR, ISO 27001 and NIS2 for SMBs",
    description:
      "Step-by-step checklists for GDPR, ISO 27001 and NIS2 execution.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compliance Checklists | GDPR, ISO 27001 and NIS2 for SMBs",
    description:
      "Step-by-step checklists for GDPR, ISO 27001 and NIS2 execution.",
  },
  robots: getRobotsAllowAll(),
};

export default function ChecklistsHubPage() {
  const checklists = getAllChecklistContent();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Checklists", item: absoluteUrl("/checklists") },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Compliance checklists",
    itemListElement: checklists.map((checklist, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: checklist.title,
      url: absoluteUrl(`/checklists/${checklist.slug}`),
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
      <h1 className="text-3xl font-bold text-slate-900">Compliance checklists</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        23 execution-focused checklists with controls, evidence tracking, rollout plans, common mistakes,
        and KPI targets.
      </p>
      <ul className="mt-8 grid gap-4 md:grid-cols-2">
        {checklists.map((checklist) => (
          <li key={checklist.slug}>
            <Link
              href={`/checklists/${checklist.slug}`}
              className="block rounded-xl border border-slate-200 bg-white p-5 shadow-sm hover:border-blue-300"
            >
              <h2 className="text-lg font-semibold text-slate-900">{checklist.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{checklist.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { SITE_NAME, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Product updates & site roadmap",
  description: `${SITE_NAME}: what changed on the site, new guides and hubs, and how to follow updates (RSS).`,
  alternates: { canonical: "/updates" },
  openGraph: {
    url: "/updates",
    title: `Updates | ${SITE_NAME}`,
    description:
      "Changelog-style notes for new comparison pages, checklists, SEO improvements, and guide coverage.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Updates | ${SITE_NAME}`,
    description:
      "Changelog-style notes for new comparison pages, checklists, SEO improvements, and guide coverage.",
  },
  robots: getRobotsAllowAll(),
};

const ENTRIES = [
  {
    date: "2026-03",
    title: "Scaled comparisons, checklists & RSS",
    body: "Dynamic routes for 25+ framework comparisons and 20+ execution checklists; sitewide sitemap dates for generated guides; RSS feed for newly indexed long-form guides.",
  },
  {
    date: "2026-03",
    title: "Trust & discovery",
    body: "Expanded llms.txt for AI crawlers, robots rules per major bots, OG images, and internal linking blocks by search intent.",
  },
  {
    date: "2026-02",
    title: "Sector × regulation guides",
    body: "Thousands of guide URLs pairing one professional sector with one regulation, with structured FAQs and cross-links.",
  },
] as const;

export default function UpdatesPage() {
  const pageUrl = absoluteUrl("/updates");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Updates", item: pageUrl },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} updates`,
    itemListElement: ENTRIES.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${e.date} — ${e.title}`,
    })),
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, itemListSchema]),
        }}
      />
      <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">Updates</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold text-slate-900">What&apos;s new</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        High-level changelog for {SITE_NAME}. For machine-readable new guide notifications, subscribe to{" "}
        <Link className="font-medium text-blue-700 underline" href="/rss.xml">
          the RSS feed
        </Link>
        .
      </p>

      <ol className="mt-10 space-y-8">
        {ENTRIES.map((entry) => (
          <li key={entry.title} className="border-b border-slate-200 pb-8 last:border-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{entry.date}</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-900">{entry.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{entry.body}</p>
          </li>
        ))}
      </ol>

      <IntentLinksBlock
        title="Explore"
        items={[
          { href: "/sectors", label: "Sector directory" },
          { href: "/compare", label: "Comparisons" },
          { href: "/checklists", label: "Checklists" },
          { href: "/about", label: "About & methodology" },
        ]}
      />
    </div>
  );
}

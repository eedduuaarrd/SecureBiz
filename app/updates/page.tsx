import type { Metadata } from "next";
import Link from "next/link";
import { CopyFeedUrlButton } from "@/components/copy-feed-url-button";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { PageToc } from "@/components/site-education-blocks";
import {
  CHANGELOG_ENTRIES,
  HOME_UPDATE_BULLETS,
  QUICK_ENTRY_LINKS,
  ROADMAP_ITEMS,
  UPDATE_CATEGORY_LABELS,
  UPDATES_FAQ,
  getPublishedScaleStats,
} from "@/lib/updates-content";
import { SITE_NAME, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Site updates, roadmap & RSS | Changelog for SecureBiz AI",
  description: `${SITE_NAME} changelog: new comparisons, checklists, SEO (sitemap, RSS, llms.txt), product improvements, and how to follow releases. Not legal advice.`,
  keywords: [
    "securebiz updates",
    "compliance site changelog",
    "GDPR guides RSS",
    "ISO 27001 site news",
    "NIS2 resources updates",
    "SEO sitemap changelog",
    "compliance blog alternative",
  ],
  alternates: { canonical: "/updates" },
  openGraph: {
    url: "/updates",
    title: `Updates & roadmap | ${SITE_NAME}`,
    description:
      "Release notes, SEO and product improvements, RSS for new guides, and a practical roadmap—in one place.",
  },
  twitter: {
    card: "summary_large_image",
    title: `Updates & roadmap | ${SITE_NAME}`,
    description:
      "Release notes, SEO and product improvements, RSS for new guides, and a practical roadmap—in one place.",
  },
  robots: getRobotsAllowAll(),
};

function categoryBadgeClass(cat: string): string {
  switch (cat) {
    case "content":
      return "bg-emerald-50 text-emerald-900 ring-emerald-200";
    case "seo":
      return "bg-violet-50 text-violet-900 ring-violet-200";
    case "product":
      return "bg-amber-50 text-amber-900 ring-amber-200";
    default:
      return "bg-slate-100 text-slate-800 ring-slate-200";
  }
}

export default function UpdatesPage() {
  const pageUrl = absoluteUrl("/updates");
  const site = getSiteUrl().replace(/\/$/, "");
  const stats = getPublishedScaleStats();
  const sortedLog = [...CHANGELOG_ENTRIES].sort((a, b) => b.date.localeCompare(a.date));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Updates", item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `Updates & roadmap | ${SITE_NAME}`,
    description:
      "Changelog, RSS subscription, roadmap, and practical notes on how SecureBiz AI evolves for compliance discovery.",
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: site },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE_NAME} release notes`,
    numberOfItems: sortedLog.length,
    itemListElement: sortedLog.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${e.date} — ${e.title}`,
      url: `${pageUrl}#${e.id}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: UPDATES_FAQ.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, webPageSchema, itemListSchema, faqSchema]),
        }}
      />

      <nav className="mb-6 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
          </li>
          <li className="text-slate-400">/</li>
          <li className="font-medium text-slate-900">Updates</li>
        </ol>
      </nav>

      <header className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 p-6 text-white sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">Changelog & roadmap</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          How {SITE_NAME} grows—releases, SEO, and where we are headed
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 sm:text-base">
          This is the single place for <strong>product and discovery updates</strong>: new comparison and checklist hubs,
          crawl-friendly infrastructure (sitemap, RSS, llms.txt), and honest limits. Bookmark it or add{" "}
          <Link className="font-semibold underline decoration-white/40 underline-offset-4 hover:decoration-white" href="/rss.xml">
            /rss.xml
          </Link>{" "}
          to your reader—content stays informational, not legal advice.
        </p>
        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-300">Comparison pages</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">{stats.comparisons}</dd>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-300">Checklist pages</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">{stats.checklists}</dd>
          </div>
          <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-300">Guide URLs (catalog)</dt>
            <dd className="mt-1 text-2xl font-bold tabular-nums">{stats.guideUrls.toLocaleString("en")}</dd>
          </div>
        </dl>
      </header>

      <section className="mt-8 rounded-2xl border border-blue-200 bg-blue-50/80 p-6 sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900">Never miss new long-form guides</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          The <strong>RSS feed</strong> lists recent entries from our guide store when Postgres is available. Use it in Feedly,
          Inoreader, Outlook, or any RSS client—same discovery path power users rely on for high-volume sites.
        </p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/rss.xml"
            className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Open RSS feed
          </Link>
          <CopyFeedUrlButton />
          <a
            className="text-center text-sm font-medium text-blue-900 underline underline-offset-4 hover:text-blue-950 sm:text-left"
            href={`${site}/rss.xml`}
          >
            {site}/rss.xml
          </a>
        </div>
      </section>

      <div className="mt-10">
        <PageToc
          items={[
            { id: "changelog", label: "Release notes" },
            { id: "roadmap", label: "Roadmap" },
            { id: "quick-links", label: "High-traffic entry points" },
            { id: "methodology", label: "How we ship" },
            { id: "faq", label: "FAQ" },
          ]}
        />
      </div>

      <section id="changelog" className="scroll-mt-24 mt-12">
        <h2 className="text-2xl font-bold text-slate-900">Release notes</h2>
        <p className="mt-2 text-sm text-slate-600">
          Newest first. Each card links to anchors you can cite (#id) for support tickets or internal wikis.
        </p>
        <ol className="mt-8 space-y-6">
          {sortedLog.map((entry) => (
            <li
              key={entry.id}
              id={entry.id}
              className="scroll-mt-28 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-2 gap-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">{entry.date}</span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${categoryBadgeClass(entry.category)}`}
                >
                  {UPDATE_CATEGORY_LABELS[entry.category]}
                </span>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{entry.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{entry.body}</p>
              {entry.links && entry.links.length > 0 ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:border-blue-300 hover:bg-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </section>

      <section id="roadmap" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">Roadmap (non-binding)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Directional priorities—not deadlines. We optimize for <strong>helpful pages</strong> and{" "}
          <strong>honest discovery</strong>, not churn.
        </p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
          {ROADMAP_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section id="quick-links" className="scroll-mt-24 mt-14">
        <h2 className="text-2xl font-bold text-slate-900">High-traffic entry points</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use these when you want fast internal navigation or campaign landing paths—every link is a real, indexable URL.
        </p>
        <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-4 py-3 font-semibold text-slate-900">Destination</th>
                <th className="px-4 py-3 font-semibold text-slate-900">Why open it</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              {QUICK_ENTRY_LINKS.map((row) => (
                <tr key={row.href} className="border-b border-slate-100 last:border-0">
                  <td className="px-4 py-3">
                    <Link className="font-semibold text-blue-700 underline-offset-2 hover:underline" href={row.href}>
                      {row.label}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{row.hint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="methodology" className="scroll-mt-24 mt-14 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-slate-900">How we ship changes that help discovery</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-relaxed text-slate-700">
          <li>
            <strong>Structured data</strong> where it clarifies intent (FAQ, breadcrumbs, lists)—not as spammy filler on
            every paragraph.
          </li>
          <li>
            <strong>Internal links</strong> from hubs to comparisons, checklists, and sector guides so users and crawlers
            find adjacent topics in one click.
          </li>
          <li>
            <strong>Real URLs</strong> for search (<code className="rounded bg-slate-200 px-1 py-0.5 text-xs">?q=</code> on
            sector and regulation catalogs) so sessions are shareable and measurable.
          </li>
          <li>
            <strong>Performance discipline</strong>: heavy hubs stay dynamic where needed; static pages cache aggressively;
            third-party scripts load with care so content stays readable on mobile.
          </li>
        </ul>
      </section>

      <section id="faq" className="scroll-mt-24 mt-14">
        <h2 className="text-2xl font-bold text-slate-900">FAQ</h2>
        <div className="mt-6 space-y-6">
          {UPDATES_FAQ.map((f) => (
            <article key={f.question} className="rounded-xl border border-slate-200 bg-white p-5">
              <h3 className="font-semibold text-slate-900">{f.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{f.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-xl border border-dashed border-slate-300 bg-white p-5 text-sm text-slate-700">
        <h2 className="text-lg font-semibold text-slate-900">Also highlighted on the home page</h2>
        <ul className="mt-3 list-disc space-y-1 pl-5">
          {HOME_UPDATE_BULLETS.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </section>

      <IntentLinksBlock
        title="Keep exploring"
        items={[
          { href: "/", label: "Home" },
          { href: "/sectors#catalog-search", label: "Sectors" },
          { href: "/regulations#catalog-search", label: "Regulations" },
          { href: "/compare", label: "Compare" },
          { href: "/checklists", label: "Checklists" },
          { href: "/resources", label: "Resources" },
          { href: "/about", label: "About" },
          { href: "/legal/disclaimer", label: "Disclaimer" },
        ]}
      />

      <p className="mt-10 text-center text-xs text-slate-500">
        <Link href="/" className="text-blue-700 underline-offset-2 hover:underline">
          ← Back to home
        </Link>
      </p>
    </div>
  );
}

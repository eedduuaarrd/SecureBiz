import { getAllChecklistContent } from "@/lib/checklist-content";
import { getAllCompareContent } from "@/lib/compare-content";
import { countGuideUrls } from "@/lib/discoverable-urls";

export type UpdateCategory = "content" | "seo" | "product" | "technical";

export type ChangelogEntry = {
  id: string;
  date: string;
  category: UpdateCategory;
  title: string;
  body: string;
  links?: Array<{ href: string; label: string }>;
};

export const UPDATE_CATEGORY_LABELS: Record<UpdateCategory, string> = {
  content: "Guides & hubs",
  seo: "SEO & discovery",
  product: "Product & UX",
  technical: "Technical & performance",
};

/** Short bullets for the home page “stay current” strip. */
export const HOME_UPDATE_BULLETS = [
  "25+ framework comparison pages with side-by-side tables, KPIs, and FAQs.",
  "RSS feed lists newly stored long-form guides as they are generated (with Postgres).",
  "Sitemap uses real last-modified dates per guide URL when available.",
] as const;

export function getPublishedScaleStats(): {
  comparisons: number;
  checklists: number;
  guideUrls: number;
} {
  return {
    comparisons: getAllCompareContent().length,
    checklists: getAllChecklistContent().length,
    guideUrls: countGuideUrls(),
  };
}

export const CHANGELOG_ENTRIES: ChangelogEntry[] = [
  {
    id: "scale-compare-checklist",
    date: "2026-03",
    category: "content",
    title: "Scaled comparisons and execution checklists",
    body: "Dynamic routes power dozens of comparison URLs (GDPR vs ISO 27001, NIS2 vs ISO 27001, SOC 2 vs ISO 27001, DORA vs NIS2, and many more) plus thematic checklists (incident response, vendor risk, PCI, HIPAA, cloud security, etc.). Each page includes evidence tables, rollout phases, common mistakes, and KPI ideas—not thin doorway pages.",
    links: [
      { href: "/compare", label: "Compare hub" },
      { href: "/checklists", label: "Checklists hub" },
    ],
  },
  {
    id: "sitemap-lastmod",
    date: "2026-03",
    category: "seo",
    title: "Per-URL last modified in sitemap",
    body: "Guide URLs in /sitemap.xml now pick up last-modified timestamps from the generated_content store when Postgres is available, so crawlers can prioritize refreshed long-form pages. Hub and sector URLs continue to update on each production deploy.",
    links: [{ href: "/sitemap.xml", label: "Sitemap" }],
  },
  {
    id: "rss-feed",
    date: "2026-03",
    category: "seo",
    title: "RSS feed for new guides",
    body: "Subscribe to /rss.xml in Feedly, Outlook, or your reader of choice. Items reflect guides persisted in the database (title, canonical URL, description snippet). When the DB is empty, the feed still points readers to the sector directory so subscriptions stay useful.",
    links: [{ href: "/rss.xml", label: "RSS feed" }],
  },
  {
    id: "search-query-param",
    date: "2026-03",
    category: "product",
    title: "Shareable catalog search (?q=)",
    body: "Sector, regulation, and per-regulation sector lists honor ?q= so you can bookmark and share filtered views. The home page SearchAction schema targets /sectors?q={search_term_string} for alignment with Google’s expected site-search pattern.",
    links: [
      { href: "/sectors?q=saas", label: "Example sector search" },
      { href: "/regulations?q=gdpr", label: "Example regulation search" },
    ],
  },
  {
    id: "og-images",
    date: "2026-03",
    category: "technical",
    title: "Default Open Graph and Twitter images (1200×630)",
    body: "Branded gradient OG/Twitter images are generated via the Next.js opengraph-image and twitter-image file conventions—better CTR when links are shared on Slack, LinkedIn, and X without relying on a tiny logo asset alone.",
  },
  {
    id: "llms-robots",
    date: "2026-03",
    category: "seo",
    title: "llms.txt and crawler-friendly robots",
    body: "Machine-readable /llms.txt summarizes scope, canonical host, sitemap, sample URLs, and safety notes for AI indexers. robots.txt explicitly allows common AI and search bots on public pages while keeping /admin out of scope.",
    links: [
      { href: "/llms.txt", label: "llms.txt" },
      { href: "/robots.txt", label: "robots.txt" },
    ],
  },
  {
    id: "regulation-compare-links",
    date: "2026-03",
    category: "content",
    title: "Smarter internal links on regulation hubs",
    body: "Each /normativa/{slug} page suggests relevant framework comparisons (e.g. GDPR vs NIS2) next to resources and checklists—reducing orphan pages and helping users discover adjacent intent without a separate menu hunt.",
  },
  {
    id: "resources-deep",
    date: "2026-02",
    category: "content",
    title: "Resources hub and curated top-10 lists",
    body: "The /resources area aggregates official-source lists (GDPR websites, multi-framework reading lists) with workflow tables, mistake sections, and FAQ schema for rich results.",
    links: [{ href: "/resources", label: "Resources" }],
  },
  {
    id: "sector-reg-guides",
    date: "2026-02",
    category: "content",
    title: "Sector × regulation guide matrix",
    body: "Guides pair one professional sector with one regulation per URL—structured for long-tail discovery (e.g. industry-specific GDPR) with cross-links, related guides, and implementation extras.",
    links: [{ href: "/sectors", label: "Sectors" }],
  },
  {
    id: "faq-schema",
    date: "2026-02",
    category: "seo",
    title: "FAQ and ItemList JSON-LD on key hubs",
    body: "Legal pages, hubs, comparisons, and checklists ship BreadcrumbList plus FAQ or ItemList schema where appropriate to improve eligibility for rich snippets and clearer SERP presentation.",
  },
  {
    id: "mobile-nav",
    date: "2026-02",
    category: "product",
    title: "Mobile navigation and sticky patterns",
    body: "Header navigation works on small screens; key guide templates include sticky CTAs and short sections so mobile readers still convert to audit requests without endless scrolling.",
  },
  {
    id: "security-headers",
    date: "2026-02",
    category: "technical",
    title: "Security headers and HTTPS enforcement",
    body: "Middleware applies HSTS, nosniff, frame options, referrer policy, and HTTP→HTTPS redirects for production hosts—baseline trust signals for browsers and security scanners.",
  },
  {
    id: "intent-links",
    date: "2026-02",
    category: "product",
    title: "Intent-based internal link blocks",
    body: "Reusable blocks cluster internal links by task (compare, checklist, resources) so every long page ends with obvious next steps—good for users and for distributing crawl equity.",
  },
  {
    id: "cron-guides",
    date: "2026-01",
    category: "technical",
    title: "Background guide generation (optional)",
    body: "When configured, cron endpoints can batch-generate guides with rate limits and secrets—scaling content without blocking interactive requests.",
  },
  {
    id: "brand-favicon",
    date: "2026-01",
    category: "product",
    title: "Favicon, icon, and manifest alignment",
    body: "App-router icon files and public logo assets stay aligned so tabs, PWA install, and social previews reinforce the same brand mark.",
  },
];

export const ROADMAP_ITEMS: string[] = [
  "More language-specific landing experiments (where demand justifies duplicate quality).",
  "Deeper templates for sector subpages (checklists, tools, playbooks) with fresher cross-linking.",
  "Optional JSON feeds (e.g. Atom) mirroring RSS for tools that prefer Atom.",
  "Continued E-E-A-T copy improvements on About and methodology pages as the library grows.",
];

export const UPDATES_FAQ = [
  {
    question: "How often is this page updated?",
    answer:
      "We add batches when we ship meaningful SEO, content, or product changes. Minor typo fixes may not be listed—use RSS for guide-level freshness signals.",
  },
  {
    question: "What is the RSS feed for?",
    answer:
      "It helps readers and tools discover newly persisted long-form guides. It complements the sitemap, which lists all indexable URLs for crawlers.",
  },
  {
    question: "Does an RSS item mean the legal analysis changed?",
    answer:
      "Not necessarily. It means a guide record was written or refreshed in our store. Always verify binding law against official sources and your advisors.",
  },
  {
    question: "Why do some guides show an older last-modified date?",
    answer:
      "If a guide has not been regenerated since launch, its timestamp reflects the last stored version. Open the guide and check the on-page context for operational next steps.",
  },
  {
    question: "How can I get more traffic from this site to my own project?",
    answer:
      "This site does not sell backlinks. The sustainable approach is to create cite-worthy resources, earn links ethically, and use our guides to structure implementation—not to manipulate rankings.",
  },
  {
    question: "Where should I start if I am new?",
    answer:
      "Pick the sector hub or regulation hub, use search with ?q= to narrow, then open one guide that matches your current pressure (privacy, assurance, cookies, or resilience).",
  },
  {
    question: "Are comparison pages legal advice?",
    answer:
      "No. They are educational summaries to help you prioritize. For decisions with legal consequences, consult qualified counsel and official texts.",
  },
  {
    question: "How do I report a broken link or factual issue?",
    answer:
      "Use the About page contact guidance. Concise reports with the URL and the expected correction are easiest to action.",
  },
] as const;

export const QUICK_ENTRY_LINKS: Array<{ href: string; label: string; hint: string }> = [
  { href: "/sectors#catalog-search", label: "Sector directory", hint: "Search + browse" },
  { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001", hint: "High-intent comparison" },
  { href: "/compare/nis2-vs-iso-27001", label: "NIS2 vs ISO 27001", hint: "Resilience vs ISMS" },
  { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)", hint: "Execution" },
  { href: "/resources/gdpr-websites", label: "Top GDPR websites", hint: "Official sources" },
  { href: "/regulations#catalog-search", label: "Regulation hub", hint: "A–Z frameworks" },
  { href: "/normativa/rgpd", label: "GDPR by sector", hint: "Implementation hub" },
  { href: "/about", label: "About & methodology", hint: "Trust & scope" },
];

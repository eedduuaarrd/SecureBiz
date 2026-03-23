import type { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";
import { SeoAccordion } from "@/components/seo-accordion";
import { UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import { buildSeedSectors, seedRegulations } from "@/lib/catalog";
import { SECTOR_VERTICAL_CLUSTERS } from "@/lib/expanded-content";
import {
  BRAND_ALTERNATE_NAMES,
  DEFAULT_DESCRIPTION,
  SITE_NAME,
  getDefaultOgImageUrl,
  getDefaultOgImages,
  getRobotsAllowAll,
} from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute:
      "SecureBiz AI Official Site | GDPR, ISO 27001, NIS2 Guides by Sector",
  },
  description:
    "Official SecureBiz AI website: compare GDPR, ISO 27001, NIS2 and cookie-law requirements by sector and open practical implementation guides.",
  keywords: [
    "SecureBiz",
    "Secure Biz",
    "securebiz official website",
    "secure biz official",
    "GDPR guides",
    "ISO 27001 guides",
    "NIS2 guides",
    "sector compliance",
    "cybersecurity compliance",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "SecureBiz AI Official Site | GDPR, ISO 27001, NIS2 Guides by Sector",
    description:
      "Official SecureBiz AI website: compare GDPR, ISO 27001, NIS2 and cookie-law requirements by sector.",
    images: getDefaultOgImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: "SecureBiz AI Official Site | GDPR, ISO 27001, NIS2 Guides by Sector",
    description:
      "Official SecureBiz AI website: compare GDPR, ISO 27001, NIS2 and cookie-law requirements by sector.",
    images: [getDefaultOgImageUrl()],
  },
  robots: getRobotsAllowAll(),
};

export default function Home() {
  const allSectors = buildSeedSectors();
  const featuredSectors = allSectors.slice(0, 9);
  const siteUrl = getSiteUrl();
  const rgpdSlug =
    seedRegulations.find((r) => r.slug === "rgpd")?.slug ?? "rgpd";

  const topRegulationSlugs = [
    "rgpd",
    "iso-27001",
    "llei-cookies",
    "nis2",
    "dora",
    "soc-2",
  ] as const;
  const topRegulations = topRegulationSlugs
    .map((slug) => seedRegulations.find((r) => r.slug === slug))
    .filter((r): r is (typeof seedRegulations)[number] => Boolean(r));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    description: DEFAULT_DESCRIPTION,
    knowsAbout: [
      "GDPR",
      "ISO 27001",
      "Cookie law",
      "Cybersecurity",
      "Data protection compliance",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: [...BRAND_ALTERNATE_NAMES],
    url: siteUrl,
    description: DEFAULT_DESCRIPTION,
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };

  const featuredItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Featured niches",
    numberOfItems: featuredSectors.length,
    itemListElement: featuredSectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sector.name,
      url: absoluteUrl(`/guia/${sector.slug}/rgpd`),
    })),
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Get from search intent to a compliance audit request",
    description:
      "Pick a sector, open a regulation-specific guide, then submit the audit form when you want a tailored implementation sequence.",
    totalTime: "PT3M",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose your sector",
        text: "Use the sector hub or catalog search to match your real business type so vocabulary and risks align with your workflows.",
      },
      {
        "@type": "HowToStep",
        name: "Open the right guide",
        text: "Select GDPR, ISO 27001, cookie law, or NIS2 depending on your current pressure (privacy, assurance, website tracking, or cyber resilience).",
      },
      {
        "@type": "HowToStep",
        name: "Request an audit",
        text: "Use the on-page form to capture context and see contextual tool options—structured lead capture without cold outreach.",
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I find a GDPR guide for my specific sector?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open the sector hub, search for your industry, then pick GDPR from the regulation cards. Each guide URL pairs one sector with one regulation so examples stay concrete.",
        },
      },
      {
        "@type": "Question",
        name: "What is the difference between ISO 27001 and NIS2 for SMBs?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ISO 27001 is a certifiable ISMS standard for systematic security management. NIS2 is an EU directive with sector scope and reporting obligations—often complementary, not interchangeable. Use sector guides to map both to your stack.",
        },
      },
      {
        "@type": "Question",
        name: "Is this legal advice or does it replace a lawyer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. SecureBiz AI provides informational guides to help you understand what you need to implement. For specific legal decisions, consult a qualified professional.",
        },
      },
      {
        "@type": "Question",
        name: "What do you collect in the audit form?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Your sector and basic contact details to tailor recommendations and show relevant tool options with clear calls to action.",
        },
      },
      {
        "@type": "Question",
        name: "Do the guides work on mobile?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Content is structured for quick reading with short sections, visible calls to action, and sticky CTAs on key pages.",
        },
      },
      {
        "@type": "Question",
        name: "How much information is on each guide page?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each guide includes professional structure, actionable checklists, and FAQs aligned with real compliance and cybersecurity questions—for both humans and search engines.",
        },
      },
      {
        "@type": "Question",
        name: "How do I choose between sector hub, regulation hub, and a guide?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the sector hub to see risks and regulations for your industry; use the regulations hub to compare frameworks; open a guide when you want sector-specific implementation steps for one regulation.",
        },
      },
      {
        "@type": "Question",
        name: "Is SecureBiz AI only for the EU?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Many guides focus on EU frameworks like GDPR, but we also cover global standards such as ISO 27001 and sector-relevant US rules where applicable. Always confirm jurisdiction-specific obligations.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(featuredItemListSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 text-white sm:p-10">
        <div className="flex items-center gap-3 sm:gap-4">
          <BrandLogo
            width={64}
            height={64}
            className="h-14 w-14 rounded-lg shadow-lg ring-1 ring-white/20 sm:h-16 sm:w-16"
          />
          <p className="text-xs uppercase tracking-[0.2em] text-slate-100 sm:text-sm">
            SecureBiz AI
          </p>
        </div>
        <h1 className="mt-4 max-w-3xl text-3xl font-bold leading-tight sm:mt-3 sm:text-4xl">
          GDPR, ISO 27001 &amp; NIS2 guides built for your sector—not generic compliance filler.
        </h1>
        <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
          Actionable checklists, risk framing, and regulation-specific wording for real businesses. Pick your industry,
          open a guide, and move from reading to an audit request in one flow.
        </p>
        <div className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            href={`/guia/${featuredSectors[0].slug}/${rgpdSlug}`}
            className="rounded-xl bg-white px-5 py-3.5 text-center text-sm font-semibold text-slate-900 touch-manipulation min-h-12 flex items-center justify-center sm:min-h-0 sm:py-2.5"
          >
            Enter a real guide
          </Link>
          <Link
            href="/sectors#catalog-search"
            className="rounded-xl border border-white/30 px-5 py-3.5 text-center text-sm font-semibold text-white touch-manipulation min-h-12 flex items-center justify-center sm:min-h-0 sm:py-2.5"
          >
            Explore sectors
          </Link>
          <Link
            href="/legal/disclaimer"
            className="rounded-xl border border-white/30 px-5 py-3.5 text-center text-sm font-semibold text-white touch-manipulation min-h-12 flex items-center justify-center sm:min-h-0 sm:py-2.5"
          >
            Legal disclaimer
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <UsefulContextCallout title="How to get maximum value from this site">
          <p>
            SecureBiz AI is built for <strong>operators</strong>: owners, IT leads, office managers, and consultants who
            need a credible plan fast. Start from the problem you have this quarter—personal data, security assurance,
            or website tracking—then drill into sector-specific language so nothing feels generic.
          </p>
          <p>
            Every long-form URL pairs a <strong>regulation</strong> with a <strong>sector</strong>. That pairing is
            intentional: search engines and teams alike look for “ISO 27001 + dental clinic” or “cookies + ecommerce”,
            not a single 10,000-word article that tries to cover everyone.
          </p>
        </UsefulContextCallout>

        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-900">Pick your entry path (in one minute)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Use this table to route yourself to the most useful page type—then use search on hub pages to narrow results.
          </p>
          <UsefulDataTable caption="Where to start">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">If your priority is…</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Open first</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Why</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">You know your industry but not which law matters</td>
                <td className="px-3 py-2">
                  <Link className="text-blue-700 underline" href="/sectors#catalog-search">
                    Sector hub
                  </Link>
                </td>
                <td className="px-3 py-2">See sector risks and every regulation available for that niche.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">You know the law but need industry wording</td>
                <td className="px-3 py-2">
                  <Link className="text-blue-700 underline" href="/regulations#catalog-search">
                    Regulations hub
                  </Link>
                </td>
                <td className="px-3 py-2">Compare frameworks, then jump into sector guides.</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">You want a single actionable document</td>
                <td className="px-3 py-2">
                  <Link className="text-blue-700 underline" href={`/guia/${featuredSectors[0].slug}/${rgpdSlug}`}>
                    A full guide
                  </Link>
                </td>
                <td className="px-3 py-2">Checklists, FAQs, tools, and lead capture in one flow.</td>
              </tr>
              <tr>
                <td className="px-3 py-2">You need deep sector resources (playbooks)</td>
                <td className="px-3 py-2">
                  <Link className="text-blue-700 underline" href={`/sector/${featuredSectors[0].slug}`}>
                    Sector hub page
                  </Link>
                </td>
                <td className="px-3 py-2">Subpages cover checklists, vendors, incidents, and more.</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Top frameworks &amp; laws (hub pages)
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Each page lists sector-specific guides for that regulation—ideal when you already know the law name and need
          industry context (healthcare, SaaS, retail, professional services, and more).
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {topRegulations.map((reg) => (
            <li key={reg.slug}>
              <Link
                href={`/normativa/${reg.slug}`}
                className="flex flex-col rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2.5 text-sm transition hover:border-blue-300 hover:bg-white"
              >
                <span className="font-semibold text-slate-900">{reg.name}</span>
                <span className="mt-0.5 text-xs text-slate-500">{reg.country}</span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          Prefer the full catalog?{" "}
          <Link href="/regulations#catalog-search" className="font-medium text-blue-700 underline-offset-2 hover:underline">
            Browse every regulation A–Z
          </Link>{" "}
          or{" "}
          <Link href="/sectors#catalog-search" className="font-medium text-blue-700 underline-offset-2 hover:underline">
            start from your sector
          </Link>
          .
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Vertical examples (same laws, different workflows)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Jump to a representative sector hub—then open GDPR, ISO 27001, NIS2, or cookie guides from the regulation cards.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_VERTICAL_CLUSTERS.map((cluster) => {
            const example =
              allSectors.find((s) => s.slug === cluster.exampleSlug) ?? allSectors[0];
            return (
              <li
                key={cluster.label}
                className="rounded-lg border border-slate-100 bg-slate-50/90 p-4"
              >
                <p className="font-semibold text-slate-900">{cluster.label}</p>
                <p className="mt-1 text-xs text-slate-600">{cluster.hint}</p>
                <Link
                  href={`/sector/${example.slug}`}
                  className="mt-2 inline-block text-sm font-medium text-blue-700 underline-offset-2 hover:underline"
                >
                  {example.name} →
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          GDPR vs ISO 27001 vs cookie law — which page should you open first?
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Use this table to pick the right guide. Every cell links to a real long-form guide pattern.
        </p>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Topic</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Best when…</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Start here</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr className="border-b border-slate-100">
                <td className="px-3 py-3 font-medium">GDPR</td>
                <td className="px-3 py-3">You process personal data, run marketing, or store client records.</td>
                <td className="px-3 py-3">
                  <Link href="/regulations#catalog-search" className="text-blue-700 underline-offset-2 hover:underline">
                    Regulations hub
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-3 font-medium">ISO 27001</td>
                <td className="px-3 py-3">Clients ask for an ISMS, RFPs require security proof, or you scale a SaaS.</td>
                <td className="px-3 py-3">
                  <Link href="/sectors#catalog-search" className="text-blue-700 underline-offset-2 hover:underline">
                    Pick your sector
                  </Link>
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-3 font-medium">Cookie law</td>
                <td className="px-3 py-3">You run ads, analytics, chat widgets, or A/B tests on your site.</td>
                <td className="px-3 py-3">
                  <Link href={`/guia/${featuredSectors[0].slug}/llei-cookies`} className="text-blue-700 underline-offset-2 hover:underline">
                    Example cookie guide
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">
          Deep dives (interactive)
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Open any section—content is in the HTML for crawlers and assistants, not hidden behind a paywall.
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Why pSEO clusters beat a single “pillar page”",
                content:
                  "Long-tail URLs match real queries and reduce competition per page. A single article cannot cover every sector × regulation combination. Clustered guides let you capture qualified traffic while keeping each page specific enough to convert.",
              },
              {
                title: "How to move from reading to evidence",
                content:
                  "After each guide, capture concrete outputs: system inventory, owner list, vendor register, and incident workflow. This turns content into auditable progress instead of passive reading.",
              },
              {
                title: "How to choose tools without vendor bias",
                content:
                  "Start from controls and evidence requirements, then shortlist tools that satisfy data residency, access logging, DPA terms, and export/exit capability.",
              },
              {
                title: "What happens if the database is offline",
                content:
                  "Guides still render a rich long-form structure. That means uptime for SEO and user trust: no blank pages during incidents, and crawlers still see complete text.",
              },
              {
                title: "Mobile performance and sticky CTAs",
                content:
                  "On phones, guides use short sections and a sticky CTA on key templates so users can move from reading to action without hunting for the form.",
              },
              {
                title: "How to use this site for AI search (AEO)",
                content:
                  "Clear headings, FAQs, and factual checklists improve extractability for AI answers. The goal is to be cited as a useful source when buyers ask compliance questions in chat tools.",
              },
            ]}
          />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-slate-900">Featured niches</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {featuredSectors.map((sector) => (
            <Link
              key={sector.slug}
              href={`/guia/${sector.slug}/rgpd`}
              className="rounded-lg border border-slate-200 bg-white p-4 text-slate-800 shadow-sm hover:border-blue-300"
            >
              <p className="font-medium">{sector.name}</p>
              <p className="mt-1 text-sm text-slate-600">GDPR applied + checklist</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Authoritative references (official sources)
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Use these for binding text and supervisory guidance; use SecureBiz AI for sector translation and implementation sequencing.
        </p>
        <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://edpb.europa.eu/" target="_blank" rel="noreferrer">European Data Protection Board (EDPB)</a></li>
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://commission.europa.eu/" target="_blank" rel="noreferrer">European Commission</a></li>
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://www.aepd.es/" target="_blank" rel="noreferrer">AEPD (Spain DPA)</a></li>
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://www.enisa.europa.eu/" target="_blank" rel="noreferrer">ENISA (NIS2, resilience)</a></li>
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://www.iso.org/" target="_blank" rel="noreferrer">ISO Organization</a></li>
          <li><a className="text-blue-700 underline-offset-2 hover:underline" href="https://ico.org.uk/" target="_blank" rel="noreferrer">ICO (UK guidance)</a></li>
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/resources/gdpr-websites"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Top 10 GDPR websites
          </Link>
          <Link
            href="/resources/gdpr-iso-27001-nis2-guides"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Top 10 GDPR + ISO 27001 + NIS2 guides
          </Link>
        </div>
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-2">
        <Link
          href="/sectors#catalog-search"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300"
        >
          <h3 className="text-lg font-semibold text-slate-900">Sector hub</h3>
          <p className="mt-1 text-sm text-slate-600">
            Browse all professional niches and find your guide.
          </p>
        </Link>
        <Link
          href="/regulations#catalog-search"
          className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-300"
        >
          <h3 className="text-lg font-semibold text-slate-900">Regulations hub</h3>
          <p className="mt-1 text-sm text-slate-600">
            GDPR, ISO 27001, and cookie law with sector links.
          </p>
        </Link>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Turn a search into implementation (in 3 steps)
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          <li>
            <span className="font-semibold text-slate-900">Pick your sector</span>:
            you land on the correct guide for compliance intent (not generic content).
          </li>
          <li>
            <span className="font-semibold text-slate-900">
              Get the action plan
            </span>
            : checklist, digital risk sections, and operational security to justify priorities.
          </li>
          <li>
            <span className="font-semibold text-slate-900">
              Produce evidence
            </span>
            : document what was changed, by whom, and where proof is stored (logs, tickets, approvals).
          </li>
        </ol>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          Frequently asked questions
        </h2>
        <dl className="mt-4 space-y-4 text-sm text-slate-700">
          <div>
            <dt className="font-semibold text-slate-900">
              How do I find a GDPR guide for my specific sector?
            </dt>
            <dd className="mt-1">
              Use the{" "}
              <Link href="/sectors#catalog-search" className="text-blue-700 underline-offset-2 hover:underline">
                sector hub
              </Link>
              , search for your industry, then choose GDPR from the regulation list. Every guide URL is{" "}
              <strong>one sector × one regulation</strong> so the language stays specific.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              What is the difference between ISO 27001 and NIS2 for SMBs?
            </dt>
            <dd className="mt-1">
              ISO 27001 is a certifiable security management system (ISMS). NIS2 is an EU directive with reporting and
              governance expectations in scope sectors—they solve different questions. Use{" "}
              <Link href="/normativa/iso-27001" className="text-blue-700 underline-offset-2 hover:underline">
                ISO 27001 hub
              </Link>{" "}
              and{" "}
              <Link href="/normativa/nis2" className="text-blue-700 underline-offset-2 hover:underline">
                NIS2 hub
              </Link>{" "}
              to pick sector guides, then validate scope with professionals.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              Is this legal or does it replace a lawyer?
            </dt>
            <dd className="mt-1">
              No. It’s an informational guide to help you understand what you need to implement.
              For specific legal decisions, consult a professional.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              What do you collect in the audit form?
            </dt>
            <dd className="mt-1">
              Your sector and basic data to tailor recommendations and show tool options with CTAs.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              Do the guides work on mobile?
            </dt>
            <dd className="mt-1">
              Yes. The format is designed for quick reading: short sections, visible calls to action,
              and a “sticky” CTA on key pages.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              How much information is on each page?
            </dt>
            <dd className="mt-1">
              Each page includes professional structure, actionable checklists, and FAQs designed to resolve
              decision questions (for humans, and for search engines/AI systems).
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              Sector hub vs regulation hub vs guide—what’s the difference?
            </dt>
            <dd className="mt-1">
              The sector hub explains risks for your business type and lists regulations. The regulation hub explains
              each framework and links sectors. A guide is the long-form implementation page for one sector × one
              regulation.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-slate-900">
              Is this only for EU companies?
            </dt>
            <dd className="mt-1">
              Much content references EU rules (e.g. GDPR), but standards like ISO 27001 are global. Always map guides to
              your country and contracts—use professionals for jurisdictional certainty.
            </dd>
          </div>
        </dl>
      </section>
    </div>
  );
}

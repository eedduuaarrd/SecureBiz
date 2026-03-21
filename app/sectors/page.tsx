import type { Metadata } from "next";
import Link from "next/link";
import {
  AdSenseDisplayAuto,
  AdSenseFluid,
  AdSenseInArticle,
  AdSenseMultiplex,
} from "@/components/adsense-units";
import { CatalogSearchInput } from "@/components/catalog-search-input";
import { SeoAccordion } from "@/components/seo-accordion";
import { HubFooterLinks, UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import { VisualStepTimeline } from "@/components/visual-step-timeline";
import { buildSeedSectors } from "@/lib/catalog";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

/** Huge list + search: skip static HTML at build (avoids Vercel 60–180s page timeouts). */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Professional sectors | GDPR & cybersecurity guides",
  description:
    "Browse professional sectors with compliance and digital security guides.",
  alternates: {
    canonical: "/sectors",
  },
  openGraph: {
    url: "/sectors",
    title: "Professional sectors | GDPR & cybersecurity guides",
    description:
      "Browse professional sectors with compliance and digital security guides.",
  },
  robots: getRobotsAllowAll(),
};

export default function SectorsHubPage() {
  const sectors = buildSeedSectors();
  const rgpdSectors = sectors.slice(0, 6);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Professional sectors",
    description:
      "Browse professional sectors with compliance and digital security guides.",
    url: absoluteUrl("/sectors"),
  };

  const sectorItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Professional sectors",
    numberOfItems: sectors.length,
    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sector.name,
      url: absoluteUrl(`/sector/${sector.slug}`),
    })),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(sectorItemListSchema),
        }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Professional sectors</h1>
      <p className="mt-2 text-slate-600">
        Choose your niche and get a practical compliance guide (GDPR, ISO 27001,
        and cookie law) designed for concrete actions.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        This directory exists so search engines can discover thousands of meaningful URLs: each sector links to
        regulation-specific guides with unique examples and vocabulary. You do not need paid campaigns if your pages
        answer the exact questions owners type into Google—implementation steps, evidence, and tooling—then offer a
        clear audit request path.
      </p>

      <div className="mt-8">
        <VisualStepTimeline
          title="Pick a sector in two minutes"
          steps={[
            {
              title: "Scan the list for your business type",
              body: "Names mirror how people describe themselves (e.g. clinic, agency, ecommerce).",
            },
            {
              title: "Open the sector hub",
              body: "You’ll see risks and every regulation available for that niche.",
            },
            {
              title: "Start with GDPR or your top risk",
              body: "GDPR is the default entry for many SMBs; ISO 27001 appears when clients demand security proof.",
            },
          ]}
        />
      </div>

      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Turn visits into leads
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>1) Pick your sector.</li>
          <li>2) See the regulation that applies to you.</li>
          <li>3) Take the next implementation step with the form.</li>
        </ul>
        <div className="mt-4 text-sm text-slate-600">
          Every guide includes an audit CTA and recommended tools to monetize clicks.
        </div>
      </section>

      <div className="my-10 min-h-[100px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/90 p-4">
        <AdSenseDisplayAuto />
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Start today (GDPR)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          The first sectors highlight “money” guides because traffic already comes
          with compliance intent.
        </p>
        <ul className="mt-4 grid gap-3 md:grid-cols-3">
          {rgpdSectors.map((sector) => (
            <li key={sector.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-sm font-semibold text-slate-900">{sector.name}</div>
              <Link
                href={`/guia/${sector.slug}/rgpd`}
                className="mt-2 inline-block rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                Get the GDPR guide
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">All sectors (A–Z)</h2>
        <p className="mt-1 text-sm text-slate-600">
          Sorted alphabetically. Use search to narrow the list.
        </p>
        <div className="mt-4 space-y-4">
          <CatalogSearchInput
            listId="sectors-catalog-list"
            searchLabel="Search sectors"
            searchPlaceholder="Type a sector name (e.g. dental, gym, SaaS)…"
            totalCount={sectors.length}
          />
          <ul
            id="sectors-catalog-list"
            className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {sectors.map((sector) => (
              <li
                key={sector.slug}
                data-catalog-search={`${sector.name.toLowerCase()} ${sector.slug.toLowerCase()}`}
              >
                <Link
                  href={`/sector/${sector.slug}`}
                  className="block h-full rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <p className="font-medium text-slate-900">{sector.name}</p>
                  <p className="mt-1 text-sm text-slate-500">Open hub →</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="my-10 min-h-[100px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/90 p-4">
        <AdSenseFluid />
      </div>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">What you’ll find in every guide</h2>
        <p className="mt-2 text-sm text-slate-600">
          It’s not just “information”: it’s a decision-focused structure that turns reading into action.
        </p>
        <ul className="mt-4 grid gap-2 text-sm text-slate-700 md:grid-cols-2">
          <li>Compliance checklist (clear steps).</li>
          <li>Digital risk map (prioritization).</li>
          <li>Operational security (controls & evidence).</li>
          <li>FAQs for real management questions.</li>
        </ul>

        <div className="mt-5 rounded-lg border border-blue-100 bg-blue-50 p-4">
          <p className="text-sm text-slate-700">
            Recommendation: when you finish reading, use the form to request an audit.
            This helps us tailor your next step (lead + affiliate).
          </p>
        </div>
      </section>

      <div className="my-10 min-h-[100px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/90 p-4">
        <AdSenseInArticle />
      </div>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Digital risks that repeat across sectors
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Regardless of your niche, most teams share the same core problems:
          <strong> weak or reused credentials</strong>, <strong> scattered data</strong> across email and spreadsheets,
          <strong> unchecked vendors</strong>, and <strong>no incident log</strong>.
          Our guides start from this map so you can prioritize in weeks, not years.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          Each sector profile links the core regulations (GDPR, ISO 27001, cookie law),
          so you can align legal compliance, information security, and your website in one journey.
        </p>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Mini-guides</h2>
        <p className="mt-1 text-sm text-slate-600">
          If you’re in a hurry, start with a GDPR guide to get structure and steps to act.
          Then extend it with ISO 27001 and the cookie law.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href={`/guia/${rgpdSectors[0].slug}/rgpd`}
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            View first guide
          </Link>
          <Link
            href="/regulations"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Choose a regulation
          </Link>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <UsefulContextCallout title="Why sector-first navigation matters">
          <p>
            Compliance failures rarely come from “not reading the law”. They come from <strong>misapplied context</strong>
            : the same GDPR article is implemented differently in a five-person agency than in a hospital group. By
            starting from your sector, you anchor controls to real workflows—patient intake, POS systems, CRMs, field
            devices—instead of abstract theory.
          </p>
        </UsefulContextCallout>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">What to prepare before you open a guide</h2>
          <p className="mt-2 text-sm text-slate-600">
            You do not need perfect documentation—just enough honesty to prioritise.
          </p>
          <UsefulDataTable caption="Quick pre-read checklist">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Question</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Why it changes the plan</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Where is personal data created and stored?</td>
                <td className="px-3 py-2">Defines scope for GDPR, backups, and access control</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Which systems are internet-exposed?</td>
                <td className="px-3 py-2">Drives urgency for MFA, patching, and monitoring</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Which vendors touch client data?</td>
                <td className="px-3 py-2">Drives DPAs, subprocessors, and exit plans</td>
              </tr>
              <tr>
                <td className="px-3 py-2">What would trigger a bad week (incident scenarios)?</td>
                <td className="px-3 py-2">Aligns ISO-style controls with real risk appetite</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-slate-900">Questions operators ask before committing</h2>
        <p className="mt-2 text-sm text-slate-600">
          Full text in page source — good for SEO and AI citations.
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Do I need every regulation on day one?",
                content:
                  "No. Start with the framework that matches your biggest external pressure (often GDPR). Add ISO 27001 when procurement or insurers require it, and cookie law when marketing tags create consent risk.",
              },
              {
                title: "Is this a replacement for consultants?",
                content:
                  "It’s an accelerator: structured guidance and checklists. Complex cases still need professionals; the guides help you ask better questions and prioritize spend.",
              },
              {
                title: "How do audits and tools fit together?",
                content:
                  "The audit form captures your context. Affiliate links suggest tools when you’re ready to implement—so monetization aligns with problem solving, not intrusive ads.",
              },
              {
                title: "Can I share these guides with my team?",
                content:
                  "Yes—use them as a shared baseline for discussions. For external distribution or commercial reuse, respect copyright and link back to the canonical URL.",
              },
              {
                title: "What if we operate in multiple countries?",
                content:
                  "Start from the strictest client or regulator requirement you cannot ignore, then map overlaps. The hubs help you reuse work across frameworks instead of duplicating effort.",
              },
            ]}
          />
        </div>
      </section>

      <div className="my-10 min-h-[100px] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50/90 p-4">
        <AdSenseMultiplex />
      </div>

      <HubFooterLinks />
    </div>
  );
}

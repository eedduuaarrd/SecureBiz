import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CatalogSearchInput } from "@/components/catalog-search-input";
import { SeoAccordion } from "@/components/seo-accordion";
import { UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import {
  buildSeedSectors,
  seedRegulations,
  isRegulationAllowedForSectorSlug,
} from "@/lib/catalog";
import { getRegulationNarrativeExtra } from "@/lib/expanded-content";
import { getDefaultOgImageUrl, getDefaultOgImages, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type RegulationPageProps = {
  params: Promise<{
    "regulation-slug": string;
  }>;
};

/** Large sector grids per regulation: render on demand so `next build` stays fast on Vercel. */
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: RegulationPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const regulation = seedRegulations.find(
    (item) => item.slug === resolvedParams["regulation-slug"],
  );

  if (!regulation) {
    return { title: "Regulation not found" };
  }

  const path = `/normativa/${regulation.slug}`;
  const metaDescription = (() => {
    const core = `${regulation.description} Compare sector-by-sector implementation with evidence, pitfalls, and phased rollout guidance.`;
    return core.length > 158 ? `${core.slice(0, 155)}…` : core;
  })();

  return {
    title: `${regulation.name} by Sector | Implementation Guide Hub`,
    description: metaDescription,
    keywords: [
      regulation.name,
      `${regulation.name} implementation`,
      `${regulation.name} checklist`,
      `${regulation.name} by sector`,
      "compliance evidence",
      "risk controls",
    ],
    alternates: {
      canonical: path,
      languages: {
        "x-default": path,
        en: path,
      },
    },
    openGraph: {
      type: "website",
      title: `${regulation.name} by Sector | Implementation Guide Hub`,
      description: metaDescription,
      url: path,
      siteName: "SecureBiz AI",
      locale: "en_US",
      images: getDefaultOgImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${regulation.name} by Sector | Implementation Guide Hub`,
      description: metaDescription,
      images: [getDefaultOgImageUrl()],
    },
    robots: getRobotsAllowAll(),
  };
}

export default async function RegulationPage({ params }: RegulationPageProps) {
  const resolvedParams = await params;
  const regulation = seedRegulations.find(
    (item) => item.slug === resolvedParams["regulation-slug"],
  );
  const sectors = buildSeedSectors()
    .filter((s) =>
      isRegulationAllowedForSectorSlug(s.slug, resolvedParams["regulation-slug"]),
    )
    .slice(0, 120);

  if (!regulation) {
    notFound();
  }

  const extra = getRegulationNarrativeExtra(regulation.slug);
  const pageUrl = absoluteUrl(`/normativa/${regulation.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Regulations", item: absoluteUrl("/regulations") },
      { "@type": "ListItem", position: 3, name: regulation.name, item: pageUrl },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${regulation.name} sector guides`,
    numberOfItems: sectors.length,
    itemListElement: sectors.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${regulation.name} for ${sector.name}`,
      url: absoluteUrl(`/guia/${sector.slug}/${regulation.slug}`),
    })),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <nav className="mb-5 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href="/regulations" className="hover:text-slate-900">Regulations</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">{regulation.name}</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">
        {regulation.name} for professional sectors
      </h1>
      <p className="mt-2 text-slate-600">{regulation.description}</p>
      <div className="mt-6 space-y-3 text-sm leading-relaxed text-slate-700">
        {extra.deepDiveParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        Below you’ll find a large grid of sector-specific guides. Each URL targets a unique combination of{" "}
        <strong>{regulation.name}</strong> vocabulary plus industry context—exactly how teams search when they need to
        implement controls, not read theory. More indexed pages with internal links raise the chance that Google (and AI
        overviews) surface your answers without paid distribution.
      </p>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Evidence teams usually need</h2>
        <p className="mt-2 text-sm text-slate-600">
          Not legal advice—this is what auditors, insurers, and enterprise buyers often ask to see when a claim is tested.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
          {extra.evidenceBullets.map((b, i) => (
            <li key={`e-${i}`}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-amber-100 bg-amber-50/80 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Common early mistakes</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-800">
          {extra.pitfalls.map((b, i) => (
            <li key={`p-${i}`}>{b}</li>
          ))}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50/90 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Phased rollout (practical framing)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Use this as a planning spine—then adapt months to your capacity and regulator timelines.
        </p>
        <ol className="mt-4 space-y-4">
          {extra.phases.map((phase, idx) => (
            <li
              key={phase.title}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <p className="text-sm font-semibold text-slate-900">
                {idx + 1}. {phase.title}
              </p>
              <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                {phase.bullets.map((b, j) => (
                  <li key={`${idx}-${j}`}>{b}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-8 space-y-6">
        <UsefulContextCallout title={`What “${regulation.name}” means in practice`}>
          <p>
            Regulations are not just text—they are <strong>obligations</strong> tied to evidence: records, risk
            decisions, contracts, and operational habits. The guides below translate <strong>{regulation.name}</strong>{" "}
            into sector-specific language so you can see how the same article applies to a clinic, a retailer, or a
            SaaS team.
          </p>
          <p>
            Use this page when you already know the framework name but need a <strong>portfolio of implementations</strong>
            : different industries, similar controls, different vocabulary. That is how procurement, security, and legal
            teams actually search.
          </p>
        </UsefulContextCallout>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Reading strategy (high signal)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Avoid reading random guides—use the grid below with search to match your sector.
          </p>
          <UsefulDataTable caption="How to read guides efficiently">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Step</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Action</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Why it helps</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">1</td>
                <td className="px-3 py-2">Pick the sector closest to your real workflows</td>
                <td className="px-3 py-2">Vocabulary matches how you audit yourself</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2">Skim the executive summary + risk map in the guide</td>
                <td className="px-3 py-2">You decide whether to commit time or escalate to experts</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">3</td>
                <td className="px-3 py-2">Execute the checklist items you can finish this month</td>
                <td className="px-3 py-2">Momentum beats “perfect compliance on paper”</td>
              </tr>
              <tr>
                <td className="px-3 py-2">4</td>
                <td className="px-3 py-2">Submit the audit form when you want a tailored sequence</td>
                <td className="px-3 py-2">Structured lead capture + contextual tool suggestions</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          What you’ll find in the guides for this regulation
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          Each URL combines <strong>{regulation.name}</strong> with a specific sector.
          This lets you talk about the same legal framework using sector-specific vocabulary and examples
          (healthcare, retail, professional services, etc.). Pages include an executive summary, a risk map,
          a 30-day plan, operational security, vendor management, KPIs,           and a glossary—full long-form content
          even when the remote data layer is unavailable.
        </p>
      </section>

      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          How {regulation.name} changes by sector
        </h2>
        <p className="mt-2 text-sm text-slate-700">
          The legal text is shared, but implementation differs by workflow. Healthcare emphasizes special-category data,
          ecommerce emphasizes consent and tracking, and SaaS emphasizes access, subprocessors, and incident communication.
          The guides below capture these operational differences.
        </p>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">How to start quickly</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {sectors.slice(0, 3).map((s) => (
            <div key={s.slug} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm font-semibold text-slate-900">{s.name}</p>
              <Link
                href={`/guia/${s.slug}/${regulation.slug}`}
                className="mt-2 inline-block rounded-md bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800"
              >
                View guide
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-4">
        <CatalogSearchInput
          listId={`normativa-sectors-${regulation.slug}`}
          searchLabel={`Search sectors for ${regulation.name}`}
          searchPlaceholder="Filter by sector name…"
          totalCount={sectors.length}
        />
        <ul
          id={`normativa-sectors-${regulation.slug}`}
          className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
        >
          {sectors.map((sector) => (
            <li
              key={sector.slug}
              data-catalog-search={`${sector.name.toLowerCase()} ${sector.slug.toLowerCase()}`}
            >
              <Link
                href={`/guia/${sector.slug}/${regulation.slug}`}
                className="block rounded-lg border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
              >
                <p className="font-medium text-slate-900">{sector.name}</p>
                <p className="mt-1 text-sm text-slate-600">View full guide</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">FAQ about {regulation.name}</h2>
        <p className="mt-2 text-sm text-slate-600">
          Expand for details — crawlers still see all text.
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Does this regulation apply to my clients?",
                content:
                  "It depends on your context (data types, processes, and risk). The guide helps you identify what evidence and decisions you need to document.",
              },
              {
                title: 'How do I know if my plan is “sufficient”?',
                content:
                  "With the controls and the checklist. The guide gives practical criteria to prioritize, justify, and prove implementation.",
              },
              {
                title: "Can I start with a pilot phase?",
                content:
                  "Yes. Start with initial steps as a pilot, then iterate and scale when you have results and evidence.",
              },
              {
                title: "What if the data server fails—does the guide change?",
                content:
                  "The main content stays useful: you see a structured long-form version by default so the page never becomes blank and you can continue compliance work.",
              },
              {
                title: `How do I connect ${regulation.name} with cybersecurity?`,
                content:
                  "Compliance and security are linked: policies without controls are paper; controls without governance are hard to justify. The guides explain how to integrate both into day-to-day operations.",
              },
              {
                title: "What if my sector is not listed?",
                content:
                  "Pick the closest sector and use the search box on this page. Many controls transfer across adjacent industries; the important part is honest mapping of data flows and vendors.",
              },
              {
                title: "How often should I revisit the guide?",
                content:
                  "At least quarterly while you are implementing changes, and after major events: new product, new vendor, breach, or new contract with security clauses.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

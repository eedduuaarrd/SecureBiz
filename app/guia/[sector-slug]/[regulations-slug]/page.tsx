import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AffiliateHub } from "@/components/affiliate-hub";
import { GuideCrossLinks } from "@/components/guide-cross-links";
import { GuideImplementationExtras } from "@/components/guide-implementation-extras";
import { GuideFaqSection } from "@/components/guide-faq-section";
import { GuideRichIntro } from "@/components/guide-rich-intro";
import { LeadCaptureWidget } from "@/components/lead-capture-widget";
import { MarkdownArticle } from "@/components/markdown-article";
import { RelatedGuides } from "@/components/related-guides";
import { MobileStickyLead } from "@/components/mobile-sticky-lead";
import {
  buildSeedSectors,
  seedRegulations,
  getRegulationSeedsForSectorSlug,
  isRegulationAllowedForSectorSlug,
} from "@/lib/catalog";
import {
  getOrCreateGuide,
  getRelatedGuides,
  getSectorAndRegulationBySlugs,
} from "@/lib/content-service";
import { getDefaultOgImages, getDefaultOgImageUrl, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl, getSiteUrl } from "@/lib/site";
import {
  buildFallbackGuideMarkdown,
  getDefaultGuideFaqs,
} from "@/lib/rich-guide-content";
import type { GuideFaq } from "@/lib/types";

type GuidePageProps = {
  params: Promise<{
    "sector-slug": string;
    "regulations-slug": string;
  }>;
};

/**
 * Number of sectors to pre-generate at build time (0 = only on-demand).
 * Example: 5 → 15 URLs (x3 regulations).
 */
export async function generateStaticParams() {
  const raw = process.env.PREBUILD_GUIDE_SECTORS ?? "0";
  const n = Math.min(200, Math.max(0, parseInt(raw, 10) || 0));
  if (n < 1) {
    return [];
  }
  const sectors = buildSeedSectors().slice(0, n);
  return sectors.flatMap((sector) =>
    getRegulationSeedsForSectorSlug(sector.slug).map((regulation) => ({
      "sector-slug": sector.slug,
      "regulations-slug": regulation.slug,
    })),
  );
}

export const dynamicParams = true;

function getVariant(input: string): "A" | "B" {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) % 100000;
  }
  return hash % 2 === 0 ? "A" : "B";
}

function toIsoDate(value: Date | string | undefined): string | undefined {
  if (!value) return undefined;
  if (value instanceof Date) return value.toISOString();
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString();
}

export async function generateMetadata({
  params,
}: GuidePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const fallbackSector = buildSeedSectors().find(
    (s) => s.slug === resolvedParams["sector-slug"],
  );
  const fallbackRegulation = seedRegulations.find(
    (r) => r.slug === resolvedParams["regulations-slug"],
  );

  let guide = null;
  try {
    guide = await getOrCreateGuide(
      resolvedParams["sector-slug"],
      resolvedParams["regulations-slug"],
    );
  } catch {
    guide = null;
  }

  const fallbackPath = `/guia/${resolvedParams["sector-slug"]}/${resolvedParams["regulations-slug"]}`;

  if (!guide) {
    if (!fallbackSector || !fallbackRegulation) {
      return { title: "Guide not found" };
    }
    return {
      title: `${fallbackRegulation.name} for ${fallbackSector.name} | Practical guide`,
      description: `A guide for ${fallbackRegulation.name} applied to the ${fallbackSector.name} sector.`,
      alternates: {
        canonical: fallbackPath,
      },
      openGraph: {
        type: "article",
        title: `${fallbackRegulation.name} for ${fallbackSector.name} | Practical guide`,
        description: `A guide for ${fallbackRegulation.name} applied to the ${fallbackSector.name} sector.`,
        url: fallbackPath,
        siteName: "SecureBiz AI",
        locale: "en_US",
        images: getDefaultOgImages(),
      },
      twitter: {
        card: "summary_large_image",
        title: `${fallbackRegulation.name} for ${fallbackSector.name} | Practical guide`,
        description: `A guide for ${fallbackRegulation.name} applied to the ${fallbackSector.name} sector.`,
        images: [getDefaultOgImageUrl()],
      },
      robots: getRobotsAllowAll(),
    };
  }

  const path = `/guia/${guide.sector_slug}/${guide.regulation_slug}`;
  const published = toIsoDate(guide.created_at);

  return {
    title: guide.title,
    description: guide.meta_description,
    keywords: guide.keywords?.length ? guide.keywords : undefined,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.meta_description,
      url: path,
      siteName: "SecureBiz AI",
      locale: "en_US",
      publishedTime: published,
      images: getDefaultOgImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.meta_description,
      images: [getDefaultOgImageUrl()],
    },
    robots: getRobotsAllowAll(),
  };
}

export default async function GuidePage({ params }: GuidePageProps) {
  const resolvedParams = await params;
  if (
    !isRegulationAllowedForSectorSlug(
      resolvedParams["sector-slug"],
      resolvedParams["regulations-slug"],
    )
  ) {
    notFound();
  }
  const fallbackSector = buildSeedSectors().find(
    (s) => s.slug === resolvedParams["sector-slug"],
  );
  const fallbackRegulation = seedRegulations.find(
    (r) => r.slug === resolvedParams["regulations-slug"],
  );

  let sector = null;
  let regulation = null;
  try {
    const fromDb = await getSectorAndRegulationBySlugs(
      resolvedParams["sector-slug"],
      resolvedParams["regulations-slug"],
    );
    sector = fromDb.sector;
    regulation = fromDb.regulation;
  } catch {
    sector = null;
    regulation = null;
  }

  if ((!sector || !regulation) && (!fallbackSector || !fallbackRegulation)) {
    notFound();
  }

  let guide = null;
  try {
    guide = await getOrCreateGuide(
      resolvedParams["sector-slug"],
      resolvedParams["regulations-slug"],
    );
  } catch {
    guide = null;
  }

  const effectiveSectorName = sector?.name ?? fallbackSector?.name ?? "sector";
  const effectiveRegulationName =
    regulation?.name ?? fallbackRegulation?.name ?? "normativa";

  const effectiveGuide =
    guide ??
    ({
      title: `${effectiveRegulationName} for ${effectiveSectorName}: essential guide`,
      full_text: buildFallbackGuideMarkdown(
        effectiveSectorName,
        effectiveRegulationName,
      ),
      meta_description: `Base guide for ${effectiveRegulationName} in the ${effectiveSectorName} sector.`,
      keywords: [effectiveRegulationName, effectiveSectorName, "compliance"],
      sector_slug: resolvedParams["sector-slug"],
      regulation_slug: resolvedParams["regulations-slug"],
      created_at: new Date(),
    } as const);

  let relatedGuides = [] as Awaited<
    ReturnType<typeof getRelatedGuides>
  >;
  try {
    relatedGuides = await getRelatedGuides(
      resolvedParams["sector-slug"],
      resolvedParams["regulations-slug"],
    );
  } catch {
    relatedGuides = [];
  }

  const faqs: GuideFaq[] =
    "faqs" in effectiveGuide &&
    Array.isArray((effectiveGuide as { faqs?: GuideFaq[] }).faqs) &&
    ((effectiveGuide as { faqs?: GuideFaq[] }).faqs?.length ?? 0) > 0
      ? ((effectiveGuide as { faqs?: GuideFaq[] }).faqs as GuideFaq[])
      : getDefaultGuideFaqs(effectiveSectorName, effectiveRegulationName);

  // Ensure a minimum number of questions for rich snippets and AEO.
  const mergedFaqs: GuideFaq[] =
    faqs.length >= 6
      ? faqs.slice(0, 6)
      : [...faqs, ...getDefaultGuideFaqs(effectiveSectorName, effectiveRegulationName)].slice(
          0,
          6,
        );

  const pageUrl = absoluteUrl(
    `/guia/${effectiveGuide.sector_slug}/${effectiveGuide.regulation_slug}`,
  );
  const published = toIsoDate(effectiveGuide.created_at);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: mergedFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const articleKeywords =
    effectiveGuide.keywords?.length > 0
      ? effectiveGuide.keywords.join(", ")
      : `${effectiveRegulationName}, ${effectiveSectorName}, compliance`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: effectiveGuide.title,
    description: effectiveGuide.meta_description,
    datePublished: published,
    dateModified: published,
    keywords: articleKeywords,
    articleSection: effectiveSectorName,
    inLanguage: "en",
    image: [getDefaultOgImageUrl()],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    author: {
      "@type": "Organization",
      name: "SecureBiz AI",
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: "SecureBiz AI",
      url: getSiteUrl(),
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.png"),
      },
    },
  };

  const sectorPageUrl = absoluteUrl(`/sector/${effectiveGuide.sector_slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: effectiveSectorName,
        item: sectorPageUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: effectiveGuide.title,
        item: pageUrl,
      },
    ],
  };

  const quickWins = [
    `A ${effectiveRegulationName} risk map in under 10 minutes`,
    "A practical checklist for non-technical teams",
    "Prioritize controls to reduce fines and incidents",
  ];
  const ctaVariant = getVariant(
    `${effectiveGuide.sector_slug}:${effectiveGuide.regulation_slug}`,
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 pb-28 sm:px-6 sm:py-10 md:pb-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href="/sectors" className="hover:text-slate-900">Sectors</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href={`/sector/${effectiveGuide.sector_slug}`} className="hover:text-slate-900">
              {effectiveSectorName}
            </Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">{effectiveRegulationName}</li>
        </ol>
      </nav>

      <section className="mb-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
          Outcome-focused guide
        </p>
        <h2 className="mt-1 text-xl font-semibold text-slate-900">
          What you will achieve by applying this guide
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-slate-700 md:grid-cols-3">
          {quickWins.map((item) => (
            <li key={item} className="rounded-md border border-blue-100 bg-white px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href="#lead-capture"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
          >
            Request an audit now
          </a>
          <a
            href="#tools"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white"
          >
            See recommended tools
          </a>
        </div>
      </section>

      <div className="hidden md:block">
        {/* Visual spacer only: the mobile CTA is sticky on guide pages */}
      </div>

      <MobileStickyLead />

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <article className="rounded-xl border border-slate-200 bg-white p-8">
          <h1 className="text-3xl font-bold text-slate-900">{effectiveGuide.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            A compliance guide for <strong>{effectiveSectorName}</strong> under{" "}
            <strong>{effectiveRegulationName}</strong>.
          </p>

          <div className="mt-6">
            <GuideRichIntro
              sectorName={effectiveSectorName}
              regulationName={effectiveRegulationName}
              sectorSlug={effectiveGuide.sector_slug}
              regulationSlug={effectiveGuide.regulation_slug}
            />
          </div>

          <section className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h2 className="text-lg font-semibold text-slate-900">
              What you achieve (in practice)
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>1) Identify your sector’s digital risks.</li>
              <li>2) Structure compliance (GDPR / ISO / cookies).</li>
              <li>3) Have an implementation checklist and evidence.</li>
            </ul>
          </section>

          <section className="mt-4">
            <details className="rounded-lg border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Action plan for the next 72 hours
              </summary>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                <li>Quick inventory of data and systems.</li>
                <li>Review access controls (MFA + role).</li>
                <li>Initial incident register and notification flow.</li>
              </ul>
            </details>

            <details className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer text-sm font-semibold text-slate-900">
                Operational security (no theory)
              </summary>
              <ul className="mt-3 list-disc pl-5 text-sm text-slate-700">
                <li>Encrypted backups and restore tests.</li>
                <li>Control work tools (cookies, trackers, scripts).</li>
                <li>Quarterly review procedure.</li>
              </ul>
            </details>
          </section>

          <MarkdownArticle markdown={effectiveGuide.full_text} />

          <GuideImplementationExtras
            sectorName={effectiveSectorName}
            regulationName={effectiveRegulationName}
            sectorSlug={effectiveGuide.sector_slug}
            regulationSlug={effectiveGuide.regulation_slug}
          />

          <GuideFaqSection faqs={mergedFaqs} />
        </article>
        <div id="lead-capture" className="space-y-6">
          <LeadCaptureWidget sector={effectiveSectorName} variant={ctaVariant} />
          <div id="tools">
            <AffiliateHub />
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-medium text-slate-900">Quick response</p>
            <p className="mt-1">
              If you want step-by-step guided implementation, submit the form and
              we’ll propose a tailored plan for your sector.
            </p>
          </div>
        </div>
      </div>

      <GuideCrossLinks
        sectorName={effectiveSectorName}
        sectorSlug={effectiveGuide.sector_slug}
        regulationSlug={effectiveGuide.regulation_slug}
        regulationName={effectiveRegulationName}
      />

      <RelatedGuides guides={relatedGuides} />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildSeedSectors } from "@/lib/catalog";
import {
  SECTOR_SUBPAGE_SLUGS,
  getSectorSubpageContext,
  getSectorSubpageDocument,
  getSectorSubpageLabel,
  isSectorSubpageSlug,
} from "@/lib/sector-subpage-content";
import { UsefulContextCallout } from "@/components/site-education-blocks";
import { getDefaultOgImageUrl, getDefaultOgImages, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type Props = {
  params: Promise<{
    "sector-slug": string;
    subpage: string;
  }>;
};

/**
 * Do not pre-render all sector×resource URLs at build time — ~4k+ pages exceeds Vercel output limits.
 * URLs are still listed in sitemap.xml; first request generates the page (on-demand ISR cache).
 */
export const dynamicParams = true;

/** Cache each generated sector resource page (ISR). */
export const revalidate = 86400;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { "sector-slug": sectorSlug, subpage } = await params;
  const sector = buildSeedSectors().find((x) => x.slug === sectorSlug);
  if (!sector || !isSectorSubpageSlug(subpage)) {
    return { title: "Not found" };
  }
  const doc = getSectorSubpageDocument(sector.name, subpage);
  const path = `/sector/${sector.slug}/${subpage}`;
  return {
    title: doc.title,
    description: doc.description.slice(0, 160),
    keywords: [
      sector.name,
      getSectorSubpageLabel(subpage),
      `${sector.name} ${getSectorSubpageLabel(subpage)}`,
      `${sector.name} GDPR`,
      `${sector.name} security controls`,
      "sector compliance operations",
    ],
    alternates: {
      canonical: path,
      languages: {
        "x-default": path,
        en: path,
      },
    },
    openGraph: {
      type: "article",
      title: doc.title,
      description: doc.description.slice(0, 200),
      url: path,
      siteName: "SecureBiz AI",
      locale: "en_US",
      images: getDefaultOgImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description.slice(0, 200),
      images: [getDefaultOgImageUrl()],
    },
    robots: getRobotsAllowAll(),
  };
}

export default async function SectorSubpage({ params }: Props) {
  const { "sector-slug": sectorSlug, subpage } = await params;
  const sector = buildSeedSectors().find((x) => x.slug === sectorSlug);
  if (!sector || !isSectorSubpageSlug(subpage)) {
    notFound();
  }

  const doc = getSectorSubpageDocument(sector.name, subpage);
  const subpageContext = getSectorSubpageContext(sector.name, subpage);
  const pageUrl = absoluteUrl(`/sector/${sector.slug}/${subpage}`);
  const hubUrl = absoluteUrl(`/sector/${sector.slug}`);

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
        name: sector.name,
        item: hubUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: getSectorSubpageLabel(subpage),
        item: pageUrl,
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: doc.title,
    description: doc.description,
    url: pageUrl,
    author: { "@type": "Organization", name: "SecureBiz AI" },
    about: { "@type": "Thing", name: sector.name },
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href={`/sector/${sector.slug}`} className="hover:text-slate-900">
              {sector.name}
            </Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">
            {getSectorSubpageLabel(subpage)}
          </li>
        </ol>
      </nav>

      <header className="mt-6 rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-6 shadow-sm sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Sector resource · {sector.name}
        </p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-slate-900 sm:text-3xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
          {doc.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href={`/sector/${sector.slug}`}
            className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Sector hub
          </Link>
          <Link
            href={`/guia/${sector.slug}/rgpd`}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
          >
            GDPR guide
          </Link>
        </div>
      </header>

      <div className="mt-10 space-y-10">
        {doc.sections.map((block, i) => (
          <section
            key={`${block.heading}-${i}`}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
          >
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              {block.heading}
            </h2>
            <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
              {block.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
            {block.bullets && block.bullets.length > 0 ? (
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-[15px]">
                {block.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            ) : null}
          </section>
        ))}
      </div>

      <section className="mt-12 space-y-4">
        <UsefulContextCallout title={subpageContext.title}>
          {subpageContext.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p>
            Continue in the{" "}
            <Link href={`/sector/${sector.slug}`} className="font-semibold text-emerald-950 underline">
              sector hub
            </Link>{" "}
            for cross-regulation sequencing (GDPR, ISO 27001, cookies, NIS2 where relevant).
          </p>
        </UsefulContextCallout>
      </section>

      <section className="mt-12 rounded-xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">More for this sector</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          {SECTOR_SUBPAGE_SLUGS.filter((s) => s !== subpage).map((s) => (
            <li key={s}>
              <Link
                href={`/sector/${sector.slug}/${s}`}
                className="font-medium text-blue-800 underline-offset-2 hover:underline"
              >
                {getSectorSubpageLabel(s)}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

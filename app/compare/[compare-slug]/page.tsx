import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { IntentLinksBlock } from "@/components/intent-links-block";
import { getAllCompareContent, getCompareContentBySlug } from "@/lib/compare-content";
import { SITE_NAME } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type ComparePageProps = {
  params: Promise<{ "compare-slug": string }>;
};

export async function generateStaticParams() {
  return getAllCompareContent().map((item) => ({ "compare-slug": item.slug }));
}

export async function generateMetadata({ params }: ComparePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const content = getCompareContentBySlug(resolvedParams["compare-slug"]);
  if (!content) return {};

  const canonical = `/compare/${content.slug}`;
  return {
    title: `${content.title} | SecureBiz compare`,
    description: content.description,
    keywords: content.keywords,
    alternates: { canonical },
    openGraph: {
      title: `${content.title} | SecureBiz`,
      description: content.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${content.title} | SecureBiz`,
      description: content.description,
    },
  };
}

export default async function CompareDetailPage({ params }: ComparePageProps) {
  const resolvedParams = await params;
  const content = getCompareContentBySlug(resolvedParams["compare-slug"]);
  if (!content) notFound();

  const pageUrl = absoluteUrl(`/compare/${content.slug}`);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: absoluteUrl("/compare") },
      { "@type": "ListItem", position: 3, name: content.title, item: pageUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([breadcrumbSchema, faqSchema]),
        }}
      />

      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-slate-500">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-slate-700">Home</Link></li>
          <li>/</li>
          <li><Link href="/compare" className="hover:text-slate-700">Compare</Link></li>
          <li>/</li>
          <li className="text-slate-700">{content.title}</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold tracking-tight text-slate-900">{content.title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-700">{content.intro}</p>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Side-by-side comparison</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 text-left font-semibold text-slate-700">Dimension</th>
                <th className="px-3 py-2 text-left font-semibold text-slate-700">{content.leftLabel}</th>
                <th className="px-3 py-2 text-left font-semibold text-slate-700">{content.rightLabel}</th>
              </tr>
            </thead>
            <tbody>
              {content.comparisonRows.map((row) => (
                <tr key={row[0]} className="border-b border-slate-100 align-top">
                  <td className="px-3 py-2 font-medium text-slate-800">{row[0]}</td>
                  <td className="px-3 py-2 text-slate-700">{row[1]}</td>
                  <td className="px-3 py-2 text-slate-700">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Key differences</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {content.differences.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Implementation sequence</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-slate-700">
            {content.implementation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2">
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Common mistakes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {content.mistakes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">KPI dashboard</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
            {content.kpis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">FAQ</h2>
        <div className="mt-4 space-y-4">
          {content.faqs.map((faq) => (
            <article key={faq.question}>
              <h3 className="font-semibold text-slate-900">{faq.question}</h3>
              <p className="mt-1 text-slate-700">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <IntentLinksBlock title="Related next steps" items={content.related} />
    </main>
  );
}

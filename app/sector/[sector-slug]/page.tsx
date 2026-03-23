import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeoAccordion } from "@/components/seo-accordion";
import { UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import {
  buildSeedSectors,
  getRegulationSeedsForSectorSlug,
} from "@/lib/catalog";
import {
  getSectorMainRisksForName,
  getSectorPersonaIntro,
  getSectorRegulationFocus,
} from "@/lib/sector-persona";
import {
  SECTOR_SUBPAGE_SLUGS,
  getSectorSubpageLabel,
} from "@/lib/sector-subpage-content";
import { getDefaultOgImageUrl, getDefaultOgImages, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

type SectorPageProps = {
  params: Promise<{
    "sector-slug": string;
  }>;
};

export async function generateStaticParams() {
  return buildSeedSectors().map((sector) => ({
    "sector-slug": sector.slug,
  }));
}

export async function generateMetadata({
  params,
}: SectorPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const sector = buildSeedSectors().find(
    (item) => item.slug === resolvedParams["sector-slug"],
  );

  if (!sector) {
    return { title: "Sector not found" };
  }

  const path = `/sector/${sector.slug}`;
  const intro = getSectorPersonaIntro(sector.name);
  const description = (() => {
    const base =
      intro.paragraphs[0] ??
      `Sector-specific implementation guides for ${sector.name} covering GDPR, ISO 27001, NIS2, and cookie compliance.`;
    return base.length > 158 ? `${base.slice(0, 155)}…` : base;
  })();

  return {
    title: `${sector.name} Sector Guide | GDPR, ISO 27001, NIS2`,
    description,
    keywords: [
      sector.name,
      `${sector.name} GDPR`,
      `${sector.name} ISO 27001`,
      `${sector.name} cybersecurity`,
      `${sector.name} compliance checklist`,
      "sector-specific compliance",
    ],
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      title: `${sector.name} Sector Guide | GDPR, ISO 27001, NIS2`,
      description,
      url: path,
      siteName: "SecureBiz AI",
      locale: "en_US",
      images: getDefaultOgImages(),
    },
    twitter: {
      card: "summary_large_image",
      title: `${sector.name} Sector Guide | GDPR, ISO 27001, NIS2`,
      description,
      images: [getDefaultOgImageUrl()],
    },
    robots: getRobotsAllowAll(),
  };
}

export default async function SectorPage({ params }: SectorPageProps) {
  const resolvedParams = await params;
  const sector = buildSeedSectors().find(
    (item) => item.slug === resolvedParams["sector-slug"],
  );

  if (!sector) {
    notFound();
  }

  const persona = getSectorPersonaIntro(sector.name);
  const risks = getSectorMainRisksForName(sector.name);
  const regulations = [...getRegulationSeedsForSectorSlug(sector.slug)].sort(
    (a, b) =>
      a.name.localeCompare(b.name, "en", { sensitivity: "base" }),
  );
  const pageUrl = absoluteUrl(`/sector/${sector.slug}`);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Sectors", item: absoluteUrl("/sectors") },
      { "@type": "ListItem", position: 3, name: sector.name, item: pageUrl },
    ],
  };
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Regulations for ${sector.name}`,
    numberOfItems: regulations.length,
    itemListElement: regulations.map((regulation, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: regulation.name,
      url: absoluteUrl(`/guia/${sector.slug}/${regulation.slug}`),
    })),
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
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
            <Link href="/sectors" className="hover:text-slate-900">Sectors</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">{sector.name}</li>
        </ol>
      </nav>
      <section className="overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 p-6 text-white shadow-lg sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
          Sector hub
        </p>
        <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl">
          {persona.title}
        </h1>
        <p className="mt-2 text-sm text-blue-100 sm:text-base">{sector.name}</p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
          <Link
            href={`/guia/${sector.slug}/rgpd`}
            className="inline-flex justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-900 sm:py-2.5"
          >
            Open GDPR guide
          </Link>
          <Link
            href="/sectors"
            className="inline-flex justify-center rounded-lg border border-white/35 px-5 py-3 text-sm font-semibold text-white sm:py-2.5"
          >
            All sectors
          </Link>
        </div>
      </section>

      <div className="mt-8 space-y-4 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
        {persona.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Deep-dive pages for {sector.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Checklists, stack orientation, 30-day playbook, data-mapping guidance, and vendor/DPIA notes—each URL is
          indexable long-form content scoped to your sector (not generic filler).
        </p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SECTOR_SUBPAGE_SLUGS.map((sub) => (
            <li key={sub}>
              <Link
                href={`/sector/${sector.slug}/${sub}`}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-blue-300 hover:bg-white"
              >
                <span className="font-semibold text-slate-900">
                  {getSectorSubpageLabel(sub)}
                </span>
                <span className="mt-1 text-xs text-slate-500">
                  Open resource →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
        <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
          Digital & data risks for {sector.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Concrete scenarios—so guides are not generic compliance filler.
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {risks.map((risk) => (
            <li
              key={risk}
              className="flex gap-2 rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2.5 text-sm text-slate-800"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
              <span>{risk}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          Regulations for this sector
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Each card links to a long-form guide combining{" "}
          <strong>{sector.name}</strong> with that law—written for your workflows, not a copy-paste checklist.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regulations.map((regulation) => (
            <li key={regulation.slug}>
              <Link
                href={`/guia/${sector.slug}/${regulation.slug}`}
                className="group flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-300 hover:shadow-md"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  {regulation.country}
                </span>
                <span className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-blue-800">
                  {regulation.name}
                </span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {getSectorRegulationFocus(sector.name, regulation)}
                </span>
                <span className="mt-4 text-sm font-semibold text-blue-700">
                  Open guide →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-xl border border-blue-100 bg-blue-50/60 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          How to use this hub
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-slate-700">
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </span>
            <span>
              Pick the regulation that matches your current pressure (audit, insurer, website, or tender).
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              2
            </span>
            <span>
              Read the executive framing, then execute the checklist items you can finish this month.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              3
            </span>
            <span>
              Use the audit form on the guide when you want a tailored plan—structured leads without paid ads.
            </span>
          </li>
        </ol>
      </section>

      <section className="mt-10 space-y-6">
        <UsefulContextCallout title={`Evidence & stakeholders typical for ${sector.name}`}>
          <p>
            Auditors, insurers, and enterprise clients rarely ask for “more policy PDFs”. They ask for{" "}
            <strong>traceability</strong>: who decided what, which systems hold data, how access is granted, and how
            incidents are logged. Use the guides below to align people, process, and tooling—then keep receipts (tickets,
            change logs, training records).
          </p>
        </UsefulContextCallout>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">Who usually owns what</h2>
          <p className="mt-2 text-sm text-slate-600">
            Roles vary by size; this table helps you route work without endless meetings.
          </p>
          <UsefulDataTable caption="Common ownership (adapt to your org)">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Topic</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Often owned by</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Typical evidence</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Data inventory / RoPA</td>
                <td className="px-3 py-2">DPO / ops lead / IT</td>
                <td className="px-3 py-2">Spreadsheet or RoPA export, update cadence</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Access & MFA</td>
                <td className="px-3 py-2">IT / security</td>
                <td className="px-3 py-2">IdP logs, MFA enrollment reports</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Vendors & DPAs</td>
                <td className="px-3 py-2">Legal / procurement</td>
                <td className="px-3 py-2">Signed DPAs, review dates</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Incidents & breaches</td>
                <td className="px-3 py-2">Security + management</td>
                <td className="px-3 py-2">Ticket, timeline, notification record</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
        <h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
          FAQ — {sector.name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Full text in HTML for Google & AI overviews (expand to read).
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Which guide should I read first?",
                content:
                  "Usually GDPR for personal data. Add ISO 27001 when security assurance is contractual, and cookie law when your site runs marketing or analytics tags.",
              },
              {
                title: "Is the content specific to my business type?",
                content:
                  "Yes. This hub and each guide use sector vocabulary—e.g. dental practices see patient records, imaging, labs, and reception workflows—not generic SME text.",
              },
              {
                title: "What happens after I read a guide?",
                content:
                  "You can submit the audit request on the guide page. That turns organic traffic into a qualified lead; tool recommendations stay contextual (affiliate).",
              },
              {
                title: "Will this help on mobile?",
                content:
                  "Pages use short sections, large tap targets, and a sticky CTA on guide templates so you can read and act on a phone.",
              },
              {
                title: "How do I prioritise spend across GDPR, ISO, and cookies?",
                content:
                  "Start with the obligation that unlocks revenue or removes the biggest fine risk (often GDPR + website tracking). Add ISO 27001 when contracts or insurers require an ISMS. The sector hub links every combination so you can sequence work instead of boiling the ocean.",
              },
              {
                title: "What should I bring to a real consultant after using the guides?",
                content:
                  "Bring your data map, vendor list, incident history, and top 10 assets. The guides help you arrive organised so paid time goes to judgement calls—not basic discovery.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

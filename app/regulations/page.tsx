import type { Metadata } from "next";
import Link from "next/link";
import { CatalogSearchInput } from "@/components/catalog-search-input";
import { SeoAccordion } from "@/components/seo-accordion";
import { HubFooterLinks, UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";
import { buildSeedSectors, seedRegulations } from "@/lib/catalog";
import { SECTOR_VERTICAL_CLUSTERS } from "@/lib/expanded-content";
import { getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Regulations | GDPR, ISO 27001, NIS2, DORA & more",
  description:
    "Compare GDPR, ISO 27001, cookie law, NIS2, DORA, SOC 2—then open sector-specific guides with evidence, pitfalls, and rollout phases.",
  keywords: [
    "GDPR guide",
    "ISO 27001 guide",
    "NIS2 guide",
    "DORA compliance",
    "SOC 2 controls",
    "regulation comparison",
  ],
  alternates: {
    canonical: "/regulations",
  },
  openGraph: {
    url: "/regulations",
    title: "Regulations | GDPR, ISO 27001, NIS2, DORA & more",
    description:
      "Compare frameworks and jump into sector guides: GDPR, ISO 27001, cookies, NIS2, DORA, SOC 2.",
  },
  robots: getRobotsAllowAll(),
};

export default function RegulationsHubPage() {
  const sectors = buildSeedSectors();
  const exampleSector = sectors[0];
  const rgpd = seedRegulations.find((r) => r.slug === "rgpd");
  const iso = seedRegulations.find((r) => r.slug === "iso-27001");
  const cookies = seedRegulations.find((r) => r.slug === "llei-cookies");

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Regulations",
    description:
      "Hub for GDPR, ISO 27001, cookie law, NIS2, DORA, SOC 2—with sector-specific implementation guides.",
    url: absoluteUrl("/regulations"),
  };

  const regulationItemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Regulations",
    numberOfItems: seedRegulations.length,
    itemListElement: seedRegulations.map((regulation, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: regulation.name,
      url: absoluteUrl(`/normativa/${regulation.slug}`),
    })),
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(regulationItemListSchema),
        }}
      />
      <h1 className="text-3xl font-bold text-slate-900">Regulations</h1>
      <p className="mt-2 text-slate-600">
        Choose a regulation and explore the sectors with tailored guides.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-slate-700">
        This hub exists to route broad queries (“GDPR vs ISO”, “cookie law for small business”) into{" "}
        <strong>specific long-form guides</strong> that match how buyers evaluate risk. More pages with unique angles
        mean more entry points from organic search—without paying for ads—while each page keeps a monetization path
        (audit + tools).
      </p>
      <p className="mt-3 text-sm leading-relaxed text-slate-700">
        EU operators often stack <strong>privacy</strong> (GDPR), <strong>cyber resilience</strong> (NIS2), and{" "}
        <strong>financial operational resilience</strong> (DORA) depending on sector and size—plus{" "}
        <strong>SOC 2</strong> when US enterprise buyers demand trust criteria evidence. Use the regulation pages for
        deep dives, then pick your sector from the grid on each hub.
      </p>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">See regulations in context (by vertical)</h2>
        <p className="mt-2 text-sm text-slate-600">
          Open a representative sector hub, then choose GDPR, ISO 27001, NIS2, or cookies from the regulation cards.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {SECTOR_VERTICAL_CLUSTERS.map((cluster) => {
            const example =
              sectors.find((s) => s.slug === cluster.exampleSlug) ?? sectors[0];
            return (
              <li key={cluster.label}>
                <Link
                  href={`/sector/${example.slug}`}
                  className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-800 hover:border-blue-300 hover:bg-white"
                >
                  {cluster.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          GDPR + ISO 27001 + Cookies: the most requested pack
        </h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          <li>GDPR: personal data, rights, lawful bases, and evidence.</li>
          <li>ISO 27001: security controls and continuous improvement.</li>
          <li>Cookies: consent, trackers, and website rules.</li>
        </ul>
      </section>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          Start with a “money” guide
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Go for GDPR if you want quick monetizable intent: it’s the most
          common entry point for businesses looking to implement compliance.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {rgpd ? (
            <a
              href={`/sector/${exampleSector.slug}`}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Start with GDPR (example)
            </a>
          ) : null}
          <a
            href="/sectors#catalog-search"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Choose a sector
          </a>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-900">All regulations (A–Z)</h2>
        <p className="mt-1 text-sm text-slate-600">
          Sorted alphabetically. Search by name, region, or acronym.
        </p>
        <div className="mt-4 space-y-4">
          <CatalogSearchInput
            listId="regulations-catalog-list"
            searchLabel="Search regulations"
            searchPlaceholder="Type a law or standard (e.g. GDPR, ISO, HIPAA)…"
            totalCount={seedRegulations.length}
          />
          <ul
            id="regulations-catalog-list"
            className="grid gap-3 md:grid-cols-2 lg:grid-cols-3"
          >
            {seedRegulations.map((regulation) => (
              <li
                key={regulation.slug}
                data-catalog-search={`${regulation.name.toLowerCase()} ${regulation.country.toLowerCase()} ${regulation.slug.toLowerCase()} ${regulation.description.toLowerCase()}`}
              >
                <Link
                  href={`/normativa/${regulation.slug}`}
                  className="block h-full rounded-lg border border-slate-200 bg-white p-5 transition hover:border-blue-300 hover:shadow-sm"
                >
                  <p className="text-lg font-semibold text-slate-900">
                    {regulation.name}
                  </p>
                  <p className="mt-1 line-clamp-3 text-sm text-slate-600">
                    {regulation.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Recommendation</h2>
        <p className="mt-2 text-sm text-slate-600">
          If your website has trackers and leads, start with Cookies + GDPR:
          it’s the fastest path to requesting an audit.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          {cookies ? (
            <Link
              href={`/guia/${exampleSector.slug}/${cookies.slug}`}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
            >
              View Cookie Law guide (example)
            </Link>
          ) : null}
          {iso ? (
            <Link
              href={`/guia/${exampleSector.slug}/${iso.slug}`}
              className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View ISO 27001 guide (example)
            </Link>
          ) : null}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">
          How we interpret each regulation in this hub
        </h2>
        <div className="mt-3 space-y-3 text-sm text-slate-700">
          <p>
            <strong>GDPR</strong>: focus on personal data, roles, lawful bases,
            data subject rights, records of processing, and compliance evidence.
            It’s the most common entry point for SMEs and professionals.
          </p>
          <p>
            <strong>ISO 27001</strong>: security management system focus,
            controls, continuous improvement, and risk alignment—ideal when
            clients/partners ask for an “enterprise-level” posture.
          </p>
          <p>
            <strong>Cookie Law</strong>: website focus—tracking technologies,
            cookie categories, banners, and documentation. Essential if you
            capture leads or run digital marketing.
          </p>
        </div>
        <p className="mt-4 text-sm text-slate-600">
          Every sector + regulation combination has its own page with
          long-form content when needed (including resilient mode if the data
          layer is unavailable).
        </p>
      </section>

      <section className="mt-10 space-y-6">
        <UsefulContextCallout title="How frameworks stack in the real economy">
          <p>
            Most organisations need <strong>more than one line of defence</strong>: privacy law for personal data,
            security standards for assurance, and website rules for tracking. The overlap is normal—what matters is not
            collecting every certificate, but building <strong>one coherent story</strong> your leadership can explain in
            a crisis: where data lives, who is accountable, and how you detect problems early.
          </p>
        </UsefulContextCallout>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-slate-900">GDPR vs ISO 27001 vs cookie law (at a glance)</h2>
          <p className="mt-2 text-sm text-slate-600">
            Not a legal equivalence table—just a practical lens for prioritisation.
          </p>
          <UsefulDataTable caption="Practical comparison">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Lens</th>
                <th className="px-3 py-2 font-semibold text-slate-900">GDPR</th>
                <th className="px-3 py-2 font-semibold text-slate-900">ISO 27001</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Cookie / ePrivacy</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Primary question</td>
                <td className="px-3 py-2">Are we lawful and fair with people’s data?</td>
                <td className="px-3 py-2">Do we manage security risk systematically?</td>
                <td className="px-3 py-2">Are we transparent and consented on the web?</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Typical artefact</td>
                <td className="px-3 py-2">RoPA, DPIA, breach log</td>
                <td className="px-3 py-2">ISMS scope, risk treatment, audits</td>
                <td className="px-3 py-2">Banner, policy, tag inventory</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">When buyers ask</td>
                <td className="px-3 py-2">Privacy & DPA reviews</td>
                <td className="px-3 py-2">RFP / enterprise procurement</td>
                <td className="px-3 py-2">Marketing & growth teams</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-2xl font-semibold text-slate-900">
          FAQ: choosing a regulation
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Tap to expand—full answers stay in the document for SEO.
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: 'Which regulation gives me the best “quick wins”?',
                content:
                  "Usually GDPR: it quickly provides a structure for personal data, roles, evidence, and a plan you can implement in weeks.",
              },
              {
                title: 'Is ISO 27001 too “big”?',
                content:
                  "Not if you implement it in phases. The guides focus on controls, evidence, and continuous improvement so you can start with the minimum viable scope (and scale later).",
              },
              {
                title: "Cookies & consent: what do I need to do?",
                content:
                  "In practice: inventory your trackers, define categories, craft consent messaging, and set rules so tracking changes based on visitors’ choices.",
              },
              {
                title: "How do you monetize the traffic?",
                content:
                  "Pages include lead-capture CTAs (audit form) and a hub of recommended tools that drive affiliate clicks aligned with what people are searching for.",
              },
              {
                title: "Do I need ISO if I already comply with GDPR?",
                content:
                  "Not automatically. GDPR is not an ISMS. ISO 27001 becomes relevant when partners want an auditable security management system—not just privacy paperwork.",
              },
              {
                title: "Where should legal and IT align first?",
                content:
                  "On the data map and vendor list. If those two are wrong, every policy is theatre. Start there, then layer standards and web tracking rules.",
              },
              {
                title: "NIS2 vs ISO 27001—which comes first?",
                content:
                  "They answer different questions. NIS2 (where in scope) emphasizes governance, supply-chain security, and incident reporting under EU law. ISO 27001 is a certifiable ISMS for systematic risk management. Many teams use ISO-style discipline to operationalize NIS2 expectations—confirm scope with qualified advisors.",
              },
              {
                title: "When does DORA matter if I am not a bank?",
                content:
                  "If you are a financial entity or critical ICT provider to one, contractual and oversight expectations may flow into your roadmap. Start from your regulator’s classification and customer DPAs, then map to resilience testing and third-party risk.",
              },
            ]}
          />
        </div>
      </section>

      <HubFooterLinks />
    </div>
  );
}


import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { PageToc } from "@/components/site-education-blocks";
import { SITE_NAME, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "About SecureBiz AI | Mission, Trust and Scope",
  description: `${SITE_NAME}: who we are, what we publish, trust-domain clarification, and why content is educational (not legal advice).`,
  keywords: [
    "about securebiz",
    "securebiz mission",
    "GDPR sector guides",
    "ISO 27001 sector guides",
    "NIS2 practical guidance",
  ],
  alternates: {
    canonical: "/about",
    languages: {
      "x-default": "/about",
      en: "/about",
    },
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About SecureBiz AI | Mission, Trust and Scope`,
    description:
      `${SITE_NAME}: what we publish, what we are not, and trust/domain clarification.`,
  },
  twitter: {
    card: "summary_large_image",
    title: `About SecureBiz AI | Mission, Trust and Scope`,
    description:
      `${SITE_NAME}: what we publish, what we are not, and trust/domain clarification.`,
  },
  robots: getRobotsAllowAll(),
};

export default function AboutPage() {
  const pageUrl = absoluteUrl("/about");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "About", item: pageUrl },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
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
          <li className="font-medium text-slate-900">About</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">About {SITE_NAME}</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        {SITE_NAME} is an independent educational website that helps teams translate{" "}
        <strong>GDPR</strong>, <strong>ISO 27001</strong>, <strong>cookie law</strong>,{" "}
        <strong>NIS2</strong>, and related frameworks into <strong>sector-specific</strong> language—so owners,
        operators, and consultants can prioritise controls without wading through generic filler.
      </p>

      <div className="mt-8">
        <PageToc
          items={[
            { id: "mission", label: "What we publish" },
            { id: "quality", label: "Originality & programme rules" },
            { id: "methodology", label: "Methodology" },
            { id: "not", label: "What we are not" },
            { id: "trust", label: "Trust, domain & downloads" },
            { id: "official", label: "Use official sources for binding rules" },
            { id: "contact", label: "Errors & feedback" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-10 text-slate-700">
        <section id="mission" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">What we publish</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              <strong>Sector hubs</strong> and <strong>regulation hubs</strong> that link to long-form guides (one
              industry × one framework per URL).
            </li>
            <li>
              <strong>Checklists, FAQs, and structured explanations</strong> aimed at implementation and evidence—not
              replacing your DPO, lawyer, or auditor.
            </li>
            <li>Optional <strong>lead forms</strong> and contextual links to tools where that helps you move from reading to action.</li>
          </ul>
        </section>

        <section id="quality" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Originality, value &amp; monetisation</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We aim to meet the expectations of readers and advertising programmes: pages are built to offer{" "}
            <strong>substantive, original commentary and structure</strong> for professionals—not empty shells, scraped
            articles, or copyright-infringing copies of third-party works. Guides combine sector context with framework
            requirements; we do not present automated text as a substitute for your own legal or audit judgement.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            The site may use <strong>Google AdSense</strong> to support hosting and ongoing improvements. Advertising is
            disclosed in the footer on every page and detailed in our{" "}
            <Link className="text-blue-700 underline" href="/legal/privacy#adsense">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="text-blue-700 underline" href="/legal/cookies#google-ads">
              Cookie Policy
            </Link>
            . Revenue from ads does not change our obligation to keep content accurate and transparent about limits
            (see the{" "}
            <Link className="text-blue-700 underline" href="/legal/disclaimer#adsense">
              disclaimer on ads
            </Link>
            ).
          </p>
        </section>

        <section id="methodology" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Methodology</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Content is structured for <strong>implementation</strong>: sector vocabulary, risk themes, evidence checkpoints,
            and phased plans. Long-form guides pair one sector with one regulation so examples stay concrete; hubs and the{" "}
            <a className="font-medium text-blue-700 underline" href="/sitemap.xml">
              XML sitemap
            </a>{" "}
            help you discover every URL without memorising patterns.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            We do not claim to replicate national transpositions line-by-line: always verify against{" "}
            <strong>EUR-Lex</strong>, your <strong>DPA</strong>, and sector regulators for binding obligations.
          </p>
        </section>

        <section id="not" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">What we are not</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>We are not the European Commission, EDPB, ENISA, ISO, or your national DPA.</li>
            <li>We do not issue certifications, fines, or binding interpretations.</li>
            <li>We are not a law firm; content is informational. See our full{" "}
              <Link className="text-blue-700 underline" href="/legal/disclaimer">
                Legal disclaimer
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="trust" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Trust, domain & downloads</h2>
          <p className="mt-3 text-sm leading-relaxed">
            This project is a normal public website (guides and legal pages). We do not run a software download portal
            or distribute executables from this service. If you need the detailed wording, read{" "}
            <Link className="font-medium text-blue-700 underline" href="/legal/disclaimer#trust-domain">
              Safety & downloads in the disclaimer
            </Link>
            .
          </p>
        </section>

        <section id="official" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Use official sources for binding rules</h2>
          <p className="mt-3 text-sm leading-relaxed">
            For authoritative GDPR text, supervisory guidance, NIS2 transposition, and ISO standards, always rely on{" "}
            <strong>official institutions</strong> (e.g. EUR-Lex, EDPB, your DPA, ENISA, ISO) and qualified advisors.
            Use {SITE_NAME} to <strong>structure</strong> work inside your organisation and to compare how the same
            obligation shows up across sectors—not as a substitute for primary legal sources.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            For a faster start, use our curated lists:{" "}
            <Link className="text-blue-700 underline" href="/resources/gdpr-websites">
              Top 10 GDPR websites
            </Link>{" "}
            and{" "}
            <Link className="text-blue-700 underline" href="/resources/gdpr-iso-27001-nis2-guides">
              Top 10 GDPR + ISO 27001 + NIS2 guides
            </Link>
            .
          </p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Errors & feedback</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Compliance content changes. If you spot a factual issue or a broken link, send a short note to{" "}
            <a className="font-medium text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>{" "}
            so we can fix it for everyone.
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-slate-500">
        <Link href="/" className="text-blue-700 underline">
          ← Back to home
        </Link>
      </p>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/sitemap.xml", label: "Sitemap (all URLs)" },
          { href: "/sectors#catalog-search", label: "Sector search" },
          { href: "/resources", label: "Resources hub" },
          { href: "/compare", label: "Framework comparisons" },
          { href: "/checklists", label: "Execution checklists" },
          { href: "/legal/disclaimer", label: "Legal disclaimer" },
        ]}
      />
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { SeoAccordion } from "@/components/seo-accordion";
import { PageToc, UsefulDataTable } from "@/components/site-education-blocks";
import { ADSENSE_PUBLISHER_CA, GOOGLE_AD_SETTINGS } from "@/lib/site-ads";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy | Consent, Analytics and Advertising Technologies",
  description:
    "How SecureBiz AI uses cookies, local storage, analytics, advertising technologies, and how you can control preferences.",
  keywords: [
    "cookie policy",
    "securebiz cookies",
    "GDPR cookies",
    "cookie consent",
    "tracking technologies",
  ],
  alternates: {
    canonical: "/legal/cookies",
    languages: {
      "x-default": "/legal/cookies",
      en: "/legal/cookies",
    },
  },
  openGraph: {
    type: "article",
    url: "/legal/cookies",
    title: "Cookie Policy | Consent, Analytics and Advertising Technologies",
    description:
      "How cookies, analytics, and advertising technologies are used and controlled on securebiz.org.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | Consent, Analytics and Advertising Technologies",
    description:
      "How cookies, analytics, and advertising technologies are used and controlled on securebiz.org.",
  },
  robots: { index: true, follow: true },
};

export default function CookiesPage() {
  const pageUrl = absoluteUrl("/legal/cookies");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Legal", item: absoluteUrl("/legal/disclaimer") },
      { "@type": "ListItem", position: 3, name: "Cookie policy", item: pageUrl },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do I have to accept all cookies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Non-essential cookies (e.g. some analytics or ads) should be optional where law requires consent. Essential cookies may still be needed for core functionality.",
        },
      },
      {
        "@type": "Question",
        name: "Why does the site still work if I reject analytics?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Because analytics is not required to display guides. You may lose aggregated improvements tied to usage data, but core content remains available.",
        },
      },
      {
        "@type": "Question",
        name: "Are affiliate links cookies?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Affiliate programs may set cookies or use redirects to attribute clicks. Those are often classified as marketing/advertising technologies.",
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <nav className="mb-4 text-sm text-slate-600" aria-label="Breadcrumb">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li>
            <Link href="/legal/disclaimer" className="hover:text-slate-900">Legal</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">Cookie policy</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">Cookie Policy</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        This policy explains how <strong>securebiz.org</strong> uses cookies and similar technologies (pixels, scripts,
        SDKs, local storage) when you browse guides, hubs, and forms. It complements our{" "}
        <Link className="text-blue-700 underline" href="/legal/privacy">
          Privacy Policy
        </Link>
        .
      </p>

      <div className="mt-8">
        <PageToc
          items={[
            { id: "what", label: "What are cookies?" },
            { id: "types", label: "Types we use" },
            { id: "manage", label: "How to manage preferences" },
            { id: "browsers", label: "Browser controls" },
            { id: "third", label: "Third-party technologies" },
            { id: "google-ads", label: "Google AdSense" },
            { id: "retention", label: "Duration & storage" },
            { id: "changes", label: "Updates" },
            { id: "contact", label: "Contact" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-10 text-slate-700">
        <section id="what" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">What are cookies?</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Cookies are small text files stored on your device when you visit a site. They help remember preferences,
            keep sessions secure, measure traffic, and (where allowed) support advertising. Similar technologies include
            local storage, session storage, and tracking pixels.
          </p>
        </section>

        <section id="types" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Types of cookies & purposes</h2>
          <UsefulDataTable caption="Common categories on this site (actual tags depend on live configuration)">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Category</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Strictly necessary</td>
                <td className="px-3 py-2">
                  Security, load balancing, remembering consent choices, basic site functionality. These are typically
                  exempt from consent under ePrivacy where strictly necessary for a service you request.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Analytics & performance</td>
                <td className="px-3 py-2">
                  Aggregated statistics (pages viewed, approximate geography, devices) to improve content and speed. May
                  require consent depending on jurisdiction and implementation.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Functional</td>
                <td className="px-3 py-2">
                  Remember UI choices (e.g. expanded sections) where we implement them—low impact on privacy when not
                  combined with cross-site tracking.
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2 font-medium">Advertising & affiliates</td>
                <td className="px-3 py-2">
                  Where enabled, third-party scripts may measure ad delivery, limit fraud, or attribute affiliate
                  clicks. These typically require consent when not strictly necessary.
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Google AdSense</td>
                <td className="px-3 py-2">
                  Google may set or read cookies and use identifiers to serve and measure ads (including personalised
                  ads where allowed), limit invalid traffic, and cap frequency. Publisher ID:{" "}
                  <code className="text-slate-800">{ADSENSE_PUBLISHER_CA}</code>. See also the{" "}
                  <Link className="text-blue-700 underline" href="/legal/privacy#adsense">
                    Privacy Policy (AdSense section)
                  </Link>
                  .
                </td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </section>

        <section id="manage" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">How to manage consent</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Where we deploy a consent banner or preference centre, you can accept or reject non-essential categories
            and change your mind later. If you clear cookies, you may need to set preferences again.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            You can also contact{" "}
            <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>{" "}
            for assistance with privacy or cookie-related requests.
          </p>
        </section>

        <section id="browsers" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Browser & device controls</h2>
          <p className="mt-3 text-sm leading-relaxed">
            All major browsers let you block or delete cookies. Blocking <strong>all</strong> cookies may break login
            flows, forms, or consent storage. Use per-site controls where available (Chrome, Edge, Firefox, Safari each
            provide cookie settings and “block third-party cookies” options).
          </p>
        </section>

        <section id="third" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Third-party technologies</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may load scripts from analytics, tag management, advertising, or affiliate partners. Those providers
            process data under their own policies and act as independent or joint controllers/processors depending on
            the service. We select vendors with reasonable security practices, but you should review their policies if
            you want full detail on global transfers and retention.
          </p>
        </section>

        <section id="google-ads" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Google AdSense (advertising cookies)</h2>
          <p className="mt-3 text-sm leading-relaxed">
            When AdSense loads, Google may use cookies or similar storage to show relevant ads, measure impressions
            and clicks, and reduce abuse. You can read Google&apos;s descriptions of advertising technologies and
            manage ad personalisation in{" "}
            <a
              className="text-blue-700 underline"
              href={GOOGLE_AD_SETTINGS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            . Our site-wide notice in the footer summarises how ads relate to this policy and the{" "}
            <Link className="text-blue-700 underline" href="/legal/privacy#adsense">
              Privacy Policy
            </Link>
            .
          </p>
        </section>

        <section id="retention" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Duration & storage</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Session cookies expire when you close the browser; persistent cookies expire on a set date or until deleted.
            Analytics identifiers often use rolling windows. Exact durations depend on the provider and your settings.
          </p>
        </section>

        <section id="changes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Updates</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may update this Cookie Policy when we change technologies or legal requirements. Continued use of the
            site after changes constitutes notice unless we are required to obtain renewed consent for specific
            non-essential processing.
          </p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed">
            <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>
          </p>
        </section>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Cookie FAQ</h2>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Do I have to accept all cookies?",
                content:
                  "No. Non-essential cookies (e.g. some analytics or ads) should be optional where law requires consent. Essential cookies may still be needed for core functionality.",
              },
              {
                title: "Why does the site still work if I reject analytics?",
                content:
                  "Because analytics is not required to display guides. You may lose aggregated improvements tied to usage data, but core content remains available.",
              },
              {
                title: "Are affiliate links cookies?",
                content:
                  "Affiliate programs may set cookies or use redirects to attribute clicks. Those are often classified as marketing/advertising technologies.",
              },
            ]}
          />
        </div>
      </section>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Related pages</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <Link href="/legal/privacy" className="text-blue-700 underline-offset-2 hover:underline">
              Privacy policy
            </Link>
          </li>
          <li>
            <Link href="/legal/disclaimer" className="text-blue-700 underline-offset-2 hover:underline">
              Legal disclaimer
            </Link>
          </li>
          <li>
            <Link href="/resources" className="text-blue-700 underline-offset-2 hover:underline">
              Compliance resources
            </Link>
          </li>
          <li>
            <Link href="/regulations" className="text-blue-700 underline-offset-2 hover:underline">
              Regulation comparison hub
            </Link>
          </li>
        </ul>
      </section>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/legal/privacy", label: "Privacy policy" },
          { href: "/compare/gdpr-vs-iso-27001", label: "GDPR vs ISO 27001" },
          { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)" },
          { href: "/resources", label: "Resources hub" },
        ]}
      />
    </div>
  );
}

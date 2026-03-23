import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { SeoAccordion } from "@/components/seo-accordion";
import { PageToc, UsefulDataTable } from "@/components/site-education-blocks";
import {
  ADSENSE_PUBLISHER_CA,
  GOOGLE_AD_SETTINGS,
  GOOGLE_PARTNER_PRIVACY,
} from "@/lib/site-ads";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy (GDPR) | Data Processing and Rights",
  description:
    "Detailed privacy policy for SecureBiz AI: controller identity, purposes, retention, subprocessors, rights, and international transfers.",
  keywords: [
    "privacy policy GDPR",
    "securebiz privacy",
    "data protection policy",
    "GDPR rights",
    "personal data processing",
  ],
  alternates: {
    canonical: "/legal/privacy",
    languages: {
      "x-default": "/legal/privacy",
      en: "/legal/privacy",
    },
  },
  openGraph: {
    type: "article",
    url: "/legal/privacy",
    title: "Privacy Policy (GDPR) | Data Processing and Rights",
    description:
      "Detailed privacy policy: lawful bases, rights, retention, subprocessors, and transfers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy (GDPR) | Data Processing and Rights",
    description:
      "Detailed privacy policy: lawful bases, rights, retention, subprocessors, and transfers.",
  },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const pageUrl = absoluteUrl("/legal/privacy");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Legal", item: absoluteUrl("/legal/disclaimer") },
      { "@type": "ListItem", position: 3, name: "Privacy policy", item: pageUrl },
    ],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Do you sell my data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. We do not sell personal data. We use data to operate the site, respond to requests, and improve the service, as described in this policy.",
        },
      },
      {
        "@type": "Question",
        name: "Why do you need my email in forms?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "So we can reply to audit or lead requests and send operational messages related to your enquiry. We do not use your email for unrelated purposes without a lawful basis.",
        },
      },
      {
        "@type": "Question",
        name: "Can I request deletion?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, where applicable you may request erasure (subject to legal exceptions, e.g. records we must keep for compliance or legal defence). Contact privacy@securebiz.org.",
        },
      },
      {
        "@type": "Question",
        name: "How long do analytics tools keep data?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It depends on the provider and configuration. Aggregated analytics often uses rolling retention windows. See our Cookie Policy and provider documentation for specifics.",
        },
      },
      {
        "@type": "Question",
        name: "Does Google AdSense process my data when I see ads?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Google may use cookies and similar technologies to serve and measure ads, including personalised ads where permitted. Google describes how it uses data from sites that use its services in its partner policy. You can manage ad personalisation in Google Ads Settings.",
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
          <li className="font-medium text-slate-900">Privacy policy</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">
        Privacy Policy (GDPR)
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        This page explains how SecureBiz AI (“we”, “us”) processes personal data when you use{" "}
        <strong>securebiz.org</strong>, request information, submit audit or lead forms, or browse our guides.
        It is written to align with the EU General Data Protection Regulation (GDPR) and good-practice transparency.
      </p>

      <div className="mt-8">
        <PageToc
          items={[
            { id: "controller", label: "Who is the data controller?" },
            { id: "principles", label: "Principles & lawful bases" },
            { id: "purposes", label: "Purposes of processing" },
            { id: "categories", label: "Categories of data" },
            { id: "retention", label: "Retention periods" },
            { id: "recipients", label: "Recipients & subprocessors" },
            { id: "adsense", label: "Google AdSense & ads" },
            { id: "transfers", label: "International transfers" },
            { id: "rights", label: "Your rights" },
            { id: "security", label: "Security measures" },
            { id: "cookies", label: "Cookies & similar tech" },
            { id: "automated", label: "Automated decisions" },
            { id: "children", label: "Children" },
            { id: "complaints", label: "Complaints" },
            { id: "changes", label: "Changes to this policy" },
            { id: "contact", label: "Contact" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-10 text-slate-700">
        <section id="controller" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Who is the data controller?</h2>
          <p className="mt-3 text-sm leading-relaxed">
            The data controller responsible for processing described in this policy is{" "}
            <strong>SecureBiz AI</strong>, operating the website at{" "}
            <a className="text-blue-700 underline" href="https://securebiz.org">
              https://securebiz.org
            </a>
            . For privacy requests, use{" "}
            <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>
            .
          </p>
        </section>

        <section id="principles" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Principles & lawful bases</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We process personal data lawfully, fairly, and transparently; we collect data for specified, explicit
            purposes; we limit collection to what is adequate and relevant; we keep data accurate; we store it
            securely; and we retain it only as long as necessary for those purposes.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Depending on the activity, we may rely on: <strong>consent</strong> (e.g. optional marketing cookies or
            newsletters if offered); <strong>contract</strong> (if we provide a service to you under terms);{" "}
            <strong>legitimate interests</strong> (e.g. securing the site, measuring aggregated usage, improving
            content quality, and responding to enquiries)—balanced against your rights; or{" "}
            <strong>legal obligation</strong> where the law requires retention or disclosure.
          </p>
        </section>

        <section id="purposes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Purposes of processing</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Operate and secure the website (hosting, TLS, abuse prevention, logs).</li>
            <li>Respond to messages and process audit/lead forms you submit voluntarily.</li>
            <li>Measure aggregated traffic and performance (analytics), where configured and consented.</li>
            <li>Comply with applicable law and defend legal claims when necessary.</li>
            <li>Maintain business records and improve documentation quality over time.</li>
          </ul>
        </section>

        <section id="categories" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Categories of personal data</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>
              <strong>Identity & contact</strong>: name, email, company name, job role (if you provide them).
            </li>
            <li>
              <strong>Context you share</strong>: sector, project notes, or other fields in forms—only what you type.
            </li>
            <li>
              <strong>Technical & usage</strong>: IP address, user agent, approximate region, timestamps, referral
              URL, and similar server logs needed to run and protect the service.
            </li>
            <li>
              <strong>Cookie / device identifiers</strong>: as described in our{" "}
              <Link className="text-blue-700 underline" href="/legal/cookies">
                Cookie Policy
              </Link>
              .
            </li>
          </ul>
        </section>

        <section id="retention" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Retention periods (summary)</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Retention depends on purpose. The table below is indicative; exact periods may vary by provider contracts
            and legal requirements.
          </p>
          <UsefulDataTable caption="Typical retention horizons (indicative)">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-3 py-2 font-semibold text-slate-900">Data / record</th>
                <th className="px-3 py-2 font-semibold text-slate-900">Typical horizon</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Server & security logs</td>
                <td className="px-3 py-2">Short to medium term (often weeks–months), unless longer retention is required for incidents</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Lead / audit form submissions</td>
                <td className="px-3 py-2">While the relationship is active and for a reasonable period thereafter for follow-up and legal defence</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="px-3 py-2">Marketing communications (if any)</td>
                <td className="px-3 py-2">Until you withdraw consent or unsubscribe</td>
              </tr>
              <tr>
                <td className="px-3 py-2">Analytics aggregates</td>
                <td className="px-3 py-2">Per provider settings (often rolling windows)</td>
              </tr>
            </tbody>
          </UsefulDataTable>
        </section>

        <section id="recipients" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Recipients & subprocessors</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We use infrastructure and service providers (e.g. hosting, DNS, email delivery, analytics, advertising
            networks where enabled) who process data on our behalf as <strong>processors</strong>, under written
            agreements where required by law. We do not sell your personal data.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Some providers may be located outside the European Economic Area. Where that happens, we implement
            appropriate safeguards (e.g. Standard Contractual Clauses or other approved mechanisms), as described
            below.
          </p>
        </section>

        <section id="adsense" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Google AdSense &amp; advertising</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may monetise parts of <strong>securebiz.org</strong> using{" "}
            <strong>Google AdSense</strong> (publisher identifier{" "}
            <code className="text-slate-800">{ADSENSE_PUBLISHER_CA}</code>
            ), which places ads served by Google and its partners. When you view or interact with ads, Google may
            process data (such as your IP address, device or browser signals, and cookie or mobile identifiers) to
            deliver, personalise and measure advertising, and to help prevent fraud—as described in Google&apos;s
            policies, not re-written here in full.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            For how Google uses information from sites that use its services, see{" "}
            <a
              className="text-blue-700 underline"
              href={GOOGLE_PARTNER_PRIVACY}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google&apos;s partner policy overview
            </a>{" "}
            and{" "}
            <a
              className="text-blue-700 underline"
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Privacy Policy
            </a>
            . You can control personalised ads from Google in{" "}
            <a
              className="text-blue-700 underline"
              href={GOOGLE_AD_SETTINGS}
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            . Where EU/UK law requires consent for non-essential advertising cookies, we aim to collect it via our
            cookie approach described in the{" "}
            <Link className="text-blue-700 underline" href="/legal/cookies">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section id="transfers" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">International transfers</h2>
          <p className="mt-3 text-sm leading-relaxed">
            If personal data is transferred to countries not covered by an EU adequacy decision, we rely on GDPR
            Chapter V tools (such as Standard Contractual Clauses) or other legally recognised mechanisms, and we assess
            supplementary measures where appropriate.
          </p>
        </section>

        <section id="rights" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Your rights under GDPR</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Subject to conditions in the GDPR, you may request: <strong>access</strong>, <strong>rectification</strong>
            , <strong>erasure</strong>, <strong>restriction</strong>, <strong>data portability</strong>, and{" "}
            <strong>objection</strong> (including to certain processing based on legitimate interests). Where
            processing is based on consent, you may withdraw consent at any time (this does not affect lawfulness before
            withdrawal).
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            To exercise rights, email{" "}
            <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>
            . We may ask for reasonable information to verify your identity. You may also lodge a complaint with a
            supervisory authority (e.g. the Spanish AEPD if you are in Spain).
          </p>
        </section>

        <section id="security" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Security of processing</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We apply appropriate technical and organisational measures—including access control, encryption in transit
            (HTTPS), vendor diligence, and operational monitoring—to protect personal data. No method of transmission
            or storage is 100% secure; we work to reduce risk in line with industry practice.
          </p>
        </section>

        <section id="cookies" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Cookies & similar technologies</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may use cookies, local storage, pixels, or SDKs for essential operation, measurement, and (where
            applicable) advertising. Details, categories, and controls are in the{" "}
            <Link className="text-blue-700 underline" href="/legal/cookies">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section id="automated" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Automated decisions & profiling</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We do not make decisions with legal or similarly significant effects about you based solely on automated
            processing, including profiling, without human review. If that ever changes, we will provide clear
            information and a lawful basis.
          </p>
        </section>

        <section id="children" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Children</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Our services are aimed at businesses and professionals. We do not knowingly collect children’s data for
            commercial profiling. If you believe a child has submitted personal data, contact us and we will take
            appropriate steps.
          </p>
        </section>

        <section id="complaints" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Complaints</h2>
          <p className="mt-3 text-sm leading-relaxed">
            If you believe processing infringes the GDPR, you have the right to lodge a complaint with a supervisory
            authority in your country of residence, place of work, or place of the alleged infringement.
          </p>
        </section>

        <section id="changes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Changes to this policy</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may update this policy to reflect legal, technical, or service changes. The current version is always
            published on this page with an updated revision date in practice (we recommend bookmarking the page).
            Material changes may also be communicated through the website where appropriate.
          </p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Contact</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Privacy enquiries:{" "}
            <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">
              privacy@securebiz.org
            </a>
          </p>
        </section>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Privacy FAQ</h2>
        <p className="mt-2 text-sm text-slate-600">
          Short answers—full detail remains in the sections above.
        </p>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Do you sell my data?",
                content:
                  "No. We do not sell personal data. We use data to operate the site, respond to requests, and improve the service, as described in this policy.",
              },
              {
                title: "Why do you need my email in forms?",
                content:
                  "So we can reply to audit or lead requests and send operational messages related to your enquiry. We do not use your email for unrelated purposes without a lawful basis.",
              },
              {
                title: "Can I request deletion?",
                content:
                  "Yes, where applicable you may request erasure (subject to legal exceptions, e.g. records we must keep for compliance or legal defence). Contact privacy@securebiz.org.",
              },
              {
                title: "How long do analytics tools keep data?",
                content:
                  "It depends on the provider and configuration. Aggregated analytics often uses rolling retention windows. See our Cookie Policy and provider documentation for specifics.",
              },
            ]}
          />
        </div>
      </section>
      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">Related pages</h2>
        <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <li>
            <Link href="/legal/disclaimer" className="text-blue-700 underline-offset-2 hover:underline">
              Legal disclaimer
            </Link>
          </li>
          <li>
            <Link href="/legal/cookies" className="text-blue-700 underline-offset-2 hover:underline">
              Cookie policy
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-blue-700 underline-offset-2 hover:underline">
              About SecureBiz AI
            </Link>
          </li>
          <li>
            <Link href="/resources/gdpr-websites" className="text-blue-700 underline-offset-2 hover:underline">
              Top 10 GDPR websites
            </Link>
          </li>
        </ul>
      </section>
      <IntentLinksBlock
        title="Related by intent"
        items={[
          { href: "/legal/disclaimer", label: "Legal disclaimer" },
          { href: "/legal/cookies", label: "Cookie policy" },
          { href: "/resources/gdpr-websites", label: "Top GDPR websites" },
          { href: "/checklists/gdpr-checklist-smb", label: "GDPR checklist (SMB)" },
        ]}
      />
    </div>
  );
}

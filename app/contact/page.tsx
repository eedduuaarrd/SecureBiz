import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { SITE_NAME, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us - SecureBiz AI",
  description: `Contact ${SITE_NAME} for inquiries, feedback, or any questions regarding our educational content on GDPR, ISO 27001, and NIS2.`,
  alternates: {
    canonical: "/contact",
  },
  robots: getRobotsAllowAll(),
};

export default function ContactPage() {
  const pageUrl = absoluteUrl("/contact");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Contact", item: pageUrl },
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
          <li className="font-medium text-slate-900">Contact Us</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">Contact {SITE_NAME}</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        We value your feedback. Whether you have a question about our guides, want to report an issue, or explore a partnership, you can reach out to us using the details below.
      </p>

      <div className="mt-10 space-y-10 text-slate-700">
        <section>
          <h2 className="text-xl font-semibold text-slate-900">General Inquiries & Feedback</h2>
          <p className="mt-3 text-sm leading-relaxed">
            For general questions, content suggestions, or feedback, please email us directly:
          </p>
          <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-6">
            <p className="text-lg font-medium text-blue-900">
              <a href="mailto:privacy@securebiz.org" className="hover:underline">
                privacy@securebiz.org
              </a>
            </p>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            We aim to respond to all inquiries within 2-3 business days. Please note that {SITE_NAME} does not provide legal advice or personalized consulting services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-900">Mailing Address</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            If you need to reach us by mail, please use the following address:
            <br />
            <strong>SecureBiz AI</strong> (c/o Information Requests)
            <br />
            (Digital-first entity—please use email for the fastest response)
          </p>
        </section>
      </div>

      <p className="mt-12 text-sm text-slate-500">
        <Link href="/" className="text-blue-700 underline">
          ← Back to home
        </Link>
      </p>
      
      <div className="mt-12">
        <IntentLinksBlock
          title="Related Resources"
          items={[
            { href: "/about", label: "About Us" },
            { href: "/legal/privacy", label: "Privacy Policy" },
            { href: "/legal/disclaimer", label: "Legal Disclaimer" },
          ]}
        />
      </div>
    </div>
  );
}

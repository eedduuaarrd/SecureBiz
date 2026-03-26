import type { Metadata } from "next";
import Link from "next/link";
import { IntentLinksBlock } from "@/components/intent-links-block";
import { PageToc } from "@/components/site-education-blocks";
import { SITE_NAME, getRobotsAllowAll } from "@/lib/seo";
import { absoluteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service | Rules and Conditions of Use",
  description: `Terms of Service for ${SITE_NAME}: Educational use only, liability limits, intellectual property, and acceptable use guidelines.`,
  keywords: [
    "terms of service",
    "terms and conditions",
    "securebiz terms",
    "legal terms",
  ],
  alternates: {
    canonical: "/legal/terms",
  },
  robots: getRobotsAllowAll(),
};

export default function TermsPage() {
  const pageUrl = absoluteUrl("/legal/terms");
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Legal", item: absoluteUrl("/legal/disclaimer") },
      { "@type": "ListItem", position: 3, name: "Terms of Service", item: pageUrl },
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
          <li>
            <Link href="/legal/disclaimer" className="hover:text-slate-900">Legal</Link>
            <span className="mx-1 text-slate-400">/</span>
          </li>
          <li className="font-medium text-slate-900">Terms of Service</li>
        </ol>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        By accessing or using the {SITE_NAME} website ("Service", "we", "us", or "our"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, you may not access the Service.
      </p>

      <div className="mt-8">
        <PageToc
          items={[
            { id: "nature", label: "Educational Nature of the Service" },
            { id: "ip", label: "Intellectual Property" },
            { id: "use", label: "Acceptable Use" },
            { id: "links", label: "Links to Other Websites" },
            { id: "limitation", label: "Limitation of Liability" },
            { id: "changes", label: "Changes to Terms" },
            { id: "contact", label: "Contact Us" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-10 text-slate-700">
        <section id="nature" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Educational Nature of the Service</h2>
          <p className="mt-3 text-sm leading-relaxed">
            All content provided on {SITE_NAME} is for educational and informational purposes only. The information provided does not, and is not intended to, constitute legal advice.
            Please refer to our <Link href="/legal/disclaimer" className="text-blue-700 underline">Legal Disclaimer</Link> for full details. 
            You should contact your attorney to obtain advice with respect to any particular legal issue or problem.
          </p>
        </section>

        <section id="ip" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Intellectual Property</h2>
          <p className="mt-3 text-sm leading-relaxed">
            The Service and its original content, features, and functionality are and will remain the exclusive property of {SITE_NAME} and its licensors. 
            The Service is protected by copyright, trademark, and other laws of both Spain and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of {SITE_NAME}.
          </p>
        </section>

        <section id="use" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Acceptable Use</h2>
          <p className="mt-3 text-sm leading-relaxed">
            You agree not to use the Service to:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
            <li>Engage in any activity that violates any applicable national or international law or regulation.</li>
            <li>Transmit any unsolicited or unauthorized advertising, promotional materials, spam, or any other form of similar solicitation.</li>
            <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service.</li>
            <li>Use any robot, spider, crawler, or other automatic device, process, or means to access the Service for scraping data without explicit authorization.</li>
          </ul>
        </section>

        <section id="links" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Links to Other Websites</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Our Service may contain links to third-party web sites or services that are not owned or controlled by {SITE_NAME}. 
            We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. 
            You further acknowledge and agree that {SITE_NAME} shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such web sites or services.
          </p>
        </section>

        <section id="limitation" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Limitation of Liability</h2>
          <p className="mt-3 text-sm leading-relaxed">
            In no event shall {SITE_NAME}, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
          </p>
        </section>

        <section id="changes" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Changes to Terms</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days notice prior to any new terms taking effect. 
            By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
          </p>
        </section>

        <section id="contact" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Contact Us</h2>
          <p className="mt-3 text-sm leading-relaxed">
            If you have any questions about these Terms, please contact us at: <a className="text-blue-700 underline" href="mailto:privacy@securebiz.org">privacy@securebiz.org</a>.
          </p>
        </section>
      </div>

      <div className="mt-12">
        <IntentLinksBlock
          title="Related Legal Pages"
          items={[
            { href: "/legal/privacy", label: "Privacy Policy" },
            { href: "/legal/cookies", label: "Cookie Policy" },
            { href: "/legal/disclaimer", label: "Legal Disclaimer" },
          ]}
        />
      </div>
    </div>
  );
}

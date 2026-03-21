import type { Metadata } from "next";
import Link from "next/link";
import { SeoAccordion } from "@/components/seo-accordion";
import { PageToc } from "@/components/site-education-blocks";

export const metadata: Metadata = {
  title: "Legal disclaimer",
  description:
    "Scope, limitations, and responsibilities for using SecureBiz AI: informational content, no legal advice, affiliates, and intellectual property.",
  alternates: { canonical: "/legal/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Legal Disclaimer</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        Please read this page carefully. It defines what SecureBiz AI is (and is not), how you should use the content,
        and the limits of our liability. By using <strong>securebiz.org</strong>, you acknowledge this disclaimer
        together with our{" "}
        <Link className="text-blue-700 underline" href="/legal/privacy">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link className="text-blue-700 underline" href="/legal/cookies">
          Cookie Policy
        </Link>
        .
      </p>

      <div className="mt-8">
        <PageToc
          items={[
            { id: "nature", label: "Nature of the service" },
            { id: "trust-domain", label: "This domain, safety & downloads" },
            { id: "not-advice", label: "Not legal or professional advice" },
            { id: "accuracy", label: "Accuracy & updates" },
            { id: "responsibility", label: "Your responsibilities" },
            { id: "affiliates", label: "Affiliate & third-party links" },
            { id: "ai", label: "AI-generated content" },
            { id: "liability", label: "Limitation of liability" },
            { id: "ip", label: "Intellectual property" },
            { id: "law", label: "Governing law" },
          ]}
        />
      </div>

      <div className="mt-10 space-y-10 text-slate-700">
        <section id="nature" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Nature of the service</h2>
          <p className="mt-3 text-sm leading-relaxed">
            SecureBiz AI publishes educational guides, checklists, and structured explanations about compliance and
            cybersecurity topics. The site may include forms for audit requests and links to third-party tools. We aim to
            be practical and actionable, but we are not a law firm, consultancy, or insured professional services
            practice unless expressly stated in a separate written agreement.
          </p>
        </section>

        <section id="trust-domain" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">This domain, safety & downloads</h2>
          <p className="mt-3 text-sm leading-relaxed">
            The public project for this service is served from the canonical host configured for{" "}
            <strong>SecureBiz AI</strong> (see our sitemap and <code className="text-slate-800">robots.txt</code>). This
            website is a <strong>read-only informational web application</strong>: HTML pages, articles, and links to
            public resources. We do <strong>not</strong> operate a software download portal, and we do{" "}
            <strong>not</strong> host or distribute executable files (for example <code className="text-slate-800">.exe</code>
            installers) from this codebase or production deployment.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            Names similar to “SecureBiz” exist on other top-level domains and belong to unrelated organisations. When
            assessing trust, rely on the <strong>exact hostname</strong> shown in your browser, HTTPS, and this site’s
            legal pages—not on third-party rumours or outdated malware feeds that may confuse unrelated domains or
            historical abuse of a hostname.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            For <strong>authoritative</strong> regulatory text and supervision, always use official EU and national
            sources (e.g. EDPB, European Commission, your national DPA, ENISA). SecureBiz AI is a complementary layer of
            sector-oriented education and structure—it is not a government or standards body.
          </p>
        </section>

        <section id="not-advice" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Not legal or professional advice</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Nothing on this website constitutes legal, tax, audit, or regulated professional advice. Laws and standards
            change, and your obligations depend on jurisdiction, sector, contracts, and facts. For decisions with legal
            or financial consequences, consult qualified professionals (e.g. lawyers, DPOs, auditors, insurers).
          </p>
        </section>

        <section id="accuracy" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Accuracy, completeness & updates</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We strive for quality, but we cannot guarantee that every guide is complete, current, or applicable to your
            situation. Regulatory guidance, supervisory interpretations, and vendor capabilities evolve. You should
            independently verify critical points (e.g. legal citations, control mappings, contractual clauses).
          </p>
        </section>

        <section id="responsibility" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Your responsibilities</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Compliance is always your organisation’s responsibility: policies, risk acceptance, budgets, incident
            response, and evidence for regulators or partners. Our guides are inputs to your process—not a substitute
            for internal ownership and expert review where needed.
          </p>
        </section>

        <section id="affiliates" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Affiliate & third-party links</h2>
          <p className="mt-3 text-sm leading-relaxed">
            We may earn commissions when you purchase or sign up through affiliate links. Those arrangements do not
            increase the price you pay in a way that we control, but they may influence which tools we highlight.
            Third-party sites have their own terms and privacy practices; we are not responsible for their content or
            availability.
          </p>
        </section>

        <section id="ai" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">AI-generated & templated content</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Parts of the site may be produced or assisted by generative AI and editorial templates. AI can make mistakes
            (“hallucinations”), omit edge cases, or reflect training cut-offs. Treat outputs as starting points and
            validate with authoritative sources and professionals.
          </p>
        </section>

        <section id="liability" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Limitation of liability</h2>
          <p className="mt-3 text-sm leading-relaxed">
            To the maximum extent permitted by applicable law, SecureBiz AI and its operators disclaim liability for any
            indirect, incidental, consequential, or punitive damages arising from your use of the site, reliance on
            guides, or interactions with third-party tools—except where liability cannot be excluded by mandatory
            consumer or statutory rules.
          </p>
        </section>

        <section id="ip" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Intellectual property</h2>
          <p className="mt-3 text-sm leading-relaxed">
            Text, branding, layout, and original materials on this site are protected by copyright and other rights.
            You may link to public URLs and quote short excerpts with attribution; you may not systematically scrape,
            resell, or misrepresent the content as your own professional work product without permission.
          </p>
        </section>

        <section id="law" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-slate-900">Governing law & jurisdiction</h2>
          <p className="mt-3 text-sm leading-relaxed">
            For disputes relating to use of this website, applicable law may include Spanish law and relevant EU
            regulations, without prejudice to mandatory rights in your country of residence. Competent courts may
            depend on consumer status and mandatory rules.
          </p>
        </section>
      </div>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Disclaimer FAQ</h2>
        <div className="mt-4">
          <SeoAccordion
            items={[
              {
                title: "Can I rely on a guide in an audit?",
                content:
                  "Use it as structured preparation and evidence planning—not as a substitute for your auditor’s requirements. Bring your own records and expert sign-off where needed.",
              },
              {
                title: "Do you warrant ISO certification?",
                content:
                  "No. Certification is issued by accredited bodies after audit. Our content may help you prepare controls, but it does not guarantee certification outcomes.",
              },
              {
                title: "Who do I contact if I find an error?",
                content:
                  "Use the contact options published on the site. We appreciate corrections that improve accuracy for everyone.",
              },
              {
                title: "Is this site a malware or download site?",
                content:
                  "No. SecureBiz AI is an informational website (guides, hubs, legal pages). We do not provide executable downloads or a /dl software channel. If you see claims linking this project to random file paths or installers, verify the exact URL and hostname—many look-alike domains exist on the internet.",
              },
            ]}
          />
        </div>
      </section>
    </div>
  );
}

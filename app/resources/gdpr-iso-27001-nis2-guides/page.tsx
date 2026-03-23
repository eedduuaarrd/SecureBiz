import type { Metadata } from "next";
import { getRobotsAllowAll } from "@/lib/seo";

const GUIDES = [
  ["ENISA", "https://www.enisa.europa.eu", "NIS2 orientation, cybersecurity implementation patterns, and resilience guidance."],
  ["European Data Protection Board (EDPB)", "https://edpb.europa.eu", "High-authority GDPR interpretation and supervisory consistency."],
  ["European Commission", "https://commission.europa.eu", "Policy and legal context across EU digital and data regulation."],
  ["AEPD (Spain)", "https://www.aepd.es", "National DPA perspective with practical operational resources."],
  ["ISO Organization", "https://www.iso.org", "Official source for ISO standards scope and publication references."],
  ["IAPP", "https://iapp.org", "Cross-framework governance and privacy/security role development."],
  ["ICO (UK)", "https://ico.org.uk", "Operational data protection guidance and accountability patterns."],
  ["NIS Cooperation Group docs (EU)", "https://digital-strategy.ec.europa.eu", "NIS and NIS2 cooperation outputs and implementation direction."],
  ["Advisera (learning)", "https://advisera.com", "Structured learning materials for ISO 27001 implementation."],
  ["BSI Group", "https://www.bsigroup.com", "Certification perspective and practical management-system content."],
] as const;

export const metadata: Metadata = {
  title: "Top 10 GDPR + ISO 27001 + NIS2 guides",
  description:
    "Top 10 trusted references across GDPR, ISO 27001, and NIS2 for governance, risk, and practical implementation.",
  keywords: [
    "GDPR ISO 27001 NIS2 guides",
    "best NIS2 resources",
    "ISO 27001 implementation references",
    "GDPR and cybersecurity governance",
    "GRC resources",
  ],
  alternates: { canonical: "/resources/gdpr-iso-27001-nis2-guides" },
  robots: getRobotsAllowAll(),
};

export default function GdprIsoNis2GuidesPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Top 10 GDPR + ISO 27001 + NIS2 guide sources</h1>
      <p className="mt-3 text-sm leading-relaxed text-slate-600">
        If you are building a real compliance-security program, treat these as a layered stack: legal interpretation,
        management-system discipline, and incident/supply-chain resilience.
      </p>

      <ol className="mt-8 space-y-4">
        {GUIDES.map(([name, url, why], idx) => (
          <li key={url} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              {idx + 1}. {name}
            </p>
            <a href={url} target="_blank" rel="noreferrer" className="mt-1 inline-block text-sm text-blue-700 underline-offset-2 hover:underline">
              {url}
            </a>
            <p className="mt-2 text-sm text-slate-600">{why}</p>
          </li>
        ))}
      </ol>

      <section className="mt-10 rounded-xl border border-emerald-100 bg-emerald-50 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Execution order (recommended)</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
          <li>Define scope and data reality (GDPR accountability basics).</li>
          <li>Implement repeatable controls and evidence flow (ISO 27001 discipline).</li>
          <li>Strengthen governance, incident reporting, and supplier resilience (NIS2 expectations).</li>
        </ol>
      </section>
    </div>
  );
}

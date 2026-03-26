import Link from "next/link";
import {
  getGuidePersonaNarrative,
  getSectorMainRisksForName,
} from "@/lib/sector-persona";

type Props = {
  sectorName: string;
  regulationName: string;
  sectorSlug: string;
  regulationSlug: string;
};

/**
 * Extra indexable copy + internal links — sector/regulation-specific narrative for SEO & LLMs.
 */
export function GuideRichIntro({
  sectorName,
  regulationName,
  sectorSlug,
  regulationSlug,
}: Props) {
  const risks = getSectorMainRisksForName(sectorName);
  const narrative = getGuidePersonaNarrative(
    sectorName,
    regulationName,
    regulationSlug,
  );

  return (
    <section
      className="relative overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 via-white to-blue-50/40 p-6 sm:p-8 shadow-sm"
      aria-labelledby="guide-context-heading"
    >
      <div className="absolute top-0 right-0 -mr-6 -mt-6 h-24 w-24 rounded-full bg-indigo-200/50 blur-2xl"></div>
      <div className="relative z-10">
        <div className="mb-4 inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-800">
          Executive Summary
        </div>
        <h2
          id="guide-context-heading"
          className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          Why {regulationName} matters for {sectorName}
        </h2>
        <div className="mt-4 space-y-4">
          {narrative.map((paragraph, i) => (
            <p
              key={i}
              className="text-base leading-relaxed text-slate-700"
            >
              {paragraph}
            </p>
          ))}
        </div>
        <p className="mt-6 border-t border-indigo-100 pt-4 text-sm leading-relaxed text-slate-600">
          Browse the{" "}
          <Link
            href="/regulations"
            className="font-semibold text-indigo-700 underline-offset-4 hover:underline"
          >
            regulations hub
          </Link>{" "}
          or your{" "}
          <Link
            href={`/sector/${sectorSlug}`}
            className="font-semibold text-indigo-700 underline-offset-4 hover:underline"
          >
            {sectorName} sector hub
          </Link>{" "}
          for the same frameworks with vocabulary tailored to your niche.
        </p>
        <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 backdrop-blur-sm p-5 shadow-sm">
          <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-800">
            <svg className="h-5 w-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
            Risk signals for this sector
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2 text-sm text-slate-700">
            {risks.slice(0, 6).map((risk) => (
              <li key={risk} className="flex items-start gap-2">
                <span className="mt-1 flex-shrink-0 h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 border-t border-slate-100 pt-3">
            <p className="text-xs text-slate-500">
              Related reference:{" "}
              <Link
                href={`/regulation/${regulationSlug}`}
                className="font-medium text-indigo-600 transition-colors hover:text-indigo-800"
              >
                {regulationName} — all sectors
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

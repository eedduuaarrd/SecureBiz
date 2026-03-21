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
      className="rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/90 to-white p-5 sm:p-6"
      aria-labelledby="guide-context-heading"
    >
      <h2
        id="guide-context-heading"
        className="text-lg font-semibold text-slate-900 sm:text-xl"
      >
        Why {regulationName} matters for {sectorName}
      </h2>
      {narrative.map((paragraph, i) => (
        <p
          key={i}
          className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]"
        >
          {paragraph}
        </p>
      ))}
      <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-[15px]">
        Browse the{" "}
        <Link
          href="/regulations"
          className="font-medium text-blue-700 underline-offset-2 hover:underline"
        >
          regulations hub
        </Link>{" "}
        or your{" "}
        <Link
          href={`/sector/${sectorSlug}`}
          className="font-medium text-blue-700 underline-offset-2 hover:underline"
        >
          {sectorName} sector hub
        </Link>{" "}
        for the same frameworks with vocabulary tailored to your niche.
      </p>
      <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Risk signals for this sector
        </p>
        <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
          {risks.slice(0, 6).map((risk) => (
            <li key={risk}>{risk}</li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Related:{" "}
          <Link
            href={`/normativa/${regulationSlug}`}
            className="font-medium text-blue-700 underline-offset-2 hover:underline"
          >
            {regulationName} — all sectors
          </Link>
        </p>
      </div>
    </section>
  );
}

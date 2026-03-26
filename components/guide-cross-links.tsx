import Link from "next/link";
import { getRegulationSeedsForSectorSlug, buildSeedSectors } from "@/lib/catalog";

type Props = {
  sectorName: string;
  sectorSlug: string;
  regulationSlug: string;
  regulationName: string;
};

/**
 * Dense internal links on guide pages: hubs + adjacent regulations for the same sector.
 */
export function GuideCrossLinks({
  sectorName,
  sectorSlug,
  regulationSlug,
  regulationName,
}: Props) {
  const others = getRegulationSeedsForSectorSlug(sectorSlug)
    .filter((r) => r.slug !== regulationSlug)
    .slice(0, 6);

  // Pick 6 random sectors that are NOT the current one to cross-pollinate PageRank
  const allSectors = buildSeedSectors();
  const randomSectors = [...allSectors]
    .filter((s) => s.slug !== sectorSlug)
    .sort(() => 0.5 - Math.random())
    .slice(0, 6);

  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6">
      <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
        More for {sectorName}
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Same sector, different frameworks—compare obligations and vocabulary without leaving the site.
      </p>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        <li>
          <Link
            href={`/sector/${sectorSlug}`}
            className="text-sm font-medium text-blue-800 underline-offset-2 hover:underline"
          >
            Sector hub ({sectorName})
          </Link>
        </li>
        <li>
          <Link
            href={`/normativa/${regulationSlug}`}
            className="text-sm font-medium text-blue-800 underline-offset-2 hover:underline"
          >
            All sectors × {regulationName}
          </Link>
        </li>
        <li>
          <Link href="/sectors#catalog-search" className="text-sm font-medium text-blue-800 underline-offset-2 hover:underline">
            Search every sector
          </Link>
        </li>
        <li>
          <Link href="/regulations#catalog-search" className="text-sm font-medium text-blue-800 underline-offset-2 hover:underline">
            Regulation catalog
          </Link>
        </li>
      </ul>
      <h3 className="mt-6 text-sm font-semibold text-slate-800">Other regulations for this sector</h3>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
        {others.map((r) => (
          <li key={r.slug}>
            <Link
              href={`/guia/${sectorSlug}/${r.slug}`}
              className="text-blue-700 underline-offset-2 hover:underline"
            >
              {r.name}
            </Link>
          </li>
        ))}
      </ul>

      {randomSectors.length > 0 && (
        <>
          <h3 className="mt-6 text-sm font-semibold text-slate-800">Similar guides for {regulationName}</h3>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            {randomSectors.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/guia/${s.slug}/${regulationSlug}`}
                  className="text-blue-700 underline-offset-2 hover:underline"
                >
                  {regulationName} for {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}

import Link from "next/link";
import { UsefulContextCallout, UsefulDataTable } from "@/components/site-education-blocks";

type Props = {
  sectorName: string;
  regulationName: string;
  sectorSlug: string;
  regulationSlug: string;
};

/**
 * Extra implementation context appended to every guide for depth and usefulness.
 */
export function GuideImplementationExtras({
  sectorName,
  regulationName,
  sectorSlug,
  regulationSlug,
}: Props) {
  return (
    <section className="mt-10 space-y-8 border-t border-slate-200 pt-10">
      <UsefulContextCallout title="How to use this guide in the real world">
        <p>
          Treat this page as a <strong>working document</strong>: highlight owners, dates, and evidence next to each
          control. For <strong>{sectorName}</strong> under <strong>{regulationName}</strong>, success looks like
          decisions you can defend—what you store, where it flows, who can access it, and how you detect incidents—not
          a polished policy nobody follows.
        </p>
        <p>
          If you only do three things this month: (1) confirm your actual data flows vs. assumptions, (2) enforce MFA on
          admin and email, (3) start an incident log—even if it is a shared doc with timestamps.
        </p>
      </UsefulContextCallout>

      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-slate-900">30 / 60 / 90-day implementation lens</h2>
        <p className="mt-2 text-sm text-slate-600">
          Generic timelines beat vague “roadmaps”. Adjust dates to your capacity.
        </p>
        <UsefulDataTable caption="Phased rollout (template)">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-3 py-2 font-semibold text-slate-900">Window</th>
              <th className="px-3 py-2 font-semibold text-slate-900">Focus</th>
              <th className="px-3 py-2 font-semibold text-slate-900">Outputs</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2 font-medium">30 days</td>
              <td className="px-3 py-2">Truth on data, access, and vendors</td>
              <td className="px-3 py-2">Inventory, MFA on critical accounts, DPA status</td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2 font-medium">60 days</td>
              <td className="px-3 py-2">Controls that reduce incident likelihood</td>
              <td className="px-3 py-2">Backups tested, offboarding checklist, cookie/tag inventory</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-medium">90 days</td>
              <td className="px-3 py-2">Evidence pack & continuous habits</td>
              <td className="px-3 py-2">Quarterly review, training proof, metrics that leadership understands</td>
            </tr>
          </tbody>
        </UsefulDataTable>
      </div>

      <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-5">
        <h2 className="text-lg font-semibold text-slate-900">Related pages on this site</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-800">
          <li>
            <Link className="font-medium text-blue-800 underline-offset-2 hover:underline" href={`/sector/${sectorSlug}`}>
              Sector hub for {sectorName}
            </Link>
            {" — "}risks, regulation cards, and deep-dive resources.
          </li>
          <li>
            <Link
              className="font-medium text-blue-800 underline-offset-2 hover:underline"
              href={`/normativa/${regulationSlug}`}
            >
              Regulation hub for {regulationName}
            </Link>
            {" — "}other sectors with the same framework.
          </li>
          <li>
            <Link className="font-medium text-blue-800 underline-offset-2 hover:underline" href="/regulations#catalog-search">
              All regulations
            </Link>
            {" — "}compare frameworks before you over-invest in one.
          </li>
        </ul>
      </div>
    </section>
  );
}

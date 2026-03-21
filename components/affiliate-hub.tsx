import { AffiliateLink } from "@/components/affiliate-link";
import { affiliateTools } from "@/lib/catalog";

export function AffiliateHub() {
  return (
    <aside className="rounded-xl border border-slate-200 bg-slate-50 p-5">
      <h3 className="text-lg font-semibold text-slate-900">Recommended tools</h3>
      <p className="mt-1 text-sm text-slate-600">
        Quick selection of a stack you can implement today.
      </p>
      <ul className="mt-4 space-y-4">
        {affiliateTools.map((tool, index) => (
          <li key={tool.name} className="rounded-lg border border-slate-200 bg-white p-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              #{index + 1} Recommended
            </p>
            <p className="mt-1 font-medium text-slate-900">{tool.name}</p>
            <p className="mt-1 text-sm text-slate-600">{tool.description}</p>
            <AffiliateLink
              href={tool.href}
              toolName={tool.name}
              className="mt-3 inline-block rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800"
            >
              Try offer
            </AffiliateLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}

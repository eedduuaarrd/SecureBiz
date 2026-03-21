import type { ReactNode } from "react";
import Link from "next/link";

/** Shared callout for “useful context” across hub pages. */
export function UsefulContextCallout({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-5 sm:p-6">
      <h2 className="text-lg font-semibold text-emerald-950">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-emerald-950/90">
        {children}
      </div>
    </section>
  );
}

/** Standard table wrapper for comparison / reference tables. */
export function UsefulDataTable({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm text-slate-700">
        <caption className="border-b border-slate-100 bg-slate-50 px-3 py-2 text-left text-xs font-semibold text-slate-600">
          {caption}
        </caption>
        {children}
      </table>
    </div>
  );
}

/** In-page navigation for long legal / resource pages. */
export function PageToc({
  items,
}: {
  items: { id: string; label: string }[];
}) {
  return (
    <nav
      aria-label="On this page"
      className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm"
    >
      <p className="font-semibold text-slate-900">On this page</p>
      <ol className="mt-2 space-y-1.5 list-decimal pl-5 text-slate-700">
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className="text-blue-700 underline-offset-2 hover:underline">
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function HubFooterLinks() {
  return (
    <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-xl font-semibold text-slate-900">More resources</h2>
      <p className="mt-2 text-sm text-slate-600">
        Deep guides, sector hubs, and legal transparency — all linked for continuous reading.
      </p>
      <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <li>
          <Link href="/sectors#catalog-search" className="font-medium text-blue-700 hover:underline">
            All sectors (searchable)
          </Link>
        </li>
        <li>
          <Link href="/regulations#catalog-search" className="font-medium text-blue-700 hover:underline">
            All regulations (searchable)
          </Link>
        </li>
        <li>
          <Link href="/legal/privacy" className="font-medium text-blue-700 hover:underline">
            Privacy policy
          </Link>
        </li>
        <li>
          <Link href="/legal/cookies" className="font-medium text-blue-700 hover:underline">
            Cookie policy
          </Link>
        </li>
        <li>
          <Link href="/legal/disclaimer" className="font-medium text-blue-700 hover:underline">
            Legal disclaimer
          </Link>
        </li>
      </ul>
    </section>
  );
}

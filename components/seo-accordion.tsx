import type { ReactNode } from "react";

export type SeoAccordionItem = {
  title: string;
  content: ReactNode;
};

/**
 * Native `<details>` — no extra JS, good for SEO (content in DOM) and Lighthouse.
 */
export function SeoAccordion({ items }: { items: SeoAccordionItem[] }) {
  return (
    <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white">
      {items.map((item, i) => (
        <details key={i} className="group p-4 open:bg-slate-50/80">
          <summary className="min-h-11 cursor-pointer list-none py-1 text-base font-semibold text-slate-900 touch-manipulation sm:min-h-0 sm:text-sm [&::-webkit-details-marker]:hidden">
            <span className="flex w-full items-start justify-between gap-3">
              <span>{item.title}</span>
              <span
                className="mt-0.5 shrink-0 text-slate-400 transition group-open:rotate-180"
                aria-hidden
              >
                ▼
              </span>
            </span>
          </summary>
          <div className="mt-3 text-[15px] leading-relaxed text-slate-700 sm:text-sm">{item.content}</div>
        </details>
      ))}
    </div>
  );
}

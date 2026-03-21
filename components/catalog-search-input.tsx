"use client";

import { useEffect, useId, useState } from "react";

type CatalogSearchInputProps = {
  listId: string;
  searchLabel: string;
  searchPlaceholder: string;
  totalCount: number;
};

/**
 * Filters a server-rendered list by `data-catalog-search` (lowercase haystack).
 * Keeps the DOM in the server HTML for SEO and avoids shipping huge prop trees to the client.
 */
export function CatalogSearchInput({
  listId,
  searchLabel,
  searchPlaceholder,
  totalCount,
}: CatalogSearchInputProps) {
  const [q, setQ] = useState("");
  const labelId = useId();
  const countId = `${listId}-count`;

  useEffect(() => {
    const root = document.getElementById(listId);
    const countEl = document.getElementById(countId);
    if (!root) return;

    const query = q.trim().toLowerCase();
    const items = root.querySelectorAll<HTMLElement>("[data-catalog-search]");
    let visible = 0;
    for (const el of items) {
      const hay = el.getAttribute("data-catalog-search") ?? "";
      const show = !query || hay.includes(query);
      el.hidden = !show;
      if (show) visible += 1;
    }
    if (countEl) {
      countEl.textContent = `Showing ${visible} of ${totalCount}`;
    }
  }, [q, listId, totalCount, countId]);

  return (
    <div id="catalog-search" className="scroll-mt-24 space-y-2">
      <label htmlFor={labelId} className="block">
        <span className="mb-1.5 block text-sm font-medium text-slate-700">
          {searchLabel}
        </span>
        <input
          id={labelId}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/25"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
          aria-controls={listId}
        />
      </label>
      <p id={countId} className="text-xs text-slate-500" aria-live="polite">
        Showing {totalCount} of {totalCount}
      </p>
    </div>
  );
}

"use client";

import { useCallback } from "react";

export function MobileStickyLead() {
  const onClick = useCallback(() => {
    const el = document.getElementById("lead-capture");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-900">
            Request the audit (72h)
          </p>
          <p className="truncate text-xs text-slate-600">
            Get a tailored plan to implement compliance + security.
          </p>
        </div>
        <button
          type="button"
          onClick={onClick}
          aria-label="Scroll to the audit request form"
          className="shrink-0 rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Get the plan
        </button>
      </div>
    </div>
  );
}


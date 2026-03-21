"use client";

import { useCallback } from "react";

export function MobileStickyLead() {
  const onClick = useCallback(() => {
    const el = document.getElementById("lead-capture");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4">
        <div className="min-w-0 flex-1 py-1">
          <p className="truncate text-sm font-semibold leading-snug text-slate-900">
            Request the audit (72h)
          </p>
          <p className="truncate text-xs leading-snug text-slate-600">
            Get a tailored plan to implement compliance + security.
          </p>
        </div>
        <button
          type="button"
          onClick={onClick}
          aria-label="Scroll to the audit request form"
          className="touch-manipulation shrink-0 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-950"
        >
          Get the plan
        </button>
      </div>
    </div>
  );
}


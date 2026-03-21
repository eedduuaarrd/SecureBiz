"use client";

import { useEffect } from "react";

/** Adsterra script tags (global / pop-under style loaders). */
const ADSTERRA_SCRIPTS = [
  "https://pl28955173.profitablecpmratenetwork.com/a1/17/bc/a117bccd0e23418f415f0ae32949b0e8.js",
] as const;

/** Slightly after AdSense so ad scripts don’t stack on the same tick. */
const ADSTERRA_DELAY_MS = 5_500;

function hasScriptWithSrc(src: string) {
  return Boolean(document.querySelector(`script[src="${src}"]`));
}

export function AdsterraLoader() {
  useEffect(() => {
    let cancelled = false;
    const run = () => {
      if (cancelled) return;
      for (const src of ADSTERRA_SCRIPTS) {
        if (hasScriptWithSrc(src)) continue;
        const el = document.createElement("script");
        el.async = true;
        el.src = src;
        document.body.appendChild(el);
      }
    };
    const t = window.setTimeout(() => {
      const idle =
        window.requestIdleCallback ?? ((cb: () => void) => setTimeout(cb, 200));
      idle(() => run());
    }, ADSTERRA_DELAY_MS);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, []);

  return null;
}

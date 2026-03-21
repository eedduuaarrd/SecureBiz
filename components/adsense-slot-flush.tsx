"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { whenAdsenseScriptReady } from "@/lib/adsense-ready";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Runs one ordered `adsbygoogle.push({})` per `<ins class="adsbygoogle">` inside `<main>`,
 * in **document order**. AdSense fills the next unfilled slot per push; per-component
 * effects can therefore pair the wrong slot with the wrong unit — this fixes blank/mismatched ads.
 */
export function AdsenseSlotFlush() {
  const pathname = usePathname();
  const runId = useRef(0);

  useEffect(() => {
    const id = ++runId.current;
    let cancelled = false;

    const flush = () => {
      if (cancelled || id !== runId.current) return;
      const list = document.querySelectorAll("main ins.adsbygoogle");
      for (const node of list) {
        const ins = node as HTMLElement;
        if (ins.dataset.sbAdsensePushed === "1") continue;
        ins.dataset.sbAdsensePushed = "1";
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {
          delete ins.dataset.sbAdsensePushed;
        }
      }
    };

    whenAdsenseScriptReady().then(() => {
      if (cancelled || id !== runId.current) return;
      requestAnimationFrame(() => {
        if (cancelled || id !== runId.current) return;
        requestAnimationFrame(() => {
          if (cancelled || id !== runId.current) return;
          flush();
        });
      });
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}

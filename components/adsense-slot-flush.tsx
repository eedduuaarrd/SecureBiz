"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { whenAdsenseScriptReady } from "@/lib/adsense-ready";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function whenDocumentLoaded(): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    window.addEventListener("load", () => resolve(), { once: true });
  });
}

/**
 * AdSense expects `push({ element: ins })` to bind each slot to a specific `<ins>`.
 * Plain `push({})` walks the DOM for the “next” unfilled slot and breaks with React’s
 * render/hydration order — leaving empty grey boxes.
 */
function pushElement(ins: HTMLElement) {
  const st = ins.dataset.adsbygoogleStatus;
  if (st === "reserved" || st === "done") return;
  try {
    type AdsQueue = Array<{ element?: HTMLElement } | Record<string, never>>;
    const q = (window.adsbygoogle = window.adsbygoogle || []) as unknown as AdsQueue;
    q.push({ element: ins });
  } catch {
    /* ignore */
  }
}

export function AdsenseSlotFlush() {
  const pathname = usePathname();
  const runId = useRef(0);

  useEffect(() => {
    const id = ++runId.current;
    let cancelled = false;

    const flush = () => {
      if (cancelled || id !== runId.current) return;
      const list = document.querySelectorAll("main ins.adsbygoogle");
      list.forEach((node) => pushElement(node as HTMLElement));
    };

    const scheduleFlush = () => {
      whenAdsenseScriptReady()
        .then(() => whenDocumentLoaded())
        .then(() => {
          if (cancelled || id !== runId.current) return;
          requestAnimationFrame(() => {
            if (cancelled || id !== runId.current) return;
            requestAnimationFrame(() => {
              if (cancelled || id !== runId.current) return;
              flush();
              // Late-mounted slots (e.g. Suspense): one follow-up pass.
              window.setTimeout(() => {
                if (cancelled || id !== runId.current) return;
                flush();
              }, 1200);
            });
          });
        });
    };

    scheduleFlush();

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return null;
}

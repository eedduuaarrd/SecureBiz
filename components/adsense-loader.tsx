"use client";

import { useEffect } from "react";
import { markAdsenseScriptReady } from "@/lib/adsense-ready";

/** Matches Google’s snippet: async + crossorigin="anonymous" (see AdSense setup). */
const ADSENSE_SRC =
  "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6750754859429492";

/**
 * Injects the AdSense loader with a plain `<script>` (no `next/script`) so Next.js
 * does not add `data-nscript`, which can trigger console noise from Google’s loader.
 */
function findAdsenseScript(): HTMLScriptElement | null {
  return document.querySelector('script[src*="pagead/js/adsbygoogle.js"]');
}

export function AdsenseLoader() {
  useEffect(() => {
    const existing = findAdsenseScript();
    if (existing) {
      // Client navigations: tag already in the document — unblock units (push queues safely).
      markAdsenseScriptReady();
      return;
    }

    const el = document.createElement("script");
    el.async = true;
    el.src = ADSENSE_SRC;
    el.crossOrigin = "anonymous";
    el.onload = () => {
      markAdsenseScriptReady();
    };
    el.onerror = () => {
      // Still unblock so UI does not wait forever; slots may stay empty.
      markAdsenseScriptReady();
    };
    document.head.appendChild(el);
  }, []);

  return null;
}

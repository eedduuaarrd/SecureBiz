"use client";

import { useEffect, useRef } from "react";
import { whenAdsenseScriptReady } from "@/lib/adsense-ready";
import { ADSENSE_PUBLISHER_CA } from "@/lib/site-ads";

type AdBannerProps = {
  slotId: string;
  format?: "auto" | "fluid" | "rectangle";
  responsive?: boolean;
  className?: string;
};

export function AdBanner({ slotId, format = "auto", responsive = true, className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    let mounted = true;
    whenAdsenseScriptReady().then(() => {
      if (!mounted) return;
      try {
        if (adRef.current && !adRef.current.hasAttribute("data-adsbygoogle-status")) {
          // @ts-expect-error - adsbygoogle is added by the AdSense script globally
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error("AdSense error:", e);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div key={slotId} className={`my-8 flex w-full justify-center overflow-hidden bg-slate-50 text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "250px", minWidth: "300px" }}
        data-ad-client={ADSENSE_PUBLISHER_CA}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive ? "true" : "false"}
      />
    </div>
  );
}

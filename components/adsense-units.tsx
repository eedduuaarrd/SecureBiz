"use client";

import type { ReactNode } from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_FLUID_LAYOUT_KEY,
  ADSENSE_SLOTS,
} from "@/lib/adsense";

/**
 * AdSense `<ins>` slots. Filling is handled once per navigation by `AdsenseSlotFlush`
 * (document order), not per-component effects — avoids wrong slot pairing and blank ads.
 */

type WrapperProps = {
  className?: string;
  label?: string;
  children: ReactNode;
};

function AdSlotWrapper({ className, label, children }: WrapperProps) {
  return (
    <aside
      className={className}
      aria-label={label ?? "Advertisement"}
      data-ad-slot-wrapper
    >
      {children}
    </aside>
  );
}

/** Auto responsive display unit. */
export function AdSenseDisplayAuto({ className }: { className?: string }) {
  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS.displayAuto}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </AdSlotWrapper>
  );
}

/** Fluid unit (layout key). */
export function AdSenseFluid({ className }: { className?: string }) {
  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="fluid"
        data-ad-layout-key={ADSENSE_FLUID_LAYOUT_KEY}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS.fluid}
      />
    </AdSlotWrapper>
  );
}

/** In-article style fluid unit. */
export function AdSenseInArticle({ className }: { className?: string }) {
  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS.inArticle}
      />
    </AdSlotWrapper>
  );
}

/** Multiplex (autorelaxed). */
export function AdSenseMultiplex({ className }: { className?: string }) {
  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS.multiplex}
      />
    </AdSlotWrapper>
  );
}

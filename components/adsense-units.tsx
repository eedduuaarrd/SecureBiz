"use client";

import {
  useEffect,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import {
  ADSENSE_CLIENT,
  ADSENSE_FLUID_LAYOUT_KEY,
  ADSENSE_SLOTS,
} from "@/lib/adsense";
import { whenAdsenseScriptReady } from "@/lib/adsense-ready";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

function pushAdSlot(ins: HTMLElement | null) {
  if (!ins) return;
  try {
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  } catch {
    /* ignore */
  }
}

function useAdSensePush(insRef: RefObject<HTMLModElement | null>) {
  const pushed = useRef(false);
  useEffect(() => {
    if (pushed.current) return;
    let cancelled = false;

    const tryPush = () => {
      if (cancelled || pushed.current) return;
      const el = insRef.current;
      if (!el) return;
      pushed.current = true;
      pushAdSlot(el);
    };

    whenAdsenseScriptReady().then(() => {
      if (cancelled) return;
      // Next frame: ref + layout stable after the library runs.
      requestAnimationFrame(() => {
        if (cancelled) return;
        tryPush();
        if (!pushed.current) {
          queueMicrotask(tryPush);
        }
      });
    });

    return () => {
      cancelled = true;
    };
  }, [insRef]);
}

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
  const ref = useRef<HTMLModElement>(null);
  useAdSensePush(ref);

  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        ref={ref}
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
  const ref = useRef<HTMLModElement>(null);
  useAdSensePush(ref);

  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        ref={ref}
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
  const ref = useRef<HTMLModElement>(null);
  useAdSensePush(ref);

  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        ref={ref}
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
  const ref = useRef<HTMLModElement>(null);
  useAdSensePush(ref);

  return (
    <AdSlotWrapper className={className} label="Advertisement">
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-format="autorelaxed"
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={ADSENSE_SLOTS.multiplex}
      />
    </AdSlotWrapper>
  );
}

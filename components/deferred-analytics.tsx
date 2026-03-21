"use client";

import dynamic from "next/dynamic";

const VercelAnalytics = dynamic(
  () => import("@vercel/analytics/next").then((m) => m.Analytics),
  { ssr: false },
);
const SpeedInsights = dynamic(
  () => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights),
  { ssr: false },
);
const Ga4Analytics = dynamic(
  () => import("@/components/analytics").then((m) => m.Analytics),
  { ssr: false },
);

export function DeferredAnalytics() {
  return (
    <>
      <Ga4Analytics />
      <VercelAnalytics />
      <SpeedInsights />
    </>
  );
}

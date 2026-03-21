import Script from "next/script";

/**
 * GA4 (gtag.js) — same as Google’s inline snippet, via `next/script`.
 * - `lazyOnload`: loads after the page is idle → less main-thread work during LCP (mobile PSI).
 * - Set `NEXT_PUBLIC_GA_VIA_GTM_ONLY=true` if GA4 is configured inside GTM only (avoids duplicate ~150KB).
 */
const GA_VIA_GTM_ONLY =
  process.env.NEXT_PUBLIC_GA_VIA_GTM_ONLY === "1" ||
  process.env.NEXT_PUBLIC_GA_VIA_GTM_ONLY === "true";

const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.replace(/\/$/, "").trim() ||
  "G-LMBKNS44HF";

export function Analytics() {
  if (GA_VIA_GTM_ONLY) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-tag-gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

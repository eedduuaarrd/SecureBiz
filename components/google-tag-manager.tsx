import Script from "next/script";

/** Google Tag Manager container ID (override with NEXT_PUBLIC_GTM_ID). */
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-5F2SKDDX";

/**
 * GTM noscript iframe first in &lt;body&gt;, then loader script.
 * `lazyOnload` defers GTM after load to reduce main-thread work (PageSpeed / LCP on mobile).
 */
export function GoogleTagManager() {
  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
      <Script
        id="google-tag-manager"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`,
        }}
      />
    </>
  );
}

import Link from "next/link";
import { GOOGLE_AD_SETTINGS, GOOGLE_PARTNER_PRIVACY } from "@/lib/site-ads";

/**
 * Global disclosure for Google AdSense (transparency + EU expectations).
 * Shown site-wide so reviewers see ads context next to Privacy/Cookie links.
 */
export function PublisherAdNotice() {
  return (
    <div
      className="rounded-lg border border-slate-200 bg-slate-50/90 px-3 py-3 text-xs leading-relaxed text-slate-600"
      role="region"
      aria-label="Advertising disclosure"
    >
      <p>
        <span className="font-semibold text-slate-700">Advertising.</span> Some
        pages may show ads through{" "}
        <strong className="text-slate-800">Google AdSense</strong>. Google may use cookies or similar technologies to serve and measure
        ads, including personalised ads where allowed. Ads are provided by Google;
        advertisers are not endorsed by SecureBiz AI. See{" "}
        <Link href="/legal/privacy" className="font-medium text-blue-700 underline">
          Privacy
        </Link>
        ,{" "}
        <Link href="/legal/cookies" className="font-medium text-blue-700 underline">
          Cookies
        </Link>
        , and{" "}
        <a
          className="font-medium text-blue-700 underline"
          href={GOOGLE_PARTNER_PRIVACY}
          target="_blank"
          rel="noopener noreferrer"
        >
          How Google uses data from sites that use our services
        </a>
        . You can manage Google ad personalisation in{" "}
        <a
          className="font-medium text-blue-700 underline"
          href={GOOGLE_AD_SETTINGS}
          target="_blank"
          rel="noopener noreferrer"
        >
          Google Ads Settings
        </a>
        .
      </p>
    </div>
  );
}

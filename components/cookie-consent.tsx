"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const hasConsented = localStorage.getItem("cookieBannerConsent");
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieBannerConsent", "true");
    setShowConsent(false);
    // In a real implementation you would enable analytics/ads scripts here
  };

  const declineCookies = () => {
    localStorage.setItem("cookieBannerConsent", "false");
    setShowConsent(false);
    // In a real implementation you would ensure tracking scripts are disabled
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom border-t border-slate-200 bg-white p-4 shadow-lg sm:p-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
        <div className="text-sm text-slate-600 sm:text-base">
          <p>
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking &quot;Accept All&quot;, you consent to our use of cookies.
            Read our <Link href="/legal/cookies" className="font-medium text-blue-700 hover:underline">Cookies Policy</Link> and <Link href="/legal/privacy" className="font-medium text-blue-700 hover:underline">Privacy Policy</Link> for more information.
          </p>
        </div>
        <div className="flex w-full shrink-0 flex-col gap-2 sm:w-auto sm:flex-row">
          <button
            onClick={declineCookies}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Decline All
          </button>
          <button
            onClick={acceptCookies}
            className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}

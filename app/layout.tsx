import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { BrandLogo } from "@/components/brand-logo";
import { SiteHeader } from "@/components/site-header";
import { AdsenseLoader } from "@/components/adsense-loader";
import { DeferredAnalytics } from "@/components/deferred-analytics";
import { GoogleTagManager } from "@/components/google-tag-manager";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  SITE_NAME,
  getDefaultOgImageUrl,
  getDefaultOgImages,
  getGoogleSiteVerificationMetadata,
  getRobotsAllowAll,
} from "@/lib/seo";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: getSiteUrl() }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: getRobotsAllowAll(),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    url: getSiteUrl(),
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: getDefaultOgImages(),
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [getDefaultOgImageUrl()],
  },
  ...getGoogleSiteVerificationMetadata(),
  // Tab icons: `app/favicon.ico` and `app/icon.png` (same brand asset as `public/logo.png`).
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f8fafc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full scroll-smooth antialiased`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fundingchoicesmessages.google.com" />
        <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 text-base antialiased sm:text-[15px]">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <GoogleTagManager />
        <DeferredAnalytics />
        <AdsenseLoader />
        <SiteHeader />
        <main id="main-content" className="flex-1 outline-none" tabIndex={-1}>
          {children}
        </main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 text-sm text-slate-600 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 font-medium text-slate-800"
              >
                <BrandLogo width={40} height={40} />
                <span>SecureBiz AI</span>
              </Link>
              <p className="max-w-xl">
                SecureBiz AI is an AI-generated informational tool. It does not
                replace professional legal advice.
              </p>
            </div>
            <nav
              aria-label="Site"
              className="flex flex-wrap gap-x-4 gap-y-2 border-t border-slate-100 pt-4 text-xs text-slate-500"
            >
              <Link href="/sectors#catalog-search" className="hover:text-slate-800">
                Sectors
              </Link>
              <Link href="/regulations#catalog-search" className="hover:text-slate-800">
                Regulations
              </Link>
              <Link href="/normatives" className="hover:text-slate-800">
                Normatives
              </Link>
              <Link href="/about" className="hover:text-slate-800">
                About
              </Link>
              <Link href="/resources" className="hover:text-slate-800">
                Resources
              </Link>
              <Link href="/compare" className="hover:text-slate-800">
                Compare
              </Link>
              <Link href="/checklists" className="hover:text-slate-800">
                Checklists
              </Link>
              <Link href="/legal/privacy" className="hover:text-slate-800">
                Privacy
              </Link>
              <Link href="/legal/cookies" className="hover:text-slate-800">
                Cookies
              </Link>
              <Link href="/legal/disclaimer" className="hover:text-slate-800">
                Disclaimer
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}

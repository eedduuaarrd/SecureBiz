import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site";

export const SITE_NAME = "SecureBiz AI";

export const DEFAULT_TITLE =
  "SecureBiz AI | GDPR, ISO 27001 & Cybersecurity Guides by Sector";

export const DEFAULT_DESCRIPTION =
  "Free GDPR, ISO 27001, NIS2, and cookie-law guides by industry: sector hubs, regulation pages, checklists, and audit-ready steps for SMBs and compliance teams — SecureBiz AI (securebiz.org).";

/** Default keywords for the global layout (pages can extend). */
export const DEFAULT_KEYWORDS = [
  "SecureBiz",
  "SecureBiz AI",
  "securebiz.org",
  "GDPR",
  "ISO 27001",
  "cookie law",
  "cybersecurity",
  "compliance",
  "data protection",
  "sector guides",
  "audit readiness",
  "risk management",
  "privacy policy",
  "information security",
  "SMB compliance",
  "EU GDPR",
];

/** Google Search Console HTML tag verification (optional). */
export function getGoogleSiteVerificationMetadata(): Partial<Metadata> {
  const token = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return {};
  return { verification: { google: token } };
}

/** Open Graph / Twitter default image (absolute URL). */
export function getDefaultOgImageUrl(): string {
  return absoluteUrl("/logo.png");
}

export function getRobotsAllowAll(): Metadata["robots"] {
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

/** Shared OG image entry for social cards when no page-specific image exists. */
export function getDefaultOgImages(): NonNullable<
  NonNullable<Metadata["openGraph"]>["images"]
> {
  return [
    {
      url: getDefaultOgImageUrl(),
      width: 512,
      height: 512,
      alt: `${SITE_NAME} logo`,
    },
  ];
}

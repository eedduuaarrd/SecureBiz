"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics-events";

type AffiliateLinkProps = {
  href: string;
  toolName: string;
  className?: string;
  children: ReactNode;
};

export function AffiliateLink({
  href,
  toolName,
  className,
  children,
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={className}
      onClick={() =>
        trackEvent("affiliate_click", {
          tool_name: toolName,
          link_url: href,
        })
      }
    >
      {children}
    </a>
  );
}

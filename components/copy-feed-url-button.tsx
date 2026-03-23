"use client";

import { useState } from "react";

type CopyFeedUrlButtonProps = {
  path?: string;
  className?: string;
};

export function CopyFeedUrlButton({
  path = "/rss.xml",
  className = "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50",
}: CopyFeedUrlButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      const url =
        typeof window !== "undefined"
          ? `${window.location.origin}${path}`
          : path;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button type="button" onClick={handleCopy} className={className}>
      {copied ? "Copied feed URL" : "Copy feed URL"}
    </button>
  );
}

"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";

/** Primary navigation only — sitemap / llms.txt stay discoverable via robots.txt, not main chrome. */
const PRIMARY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/sectors#catalog-search", label: "Sectors" },
  { href: "/regulations#catalog-search", label: "Regulations" },
] as const;

const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const titleId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 md:static md:bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex min-w-0 items-center gap-2.5 text-base font-semibold text-slate-900 sm:gap-3 sm:text-xl"
        >
          <BrandLogo
            width={48}
            height={48}
            priority
            className="h-10 w-10 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
          <span className="truncate leading-tight">SecureBiz AI</span>
        </Link>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls={titleId}
            className="min-h-11 min-w-11 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm touch-manipulation active:bg-slate-50"
          >
            Menu
          </button>
        </div>

        {open ? (
          <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button
              type="button"
              className="absolute inset-0 bg-slate-900/50 touch-manipulation"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <div className="absolute inset-y-0 right-0 flex w-[min(100vw-2.5rem,20rem)] flex-col border-l border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                <span id={titleId} className="text-sm font-semibold text-slate-900">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 min-w-11 items-center justify-center rounded-lg text-sm font-semibold text-slate-700 touch-manipulation hover:bg-slate-100"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto px-2 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2" aria-label="Primary mobile">
                <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Explore
                </p>
                <ul className="flex flex-col gap-1">
                  {PRIMARY_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3.5 text-base font-medium text-slate-900 active:bg-slate-100 touch-manipulation"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Legal
                </p>
                <ul className="flex flex-col gap-1">
                  {LEGAL_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3.5 text-base text-slate-800 active:bg-slate-100 touch-manipulation"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        ) : null}

        <nav
          className="hidden items-center gap-2 text-sm text-slate-600 md:flex lg:gap-3"
          aria-label="Primary"
        >
          {PRIMARY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-2 py-2 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <span className="text-slate-300" aria-hidden>
            |
          </span>
          {LEGAL_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-lg px-2 py-2 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

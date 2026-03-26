"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

/** Primary navigation only — sitemap / llms.txt stay discoverable via robots.txt, not main chrome. */
const PRIMARY_LINKS = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/resources", label: "Resources" },
  { href: "/compare", label: "Compare" },
  { href: "/checklists", label: "Checklists" },
  { href: "/sectors#catalog-search", label: "Sectors" },
  { href: "/regulations#catalog-search", label: "Regulations" },
] as const;

const LEGAL_LINKS = [
  { href: "/legal/terms", label: "Terms" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90 md:static md:bg-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5 text-base font-semibold text-slate-900 sm:gap-3 sm:text-xl"
        >
          <BrandLogo
            width={48}
            height={48}
            decorative
            priority
            className="h-10 w-10 shrink-0 sm:h-14 sm:w-14 md:h-16 md:w-16"
          />
          <span className="whitespace-nowrap leading-tight">SecureBiz AI</span>
        </Link>

        {/* Mobile menu button */}
        <div className="relative md:hidden">
          {mobileOpen ? (
            <button
              type="button"
              aria-label="Close menu overlay"
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-slate-900/20"
            />
          ) : null}
          <details
            className="group relative z-50"
            open={mobileOpen}
            onToggle={(e) => setMobileOpen((e.currentTarget as HTMLDetailsElement).open)}
          >
            <summary
              aria-expanded={mobileOpen}
              aria-controls="primary-mobile-menu"
              className="min-h-11 min-w-11 cursor-pointer list-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm touch-manipulation active:bg-slate-50 [&::-webkit-details-marker]:hidden"
            >
              Menu
            </summary>
            <div
              id="primary-mobile-menu"
              className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,22rem)] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
            >
              <nav className="max-h-[75vh] overflow-y-auto pb-[max(0.5rem,env(safe-area-inset-bottom))]" aria-label="Primary mobile">
                <p className="px-3 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Explore</p>
                <ul className="flex flex-col gap-1">
                  {PRIMARY_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3.5 text-base font-medium text-slate-900 active:bg-slate-100 touch-manipulation"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">Legal</p>
                <ul className="flex flex-col gap-1">
                  {LEGAL_LINKS.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl px-4 py-3.5 text-base text-slate-800 active:bg-slate-100 touch-manipulation"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </details>
        </div>

        {/* Desktop navigation */}
        <nav
          className="hidden items-center gap-1 text-sm font-medium text-slate-600 md:flex lg:gap-2"
          aria-label="Primary"
        >
          {/* Main top-level links */}
          <Link href="/sectors#catalog-search" className="rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50">
            Sectors
          </Link>
          <Link href="/regulations#catalog-search" className="rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50">
            Regulations
          </Link>
          <Link href="/resources" className="rounded-lg px-3 py-2 text-slate-900 hover:bg-slate-50">
            Resources
          </Link>

          {/* More menu */}
          <div className="group relative ml-1 border-l border-slate-200 pl-1">
            <button
              type="button"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            >
              More
              <svg
                className="h-4 w-4 text-slate-400 transition-transform group-hover:rotate-180"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="invisible absolute right-0 top-full z-50 mt-1 w-56 origin-top-right transform rounded-xl border border-slate-200 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              <div className="py-1">
                <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Company</p>
                <Link href="/about" className="block rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                  About Us
                </Link>
                <Link href="/contact" className="block rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                  Contact
                </Link>
              </div>
              <div className="my-1 border-t border-slate-100 py-1">
                <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Tools</p>
                <Link href="/compare" className="block rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                  Comparison Tool
                </Link>
                <Link href="/checklists" className="block rounded-lg px-3 py-2 hover:bg-slate-50 hover:text-slate-900">
                  Checklists
                </Link>
              </div>
              <div className="my-1 border-t border-slate-100 py-1">
                <p className="px-3 pb-1 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">Compliance</p>
                {LEGAL_LINKS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

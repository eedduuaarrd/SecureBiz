import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

const NAV_LINKS = [
  { href: "/sectors#catalog-search", label: "Sectors" },
  { href: "/regulations#catalog-search", label: "Regulations" },
  { href: "/legal/privacy", label: "Privacy" },
  { href: "/legal/cookies", label: "Cookies" },
  { href: "/legal/disclaimer", label: "Disclaimer" },
] as const;

export function SiteHeader() {
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

        <details className="group relative md:hidden">
          <summary className="cursor-pointer list-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-800 shadow-sm [&::-webkit-details-marker]:hidden">
            Menu
          </summary>
          <nav
            className="absolute right-0 z-50 mt-2 w-[min(100vw-2rem,20rem)] rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
            aria-label="Primary mobile"
          >
            <ul className="flex flex-col gap-0.5">
              {NAV_LINKS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-3 py-3 text-base text-slate-800 active:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </details>

        <nav
          className="hidden items-center gap-3 text-sm text-slate-600 md:flex lg:gap-4"
          aria-label="Primary"
        >
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

import Link from "next/link";
import { BrandLogo } from "@/components/brand-logo";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-6 py-16 text-center">
      <BrandLogo width={72} height={72} className="rounded-xl shadow-md" />
      <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">
        404 — Page not found
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">
        We couldn&apos;t find that URL
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
        The link may be broken, the page may have moved, or the address was mistyped. Try the hubs below — every
        sector and regulation is searchable.
      </p>
      <div className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
        <Link
          href="/"
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Home
        </Link>
        <Link
          href="/sectors#catalog-search"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Search sectors
        </Link>
        <Link
          href="/regulations#catalog-search"
          className="rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Search regulations
        </Link>
      </div>
      <p className="mt-10 text-xs text-slate-500">
        Search engines discover all public URLs via the standard <code className="text-slate-600">/robots.txt</code>{" "}
        endpoint (no need to open raw XML from here).
      </p>
    </div>
  );
}

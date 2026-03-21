"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-6 py-16 text-center">
      <h1 className="text-2xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-sm text-slate-600">
        This page hit an unexpected error. You can try again or return to the home page.
      </p>
      {process.env.NODE_ENV === "development" && error.message ? (
        <pre className="mt-6 max-h-40 w-full overflow-auto rounded-lg border border-red-200 bg-red-50 p-3 text-left text-xs text-red-900">
          {error.message}
        </pre>
      ) : null}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

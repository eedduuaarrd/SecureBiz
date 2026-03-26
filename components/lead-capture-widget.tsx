"use client";

import { FormEvent, useId, useState } from "react";
import { trackEvent } from "@/lib/analytics-events";

type LeadCaptureWidgetProps = {
  sector: string;
  variant?: "A" | "B";
};

export function LeadCaptureWidget({ sector, variant = "A" }: LeadCaptureWidgetProps) {
  const fieldId = useId();
  const nameId = `${fieldId}-name`;
  const emailId = `${fieldId}-email`;
  const companyId = `${fieldId}-company`;
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        if (response.status === 503) {
          setStatus("error");
          setErrorMessage(
            "Service is temporarily unavailable. Please try again in a few minutes.",
          );
          return;
        }
        throw new Error(`Lead request failed (${response.status})`);
      }

      event.currentTarget.reset();
      setStatus("success");
      trackEvent("generate_lead", {
        sector,
        form_name: "auditoria_personalitzada",
        variant,
      });

      // Fire Google Ads conversion tracking
      if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-18028490691/-M2FCPyKtY4cEMPf05RD",
        });
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your request. Please try again.");
    }
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-200 bg-gradient-to-b from-white to-blue-50 p-8 shadow-md">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-8 -mt-8 h-32 w-32 rounded-full bg-blue-100 blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {variant === "A"
            ? "Get your personalized audit"
            : "Receive a compliance plan in 72h"}
        </h3>
        <p className="mt-2 text-sm text-slate-600">
          Receive a compliance and security plan for the <span className="font-semibold text-blue-700">{sector}</span> sector.
        </p>
        <ul className="mt-4 space-y-2 text-sm text-slate-600">
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            Initial diagnosis of digital risks
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            72-hour action plan
          </li>
          <li className="flex items-center gap-2">
            <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
            No subscription commitment
          </li>
        </ul>

        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <div className="grid gap-1.5">
            <label htmlFor={nameId} className="text-sm font-semibold text-slate-800">
              Full name
            </label>
            <input
              id={nameId}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              name="name"
              autoComplete="name"
              placeholder="Jane Doe"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor={emailId} className="text-sm font-semibold text-slate-800">
              Work email
            </label>
            <input
              id={emailId}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@company.com"
              required
            />
          </div>
          <div className="grid gap-1.5">
            <label htmlFor={companyId} className="text-sm font-semibold text-slate-800">
              Company
            </label>
            <input
              id={companyId}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              name="company"
              autoComplete="organization"
              placeholder="Company name"
              required
            />
          </div>
          <input name="sector" value={sector} readOnly className="hidden" />
          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60 disabled:hover:bg-blue-600"
            disabled={status === "loading"}
          >
            {status === "loading"
              ? "Sending..."
              : variant === "A"
                ? "I want my audit"
                : "I want my 72h plan"}
          </button>
        </form>

        {status === "success" ? (
          <div className="mt-4 rounded-lg bg-emerald-50 p-4 border border-emerald-100">
            <p className="text-sm font-medium text-emerald-800">
              Perfect. We’ll contact you within 24 hours.
            </p>
          </div>
        ) : null}
        {status === "error" ? (
          <div className="mt-4 rounded-lg bg-red-50 p-4 border border-red-100">
            <p className="text-sm font-medium text-red-800">
              {errorMessage ?? "Could not send your request. Please try again."}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}

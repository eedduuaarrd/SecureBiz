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
    } catch {
      setStatus("error");
      setErrorMessage("Could not send your request. Please try again.");
    }
  }

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">
        {variant === "A"
          ? "Get your personalized audit"
          : "Receive a compliance plan in 72h"}
      </h3>
      <p className="mt-2 text-sm text-slate-600">
        Receive a compliance and security plan for the {sector} sector.
      </p>
      <ul className="mt-3 space-y-1 text-xs text-slate-500">
        <li>- Initial diagnosis of digital risks</li>
        <li>- 72-hour action plan</li>
        <li>- No subscription commitment</li>
      </ul>

      <form onSubmit={onSubmit} className="mt-4 grid gap-3">
        <div className="grid gap-1">
          <label htmlFor={nameId} className="text-sm font-medium text-slate-800">
            Full name
          </label>
          <input
            id={nameId}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
            name="name"
            autoComplete="name"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor={emailId} className="text-sm font-medium text-slate-800">
            Work email
          </label>
          <input
            id={emailId}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
          />
        </div>
        <div className="grid gap-1">
          <label htmlFor={companyId} className="text-sm font-medium text-slate-800">
            Company
          </label>
          <input
            id={companyId}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900"
            name="company"
            autoComplete="organization"
            placeholder="Company name"
            required
          />
        </div>
        <input name="sector" value={sector} readOnly className="hidden" />
        <button
          type="submit"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
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
        <p className="mt-3 text-sm text-emerald-700">
          Perfect. We’ll contact you within 24 hours.
        </p>
      ) : null}
      {status === "error" ? (
        <p className="mt-3 text-sm text-red-700">
          {errorMessage ?? "Could not send your request. Please try again."}
        </p>
      ) : null}
    </section>
  );
}

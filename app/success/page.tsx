import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { CheckCircle2, ArrowRight, ShieldCheck, FileText, Zap } from "lucide-react";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Request Received - SecureBiz AI",
  description: "Thank you for your request. We have received your information and will be in touch shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuccessPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16 text-center">
      {/* Google Ads Conversion Tracking Script */}
      <Script
        id="google-ads-conversion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('event', 'conversion', {'send_to': 'AW-18028490691/-M2FCPyKtY4cEMPf05RD'});
          `,
        }}
      />

      <div className="flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-emerald-100 opacity-75"></div>
          <CheckCircle2 className="relative h-20 w-20 text-emerald-500" />
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Request Received Successfully!
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600">
        Thank you for trusting {SITE_NAME}. Our team is already reviewing your details to prepare your personalized compliance and security plan.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <Zap className="mx-auto h-8 w-8 text-blue-600" />
          <h3 className="mt-4 font-semibold text-slate-900">72-Hour Response</h3>
          <p className="mt-2 text-sm text-slate-500">
            You will receive your initial action plan via email within 3 business days.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <ShieldCheck className="mx-auto h-8 w-8 text-blue-600" />
          <h3 className="mt-4 font-semibold text-slate-900">Expert Review</h3>
          <p className="mt-2 text-sm text-slate-500">
            Your specific sector risks are being analyzed using our proprietary AI model.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
          <FileText className="mx-auto h-8 w-8 text-blue-600" />
          <h3 className="mt-4 font-semibold text-slate-900">Next Steps</h3>
          <p className="mt-2 text-sm text-slate-500">
            Keep an eye on your inbox. We might reach out for a quick 5-min verification.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-slate-100 pt-12">
        <h2 className="text-xl font-semibold text-slate-900">While you wait...</h2>
        <p className="mt-2 text-slate-600">Explore our most popular resources and compliance guides.</p>
        
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="/sectors"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            Explore Sectors
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/checklists"
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            All Checklists
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

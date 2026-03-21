import type { GuideFaq } from "@/lib/types";

type GuideFaqSectionProps = {
  faqs: GuideFaq[];
};

export function GuideFaqSection({ faqs }: GuideFaqSectionProps) {
  if (!faqs.length) {
    return null;
  }

  return (
    <section
      className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-6"
      aria-labelledby="faq-heading"
    >
      <h2 id="faq-heading" className="text-2xl font-semibold text-slate-900">
        Frequently asked questions
      </h2>
      <dl className="mt-4 space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="font-medium text-slate-900">{faq.question}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-slate-600">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

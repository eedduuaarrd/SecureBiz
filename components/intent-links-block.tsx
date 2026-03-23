import Link from "next/link";

type IntentLinkItem = {
  href: string;
  label: string;
};

type IntentLinksBlockProps = {
  title: string;
  items: IntentLinkItem[];
};

export function IntentLinksBlock({ title, items }: IntentLinksBlockProps) {
  if (items.length === 0) return null;

  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-3 flex flex-wrap gap-3">
        {items.map((item) => (
          <Link
            key={`${item.href}:${item.label}`}
            href={item.href}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </section>
  );
}

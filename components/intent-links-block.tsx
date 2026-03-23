import Link from "next/link";
import { preferNativeAnchorForHref } from "@/lib/prefer-native-anchor";

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
        {items.map((item) => {
          const className =
            "rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50";
          const key = `${item.href}:${item.label}`;
          return preferNativeAnchorForHref(item.href) ? (
            <a key={key} href={item.href} className={className}>
              {item.label}
            </a>
          ) : (
            <Link key={key} href={item.href} className={className}>
              {item.label}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

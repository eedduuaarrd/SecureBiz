import Link from "next/link";
import { POPULAR_TOPIC_LINKS } from "@/lib/popular-internal-links";
import { preferNativeAnchorForHref } from "@/lib/prefer-native-anchor";

export function FooterTrafficLinks() {
  return (
    <section
      className="border-t border-slate-100 pt-5"
      aria-labelledby="footer-popular-topics-heading"
    >
      <h2
        id="footer-popular-topics-heading"
        className="text-xs font-semibold uppercase tracking-wide text-slate-500"
      >
        Popular topics &amp; guides
      </h2>
      <p className="mt-1 text-xs text-slate-500">
        High-intent pages—useful for humans and for site discovery (internal linking).
      </p>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-2 text-xs">
        {POPULAR_TOPIC_LINKS.map((item) => (
          <li key={item.href}>
            {preferNativeAnchorForHref(item.href) ? (
              <a
                href={item.href}
                className="text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
              >
                {item.label}
              </a>
            ) : (
              <Link
                href={item.href}
                className="text-slate-600 underline-offset-2 hover:text-slate-900 hover:underline"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

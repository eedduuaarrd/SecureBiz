/**
 * Next.js `<Link>` is for app routes; XML/txt responses are better opened with a plain `<a>`
 * so the browser handles the MIME type instead of client navigation quirks.
 */
export function preferNativeAnchorForHref(href: string): boolean {
  const path = href.split("#")[0]?.split("?")[0] ?? href;
  return /\.(xml|txt)$/i.test(path);
}

/**
 * Public site URL (canonical, sitemap, Open Graph, metadataBase).
 * - Prefer `NEXT_PUBLIC_SITE_URL` when it is a real public host (not `*.vercel.app`).
 * - Vercel production: if unset or wrongly set to a deployment URL, use `https://securebiz.org`.
 * - Preview: `VERCEL_URL`. Local: http://localhost:3000
 */
const SITE_CANONICAL_ORIGIN = "https://securebiz.org";

function isVercelDeploymentHost(url: string): boolean {
  try {
    const host = new URL(url.includes("://") ? url : `https://${url}`).hostname;
    return host.endsWith(".vercel.app");
  } catch {
    return /\.vercel\.app$/i.test(url.replace(/^https?:\/\//i, "").split("/")[0] ?? "");
  }
}

export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  const fromEnv =
    raw && !isVercelDeploymentHost(raw) ? raw : undefined;
  if (fromEnv) return fromEnv;

  const vercelEnv = process.env.VERCEL_ENV;

  if (vercelEnv === "production") {
    return SITE_CANONICAL_ORIGIN;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    return vercel.startsWith("http") ? vercel : `https://${vercel}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

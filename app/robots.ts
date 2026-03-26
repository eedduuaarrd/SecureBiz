import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * Default rule + explicit allows for common AI/search crawlers (ChatGPT, Gemini, Perplexity, etc.).
 * /admin stays disallowed for the wildcard rule.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl().replace(/\/$/, "");

  return {
    rules: [
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
        noindex: ["/admin", "/admin/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Bytespider",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

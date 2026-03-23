import { NextResponse } from "next/server";
import { SITE_NAME, DEFAULT_DESCRIPTION } from "@/lib/seo";
import { getRecentGuidesForFeed } from "@/lib/guide-sitemap";
import { getSiteUrl } from "@/lib/site";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function rfc822(d: Date): string {
  return d.toUTCString();
}

export async function GET() {
  const base = getSiteUrl().replace(/\/$/, "");
  const items = await getRecentGuidesForFeed(48);

  const channelItems =
    items.length > 0
      ? items
          .map((item) => {
            const link = `${base}${item.path}`;
            return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${rfc822(item.pubDate)}</pubDate>
      <description>${escapeXml(item.description.slice(0, 500))}</description>
    </item>`;
          })
          .join("")
      : `
    <item>
      <title>${escapeXml(SITE_NAME)} — sector guides</title>
      <link>${escapeXml(`${base}/sectors`)}</link>
      <guid isPermaLink="true">${escapeXml(`${base}/sectors`)}</guid>
      <pubDate>${rfc822(new Date())}</pubDate>
      <description>${escapeXml("Browse sectors and open regulation-specific guides. New long-form guides appear here as they are generated.")}</description>
    </item>`;

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(base)}</link>
    <description>${escapeXml(DEFAULT_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822(new Date())}</lastBuildDate>
    <atom:link href="${escapeXml(`${base}/rss.xml`)}" rel="self" type="application/rss+xml" />
    ${channelItems}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

/**
 * RFC 9116 security.txt — HTTPS-only contact pointers (no email required).
 */
export async function GET() {
  const site = getSiteUrl().replace(/\/$/, "");

  const lines = [
    "# SecureBiz AI",
    `Canonical: ${site}/.well-known/security.txt`,
    "",
    `Contact: ${site}/about`,
    `Contact: ${site}/legal/disclaimer`,
    "Preferred-Languages: en, ca, es",
    `Policy: ${site}/legal/privacy`,
    "",
  ];

  const body = lines.join("\n");

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

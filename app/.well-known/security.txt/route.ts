import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site";

/**
 * RFC 9116 security.txt — signals a maintained security contact (trust / good practice).
 * Override contact via SECURITY_CONTACT_EMAIL (mailto) or SECURITY_CONTACT_URL (https).
 */
export async function GET() {
  const site = getSiteUrl().replace(/\/$/, "");
  const email = process.env.SECURITY_CONTACT_EMAIL?.trim();
  const url = process.env.SECURITY_CONTACT_URL?.trim();

  const lines = ["# SecureBiz AI", "Canonical: /.well-known/security.txt", ""];

  if (email && email.includes("@")) {
    lines.push(`Contact: mailto:${email}`);
  } else if (url && /^https?:\/\//i.test(url)) {
    lines.push(`Contact: ${url}`);
  } else {
    lines.push(`Contact: ${site}/about`);
    lines.push(`# Prefer email: set SECURITY_CONTACT_EMAIL in production`);
  }

  lines.push("Preferred-Languages: en");
  lines.push(`Policy: ${site}/legal/disclaimer`);

  const body = `${lines.join("\n")}\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

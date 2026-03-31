import { NextResponse } from "next/server";

// Returns the public egress IP of this serverless environment.
// Useful when your upstream (e.g. MongoDB Atlas) requires IP allowlisting.
export const revalidate = 3600;
export async function GET() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, error: `ipify http ${res.status}` },
        { status: 502 },
      );
    }
    const data = (await res.json()) as { ip?: string };
    const ip = data.ip;
    if (!ip) {
      return NextResponse.json(
        { ok: false, error: "Missing ip in ipify response" },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, ip });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Failed to fetch egress IP" },
      { status: 503 },
    );
  }
}


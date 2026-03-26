import { NextResponse } from "next/server";
import { z } from "zod";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

// Ensure this route runs on Node.js runtime
export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(120),
  sector: z.string().min(2).max(140),
});

export async function POST(request: Request) {
  let leadData: any = null;
  try {
    const payload = await request.json();
    const result = leadSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid payload", issues: result.error.issues },
        { status: 400 },
      );
    }

    leadData = result.data;

    const pool = getPgPool();
    await ensurePostgresSchema();
    await pool.query(
      `
        INSERT INTO leads (name, email, company, sector, created_at)
        VALUES ($1, $2, $3, $4, NOW())
      `,
      [result.data.name, result.data.email, result.data.company, result.data.sector],
    );

    // Send email notification (non-blocking)
    try {
      const { sendLeadNotification } = await import("@/lib/email");
      sendLeadNotification(result.data).catch(err => {
        console.error("Async email error:", err);
      });
    } catch (e) {
      console.error("Email service import failed:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("CRITICAL API Error:", error);
    
    // Fallback persistence
    try {
      const fs = await import("node:fs/promises");
      const os = await import("node:os");
      const path = await import("node:path");

      if (!leadData) {
        return NextResponse.json(
          { ok: false, error: "Lead processing failed", detail: error?.message },
          { status: 500 },
        );
      }

      const tmpDir = os.tmpdir();
      const filePath = path.join(tmpDir, "leads.jsonl");

      await fs.appendFile(
        filePath,
        `${JSON.stringify({ ...leadData, error: error?.message, timestamp: new Date().toISOString() })}\n`,
        "utf8",
      );

      return NextResponse.json({ ok: true, fallback: "file" });
    } catch (fallbackError) {
      return NextResponse.json(
        { ok: false, error: "Total failure", reason: error?.message },
        { status: 503 },
      );
    }
  }
}

import { NextResponse } from "next/server";
import { z } from "zod";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

// Ensure this route runs on Node.js runtime (MongoDB driver may not work in Edge runtime)
export const runtime = "nodejs";

const leadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().min(2).max(120),
  sector: z.string().min(2).max(140),
});

export async function POST(request: Request) {
  let leadData: z.infer<typeof leadSchema> | null = null;
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

    // [MODIFIED]: Send email notification to user
    const { sendLeadNotification } = await import("@/lib/email");
    await sendLeadNotification(result.data);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Lead processing error:", error);
    // Fallback: if Postgres or Email fails, persist leads to a local jsonl file
    // so the CTA doesn't break. (Note: in serverless, this is best-effort.)
    try {
      const fs = await import("node:fs/promises");
      const os = await import("node:os");
      const path = await import("node:path");

      if (!leadData) {
        return NextResponse.json(
          { ok: false, error: "Lead persistence failed", reason: "Missing parsed lead data" },
          { status: 503 },
        );
      }

      const tmpDir = os.tmpdir();
      const filePath = path.join(tmpDir, "leads.jsonl");

      await fs.appendFile(
        filePath,
        `${JSON.stringify({ ...leadData, timestamp: new Date().toISOString() })}\n`,
        "utf8",
      );

      return NextResponse.json({ ok: true, fallback: "file" });
    } catch {
      return NextResponse.json(
        { ok: false, error: "Lead persistence failed", reason: "File fallback write failed" },
        { status: 503 },
      );
    }
  }
}

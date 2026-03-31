import { NextResponse } from "next/server";
import { ensurePostgresSchema, getPgPool } from "@/lib/postgres";

// Health endpoint to diagnose Postgres connectivity in production.
export const revalidate = 300;

export async function GET() {
  try {
    const pool = getPgPool();
    await ensurePostgresSchema();
    await pool.query("SELECT 1");
    return NextResponse.json({ ok: true });
  } catch (err) {
    const e = err as { name?: string; message?: string };
    return NextResponse.json(
      {
        ok: false,
        errorName: e?.name ?? "UnknownError",
        errorMessage: e?.message ?? "No message",
      },
      { status: 503 },
    );
  }
}


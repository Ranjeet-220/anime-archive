import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/auth";

export async function POST() {
  try {
    await clearSessionCookie();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[auth/logout]", err);
    return NextResponse.json({ error: "Sign out failed." }, { status: 500 });
  }
}

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const sources = await prisma.source.findMany({
      orderBy: { verificationStatus: "asc" },
      take: 500,
    });
    return NextResponse.json({ sources });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/sources]", err);
    return NextResponse.json({ error: "Failed to load sources." }, { status: 500 });
  }
}

export const runtime = "nodejs";

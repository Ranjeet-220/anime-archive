import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const contributions = await prisma.contribution.findMany({
      orderBy: { createdAt: "desc" },
      take: 200,
      include: {
        user: { select: { id: true, username: true, email: true } },
        reviewedBy: { select: { id: true, username: true } },
      },
    });
    return NextResponse.json({ contributions });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/contributions]", err);
    return NextResponse.json({ error: "Failed to load contributions." }, { status: 500 });
  }
}

export const runtime = "nodejs";

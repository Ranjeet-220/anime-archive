import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";

export async function GET() {
  try {
    await requireRole("ADMIN");
    const reports = await prisma.report.findMany({
      orderBy: [{ status: "asc" }, { createdAt: "desc" }],
      take: 200,
      include: {
        user: { select: { id: true, username: true, email: true } },
      },
    });
    return NextResponse.json({ reports });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/reports]", err);
    return NextResponse.json({ error: "Failed to load reports." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireRole("ADMIN");
    const body = await req.json().catch(() => null);
    const reportId = typeof body?.reportId === "string" ? body.reportId : null;
    const status = body?.status;
    if (!reportId || !["RESOLVED", "DISMISSED"].includes(status)) {
      return NextResponse.json({ error: "reportId and a valid status are required." }, { status: 400 });
    }
    const report = await prisma.report.update({
      where: { id: reportId },
      data: { status, resolvedAt: new Date() },
    });
    return NextResponse.json({ report });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/reports]", err);
    return NextResponse.json({ error: "Failed to update report." }, { status: 500 });
  }
}

export const runtime = "nodejs";
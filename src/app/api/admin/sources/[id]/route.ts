import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";
import type { VerificationStatus } from "@/generated/prisma/client";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const body = await req.json().catch(() => null);

    const status = (typeof body?.status === "string" ? body.status : "") as VerificationStatus;
    if (!["VERIFIED", "UNVERIFIED"].includes(status)) {
      return NextResponse.json({ error: "Status must be VERIFIED or UNVERIFIED." }, { status: 400 });
    }

    const existing = await prisma.source.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ error: "Source not found." }, { status: 404 });
    }

    const source = await prisma.source.update({
      where: { id },
      data: {
        verificationStatus: status,
        verificationDate: status === "VERIFIED" ? new Date() : null,
      },
    });
    invalidateCacheTags(["anime", "person", "studio", "event"]);
    return NextResponse.json({ source });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/sources/[id]]", err);
    return NextResponse.json({ error: "Failed to update source." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const deleted = await prisma.source.deleteMany({ where: { id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Source not found." }, { status: 404 });
    }
    invalidateCacheTags(["anime", "person", "studio", "event"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/sources/[id]]", err);
    return NextResponse.json({ error: "Failed to delete source." }, { status: 500 });
  }
}

export const runtime = "nodejs";

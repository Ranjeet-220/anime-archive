import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import type { Role } from "@/generated/prisma/client";

const ROLES: Role[] = ["USER", "CONTRIBUTOR", "EDITOR", "ADMIN"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const admin = await requireRole("ADMIN");
    const { id } = await params;
    const body = await req.json().catch(() => null);

    const role = (typeof body?.role === "string" ? body.role : "") as Role;
    if (!ROLES.includes(role)) {
      return NextResponse.json({ error: "Invalid role." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!existing) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }
    // Never allow an admin to demote themselves.
    if (id === admin.id && role !== "ADMIN") {
      return NextResponse.json({ error: "You cannot change your own role." }, { status: 400 });
    }

    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, username: true, email: true, role: true },
    });
    return NextResponse.json({ user });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "Only administrators can change roles." }, { status: 403 });
    console.error("[admin/users/[id]]", err);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });
  }
}

export const runtime = "nodejs";

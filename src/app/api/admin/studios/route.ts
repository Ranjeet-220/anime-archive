import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { studioSchema, studioData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const studios = await prisma.studio.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { anime: true } } },
    });
    return NextResponse.json({ studios });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/studios]", err);
    return NextResponse.json({ error: "Failed to load studios." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const parsed = studioSchema.safeParse(body ?? {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." },
        { status: 400 }
      );
    }
    const input = parsed.data;
    const slug = slugify(
      typeof input.slug === "string" && input.slug.trim() ? input.slug : input.name
    );
    const clash = await prisma.studio.findUnique({ where: { slug }, select: { id: true } });
    if (clash) {
      return NextResponse.json({ error: "A studio with this slug already exists." }, { status: 409 });
    }
    const studio = await prisma.studio.create({ data: { ...studioData(input), slug } });
    invalidateCacheTags(["studio", "anime", "stats"]);
    return NextResponse.json({ studio }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/studios]", err);
    return NextResponse.json({ error: "Failed to create studio." }, { status: 500 });
  }
}

export const runtime = "nodejs";

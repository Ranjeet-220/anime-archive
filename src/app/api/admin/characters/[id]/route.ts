import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { characterSchema, characterData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const existing = await prisma.character.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Character not found." }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = characterSchema.safeParse(body ?? {});
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return NextResponse.json(
        { error: first ? `${first.path.join(".")}: ${first.message}` : "Invalid input." },
        { status: 400 }
      );
    }
    const input = parsed.data;

    let nextSlug = existing.slug;
    const rawSlug = typeof input.slug === "string" ? input.slug.trim() : "";
    if (rawSlug && rawSlug !== existing.slug) {
      const candidate = slugify(rawSlug);
      const clash = await prisma.character.findFirst({
        where: { slug: candidate, id: { not: existing.id } },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json({ error: "A character with this slug already exists." }, { status: 409 });
      }
      nextSlug = candidate;
    }

    const character = await prisma.character.update({
      where: { id },
      data: { ...characterData(input), slug: nextSlug },
    });
    invalidateCacheTags(["character", "anime"]);
    return NextResponse.json({ character });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/characters/[id]]", err);
    return NextResponse.json({ error: "Failed to update character." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const deleted = await prisma.character.deleteMany({ where: { id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Character not found." }, { status: 404 });
    }
    invalidateCacheTags(["character", "anime"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/characters/[id]]", err);
    return NextResponse.json({ error: "Failed to delete character." }, { status: 500 });
  }
}

export const runtime = "nodejs";

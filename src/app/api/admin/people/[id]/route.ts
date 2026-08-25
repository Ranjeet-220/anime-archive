import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { personSchema, personData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const existing = await prisma.person.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Person not found." }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = personSchema.safeParse(body ?? {});
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
      const clash = await prisma.person.findFirst({
        where: { slug: candidate, id: { not: existing.id } },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json({ error: "A person with this slug already exists." }, { status: 409 });
      }
      nextSlug = candidate;
    }

    const person = await prisma.person.update({
      where: { id },
      data: { ...personData(input), slug: nextSlug },
    });
    invalidateCacheTags(["person", "anime"]);
    return NextResponse.json({ person });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/people/[id]]", err);
    return NextResponse.json({ error: "Failed to update person." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const person = await prisma.person.findUnique({ where: { id }, select: { id: true } });
    if (!person) {
      return NextResponse.json({ error: "Person not found." }, { status: 404 });
    }
    const [directed, created, credits, studioLinks] = await prisma.$transaction([
      prisma.anime.count({ where: { directorId: person.id } }),
      prisma.anime.count({ where: { creatorId: person.id } }),
      prisma.personCredit.count({ where: { personId: person.id } }),
      prisma.studioPerson.count({ where: { personId: person.id } }),
    ]);
    if (directed + created + credits + studioLinks > 0) {
      return NextResponse.json(
        { error: "Person is linked to anime or studios; unlink those first." },
        { status: 409 }
      );
    }
    await prisma.person.deleteMany({ where: { id } });
    invalidateCacheTags(["person", "anime"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/people/[id]]", err);
    return NextResponse.json({ error: "Failed to delete person." }, { status: 500 });
  }
}

export const runtime = "nodejs";

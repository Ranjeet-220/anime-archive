import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { studioSchema } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const existing = await prisma.studio.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Studio not found." }, { status: 404 });
    }

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

    let nextSlug = existing.slug;
    const rawSlug = typeof input.slug === "string" ? input.slug.trim() : "";
    if (rawSlug && rawSlug !== existing.slug) {
      const candidate = slugify(rawSlug);
      const clash = await prisma.studio.findFirst({
        where: { slug: candidate, id: { not: existing.id } },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json({ error: "A studio with this slug already exists." }, { status: 409 });
      }
      nextSlug = candidate;
    }

    const studio = await prisma.studio.update({
      where: { id },
      data: {
        name: input.name,
        japaneseName: input.japaneseName ?? null,
        foundedYear: input.foundedYear ?? null,
        headquarters: input.headquarters ?? null,
        founders: input.founders ?? null,
        history: input.history ?? null,
        techniques: input.techniques ?? null,
        significance: input.significance ?? null,
        status: input.status ?? null,
        website: input.website ?? null,
        slug: nextSlug,
      },
    });
    invalidateCacheTags(["studio", "anime"]);
    return NextResponse.json({ studio });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/studios/[id]]", err);
    return NextResponse.json({ error: "Failed to update studio." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const studio = await prisma.studio.findUnique({ where: { id }, select: { id: true } });
    if (!studio) {
      return NextResponse.json({ error: "Studio not found." }, { status: 404 });
    }
    const [anime, people, events] = await prisma.$transaction([
      prisma.anime.count({ where: { studioId: studio.id } }),
      prisma.studioPerson.count({ where: { studioId: studio.id } }),
      prisma.historicalEvent.count({ where: { studioId: studio.id } }),
    ]);
    if (anime + people + events > 0) {
      return NextResponse.json(
        { error: "Studio is linked to anime, people, or events; unlink those first." },
        { status: 409 }
      );
    }
    await prisma.studio.deleteMany({ where: { id } });
    invalidateCacheTags(["studio", "anime", "stats"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/studios/[id]]", err);
    return NextResponse.json({ error: "Failed to delete studio." }, { status: 500 });
  }
}

export const runtime = "nodejs";

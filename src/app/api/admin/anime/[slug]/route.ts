import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { animeSchema } from "@/lib/validation";
import { animeData } from "@/lib/admin-data";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { slug } = await params;
    const existing = await prisma.anime.findUnique({ where: { slug } });
    if (!existing) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }

    const body = await req.json().catch(() => null);
    const parsed = animeSchema.safeParse(body ?? {});
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
      const clash = await prisma.anime.findFirst({
        where: { slug: candidate, id: { not: existing.id } },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json({ error: "An anime with this slug already exists." }, { status: 409 });
      }
      nextSlug = candidate;
    }

    const anime = await prisma.anime.update({
      where: { id: existing.id },
      data: {
        ...animeData(input),
        slug: nextSlug,
        ...(input.genreIds !== undefined
          ? { genres: { set: input.genreIds?.length ? input.genreIds.map((id) => ({ id })) : [] } }
          : {}),
      },
    });
    invalidateCacheTags(["anime", "home"]);
    return NextResponse.json({ anime });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/anime/[slug]]", err);
    return NextResponse.json({ error: "Failed to update anime." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { slug } = await params;
    const deleted = await prisma.anime.deleteMany({ where: { slug } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }
    invalidateCacheTags(["anime", "stats", "home"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/anime/[slug]]", err);
    return NextResponse.json({ error: "Failed to delete anime." }, { status: 500 });
  }
}

export const runtime = "nodejs";

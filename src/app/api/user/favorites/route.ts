import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await requireUser();
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      include: {
        anime: {
          select: {
            id: true,
            slug: true,
            title: true,
            japaneseTitle: true,
            year: true,
            coverUrl: true,
            format: true,
            averageRating: true,
            studio: { select: { slug: true, name: true } },
          },
        },
      },
    });
    return NextResponse.json({ favorites });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/favorites]", err);
    return NextResponse.json({ error: "Failed to load favorites." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : "";

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
    if (!anime) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }

    await prisma.favorite.upsert({
      where: { userId_animeId: { userId: user.id, animeId } },
      update: {},
      create: { userId: user.id, animeId },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/favorites]", err);
    return NextResponse.json({ error: "Failed to update favorites." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const slug = typeof body?.slug === "string" ? body.slug : "";

    if (!slug) {
      return NextResponse.json({ error: "slug is required." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { slug }, select: { id: true } });
    if (!anime) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }
    const existing = await prisma.favorite.findUnique({
      where: { userId_animeId: { userId: user.id, animeId: anime.id } },
      select: { id: true },
    });
    if (existing) {
      await prisma.favorite.delete({ where: { id: existing.id } });
      return NextResponse.json({ ok: true, favorited: false });
    }
    await prisma.favorite.create({ data: { userId: user.id, animeId: anime.id } });
    return NextResponse.json({ ok: true, favorited: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/favorites]", err);
    return NextResponse.json({ error: "Failed to update favorites." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const animeId = req.nextUrl.searchParams.get("animeId") ?? "";

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    await prisma.favorite.deleteMany({
      where: { userId: user.id, animeId },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/favorites]", err);
    return NextResponse.json({ error: "Failed to update favorites." }, { status: 500 });
  }
}

export const runtime = "nodejs";

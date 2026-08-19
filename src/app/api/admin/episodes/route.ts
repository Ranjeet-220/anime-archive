import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : null;
    const number = typeof body?.number === "number" ? body.number : null;
    if (!animeId || number === null || number < 1) {
      return NextResponse.json({ error: "animeId and a positive episode number are required." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
    if (!anime) return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    const clash = await prisma.episode.findUnique({
      where: { animeId_number: { animeId, number } },
      select: { id: true },
    });
    if (clash) {
      return NextResponse.json({ error: `Episode ${number} already exists for this anime.` }, { status: 409 });
    }
    const episode = await prisma.episode.create({
      data: {
        animeId,
        number,
        title: typeof body?.title === "string" ? body.title : null,
        airDate: typeof body?.airDate === "string" && body.airDate ? new Date(body.airDate) : null,
        synopsis: typeof body?.synopsis === "string" ? body.synopsis : null,
      },
    });
    invalidateCacheTags(["anime"]);
    return NextResponse.json({ episode }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/episodes]", err);
    return NextResponse.json({ error: "Failed to create episode." }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const episodeId = typeof body?.episodeId === "string" ? body.episodeId : null;
    if (!episodeId) return NextResponse.json({ error: "episodeId is required." }, { status: 400 });
    const number = typeof body?.number === "number" ? body.number : undefined;
    const data: Record<string, unknown> = {};
    if (number !== undefined && number >= 1) data.number = number;
    if (typeof body?.title === "string") data.title = body.title;
    if (typeof body?.synopsis === "string") data.synopsis = body.synopsis;
    if (typeof body?.airDate === "string") {
      data.airDate = body.airDate ? new Date(body.airDate) : null;
    }
    if (Object.keys(data).length === 0) {
      return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
    }
    const episode = await prisma.episode.update({ where: { id: episodeId }, data });
    invalidateCacheTags(["anime"]);
    return NextResponse.json({ episode });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/episodes]", err);
    return NextResponse.json({ error: "Failed to update episode." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const episodeId = typeof body?.episodeId === "string" ? body.episodeId : null;
    if (!episodeId) return NextResponse.json({ error: "episodeId is required." }, { status: 400 });
    await prisma.episode.delete({ where: { id: episodeId } });
    invalidateCacheTags(["anime"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/episodes]", err);
    return NextResponse.json({ error: "Failed to delete episode." }, { status: 500 });
  }
}

export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const user = await requireUser();
    const animeId = req.nextUrl.searchParams.get("animeId") ?? "";
    const notes = animeId
      ? await prisma.note.findMany({
          where: { userId: user.id, animeId },
          orderBy: { updatedAt: "desc" },
          include: { anime: { select: { id: true, slug: true, title: true } } },
        })
      : await prisma.note.findMany({
          where: { userId: user.id },
          orderBy: { updatedAt: "desc" },
          take: 100,
          include: { anime: { select: { id: true, slug: true, title: true } } },
        });
    return NextResponse.json({ notes });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/notes]", err);
    return NextResponse.json({ error: "Failed to load notes." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();
    const body = await req.json().catch(() => null);
    const animeId = typeof body?.animeId === "string" ? body.animeId : "";
    const content = typeof body?.content === "string" ? body.content.trim() : "";

    if (!animeId) {
      return NextResponse.json({ error: "animeId is required." }, { status: 400 });
    }
    if (!content || content.length > 5000) {
      return NextResponse.json({ error: "Note content is required (max 5000 characters)." }, { status: 400 });
    }
    const anime = await prisma.anime.findUnique({ where: { id: animeId }, select: { id: true } });
    if (!anime) {
      return NextResponse.json({ error: "Anime not found." }, { status: 404 });
    }

    const note = await prisma.note.create({
      data: { userId: user.id, animeId, content },
      include: { anime: { select: { id: true, slug: true, title: true } } },
    });
    return NextResponse.json({ note }, { status: 201 });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/notes]", err);
    return NextResponse.json({ error: "Failed to save note." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireUser();
    const id = req.nextUrl.searchParams.get("id") ?? "";
    if (!id) {
      return NextResponse.json({ error: "id is required." }, { status: 400 });
    }
    const deleted = await prisma.note.deleteMany({ where: { id, userId: user.id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Note not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[user/notes]", err);
    return NextResponse.json({ error: "Failed to delete note." }, { status: 500 });
  }
}

export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";
import type { EventKind } from "@/generated/prisma/client";

const KINDS: EventKind[] = ["PREMIERE", "RELEASE", "FOUNDING", "MILESTONE", "INDUSTRY", "BIRTH", "DEATH", "AWARD"];

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const body = await req.json().catch(() => null);
    const b = (body ?? {}) as Record<string, unknown>;

    const existing = await prisma.historicalEvent.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    const data: {
      slug?: string;
      title?: string;
      date?: Date | null;
      year?: number | null;
      month?: number | null;
      day?: number | null;
      description?: string | null;
      kind?: EventKind;
      eraId?: string | null;
      animeId?: string | null;
      studioId?: string | null;
      personId?: string | null;
    } = {};

    if (typeof b.title === "string") {
      const title = b.title.trim();
      if (!title || title.length > 200) {
        return NextResponse.json({ error: "Title is required (max 200 characters)." }, { status: 400 });
      }
      data.title = title;
    }
    if (typeof b.slug === "string" && b.slug.trim()) {
      data.slug = slugify(b.slug);
      const clash = await prisma.historicalEvent.findFirst({
        where: { slug: data.slug, id: { not: id } },
        select: { id: true },
      });
      if (clash) {
        return NextResponse.json({ error: "An event with this slug already exists." }, { status: 409 });
      }
    }
    if ("year" in b) {
      data.year = typeof b.year === "number" && Number.isInteger(b.year) && b.year >= 1800 && b.year <= 2200 ? b.year : null;
    }
    if ("month" in b) {
      data.month = typeof b.month === "number" && Number.isInteger(b.month) && b.month >= 1 && b.month <= 12 ? b.month : null;
    }
    if ("day" in b) {
      data.day = typeof b.day === "number" && Number.isInteger(b.day) && b.day >= 1 && b.day <= 31 ? b.day : null;
    }
    const nextYear = data.year ?? existing.year;
    const nextMonth = data.month ?? existing.month;
    const nextDay = data.day ?? existing.day;
    data.date = nextYear ? new Date(Date.UTC(nextYear, (nextMonth ?? 1) - 1, nextDay ?? 1)) : null;

    if (typeof b.description === "string") {
      data.description = b.description.trim().slice(0, 5000) || null;
    }
    if (typeof b.kind === "string") {
      if (!KINDS.includes(b.kind as EventKind)) {
        return NextResponse.json({ error: "Invalid event kind." }, { status: 400 });
      }
      data.kind = b.kind as EventKind;
    }
    const pickId = (v: unknown): string | null => (typeof v === "string" && v ? v : null);
    if ("eraId" in b) data.eraId = pickId(b.eraId);
    if ("animeId" in b) data.animeId = pickId(b.animeId);
    if ("studioId" in b) data.studioId = pickId(b.studioId);
    if ("personId" in b) data.personId = pickId(b.personId);

    const event = await prisma.historicalEvent.update({ where: { id }, data });
    invalidateCacheTags(["event", "home", "stats"]);
    return NextResponse.json({ event });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/events/[id]]", err);
    return NextResponse.json({ error: "Failed to update event." }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const { id } = await params;
    const deleted = await prisma.historicalEvent.deleteMany({ where: { id } });
    if (deleted.count === 0) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }
    invalidateCacheTags(["event", "home", "stats"]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/events/[id]]", err);
    return NextResponse.json({ error: "Failed to delete event." }, { status: 500 });
  }
}

export const runtime = "nodejs";

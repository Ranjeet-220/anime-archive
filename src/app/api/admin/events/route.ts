import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { invalidateCacheTags } from "@/lib/cache";
import { slugify } from "@/lib/utils";
import type { EventKind } from "@/generated/prisma/client";

const KINDS: EventKind[] = ["PREMIERE", "RELEASE", "FOUNDING", "MILESTONE", "INDUSTRY", "BIRTH", "DEATH", "AWARD"];

interface EventInput {
  slug: string;
  title: string;
  year: number | null;
  month: number | null;
  day: number | null;
  description: string | null;
  kind: EventKind;
  eraId: string | null;
  animeId: string | null;
  studioId: string | null;
  personId: string | null;
}

function parseEventInput(body: unknown): { data: EventInput; error?: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title.trim() : "";
  if (!title || title.length > 200) {
    return { data: {} as EventInput, error: "Title is required (max 200 characters)." };
  }
  const year =
    typeof b.year === "number" && Number.isInteger(b.year) && b.year >= 1800 && b.year <= 2200 ? b.year : null;
  const month = typeof b.month === "number" && Number.isInteger(b.month) && b.month >= 1 && b.month <= 12 ? b.month : null;
  const day = typeof b.day === "number" && Number.isInteger(b.day) && b.day >= 1 && b.day <= 31 ? b.day : null;
  const kind = (typeof b.kind === "string" && KINDS.includes(b.kind as EventKind) ? b.kind : "MILESTONE") as EventKind;
  const pickId = (v: unknown) => (typeof v === "string" && v ? v : null);

  return {
    data: {
      slug: slugify(typeof b.slug === "string" && b.slug.trim() ? b.slug : title),
      title,
      year,
      month,
      day,
      description: typeof b.description === "string" ? b.description.trim().slice(0, 5000) : null,
      kind,
      eraId: pickId(b.eraId),
      animeId: pickId(b.animeId),
      studioId: pickId(b.studioId),
      personId: pickId(b.personId),
    },
  };
}

export async function GET() {
  try {
    await requireRole("ADMIN", "EDITOR");
    const events = await prisma.historicalEvent.findMany({
      orderBy: [{ year: "desc" }, { month: "desc" }, { day: "desc" }],
      take: 500,
    });
    return NextResponse.json({ events });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/events]", err);
    return NextResponse.json({ error: "Failed to load events." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireRole("ADMIN", "EDITOR");
    const body = await req.json().catch(() => null);
    const { data, error } = parseEventInput(body);
    if (error) return NextResponse.json({ error }, { status: 400 });

    const existing = await prisma.historicalEvent.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json({ error: "An event with this slug already exists." }, { status: 409 });
    }

    const event = await prisma.historicalEvent.create({
      data: {
        slug: data.slug,
        title: data.title,
        date: data.year ? new Date(Date.UTC(data.year, (data.month ?? 1) - 1, data.day ?? 1)) : null,
        year: data.year,
        month: data.month,
        day: data.day,
        description: data.description,
        kind: data.kind,
        eraId: data.eraId,
        animeId: data.animeId,
        studioId: data.studioId,
        personId: data.personId,
      },
    });
    invalidateCacheTags(["event", "home", "stats"]);
    return NextResponse.json({ event }, { status: 201 });
  } catch (err) {
    const message = (err as Error).message;
    if (message === "UNAUTHORIZED") return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    if (message === "FORBIDDEN") return NextResponse.json({ error: "You don't have access." }, { status: 403 });
    console.error("[admin/events]", err);
    return NextResponse.json({ error: "Failed to create event." }, { status: 500 });
  }
}

export const runtime = "nodejs";

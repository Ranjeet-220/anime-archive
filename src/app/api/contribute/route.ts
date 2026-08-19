import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { checkRateLimit, clientIp, RATE } from "@/lib/rate-limit";
import type { ContributionType } from "@/generated/prisma/client";

const TYPES: ContributionType[] = [
  "NEW_ANIME",
  "NEW_CREATOR",
  "NEW_STUDIO",
  "NEW_SOURCE",
  "CORRECTION",
  "REPORT",
  "OTHER",
];

export async function GET() {
  try {
    const user = await requireUser();
    const contributions = await prisma.contribution.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ contributions });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[contribute]", err);
    return NextResponse.json({ error: "Failed to load contributions." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await requireUser();

    const limit = checkRateLimit(`contribute:${clientIp(req)}`, RATE.CONTRIBUTE.max, RATE.CONTRIBUTE.windowMs);
    if (limit.limited) {
      return NextResponse.json(
        { error: "You've reached the contribution limit for this hour. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);

    const type = (typeof body?.type === "string" ? body.type : "") as ContributionType;
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const description = typeof body?.description === "string" ? body.description.trim().slice(0, 5000) : null;
    const payload = body?.payload;

    if (!TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid contribution type." }, { status: 400 });
    }
    if (!title || title.length > 200) {
      return NextResponse.json({ error: "A title is required (max 200 characters)." }, { status: 400 });
    }
    let payloadJson: unknown = null;
    if (payload !== undefined && payload !== null && payload !== "") {
      if (typeof payload === "string") {
        try {
          payloadJson = JSON.parse(payload);
        } catch {
          return NextResponse.json({ error: "Payload must be valid JSON." }, { status: 400 });
        }
      } else {
        payloadJson = payload;
      }
    }

    const contribution = await prisma.contribution.create({
      data: {
        type,
        title,
        description: description || null,
        payload: payloadJson as object | undefined,
        status: "SUBMITTED",
        userId: user.id,
      },
    });
    return NextResponse.json({ contribution }, { status: 201 });
  } catch (err) {
    if ((err as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    console.error("[contribute]", err);
    return NextResponse.json({ error: "Failed to submit contribution." }, { status: 500 });
  }
}

export const runtime = "nodejs";

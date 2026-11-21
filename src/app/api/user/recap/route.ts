import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getWatchlistRecap } from "@/lib/data";

export async function GET() {
  const headers = { "Cache-Control": "private, no-store" };
  try {
    const user = await requireUser();
    return NextResponse.json(await getWatchlistRecap(user.id), { headers });
  } catch (error) {
    if ((error as Error).message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Sign in to see your recap." }, { status: 401, headers });
    }
    console.error("[user/recap]", error);
    return NextResponse.json({ error: "Your recap is temporarily unavailable." }, { status: 503, headers });
  }
}

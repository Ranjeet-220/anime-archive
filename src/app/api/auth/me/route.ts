import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";

export async function GET() {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (err) {
    console.error("[auth/me]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

export const runtime = "nodejs";

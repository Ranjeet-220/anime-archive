import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, setSessionCookie } from "@/lib/auth";
import { checkRateLimit, clientIp, RATE } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const limit = checkRateLimit(`login:${clientIp(req)}:${email}`, RATE.LOGIN.max, RATE.LOGIN.windowMs);
    if (limit.limited) {
      return NextResponse.json(
        {
          error: `Too many sign-in attempts. Please wait ${Math.ceil(limit.retryAfterSeconds / 60)} minutes and try again.`,
        },
        { status: 429 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, username: true, role: true, name: true, passwordHash: true },
    });
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const sessionUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      name: user.name,
    };
    await setSessionCookie(sessionUser);
    return NextResponse.json({ user: sessionUser });
  } catch (err) {
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Sign in failed. Please try again." }, { status: 500 });
  }
}

export const runtime = "nodejs";

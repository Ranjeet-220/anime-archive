import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, setSessionCookie } from "@/lib/auth";
import { checkRateLimit, clientIp, RATE } from "@/lib/rate-limit";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_RE = /^[a-zA-Z0-9_-]{3,20}$/;

export async function POST(req: NextRequest) {
  try {
    const limit = checkRateLimit(`register:${clientIp(req)}`, RATE.REGISTER.max, RATE.REGISTER.windowMs);
    if (limit.limited) {
      return NextResponse.json(
        { error: "Too many registration attempts from this address. Please try again later." },
        { status: 429 }
      );
    }

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const username = typeof body?.username === "string" ? body.username.trim() : "";
    const password = typeof body?.password === "string" ? body.password : "";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        {
          error: "Username must be 3–20 characters and may only contain letters, numbers, underscores and hyphens.",
        },
        { status: 400 }
      );
    }
    if (password.length < 8 || !/[a-zA-Z]/.test(password) || !/\d/.test(password)) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters and contain at least one letter and one number." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] },
      select: { email: true, username: true },
    });
    if (existing) {
      const field = existing.email === email ? "email" : "username";
      return NextResponse.json(
        { error: `That ${field} is already registered.` },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email, username, passwordHash, role: "USER", emailVerified: true },
      select: { id: true, email: true, username: true, role: true, name: true },
    });

    await setSessionCookie(user);
    return NextResponse.json({ user }, { status: 201 });
  } catch (err) {
    console.error("[auth/register]", err);
    return NextResponse.json({ error: "Registration failed. Please try again." }, { status: 500 });
  }
}

export const runtime = "nodejs";

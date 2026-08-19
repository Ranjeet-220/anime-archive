import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Role } from "@/generated/prisma/client";

const SESSION_COOKIE = "aa_session";
const SESSION_DAYS = 30;

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "dev-secret-change-me-in-production"
);

export interface SessionUser {
  id: string;
  email: string;
  username: string;
  role: Role;
  name?: string | null;
}

// ---------------------------------------------------------------------------
// Passwords
// ---------------------------------------------------------------------------

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ---------------------------------------------------------------------------
// JWT session
// ---------------------------------------------------------------------------

export async function createSessionToken(user: SessionUser): Promise<string> {
  return new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .setIssuer("anime-archive")
    .sign(secret);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, secret, { issuer: "anime-archive" });
    if (!payload.id || !payload.email || !payload.username || !payload.role) return null;
    return {
      id: String(payload.id),
      email: String(payload.email),
      username: String(payload.username),
      role: payload.role as Role,
      name: payload.name ? String(payload.name) : null,
    };
  } catch {
    return null;
  }
}

export async function setSessionCookie(user: SessionUser): Promise<void> {
  const token = await createSessionToken(user);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

// ---------------------------------------------------------------------------
// Server helpers
// ---------------------------------------------------------------------------

export const getSessionUser = cache(async (): Promise<SessionUser | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const user = await verifySessionToken(token);
  if (!user) return null;
  const dbUser = await prisma.user.findUnique({
    where: { id: user.id },
    select: { id: true, email: true, username: true, role: true, name: true },
  });
  return dbUser;
});

export async function requireUser(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) throw new Error("UNAUTHORIZED");
  return user;
}

export async function requireRole(...roles: Role[]): Promise<SessionUser> {
  const user = await requireUser();
  if (!roles.includes(user.role)) throw new Error("FORBIDDEN");
  return user;
}

export function canReview(role: Role): boolean {
  return role === "ADMIN" || role === "EDITOR";
}

export function canManage(role: Role): boolean {
  return role === "ADMIN";
}

export const PUBLIC_USER_FIELDS = {
  id: true,
  email: true,
  username: true,
  role: true,
  name: true,
} as const;
import { NextRequest } from "next/server";
import { checkRateLimit, clientIp, RATE } from "@/lib/rate-limit";

const SUBJECTS = ["General", "Correction", "Press", "Partnership", "Other"] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function fieldError(name: string, message: string) {
  return Response.json({ ok: false, error: `${name}: ${message}` }, { status: 400 });
}

export async function POST(req: NextRequest) {
  const limit = checkRateLimit(`contact:${clientIp(req)}`, RATE.CONTACT.max, RATE.CONTACT.windowMs);
  if (limit.limited) {
    return Response.json(
      { ok: false, error: "Too many messages. Please wait an hour before trying again." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const { name, email, subject, message } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return fieldError("name", "Please provide a name of at least 2 characters.");
  }
  if (name.trim().length > 100) {
    return fieldError("name", "Name must be 100 characters or fewer.");
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    return fieldError("email", "Please provide a valid email address.");
  }
  if (email.trim().length > 200) {
    return fieldError("email", "Email must be 200 characters or fewer.");
  }
  if (typeof subject !== "string" || !SUBJECTS.includes(subject as (typeof SUBJECTS)[number])) {
    return fieldError(
      "subject",
      `Subject must be one of: ${SUBJECTS.join(", ")}.`
    );
  }
  if (typeof message !== "string" || message.trim().length < 10) {
    return fieldError("message", "Message must be at least 10 characters.");
  }
  if (message.trim().length > 5000) {
    return fieldError("message", "Message must be 5000 characters or fewer.");
  }

  const cleanEmail = email.trim();

  console.log(
    `[contact] New message from ${name.trim()} <${cleanEmail}> — subject: ${subject}\n` +
      `  ${message.trim().replace(/\n/g, "\n  ")}`
  );

  return Response.json(
    {
      ok: true,
      message: `Message received. We’ll respond to ${cleanEmail} as soon as possible.`,
    },
    { status: 200 }
  );
}

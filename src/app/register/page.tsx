import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import { RegisterForm } from "@/components/user/register-form";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Join Anime Archive and start building your watchlist, favorites and collections.",
};

export default async function RegisterPage() {
  const session = await getSessionUser();
  if (session) redirect("/profile");

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24">
      <p className="mb-2 font-display text-[11px] uppercase tracking-[0.3em] text-crimson-400">Anime Archive</p>
      <h1 className="font-display text-3xl text-paper">Create an account</h1>
      <p className="mt-2 text-sm text-muted">
        Already a member?{" "}
        <Link href="/login" className="text-holo-300 hover:text-holo-400 transition-colors">
          Sign in
        </Link>
        .
      </p>

      <div className="surface-panel mt-8 p-6">
        <RegisterForm />
      </div>

      <div className="mt-6 rounded-lg border border-line bg-charcoal/60 px-4 py-3 text-xs text-muted">
        <p className="font-display text-[11px] uppercase tracking-[0.2em] text-faint">
          Demo credentials (change in production)
        </p>
        <ul className="mt-2 space-y-1">
          <li>
            <span className="text-paper-2">admin@animearchive.local</span> / ChangeMe-Admin-2026!
          </li>
          <li>
            <span className="text-paper-2">demo@animearchive.local</span> / DemoUser-2026!
          </li>
        </ul>
      </div>
    </div>
  );
}
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, canReview } from "@/lib/auth";
import {
  LayoutDashboard,
  BookOpen,
  Landmark,
  Trophy,
  Users,
  CalendarDays,
  ShieldCheck,
  Inbox,
  UserCog,
  Database,
  Type,
} from "lucide-react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/anime", label: "Anime", icon: BookOpen },
  { href: "/admin/studios", label: "Studios", icon: Landmark },
  { href: "/admin/creators", label: "Creators", icon: Trophy },
  { href: "/admin/characters", label: "Characters", icon: Users },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/sources", label: "Sources", icon: ShieldCheck },
  { href: "/admin/contributions", label: "Contributions", icon: Inbox },
  { href: "/admin/users", label: "Users", icon: UserCog },
  { href: "/admin/genres", label: "Genres", icon: Type },
  { href: "/admin/reports", label: "Reports", icon: ShieldCheck },
  { href: "/admin/import", label: "Import", icon: Database },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionUser();
  if (!session) redirect("/login");
  if (!canReview(session.role)) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <p className="font-display text-6xl text-crimson-500">403</p>
          <h1 className="mt-4 font-display text-2xl text-paper">You don&apos;t have access</h1>
          <p className="mt-2 text-sm text-muted">
            The admin area is restricted to editors and administrators. If you believe this is an
            error, contact the archive team.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded border border-line-2 px-4 py-2 font-display text-xs tracking-wide text-paper transition-colors hover:border-crimson-500 hover:text-crimson-300"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6">
      <aside className="hidden w-52 shrink-0 lg:block">
        <p className="mb-3 font-display text-[11px] uppercase tracking-[0.3em] text-faint">Admin</p>
        <nav className="sticky top-24 space-y-0.5" aria-label="Admin">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded px-3 py-2 text-[13px] text-muted transition-colors hover:bg-charcoal hover:text-paper"
            >
              <item.icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1">
        <nav className="mb-6 flex flex-wrap gap-1 border-b border-line pb-3 lg:hidden" aria-label="Admin">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-charcoal hover:text-paper"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
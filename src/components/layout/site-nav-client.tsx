"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Clock,
  Compass,
  Home,
  Landmark,
  Library,
  Menu,
  Search,
  Trophy,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";
import { SoundToggle } from "@/components/layout/sound-toggle";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/museum", label: "Explore", icon: Compass },
  { href: "/anime", label: "Anime", icon: BookOpen },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/studios", label: "Studios", icon: Landmark },
  { href: "/creators", label: "Creators", icon: Trophy },
  { href: "/movies", label: "Movies", icon: Library },
  { href: "/genres", label: "Genres", icon: Compass },
  { href: "/collections", label: "Collections", icon: Library },
];

const MOBILE_TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/museum", label: "Explore", icon: Compass },
  { href: "/search", label: "Search", icon: Search },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavClient({ session }: { session: SessionUser | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5 shrink-0" aria-label="Anime Archive home">
            <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-crimson-500/50 bg-crimson-500/10 font-display text-sm font-bold text-crimson-300 transition-colors group-hover:bg-crimson-500/20">
              文
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-sm font-semibold tracking-[0.18em] text-paper">
                ANIME&nbsp;ARCHIVE
              </span>
              <span className="block text-[10px] tracking-[0.14em] text-faint">
                DIGITAL MUSEUM OF ANIME HISTORY
              </span>
            </span>
          </Link>

          <nav className="ml-2 hidden items-center gap-1 xl:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded px-3 py-1.5 text-[13px] transition-colors",
                  isActive(pathname, item.href)
                    ? "text-paper bg-charcoal-2"
                    : "text-muted hover:text-paper hover:bg-charcoal"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-2">
            <SoundToggle />
            <Link
              href="/search"
              aria-label="Search"
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted hover:border-line-2 hover:text-paper transition-colors"
            >
              <Search className="h-4 w-4" />
            </Link>
            <Link
              href="/museum"
              className="hidden sm:inline-flex h-9 items-center rounded border border-crimson-500/40 px-3.5 font-display text-xs tracking-[0.12em] text-crimson-300 transition-colors hover:bg-crimson-500/10"
            >
              ENTER 3D MUSEUM
            </Link>
            <Link
              href={session ? "/profile" : "/login"}
              aria-label={session ? "Your profile" : "Sign in"}
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted hover:border-line-2 hover:text-paper transition-colors"
            >
              <User className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted hover:text-paper xl:hidden"
            >
              {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <nav aria-label="Menu" className="border-t border-line bg-ink px-4 py-3 xl:hidden">
            <div className="grid grid-cols-2 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded px-3 py-2 text-sm",
                    isActive(pathname, item.href)
                      ? "bg-charcoal-2 text-paper"
                      : "text-muted hover:bg-charcoal hover:text-paper"
                  )}
                >
                  <item.icon className="h-4 w-4" aria-hidden />
                  {item.label}
                </Link>
              ))}
              <Link
                href="/museum"
                className="col-span-2 mt-1 flex items-center justify-center gap-2 rounded border border-crimson-500/40 px-3 py-2 text-sm text-crimson-300"
              >
                ENTER 3D MUSEUM
              </Link>
            </div>
          </nav>
        ) : null}
      </header>

      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-5">
          {MOBILE_TABS.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-0.5 py-2 text-[10px] transition-colors",
                isActive(pathname, tab.href) ? "text-crimson-300" : "text-faint hover:text-muted"
              )}
            >
              <tab.icon className="h-4.5 w-4.5" aria-hidden />
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
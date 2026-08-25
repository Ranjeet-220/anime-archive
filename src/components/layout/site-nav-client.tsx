"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bookmark,
  Clock,
  Compass,
  Film,
  Home,
  Landmark,
  Library,
  Menu,
  Search,
  Sparkles,
  Trophy,
  User,
  X,
  Tv,
  Crown,
  Box,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";

const CENTER_NAV = [
  { href: "/", label: "HOME" },
  { href: "/anime", label: "EXPLORE" },
  { href: "/timeline", label: "TIMELINE" },
  { href: "/studios", label: "STUDIOS" },
  { href: "/creators", label: "CREATORS" },
  { href: "/gallery/create", label: "3D GALLERY" },
  { href: "/membership", label: "VIP PASS" },
];

const DRAWER_NAV = [
  { href: "/", label: "Home", icon: Home },
  { href: "/anime", label: "Anime Catalog", icon: Tv },
  { href: "/gallery/create", label: "3D Gallery Builder", icon: Box },
  { href: "/membership", label: "VIP Patron Pass", icon: Crown },
  { href: "/museum", label: "3D Digital Museum", icon: Sparkles },
  { href: "/timeline", label: "Historical Timeline", icon: Clock },
  { href: "/studios", label: "Studios", icon: Landmark },
  { href: "/creators", label: "Creators & Legends", icon: Trophy },
  { href: "/movies", label: "Movies & Features", icon: Film },
  { href: "/genres", label: "Genres", icon: Compass },
  { href: "/collections", label: "Curated Collections", icon: Library },
  { href: "/favorites", label: "Saved & Bookmarks", icon: Bookmark },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavClient({ session }: { session: SessionUser | null }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setDrawerOpen(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-16 max-w-[1720px] w-full items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Left: Brand / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 shrink-0"
            aria-label="Anime Archive - Walk Through The History Of Anime"
          >
            {/* Circular Red Archive Torii HD Logo */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden shadow-[0_0_16px_rgba(227,38,46,0.55)] transition-transform duration-300 group-hover:scale-105">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo-hd.png"
                alt="Anime Archive Torii Emblem"
                className="h-full w-full object-cover"
                width={32}
                height={32}
              />
            </div>

            <div className="flex flex-col">
              <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-paper transition-colors group-hover:text-crimson-400">
                ANIME ARCHIVE
              </span>
              <span className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-muted">
                WALK THROUGH THE HISTORY OF ANIME
              </span>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary Navigation">
            {CENTER_NAV.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative py-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-all duration-200",
                    active
                      ? "text-paper"
                      : "text-muted hover:text-paper"
                  )}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-crimson-500 shadow-[0_0_8px_rgba(227,38,46,0.8)]" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Search */}
            <Link
              href="/search"
              aria-label="Search the archive"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-charcoal/50 text-muted transition-colors hover:border-line-2 hover:bg-charcoal hover:text-paper"
            >
              <Search className="h-4 w-4" />
            </Link>

            {/* Bookmarks / Saved */}
            <Link
              href="/favorites"
              aria-label="Saved Bookmarks & Watchlist"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-charcoal/50 text-muted transition-colors hover:border-line-2 hover:bg-charcoal hover:text-paper"
            >
              <Bookmark className="h-4 w-4" />
            </Link>

            {/* Profile Avatar */}
            <Link
              href={session ? "/profile" : "/login"}
              aria-label={session ? "Your profile" : "Sign in"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-charcoal/70 text-muted transition-all hover:border-crimson-500 hover:text-paper"
            >
              {session ? (
                <span className="text-xs font-bold text-paper">
                  {(session.name || session.username || "U").slice(0, 1).toUpperCase()}
                </span>
              ) : (
                <User className="h-4 w-4" />
              )}
            </Link>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setDrawerOpen((v) => !v)}
              aria-expanded={drawerOpen}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-line bg-charcoal/50 text-muted transition-colors hover:text-paper lg:hidden"
            >
              {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {drawerOpen ? (
          <div className="border-t border-line bg-ink-2/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="grid grid-cols-2 gap-2">
              {DRAWER_NAV.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg border px-3 py-2.5 text-xs font-medium transition-all",
                      active
                        ? "border-crimson-500/50 bg-crimson-500/10 text-crimson-300 font-semibold"
                        : "border-line/60 bg-charcoal/40 text-muted hover:border-line hover:text-paper"
                    )}
                  >
                    <item.icon className="h-4 w-4 text-crimson-400" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-muted">
              <Link href="/museum" className="text-crimson-400 hover:underline">
                Enter 3D Digital Museum →
              </Link>
              <Link href="/rankings" className="hover:text-paper">
                Top 60 Rankings
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        aria-label="Mobile navigation"
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 backdrop-blur-md md:hidden"
      >
        <div className="grid grid-cols-5">
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/anime", label: "Catalog", icon: Tv },
            { href: "/timeline", label: "Timeline", icon: Clock },
            { href: "/favorites", label: "Saved", icon: Bookmark },
            { href: session ? "/profile" : "/login", label: "Profile", icon: User },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex flex-col items-center gap-1 py-2 text-[10px] font-medium transition-colors",
                isActive(pathname, tab.href)
                  ? "text-crimson-400 font-semibold"
                  : "text-muted hover:text-paper"
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
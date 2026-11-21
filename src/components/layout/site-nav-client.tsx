"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bookmark, Clock, Home, Menu, Search, Tv, User, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SessionUser } from "@/lib/auth";
import { CommandPalette } from "@/components/layout/command-palette";

const PRIMARY_LINKS = [
  { href: "/anime", label: "Anime" },
  { href: "/museum", label: "Museum" },
  { href: "/timeline", label: "Timeline" },
  { href: "/membership", label: "VIP Pass" },
];

const MENU_GROUPS = [
  { label: "Explore", links: [
    ...PRIMARY_LINKS,
    { href: "/movies", label: "Movies" },
    { href: "/genres", label: "Genres" },
    { href: "/rankings", label: "Rankings" },
    { href: "/collections", label: "Collections" },
  ] },
  { label: "Discover", links: [
    { href: "/studios", label: "Studios" },
    { href: "/creators", label: "Creators" },
    { href: "/characters", label: "Characters" },
    { href: "/gallery/create", label: "Gallery builder" },
    { href: "/tours", label: "Guided tours" },
    { href: "/quizzes", label: "Quizzes" },
  ] },
  { label: "Your library", links: [
    { href: "/watchlist", label: "Watchlist" },
    { href: "/favorites", label: "Saved anime" },
    { href: "/profile", label: "Profile" },
  ] },
];

function isActive(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function SiteNavClient({ session }: { session: SessionUser | null }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    function closeOutside(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menuOpen]);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-ink/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1720px] items-center gap-4 px-4 sm:px-8 lg:px-12">
          <Link href="/" onClick={() => setMenuOpen(false)} className="mr-auto flex min-h-11 shrink-0 items-center gap-2.5" aria-label="Anime Archive home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo-hd.png" alt="" width={32} height={32} className="rounded-full" />
            <span className="font-display text-sm font-bold tracking-wide sm:text-base">Anime Archive</span>
          </Link>
          <nav aria-label="Primary navigation" className="mr-6 hidden items-center gap-6 lg:flex">
            {PRIMARY_LINKS.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={cn("flex min-h-11 items-center border-b-2 text-sm transition-colors", isActive(pathname, item.href) ? "border-crimson-500 text-paper" : "border-transparent text-muted hover:text-paper")}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button type="button" onClick={() => { setMenuOpen(false); setCommandPaletteOpen(true); }} aria-label="Search the archive" aria-keyshortcuts="Control+K Meta+K" className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded text-muted hover:bg-charcoal hover:text-paper">
            <Search className="h-5 w-5" aria-hidden />
            <span className="hidden text-sm xl:inline">Search</span>
          </button>
          <Link href={session ? "/profile" : "/login"} onClick={() => setMenuOpen(false)} aria-label={session ? "Your profile" : "Sign in"} className="hidden h-11 min-w-11 items-center justify-center rounded text-sm text-muted hover:bg-charcoal hover:text-paper sm:inline-flex">
            {session ? <span className="font-bold">{(session.name || session.username).slice(0, 1).toUpperCase()}</span> : <User className="h-5 w-5" aria-hidden />}
          </Link>
          <button ref={menuButtonRef} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="site-menu" aria-label={menuOpen ? "Close menu" : "Open menu"} className="inline-flex h-11 min-w-11 items-center justify-center gap-2 rounded border border-line px-3 text-sm text-paper hover:bg-charcoal">
            {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            <span className="hidden lg:inline">More</span>
          </button>
        </div>
        {menuOpen && (
          <nav id="site-menu" aria-label="All pages" className="absolute inset-x-0 top-full max-h-[70dvh] overflow-y-auto border-b border-line bg-ink shadow-xl">
            <div className="mx-auto grid max-w-[1720px] gap-6 px-4 py-6 sm:grid-cols-3 sm:px-8 lg:px-12">
              {MENU_GROUPS.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-sm font-semibold text-muted">{group.label}</p>
                  <ul className="grid grid-cols-2 gap-x-3 sm:grid-cols-1">
                    {group.links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} onClick={() => setMenuOpen(false)} aria-current={isActive(pathname, item.href) ? "page" : undefined} className={cn("flex min-h-11 items-center rounded px-3 text-sm hover:bg-charcoal", isActive(pathname, item.href) ? "bg-charcoal text-crimson-300" : "text-paper-2")}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        )}
      </header>
      <CommandPalette open={commandPaletteOpen} onOpenChange={setCommandPaletteOpen} />
      <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-ink/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-5">
          {[
            { href: "/", label: "Home", icon: Home },
            { href: "/anime", label: "Anime", icon: Tv },
            { href: "/timeline", label: "Timeline", icon: Clock },
            { href: "/favorites", label: "Saved", icon: Bookmark },
            { href: session ? "/profile" : "/login", label: session ? "Profile" : "Sign in", icon: User },
          ].map((tab) => (
            <Link key={tab.href} href={tab.href} onClick={() => setMenuOpen(false)} aria-current={isActive(pathname, tab.href) ? "page" : undefined} className={cn("flex min-h-16 flex-col items-center justify-center gap-1 text-xs", isActive(pathname, tab.href) ? "text-crimson-300" : "text-muted hover:text-paper")}>
              <tab.icon className="h-5 w-5" aria-hidden />
              {tab.label}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

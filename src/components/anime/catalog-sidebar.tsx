"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Compass,
  Tv,
  Clock,
  Landmark,
  Building2,
  Trophy,
  Film,
  Tags,
  Library,
  Bookmark,
  Heart,
  History,
  PlusCircle,
  MessageSquare,
  Newspaper,
  Box,
  Crown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const EXPLORE_LINKS = [
  { href: "/", label: "Overview", icon: Compass },
  { href: "/anime", label: "Anime", icon: Tv },
  { href: "/timeline", label: "Timeline", icon: Clock },
  { href: "/timeline", label: "Eras", icon: Landmark },
  { href: "/studios", label: "Studios", icon: Building2 },
  { href: "/creators", label: "Creators", icon: Trophy },
  { href: "/movies", label: "Movies", icon: Film },
  { href: "/genres", label: "Genres", icon: Tags },
  { href: "/collections", label: "Collections", icon: Library },
];

const YOUR_STUFF_LINKS = [
  { href: "/gallery/create", label: "3D Gallery Builder", icon: Box },
  { href: "/membership", label: "VIP Curator Pass", icon: Crown },
  { href: "/watchlist", label: "Watchlist", icon: Bookmark },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/collections", label: "Collections", icon: Library },
  { href: "/profile", label: "History", icon: History },
];

const COMMUNITY_LINKS = [
  { href: "/contribute", label: "Contribute", icon: PlusCircle },
  { href: "/quizzes", label: "Forums", icon: MessageSquare },
  { href: "/tours", label: "News", icon: Newspaper },
];

export function CatalogSidebar({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <aside className={cn("w-56 shrink-0 flex flex-col gap-6 text-xs", className)}>
      {/* Explore Section */}
      <div>
        <h3 className="px-3 mb-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[#666A70]">
          EXPLORE
        </h3>
        <nav className="flex flex-col gap-1">
          {EXPLORE_LINKS.map((item) => {
            const isActive = item.href === "/anime" ? pathname === "/anime" : pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                  isActive
                    ? "bg-crimson-500 text-white font-bold shadow-[0_0_12px_rgba(227,38,46,0.4)]"
                    : "text-[#9A9A9A] hover:bg-[#181B1F] hover:text-paper"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-[#666A70]")} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Your Stuff Section */}
      <div>
        <h3 className="px-3 mb-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[#666A70]">
          YOUR STUFF
        </h3>
        <nav className="flex flex-col gap-1">
          {YOUR_STUFF_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                  isActive
                    ? "bg-crimson-500 text-white font-bold"
                    : "text-[#9A9A9A] hover:bg-[#181B1F] hover:text-paper"
                )}
              >
                <Icon className="h-4 w-4 text-[#666A70]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Community Section */}
      <div>
        <h3 className="px-3 mb-2 font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[#666A70]">
          COMMUNITY
        </h3>
        <nav className="flex flex-col gap-1">
          {COMMUNITY_LINKS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-3 py-2 font-medium transition-all duration-200",
                  isActive
                    ? "bg-crimson-500 text-white font-bold"
                    : "text-[#9A9A9A] hover:bg-[#181B1F] hover:text-paper"
                )}
              >
                <Icon className="h-4 w-4 text-[#666A70]" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

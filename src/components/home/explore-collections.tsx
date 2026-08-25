import Link from "next/link";
import { Clock, Landmark, Users, Building2, Film, Compass } from "lucide-react";

interface CollectionItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const COLLECTIONS: CollectionItem[] = [
  {
    title: "TIMELINE",
    description: "Explore anime through time",
    href: "/timeline",
    icon: Clock,
  },
  {
    title: "ERAS",
    description: "Discover iconic anime eras",
    href: "/timeline",
    icon: Landmark,
  },
  {
    title: "CREATORS",
    description: "Meet the legends behind the art",
    href: "/creators",
    icon: Users,
  },
  {
    title: "STUDIOS",
    description: "The studios that built worlds",
    href: "/studios",
    icon: Building2,
  },
  {
    title: "MOVIES",
    description: "Cinematic anime masterpieces",
    href: "/movies",
    icon: Film,
  },
  {
    title: "GENRES",
    description: "Find anime by your favorite genre",
    href: "/genres",
    icon: Compass,
  },
];

export function ExploreCollections() {
  return (
    <section className="w-full" aria-labelledby="collections-heading">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2
            id="collections-heading"
            className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-paper"
          >
            EXPLORE THE COLLECTIONS
          </h2>
          <p className="mt-1 text-xs text-muted">
            Curated archives, historical divisions, and encyclopedic indices
          </p>
        </div>
        <Link
          href="/collections"
          className="text-xs font-semibold uppercase tracking-wider text-crimson-400 hover:text-crimson-300 transition-colors hidden sm:block"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
        {COLLECTIONS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.title}
              href={c.href}
              className="group relative flex flex-col justify-between rounded-xl border border-[#25282C] bg-[#111316] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-crimson-500/60 hover:bg-[#181B1F] hover:shadow-[0_0_20px_rgba(227,38,46,0.18)]"
            >
              {/* Icon Container */}
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-red-950/60 bg-[#171A1E] text-crimson-400 transition-all duration-300 group-hover:border-crimson-500/50 group-hover:bg-crimson-500/10 group-hover:text-crimson-300 group-hover:shadow-[0_0_12px_rgba(227,38,46,0.35)]">
                <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-paper transition-colors group-hover:text-crimson-400">
                  {c.title}
                </h3>
                <p className="mt-1 text-[11px] leading-snug text-[#9A9A9A] line-clamp-2">
                  {c.description}
                </p>
              </div>

              {/* Bottom Subtle Accent Indicator */}
              <div className="mt-3 h-[2px] w-0 rounded-full bg-crimson-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

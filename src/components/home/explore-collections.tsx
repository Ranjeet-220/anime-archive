import Link from "next/link";
import { Clock, Users, Building2, Film, Compass, Library } from "lucide-react";

const COLLECTIONS = [
  { title: "Timeline", href: "/timeline", icon: Clock },
  { title: "Collections", href: "/collections", icon: Library },
  { title: "Creators", href: "/creators", icon: Users },
  { title: "Studios", href: "/studios", icon: Building2 },
  { title: "Movies", href: "/movies", icon: Film },
  { title: "Genres", href: "/genres", icon: Compass },
];

export function ExploreCollections() {
  return (
    <nav aria-label="Explore the archive" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {COLLECTIONS.map(({ title, href, icon: Icon }) => (
        <Link key={href} href={href} className="flex min-h-16 items-center gap-3 rounded-lg border border-line bg-charcoal px-4 py-3 text-sm text-paper-2 transition-colors hover:border-crimson-500 hover:text-paper">
          <Icon className="h-5 w-5 shrink-0 text-crimson-300" aria-hidden />
          {title}
        </Link>
      ))}
    </nav>
  );
}

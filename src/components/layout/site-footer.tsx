import Link from "next/link";

const ARCHIVE_LINKS = [
  { href: "/anime", label: "Anime Database" },
  { href: "/movies", label: "Movies" },
  { href: "/timeline", label: "Timeline" },
  { href: "/collections", label: "Collections" },
  { href: "/search", label: "Search" },
];

const MUSEUM_LINKS = [
  { href: "/museum", label: "3D Museum" },
  { href: "/timeline", label: "3D Timeline" },
  { href: "/genres", label: "Genres" },
  { href: "/contribute", label: "Contribute" },
];

const INSTITUTION_LINKS = [
  { href: "/about", label: "About" },
  { href: "/methodology", label: "Methodology" },
  { href: "/sources", label: "Sources" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/copyright", label: "Copyright" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/content-removal", label: "Content Removal" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-16 border-t border-line bg-charcoal/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-sm border border-crimson-500/50 bg-crimson-500/10 font-display text-sm font-bold text-crimson-300">
                文
              </span>
              <span className="font-display text-sm font-semibold tracking-[0.18em] text-paper">
                ANIME ARCHIVE
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted">
              A digital museum and historical encyclopedia of Japanese animation —
              from the earliest shorts of 1917 to the streaming era.
            </p>
            <p className="mt-4 font-jp text-xs text-faint">
              アニメの歴史を歩く。
            </p>
          </div>
          <FooterColumn title="Archive" links={ARCHIVE_LINKS} />
          <FooterColumn title="Museum" links={MUSEUM_LINKS} />
          <FooterColumn title="Institution" links={INSTITUTION_LINKS} />
        </div>
        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Anime Archive. An informational historical
            archive — not affiliated with any production studio.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-muted transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <nav aria-label={`${title} links`}>
      <h3 className="mb-3 font-display text-[11px] uppercase tracking-[0.25em] text-crimson-400">
        {title}
      </h3>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-muted hover:text-paper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
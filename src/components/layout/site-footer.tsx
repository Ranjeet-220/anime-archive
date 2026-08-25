import Link from "next/link";

const ARCHIVE_LINKS = [
  { href: "/anime", label: "Anime Catalog" },
  { href: "/movies", label: "Feature Films" },
  { href: "/rankings", label: "Top 60 Rankings" },
  { href: "/timeline", label: "Historical Timeline" },
  { href: "/collections", label: "Curated Collections" },
  { href: "/search", label: "Search Archive" },
];

const MUSEUM_LINKS = [
  { href: "/museum", label: "3D Digital Museum" },
  { href: "/timeline", label: "3D Timeline Chamber" },
  { href: "/studios", label: "Studio Hall" },
  { href: "/creators", label: "Hall of Legends" },
  { href: "/genres", label: "Genre Dimensions" },
  { href: "/tours", label: "Guided Museum Tours" },
];

const INSTITUTION_LINKS = [
  { href: "/about", label: "About Archive" },
  { href: "/methodology", label: "Editorial Methodology" },
  { href: "/sources", label: "Archival Sources" },
  { href: "/quizzes", label: "Knowledge Quizzes" },
  { href: "/contribute", label: "Submit Contribution" },
  { href: "/contact", label: "Contact Curators" },
];

const LEGAL_LINKS = [
  { href: "/copyright", label: "Copyright Notice" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/content-removal", label: "Content Removal" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-[#25282C] bg-[#050607]">
      <div className="mx-auto max-w-[1720px] w-full px-4 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Logo & Info */}
          <div className="md:col-span-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full overflow-hidden shadow-[0_0_14px_rgba(227,38,46,0.5)]">
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
                <span className="font-display text-sm font-bold uppercase tracking-[0.18em] text-paper">
                  ANIME ARCHIVE
                </span>
                <span className="text-[8.5px] font-medium uppercase tracking-[0.2em] text-[#666A70]">
                  WALK THROUGH THE HISTORY OF ANIME
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-[#9A9A9A]">
              A non-commercial digital museum and historical encyclopedia dedicated to documenting and preserving the art, creators, studios, and cultural legacy of Japanese animation.
            </p>

            <div className="mt-6 flex items-center gap-2 font-jp text-xs text-[#666A70]">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson-500" />
              <span>アニメーションの歴史と遺産を保存する。</span>
            </div>
          </div>

          {/* Links Columns */}
          <FooterColumn title="Archive" links={ARCHIVE_LINKS} />
          <FooterColumn title="Museum" links={MUSEUM_LINKS} />
          <FooterColumn title="Institution" links={INSTITUTION_LINKS} />
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-[#25282C] pt-6 text-[11px] text-[#666A70] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Anime Archive. Historical reference and educational catalog.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {LEGAL_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-paper transition-colors">
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
      <h3 className="mb-3 font-display text-[11px] font-bold uppercase tracking-[0.25em] text-crimson-400">
        {title}
      </h3>
      <ul className="space-y-2 text-xs">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[#9A9A9A] hover:text-paper transition-colors">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

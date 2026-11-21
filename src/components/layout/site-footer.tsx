import Link from "next/link";

const GROUPS = [
  { title: "Explore", links: [
    { href: "/anime", label: "Anime" },
    { href: "/museum", label: "Museum" },
    { href: "/timeline", label: "Timeline" },
    { href: "/tours", label: "Guided tours" },
  ] },
  { title: "About", links: [
    { href: "/about", label: "About us" },
    { href: "/methodology", label: "Methodology" },
    { href: "/sources", label: "Sources" },
    { href: "/contribute", label: "Contribute" },
    { href: "/contact", label: "Contact" },
  ] },
];
const LEGAL_LINKS = [
  { href: "/copyright", label: "Copyright" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/content-removal", label: "Content removal" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
      <div className="mx-auto w-full max-w-[1720px] px-4 py-10 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex min-h-11 items-center font-display text-lg font-semibold">Anime Archive</Link>
            <p className="mt-2 max-w-sm text-base leading-relaxed text-muted">Discover the stories behind Japanese animation.</p>
          </div>
          {GROUPS.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`}>
              <h2 className="mb-2 font-display text-sm font-semibold text-paper">{group.title}</h2>
              <ul className="grid grid-cols-2 sm:grid-cols-1">
                {group.links.map((link) => <li key={link.href}><Link href={link.href} className="inline-flex min-h-11 items-center text-sm text-muted hover:text-paper">{link.label}</Link></li>)}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-line pt-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Anime Archive</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-5">
            {LEGAL_LINKS.map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center hover:text-paper">{link.label}</Link>)}
          </nav>
        </div>
      </div>
    </footer>
  );
}

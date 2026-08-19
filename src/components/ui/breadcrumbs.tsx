import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-faint">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="inline-flex items-center gap-1 hover:text-paper transition-colors">
            <Home className="h-3 w-3" aria-hidden />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-faint/60" aria-hidden />
            {item.href ? (
              <Link href={item.href} className="hover:text-paper transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-muted">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
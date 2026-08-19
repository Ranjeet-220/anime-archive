import Link from "next/link";
import { ArrowRight, Compass, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6">
      <p className="font-jp text-sm text-faint">その部屋は存在しない</p>
      <p className="mt-4 font-display text-7xl font-bold tracking-tight text-crimson-500 sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-xl text-paper sm:text-2xl">
        This reel is missing from the archive
      </h1>
      <p className="mt-3 max-w-md text-sm text-muted">
        The page you are looking for does not exist — it may have been moved,
        renamed, or never recorded in the catalog.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex h-10 items-center justify-center gap-2 rounded bg-crimson-500 px-5 font-display text-sm text-paper transition-colors hover:bg-crimson-400"
        >
          <Compass className="h-4 w-4" aria-hidden />
          Return Home
        </Link>
        <Link
          href="/anime"
          className="inline-flex h-10 items-center justify-center gap-2 rounded border border-line-2 px-5 font-display text-sm text-paper transition-colors hover:border-crimson-500 hover:text-crimson-300"
        >
          <Search className="h-4 w-4" aria-hidden />
          Browse the Catalog
        </Link>
      </div>
      <Link
        href="/timeline"
        className="mt-6 inline-flex items-center gap-1 text-xs text-faint transition-colors hover:text-holo-400"
      >
        Or walk the timeline <ArrowRight className="h-3 w-3" aria-hidden />
      </Link>
    </div>
  );
}

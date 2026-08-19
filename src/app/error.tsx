"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, AlertTriangle } from "lucide-react";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-danger/40 bg-danger/10 text-danger">
        <AlertTriangle className="h-5 w-5" aria-hidden />
      </div>
      <h1 className="font-display text-lg text-paper">Something went wrong</h1>
      <p className="max-w-sm text-sm text-muted">
        The archive could not be opened. This is usually temporary — try
        again, or head back to the homepage.
      </p>
      {error.digest ? (
        <p className="font-mono text-[11px] text-faint">digest: {error.digest}</p>
      ) : null}
      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={retry}
          className="inline-flex items-center gap-2 rounded bg-crimson-500 px-4 py-2 font-display text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-crimson-400"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded border border-line-2 px-4 py-2 font-display text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:border-crimson-500 hover:text-paper"
        >
          Homepage
        </Link>
      </div>
    </div>
  );
}

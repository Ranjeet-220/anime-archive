"use client";

import { useEffect, useState } from "react";
import { BookmarkPlus, Heart, LogIn } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SaveButtons({
  animeId,
  slug,
  isLoggedIn,
  className,
}: {
  animeId: string;
  slug: string;
  isLoggedIn: boolean;
  className?: string;
}) {
  const [favorite, setFavorite] = useState(false);
  const [watchlist, setWatchlist] = useState(false);
  const [busy, setBusy] = useState<"favorite" | "watchlist" | null>(null);
  const [loginHint, setLoginHint] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    let cancelled = false;
    Promise.all([
      fetch("/api/user/favorites").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/user/watchlist").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([fav, wl]) => {
        if (cancelled) return;
        const favs: { animeId: string }[] = fav?.favorites ?? [];
        const items: { animeId: string }[] = wl?.items ?? [];
        if (favs.some((f) => f.animeId === animeId)) setFavorite(true);
        if (items.some((i) => i.animeId === animeId)) setWatchlist(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [animeId, isLoggedIn]);

  async function toggle(kind: "favorite" | "watchlist") {
    if (!isLoggedIn) {
      setLoginHint(true);
      return;
    }
    const active = kind === "favorite" ? favorite : watchlist;
    const url = kind === "favorite" ? "/api/user/favorites" : "/api/user/watchlist";
    setBusy(kind);
    try {
      const res = active
        ? await fetch(`${url}?animeId=${encodeURIComponent(animeId)}`, { method: "DELETE" })
        : await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ animeId }),
          });
      if (res.status === 401) {
        setLoginHint(true);
        return;
      }
      if (res.ok) {
        if (kind === "favorite") setFavorite((v) => !v);
        else setWatchlist((v) => !v);
      }
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      <Button
        type="button"
        variant={favorite ? "primary" : "outline"}
        size="sm"
        onClick={() => toggle("favorite")}
        disabled={busy !== null}
        aria-pressed={favorite}
      >
        <Heart className={cn("h-3.5 w-3.5", favorite && "fill-current")} aria-hidden />
        {favorite ? "Favorited" : "Favorite"}
      </Button>
      <Button
        type="button"
        variant={watchlist ? "primary" : "outline"}
        size="sm"
        onClick={() => toggle("watchlist")}
        disabled={busy !== null}
        aria-pressed={watchlist}
      >
        <BookmarkPlus className={cn("h-3.5 w-3.5", watchlist && "fill-current")} aria-hidden />
        {watchlist ? "On watchlist" : "Watchlist"}
      </Button>
      {loginHint ? (
        <span className="flex w-full items-center gap-1 text-xs text-muted">
          <LogIn className="h-3 w-3 shrink-0" aria-hidden />
          <LinkButton href={`/login?next=/anime/${slug}`} variant="ghost" size="sm" className="h-auto px-0.5 text-xs underline underline-offset-2">
            Sign in
          </LinkButton>
          to save this title to your archive.
        </span>
      ) : null}
    </div>
  );
}

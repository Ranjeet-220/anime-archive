"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function BookmarkButton({ slug, className }: { slug: string; className?: string }) {
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/user/favorites")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (cancelled) return;
        const favs: { anime: { slug: string } }[] = data?.favorites ?? [];
        setFavorited(favs.some((f) => f.anime.slug === slug));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [slug]);

  async function toggle() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/user/favorites", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      if (res.status === 401) {
        router.push(`/login?next=${encodeURIComponent(`/anime/${slug}`)}`);
        return;
      }
      if (res.ok) {
        const data = (await res.json()) as { favorited: boolean };
        setFavorited(data.favorited);
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void toggle();
      }}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-pressed={favorited}
      className={cn(
        "flex h-7 w-7 items-center justify-center rounded-md backdrop-blur-md transition-colors",
        favorited
          ? "bg-crimson-600 text-white"
          : "bg-black/60 text-stone-300 hover:bg-crimson-600 hover:text-white",
        className
      )}
    >
      <Bookmark className={cn("h-4 w-4", favorited && "fill-current")} />
    </button>
  );
}
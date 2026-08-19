"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimeCard } from "@/components/ui/anime-card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface FavoriteItem {
  id: string;
  anime: {
    id: string;
    slug: string;
    title: string;
    japaneseTitle?: string | null;
    year?: number | null;
    coverUrl?: string | null;
    format: string;
    averageRating?: number | null;
    studio?: { slug: string; name: string } | null;
  };
}

export function FavoritesGrid({ items }: { items: FavoriteItem[] }) {
  const router = useRouter();
  const [removing, setRemoving] = useState<string | null>(null);
  const [removed, setRemoved] = useState<Set<string>>(new Set());

  async function remove(animeId: string) {
    setRemoving(animeId);
    try {
      const res = await fetch(`/api/user/favorites?animeId=${encodeURIComponent(animeId)}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setRemoved((prev) => new Set(prev).add(animeId));
        router.refresh();
      }
    } finally {
      setRemoving(null);
    }
  }

  const visible = items.filter((f) => !removed.has(f.anime.id));

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {visible.map((f) => (
        <div key={f.id} className="relative">
          <AnimeCard
            data={{
              ...f.anime,
              averageRating: f.anime.averageRating ?? undefined,
            }}
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => remove(f.anime.id)}
            disabled={removing === f.anime.id}
            className="absolute top-2 right-2 h-8 w-8 rounded bg-ink/70 border border-line text-faint hover:text-danger hover:border-danger/50"
            aria-label={`Remove ${f.anime.title} from favorites`}
          >
            <Trash2 className="h-3.5 w-3.5" aria-hidden />
          </Button>
        </div>
      ))}
    </div>
  );
}

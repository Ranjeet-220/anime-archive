"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { WATCH_LABELS } from "@/lib/format";
import type { WatchStatus } from "@/generated/prisma/client";
import { Trash2 } from "lucide-react";

export interface WatchlistItemDto {
  id: string;
  status: WatchStatus;
  updatedAt: string;
  anime: {
    id: string;
    slug: string;
    title: string;
    year?: number | null;
    format: string;
    averageRating?: number | null;
  };
}

const STATUS_ORDER: WatchStatus[] = ["WATCHING", "PLANNED", "COMPLETED", "ON_HOLD", "DROPPED"];

export function WatchlistTable({ items }: { items: WatchlistItemDto[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function changeStatus(animeId: string, status: WatchStatus) {
    setBusy(animeId);
    try {
      const res = await fetch("/api/user/watchlist", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ animeId, status }),
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function remove(animeId: string) {
    if (!window.confirm("Remove this title from your watchlist?")) return;
    setBusy(animeId);
    try {
      const res = await fetch(`/api/user/watchlist?animeId=${encodeURIComponent(animeId)}`, {
        method: "DELETE",
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(null);
    }
  }

  const groups = STATUS_ORDER.map((status) => ({
    status,
    label: WATCH_LABELS[status],
    items: items.filter((i) => i.status === status),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-8">
      {groups.length === 0 ? null : (
        groups.map((group) => (
          <section key={group.status}>
            <h3 className="mb-3 font-display text-sm uppercase tracking-[0.2em] text-crimson-400">
              {group.label} <span className="text-faint">({group.items.length})</span>
            </h3>
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full text-sm">
                <tbody>
                  {group.items.map((item) => (
                    <tr key={item.id} className="border-b border-line/60 last:border-0 bg-charcoal/60">
                      <td className="px-3 py-2.5">
                        <Link href={`/anime/${item.anime.slug}`} className="text-paper hover:text-crimson-300 transition-colors">
                          {item.anime.title}
                        </Link>
                        <span className="ml-2 text-xs text-faint">
                          {item.anime.year ?? "—"}
                          {item.anime.averageRating != null ? ` · ${item.anime.averageRating.toFixed(1)}★` : ""}
                        </span>
                      </td>
                      <td className="w-40 px-3 py-2.5">
                        <Select
                          value={item.status}
                          disabled={busy === item.anime.id}
                          onChange={(e) => changeStatus(item.anime.id, e.target.value as WatchStatus)}
                          className="h-8 py-1 text-xs"
                          aria-label={`Status for ${item.anime.title}`}
                        >
                          {STATUS_ORDER.map((s) => (
                            <option key={s} value={s}>
                              {WATCH_LABELS[s]}
                            </option>
                          ))}
                        </Select>
                      </td>
                      <td className="w-14 px-3 py-2.5 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => remove(item.anime.id)}
                          disabled={busy === item.anime.id}
                          aria-label={`Remove ${item.anime.title}`}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-faint hover:text-danger" aria-hidden />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ))
      )}
    </div>
  );
}

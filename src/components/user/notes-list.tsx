"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Trash2 } from "lucide-react";

export interface NoteDto {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  anime: { id: string; slug: string; title: string };
}

export function NotesList({ notes }: { notes: NoteDto[] }) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);

  async function remove(id: string) {
    if (!window.confirm("Delete this note?")) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/user/notes?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) router.refresh();
    } finally {
      setBusy(null);
    }
  }

  return (
    <ul className="space-y-3">
      {notes.map((n) => (
        <li key={n.id} className="surface-card p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <Link href={`/anime/${n.anime.slug}`} className="font-display text-sm text-holo-300 hover:text-holo-400 transition-colors">
                {n.anime.title}
              </Link>
              <p className="mt-1 text-sm text-paper-2 whitespace-pre-wrap">{n.content}</p>
              <p className="mt-1.5 text-xs text-faint">{formatDate(n.updatedAt)}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => remove(n.id)} disabled={busy === n.id} aria-label="Delete note">
              <Trash2 className="h-3.5 w-3.5 text-faint hover:text-danger" aria-hidden />
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
}

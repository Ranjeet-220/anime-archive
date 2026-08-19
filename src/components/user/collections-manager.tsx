"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, Globe, Lock } from "lucide-react";

interface CollectionDto {
  id: string;
  name: string;
  description?: string | null;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  _count: { items: number };
  items: { anime: { id: string; slug: string; title: string; year?: number | null } }[];
}

export function CollectionsManager({ collections }: { collections: CollectionDto[] }) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  async function create(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!name.trim()) {
      setError("Give your collection a name.");
      return;
    }
    setBusy("create");
    try {
      const res = await fetch("/api/user/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, isPublic }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to create collection.");
        return;
      }
      setName("");
      setDescription("");
      setShowForm(false);
      router.refresh();
    } finally {
      setBusy(null);
    }
  }

  async function togglePublic(c: CollectionDto) {
    await fetch("/api/user/collections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, isPublic: !c.isPublic }),
    });
    router.refresh();
  }

  function startEdit(c: CollectionDto) {
    setEditingId(c.id);
    setEditName(c.name);
    setEditDescription(c.description ?? "");
  }

  async function saveEdit(c: CollectionDto) {
    await fetch("/api/user/collections", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: c.id, name: editName, description: editDescription }),
    });
    setEditingId(null);
    router.refresh();
  }

  async function remove(c: CollectionDto) {
    if (!window.confirm(`Delete collection "${c.name}"?`)) return;
    await fetch(`/api/user/collections?id=${encodeURIComponent(c.id)}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted">{collections.length} collection{collections.length === 1 ? "" : "s"}</p>
        <Button size="sm" variant="outline" onClick={() => setShowForm((v) => !v)}>
          <Plus className="h-3.5 w-3.5" aria-hidden /> New collection
        </Button>
      </div>

      {showForm ? (
        <form onSubmit={create} className="surface-panel space-y-3 p-4">
          <Field label="Name" htmlFor="col-name">
            <Input id="col-name" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. Neon classics" />
          </Field>
          <Field label="Description (optional)" htmlFor="col-desc">
            <Textarea id="col-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-20" />
          </Field>
          <label className="flex items-center gap-2 text-sm text-muted">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="accent-crimson-500"
            />
            Public collection
          </label>
          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={busy === "create"}>
              {busy === "create" ? "Creating…" : "Create"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {collections.length === 0 ? (
        <p className="text-sm text-muted">No collections yet. Create one to start curating your archive.</p>
      ) : (
        <ul className="space-y-3">
          {collections.map((c) => (
            <li key={c.id} className="surface-card p-4">
              {editingId === c.id ? (
                <div className="space-y-3">
                  <Field label="Name">
                    <Input value={editName} onChange={(e) => setEditName(e.target.value)} />
                  </Field>
                  <Field label="Description">
                    <Textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} className="min-h-16" />
                  </Field>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => saveEdit(c)}>Save</Button>
                    <Button size="sm" variant="ghost" onClick={() => setEditingId(null)}>Cancel</Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base text-paper">{c.name}</h3>
                      {c.description ? <p className="mt-0.5 text-sm text-muted">{c.description}</p> : null}
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <Badge tone={c.isPublic ? "ok" : "neutral"}>
                        {c.isPublic ? <Globe className="h-3 w-3" aria-hidden /> : <Lock className="h-3 w-3" aria-hidden />}
                        {c.isPublic ? "Public" : "Private"}
                      </Badge>
                      <Button size="sm" variant="ghost" onClick={() => togglePublic(c)} aria-label={c.isPublic ? "Make private" : "Make public"}>
                        {c.isPublic ? "Make private" : "Make public"}
                      </Button>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-faint">{c._count.items} anime</p>
                  {c.items.length > 0 ? (
                    <p className="mt-1 text-xs text-muted">
                      {c.items.map((i) => i.anime.title).join(", ")}
                      {c._count.items > c.items.length ? ` +${c._count.items - c.items.length} more` : ""}
                    </p>
                  ) : null}
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="ghost" onClick={() => startEdit(c)}>
                      <Pencil className="h-3 w-3" aria-hidden /> Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => remove(c)}
                      className="text-danger hover:bg-danger/10"
                    >
                      <Trash2 className="h-3 w-3" aria-hidden /> Delete
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
      <p className={cn("text-xs text-faint")}>
        Add anime to a collection from any anime detail page.
      </p>
    </div>
  );
}

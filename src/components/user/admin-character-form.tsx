"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea, Select } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export interface CharacterOption {
  id: string;
  slug: string;
  title: string;
}

export interface CharacterFormData {
  id?: string;
  slug?: string;
  name?: string;
  japaneseName?: string | null;
  role?: string | null;
  biography?: string | null;
  voiceActorName?: string | null;
  animeId?: string | null;
}

export function AdminCharacterForm({
  mode,
  initial,
  animeOptions,
}: {
  mode: "create" | "edit";
  initial?: CharacterFormData | null;
  animeOptions: CharacterOption[];
}) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [japaneseName, setJapaneseName] = useState(initial?.japaneseName ?? "");
  const [role, setRole] = useState(initial?.role ?? "");
  const [biography, setBiography] = useState(initial?.biography ?? "");
  const [voiceActorName, setVoiceActorName] = useState(initial?.voiceActorName ?? "");
  const [animeId, setAnimeId] = useState(initial?.animeId ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const body = { name, slug, japaneseName, role, biography, voiceActorName, animeId: animeId || null };
    try {
      const url = mode === "create" ? "/api/admin/characters" : `/api/admin/characters/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save character.");
        return;
      }
      router.push("/admin/characters");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" htmlFor="ch-name">
          <Input
            id="ch-name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="ch-slug">
          <Input id="ch-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Japanese name" htmlFor="ch-jp">
          <Input id="ch-jp" value={japaneseName} onChange={(e) => setJapaneseName(e.target.value)} />
        </Field>
        <Field label="Role" htmlFor="ch-role" hint="e.g. Protagonist, Antagonist">
          <Input id="ch-role" value={role} onChange={(e) => setRole(e.target.value)} />
        </Field>
        <Field label="Voice actor" htmlFor="ch-va">
          <Input id="ch-va" value={voiceActorName} onChange={(e) => setVoiceActorName(e.target.value)} />
        </Field>
        <Field label="Anime" htmlFor="ch-anime">
          <Select id="ch-anime" value={animeId} onChange={(e) => setAnimeId(e.target.value)}>
            <option value="">—</option>
            {animeOptions.map((a) => (
              <option key={a.id} value={a.id}>
                {a.title}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Biography" htmlFor="ch-bio">
        <Textarea id="ch-bio" value={biography} onChange={(e) => setBiography(e.target.value)} className="min-h-24" />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create character" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/characters")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";

export function GenreAddForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [japaneseName, setJapaneseName] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/admin/genres", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, japaneseName, description }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to create genre.");
        return;
      }
      setName("");
      setJapaneseName("");
      setDescription("");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="surface-panel space-y-3 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Name" htmlFor="ge-name">
          <Input id="ge-name" required value={name} onChange={(e) => setName(e.target.value)} />
        </Field>
        <Field label="Japanese name (optional)" htmlFor="ge-jp">
          <Input id="ge-jp" value={japaneseName} onChange={(e) => setJapaneseName(e.target.value)} />
        </Field>
      </div>
      <Field label="Description (optional)" htmlFor="ge-desc">
        <Textarea id="ge-desc" value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-16" />
      </Field>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <Button type="submit" size="sm" disabled={busy}>
        {busy ? "Creating…" : "Add genre"}
      </Button>
    </form>
  );
}
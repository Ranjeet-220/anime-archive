"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input, Textarea } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";

export interface StudioFormData {
  id?: string;
  slug?: string;
  name?: string;
  japaneseName?: string | null;
  foundedYear?: number | null;
  headquarters?: string | null;
  founders?: string | null;
  history?: string | null;
  techniques?: string | null;
  significance?: string | null;
  status?: string | null;
  website?: string | null;
}

export function AdminStudioForm({ mode, initial }: { mode: "create" | "edit"; initial?: StudioFormData | null }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [japaneseName, setJapaneseName] = useState(initial?.japaneseName ?? "");
  const [foundedYear, setFoundedYear] = useState(initial?.foundedYear ? String(initial.foundedYear) : "");
  const [headquarters, setHeadquarters] = useState(initial?.headquarters ?? "");
  const [founders, setFounders] = useState(initial?.founders ?? "");
  const [history, setHistory] = useState(initial?.history ?? "");
  const [techniques, setTechniques] = useState(initial?.techniques ?? "");
  const [significance, setSignificance] = useState(initial?.significance ?? "");
  const [status, setStatus] = useState(initial?.status ?? "");
  const [website, setWebsite] = useState(initial?.website ?? "");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    const body = {
      name,
      slug,
      japaneseName,
      foundedYear: foundedYear ? Number(foundedYear) : null,
      headquarters,
      founders,
      history,
      techniques,
      significance,
      status,
      website,
    };
    try {
      const url = mode === "create" ? "/api/admin/studios" : `/api/admin/studios/${initial?.id}`;
      const res = await fetch(url, {
        method: mode === "create" ? "POST" : "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Failed to save studio.");
        return;
      }
      router.push("/admin/studios");
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
        <Field label="Name" htmlFor="st-name">
          <Input
            id="st-name"
            required
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
          />
        </Field>
        <Field label="Slug" htmlFor="st-slug">
          <Input id="st-slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
        </Field>
        <Field label="Japanese name" htmlFor="st-jp">
          <Input id="st-jp" value={japaneseName} onChange={(e) => setJapaneseName(e.target.value)} />
        </Field>
        <Field label="Founded year" htmlFor="st-founded">
          <Input id="st-founded" type="number" min={1900} max={2100} value={foundedYear} onChange={(e) => setFoundedYear(e.target.value)} />
        </Field>
        <Field label="Headquarters" htmlFor="st-hq">
          <Input id="st-hq" value={headquarters} onChange={(e) => setHeadquarters(e.target.value)} />
        </Field>
        <Field label="Founders" htmlFor="st-founders">
          <Input id="st-founders" value={founders} onChange={(e) => setFounders(e.target.value)} />
        </Field>
        <Field label="Status" htmlFor="st-status" hint="e.g. Active, Defunct">
          <Input id="st-status" value={status} onChange={(e) => setStatus(e.target.value)} />
        </Field>
        <Field label="Website" htmlFor="st-web">
          <Input id="st-web" type="url" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </Field>
      </div>
      <Field label="History" htmlFor="st-history">
        <Textarea id="st-history" value={history} onChange={(e) => setHistory(e.target.value)} className="min-h-28" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Techniques" htmlFor="st-tech">
          <Textarea id="st-tech" value={techniques} onChange={(e) => setTechniques(e.target.value)} className="min-h-20" />
        </Field>
        <Field label="Significance" htmlFor="st-sig">
          <Textarea id="st-sig" value={significance} onChange={(e) => setSignificance(e.target.value)} className="min-h-20" />
        </Field>
      </div>
      {error ? <p className="text-sm text-danger">{error}</p> : null}
      <div className="flex gap-2">
        <Button type="submit" disabled={busy}>
          {busy ? "Saving…" : mode === "create" ? "Create studio" : "Save changes"}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push("/admin/studios")}>
          Cancel
        </Button>
      </div>
    </form>
  );
}

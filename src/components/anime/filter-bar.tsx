"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronDown, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface FilterBarValues {
  q?: string;
  year?: string;
  decade?: string;
  genre?: string;
  studio?: string;
  director?: string;
  creator?: string;
  format?: string;
  status?: string;
  era?: string;
  minEpisodes?: string;
  maxEpisodes?: string;
  sort?: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

const FORMATS = ["TV", "MOVIE", "OVA", "ONA", "SPECIAL", "WEB"];
const SORTS = [
  { value: "year", label: "Oldest first" },
  { value: "year_desc", label: "Newest first" },
  { value: "rating", label: "Highest rated" },
  { value: "title", label: "Title A–Z" },
  { value: "newest", label: "Recently added" },
];

function FilterSelect({ name, label, value, options, all }: {
  name: string;
  label: string;
  value?: string;
  options: FilterOption[];
  all?: string;
}) {
  return (
    <label className="block min-w-0 text-sm text-muted">
      {label}
      <span className="relative mt-2 block">
        <select name={name} defaultValue={value ?? ""} className="h-11 w-full appearance-none rounded border border-line-2 bg-charcoal py-2 pl-3 pr-9 text-sm text-paper">
          {all && <option value="">{all}</option>}
          {value && !options.some((item) => item.value === value) && <option value={value}>{value}</option>}
          {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-3.5 h-4 w-4" aria-hidden />
      </span>
    </label>
  );
}

export function FilterBar({ initial, genres, studios, eras, className }: {
  initial: FilterBarValues;
  genres: FilterOption[];
  studios: FilterOption[];
  eras: FilterOption[];
  className?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const active = Object.entries(initial).filter(([key, value]) => value && key !== "sort");

  function navigate(params: URLSearchParams) {
    startTransition(() => router.push(params.size ? `/anime?${params}` : "/anime"));
  }

  function removeFilter(key: string) {
    const params = new URLSearchParams();
    for (const [name, value] of Object.entries(initial)) {
      if (value && name !== key) params.set(name, value);
    }
    navigate(params);
  }

  function chipLabel(key: string, value: string) {
    const options: Record<string, FilterOption[]> = { genre: genres, studio: studios, era: eras };
    const labels: Record<string, string> = { q: "Search", minEpisodes: "Min episodes", maxEpisodes: "Max episodes" };
    const display = options[key]?.find((option) => option.value === value)?.label ?? value;
    return `${labels[key] ?? key.charAt(0).toUpperCase() + key.slice(1)} · ${key === "decade" ? `${value}s` : display}`;
  }

  return (
    <div className={cn("space-y-4", className)} aria-busy={pending}>
      <form key={JSON.stringify(initial)} action="/anime" onSubmit={(event) => {
        event.preventDefault();
        const params = new URLSearchParams();
        for (const [key, value] of new FormData(event.currentTarget)) {
          if (typeof value === "string" && value.trim()) params.set(key, value.trim());
        }
        navigate(params);
      }} className="rounded-lg border border-line bg-charcoal/40 p-4 sm:p-5">
        <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_1fr_1fr_auto]">
          <label className="block text-sm text-muted">
            Search anime
            <input name="q" defaultValue={initial.q} placeholder="Title or Japanese title" type="search" className="mt-2 h-11 w-full rounded border border-line-2 bg-charcoal px-3 text-base text-paper placeholder:text-faint" />
          </label>
          <FilterSelect name="genre" label="Genre" value={initial.genre} options={genres} all="All genres" />
          <FilterSelect name="sort" label="Sort by" value={initial.sort ?? "rating"} options={SORTS} />
          <Button type="submit" disabled={pending} className="h-11"><Search className="h-4 w-4" aria-hidden />{pending ? "Searching…" : "Search"}</Button>
        </div>
        <details className="mt-4">
          <summary className="min-h-11 cursor-pointer py-3 text-sm text-paper-2">More filters</summary>
          <div className="grid gap-4 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect name="era" label="Era" value={initial.era} options={eras} all="All eras" />
            <FilterSelect name="studio" label="Studio" value={initial.studio} options={studios} all="All studios" />
            <FilterSelect name="format" label="Format" value={initial.format} options={FORMATS.map((value) => ({ value, label: value === "MOVIE" ? "Movie" : value }))} all="All formats" />
            <FilterSelect name="decade" label="Decade" value={initial.decade} options={Array.from({ length: 12 }, (_, index) => ({ value: String(1910 + index * 10), label: `${1910 + index * 10}s` }))} all="All decades" />
            <label className="text-sm text-muted">Release year<input name="year" type="number" min="1900" max="2100" defaultValue={initial.year} placeholder="Any year" className="mt-2 h-11 w-full rounded border border-line-2 bg-charcoal px-3 text-base text-paper" /></label>
            <label className="text-sm text-muted">Minimum episodes<input name="minEpisodes" type="number" min="0" defaultValue={initial.minEpisodes} placeholder="Any" className="mt-2 h-11 w-full rounded border border-line-2 bg-charcoal px-3 text-base text-paper" /></label>
            <label className="text-sm text-muted">Maximum episodes<input name="maxEpisodes" type="number" min="0" defaultValue={initial.maxEpisodes} placeholder="Any" className="mt-2 h-11 w-full rounded border border-line-2 bg-charcoal px-3 text-base text-paper" /></label>
            <FilterSelect name="status" label="Release status" value={initial.status} options={["FINISHED", "AIRING", "UPCOMING", "UNKNOWN"].map((value) => ({ value, label: value.charAt(0) + value.slice(1).toLowerCase() }))} all="Any status" />
          </div>
          <div className="mt-4 flex items-center gap-4">
            <Button type="submit" disabled={pending}>Apply filters</Button>
            <Link href="/anime" className="inline-flex min-h-11 items-center text-sm text-muted hover:text-paper">Reset</Link>
          </div>
        </details>
        {initial.director && <input type="hidden" name="director" value={initial.director} />}
        {initial.creator && <input type="hidden" name="creator" value={initial.creator} />}
      </form>
      {active.length > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {active.map(([key, value]) => (
            <button key={key} type="button" onClick={() => removeFilter(key)} disabled={pending} aria-label={`Remove ${chipLabel(key, value!)}`} className="inline-flex min-h-11 items-center gap-2 rounded border border-line px-3 text-sm text-paper-2 hover:border-crimson-500">
              {chipLabel(key, value!)}<X className="h-4 w-4" aria-hidden />
            </button>
          ))}
          <Link href="/anime" className="inline-flex min-h-11 items-center px-3 text-sm text-muted hover:text-paper">Clear all</Link>
        </div>
      )}
    </div>
  );
}

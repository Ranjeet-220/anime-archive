"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { FORMAT_LABELS, STATUS_LABELS } from "@/lib/format";
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

const DECADES = [1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020];

const SORT_OPTIONS: FilterOption[] = [
  { value: "year", label: "Year ↑ (oldest first)" },
  { value: "year_desc", label: "Year ↓ (newest first)" },
  { value: "title", label: "Title A–Z" },
  { value: "rating", label: "Top rated" },
  { value: "newest", label: "Recently added" },
];

export function FilterBar({
  initial,
  genres,
  studios,
  eras,
  className,
}: {
  initial: FilterBarValues;
  genres: FilterOption[];
  studios: FilterOption[];
  eras: FilterOption[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("rounded-lg border border-line bg-charcoal/60", className)}>
      <div className="flex items-center justify-between gap-3 px-4 pt-3">
        <h2 className="flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.3em] text-muted">
          <SlidersHorizontal className="h-3.5 w-3.5 text-crimson-400" aria-hidden />
          Filters
        </h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="anime-filters"
          className="inline-flex h-8 items-center gap-1.5 rounded border border-line px-2.5 font-display text-[11px] uppercase tracking-wider text-muted transition-colors hover:border-line-2 hover:text-paper md:hidden"
        >
          {open ? "Hide" : "Show"}
          <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} aria-hidden />
        </button>
      </div>

      <form id="anime-filters" action="/anime" method="get" className={cn("px-4 pb-4 pt-3", !open && "hidden md:block")}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Search" htmlFor="f-q" className="sm:col-span-2 lg:col-span-4">
            <Input
              id="f-q"
              name="q"
              type="search"
              placeholder="Title, Japanese title, alternative title…"
              defaultValue={initial.q}
            />
          </Field>

          <Field label="Decade" htmlFor="f-decade">
            <Select id="f-decade" name="decade" defaultValue={initial.decade ?? ""}>
              <option value="">All decades</option>
              {DECADES.map((d) => (
                <option key={d} value={d}>
                  {d}s
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Year" htmlFor="f-year">
            <Input id="f-year" name="year" type="number" min={1917} max={2100} placeholder="e.g. 1988" defaultValue={initial.year} />
          </Field>

          <Field label="Genre" htmlFor="f-genre">
            <Select id="f-genre" name="genre" defaultValue={initial.genre ?? ""}>
              <option value="">All genres</option>
              {genres.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Studio" htmlFor="f-studio">
            <Select id="f-studio" name="studio" defaultValue={initial.studio ?? ""}>
              <option value="">All studios</option>
              {studios.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Format" htmlFor="f-format">
            <Select id="f-format" name="format" defaultValue={initial.format ?? ""}>
              <option value="">All formats</option>
              {Object.entries(FORMAT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Status" htmlFor="f-status">
            <Select id="f-status" name="status" defaultValue={initial.status ?? ""}>
              <option value="">All statuses</option>
              {Object.entries(STATUS_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Era" htmlFor="f-era">
            <Select id="f-era" name="era" defaultValue={initial.era ?? ""}>
              <option value="">All eras</option>
              {eras.map((e) => (
                <option key={e.value} value={e.value}>
                  {e.label}
                </option>
              ))}
            </Select>
          </Field>

          <Field label="Min episodes" htmlFor="f-min">
            <Input id="f-min" name="minEpisodes" type="number" min={1} placeholder="e.g. 12" defaultValue={initial.minEpisodes} />
          </Field>

          <Field label="Max episodes" htmlFor="f-max">
            <Input id="f-max" name="maxEpisodes" type="number" min={1} placeholder="e.g. 50" defaultValue={initial.maxEpisodes} />
          </Field>

          <Field label="Sort" htmlFor="f-sort">
            <Select id="f-sort" name="sort" defaultValue={initial.sort ?? ""}>
              <option value="">Default (year)</option>
              {SORT_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="submit" size="sm">
            Apply filters
          </Button>
          <LinkButton href="/anime" variant="outline" size="sm">
            Reset
          </LinkButton>
        </div>
      </form>
    </div>
  );
}

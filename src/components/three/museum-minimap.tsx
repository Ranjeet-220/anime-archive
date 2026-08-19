"use client";

import { useState } from "react";
import { Map as MapIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EraDto } from "@/lib/types";

export interface MuseumMinimapProps {
  eras: EraDto[];
  activeRoom: number;
  onSelectRoom: (index: number) => void;
}

export function MuseumMinimap({
  eras,
  activeRoom,
  onSelectRoom,
}: MuseumMinimapProps) {
  const [open, setOpen] = useState(false);
  const activeEra = eras[activeRoom] ?? null;

  return (
    <div className="absolute bottom-16 left-4 z-10">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close museum map" : "Open museum map"}
        aria-expanded={open}
        title="Museum floor plan"
        className="flex items-center gap-2 rounded border border-line-2 bg-ink/80 px-2.5 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-muted backdrop-blur-sm transition-colors hover:border-crimson-500 hover:text-paper sm:hidden"
      >
        <MapIcon className="h-3.5 w-3.5" aria-hidden />
        Map
      </button>

      <nav
        aria-label="Museum floor plan"
        title="Museum floor plan"
        className={cn(
          "mt-2 w-56 max-w-[calc(100vw-2rem)] rounded border border-line bg-ink/90 p-2 backdrop-blur-sm sm:mt-0 sm:block sm:w-[200px]",
          open ? "block" : "hidden"
        )}
      >
        <div className="flex items-center justify-between gap-2">
          <p className="font-display text-[10px] uppercase tracking-[0.24em] text-muted">
            Floor plan
          </p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close museum map"
            className="rounded p-0.5 text-faint transition-colors hover:text-paper sm:hidden"
          >
            <X className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1">
          {eras.map((era, i) => (
            <button
              key={era.id}
              type="button"
              onClick={() => onSelectRoom(i)}
              aria-label={`Go to room ${i + 1}: ${era.name}`}
              aria-current={i === activeRoom ? "step" : undefined}
              title={`${era.name} · ${era.period}`}
              className={cn(
                "flex h-7 items-center justify-center rounded border font-display text-[10px] tabular-nums transition-colors sm:h-6",
                i === activeRoom
                  ? "border-crimson-500 bg-crimson-500/20 text-crimson-300"
                  : "border-line-2 text-faint hover:border-crimson-500 hover:text-paper"
              )}
            >
              {i + 1}
            </button>
          ))}
        </div>
        {activeEra ? (
          <p className="mt-2 truncate font-display text-[10px] uppercase tracking-[0.18em] text-paper-2">
            Room {activeRoom + 1} · {activeEra.name}{" "}
            <span className="text-faint">{activeEra.period}</span>
          </p>
        ) : null}
      </nav>
    </div>
  );
}
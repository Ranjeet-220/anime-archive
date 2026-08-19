"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EraDto } from "@/lib/types";
import type { TwoDimensionalView } from "./scene-types";
import { MUSEUM_VIEW_KEY } from "./scene-types";
import { useSceneSupport } from "./use-scene-support";
import { SceneGate, SceneUnavailable } from "./scene-shell";
import { SceneLoading } from "./scene-shell";
import { MuseumMinimap } from "./museum-minimap";

const MuseumSceneCanvas = dynamic(
  () => import("./museum-scene").then((m) => m.MuseumScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Loading the museum…" />,
  }
);

const clampRoom = (i: number, max: number) => Math.min(max, Math.max(0, i));

/**
 * The /museum page experience: an era strip, the interactive 3D museum
 * with prev/next + keyboard navigation, an always-visible 2D room list,
 * and a persistent "Skip 3D Experience" 2D fallback (era grid).
 */
export function MuseumExperience({ eras }: { eras: EraDto[] }) {
  const { mounted, eligible } = useSceneSupport();
  const [view, setView] = useState<TwoDimensionalView>("2d");
  const [activeRoom, setActiveRoom] = useState(0);
  const [userOpted2d, setUserOpted2d] = useState(false);

  useEffect(() => {
    if (!mounted) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(MUSEUM_VIEW_KEY);
    } catch {
      stored = null;
    }
    const wants3d = stored === "3d" || (stored !== "2d" && eligible);
    if ((wants3d && view !== "3d") || (!wants3d && view !== "2d")) {
      const id = requestAnimationFrame(() => setView(wants3d ? "3d" : "2d"));
      return () => cancelAnimationFrame(id);
    }
    return;
  }, [mounted, eligible, view]);

  const skipTo2d = useCallback(() => {
    try {
      localStorage.setItem(MUSEUM_VIEW_KEY, "2d");
    } catch {
      // ignore
    }
    setUserOpted2d(true);
    setView("2d");
  }, []);

  const backTo3d = useCallback(() => {
    try {
      localStorage.removeItem(MUSEUM_VIEW_KEY);
    } catch {
      // ignore
    }
    setUserOpted2d(false);
    setView("3d");
  }, []);

  const focusRoom = useCallback(
    (i: number) => setActiveRoom(clampRoom(i, eras.length - 1)),
    [eras.length]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view !== "3d") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        focusRoom(activeRoom - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        focusRoom(activeRoom + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [view, activeRoom, focusRoom]);

  const activeEra: EraDto | null = eras[activeRoom] ?? null;

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      {/* Era strip */}
      <nav aria-label="Era rooms" className="mb-6">
        <ul className="flex gap-2 overflow-x-auto pb-2">
          {eras.map((era, i) => (
            <li key={era.id} className="shrink-0">
              {view === "3d" ? (
                <button
                  type="button"
                  onClick={() => focusRoom(i)}
                  className={cn(
                    "rounded border px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.18em] transition-colors",
                    i === activeRoom
                      ? "border-crimson-500 bg-crimson-500/15 text-crimson-300"
                      : "border-line-2 text-muted hover:border-crimson-500 hover:text-paper"
                  )}
                >
                  {era.name}
                  <span className="ml-2 text-faint">{era.period}</span>
                </button>
              ) : (
                <Link
                  href={`/timeline/${era.slug}`}
                  className="block rounded border border-line-2 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.18em] text-muted transition-colors hover:border-crimson-500 hover:text-paper"
                >
                  {era.name}
                  <span className="ml-2 text-faint">{era.period}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {view === "3d" && eligible ? (
        <div className="relative">
          <SceneGate label="Loading the museum…">
            {({ mode, mobile }) => (
              <MuseumSceneCanvas
                mode={mode}
                mobile={mobile}
                eras={eras}
                activeRoom={activeRoom}
                onFocusRoom={focusRoom}
              />
            )}
          </SceneGate>

          <MuseumMinimap
            eras={eras}
            activeRoom={activeRoom}
            onSelectRoom={focusRoom}
          />

          {/* Room nav + current room actions */}
          <div className="absolute inset-x-0 top-4 z-10 flex items-center justify-between gap-2 px-4">
            <button
              type="button"
              onClick={() => focusRoom(activeRoom - 1)}
              disabled={activeRoom === 0}
              aria-label="Previous room"
              className="rounded border border-line-2 bg-charcoal/70 p-2 text-paper backdrop-blur-sm transition-colors hover:border-crimson-500 disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden />
            </button>
            <p className="rounded border border-line bg-charcoal/70 px-3 py-1.5 font-display text-[11px] uppercase tracking-[0.22em] text-paper backdrop-blur-sm">
              {activeEra ? (
                <>
                  Room {activeRoom + 1} / {eras.length} · {activeEra.name}{" "}
                  <span className="text-faint">{activeEra.period}</span>
                </>
              ) : (
                "Museum"
              )}
            </p>
            <button
              type="button"
              onClick={() => focusRoom(activeRoom + 1)}
              disabled={activeRoom >= eras.length - 1}
              aria-label="Next room"
              className="rounded border border-line-2 bg-charcoal/70 p-2 text-paper backdrop-blur-sm transition-colors hover:border-crimson-500 disabled:opacity-40"
            >
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </div>

          {/* READ FULL HISTORY for the active room */}
          {activeEra ? (
            <div className="absolute inset-x-0 bottom-24 z-10 flex justify-center px-4">
              <Link
                href={`/timeline/${activeEra.slug}`}
                className="rounded border border-crimson-500 bg-ink/80 px-4 py-2 font-display text-[11px] uppercase tracking-[0.26em] text-crimson-300 backdrop-blur-sm transition-colors hover:bg-crimson-500/20 hover:text-paper"
              >
                Read Full History — {activeEra.name}
              </Link>
            </div>
          ) : null}

          {/* Always-visible 2D room list so nobody gets stuck in 3D */}
          <div className="absolute inset-x-0 bottom-0 z-10 bg-ink/80 backdrop-blur-sm">
            <div className="mx-auto flex max-w-7xl gap-1.5 overflow-x-auto px-4 py-3">
              {eras.map((era, i) => (
                <button
                  key={era.id}
                  type="button"
                  onClick={() => focusRoom(i)}
                  className={cn(
                    "shrink-0 rounded border px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.16em] transition-colors",
                    i === activeRoom
                      ? "border-crimson-500 bg-crimson-500/15 text-crimson-300"
                      : "border-line-2 text-faint hover:border-line-2 hover:text-paper"
                  )}
                >
                  {i + 1}. {era.name}
                </button>
              ))}
            </div>
          </div>

          <p className="mt-3 text-center text-xs text-faint">
            Drag to orbit · arrow keys to move between rooms ·{" "}
            <button
              type="button"
              onClick={skipTo2d}
              className="underline underline-offset-2 transition-colors hover:text-crimson-300"
            >
              Skip 3D Experience
            </button>
          </p>
        </div>
      ) : (
        <TwoDimensionalMuseum
          eras={eras}
          backTo3d={eligible ? backTo3d : undefined}
          note={!eligible && !userOpted2d ? "3D unavailable" : undefined}
        />
      )}
    </div>
  );
}

/**
 * The 2D fallback for the museum: a grid of era cards linking to the
 * timeline, plus a way back into the 3D view when it is supported.
 */
function TwoDimensionalMuseum({
  eras,
  backTo3d,
  note,
}: {
  eras: EraDto[];
  backTo3d?: () => void;
  note?: string;
}) {
  if (!eras.length) {
    return (
      <SceneUnavailable
        title="The museum is empty"
        description="No era data was found. Please try again later."
      />
    );
  }
  return (
    <div>
      {note ? (
        <SceneUnavailable
          title={note}
          description="The 3D museum could not be started on this device, or reduced motion is preferred. Below is the full 2D floor plan."
          actionLabel="Browse the timeline instead"
          actionHref="/timeline"
        />
      ) : null}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {eras.map((era) => (
          <Link
            key={era.id}
            href={`/timeline/${era.slug}`}
            className="group surface-card p-5 lift flex flex-col gap-2"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-display text-sm uppercase tracking-[0.2em] text-paper group-hover:text-crimson-300 transition-colors">
                {era.name}
              </h3>
              <span className="shrink-0 font-display text-[11px] tracking-[0.14em] text-faint">
                {era.period}
              </span>
            </div>
            {era.description ? (
              <p className="text-sm text-muted line-clamp-3">{era.description}</p>
            ) : null}
            <p className="mt-auto pt-2 font-display text-[11px] uppercase tracking-[0.22em] text-crimson-400">
              {era.animeCount} exhibits
            </p>
          </Link>
        ))}
      </div>
      {backTo3d ? (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={backTo3d}
            className="inline-flex items-center gap-2 rounded border border-line-2 px-4 py-2 font-display text-[11px] uppercase tracking-[0.24em] text-muted transition-colors hover:border-holo-400 hover:text-holo-300"
          >
            <DoorOpen className="h-4 w-4" aria-hidden />
            Re-enter the 3D museum
          </button>
        </div>
      ) : null}
    </div>
  );
}

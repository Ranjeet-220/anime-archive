"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { Box, List, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EraDto } from "@/lib/types";
import { TIMELINE_VIEW_KEY, type TwoDimensionalView } from "./scene-types";
import { useSceneSupport } from "./use-scene-support";
import { SceneGate, SceneLoading } from "./scene-shell";

const TimelineSceneCanvas = dynamic(
  () => import("./timeline-scene").then((m) => m.TimelineScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Loading the timeline…" />,
  }
);

export interface TimelineExperienceProps {
  eras: EraDto[];
  studioSlugs: Record<string, string>;
  creatorSlugs: Record<string, string>;
}

/**
 * The /timeline page: a 3D EXPERIENCE / CLASSIC VIEW toggle. The classic
 * view is server-rendered by default (it never blocks content, and it is
 * the 2D fallback); the 3D view mounts only when WebGL is available and
 * reduced motion is not preferred. The choice persists in localStorage.
 */
export function TimelineExperience({
  eras,
  studioSlugs,
  creatorSlugs,
}: TimelineExperienceProps) {
  const { mounted, eligible } = useSceneSupport();
  const [view, setView] = useState<TwoDimensionalView>("2d");
  const [selectedEra, setSelectedEra] = useState<EraDto | null>(null);

  useEffect(() => {
    if (!mounted) return;
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(TIMELINE_VIEW_KEY);
    } catch {
      stored = null;
    }
    const wants3d = stored === "3d" ? eligible : stored === "2d" ? false : eligible;
    if ((wants3d && view !== "3d") || (!wants3d && view !== "2d")) {
      const id = requestAnimationFrame(() => setView(wants3d ? "3d" : "2d"));
      return () => cancelAnimationFrame(id);
    }
    return;
  }, [mounted, eligible, view]);

  const chooseView = useCallback((next: TwoDimensionalView) => {
    try {
      localStorage.setItem(TIMELINE_VIEW_KEY, next);
    } catch {
      // ignore
    }
    setView(next);
    setSelectedEra(null);
  }, []);

  const onSelectEra = useCallback((era: EraDto | null) => setSelectedEra(era), []);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
      {/* Toggle */}
      <div className="mb-8 flex items-center justify-center gap-1 rounded-lg border border-line bg-charcoal p-1" role="group" aria-label="Timeline view">
        <button
          type="button"
          onClick={() => chooseView("3d")}
          disabled={!eligible}
          title={eligible ? undefined : "3D is unavailable on this device"}
          className={cn(
            "inline-flex items-center gap-2 rounded px-4 py-2 font-display text-[11px] uppercase tracking-[0.22em] transition-colors",
            view === "3d"
              ? "bg-crimson-500 text-paper"
              : "text-muted hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
          )}
        >
          <Box className="h-3.5 w-3.5" aria-hidden />
          3D Experience
        </button>
        <button
          type="button"
          onClick={() => chooseView("2d")}
          className={cn(
            "inline-flex items-center gap-2 rounded px-4 py-2 font-display text-[11px] uppercase tracking-[0.22em] transition-colors",
            view === "2d"
              ? "bg-crimson-500 text-paper"
              : "text-muted hover:text-paper"
          )}
        >
          <List className="h-3.5 w-3.5" aria-hidden />
          Classic View
        </button>
      </div>

      {view === "3d" ? (
        <div className="relative">
          <SceneGate label="Loading the timeline…" fallback={<SceneLoading label="Loading the timeline…" />}>
            {({ mode, mobile }) => (
              <TimelineSceneCanvas
                mode={mode}
                mobile={mobile}
                eras={eras}
                studioSlugs={studioSlugs}
                creatorSlugs={creatorSlugs}
                onSelectEra={onSelectEra}
              />
            )}
          </SceneGate>

          {selectedEra ? (
            <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center px-4">
              <div className="flex items-center gap-3 rounded border border-crimson-500 bg-ink/85 px-4 py-2.5 backdrop-blur-sm">
                <p className="font-display text-[11px] uppercase tracking-[0.22em] text-paper">
                  {selectedEra.name} <span className="text-faint">{selectedEra.period}</span>
                </p>
                <Link
                  href={`/timeline/${selectedEra.slug}`}
                  className="rounded bg-crimson-500 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-crimson-400"
                >
                  Open Era Page
                </Link>
                <button
                  type="button"
                  onClick={() => setSelectedEra(null)}
                  aria-label="Dismiss era"
                  className="rounded p-1 text-faint transition-colors hover:text-paper"
                >
                  <X className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </div>
          ) : null}

          <p className="mt-3 text-center text-xs text-faint">
            Drag to orbit · click a node to explore an era ·{" "}
            <button
              type="button"
              onClick={() => chooseView("2d")}
              className="underline underline-offset-2 transition-colors hover:text-crimson-300"
            >
              Switch to Classic View
            </button>
          </p>
        </div>
      ) : (
        <ClassicTimeline eras={eras} />
      )}
    </div>
  );
}

/**
 * The 2D chronological timeline: every era as a vertical block with its
 * anime, built inline (no 3D). Fade-in courtesy of motion/react.
 */
function ClassicTimeline({ eras }: { eras: EraDto[] }) {
  if (!eras.length) {
    return (
      <div className="rounded-lg border border-dashed border-line-2 px-6 py-16 text-center">
        <p className="font-display text-base text-paper">No timeline data found</p>
        <p className="mt-2 text-sm text-muted">Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        className="absolute bottom-0 left-[13px] top-0 w-px bg-gradient-to-b from-crimson-500/60 via-line-2 to-transparent sm:left-[19px]"
        aria-hidden
      />
      <ol className="space-y-10">
        {eras.map((era, i) => (
          <motion.li
            key={era.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.08, 0.5) }}
            className="relative pl-10 sm:pl-14"
          >
            <span
              className="absolute left-0 top-1 flex h-7 w-7 items-center justify-center rounded-full border border-crimson-500 bg-ink font-display text-[10px] text-crimson-300 sm:h-9 sm:w-9 sm:text-[11px]"
              aria-hidden
            >
              {i + 1}
            </span>
            <div className="surface-card p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <Link
                  href={`/timeline/${era.slug}`}
                  className="group font-display text-lg uppercase tracking-[0.14em] text-paper transition-colors hover:text-crimson-300"
                >
                  {era.name}
                </Link>
                <span className="font-display text-[11px] uppercase tracking-[0.18em] text-faint">
                  {era.period}
                </span>
              </div>
              {era.description ? (
                <p className="mt-2 text-sm leading-relaxed text-muted">{era.description}</p>
              ) : null}
              {era.anime?.length ? (
                <ul className="mt-4 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                  {era.anime.map((a) => (
                    <li key={a.slug} className="flex items-baseline justify-between gap-3 text-sm">
                      <Link
                        href={`/anime/${a.slug}`}
                        className="text-paper-2 underline-offset-2 transition-colors hover:text-crimson-300 hover:underline"
                      >
                        {a.title}
                      </Link>
                      <span className="shrink-0 font-display text-xs tabular-nums text-faint">
                        {a.year ?? ""}
                        {a.studio ? <span className="ml-2 hidden text-faint/70 sm:inline">{a.studio}</span> : null}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}
              <Link
                href={`/timeline/${era.slug}`}
                className="mt-4 inline-block font-display text-[11px] uppercase tracking-[0.24em] text-crimson-400 transition-colors hover:text-crimson-300"
              >
                Open era page →
              </Link>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

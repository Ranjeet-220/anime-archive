"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useCallback, useEffect, useState, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Info,
  Maximize,
  Minimize,
  X,
  LogOut,
} from "lucide-react";
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
 * with HUD controls (prev/next, fullscreen, info, exit), an exhibit info panel,
 * and a persistent 2D fallback floor plan.
 */
export function MuseumExperience({ eras }: { eras: EraDto[] }) {
  const { mounted, eligible } = useSceneSupport();
  const [view, setView] = useState<TwoDimensionalView>("2d");
  const [activeRoom, setActiveRoom] = useState(0);
  const [userOpted2d, setUserOpted2d] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

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
      } else if (e.key === "i" || e.key === "I") {
        setShowInfoPanel((prev) => !prev);
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
        <ul className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {eras.map((era, i) => (
            <li key={era.id} className="shrink-0">
              {view === "3d" ? (
                <button
                  type="button"
                  onClick={() => focusRoom(i)}
                  className={cn(
                    "rounded-lg border px-3.5 py-1.5 font-display text-[11px] uppercase tracking-[0.18em] transition-all cursor-pointer",
                    i === activeRoom
                      ? "border-crimson-500 bg-crimson-500/20 text-crimson-400 font-bold shadow-[0_0_12px_rgba(227,38,46,0.3)]"
                      : "border-[#25282C] text-[#8E9099] hover:border-crimson-500/50 hover:text-[#F2F2F2]"
                  )}
                >
                  {era.name}
                  <span className="ml-2 text-[#666A70] text-[10px]">{era.period}</span>
                </button>
              ) : (
                <Link
                  href={`/timeline/${era.slug}`}
                  className="block rounded-lg border border-[#25282C] px-3.5 py-1.5 font-display text-[11px] uppercase tracking-[0.18em] text-[#8E9099] transition-colors hover:border-crimson-500 hover:text-[#F2F2F2]"
                >
                  {era.name}
                  <span className="ml-2 text-[#666A70] text-[10px]">{era.period}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {view === "3d" && eligible ? (
        <div
          ref={containerRef}
          className={cn(
            "relative rounded-2xl overflow-hidden border border-[#25282C] bg-[#07070a]",
            isFullscreen ? "fixed inset-0 z-50 rounded-none border-none h-screen w-screen" : "min-h-[580px]"
          )}
        >
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

          {/* Top Room Header Badge */}
          <div className="absolute inset-x-0 top-4 z-10 flex items-center justify-between gap-2 px-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2">
              <span className="rounded-lg border border-[#25282C] bg-[#0B0D0F]/80 px-3 py-1.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-[#F2F2F2] backdrop-blur-md shadow-md">
                {activeEra ? (
                  <>
                    Room {activeRoom + 1} / {eras.length} · <span className="text-crimson-400">{activeEra.name}</span>{" "}
                    <span className="text-[#8E9099] ml-1">({activeEra.period})</span>
                  </>
                ) : (
                  "Museum Hall"
                )}
              </span>
            </div>

            {/* Quick Actions (Info Toggle & Fullscreen) */}
            <div className="pointer-events-auto flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowInfoPanel((prev) => !prev)}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md",
                  showInfoPanel
                    ? "border-crimson-500 bg-crimson-500 text-white"
                    : "border-[#25282C] bg-[#0B0D0F]/80 text-[#D8D8D8] hover:border-crimson-500 hover:text-white"
                )}
              >
                <Info className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Exhibit Info</span>
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="rounded-lg border border-[#25282C] bg-[#0B0D0F]/80 p-2 text-[#D8D8D8] backdrop-blur-md transition-colors hover:border-crimson-500 hover:text-white cursor-pointer shadow-md"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Exhibit Info Slide-in Drawer */}
          {showInfoPanel && activeEra && (
            <aside className="absolute right-4 top-16 bottom-20 z-20 w-80 sm:w-96 rounded-2xl border border-[#25282C] bg-[#0B0D0F]/95 backdrop-blur-xl p-5 shadow-2xl overflow-y-auto no-scrollbar flex flex-col justify-between animate-in slide-in-from-right duration-300">
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-crimson-400">
                      ROOM {activeRoom + 1} EXHIBIT DOSSIER
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold uppercase text-[#F2F2F2]">
                      {activeEra.name}
                    </h3>
                    <p className="text-xs font-medium text-[#8E9099]">{activeEra.period}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowInfoPanel(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#25282C] text-[#8E9099] hover:text-white hover:bg-[#181B1F] cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {activeEra.description && (
                  <p className="mt-4 text-xs leading-relaxed text-[#B0B0B8]">
                    {activeEra.description}
                  </p>
                )}

                {/* Key Exhibits List in Era */}
                {activeEra.anime && activeEra.anime.length > 0 && (
                  <div className="mt-5">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#8E9099] mb-2.5">
                      FEATURED EXHIBITS IN THIS WING ({activeEra.anime.length})
                    </h4>
                    <div className="space-y-2 max-h-56 overflow-y-auto no-scrollbar">
                      {activeEra.anime.map((a) => (
                        <Link
                          key={a.slug}
                          href={`/anime/${a.slug}`}
                          className="flex items-center justify-between rounded-lg border border-[#25282C] bg-[#111316] p-2.5 hover:border-crimson-500/60 hover:bg-[#16181D] transition-colors group"
                        >
                          <div className="truncate mr-2">
                            <p className="font-display text-xs font-bold text-[#F2F2F2] group-hover:text-crimson-400 truncate">
                              {a.title}
                            </p>
                            <p className="text-[10px] text-[#8E9099]">{a.year ?? "Classic"}</p>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-crimson-400 shrink-0">
                            VIEW →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#25282C]">
                <Link
                  href={`/timeline/${activeEra.slug}`}
                  className="block w-full rounded-lg bg-crimson-500 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_12px_rgba(227,38,46,0.35)] hover:bg-crimson-400 transition-colors"
                >
                  READ COMPLETE ERA HISTORY
                </Link>
              </div>
            </aside>
          )}

          {/* Clean HUD Navigation Bar at Bottom */}
          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center px-4 pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-[#25282C] bg-[#0B0D0F]/90 px-4 py-2.5 backdrop-blur-xl shadow-2xl">
              {/* Previous Room Button */}
              <button
                type="button"
                onClick={() => focusRoom(activeRoom - 1)}
                disabled={activeRoom === 0}
                aria-label="Previous room"
                className="flex items-center gap-1 rounded-lg border border-[#25282C] bg-[#16181D] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F2F2F2] transition-colors hover:border-crimson-500 hover:text-crimson-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Room Indicator */}
              <div className="px-2 text-center">
                <span className="font-mono text-xs font-bold text-crimson-400">
                  {activeRoom + 1}
                </span>
                <span className="font-mono text-xs text-[#666A70]"> / {eras.length}</span>
              </div>

              {/* Next Room Button */}
              <button
                type="button"
                onClick={() => focusRoom(activeRoom + 1)}
                disabled={activeRoom >= eras.length - 1}
                aria-label="Next room"
                className="flex items-center gap-1 rounded-lg border border-[#25282C] bg-[#16181D] px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#F2F2F2] transition-colors hover:border-crimson-500 hover:text-crimson-400 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>

              <div className="h-4 w-px bg-[#25282C] mx-1" />

              {/* Fullscreen Button */}
              <button
                type="button"
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
                className="flex items-center gap-1 rounded-lg border border-[#25282C] bg-[#16181D] px-2.5 py-1.5 text-xs text-[#D8D8D8] hover:border-crimson-500 hover:text-white transition-colors cursor-pointer"
              >
                {isFullscreen ? <Minimize className="h-3.5 w-3.5" /> : <Maximize className="h-3.5 w-3.5" />}
                <span className="hidden md:inline text-[11px] font-bold uppercase">
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                </span>
              </button>

              {/* Exit Museum Button */}
              <button
                type="button"
                onClick={skipTo2d}
                title="Exit 3D Museum"
                className="flex items-center gap-1 rounded-lg border border-crimson-500/30 bg-crimson-500/10 px-2.5 py-1.5 text-xs text-crimson-300 hover:bg-crimson-500 hover:text-white transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden md:inline text-[11px] font-bold uppercase">Exit Museum</span>
              </button>
            </div>
          </div>
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

"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import { SkipForward, ArrowRight, Compass } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { INTRO_SEEN_KEY, type EntranceSceneProps } from "./scene-types";
import { SceneGate, SceneLoading } from "./scene-shell";
import { setLocalFlag, useLocalFlag } from "./use-scene-support";

const EntranceCanvas = dynamic(
  () => import("./museum-entrance-scene").then((m) => m.MuseumEntranceScene),
  {
    ssr: false,
    loading: () => <SceneLoading label="Rendering the entrance…" />,
  }
);

type Reveal = 0 | 1 | 2;

const INTRO_TITLE_AT = 2300;
const INTRO_BUTTONS_AT = 3400;
const INTRO_END_AT = 5600;

/**
 * The homepage hero: a cinematic 3D intro (camera drift through a dark
 * museum hall) with title/tagline/CTA revealed on a timer, a Skip Intro
 * control, and automatic skipping after the first visit. Falls back to a
 * pure 2D hero when WebGL is unavailable or reduced motion is preferred.
 */
export function HomeHero() {
  const introSeen = useLocalFlag(INTRO_SEEN_KEY);
  const intro = !introSeen;
  const [reveal, setReveal] = useState<Reveal>(0);

  const finish = useCallback(() => {
    setLocalFlag(INTRO_SEEN_KEY, true);
    setReveal(2);
  }, []);

  useEffect(() => {
    if (introSeen) return;
    const t1 = setTimeout(() => setReveal(1), INTRO_TITLE_AT);
    const t2 = setTimeout(() => setReveal(2), INTRO_BUTTONS_AT);
    const t3 = setTimeout(finish, INTRO_END_AT);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [introSeen, finish]);

  const showTitle = intro ? reveal >= 1 : true;
  const showButtons = intro ? reveal >= 2 : true;
  const showSkip = intro && reveal < 2;

  return (
    <section
      className="relative flex min-h-[82vh] items-center justify-center overflow-hidden"
      aria-label="Anime Archive — walk through the history of anime"
    >
      {/* 3D background (or static 2D fallback) */}
      <div className="absolute inset-0" aria-hidden>
        <SceneGate label="Rendering the entrance…" fallback={<StaticHeroBackground />}>
          {({ mode, mobile }) => <HeroCanvas mode={mode} mobile={mobile} />}
        </SceneGate>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
        <motion.p
          initial={false}
          animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 8 }}
          transition={{ duration: 0.7 }}
          className="font-display text-[11px] uppercase tracking-[0.42em] text-crimson-400"
        >
          Est. 1917 · A digital museum
        </motion.p>
        <motion.h1
          initial={false}
          animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 14 }}
          transition={{ duration: 0.9 }}
          className="font-display text-5xl font-semibold uppercase tracking-[0.14em] text-paper text-balance sm:text-6xl"
        >
          Anime Archive
        </motion.h1>
        <motion.p
          initial={false}
          animate={{ opacity: showTitle ? 1 : 0, y: showTitle ? 0 : 10 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="max-w-xl text-base text-muted sm:text-lg"
        >
          Walk Through the History of Anime
        </motion.p>
        <motion.div
          initial={false}
          animate={{ opacity: showButtons ? 1 : 0, y: showButtons ? 0 : 12 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-2 flex flex-wrap items-center justify-center gap-3"
        >
          <LinkButton href="/museum" size="lg">
            <Compass className="h-4 w-4" aria-hidden />
            Enter Archive
          </LinkButton>
          <LinkButton href="/anime" size="lg" variant="holo">
            <ArrowRight className="h-4 w-4" aria-hidden />
            Browse Anime
          </LinkButton>
        </motion.div>
      </div>

      {showSkip ? (
        <button
          type="button"
          onClick={finish}
          className="absolute bottom-6 right-6 z-20 inline-flex items-center gap-2 rounded border border-line-2 bg-charcoal/70 px-3 py-2 font-display text-[11px] uppercase tracking-[0.24em] text-muted backdrop-blur-sm transition-colors hover:border-crimson-500 hover:text-crimson-300"
        >
          <SkipForward className="h-3.5 w-3.5" aria-hidden />
          Skip Intro
        </button>
      ) : null}
    </section>
  );
}

function HeroCanvas({ mode, mobile }: EntranceSceneProps) {
  return (
    <div className="absolute inset-0 animate-[hero-fade_1.2s_ease-out]">
      <EntranceCanvas mode={mode} mobile={mobile} />
      <style jsx>{`
        @keyframes hero-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * The static 2D hero shown before hydration and whenever 3D is unavailable:
 * a dark gradient with a faint crimson glow and a museum-like silhouette.
 */
function StaticHeroBackground() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_30%,rgba(200,56,63,0.12),transparent_70%)]">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
      <div
        className="absolute inset-x-0 bottom-0 mx-auto h-40 w-3/4 max-w-3xl rounded-t-lg border-x border-t border-line bg-charcoal/40"
        aria-hidden
      />
      <div
        className="absolute bottom-36 left-1/2 h-24 w-14 -translate-x-1/2 rounded-t border border-line bg-charcoal-2/60"
        aria-hidden
      />
    </div>
  );
}

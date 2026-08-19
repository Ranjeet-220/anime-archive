"use client";

import { useFrame } from "@react-three/fiber";
import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Scanline,
  Sepia,
  SMAA,
  ToneMapping,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction, ToneMappingMode } from "postprocessing";
import type { NoiseEffect } from "postprocessing";
import { useEffect, useRef } from "react";
import type { SceneMode } from "./scene-types";

export type EraVisualKind = "early" | "golden" | "modern" | "neutral";

const EARLY_ERA_SLUGS = new Set(["the-beginning", "television-era"]);
const GOLDEN_ERA_SLUGS = new Set(["golden-age"]);
const MODERN_ERA_SLUGS = new Set(["digital-revolution", "streaming-era"]);

export function eraVisualKind(
  eraSlug: string | null | undefined
): EraVisualKind {
  if (!eraSlug) return "neutral";
  if (EARLY_ERA_SLUGS.has(eraSlug)) return "early";
  if (GOLDEN_ERA_SLUGS.has(eraSlug)) return "golden";
  if (MODERN_ERA_SLUGS.has(eraSlug)) return "modern";
  return "neutral";
}

export interface EraEffectsProps {
  mode: SceneMode;
  eraSlug?: string | null;
}

export function EraEffects({ mode, eraSlug }: EraEffectsProps) {
  if (mode === "PERFORMANCE") return null;

  const kind = eraVisualKind(eraSlug);
  const immersive = mode === "IMMERSIVE";

  return (
    <EffectComposer multisampling={0}>
      {kind === "early" ? (
        immersive ? (
          <>
            <FilmFlicker />
            <Sepia intensity={0.55} blendFunction={BlendFunction.NORMAL} />
            <ChromaticAberration offset={[0.0006, 0.0003]} />
          </>
        ) : (
          <Noise premultiply opacity={0.5} blendFunction={BlendFunction.NORMAL} />
        )
      ) : kind === "golden" ? (
        immersive ? (
          <>
            <Scanline density={1.4} opacity={0.3} blendFunction={BlendFunction.OVERLAY} />
            <Noise premultiply opacity={0.3} blendFunction={BlendFunction.NORMAL} />
            <Bloom
              luminanceThreshold={0.9}
              luminanceSmoothing={0.1}
              intensity={0.4}
              mipmapBlur
              radius={0.8}
            />
          </>
        ) : (
          <Vignette eskil={false} offset={0.4} darkness={0.5} />
        )
      ) : (
        <>
          <Vignette eskil={false} offset={0.4} darkness={0.5} />
          {immersive ? (
            <>
              {kind === "modern" ? <SMAA /> : null}
              <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
            </>
          ) : null}
        </>
      )}
    </EffectComposer>
  );
}

function FilmFlicker() {
  const ref = useRef<NoiseEffect>(null);
  const reducedMotion = useRef(true);

  useEffect(() => {
    reducedMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame(({ clock }) => {
    const noise = ref.current;
    if (!noise || reducedMotion.current) return;
    const t = clock.elapsedTime;
    const flicker = Math.sin(t * 11.3) * Math.sin(t * 5.7 + 1.3);
    noise.blendMode.opacity.value = 0.55 + flicker * 0.4;
  });

  return (
    <Noise ref={ref} premultiply blendFunction={BlendFunction.NORMAL} opacity={0.55} />
  );
}
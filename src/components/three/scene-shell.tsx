"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { Loader2, MonitorOff } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { useSceneSupport } from "./use-scene-support";
import type { SceneMode } from "./scene-types";

export interface SceneCanvasProps {
  mode: SceneMode;
  children: ReactNode;
  cameraPosition?: [number, number, number];
}

/**
 * Shared Canvas configuration for every scene: capped pixel ratio, no
 * antialiasing (crisper text, cheaper), high-performance preference, and
 * shadows only on IMMERSIVE devices.
 */
export function SceneCanvas({
  mode,
  children,
  cameraPosition,
}: SceneCanvasProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: "high-performance" }}
      shadows={mode === "IMMERSIVE"}
      camera={{ fov: 50, position: cameraPosition ?? [0, 2, 10], near: 0.1, far: 120 }}
      style={{ position: "absolute", inset: 0 }}
    >
      {children}
    </Canvas>
  );
}

/**
 * Branded loading overlay shown while a lazy-loaded scene bundle resolves
 * and while the WebGL context initialises.
 */
export function SceneLoading({ label = "Opening the archive…" }: { label?: string }) {
  return (
    <div
      className="flex h-full min-h-[320px] w-full flex-col items-center justify-center gap-4"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="h-6 w-6 animate-spin text-crimson-400" aria-hidden />
      <p className="font-display text-xs uppercase tracking-[0.3em] text-faint">{label}</p>
    </div>
  );
}

export interface SceneUnavailableProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

/**
 * Rendered when WebGL is unavailable or the user prefers reduced motion —
 * an explicit "skip canvas" state with a link to the 2D equivalent.
 */
export function SceneUnavailable({
  title = "3D experience unavailable",
  description = "WebGL could not be initialised on this device, or reduced motion is preferred. The full 2D experience below is identical in content.",
  actionLabel,
  actionHref,
}: SceneUnavailableProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-line-2 bg-charcoal/60 px-6 py-14 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line-2 bg-charcoal text-faint">
        <MonitorOff className="h-5 w-5" aria-hidden />
      </div>
      <h2 className="font-display text-base text-paper">{title}</h2>
      <p className="max-w-sm text-sm text-muted">{description}</p>
      {actionLabel && actionHref ? (
        <LinkButton href={actionHref} variant="outline" size="sm">
          {actionLabel}
        </LinkButton>
      ) : null}
    </div>
  );
}

export interface SceneGateProps {
  label?: string;
  /** Rendered before hydration and whenever 3D is not supported. */
  fallback?: ReactNode;
  children: (ctx: { mode: SceneMode; mobile: boolean }) => ReactNode;
}

/**
 * Shared gate around every WebGL canvas:
 * - never renders the canvas on the server (pre-hydration renders `fallback`)
 * - skips the canvas entirely when WebGL is unavailable or reduced motion is set
 * - wraps the scene in <Suspense> with a branded loading overlay
 */
export function SceneGate({ label, fallback, children }: SceneGateProps) {
  const { mounted, profile, mobile, eligible } = useSceneSupport();

  if (!mounted || !eligible) {
    return fallback ?? <SceneLoading label={label ?? "Preparing the 3D experience…"} />;
  }

  const mode: SceneMode = profile?.mode ?? "BALANCED";

  return (
    <Suspense fallback={<SceneLoading label={label ?? "Rendering the 3D experience…"} />}>
      {children({ mode, mobile })}
    </Suspense>
  );
}

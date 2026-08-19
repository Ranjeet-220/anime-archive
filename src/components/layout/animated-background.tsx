"use client";

import { useSyncExternalStore } from "react";

function subscribe(callback: () => void): () => void {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot(): boolean {
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AnimatedBackground() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => true);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(200,56,63,0.07),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_110%,rgba(47,159,175,0.05),transparent_70%)]" />
      {enabled ? (
        <div className="absolute inset-0 animate-[drift_40s_ease-in-out_infinite_alternate]">
          <div className="absolute left-[15%] top-[30%] h-64 w-64 rounded-full bg-crimson-500/[0.04] blur-3xl" />
          <div className="absolute right-[20%] top-[55%] h-72 w-72 rounded-full bg-holo-500/[0.04] blur-3xl" />
        </div>
      ) : null}
      <style jsx>{`
        @keyframes drift {
          from {
            transform: translate3d(0, 0, 0) scale(1);
          }
          to {
            transform: translate3d(4%, -3%, 0) scale(1.08);
          }
        }
      `}</style>
    </div>
  );
}

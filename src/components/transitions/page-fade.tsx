"use client";

import { motion, type Variants } from "motion/react";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

const MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(MOTION_QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(MOTION_QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Subtle page-enter fade for route content. Honors prefers-reduced-motion
 * by rendering without animation. Not applied globally — pages opt in.
 */
export function PageFade({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/** Variant for single items in a staggered list (use with `staggerList`). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

/** Parent container that staggers `fadeUp` children. */
export const staggerList: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

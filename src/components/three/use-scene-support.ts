"use client";

import { useSyncExternalStore } from "react";
import { detectDeviceProfile, type DeviceProfile } from "@/lib/device-mode";

export interface SceneSupport {
  /** true once the component has hydrated on the client */
  mounted: boolean;
  profile: DeviceProfile | null;
  /** true when the primary pointer is coarse (touch) */
  mobile: boolean;
  /** true when a WebGL canvas may be mounted */
  eligible: boolean;
}

const INITIAL: SceneSupport = {
  mounted: false,
  profile: null,
  mobile: false,
  eligible: false,
};

let clientSupport: SceneSupport | null = null;

function getSnapshot(): SceneSupport {
  if (clientSupport) return clientSupport;
  const profile = detectDeviceProfile();
  const mobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;
  clientSupport = {
    mounted: true,
    profile,
    mobile,
    eligible: profile.webglAvailable && !profile.reducedMotion,
  };
  return clientSupport;
}

function emptySubscribe(): () => void {
  return () => undefined;
}

/**
 * Detects the device profile exactly once, on the client. Returns the
 * SSR placeholder on the server so server markup never mentions WebGL.
 */
export function useSceneSupport(): SceneSupport {
  return useSyncExternalStore(emptySubscribe, getSnapshot, () => INITIAL);
}

// ---------------------------------------------------------------------------
// Local-storage flags (intro seen, view preferences)
// ---------------------------------------------------------------------------

const flagCache = new Map<string, boolean>();
const flagListeners = new Set<() => void>();

function readFlag(key: string): boolean {
  const cached = flagCache.get(key);
  if (cached !== undefined) return cached;
  let seen = true;
  try {
    seen = localStorage.getItem(key) === "1";
  } catch {
    seen = true;
  }
  flagCache.set(key, seen);
  return seen;
}

function subscribeFlags(callback: () => void): () => void {
  flagListeners.add(callback);
  return () => {
    flagListeners.delete(callback);
  };
}

/**
 * Reactively reads a localStorage "1"/absent flag. Any write must go
 * through `setLocalFlag` so subscribed components re-render.
 */
export function useLocalFlag(key: string): boolean {
  return useSyncExternalStore(subscribeFlags, () => readFlag(key), () => true);
}

export function setLocalFlag(key: string, value: boolean): void {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      localStorage.setItem(key, "1");
    } else {
      localStorage.removeItem(key);
    }
  } catch {
    return;
  }
  flagCache.set(key, value);
  flagListeners.forEach((listener) => listener());
}

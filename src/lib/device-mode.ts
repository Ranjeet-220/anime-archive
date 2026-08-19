"use client";

export type DeviceMode = "IMMERSIVE" | "BALANCED" | "PERFORMANCE";

export interface DeviceProfile {
  mode: DeviceMode;
  reducedMotion: boolean;
  webglAvailable: boolean;
  lowPower: boolean;
}

export const DEVICE_MODE_KEY = "aa_device_mode";

export function detectDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") {
    return { mode: "BALANCED", reducedMotion: false, webglAvailable: true, lowPower: false };
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lowPower =
    navigator.hardwareConcurrency !== undefined && navigator.hardwareConcurrency <= 4;

  let webglAvailable = false;
  try {
    const canvas = document.createElement("canvas");
    webglAvailable = Boolean(
      canvas.getContext("webgl2") || canvas.getContext("webgl")
    );
  } catch {
    webglAvailable = false;
  }

  const stored = localStorage.getItem(DEVICE_MODE_KEY) as DeviceMode | null;
  const mode: DeviceMode =
    stored ??
    (reducedMotion || lowPower
      ? "PERFORMANCE"
      : typeof window.matchMedia !== "undefined" &&
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(pointer: fine)").matches
      ? "BALANCED"
      : "IMMERSIVE");

  return { mode, reducedMotion, webglAvailable, lowPower };
}

export function setDeviceMode(mode: DeviceMode): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(DEVICE_MODE_KEY, mode);
}

export function useDeviceProfile(): DeviceProfile {
  if (typeof window === "undefined") return { mode: "BALANCED", reducedMotion: false, webglAvailable: true, lowPower: false };
  return detectDeviceProfile();
}

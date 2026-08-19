"use client";

import { useSyncExternalStore } from "react";
import { Volume2, VolumeX } from "lucide-react";

const SOUND_KEY = "aa_sound";
const listeners = new Set<() => void>();
let cached = false;
let initialized = false;

function readPref(): boolean {
  if (initialized) return cached;
  try {
    cached = localStorage.getItem(SOUND_KEY) === "1";
  } catch {
    cached = false;
  }
  initialized = true;
  return cached;
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

// ---------------------------------------------------------------------------
// Procedural ambient engine (WebAudio). No copyrighted material: a quiet
// filtered-air bed plus a slow detuned drone, mixed well below dialogue.
// The AudioContext is only ever created inside a user gesture.
// ---------------------------------------------------------------------------

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensureEngine(): void {
  if (ctx) return;
  const AC =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // Filtered brown noise — "still air" bed.
  const size = Math.floor(ctx.sampleRate * 2);
  const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  let last = 0;
  for (let i = 0; i < size; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = last * 3.5;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  noise.loop = true;
  const lp1 = ctx.createBiquadFilter();
  lp1.type = "lowpass";
  lp1.frequency.value = 380;
  const lp2 = ctx.createBiquadFilter();
  lp2.type = "lowpass";
  lp2.frequency.value = 1400;
  const noiseGain = ctx.createGain();
  noiseGain.gain.value = 0.4;
  noise.connect(lp1);
  lp1.connect(lp2);
  lp2.connect(noiseGain);
  noiseGain.connect(master);
  noise.start();

  // Detuned sine drone with a slow swell.
  const drone = ctx.createGain();
  drone.gain.value = 0.1;
  const o1 = ctx.createOscillator();
  o1.type = "sine";
  o1.frequency.value = 55;
  const o2 = ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = 55.6;
  o1.connect(drone);
  o2.connect(drone);
  drone.connect(master);
  o1.start();
  o2.start();
  const lfo = ctx.createOscillator();
  lfo.frequency.value = 0.07;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.05;
  lfo.connect(lfoGain);
  lfoGain.connect(drone.gain);
  lfo.start();
}

function setPref(on: boolean): void {
  cached = on;
  initialized = true;
  try {
    if (on) localStorage.setItem(SOUND_KEY, "1");
    else localStorage.removeItem(SOUND_KEY);
  } catch {
    // ignore
  }
  if (on) {
    ensureEngine();
    if (ctx && master) {
      void ctx.resume();
      master.gain.setTargetAtTime(0.05, ctx.currentTime, 0.6);
    }
  } else if (ctx && master) {
    master.gain.setTargetAtTime(0, ctx.currentTime, 0.3);
  }
  listeners.forEach((listener) => listener());
}

/**
 * Ambient sound toggle. OFF by default, per the archive's design contract;
 * the preference is remembered in localStorage. Sound is procedural and
 * plays only while the page is visible — no copyrighted audio is ever used.
 */
export function SoundToggle() {
  const on = useSyncExternalStore(subscribe, readPref, () => false);

  return (
    <button
      type="button"
      onClick={() => setPref(!on)}
      aria-pressed={on}
      aria-label={on ? "Turn ambient sound off" : "Turn ambient sound on"}
      title={on ? "Sound on" : "Sound off"}
      className="inline-flex h-9 w-9 items-center justify-center rounded border border-line text-muted transition-colors hover:border-line-2 hover:text-paper"
    >
      {on ? <Volume2 className="h-4 w-4" aria-hidden /> : <VolumeX className="h-4 w-4" aria-hidden />}
    </button>
  );
}

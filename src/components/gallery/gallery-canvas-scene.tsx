"use client";

import React, { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { GallerySlot } from "./gallery-builder-3d";

export type GalleryTheme = "zen" | "cyberpunk" | "classic" | "synthwave" | "loft";
export type LightingPreset = "warm" | "neon" | "daylight" | "dramatic" | "midnight";

interface SceneProps {
  slots: GallerySlot[];
  selectedSlotId: number;
  theme: GalleryTheme;
  lighting?: LightingPreset;
  onSelectSlot: (id: number) => void;
}

function ArtworkMesh({
  slot,
  isSelected,
  lighting = "warm",
  onSelect,
}: {
  slot: GallerySlot;
  isSelected: boolean;
  lighting?: LightingPreset;
  onSelect: () => void;
}) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    let active = true;
    let currentTex: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();
    loader.load(
      slot.posterUrl,
      (loadedTex) => {
        if (active) {
          loadedTex.colorSpace = THREE.SRGBColorSpace;
          loadedTex.minFilter = THREE.LinearFilter;
          currentTex = loadedTex;
          setTexture(loadedTex);
        } else {
          loadedTex.dispose();
        }
      },
      undefined,
      () => {
        // Fallback: create solid canvas texture
        if (active) {
          const canvas = document.createElement("canvas");
          canvas.width = 300;
          canvas.height = 400;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#111316";
            ctx.fillRect(0, 0, 300, 400);
            ctx.fillStyle = "#E3262E";
            ctx.font = "bold 22px sans-serif";
            ctx.textAlign = "center";
            ctx.fillText(slot.animeTitle, 150, 200);
            const fallbackTex = new THREE.CanvasTexture(canvas);
            currentTex = fallbackTex;
            setTexture(fallbackTex);
          }
        }
      }
    );

    return () => {
      active = false;
      if (currentTex) {
        currentTex.dispose();
      }
    };
  }, [slot.posterUrl, slot.animeTitle]);

  const frameColor =
    slot.frameStyle === "crimson"
      ? "#E3262E"
      : slot.frameStyle === "gold"
      ? "#E6AF2E"
      : slot.frameStyle === "hologram"
      ? "#38bdf8"
      : slot.frameStyle === "bamboo"
      ? "#bfa163"
      : "#181A1E";

  const spotColor =
    lighting === "warm"
      ? "#fff3d6"
      : lighting === "neon"
      ? "#ff4060"
      : lighting === "daylight"
      ? "#f8fafc"
      : lighting === "dramatic"
      ? "#ffffff"
      : "#7dd3fc";

  const spotIntensity = lighting === "dramatic" ? 28 : lighting === "daylight" ? 18 : 22;

  return (
    <group
      position={slot.position}
      rotation={slot.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      {/* Outer Picture Frame Border */}
      <mesh position={[0, 0, -0.04]}>
        <boxGeometry args={[slot.size[0] + 0.16, slot.size[1] + 0.16, 0.08]} />
        <meshStandardMaterial
          color={isSelected ? "#FF3038" : frameColor}
          metalness={slot.frameStyle === "gold" ? 0.85 : slot.frameStyle === "hologram" ? 0.6 : 0.2}
          roughness={slot.frameStyle === "gold" ? 0.25 : slot.frameStyle === "bamboo" ? 0.7 : 0.4}
          emissive={isSelected ? "#E3262E" : slot.frameStyle === "hologram" ? "#0284c7" : "#000000"}
          emissiveIntensity={isSelected ? 0.5 : slot.frameStyle === "hologram" ? 0.3 : 0}
        />
      </mesh>

      {/* Poster Canvas Mesh */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[slot.size[0], slot.size[1]]} />
        {texture ? (
          <meshBasicMaterial map={texture} />
        ) : (
          <meshStandardMaterial color="#1c1f24" />
        )}
      </mesh>

      {/* Directional Spotlamp pointing at the artwork */}
      <pointLight
        position={[0, slot.size[1] / 2 + 0.5, 0.7]}
        intensity={isSelected ? spotIntensity * 1.5 : spotIntensity}
        distance={4.5}
        color={spotColor}
      />
    </group>
  );
}

function RoomGeometry({
  theme,
  lighting = "warm",
}: {
  theme: GalleryTheme;
  lighting?: LightingPreset;
}) {
  const floorColor =
    theme === "zen"
      ? "#16120e"
      : theme === "cyberpunk"
      ? "#07080b"
      : theme === "synthwave"
      ? "#0a0614"
      : theme === "loft"
      ? "#1c1e22"
      : "#121316";

  const wallColor =
    theme === "zen"
      ? "#100e0c"
      : theme === "cyberpunk"
      ? "#040507"
      : theme === "synthwave"
      ? "#06030c"
      : theme === "loft"
      ? "#181a1d"
      : "#16171a";

  const ambientColor =
    lighting === "warm"
      ? "#ffe8cc"
      : lighting === "neon"
      ? "#ff2a4b"
      : lighting === "daylight"
      ? "#e2e8f0"
      : lighting === "dramatic"
      ? "#334155"
      : "#0284c7";

  const ambientIntensity =
    lighting === "dramatic"
      ? 0.25
      : lighting === "daylight"
      ? 0.75
      : theme === "cyberpunk" || theme === "synthwave"
      ? 0.4
      : 0.6;

  const centerLampColor =
    theme === "cyberpunk"
      ? "#e3262e"
      : theme === "synthwave"
      ? "#a855f7"
      : theme === "zen"
      ? "#ffaa44"
      : theme === "loft"
      ? "#38bdf8"
      : "#ffffff";

  return (
    <group>
      {/* Floor with reflective material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial
          color={floorColor}
          roughness={theme === "cyberpunk" || theme === "synthwave" ? 0.1 : 0.3}
          metalness={0.4}
        />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 4.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#0a0a0d" roughness={0.9} />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.25, -5]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 2.25, 0]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Right Wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 2.25, 0]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Front Wall with arch opening */}
      <mesh rotation={[0, Math.PI, 0]} position={[0, 2.25, 5]}>
        <planeGeometry args={[10, 4.5]} />
        <meshStandardMaterial color={wallColor} roughness={0.8} />
      </mesh>

      {/* Ambient Lighting & Central Grand Chandelier Lamp */}
      <ambientLight intensity={ambientIntensity} color={ambientColor} />
      <pointLight position={[0, 4.2, 0]} intensity={30} distance={14} color="#ffffff" />
      <pointLight position={[0, 1.5, 0]} intensity={12} distance={8} color={centerLampColor} />
    </group>
  );
}

export function GalleryCanvasScene({
  slots,
  selectedSlotId,
  theme,
  lighting = "warm",
  onSelectSlot,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 3.6], fov: 65 }}
      style={{ width: "100%", height: "100%", background: "#050607" }}
    >
      <Suspense fallback={null}>
        <RoomGeometry theme={theme} lighting={lighting} />
        {slots.map((slot) => (
          <ArtworkMesh
            key={slot.id}
            slot={slot}
            lighting={lighting}
            isSelected={slot.id === selectedSlotId}
            onSelect={() => onSelectSlot(slot.id)}
          />
        ))}
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.05}
          minPolarAngle={Math.PI / 3}
          maxDistance={5.5}
          minDistance={1.5}
          target={[0, 2.2, 0]}
        />
      </Suspense>
    </Canvas>
  );
}

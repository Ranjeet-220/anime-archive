"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { GallerySlot } from "./gallery-builder-3d";

interface SceneProps {
  slots: GallerySlot[];
  selectedSlotId: number;
  theme: "zen" | "cyberpunk" | "classic";
  onSelectSlot: (id: number) => void;
}

function ArtworkMesh({
  slot,
  isSelected,
  onSelect,
}: {
  slot: GallerySlot;
  isSelected: boolean;
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
      : "#181A1E";

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
          metalness={slot.frameStyle === "gold" ? 0.85 : 0.2}
          roughness={slot.frameStyle === "gold" ? 0.25 : 0.4}
          emissive={isSelected ? "#E3262E" : "#000000"}
          emissiveIntensity={isSelected ? 0.45 : 0}
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
        intensity={isSelected ? 22 : 14}
        distance={4.5}
        color="#fff5e6"
      />
    </group>
  );
}

function RoomGeometry({ theme }: { theme: "zen" | "cyberpunk" | "classic" }) {
  const floorColor = theme === "zen" ? "#16120e" : theme === "cyberpunk" ? "#07080b" : "#121316";
  const wallColor = theme === "zen" ? "#100e0c" : theme === "cyberpunk" ? "#040507" : "#16171a";
  const ambientLightColor = theme === "cyberpunk" ? "#ff2a32" : theme === "zen" ? "#ffe8cc" : "#ffffff";
  const ambientIntensity = theme === "cyberpunk" ? 0.35 : 0.65;

  return (
    <group>
      {/* Floor with reflective material */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color={floorColor} roughness={0.15} metalness={0.4} />
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
      <ambientLight intensity={ambientIntensity} color={ambientLightColor} />
      <pointLight position={[0, 4.2, 0]} intensity={35} distance={14} color="#ffffff" />
      <pointLight position={[0, 1.5, 0]} intensity={10} distance={8} color={theme === "zen" ? "#ffaa44" : "#e3262e"} />
    </group>
  );
}

export function GalleryCanvasScene({
  slots,
  selectedSlotId,
  theme,
  onSelectSlot,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 2.2, 3.6], fov: 65 }}
      style={{ width: "100%", height: "100%", background: "#050607" }}
    >
      <Suspense fallback={null}>
        <RoomGeometry theme={theme} />
        {slots.map((slot) => (
          <ArtworkMesh
            key={slot.id}
            slot={slot}
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

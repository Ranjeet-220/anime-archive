"use client";

import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import * as THREE from "three";
import {
  COLOR_BG,
  COLOR_CRIMSON,
  COLOR_CRIMSON_SOFT,
  COLOR_HOLO,
  COLOR_HOLO_SOFT,
  COLOR_MUTED,
  COLOR_PAPER,
  type GenreWorldSceneProps,
} from "./scene-types";
import { SceneText } from "./scene-bits";
import { SceneCanvas } from "./scene-shell";

const ARC_RADIUS = 7.2;
const ARC_START = -1.15;
const ARC_END = 1.15;

/**
 * The Genre World: one glowing orb per genre, arranged in a loose arc and
 * coloured crimson/holo alternately. Clicking an orb filters the anime
 * archive to that genre.
 */
export function GenreWorldScene({ mode, mobile, genres }: GenreWorldSceneProps) {
  const router = useRouter();

  const orbs = useMemo(() => {
    const n = genres.length;
    if (!n) return [];
    return genres.map((g, i) => {
      const t = n === 1 ? 0.5 : i / (n - 1);
      const angle = ARC_START + (ARC_END - ARC_START) * t;
      return {
        genre: g,
        x: Math.sin(angle) * ARC_RADIUS,
        z: Math.cos(angle) * ARC_RADIUS - ARC_RADIUS * 0.45,
        y: 1.9 + Math.sin(i * 0.9 + 1.2) * 0.55,
        color: i % 2 === 0 ? COLOR_CRIMSON : COLOR_HOLO,
        soft: i % 2 === 0 ? COLOR_CRIMSON_SOFT : COLOR_HOLO_SOFT,
      };
    });
  }, [genres]);

  return (
    <div className="relative h-full min-h-[520px] w-full">
      <SceneCanvas mode={mode} cameraPosition={[0, 2.6, 11.5]}>
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 14, 34]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.4 : 0.3} />
        <pointLight
          position={[0, 6, 2]}
          color="#ffffff"
          intensity={mode === "PERFORMANCE" ? 16 : 32}
          distance={30}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={3}
          maxDistance={18}
          maxPolarAngle={1.5}
          minPolarAngle={0.2}
          target={[0, 2, 0]}
        />

        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, 24]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.95} />
        </mesh>

        <GroupHalo mode={mode} />

        {orbs.map(({ genre, x, z, y, color, soft }) => (
          <GenreOrb
            key={genre.slug}
            mode={mode}
            mobile={mobile}
            genre={genre}
            position={[x, y, z]}
            color={color}
            soft={soft}
            onOpen={() => router.push(`/anime?genre=${genre.slug}`)}
          />
        ))}

        <SceneText
          position={[0, -0.85, 2]}
          fontSize={0.18}
          letterSpacing={0.34}
          color="#56565f"
          anchorX="center"
          anchorY="middle"
        >
          DRAG TO ORBIT · CLICK AN ORB TO EXPLORE A GENRE
        </SceneText>
      </SceneCanvas>

      <div className="pointer-events-none absolute bottom-4 left-4 z-10 flex flex-col gap-2">
        <p className="font-display text-[11px] uppercase tracking-[0.3em] text-faint">
          Genre map legend
        </p>
        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLOR_CRIMSON }}
              aria-hidden
            />
            Crimson orb
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLOR_HOLO }}
              aria-hidden
            />
            Holo orb
          </span>
          <span className="hidden sm:inline">Click an orb to browse its anime</span>
        </div>
      </div>
    </div>
  );
}

function GroupHalo({ mode }: { mode: GenreWorldSceneProps["mode"] }) {
  if (mode === "PERFORMANCE") return null;
  return (
    <mesh position={[0, 1.9, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[ARC_RADIUS - 1.4, ARC_RADIUS - 1.3, 64]} />
      <meshBasicMaterial
        color={COLOR_HOLO}
        transparent
        opacity={0.14}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function GenreOrb({
  mode,
  mobile,
  genre,
  position,
  color,
  soft,
  onOpen,
}: {
  mode: GenreWorldSceneProps["mode"];
  mobile: boolean;
  genre: GenreWorldSceneProps["genres"][number];
  position: [number, number, number];
  color: string;
  soft: string;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = "auto";
        }}
      >
        <sphereGeometry args={[hovered ? 0.88 : 0.78, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={soft}
          emissiveIntensity={mode === "PERFORMANCE" ? 0.35 : hovered ? 1.1 : 0.6}
          roughness={0.35}
          metalness={0.25}
        />
      </mesh>
      <SceneText
        position={[0, -1.35, 0]}
        fontSize={mobile ? 0.24 : 0.19}
        letterSpacing={0.12}
        color={hovered ? COLOR_PAPER : COLOR_MUTED}
        anchorX="center"
        anchorY="middle"
      >
        {genre.name}
      </SceneText>
      <SceneText
        position={[0, -1.75, 0]}
        fontSize={0.13}
        letterSpacing={0.16}
        color={hovered ? soft : "#56565f"}
        anchorX="center"
        anchorY="middle"
      >
        {`${genre.animeCount} ${genre.animeCount === 1 ? "TITLE" : "TITLES"}`}
      </SceneText>
    </group>
  );
}

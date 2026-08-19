"use client";

import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { truncate } from "@/lib/utils";
import {
  COLOR_BG,
  COLOR_CRIMSON,
  COLOR_CRIMSON_SOFT,
  COLOR_HOLO,
  COLOR_MUTED,
  COLOR_PAPER,
  type MuseumSceneProps,
} from "./scene-types";
import { CameraRig, ClickableText, SceneText } from "./scene-bits";
import { SceneCanvas } from "./scene-shell";

const ROOM_SPACING = 12;
const ROOM_WIDTH = 9.2;
const ROOM_HEIGHT = 5.8;
const CAM_DISTANCE = 10.4;
const CAM_HEIGHT = 2.5;

/**
 * The interactive 3D museum: seven translucent era rooms in a line.
 * Clicking a room (or using the prev/next controls in the wrapper) flies
 * the camera to it; each room carries floating, clickable anime exhibits.
 */
export function MuseumScene({
  mode,
  mobile,
  eras,
  activeRoom,
  onFocusRoom,
}: MuseumSceneProps) {
  const router = useRouter();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  const roomX = (i: number) => i * ROOM_SPACING;
  const target = useMemo(
    () => ({
      x: roomX(activeRoom),
      y: CAM_HEIGHT,
      z: CAM_DISTANCE,
    }),
    [activeRoom]
  );

  const visibleRooms = eras.length ? eras : [];

  return (
    <div className="relative h-full min-h-[560px] w-full">
      <SceneCanvas mode={mode} cameraPosition={[target.x, target.y, target.z]}>
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 16, 44]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.45 : 0.3} />
        <pointLight
          position={[target.x, 4.4, 3]}
          color={COLOR_CRIMSON}
          intensity={mode === "PERFORMANCE" ? 16 : 32}
          distance={30}
        />
        {mode === "IMMERSIVE" ? (
          <directionalLight
            position={[6, 9, 6]}
            intensity={0.6}
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
        ) : null}

        <CameraRig
          controlsRef={controlsRef}
          x={target.x}
          y={target.y}
          z={target.z}
          lookX={target.x}
          lookY={1.8}
          lookZ={0}
          trigger={activeRoom}
          speed={4.5}
        />
        <OrbitControls
          ref={controlsRef}
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={4.5}
          maxDistance={mobile ? 22 : 18}
          maxPolarAngle={1.42}
          minPolarAngle={0.3}
          target={[target.x, 1.8, 0]}
        />

        <Floor mode={mode} />

        {visibleRooms.map((era, i) => (
          <Room
            key={era.id}
            mode={mode}
            mobile={mobile}
            era={era}
            x={roomX(i)}
            active={i === activeRoom}
            nearby={Math.abs(i - activeRoom) <= 1}
            onClick={() => onFocusRoom?.(i)}
            onOpenEra={() => router.push(`/timeline/${era.slug}`)}
            onOpenAnime={(slug) => router.push(`/anime/${slug}`)}
          />
        ))}
      </SceneCanvas>
    </div>
  );
}

function Floor({ mode }: { mode: MuseumSceneProps["mode"] }) {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[ROOM_SPACING * 9, 30]} />
      <meshStandardMaterial color={mode === "PERFORMANCE" ? "#0b0b0f" : "#0d0d12"} roughness={0.95} />
    </mesh>
  );
}

interface RoomProps {
  mode: MuseumSceneProps["mode"];
  mobile: boolean;
  era: MuseumSceneProps["eras"][number];
  x: number;
  active: boolean;
  nearby: boolean;
  onClick: () => void;
  onOpenEra: () => void;
  onOpenAnime: (slug: string) => void;
}

function Room({
  mode,
  mobile,
  era,
  x,
  active,
  nearby,
  onClick,
  onOpenEra,
  onOpenAnime,
}: RoomProps) {
  const exhibits = era.anime ?? [];
  const shown = exhibits.slice(0, 7);
  const k = active ? 1 : nearby ? 0.55 : 0.3;

  return (
    <group position={[x, 0, 0]}>
      <ClickablePanel
        active={active}
        k={k}
        onClick={onClick}
        onOpenEra={onOpenEra}
        eraName={era.name}
        period={era.period}
        description={era.description}
        count={era.animeCount}
        mobile={mobile}
      />
      {nearby
        ? shown.map((anime, idx) => (
            <ExhibitCard
              key={anime.slug}
              mode={mode}
              mobile={mobile}
              anime={anime}
              index={idx}
              total={shown.length}
              active={active}
              onOpen={() => onOpenAnime(anime.slug)}
            />
          ))
        : null}
    </group>
  );
}

function ClickablePanel({
  active,
  k,
  onClick,
  onOpenEra,
  eraName,
  period,
  description,
  count,
  mobile,
}: {
  active: boolean;
  k: number;
  onClick: () => void;
  onOpenEra: () => void;
  eraName: string;
  period: string;
  description?: string | null;
  count: number;
  mobile: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const opacity = active ? 0.16 : 0.08;

  return (
    <group>
      <mesh position={[0, 2.5, -0.7]}>
        <planeGeometry args={[ROOM_WIDTH + 1.6, ROOM_HEIGHT + 2.4]} />
        <meshStandardMaterial color="#0c0c11" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>
      <group
        onClick={(e) => {
          e.stopPropagation();
          onClick();
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
        <mesh scale={hovered && active ? 1.01 : 1}>
          <planeGeometry args={[ROOM_WIDTH, ROOM_HEIGHT]} />
          <meshBasicMaterial
            color={active ? COLOR_CRIMSON : COLOR_HOLO}
            transparent
            opacity={opacity * k * (active ? 1.6 : 1)}
            side={THREE.DoubleSide}
          />
        </mesh>
        <lineSegments position={[0, 0, 0.02]}>
          <edgesGeometry args={[new THREE.BoxGeometry(ROOM_WIDTH, ROOM_HEIGHT, 0.04)]} />
          <lineBasicMaterial
            color={active ? COLOR_CRIMSON_SOFT : "#3a3a45"}
            transparent
            opacity={Math.max(0.35, k)}
          />
        </lineSegments>
      </group>

      <SceneText
        position={[0, 4.05, 0.3]}
        fontSize={mobile ? 0.62 : 0.5}
        letterSpacing={0.22}
        color={active ? COLOR_PAPER : COLOR_MUTED}
        anchorX="center"
        anchorY="middle"
      >
        {eraName}
      </SceneText>
      <SceneText
        position={[0, 3.42, 0.3]}
        fontSize={0.24}
        letterSpacing={0.18}
        color={active ? COLOR_CRIMSON_SOFT : COLOR_MUTED}
        anchorX="center"
        anchorY="middle"
      >
        {period}
      </SceneText>
      {description ? (
        <SceneText
          position={[0, 2.62, 0.3]}
          fontSize={mobile ? 0.26 : 0.21}
          color={COLOR_MUTED}
          maxWidth={ROOM_WIDTH - 1.4}
          anchorX="center"
          anchorY="top"
          textAlign="center"
        >
          {truncate(description, 150)}
        </SceneText>
      ) : null}
      <SceneText
        position={[0, 0.9, 0.3]}
        fontSize={0.18}
        letterSpacing={0.24}
        color={active ? COLOR_HOLO : "#56565f"}
        anchorX="center"
        anchorY="middle"
      >
        {count} EXHIBITS
      </SceneText>
      {active ? (
        <ClickableText
          label="READ FULL HISTORY"
          position={[0, 0.32, 0.3]}
          fontSize={0.2}
          letterSpacing={0.26}
          onClick={onOpenEra}
        />
      ) : null}
    </group>
  );
}

interface ExhibitCardProps {
  mode: MuseumSceneProps["mode"];
  mobile: boolean;
  anime: NonNullable<MuseumSceneProps["eras"][number]["anime"]>[number];
  index: number;
  total: number;
  active: boolean;
  onOpen: () => void;
}

function ExhibitCard({ mode, mobile, anime, index, total, active, onOpen }: ExhibitCardProps) {
  const [hovered, setHovered] = useState(false);
  const offset = (index - (total - 1) / 2) * 1.55;
  const x = offset;
  const y = 1.7 + (index % 3) * 0.85;
  const z = 1.15;
  const title = truncate(anime.title, mobile ? 15 : 22);
  const fs = mobile ? 0.17 : 0.14;

  return (
    <group
      position={[x, y, z]}
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
      <mesh scale={hovered ? 1.08 : 1}>
        <boxGeometry args={[mobile ? 1.25 : 1.1, 1.45, 0.08]} />
        <meshStandardMaterial
          color={active ? "#24161a" : "#16161c"}
          emissive={active ? COLOR_CRIMSON : "#000000"}
          emissiveIntensity={mode === "PERFORMANCE" ? 0.25 : hovered ? 0.9 : 0.45}
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      <SceneText
        position={[0, 0.22, 0.08]}
        fontSize={fs}
        color={active ? COLOR_PAPER : COLOR_MUTED}
        maxWidth={1.05}
        anchorX="center"
        anchorY="middle"
        textAlign="center"
      >
        {title}
      </SceneText>
      <SceneText
        position={[0, -0.42, 0.08]}
        fontSize={fs * 0.85}
        letterSpacing={0.12}
        color={active ? COLOR_CRIMSON_SOFT : "#56565f"}
        anchorX="center"
        anchorY="middle"
      >
        {anime.year ? String(anime.year) : ""}
      </SceneText>
    </group>
  );
}

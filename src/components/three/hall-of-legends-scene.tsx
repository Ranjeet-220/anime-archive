"use client";

import { OrbitControls } from "@react-three/drei";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { LinkButton } from "@/components/ui/button";
import {
  COLOR_BG,
  COLOR_CRIMSON,
  COLOR_CRIMSON_SOFT,
  COLOR_HOLO,
  COLOR_MUTED,
  COLOR_PAPER,
  type HallOfLegendsSceneProps,
} from "./scene-types";
import { SceneText } from "./scene-bits";
import { SceneCanvas } from "./scene-shell";

/**
 * The Hall of Legends: a gallery of pedestals, one per director in the
 * archive. Each pedestal carries a glowing name plate and life years and
 * leads to the creator's profile page.
 */
export function HallOfLegendsScene({ mode, mobile, people }: HallOfLegendsSceneProps) {
  const router = useRouter();

  const slots = useMemo(() => {
    const perRow = mobile ? 2 : 4;
    return people.map((p, i) => {
      const row = Math.floor(i / perRow);
      const col = i % perRow;
      const centerCol = col - (perRow - 1) / 2;
      const stagger = row % 2 === 1 ? 0.45 : 0;
      const x = (centerCol + stagger) * 3.6;
      const y = row * 0.45;
      const z = -row * 3.8;
      const curveZ = Math.pow(centerCol, 2) * 0.22;
      const rotationY = centerCol * -0.07;

      return {
        person: p,
        position: [x, y, z - curveZ] as [number, number, number],
        rotationY,
      };
    });
  }, [people, mobile]);

  const depth = Math.max(1, Math.ceil(people.length / (mobile ? 2 : 4)));

  return (
    <div className="relative h-full min-h-[520px] w-full">
      <SceneCanvas
        mode={mode}
        cameraPosition={[0, 2.8 + depth * 0.4, 6.0 + depth * 2.0]}
      >
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 16, 46]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.55 : 0.4} />
        <pointLight
          position={[0, 8, 4]}
          color="#ffffff"
          intensity={mode === "PERFORMANCE" ? 22 : 44}
          distance={45}
        />
        <pointLight
          position={[0, 4, -depth * 2]}
          color={COLOR_CRIMSON}
          intensity={mode === "PERFORMANCE" ? 14 : 28}
          distance={35}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={4}
          maxDistance={28}
          maxPolarAngle={1.45}
          minPolarAngle={0.2}
          target={[0, 1.5 + depth * 0.22, -depth * 1.6]}
        />

        <mesh position={[0, -0.02, -depth * 1.8]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[44, 44]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.95} />
        </mesh>

        {slots.map(({ person, position, rotationY }) => (
          <Pedestal
            key={person.slug}
            mode={mode}
            mobile={mobile}
            person={person}
            position={position}
            rotationY={rotationY}
            onOpen={() => router.push(`/creator/${person.slug}`)}
          />
        ))}

        <SceneText
          position={[0, -0.75, 3.2]}
          fontSize={0.18}
          letterSpacing={0.34}
          color="#56565f"
          anchorX="center"
          anchorY="middle"
        >
          DRAG TO ORBIT · CLICK A PEDESTAL TO EXPLORE
        </SceneText>
      </SceneCanvas>

      <div className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2">
        <LinkButton href="/creators" variant="outline" size="sm">
          VIEW ALL CREATORS
        </LinkButton>
      </div>
    </div>
  );
}

function Pedestal({
  mode,
  mobile,
  person,
  position,
  rotationY,
  onOpen,
}: {
  mode: HallOfLegendsSceneProps["mode"];
  mobile: boolean;
  person: HallOfLegendsSceneProps["people"][number];
  position: [number, number, number];
  rotationY: number;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const lifeSpan =
    person.bornYear && person.diedYear
      ? `${person.bornYear}–${person.diedYear}`
      : person.bornYear
      ? `b. ${person.bornYear}`
      : person.role ?? "CREATOR";

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      <group
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
        {/* Base */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.7, 0.85, 0.2, 24]} />
          <meshStandardMaterial color="#18181e" roughness={0.8} />
        </mesh>

        {/* Main Column */}
        <mesh position={[0, 0.95, 0]} scale={hovered ? 1.03 : 1}>
          <boxGeometry args={[1.3, 1.5, 0.65]} />
          <meshStandardMaterial
            color={hovered ? "#26202a" : "#1a1a20"}
            emissive={COLOR_CRIMSON}
            emissiveIntensity={mode === "PERFORMANCE" ? 0.15 : hovered ? 0.55 : 0.28}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>

        {/* Top Cap */}
        <mesh position={[0, 1.74, 0]}>
          <boxGeometry args={[1.45, 0.08, 0.8]} />
          <meshStandardMaterial color="#22222a" roughness={0.7} />
        </mesh>

        {/* Front Plaque plate */}
        <mesh position={[0, 0.95, 0.33]}>
          <boxGeometry args={[1.15, 1.0, 0.02]} />
          <meshStandardMaterial
            color={hovered ? "#2d2432" : "#121218"}
            roughness={0.5}
            metalness={0.3}
          />
        </mesh>

        {/* Plaque text details */}
        {person.japaneseName ? (
          <SceneText
            position={[0, 1.25, 0.35]}
            fontSize={0.12}
            letterSpacing={0.1}
            color={hovered ? COLOR_HOLO : "#8e8e9c"}
            anchorX="center"
            anchorY="middle"
          >
            {person.japaneseName}
          </SceneText>
        ) : null}

        <SceneText
          position={[0, 0.98, 0.35]}
          fontSize={0.11}
          letterSpacing={0.12}
          color={COLOR_PAPER}
          maxWidth={1.05}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {person.role ?? "DIRECTOR"}
        </SceneText>

        <SceneText
          position={[0, 0.68, 0.35]}
          fontSize={0.1}
          letterSpacing={0.2}
          color={hovered ? COLOR_CRIMSON_SOFT : "#71717a"}
          anchorX="center"
          anchorY="middle"
        >
          EXPLORE CREATOR
        </SceneText>

        {/* Floating Holographic Title & Lifespan */}
        <SceneText
          position={[0, 2.15, 0]}
          fontSize={mobile ? 0.2 : 0.18}
          letterSpacing={0.08}
          color={COLOR_PAPER}
          maxWidth={2.8}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {person.name.toUpperCase()}
        </SceneText>
        <SceneText
          position={[0, 1.88, 0]}
          fontSize={0.12}
          letterSpacing={0.14}
          color={hovered ? COLOR_HOLO : COLOR_MUTED}
          anchorX="center"
          anchorY="middle"
        >
          {lifeSpan}
        </SceneText>
      </group>
    </group>
  );
}

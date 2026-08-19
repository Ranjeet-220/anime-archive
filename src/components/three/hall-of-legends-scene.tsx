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

  const rows = useMemo(() => {
    const perRow = mobile ? 3 : 5;
    return people.map((p, i) => ({
      person: p,
      x: (i % perRow) - (perRow - 1) / 2,
      y: Math.floor(i / perRow),
    }));
  }, [people, mobile]);

  const depth = Math.max(1, Math.floor(people.length / (mobile ? 3 : 5)));
  const defaultLook: [number, number, number] = [0, 1.8, 0];

  return (
    <div className="relative h-full min-h-[520px] w-full">
      <SceneCanvas mode={mode} cameraPosition={[0, 2.1, 6.5 + depth * 1.6]}>
        <color attach="background" args={[COLOR_BG]} />
        <fog attach="fog" args={[COLOR_BG, 12, 34]} />

        <ambientLight intensity={mode === "IMMERSIVE" ? 0.5 : 0.35} />
        <pointLight
          position={[0, 6, 0]}
          color="#ffffff"
          intensity={mode === "PERFORMANCE" ? 20 : 40}
          distance={30}
        />

        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          enablePan={false}
          minDistance={3}
          maxDistance={16}
          maxPolarAngle={1.45}
          minPolarAngle={0.25}
          target={defaultLook}
        />

        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[26, 20]} />
          <meshStandardMaterial color="#0d0d12" roughness={0.95} />
        </mesh>

        {rows.map(({ person, x, y }) => (
          <Pedestal
            key={person.slug}
            mode={mode}
            mobile={mobile}
            person={person}
            position={[x * 2.6, 0, -y * 3.0]}
            onOpen={() => router.push(`/creator/${person.slug}`)}
          />
        ))}

        <SceneText
          position={[0, -0.75, 2]}
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
  onOpen,
}: {
  mode: HallOfLegendsSceneProps["mode"];
  mobile: boolean;
  person: HallOfLegendsSceneProps["people"][number];
  position: [number, number, number];
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const years = [person.bornYear, person.diedYear].filter((y): y is number => y != null);

  return (
    <group position={position}>
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
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.6, 0.75, 0.18, 24]} />
          <meshStandardMaterial color="#18181e" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.85, 0]} scale={hovered ? 1.04 : 1}>
          <boxGeometry args={[0.95, 1.35, 0.6]} />
          <meshStandardMaterial
            color={hovered ? "#26202a" : "#1a1a20"}
            emissive={COLOR_CRIMSON}
            emissiveIntensity={mode === "PERFORMANCE" ? 0.15 : hovered ? 0.55 : 0.28}
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        <mesh position={[0, 1.62, 0]}>
          <boxGeometry args={[1.15, 0.08, 0.8]} />
          <meshStandardMaterial color="#22222a" roughness={0.7} />
        </mesh>
        <SceneText
          position={[0, 1.95, 0]}
          fontSize={mobile ? 0.24 : 0.2}
          letterSpacing={0.1}
          color={COLOR_PAPER}
          maxWidth={2.4}
          anchorX="center"
          anchorY="middle"
          textAlign="center"
        >
          {person.name.toUpperCase()}
        </SceneText>
        <SceneText
          position={[0, 1.55, 0]}
          fontSize={0.14}
          letterSpacing={0.16}
          color={hovered ? COLOR_HOLO : COLOR_MUTED}
          anchorX="center"
          anchorY="middle"
        >
          {years.length ? years.join(" – ") : person.role ?? "DIRECTOR"}
        </SceneText>
      </group>
      <SceneText
        position={[0, 0.14, 0.55]}
        fontSize={0.13}
        letterSpacing={0.24}
        color={hovered ? COLOR_CRIMSON_SOFT : "#56565f"}
        anchorX="center"
        anchorY="middle"
      >
        EXPLORE CREATOR
      </SceneText>
    </group>
  );
}

"use client";

import { useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  COLOR_BG,
  COLOR_BG_2,
  COLOR_CRIMSON,
  COLOR_CRIMSON_SOFT,
  COLOR_HOLO,
  COLOR_MUTED,
  COLOR_PAPER,
  type EntranceSceneProps,
} from "./scene-types";
import { FadeInGroup, ParticleField, SceneText } from "./scene-bits";
import { SceneCanvas } from "./scene-shell";

const HALL_DEPTH = 20;

/**
 * Cinematic intro scene for the homepage: a dark museum hall silhouette
 * receding toward a glowing crimson entrance portal. The camera gently
 * drifts forward on mount and then settles into a near-idle hold.
 */
export function MuseumEntranceScene({ mode }: EntranceSceneProps) {
  return (
    <SceneCanvas mode={mode} cameraPosition={[0, 1.7, 15]}>
      <color attach="background" args={[COLOR_BG]} />
      <fog attach="fog" args={[COLOR_BG, 10, 30]} />

      {mode === "IMMERSIVE" ? <ambientLight intensity={0.4} /> : <ambientLight intensity={0.25} />}
      <pointLight
        position={[0, 3.2, -6]}
        color={COLOR_CRIMSON}
        intensity={mode === "PERFORMANCE" ? 14 : 26}
        distance={26}
      />
      {mode === "IMMERSIVE" ? (
        <directionalLight
          position={[4, 8, 2]}
          intensity={0.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-camera-near={1}
          shadow-camera-far={24}
        />
      ) : null}

      <EntranceCamera mode={mode} />

      {mode !== "PERFORMANCE" ? (
        <ParticleField
          mode={mode}
          x={26}
          y={13}
          z={26}
          color={mode === "IMMERSIVE" ? COLOR_CRIMSON_SOFT : "#7a8f96"}
          size={mode === "BALANCED" ? 0.05 : 0.055}
        />
      ) : null}

      <Hall />
      <EntrancePortal mode={mode} />
      <Floor mode={mode} />
      {mode === "IMMERSIVE" ? <SilhouettePedestals /> : null}
    </SceneCanvas>
  );
}

function EntranceCamera({ mode }: { mode: EntranceSceneProps["mode"] }) {
  const progress = useRef(0);
  const idleT = useRef(0);
  const start = useMemo(() => new THREE.Vector3(0, 1.7, 15), []);
  const end = useMemo(() => new THREE.Vector3(0, 1.65, 8.4), []);

  useFrame((state, delta) => {
    const { camera } = state;
    if (progress.current < 1) {
      progress.current = Math.min(1, progress.current + delta / 4.2);
      const t = easeInOutCubic(progress.current);
      camera.position.lerpVectors(start, end, t);
    } else if (mode !== "PERFORMANCE") {
      idleT.current += delta;
      camera.position.z = end.z + Math.sin(idleT.current * 0.5) * 0.06;
      camera.position.y = end.y + Math.sin(idleT.current * 0.35) * 0.04;
    }
    camera.lookAt(0, 1.9, -4);
  });

  return null;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * The museum hall silhouette: two converging dark walls, ceiling, and a
 * floating exhibit plinth here and there.
 */
function Hall() {
  return (
    <FadeInGroup duration={2.2} from={0.6}>
      <group>
        <mesh position={[0, 2.9, -HALL_DEPTH / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[30, HALL_DEPTH]} />
          <meshStandardMaterial color={COLOR_BG_2} roughness={0.95} metalness={0} />
        </mesh>
        <mesh position={[-9.5, 2.5, -HALL_DEPTH / 2]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[HALL_DEPTH, 7]} />
          <meshStandardMaterial
            color={COLOR_BG_2}
            roughness={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[9.5, 2.5, -HALL_DEPTH / 2]} rotation={[0, -Math.PI / 2, 0]}>
          <planeGeometry args={[HALL_DEPTH, 7]} />
          <meshStandardMaterial
            color={COLOR_BG_2}
            roughness={0.95}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 4.9, -HALL_DEPTH / 2]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[30, HALL_DEPTH]} />
          <meshStandardMaterial color="#0b0b0f" roughness={1} />
        </mesh>
      </group>
    </FadeInGroup>
  );
}

/**
 * The glowing crimson entrance portal at the far end of the hall, with the
 * scene title above it.
 */
function EntrancePortal({ mode }: { mode: EntranceSceneProps["mode"] }) {
  const innerGlow = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!innerGlow.current) return;
    const pulse = 0.8 + Math.sin(state.clock.elapsedTime * 1.4) * 0.2;
    innerGlow.current.scale.setScalar(pulse);
  });

  return (
    <FadeInGroup duration={2.4} from={0.5}>
      <group position={[0, 1.7, -8.2]}>
        <mesh>
          <planeGeometry args={[4.6, 6.2]} />
          <meshBasicMaterial color={mode === "PERFORMANCE" ? "#5a171b" : "#6e1d22"} />
        </mesh>
        <mesh ref={innerGlow} position={[0, 0, 0.05]}>
          <planeGeometry args={[3.2, 4.6]} />
          <meshBasicMaterial color={mode === "PERFORMANCE" ? "#8f2329" : COLOR_CRIMSON} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <planeGeometry args={[1.7, 2.6]} />
          <meshBasicMaterial
            color={mode === "PERFORMANCE" ? COLOR_CRIMSON_SOFT : "#ff9aa0"}
          />
        </mesh>
        <mesh position={[-2.35, 0, 0.08]}>
          <boxGeometry args={[0.28, 6.2, 0.28]} />
          <meshStandardMaterial color="#15151a" roughness={0.7} />
        </mesh>
        <mesh position={[2.35, 0, 0.08]}>
          <boxGeometry args={[0.28, 6.2, 0.28]} />
          <meshStandardMaterial color="#15151a" roughness={0.7} />
        </mesh>
        <mesh position={[0, 3.35, 0.08]}>
          <boxGeometry args={[4.9, 0.32, 0.28]} />
          <meshStandardMaterial color="#15151a" roughness={0.7} />
        </mesh>
        <SceneText
          position={[0, 4.6, 0.4]}
          fontSize={0.5}
          letterSpacing={0.28}
          color={COLOR_PAPER}
          anchorX="center"
          anchorY="middle"
        >
          ANIME ARCHIVE
        </SceneText>
        <SceneText
          position={[0, 3.95, 0.4]}
          fontSize={0.17}
          letterSpacing={0.32}
          color={COLOR_MUTED}
          anchorX="center"
          anchorY="middle"
        >
          WALK THROUGH THE HISTORY OF ANIME
        </SceneText>
        {mode !== "PERFORMANCE" ? (
          <SceneText
            position={[0, -3.1, 0.4]}
            fontSize={0.14}
            letterSpacing={0.2}
            color={COLOR_HOLO}
            anchorX="center"
            anchorY="middle"
          >
            EST. 1917
          </SceneText>
        ) : null}
      </group>
    </FadeInGroup>
  );
}

function Floor({ mode }: { mode: EntranceSceneProps["mode"] }) {
  if (mode === "PERFORMANCE") {
    return (
      <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[34, 26]} />
        <meshStandardMaterial color="#0c0c10" roughness={1} />
      </mesh>
    );
  }
  return (
    <mesh position={[0, 0, -2]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[34, 26]} />
      <MeshReflectorMaterial
        color="#0c0c10"
        resolution={1024}
        mirror={0.45}
        blur={[240, 80]}
        mixBlur={1}
        mixStrength={26}
        roughness={0.9}
        depthScale={1.1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.3}
        metalness={0.4}
      />
    </mesh>
  );
}

function SilhouettePedestals() {
  const pedestals = useMemo(() => {
    return [
      { x: -6.5, z: -11, s: 0.9 },
      { x: 6.2, z: -13, s: 1.1 },
      { x: -4.5, z: -16, s: 0.7 },
      { x: 7.5, z: -7, s: 0.8 },
      { x: -7.8, z: -5, s: 0.6 },
    ];
  }, []);
  return (
    <>
      {pedestals.map((p, i) => (
        <mesh key={i} position={[p.x, p.s * 0.6, p.z]} castShadow>
          <boxGeometry args={[p.s, p.s * 1.2, p.s]} />
          <meshStandardMaterial color="#101014" roughness={0.85} />
        </mesh>
      ))}
    </>
  );
}

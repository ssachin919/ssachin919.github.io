"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import type { Group } from "three";
import * as THREE from "three";

import { brand } from "@/lib/brand";

/** Simplified coastal outline approximating India (normalized plane coords). */
const INDIA_OUTLINE: [number, number, number][] = [
  [0.05, 1.35, 0],
  [0.25, 1.45, 0],
  [0.55, 1.4, 0],
  [0.85, 1.15, 0],
  [1.05, 0.85, 0],
  [1.15, 0.45, 0],
  [1.05, 0.05, 0],
  [0.85, -0.35, 0],
  [0.55, -0.75, 0],
  [0.35, -1.05, 0],
  [0.15, -1.25, 0],
  [-0.05, -1.15, 0],
  [-0.25, -0.85, 0],
  [-0.45, -0.45, 0],
  [-0.65, -0.05, 0],
  [-0.75, 0.35, 0],
  [-0.7, 0.75, 0],
  [-0.45, 1.05, 0],
  [-0.15, 1.25, 0],
  [0.05, 1.35, 0],
].map(([x, y, z]) => [x * 1.35, y * 1.35, z] as [number, number, number]);

export function IndiaGlow({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const group = useRef<Group>(null);
  const ring = useRef<Group>(null);
  const { pointer } = useThree();

  const dots = useMemo(
    () => INDIA_OUTLINE.filter((_, i) => i % 3 === 0),
    []
  );

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.4,
        0.06
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.25,
        0.06
      );
      group.current.rotation.z = scrollProgress * 0.15;
    }
    if (ring.current) {
      ring.current.rotation.z =
        state.clock.elapsedTime * 0.12 + scrollProgress * 1.2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.25} />
      <pointLight position={[2, 2, 3]} intensity={1.2} color={brand.green} />
      <pointLight position={[-3, -1, 2]} intensity={0.6} color="#ffffff" />

      <group ref={group} position={[0.8, 0, 0]}>
        <Line
          points={INDIA_OUTLINE}
          color={brand.green}
          lineWidth={1.5}
          transparent
          opacity={0.9}
        />
        {dots.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshStandardMaterial
              color={brand.green}
              emissive={brand.green}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>

      <group ref={ring} position={[0.8, 0, -0.4]}>
        {[1.6, 2.1, 2.6].map((r) => (
          <mesh key={r} rotation={[Math.PI / 2.4, 0, 0]}>
            <torusGeometry args={[r, 0.008, 8, 96]} />
            <meshBasicMaterial
              color={brand.green}
              transparent
              opacity={0.25}
            />
          </mesh>
        ))}
      </group>
    </>
  );
}

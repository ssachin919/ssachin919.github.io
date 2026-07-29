"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import type { Group, Mesh } from "three";
import * as THREE from "three";

import { brand } from "@/lib/brand";

export function VrindavanTree({
  scrollProgress = 0,
  light = false,
}: {
  scrollProgress?: number;
  light?: boolean;
}) {
  const root = useRef<Group>(null);
  const canopy = useRef<Group>(null);
  const rings = useRef<Group>(null);
  const glow = useRef<Mesh>(null);
  const bloomRef = useRef(0.55);
  const { pointer } = useThree();

  const leafColor = light ? brand.greenMuted : brand.green;

  useFrame((state) => {
    const target =
      0.55 +
      Math.max(0, pointer.x * pointer.x + pointer.y * pointer.y) * 0.55 +
      (light ? 0.15 : 0);
    bloomRef.current = THREE.MathUtils.lerp(bloomRef.current, target, 0.08);

    if (root.current) {
      root.current.rotation.y =
        state.clock.elapsedTime * (light ? 0.06 : 0.1) +
        scrollProgress * Math.PI * 0.5;
    }
    if (canopy.current) {
      const s = 0.75 + bloomRef.current * 0.55;
      canopy.current.scale.setScalar(s);
      canopy.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          const mat = obj.material as THREE.MeshStandardMaterial;
          if (mat.emissiveIntensity !== undefined) {
            mat.emissiveIntensity = 0.15 + bloomRef.current * 0.35;
          }
        }
      });
    }
    if (rings.current) {
      rings.current.rotation.z = -state.clock.elapsedTime * 0.15;
    }
    if (glow.current) {
      glow.current.scale.setScalar(1.2 + bloomRef.current * 0.8);
      const mat = glow.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.04 + bloomRef.current * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight
        position={[1.5, 3, 2]}
        intensity={1.1}
        color={brand.green}
      />
      <pointLight position={[-2, 1, -1]} intensity={0.4} color="#fff8e7" />

      <group ref={root} position={[1.1, -1.1, 0]}>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[0.08, 0.14, 1.2, 10]} />
          <meshStandardMaterial color="#3d2a1a" roughness={0.9} />
        </mesh>

        <group ref={canopy} position={[0, 1.35, 0]}>
          {[
            [0, 0, 0, 0.85],
            [0.45, 0.1, 0.2, 0.55],
            [-0.4, 0.05, -0.15, 0.5],
            [0.15, 0.35, -0.35, 0.45],
            [-0.2, 0.4, 0.3, 0.4],
          ].map(([x, y, z, r], i) => (
            <mesh key={i} position={[x, y, z] as [number, number, number]}>
              <sphereGeometry args={[r as number, 16, 16]} />
              <meshStandardMaterial
                color={leafColor}
                emissive={brand.green}
                emissiveIntensity={0.25}
                roughness={0.55}
              />
            </mesh>
          ))}
        </group>

        <group ref={rings} position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          {[0.7, 1.05, 1.4].map((r, i) => (
            <mesh key={r}>
              <torusGeometry args={[r, 0.012, 8, 64]} />
              <meshBasicMaterial
                color={brand.green}
                transparent
                opacity={0.35 - i * 0.08}
              />
            </mesh>
          ))}
        </group>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <circleGeometry args={[1.6, 48]} />
          <meshBasicMaterial
            color={brand.green}
            transparent
            opacity={0.1}
          />
        </mesh>
      </group>

      <mesh ref={glow} position={[1.1, 0.2, -0.5]}>
        <sphereGeometry args={[1.4, 24, 24]} />
        <meshBasicMaterial color={brand.green} transparent opacity={0.06} />
      </mesh>
    </>
  );
}

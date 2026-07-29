"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type { Group, Mesh } from "three";
import * as THREE from "three";

import { brand } from "@/lib/brand";

const SIZE = 4;
const SPACING = 0.55;

export function CodeLattice({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const nodes = useMemo(() => {
    const list: { key: number; pos: [number, number, number] }[] = [];
    let key = 0;
    for (let x = -SIZE / 2; x <= SIZE / 2; x++) {
      for (let y = -SIZE / 2; y <= SIZE / 2; y++) {
        for (let z = -SIZE / 2; z <= SIZE / 2; z++) {
          if ((x + y + z) % 2 === 0) {
            list.push({
              key: key++,
              pos: [x * SPACING, y * SPACING, z * SPACING],
            });
          }
        }
      }
    }
    return list;
  }, []);

  const edgesGeo = useMemo(
    () =>
      new THREE.EdgesGeometry(
        new THREE.BoxGeometry(SIZE * SPACING, SIZE * SPACING, SIZE * SPACING)
      ),
    []
  );

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y =
      state.clock.elapsedTime * 0.08 + scrollProgress * Math.PI * 0.4;
    group.current.rotation.x = scrollProgress * 0.25;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 4, 2]} intensity={1} color={brand.green} />
      <directionalLight position={[-2, 3, 1]} intensity={0.5} />

      <group ref={group}>
        {nodes.map((node, i) => (
          <LatticeNode
            key={node.key}
            position={node.pos}
            active={hovered === i}
            onHover={(v) => setHovered(v ? i : null)}
          />
        ))}
        <lineSegments geometry={edgesGeo}>
          <lineBasicMaterial color={brand.green} transparent opacity={0.2} />
        </lineSegments>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI * 0.85}
        minPolarAngle={Math.PI * 0.15}
      />
    </>
  );
}

function LatticeNode({
  position,
  active,
  onHover,
}: {
  position: [number, number, number];
  active: boolean;
  onHover: (v: boolean) => void;
}) {
  const mesh = useRef<Mesh>(null);
  const target = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (!mesh.current) return;
    const s = active ? 1.35 : 1;
    target.current.set(s, s, s);
    mesh.current.scale.lerp(target.current, 0.15);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(true);
      }}
      onPointerOut={() => onHover(false)}
    >
      <boxGeometry args={[0.12, 0.12, 0.12]} />
      <meshStandardMaterial
        color={active ? brand.white : brand.green}
        emissive={brand.green}
        emissiveIntensity={active ? 1.2 : 0.25}
        metalness={0.4}
        roughness={0.35}
      />
    </mesh>
  );
}

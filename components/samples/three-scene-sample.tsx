"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls } from "@react-three/drei";
import type { Mesh } from "three";

import { SampleSection } from "@/components/samples/sample-section";
import { brand } from "@/lib/brand";

function FloatingOrb() {
  const mesh = useRef<Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = state.clock.elapsedTime * 0.25;
    mesh.current.rotation.y = state.clock.elapsedTime * 0.35;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.35}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={brand.green}
          attach="material"
          distort={0.35}
          speed={2}
          roughness={0.2}
          metalness={0.4}
          emissive={brand.green}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={[brand.black]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.15} />
      <pointLight position={[-4, -2, -3]} intensity={0.85} color={brand.green} />
      <FloatingOrb />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
    </>
  );
}

export function ThreeSceneSample() {
  return (
    <SampleSection
      id="three-js"
      title="Interactive 3D scene"
      library="Three.js + R3F"
      description="Drag to orbit. Swap the icosahedron for custom models via useGLTF."
    >
      <div className="h-72 w-full overflow-hidden rounded-xl bg-black ring-1 ring-mbb-green/20">
        <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]}>
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Stack: <code>three</code>, <code>@react-three/fiber</code>,{" "}
        <code>@react-three/drei</code>
      </p>
    </SampleSection>
  );
}

"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { cn } from "@/lib/utils";
import { brand } from "@/lib/brand";
import { IndiaGlow } from "./india-glow";
import { CodeLattice } from "./code-lattice";
import { VrindavanTree } from "./vrindavan-tree";

type SceneKind = "india-glow" | "code-lattice" | "vrindavan-tree";

type SceneCanvasProps = {
  scene: SceneKind;
  variant?: "full" | "light";
  className?: string;
  scrollProgress?: number;
};

function SceneInner({
  scene,
  variant,
  scrollProgress,
}: {
  scene: SceneKind;
  variant?: "full" | "light";
  scrollProgress: number;
}) {
  if (scene === "india-glow") {
    return <IndiaGlow scrollProgress={scrollProgress} />;
  }
  if (scene === "code-lattice") {
    return <CodeLattice scrollProgress={scrollProgress} />;
  }
  return (
    <VrindavanTree
      scrollProgress={scrollProgress}
      light={variant === "light"}
    />
  );
}

export function SceneCanvas({
  scene,
  variant = "full",
  className,
  scrollProgress = 0,
}: SceneCanvasProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "25% 0px", threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={hostRef}
      className={cn("pointer-events-auto absolute inset-0", className)}
      aria-hidden
    >
      {visible ? (
        <Canvas
          camera={{ position: [0, 0.4, 5.2], fov: 42 }}
          dpr={[1, 1.5]}
          frameloop={reducedMotion || !visible ? "demand" : "always"}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          <color attach="background" args={[brand.black]} />
          <Suspense fallback={null}>
            <SceneInner
              scene={scene}
              variant={variant}
              scrollProgress={reducedMotion ? 0 : scrollProgress}
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="h-full w-full bg-black/80" />
      )}
    </div>
  );
}

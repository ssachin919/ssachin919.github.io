"use client";

import { useMemo } from "react";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine, ISourceOptions } from "@tsparticles/engine";
import { MoveDirection, OutMode } from "@tsparticles/engine";

import { SampleSection } from "@/components/samples/sample-section";
import { brand } from "@/lib/brand";

async function particlesInit(engine: Engine) {
  await loadSlim(engine);
}

export function ParticlesSample() {
  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: true, mode: "push" },
        },
        modes: {
          repulse: { distance: 100, duration: 0.35 },
          push: { quantity: 3 },
        },
      },
      particles: {
        color: { value: [brand.green, brand.white, brand.greenMuted] },
        links: {
          enable: true,
          color: brand.green,
          distance: 120,
          opacity: 0.3,
          width: 1,
        },
        move: {
          enable: true,
          direction: MoveDirection.none,
          outModes: { default: OutMode.bounce },
          speed: 1.2,
        },
        number: { value: 45, density: { enable: true } },
        opacity: { value: { min: 0.35, max: 0.85 } },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    []
  );

  return (
    <SampleSection
      id="tsparticles"
      title="Particle field"
      library="tsParticles"
      description="Hover to repulse, click to push. Drop this behind heroes or sections."
    >
      <ParticlesProvider init={particlesInit}>
        <div className="relative h-64 overflow-hidden rounded-xl bg-black ring-1 ring-mbb-green/20">
          <Particles
            id="sample-particles"
            className="absolute inset-0"
            options={options}
          />
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="rounded-md border border-mbb-green/30 bg-black/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
              Interactive particles
            </p>
          </div>
        </div>
      </ParticlesProvider>
    </SampleSection>
  );
}

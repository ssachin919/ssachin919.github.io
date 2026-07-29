"use client";

import dynamic from "next/dynamic";

import { FontAwesomeSample } from "@/components/samples/font-awesome-sample";
import { FramerMotionSample } from "@/components/samples/framer-motion-sample";
import { GsapScrollSample } from "@/components/samples/gsap-scroll-sample";
import { EmailJsSample } from "@/components/samples/emailjs-sample";

const ThreeSceneSample = dynamic(
  () =>
    import("@/components/samples/three-scene-sample").then(
      (m) => m.ThreeSceneSample
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
        Loading 3D scene…
      </div>
    ),
  }
);

const ParticlesSample = dynamic(
  () =>
    import("@/components/samples/particles-sample").then(
      (m) => m.ParticlesSample
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-80 items-center justify-center rounded-xl bg-muted text-sm text-muted-foreground">
        Loading particles…
      </div>
    ),
  }
);

const nav = [
  { href: "#font-awesome", label: "Icons" },
  { href: "#framer-motion", label: "Motion" },
  { href: "#three-js", label: "3D" },
  { href: "#gsap", label: "Scroll" },
  { href: "#tsparticles", label: "Particles" },
  { href: "#emailjs", label: "Email" },
];

export function SamplesShowcase() {
  return (
    <div className="relative min-h-full">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-black/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div>
            <p className="text-sm font-bold tracking-tight">
              <span className="text-white">BHAVYA</span>{" "}
              <span className="text-mbb-green">BHARAT</span>
            </p>
            <p className="text-[10px] font-medium tracking-[0.28em] text-mbb-green uppercase">
              Mission toolkit
            </p>
          </div>
          <nav className="flex flex-wrap gap-1">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-mbb-green"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto flex max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6">
        <div className="space-y-4 text-center sm:text-left">
          <div className="flex items-center justify-center gap-3 sm:justify-start">
            <span className="h-px w-8 bg-mbb-green" />
            <p className="text-xs font-medium tracking-[0.35em] text-mbb-green uppercase">
              Mission
            </p>
            <span className="h-px w-8 bg-mbb-green" />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
            <span className="text-white">Project </span>
            <span className="text-mbb-green">Toolkit</span>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-muted-foreground sm:mx-0 sm:text-base">
            Technology{" "}
            <span className="text-mbb-green">•</span> Spirituality{" "}
            <span className="text-mbb-green">•</span> Nation Building
            <br />
            Working samples under{" "}
            <code className="rounded border border-mbb-green/20 bg-muted px-1.5 py-0.5 text-sm text-foreground">
              components/samples/
            </code>
          </p>
        </div>

        <FontAwesomeSample />
        <FramerMotionSample />
        <ThreeSceneSample />
        <GsapScrollSample />
        <ParticlesSample />
        <EmailJsSample />
      </main>
    </div>
  );
}

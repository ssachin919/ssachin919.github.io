"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SampleSection } from "@/components/samples/sample-section";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { title: "Reveal", copy: "Elements fade and rise as they enter the viewport." },
  { title: "Pin", copy: "ScrollTrigger can pin sections while content animates." },
  { title: "Scrub", copy: "Tie progress to scroll for scrubbed timelines." },
];

export function GsapScrollSample() {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from(".gsap-panel", {
        y: 48,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".gsap-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <SampleSection
      id="gsap"
      title="Scroll-triggered motion"
      library="GSAP ScrollTrigger"
      description="Staggered reveals + a scrubbed progress bar tied to scroll position."
    >
      <div ref={rootRef} className="space-y-4">
        <div className="h-1.5 overflow-hidden rounded-full bg-muted">
          <div className="gsap-progress h-full w-full origin-left scale-x-0 rounded-full bg-primary" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {panels.map((panel) => (
            <div
              key={panel.title}
              className="gsap-panel rounded-xl border border-border bg-muted/30 p-4"
            >
              <h3 className="font-medium">{panel.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{panel.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </SampleSection>
  );
}

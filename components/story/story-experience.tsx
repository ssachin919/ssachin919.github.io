"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ChapterRail } from "@/components/story/chapter-rail";
import { ChapterView } from "@/components/story/chapter-view";
import { DivePanelProvider } from "@/components/story/dive-panel-context";
import { DiveSidePanel } from "@/components/story/dive-side-panel";
import { StorySocialLinks } from "@/components/story/story-social-links";
import { person } from "@/lib/brand";
import { storyChapters } from "@/lib/story/chapters";

gsap.registerPlugin(ScrollTrigger);

const MOBILE_MQ = "(max-width: 1023px)";

export function StoryExperience() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState(storyChapters[0]?.id ?? "hero");
  const [sceneProgress, setSceneProgress] = useState<Record<string, number>>(
    {}
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-chapter]")
    );
    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        const top = visible[0];
        if (top?.target instanceof HTMLElement) {
          const id = top.target.dataset.chapter;
          if (id) setActiveId(id);
        }
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      gsap.to(".story-scroll-progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      if (reduced) return;

      root.querySelectorAll<HTMLElement>("[data-chapter]").forEach((section) => {
        const content = section.querySelector(".story-chapter-content");
        if (content) {
          gsap.from(content, {
            y: isMobile ? 20 : 36,
            opacity: 0,
            duration: isMobile ? 0.55 : 0.85,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          });
        }
      });

      const pinIds = storyChapters.filter((c) => c.pin).map((c) => c.id);

      pinIds.forEach((id) => {
        const section = root.querySelector<HTMLElement>(`#${id}`);
        if (!section) return;

        // Skip sticky pins on mobile/tablet — tall pinned sections feel stuck on touch.
        if (isMobile) {
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              setSceneProgress((prev) => ({
                ...prev,
                [id]: self.progress,
              }));
            },
          });
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=90%",
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            setSceneProgress((prev) => ({
              ...prev,
              [id]: self.progress,
            }));
          },
        });

        const panels = section.querySelectorAll(".story-twin-panel");
        if (panels.length) {
          gsap.fromTo(
            panels,
            { y: 40, opacity: 0.25 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.15,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=90%",
                scrub: true,
              },
            }
          );
        }
      });

      storyChapters
        .filter((c) => c.scene && !c.pin)
        .forEach((c) => {
          const section = root.querySelector<HTMLElement>(`#${c.id}`);
          if (!section) return;
          ScrollTrigger.create({
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
            onUpdate: (self) => {
              setSceneProgress((prev) => ({
                ...prev,
                [c.id]: self.progress,
              }));
            },
          });
        });
    }, root);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <DivePanelProvider>
      <div ref={rootRef} className="relative overflow-x-hidden bg-black text-white">
        <ChapterRail activeId={activeId} />
        <main>
          {storyChapters.map((chapter) => (
            <ChapterView
              key={chapter.id}
              chapter={chapter}
              scrollProgress={sceneProgress[chapter.id] ?? 0}
            />
          ))}
        </main>
        <footer className="border-t border-white/10 px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:px-6 lg:pl-28">
          <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center sm:gap-4">
            <p className="font-mono text-xs tracking-[0.12em] text-white/80 sm:tracking-[0.16em]">
              {person.fullName}
            </p>
            <p className="max-w-sm font-mono text-[10px] leading-relaxed tracking-[0.12em] text-muted-foreground uppercase sm:max-w-none sm:tracking-[0.2em]">
              Mission Bhavya Bharat
              <span className="hidden sm:inline">
                {" "}
                · Technology · Spirituality · Nation Building
              </span>
            </p>
            <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground uppercase sm:hidden">
              Technology · Spirituality · Nation Building
            </p>
            <StorySocialLinks compact />
          </div>
        </footer>
        <DiveSidePanel />
      </div>
    </DivePanelProvider>
  );
}

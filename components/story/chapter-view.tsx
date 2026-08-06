"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import { ChapterFrame } from "@/components/story/chapter-frame";
import { ChapterDiveTriggers } from "@/components/story/dive-side-panel";
import {
  HeroAtmosphere,
  ScrollCue,
  Stagger,
  StaggerItem,
} from "@/components/story/motion";
import { StoryContactForm } from "@/components/story/story-contact-form";
import { StorySocialLinks } from "@/components/story/story-social-links";
import type { StoryChapter } from "@/lib/story/chapters";
import { cn } from "@/lib/utils";

const SceneCanvas = dynamic(
  () =>
    import("@/components/story/scenes/scene-canvas").then((m) => m.SceneCanvas),
  { ssr: false }
);

type ChapterViewProps = {
  chapter: StoryChapter;
  scrollProgress?: number;
};

export function ChapterView({ chapter, scrollProgress = 0 }: ChapterViewProps) {
  if (chapter.variant === "hero") {
    return <HeroChapter chapter={chapter} scrollProgress={scrollProgress} />;
  }
  if (chapter.variant === "twin") {
    return <TwinChapter chapter={chapter} />;
  }
  if (chapter.variant === "close") {
    return <CloseChapter chapter={chapter} />;
  }
  if (chapter.variant === "portrait") {
    return <PortraitChapter chapter={chapter} scrollProgress={scrollProgress} />;
  }
  return <DefaultChapter chapter={chapter} scrollProgress={scrollProgress} />;
}

function SceneLayer({
  chapter,
  scrollProgress,
}: {
  chapter: StoryChapter;
  scrollProgress: number;
}) {
  if (!chapter.scene) return null;
  return (
    <div className="absolute inset-0 z-[1] opacity-90">
      <SceneCanvas
        scene={chapter.scene}
        variant={chapter.sceneVariant}
        scrollProgress={scrollProgress}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/25" />
    </div>
  );
}

function MapsLink({ chapter }: { chapter: StoryChapter }) {
  const reduce = useReducedMotion();
  if (!chapter.mapsUrl) return null;
  return (
    <p className="pt-2">
      <motion.a
        href={chapter.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 font-mono text-sm tracking-wide text-mbb-green underline-offset-4 hover:underline"
        whileHover={reduce ? undefined : { x: 3 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
      >
        {chapter.mapsLabel ?? "Open Vrindavan on Google Maps"}
        <motion.span
          aria-hidden
          animate={reduce ? undefined : { x: [0, 3, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.a>
    </p>
  );
}

function HeroChapter({
  chapter,
  scrollProgress,
}: {
  chapter: StoryChapter;
  scrollProgress: number;
}) {
  const reduce = useReducedMotion();
  const avatarSrc =
    chapter.portraitSrc ?? "/pictures/sachin-avatar-circle.webp";

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[100svh] scroll-mt-0 flex-col justify-end overflow-hidden border-b border-white/5 md:justify-center"
    >
      <HeroAtmosphere />
      <SceneLayer chapter={chapter} scrollProgress={scrollProgress} />
      <div className="story-chapter-content relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-28 md:flex-row md:items-center md:gap-14 md:px-10 lg:pl-28">
        <Stagger className="min-w-0 flex-1">
          <StaggerItem>
            <p className="font-mono text-xs tracking-[0.28em] text-mbb-green uppercase">
              Mission
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
              <span className="text-white">Bhavya </span>
              <span className="text-mbb-green">Bharat</span>
            </h1>
          </StaggerItem>
          {chapter.bodyExtra ? (
            <StaggerItem>
              <p className="mt-4 text-sm tracking-wide text-white/80 md:text-base">
                {chapter.bodyExtra}
              </p>
            </StaggerItem>
          ) : null}
          <StaggerItem>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
              {chapter.body}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              {chapter.ctaHref ? <ScrollCue href={chapter.ctaHref} /> : null}
              <StorySocialLinks />
            </div>
          </StaggerItem>
          <StaggerItem>
            <ChapterDiveTriggers chapterId={chapter.id} />
          </StaggerItem>
        </Stagger>

        <motion.div
          className="relative mx-auto h-40 w-40 shrink-0 sm:h-48 sm:w-48 md:mx-0 md:h-56 md:w-56 lg:h-64 lg:w-64"
          animate={reduce ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-mbb-green/20 blur-2xl" />
          <Image
            src={avatarSrc}
            alt="Sachin Anand"
            fill
            priority
            className="rounded-full object-cover"
            sizes="(max-width: 768px) 192px, 256px"
          />
        </motion.div>
      </div>
    </section>
  );
}

function DefaultChapter({
  chapter,
  scrollProgress,
}: {
  chapter: StoryChapter;
  scrollProgress: number;
}) {
  return (
    <ChapterFrame
      id={chapter.id}
      eyebrow={chapter.eyebrow}
      title={chapter.title}
      className={cn(chapter.scene && "md:min-h-[110svh]")}
      background={
        <SceneLayer chapter={chapter} scrollProgress={scrollProgress} />
      }
    >
      <p>{chapter.body}</p>
      {chapter.bodyExtra ? <p>{chapter.bodyExtra}</p> : null}
      <MapsLink chapter={chapter} />
      <ChapterDiveTriggers chapterId={chapter.id} />
    </ChapterFrame>
  );
}

function PortraitChapter({
  chapter,
  scrollProgress,
}: {
  chapter: StoryChapter;
  scrollProgress: number;
}) {
  const reduce = useReducedMotion();

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[120svh] scroll-mt-4 flex-col justify-center overflow-hidden border-b border-white/5 md:min-h-[140svh]"
    >
      <SceneLayer chapter={chapter} scrollProgress={scrollProgress} />
      <div className="story-chapter-content relative z-10 mx-auto grid w-full max-w-5xl items-center gap-10 px-6 py-24 md:grid-cols-[minmax(0,1fr)_220px] md:px-10 lg:pl-28">
        <div>
          {chapter.eyebrow ? (
            <p className="font-mono text-xs tracking-[0.18em] text-mbb-green uppercase">
              {chapter.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {chapter.body}
          </p>
          <div className="mt-4">
            <MapsLink chapter={chapter} />
          </div>
          <ChapterDiveTriggers chapterId={chapter.id} />
        </div>
        {chapter.portraitSrc ? (
          <motion.div
            className="relative mx-auto aspect-square w-44 overflow-hidden rounded-full md:w-56 lg:w-64"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduce ? undefined : { scale: 1.03 }}
          >
            <div className="absolute inset-0 rounded-full bg-mbb-green/15 blur-xl" />
            <Image
              src={chapter.portraitSrc}
              alt="Sachin Anand"
              fill
              className="rounded-full object-cover"
              sizes="256px"
            />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}

function TwinChapter({ chapter }: { chapter: StoryChapter }) {
  const twin = chapter.twin;
  const reduce = useReducedMotion();
  if (!twin) return null;

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[140svh] scroll-mt-4 flex-col justify-center overflow-hidden border-b border-white/5"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(57,181,74,0.12),transparent_55%),radial-gradient(ellipse_at_80%_60%,rgba(57,181,74,0.08),transparent_50%)]" />
      <div className="story-chapter-content relative z-10 mx-auto w-full max-w-5xl px-6 py-24 md:px-10 lg:pl-28">
        {chapter.eyebrow ? (
          <p className="font-mono text-xs tracking-[0.18em] text-mbb-green uppercase">
            {chapter.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-2xl font-heading text-3xl font-semibold tracking-tight text-white md:text-4xl lg:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-5 max-w-2xl text-base text-muted-foreground md:text-lg">
          {chapter.body}
        </p>

        <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-16">
          {[twin.left, twin.right].map((block) => (
            <motion.div
              key={block.name}
              className="story-twin-panel space-y-3"
              whileHover={
                reduce
                  ? undefined
                  : { y: -4, transition: { type: "spring", stiffness: 350, damping: 24 } }
              }
            >
              <h3 className="font-heading text-2xl font-semibold text-white md:text-3xl">
                {block.name}
              </h3>
              <p className="font-mono text-xs tracking-[0.14em] text-mbb-green uppercase">
                {block.tagline}
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {block.body}
              </p>
              <p className="pt-2">
                <motion.a
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-sm tracking-wide text-mbb-green underline-offset-4 hover:underline"
                  whileHover={reduce ? undefined : { x: 4 }}
                >
                  {block.hrefLabel}
                  <span aria-hidden>→</span>
                </motion.a>
              </p>
            </motion.div>
          ))}
        </div>
        <ChapterDiveTriggers chapterId={chapter.id} />
      </div>
    </section>
  );
}

function CloseChapter({ chapter }: { chapter: StoryChapter }) {
  const reduce = useReducedMotion();

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[120svh] scroll-mt-4 flex-col justify-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,181,74,0.16),transparent_60%)]" />
      <div className="story-chapter-content relative z-10 mx-auto w-full max-w-3xl px-6 py-24 md:px-10 lg:pl-28">
        {chapter.eyebrow ? (
          <p className="font-mono text-xs tracking-[0.18em] text-mbb-green uppercase">
            {chapter.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          {chapter.body}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          {chapter.cvHref ? (
            <motion.a
              href={chapter.cvHref}
              download
              className="inline-flex font-mono text-sm tracking-[0.14em] text-mbb-green uppercase underline-offset-4 hover:underline"
              whileHover={reduce ? undefined : { x: 3 }}
            >
              {chapter.ctaLabel ?? "Download CV"} →
            </motion.a>
          ) : null}
          <StorySocialLinks />
        </div>
        <ChapterDiveTriggers chapterId={chapter.id} />
        <StoryContactForm />
      </div>
    </section>
  );
}

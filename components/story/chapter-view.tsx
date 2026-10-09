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
import { StorySocialLinks } from "@/components/story/story-social-links";
import { person } from "@/lib/brand";
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

function BookCoverVisual({
  book,
  className,
}: {
  book: NonNullable<StoryChapter["book"]>;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (book.coverSrc) {
    return (
      <motion.a
        href={book.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "relative mx-auto block aspect-[3/4] w-40 shrink-0 sm:w-48 md:mx-0 md:w-56 lg:w-64",
          className
        )}
        aria-label={`${book.title} — ${book.hrefLabel}`}
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={reduce ? undefined : { y: -4, rotate: -1 }}
      >
        <div className="absolute -inset-4 rounded-lg bg-mbb-green/20 blur-2xl" />
        <Image
          src={book.coverSrc}
          alt={`${book.title}: ${book.subtitle}`}
          fill
          priority
          className="rounded-sm object-cover shadow-[0_24px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/15"
          sizes="(max-width: 640px) 160px, (max-width: 768px) 192px, 256px"
        />
      </motion.a>
    );
  }

  return (
    <motion.a
      href={book.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative mx-auto block w-[9.5rem] shrink-0 perspective-[900px] sm:w-44 md:mx-0 md:w-52 lg:w-60",
        className
      )}
      aria-label={`${book.title} — ${book.hrefLabel}`}
      animate={reduce ? undefined : { y: [0, -8, 0] }}
      transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      whileHover={reduce ? undefined : { y: -4 }}
    >
      <div className="absolute -inset-6 rounded-full bg-mbb-green/25 blur-3xl" />
      <div
        className={cn(
          "relative aspect-[2/3] origin-left rounded-sm bg-[#0c120e] shadow-[0_28px_70px_rgba(0,0,0,0.65)] ring-1 ring-white/12",
          "transition-transform duration-500 ease-out",
          !reduce && "group-hover:[transform:rotateY(-12deg)_rotateZ(-1deg)]"
        )}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Spine edge */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-0 w-2.5 rounded-l-sm bg-gradient-to-b from-mbb-green via-mbb-green-muted to-[#1a3d22]"
        />
        <div
          aria-hidden
          className="absolute inset-y-3 left-2.5 w-px bg-white/10"
        />
        <div className="flex h-full flex-col justify-between py-6 pr-4 pl-5 sm:py-7 sm:pr-5 sm:pl-6">
          <div>
            <p className="font-mono text-[0.55rem] tracking-[0.22em] text-mbb-green uppercase sm:text-[0.65rem]">
              Kindle edition
            </p>
            <p className="mt-4 font-heading text-xl leading-tight font-extrabold tracking-tight text-white sm:text-2xl md:text-[1.65rem]">
              {book.title}
            </p>
            <p className="mt-3 text-[0.65rem] leading-snug text-white/55 sm:text-xs">
              {book.subtitle}
            </p>
          </div>
          <div>
            <div className="mb-3 h-px w-10 bg-mbb-green/70" />
            <p className="font-mono text-[0.6rem] tracking-[0.12em] text-white/70 sm:text-xs">
              {person.fullName}
            </p>
          </div>
        </div>
      </div>
    </motion.a>
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
  const book = chapter.book;
  const avatarSrc =
    chapter.portraitSrc ?? "/pictures/sachin-avatar-circle.webp";

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[100svh] scroll-mt-14 flex-col justify-end overflow-hidden border-b border-white/5 md:justify-center lg:scroll-mt-0"
    >
      <HeroAtmosphere />
      <SceneLayer chapter={chapter} scrollProgress={scrollProgress} />
      <div className="story-chapter-content relative z-10 mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pb-20 pt-28 sm:gap-10 sm:px-6 md:flex-row md:items-center md:gap-14 md:px-10 lg:pl-28">
        <Stagger className="min-w-0 flex-1">
          <StaggerItem>
            <p className="font-mono text-xs tracking-[0.2em] text-mbb-green uppercase sm:tracking-[0.28em]">
              Mission
            </p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-3 font-heading text-[2.35rem] leading-[1.1] font-extrabold tracking-tight sm:mt-4 sm:text-4xl md:text-6xl lg:text-7xl">
              <span className="text-white">Bhavya </span>
              <span className="text-mbb-green">Bharat</span>
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-3 font-mono text-sm tracking-[0.08em] text-white/70 sm:text-base">
              {person.fullName}
            </p>
          </StaggerItem>
          {book ? (
            <StaggerItem>
              <p className="mt-4 max-w-xl text-sm tracking-wide text-white/85 sm:text-base md:text-lg">
                <span className="font-heading font-semibold text-white">
                  {book.title}
                </span>
                <span className="text-white/40"> — </span>
                <span className="text-white/75">{book.subtitle}</span>
              </p>
            </StaggerItem>
          ) : chapter.bodyExtra ? (
            <StaggerItem>
              <p className="mt-4 text-sm tracking-wide text-white/80 md:text-base">
                {chapter.bodyExtra}
              </p>
            </StaggerItem>
          ) : null}
          <StaggerItem>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:mt-6 sm:text-lg md:text-xl">
              {chapter.body}
            </p>
          </StaggerItem>
          <StaggerItem>
            <div className="mt-8 flex flex-col gap-5 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-4">
              {book ? (
                <motion.a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm bg-mbb-green px-5 font-mono text-sm tracking-[0.14em] text-black uppercase"
                  whileHover={reduce ? undefined : { scale: 1.02 }}
                  whileTap={reduce ? undefined : { scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {book.hrefLabel}
                  <span aria-hidden>→</span>
                </motion.a>
              ) : null}
              {chapter.ctaHref ? (
                <ScrollCue
                  href={chapter.ctaHref}
                  label={chapter.ctaLabel}
                />
              ) : null}
              <StorySocialLinks />
            </div>
          </StaggerItem>
          <StaggerItem>
            <ChapterDiveTriggers chapterId={chapter.id} />
          </StaggerItem>
        </Stagger>

        {book ? (
          <BookCoverVisual book={book} />
        ) : (
          <motion.div
            className="relative mx-auto h-36 w-36 shrink-0 sm:h-48 sm:w-48 md:mx-0 md:h-56 md:w-56 lg:h-64 lg:w-64"
            animate={reduce ? undefined : { y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute inset-0 rounded-full bg-mbb-green/20 blur-2xl" />
            <Image
              src={avatarSrc}
              alt={person.fullName}
              fill
              priority
              className="rounded-full object-cover"
              sizes="(max-width: 640px) 144px, (max-width: 768px) 192px, 256px"
            />
          </motion.div>
        )}
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
      className="relative flex min-h-[100svh] scroll-mt-14 flex-col justify-center overflow-hidden border-b border-white/5 md:min-h-[140svh] lg:scroll-mt-0"
    >
      <SceneLayer chapter={chapter} scrollProgress={scrollProgress} />
      <div className="story-chapter-content relative z-10 mx-auto grid w-full max-w-5xl items-center gap-8 px-4 py-20 sm:gap-10 sm:px-6 md:grid-cols-[minmax(0,1fr)_220px] md:px-10 md:py-24 lg:pl-28">
        <div className="min-w-0">
          {chapter.eyebrow ? (
            <p className="font-mono text-xs tracking-[0.14em] text-mbb-green uppercase sm:tracking-[0.18em]">
              {chapter.eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
            {chapter.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg">
            {chapter.body}
          </p>
          <div className="mt-4">
            <MapsLink chapter={chapter} />
          </div>
          <ChapterDiveTriggers chapterId={chapter.id} />
        </div>
        {chapter.portraitSrc ? (
          <motion.div
            className="relative mx-auto aspect-square w-36 overflow-hidden rounded-full sm:w-44 md:w-56 lg:w-64"
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={reduce ? undefined : { scale: 1.03 }}
          >
            <div className="absolute inset-0 rounded-full bg-mbb-green/15 blur-xl" />
            <Image
              src={chapter.portraitSrc}
              alt={person.fullName}
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 640px) 144px, 256px"
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
      className="relative flex min-h-[100svh] scroll-mt-14 flex-col justify-center overflow-hidden border-b border-white/5 md:min-h-[140svh] lg:scroll-mt-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(57,181,74,0.12),transparent_55%),radial-gradient(ellipse_at_80%_60%,rgba(57,181,74,0.08),transparent_50%)]" />
      <div className="story-chapter-content relative z-10 mx-auto w-full max-w-5xl px-4 py-20 sm:px-6 md:px-10 md:py-24 lg:pl-28">
        {chapter.eyebrow ? (
          <p className="font-mono text-xs tracking-[0.14em] text-mbb-green uppercase sm:tracking-[0.18em]">
            {chapter.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-2xl font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-4 max-w-2xl text-base text-muted-foreground sm:mt-5 md:text-lg">
          {chapter.body}
        </p>

        <div className="mt-10 grid gap-10 sm:mt-14 md:grid-cols-2 md:gap-16">
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
              <h3 className="font-heading text-xl font-semibold text-white sm:text-2xl md:text-3xl">
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
                  className="inline-flex min-h-11 items-center gap-1 font-mono text-sm tracking-wide text-mbb-green underline-offset-4 hover:underline"
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
  const book = chapter.book;

  return (
    <section
      id={chapter.id}
      data-chapter={chapter.id}
      className="relative flex min-h-[100svh] scroll-mt-14 flex-col justify-center overflow-hidden lg:scroll-mt-0"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,181,74,0.16),transparent_60%)]" />
      <div className="story-chapter-content relative z-10 mx-auto w-full max-w-3xl px-4 py-20 sm:px-6 md:px-10 md:py-24 lg:pl-28">
        {chapter.eyebrow ? (
          <p className="font-mono text-xs tracking-[0.14em] text-mbb-green uppercase sm:tracking-[0.18em]">
            {chapter.eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-5xl">
          {chapter.title}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:mt-5 md:text-lg">
          {chapter.body}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-8">
          {book ? (
            <motion.a
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 font-mono text-sm tracking-wide text-mbb-green underline-offset-4 hover:underline"
              whileHover={reduce ? undefined : { x: 4 }}
            >
              {book.title} on Amazon
              <span aria-hidden>→</span>
            </motion.a>
          ) : null}
          <StorySocialLinks />
        </div>
        <ChapterDiveTriggers chapterId={chapter.id} />
      </div>
    </section>
  );
}

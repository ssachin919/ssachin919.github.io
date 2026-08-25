"use client";

import { cn } from "@/lib/utils";

type ChapterFrameProps = {
  id: string;
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
  background?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  minHeight?: string;
};

export function ChapterFrame({
  id,
  eyebrow,
  title,
  children,
  background,
  className,
  contentClassName,
  minHeight = "min-h-[100svh]",
}: ChapterFrameProps) {
  return (
    <section
      id={id}
      data-chapter={id}
      className={cn(
        "relative flex scroll-mt-14 flex-col justify-center overflow-hidden border-b border-white/5 lg:scroll-mt-0",
        minHeight,
        className
      )}
    >
      {background}
      <div
        className={cn(
          "story-chapter-content relative z-10 mx-auto w-full max-w-3xl px-4 py-16 pt-24 sm:px-6 md:px-10 md:py-20 md:pt-20 lg:max-w-4xl lg:pl-28",
          contentClassName
        )}
      >
        {eyebrow ? (
          <p className="font-mono text-xs tracking-[0.14em] text-mbb-green uppercase sm:tracking-[0.18em]">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          {title}
        </h2>
        <div className="mt-5 space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { railChapters } from "@/lib/story/chapters";

type ChapterRailProps = {
  activeId: string;
};

export function ChapterRail({ activeId }: ChapterRailProps) {
  const reduce = useReducedMotion();

  return (
    <>
      <nav
        aria-label="Journey chapters"
        className="pointer-events-none fixed top-1/2 left-4 z-40 hidden -translate-y-1/2 lg:block xl:left-8"
      >
        <ol className="pointer-events-auto flex flex-col gap-3">
          {railChapters.map((ch) => {
            const active = ch.id === activeId;
            return (
              <li key={ch.id}>
                <motion.a
                  href={`#${ch.id}`}
                  className={cn(
                    "group flex items-center gap-3 text-left",
                    active
                      ? "text-mbb-green"
                      : "text-muted-foreground hover:text-white"
                  )}
                  whileHover={reduce ? undefined : { x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                  <motion.span
                    className={cn(
                      "relative h-2 w-2 shrink-0 rounded-full",
                      active ? "bg-mbb-green" : "bg-white/25 group-hover:bg-white/50"
                    )}
                    animate={
                      active && !reduce
                        ? {
                            scale: [1, 1.35, 1],
                            boxShadow: [
                              "0 0 0 rgba(57,181,74,0)",
                              "0 0 12px rgba(57,181,74,0.7)",
                              "0 0 8px rgba(57,181,74,0.45)",
                            ],
                          }
                        : { scale: 1 }
                    }
                    transition={
                      active
                        ? { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.2 }
                    }
                  />
                  <span
                    className={cn(
                      "font-mono text-[10px] tracking-[0.14em] uppercase transition-opacity duration-200",
                      active
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-70"
                    )}
                  >
                    {ch.railLabel}
                  </span>
                </motion.a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="fixed top-0 right-0 left-0 z-40 lg:hidden">
        <div className="h-0.5 bg-white/10">
          <div
            className="story-scroll-progress h-full origin-left scale-x-0 bg-mbb-green"
            style={{ transformOrigin: "left center" }}
          />
        </div>
        <div className="flex items-center justify-between bg-black/70 px-4 py-2 backdrop-blur-sm">
          <p className="font-mono text-[10px] tracking-[0.16em] text-mbb-green uppercase">
            Mission Bhavya Bharat
          </p>
          <motion.p
            key={activeId}
            initial={reduce ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase"
          >
            {railChapters.find((c) => c.id === activeId)?.railLabel ?? ""}
          </motion.p>
        </div>
      </div>
    </>
  );
}

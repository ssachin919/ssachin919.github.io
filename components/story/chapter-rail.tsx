"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";
import { railChapters } from "@/lib/story/chapters";

type ChapterRailProps = {
  activeId: string;
};

export function ChapterRail({ activeId }: ChapterRailProps) {
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  function goToChapter() {
    setMenuOpen(false);
  }

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
        <div className="flex items-center justify-between gap-3 bg-black/80 px-3 py-2.5 backdrop-blur-md pt-[max(0.625rem,env(safe-area-inset-top))]">
          <p className="min-w-0 truncate font-mono text-[11px] tracking-[0.12em] text-mbb-green uppercase">
            Mission Bhavya Bharat
          </p>
          <div className="flex shrink-0 items-center gap-2">
            <motion.p
              key={activeId}
              initial={reduce ? false : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="hidden font-mono text-[11px] tracking-wider text-muted-foreground uppercase sm:block"
            >
              {railChapters.find((c) => c.id === activeId)?.railLabel ?? ""}
            </motion.p>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10"
              aria-label="Open chapter menu"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close chapter menu"
              className="fixed inset-0 z-50 bg-black/70 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              aria-label="Journey chapters"
              className="fixed inset-y-0 right-0 z-50 flex w-[min(100%,20rem)] flex-col border-l border-white/10 bg-[#0a0a0a] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] lg:hidden"
              initial={reduce ? false : { x: "100%" }}
              animate={{ x: 0 }}
              exit={reduce ? undefined : { x: "100%" }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 340, damping: 34 }
              }
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <p className="font-mono text-[11px] tracking-[0.14em] text-mbb-green uppercase">
                  Chapters
                </p>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
                  aria-label="Close chapter menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <ol className="flex-1 overflow-y-auto px-3 py-3">
                {railChapters.map((ch) => {
                  const active = ch.id === activeId;
                  return (
                    <li key={ch.id}>
                      <a
                        href={`#${ch.id}`}
                        onClick={goToChapter}
                        className={cn(
                          "flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 font-mono text-sm tracking-[0.1em] uppercase transition-colors",
                          active
                            ? "bg-mbb-green/10 text-mbb-green"
                            : "text-muted-foreground hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <span
                          className={cn(
                            "h-2 w-2 shrink-0 rounded-full",
                            active ? "bg-mbb-green" : "bg-white/25"
                          )}
                        />
                        {ch.railLabel}
                      </a>
                    </li>
                  );
                })}
              </ol>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

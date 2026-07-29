"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useDivePanel } from "@/components/story/dive-panel-context";
import { chapterDiveMap, diveDeeps } from "@/lib/story/dive-deeps";
import { cn } from "@/lib/utils";

function useFineHover() {
  const fine = useRef(false);
  useEffect(() => {
    fine.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
  }, []);
  return fine;
}

export function DiveSidePanel() {
  const {
    openId,
    closeAll,
    openDive,
    setSidebarHovered,
    cancelPendingClose,
  } = useDivePanel();
  const open = Boolean(openId);
  const reduce = useReducedMotion();
  const dive = openId ? diveDeeps[openId] : null;

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAll();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeAll]);

  return (
    <>
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-40 bg-black/25 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
        aria-hidden
      />

      <motion.aside
        className="fixed top-0 right-0 z-50 flex h-full w-[min(100%,28rem)] flex-col border-l border-white/10 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-md sm:max-w-lg"
        initial={false}
        animate={{ x: open ? 0 : "100%" }}
        transition={
          reduce
            ? { duration: 0 }
            : { type: "spring", stiffness: 320, damping: 34 }
        }
        aria-hidden={!open}
        aria-label="Dive deeper details"
        onMouseEnter={() => {
          cancelPendingClose();
          setSidebarHovered(true);
        }}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.18em] text-mbb-green uppercase">
              Dive deeper
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Hover to explore · leave to close
            </p>
          </div>
          <motion.button
            type="button"
            onClick={closeAll}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Close panel"
            whileHover={reduce ? undefined : { rotate: 90 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <X className="h-4 w-4" />
          </motion.button>
        </header>

        <div className="flex-1 overflow-y-auto px-4 py-4">
          <AnimatePresence mode="wait" initial={false}>
            {dive ? (
              <motion.article
                key={dive.id}
                initial={
                  reduce ? false : { opacity: 0, y: 12, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduce
                    ? undefined
                    : { opacity: 0, y: -8, scale: 0.98 }
                }
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                className="rounded-lg border border-white/10 bg-black/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {dive.eyebrow ? (
                      <p className="font-mono text-[10px] tracking-[0.16em] text-mbb-green uppercase">
                        {dive.eyebrow}
                      </p>
                    ) : null}
                    <h3 className="mt-1 font-heading text-lg font-semibold text-white">
                      {dive.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={closeAll}
                    className="shrink-0 rounded p-1.5 text-muted-foreground hover:bg-white/5 hover:text-white"
                    aria-label={`Close ${dive.title}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {dive.summary}
                </p>

                <div className="mt-4 space-y-4">
                  {dive.sections.map((section, i) => (
                    <div key={`${dive.id}-${i}`}>
                      {section.heading ? (
                        <h4 className="font-heading text-sm font-medium text-white">
                          {section.heading}
                        </h4>
                      ) : null}
                      {section.body ? (
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {section.body}
                        </p>
                      ) : null}
                      {section.bullets?.length ? (
                        <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                          {section.bullets.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      ) : null}
                      {section.tags?.length ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {section.tags.map((tag) => (
                            <motion.span
                              key={tag}
                              className="border border-mbb-green/25 bg-mbb-green/5 px-2 py-0.5 font-mono text-[10px] tracking-wide text-mbb-green"
                              whileHover={
                                reduce ? undefined : { scale: 1.05 }
                              }
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {dive.links?.length ? (
                  <div className="mt-4 flex flex-wrap gap-3 border-t border-white/10 pt-3">
                    {dive.links.map((link) => {
                      const isDive = link.href.startsWith("#dive:");
                      const nestedId = isDive
                        ? link.href.replace("#dive:", "")
                        : null;
                      if (isDive && nestedId) {
                        return (
                          <button
                            key={link.href}
                            type="button"
                            onClick={() => openDive(nestedId)}
                            className="font-mono text-[11px] tracking-wide text-mbb-green underline-offset-4 hover:underline"
                          >
                            {link.label} →
                          </button>
                        );
                      }
                      return (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-[11px] tracking-wide text-mbb-green underline-offset-4 hover:underline"
                        >
                          {link.label} →
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </motion.article>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.aside>
    </>
  );
}

export function DiveTrigger({
  diveId,
  label = "Dive deeper",
  className,
}: {
  diveId: string;
  label?: string;
  className?: string;
}) {
  const {
    openDive,
    isOpen,
    scheduleClose,
    cancelPendingClose,
  } = useDivePanel();
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fineHover = useFineHover();
  const active = isOpen(diveId);
  const dive = diveDeeps[diveId];
  if (!dive) return null;

  function clearOpenDelay() {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  }

  function onEnter() {
    cancelPendingClose();
    if (!fineHover.current) return;
    clearOpenDelay();
    hoverTimer.current = setTimeout(() => openDive(diveId), 160);
  }

  function onLeave() {
    clearOpenDelay();
    // Only auto-close from pointer hover paths (desktop)
    if (fineHover.current) {
      // Grace period to reach the right sidebar
      scheduleClose(420);
    }
  }

  return (
    <motion.button
      type="button"
      onClick={() => {
        cancelPendingClose();
        openDive(diveId);
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={cn(
        "group inline-flex items-center gap-2 border border-mbb-green/30 bg-mbb-green/5 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-mbb-green uppercase transition-colors hover:border-mbb-green/60 hover:bg-mbb-green/10",
        active && "border-mbb-green/70 bg-mbb-green/15",
        className
      )}
      aria-pressed={active}
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
    >
      <motion.span
        className="h-1.5 w-1.5 rounded-full bg-mbb-green"
        animate={active ? { scale: [1, 1.4, 1] } : { scale: 1 }}
        transition={
          active
            ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
            : { duration: 0.2 }
        }
      />
      {label}
    </motion.button>
  );
}

export function ChapterDiveTriggers({ chapterId }: { chapterId: string }) {
  const entry = chapterDiveMap[chapterId];
  if (!entry) return null;

  const chips = [
    { id: entry.primary, label: "Dive deeper" },
    ...(entry.related ?? []).map((id) => ({
      id,
      label: diveDeeps[id]?.title ?? id,
    })),
  ];

  const seen = new Set<string>();
  const unique = chips.filter((c) => {
    if (seen.has(c.id)) return false;
    seen.add(c.id);
    return Boolean(diveDeeps[c.id]);
  });

  return (
    <motion.div
      className="mt-6 flex flex-wrap gap-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {unique.map((chip) => (
        <motion.div
          key={chip.id}
          variants={{
            hidden: { opacity: 0, y: 8 },
            show: { opacity: 1, y: 0 },
          }}
        >
          <DiveTrigger diveId={chip.id} label={chip.label} />
        </motion.div>
      ))}
    </motion.div>
  );
}

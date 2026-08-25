"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  className,
  delay = 0,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduce ? 0 : 0.08,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "a" | "button" | "li";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[Tag];
  return (
    <Comp
      className={cn("inline-block", className)}
      whileHover={reduce ? undefined : { y: -2, scale: 1.02 }}
      whileTap={reduce ? undefined : { scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </Comp>
  );
}

/** Soft animated atmosphere for hero (replaces cover photo). */
export function HeroAtmosphere() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_70%_40%,rgba(57,181,74,0.14),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_15%_80%,rgba(57,181,74,0.1),transparent_55%)]" />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse at center, black 20%, transparent 75%)",
        }}
      />

      {!reduce ? (
        <>
          <motion.div
            className="absolute top-[18%] right-[12%] h-40 w-40 rounded-full bg-mbb-green/20 blur-[70px] sm:h-72 sm:w-72 sm:blur-[90px]"
            animate={{
              x: [0, 28, -12, 0],
              y: [0, -18, 14, 0],
              scale: [1, 1.08, 0.96, 1],
            }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[10%] left-[8%] h-32 w-32 rounded-full bg-mbb-green/15 blur-[60px] sm:h-56 sm:w-56 sm:blur-[80px]"
            animate={{
              x: [0, -20, 16, 0],
              y: [0, 22, -10, 0],
              opacity: [0.5, 0.8, 0.55, 0.5],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 h-px w-[min(85vw,520px)] -translate-x-1/2 origin-left bg-gradient-to-r from-transparent via-mbb-green/40 to-transparent"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
          />
        </>
      ) : (
        <div className="absolute top-[20%] right-[15%] h-40 w-40 rounded-full bg-mbb-green/15 blur-[60px] sm:h-64 sm:w-64 sm:blur-[80px]" />
      )}
    </div>
  );
}

export function ScrollCue({ href }: { href: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={href}
      className="inline-flex items-center gap-2 font-mono text-sm tracking-[0.16em] text-mbb-green uppercase"
      whileHover={reduce ? undefined : { y: 2 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      Begin the journey
      <motion.span
        aria-hidden
        animate={reduce ? undefined : { y: [0, 4, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ↓
      </motion.span>
    </motion.a>
  );
}

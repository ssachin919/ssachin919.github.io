"use client";

import { motion, useReducedMotion } from "framer-motion";

import { socialLinks } from "@/lib/story/chapters";
import { cn } from "@/lib/utils";

type StorySocialLinksProps = {
  className?: string;
  compact?: boolean;
};

export function StorySocialLinks({
  className,
  compact = false,
}: StorySocialLinksProps) {
  const reduce = useReducedMotion();

  return (
    <ul
      className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}
    >
      {socialLinks.map((link) => (
        <li key={link.href}>
          <motion.a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative font-mono tracking-[0.14em] text-mbb-green uppercase",
              compact ? "text-[10px]" : "text-xs"
            )}
            whileHover={reduce ? undefined : { y: -1 }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
          >
            {link.label}
            <motion.span
              className="absolute right-0 -bottom-0.5 left-0 h-px origin-left bg-mbb-green"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.25 }}
            />
          </motion.a>
        </li>
      ))}
    </ul>
  );
}

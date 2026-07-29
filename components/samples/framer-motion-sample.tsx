"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { SampleSection } from "@/components/samples/sample-section";

export function FramerMotionSample() {
  const [expanded, setExpanded] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <SampleSection
      id="framer-motion"
      title="Micro interactions"
      library="Framer Motion"
      description="Hover spring, tap scale, and layout animations for UI polish."
    >
      <div className="flex flex-wrap items-center gap-6">
        <motion.div
          whileHover={{ scale: 1.06, rotate: -2 }}
          whileTap={{ scale: 0.96 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="flex size-24 cursor-pointer items-center justify-center rounded-xl bg-primary text-sm font-medium text-primary-foreground"
        >
          Hover / tap
        </motion.div>

        <div className="space-y-3">
          <Button onClick={() => setLiked((v) => !v)} variant="secondary">
            <motion.span
              key={liked ? "liked" : "like"}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 20 }}
            >
              {liked ? "♥ Liked" : "♡ Like"}
            </motion.span>
          </Button>

          <Button
            variant="outline"
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "Collapse" : "Expand"} panel
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="mt-4 overflow-hidden"
          >
            <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              Expand/collapse with height + opacity. Reuse this pattern for
              accordions, drawers, and toast stacks.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SampleSection>
  );
}

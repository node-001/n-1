"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down";
}

export function ScrollReveal({
  children,
  className,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.98", "end 0.02"],
  });

  // Fade in/out very close to edges
  // 0-0.03: Fade in at bottom edge
  // 0.03-0.97: Fully visible
  // 0.97-1.0: Fade out at top edge
  const opacity = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], [0, 1, 1, 0]);

  // Y translation based on direction
  // "up" = content comes from below (default)
  // "down" = content drifts in from above
  const yValues =
    direction === "down" ? [-10, 0, 0, 10] : [10, 0, 0, -10];
  const y = useTransform(scrollYProgress, [0, 0.03, 0.97, 1], yValues);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

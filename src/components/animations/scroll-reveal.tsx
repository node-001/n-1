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
    offset: ["start 0.9", "end 0.1"],
  });

  // Fade in/out at the edges
  // 0-0.1: Fade in quickly at bottom edge
  // 0.1-0.9: Fully visible
  // 0.9-1.0: Fade out quickly at top edge
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Y translation based on direction
  // "up" = content comes from below (default)
  // "down" = content drifts in from above
  const yValues =
    direction === "down" ? [-20, 0, 0, 20] : [20, 0, 0, -20];
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], yValues);

  return (
    <motion.div ref={ref} style={{ opacity, y }} className={className}>
      {children}
    </motion.div>
  );
}

"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in as element enters from bottom, fade out as it exits at top
  // 0-0.3: Fade in (0 → 1)
  // 0.3-0.55: Fully visible (1)
  // 0.55-0.85: Fade out (1 → 0)
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.85], [0, 1, 1, 0]);

  // Slight Y translation for smooth parallax effect
  const y = useTransform(scrollYProgress, [0, 0.3, 0.55, 0.85], [50, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

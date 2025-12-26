"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowPulseProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowPulse({
  children,
  className,
  glowColor = "hsl(var(--primary) / 0.3)",
}: GlowPulseProps) {
  return (
    <motion.div
      className={className}
      animate={{
        boxShadow: [
          `0 0 20px 0px ${glowColor}`,
          `0 0 40px 10px ${glowColor}`,
          `0 0 20px 0px ${glowColor}`,
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

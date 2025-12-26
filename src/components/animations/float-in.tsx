"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export function FloatIn({
  children,
  delay = 0,
  duration = 0.8,
  className,
}: FloatInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

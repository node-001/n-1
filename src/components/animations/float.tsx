"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  distance?: number;
  delay?: number;
}

export function Float({
  children,
  className,
  duration = 4,
  distance = 10,
  delay = 0,
}: FloatProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-distance / 2, distance / 2, -distance / 2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

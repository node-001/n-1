"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BlurInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function BlurIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
}: BlurInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}

"use client";
import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  duration?: number;
}

export default function FadeUp({
  children,
  delay = 0,
  className = "",
  duration = 0.65,
}: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
      transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

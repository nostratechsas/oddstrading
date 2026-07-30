"use client";

import { motion } from "framer-motion";

export interface RiseProps {
  children: React.ReactNode;
  /** Stagger step — each unit delays entry by 60 ms. */
  step?: number;
  className?: string;
}

/** Section entrance: a quick fade-up on mount, staggered across the grid. */
export function Rise({ children, step = 0, className }: RiseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: step * 0.06, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

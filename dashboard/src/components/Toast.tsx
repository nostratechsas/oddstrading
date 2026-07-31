"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

import { useDashboard } from "@/lib/store";

/** Bottom-right confirmation for actions that have no visible side effect. */
export function Toast() {
  const { toast } = useDashboard();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed right-5 bottom-14 z-50 flex items-center gap-2.5 rounded-xl border border-line-strong bg-rail px-4 py-2.5 text-sm shadow-[0_12px_40px_rgb(0_0_0/0.6)]"
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-up-soft">
            <Check className="h-3 w-3 text-up" aria-hidden="true" />
          </span>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen flex flex-col pb-28">
        {/* Main Content Animation */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="flex-grow"
        >
          {children}
        </motion.div>

        {/* Transition Wipe (Exiting page) */}
        <motion.div
          className="fixed inset-y-0 left-0 w-full bg-[var(--ink)] z-[9999] pointer-events-none origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 0 }}
          exit={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
        />

        {/* Transition Wipe (Entering page) */}
        <motion.div
          className="fixed inset-y-0 left-0 w-full bg-[var(--ink)] z-[9999] pointer-events-none origin-right"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1], delay: 0.1 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

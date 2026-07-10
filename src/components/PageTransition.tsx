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

        {/* Transition Gate Overlays (Exiting page) */}
        {/* Left Gate Panel */}
        <motion.div
          className="fixed inset-y-0 left-0 w-1/2 bg-ink-2 z-[9999] pointer-events-none border-r border-sky/10"
          initial={{ x: "-100%" }}
          animate={{ x: "-100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Right Gate Panel */}
        <motion.div
          className="fixed inset-y-0 right-0 w-1/2 bg-ink-2 z-[9999] pointer-events-none border-l border-sky/10"
          initial={{ x: "100%" }}
          animate={{ x: "100%" }}
          exit={{ x: "0%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />

        {/* Transition Gate Overlays (Entering page) */}
        {/* Left Gate Panel sliding out */}
        <motion.div
          className="fixed inset-y-0 left-0 w-1/2 bg-ink-2 z-[9999] pointer-events-none border-r border-sky/10"
          initial={{ x: "0%" }}
          animate={{ x: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />
        {/* Right Gate Panel sliding out */}
        <motion.div
          className="fixed inset-y-0 right-0 w-1/2 bg-ink-2 z-[9999] pointer-events-none border-l border-sky/10"
          initial={{ x: "0%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        />
      </motion.div>
    </AnimatePresence>
  );
}

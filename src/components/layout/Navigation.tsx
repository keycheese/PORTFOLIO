"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/sections";

export default function Navigation() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id as (typeof sections)[number]["id"]);
          }
        });
      },
      { threshold: 0.5 }
    );

    elements.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Website section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex"
    >
      {sections.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3 focus:outline-none clickable-card"
            aria-current={isActive}
          >
            <span
              className={`stamp-label whitespace-nowrap text-[var(--dusk-2)] transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0 bg-white"
                  : "opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
              }`}
            >
              {s.navLabel}
            </span>
            <span className="relative flex h-4 w-4 items-center justify-center">
              {isActive && (
                <motion.div
                  layoutId="nav-active-stars"
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute -top-2 text-[var(--static)] text-[8px]">✦</motion.span>
                  <motion.span animate={{ rotate: -360 }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="absolute -bottom-1 -left-2 text-[var(--sky)] text-[6px]">✦</motion.span>
                  <motion.span animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute top-1 -right-2 text-[var(--dusk)] text-[10px]">✦</motion.span>
                </motion.div>
              )}
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? "bg-[var(--dusk)]" : "bg-[var(--dusk)]/30 group-hover:bg-[var(--dusk)]/60"
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

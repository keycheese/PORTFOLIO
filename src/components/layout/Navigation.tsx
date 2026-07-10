"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { sections } from "@/lib/sections";

/**
 * Side dot-nav cố định bên phải màn hình.
 * Dùng IntersectionObserver để biết section nào đang active,
 * click vào dot => scrollIntoView tới section tương ứng.
 * Đây là chỗ "dẫn dắt user qua từng trang" — luôn cho biết đang ở đâu, còn bao nhiêu phần.
 */
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
      aria-label="Điều hướng các phần trang web"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
    >
      {sections.map((s) => {
        const isActive = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => scrollTo(s.id)}
            className="group flex items-center gap-3 focus:outline-none"
            aria-current={isActive}
          >
            {/* Label chỉ hiện khi active hoặc hover — tránh rối mắt */}
            <span
              className={`stamp-label whitespace-nowrap text-[--sky-deep] transition-all duration-300 ${
                isActive
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2 group-hover:opacity-70 group-hover:translate-x-0"
              }`}
            >
              {s.navLabel}
            </span>
            <span className="relative flex h-3 w-3 items-center justify-center">
              {isActive && (
                <motion.span
                  layoutId="nav-active-ring"
                  className="absolute inset-0 rounded-full border border-[--sky-deep]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  style={{ width: 12, height: 12 }}
                />
              )}
              <span
                className={`h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? "bg-[--sky-deep]" : "bg-[--sky-deep]/30"
                }`}
              />
            </span>
          </button>
        );
      })}
    </nav>
  );
}

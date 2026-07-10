"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { SiteSection } from "@/lib/sections";

interface Props {
  section: SiteSection;
  children: ReactNode;
}

/**
 * Khung dùng chung cho 5 section: Học vấn, Dự án, Ngoại khoá, Kinh nghiệm, Sở thích.
 * Mỗi section = 1 "trang" full-viewport, có tem nhãn kiểu vé + tiêu đề lớn,
 * nội dung con (children) do từng section tự định nghĩa (timeline, grid thẻ, v.v).
 */
export default function SectionWrapper({ section, children }: Props) {
  return (
    <section
      id={section.id}
      className="scroll-section flex flex-col justify-center px-6 py-24 md:px-16 lg:px-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-10 flex items-center gap-4"
      >
        <span className="stamp-label">{section.stamp}</span>
        <span className="h-px flex-1 bg-[--sky-deep]/20" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
        className="mb-12 max-w-3xl font-[--font-display] text-4xl leading-tight text-[--ink-navy] md:text-6xl"
      >
        {section.title}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

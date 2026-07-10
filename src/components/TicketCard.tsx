"use client";

import { motion } from "framer-motion";
import React from "react";

interface TicketCardProps {
  code: string; // e.g., "2023 - 2026" or "PRJ-01"
  tag: string;  // e.g., "Đại học", "Freelance", "Design"
  title: string;
  subtitle?: string;
  description: string | React.ReactNode;
  accentPoint?: boolean; // Tối đa 1 điểm nhấn hồng static trên trang
}

export default function TicketCard({
  code,
  tag,
  title,
  subtitle,
  description,
  accentPoint = false,
}: TicketCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="ticket-edge p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch select-none"
    >
      {/* Outer edge cutouts for the card */}
      <div className="ticket-cutout-left" />
      <div className="ticket-cutout-right" />

      {/* LEFT COLUMN: Cuống vé (Stub) */}
      <div className="relative flex flex-col justify-between items-start pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-dashed border-sky/35 md:pr-8 min-w-[140px] md:max-w-[200px]">
        {/* Inner divider cutout circles (Only on desktop when it splits side-by-side) */}
        <div className="hidden md:block absolute -top-[45px] -right-[45px] w-6 h-6 rounded-full bg-ink border-b border-sky/35" />
        <div className="hidden md:block absolute -bottom-[45px] -right-[45px] w-6 h-6 rounded-full bg-ink border-t border-sky/35" />

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-sky/60 tracking-widest uppercase">
            {code}
          </span>
          <span className="stamp-label inline-block self-start font-mono text-[10px] text-signal border-signal bg-signal/5">
            {tag}
          </span>
        </div>

        <div className="hidden md:block font-mono text-[9px] text-sky/40 tracking-wider mt-4">
          BOARDING PASS // STUB
        </div>
      </div>

      {/* RIGHT COLUMN: Nội dung chính */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-2xl font-bold text-mist tracking-tight flex items-center gap-2">
              {title}
              {accentPoint && (
                <span className="w-2 h-2 rounded-full bg-static animate-pulse inline-block" title="Highlight" />
              )}
            </h3>
            {subtitle && (
              <span className="font-mono text-xs text-sky/70 uppercase tracking-wide">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm md:text-base text-sky-soft/85 leading-relaxed font-sans">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

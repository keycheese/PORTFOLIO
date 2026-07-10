"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useRef, MouseEvent, useState } from "react";

interface TicketCardProps {
  code: string; // e.g., "2023 - 2026" or "PRJ-01"
  tag: string;  // e.g., "Đại học", "Freelance", "Design"
  title: string;
  subtitle?: string;
  description: string | React.ReactNode;
  accentPoint?: boolean; // Tối đa 1 điểm nhấn tĩnh trên trang
}

export default function TicketCard({
  code,
  tag,
  title,
  subtitle,
  description,
  accentPoint = false,
}: TicketCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="card-ticket clickable-card p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-stretch select-none group transition-shadow duration-300 hover:shadow-[4px_4px_12px_rgba(26,39,68,0.1)] mb-6 cursor-none"
    >
      {/* Sticky Tape / Note detail */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-[var(--mist)]/80 backdrop-blur-sm border border-[var(--ticket-border)] rotate-2 z-10 shadow-sm"></div>

      {/* LEFT COLUMN: Cuống vé (Stub) */}
      <div 
        className="relative flex flex-col justify-between items-start pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-dashed border-[var(--ticket-border)] md:pr-8 min-w-[140px] md:max-w-[200px]"
        style={{ transform: "translateZ(10px)" }}
      >
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-[var(--dusk)] tracking-widest uppercase">
            {code}
          </span>
          <span className="stamp-label inline-block self-start font-[var(--font-mono)] bg-[var(--sky-soft)] border-[var(--ink)] text-[var(--ink)] shadow-sm">
            {tag}
          </span>
        </div>

        <div className="hidden md:block font-[var(--font-mono)] text-[9px] text-[var(--dusk-2)] tracking-widest mt-4 opacity-70">
          ZINE TICKET // STUB
        </div>
      </div>

      {/* RIGHT COLUMN: Nội dung chính */}
      <div 
        className="flex-1 flex flex-col justify-center"
        style={{ transform: "translateZ(20px)" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="font-[var(--font-display)] text-2xl md:text-3xl font-bold text-[var(--ink)] tracking-tight flex items-center gap-2 group-hover:text-[var(--dusk)] transition-colors">
              {title}
              {accentPoint && (
                <span className="w-2 h-2 rounded-full bg-[var(--static)] animate-pulse inline-block shadow-[0_0_8px_var(--static)]" title="Highlight" />
              )}
            </h3>
            {subtitle && (
              <span className="font-[var(--font-script)] text-lg text-[var(--dusk-2)] -rotate-1 origin-left inline-block mt-1">
                {subtitle}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 text-sm md:text-base text-[var(--ink-2)]/90 leading-relaxed font-sans">
          {description}
        </div>
      </div>
    </motion.div>
  );
}

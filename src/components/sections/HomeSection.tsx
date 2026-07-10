"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const NAME_PART_1 = "SOMEONE";
const NAME_PART_2 = "I LOVE";
const NAME_PART_3 = "THROW ME";
const NAME_PART_4 = "AWAY";

const MOTTOS = [
  "but i don't mind, i'll be fine.",
  "steady amidst chaos.",
  "finding clarity in the clouds.",
];

export default function HomeSection() {
  const [mottoIndex, setMottoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const layer1X = useTransform(springX, (v: number) => v * 0.04);
  const layer1Y = useTransform(springY, (v: number) => v * 0.04);
  const layer2X = useTransform(springX, (v: number) => v * -0.02);
  const layer2Y = useTransform(springY, (v: number) => v * -0.02);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="scroll-section relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
    >
      {/* Background Star Texture Layer */}
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="pointer-events-none absolute inset-0 z-0 opacity-40"
        aria-hidden
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-[var(--dusk)]"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              fontSize: 12 + (i % 3) * 8,
              transform: `rotate(${i * 15}deg)`,
            }}
          >
            ✦
          </span>
        ))}
      </motion.div>

      {/* Main Content Collage */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center justify-center">
        
        {/* Stamp Label */}
        <motion.div style={{ x: layer1X, y: layer1Y }} className="absolute top-10 left-10 md:left-20">
          <span className="stamp-label shadow-sm bg-white">SUMMER TICKET // 2026</span>
        </motion.div>

        {/* Large Typography Overlay */}
        <div className="relative flex flex-col items-center w-full mt-20 md:mt-0 font-[var(--font-display)] uppercase tracking-tighter leading-[0.85] text-center select-none mix-blend-multiply">
          
          <motion.div style={{ x: layer1X }} className="text-6xl md:text-[9rem] font-bold self-start md:ml-10 text-[var(--dusk)] z-10">
            {NAME_PART_1}
          </motion.div>
          
          <motion.div style={{ x: layer2X }} className="text-5xl md:text-[7rem] italic self-end md:mr-20 text-[var(--dusk-2)] z-0 opacity-80">
            {NAME_PART_2}
          </motion.div>
          
          <motion.div style={{ x: layer1X, y: layer1Y, WebkitTextStroke: '2px var(--ink)' }} className="text-7xl md:text-[10rem] font-extrabold text-transparent mt-[-20px] md:mt-[-40px] z-20">
            {NAME_PART_3}
          </motion.div>

          <motion.div style={{ x: layer2X, y: layer2Y }} className="text-6xl md:text-[9rem] font-bold text-[var(--ink)] self-end md:mr-10 z-30">
            {NAME_PART_4}
          </motion.div>

          {/* Sticky Note Quote */}
          <motion.button
            key={mottoIndex}
            onClick={() => setMottoIndex((i) => (i + 1) % MOTTOS.length)}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: -3 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-1/2 left-1/4 md:left-1/3 -translate-x-1/2 -translate-y-1/2 z-40 bg-white p-4 md:p-6 shadow-md border border-[var(--ticket-border)] max-w-[200px] md:max-w-[280px] text-left clickable-card"
            aria-label="Nhấn để xem châm ngôn khác"
          >
            <p className="font-[var(--font-script)] text-2xl md:text-4xl text-[var(--ink)] leading-tight">
              {MOTTOS[mottoIndex]}
            </p>
            <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-10 h-3 bg-[var(--sky-soft)] opacity-80 rotate-2"></div>
          </motion.button>
        </div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center text-[10px] uppercase tracking-widest text-[var(--dusk)] font-[var(--font-mono)]"
      >
        <span className="mb-2">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[var(--dusk)] to-transparent"></div>
      </motion.div>
    </section>
  );
}

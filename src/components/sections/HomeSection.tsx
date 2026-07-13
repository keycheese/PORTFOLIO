"use client";

import { useState, useRef, useEffect, MouseEvent as RMouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

/* Lazy-load WebGL to avoid SSR issues */
const LiquidWebGL = dynamic(
  () => import("@/components/studio/LiquidWebGL"),
  { ssr: false }
);

/* ── Portfolio blue theme colours in 0–1 RGB ─────────────── */
/* --ink   #1a2744 */ const INK_RGB:  [number,number,number] = [0.102, 0.153, 0.267];
/* --sky   #83a8cf */ const SKY_RGB:  [number,number,number] = [0.514, 0.659, 0.812];
/* --dusk  #37537d */ const DUSK_RGB: [number,number,number] = [0.216, 0.325, 0.490];

/* ── Headline text parts ──────────────────────────────────── */
const NAME_PART_1 = "SOMEONE";
const NAME_PART_2 = "I LOVE";
const NAME_PART_3 = "THROW ME";
const NAME_PART_4 = "AWAY";

/* ── Rotating mottos ─────────────────────────────────────── */
const MOTTOS = [
  "but i don't mind, i'll be fine.",
  "steady amidst chaos.",
  "finding clarity in the clouds.",
];

/* ── Floating ticket-style labels (% positions + parallax depth) ─ */
const FLOATING_LABELS = [
  { text: "BOARDING // HOME",   x:  6, y: 12, depth: 1.8 },
  { text: "2026 // VN",         x: 76, y:  9, depth: 0.7 },
  { text: "✦ PORTFOLIO",        x: 80, y: 70, depth: 1.5 },
  { text: "SCROLL DOWN ↓",      x:  4, y: 74, depth: 1.2 },
  { text: "→ DESIGN + CODE",    x: 48, y: 87, depth: 0.9 },
  { text: "NODE / VI / 2026",   x: 28, y: 18, depth: 2.0 },
] as const;

/* ── Utility ─────────────────────────────────────────────── */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ════════════════════════════════════════════════════════════ */

export default function HomeSection() {
  const [mottoIndex, setMottoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── Framer-motion parallax (stars + stamp) ─────────────── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const layer1X = useTransform(springX, (v: number) => v * 0.04);
  const layer1Y = useTransform(springY, (v: number) => v * 0.04);
  const layer2X = useTransform(springX, (v: number) => v * -0.02);
  const layer2Y = useTransform(springY, (v: number) => v * -0.02);

  /* ── RAF-based state ─────────────────────────────────────── */
  const mouse         = useRef({ x: 0, y: 0 });
  const wordRefs      = useRef<(HTMLSpanElement | null)[]>([]);
  const wordTransforms = useRef([
    { rx: 0, ry: 0, tz: 0 },
    { rx: 0, ry: 0, tz: 0 },
    { rx: 0, ry: 0, tz: 0 },
    { rx: 0, ry: 0, tz: 0 },
  ]);
  const tagRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const tagOffsets = useRef(FLOATING_LABELS.map(() => ({ ox: 0, oy: 0 })));
  const rafRef     = useRef<number>(0);

  /* ── Hydration guard ─────────────────────────────────────── */
  useEffect(() => { setMounted(true); }, []);

  /* ── Framer-motion mouse feed (via section onMouseMove) ──── */
  const handleMouseMove = (e: RMouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width  / 2);
    mouseY.set(e.clientY - rect.top  - rect.height / 2);
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  /* ── RAF animation loop ──────────────────────────────────── */
  useEffect(() => {
    if (!mounted) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ww = window.innerWidth;
      const wh = window.innerHeight;
      const nMx = (mx / ww) * 2 - 1; // normalised [-1, 1]
      const nMy = (my / wh) * 2 - 1;

      /* — Kinetic 3-D headline ——————————————————————————— */
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx   = rect.left + rect.width  / 2;
        const cy   = rect.top  + rect.height / 2;
        const dx   = (mx - cx) / ww;
        const dy   = (my - cy) / wh;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const str  = Math.exp(-dist * 4.0) * 18; // max ≈ 18 ° close-range

        const wt = wordTransforms.current[i];
        wt.rx = lerp(wt.rx, -dy * str, 0.07);
        wt.ry = lerp(wt.ry,  dx * str, 0.07);
        wt.tz = lerp(wt.tz, Math.exp(-dist * 5.5) * 26, 0.07);

        el.style.transform =
          `perspective(700px) rotateX(${wt.rx}deg) rotateY(${wt.ry}deg) translateZ(${wt.tz}px)`;
      });

      /* — Parallax floating labels ——————————————————————— */
      tagRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = FLOATING_LABELS[i]?.depth ?? 1;
        const to    = tagOffsets.current[i];
        to.ox = lerp(to.ox, nMx * depth * -18, 0.055);
        to.oy = lerp(to.oy, nMy * depth * -12, 0.055);
        el.style.transform = `translate(${to.ox}px, ${to.oy}px)`;
      });
    };

    animate();
    return () => cancelAnimationFrame(rafRef.current);
  }, [mounted]);

  /* ════════════════════════════════════════════════════════════ */

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="scroll-section relative flex flex-col items-center justify-center min-h-screen overflow-hidden px-6"
    >
      {/* ── WebGL liquid warp background (blue palette) ──── */}
      {mounted && (
        <LiquidWebGL
          bgColor={INK_RGB}
          accent1={SKY_RGB}
          accent2={DUSK_RGB}
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ zIndex: 0, position: "absolute" }}
        />
      )}

      {/* ── Floating ticket labels – deep parallax layer ─── */}
      {FLOATING_LABELS.map((label, i) => (
        <div
          key={label.text}
          ref={(el) => { tagRefs.current[i] = el; }}
          aria-hidden
          className="absolute pointer-events-none select-none"
          style={{
            top:        `${label.y}%`,
            left:       `${label.x}%`,
            zIndex:     2,
            fontFamily: "var(--font-mono)",
            fontSize:   "9px",
            letterSpacing: "0.2em",
            color:      "var(--dusk)",
            opacity:    0.45,
            willChange: "transform",
          }}
        >
          {label.text}
        </div>
      ))}

      {/* ── Stars / decorative layer ──────────────────────── */}
      <motion.div
        style={{ x: layer2X, y: layer2Y, zIndex: 3, position: "absolute", inset: 0 }}
        className="pointer-events-none opacity-25"
        aria-hidden
      >
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-[var(--sky-soft)]"
            style={{
              left:      `${(i * 37) % 100}%`,
              top:       `${(i * 53) % 100}%`,
              fontSize:  12 + (i % 3) * 8,
              transform: `rotate(${i * 15}deg)`,
              opacity:   0.6,
            }}
          >
            ✦
          </span>
        ))}
      </motion.div>

      {/* ── Main content layer ───────────────────────────── */}
      <div
        className="relative w-full max-w-4xl flex flex-col items-center justify-center"
        style={{ zIndex: 10, perspective: "1000px" }}
      >
        {/* Stamp label */}
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="absolute top-10 left-10 md:left-20"
        >
          <span className="stamp-label shadow-sm" style={{ background: "rgba(255,255,255,0.85)" }}>
            SUMMER TICKET // 2026
          </span>
        </motion.div>

        {/* ── Kinetic typography ── */}
        <div
          className="relative flex flex-col items-center w-full mt-20 md:mt-0 font-[var(--font-display)] uppercase tracking-tighter leading-[0.85] text-center select-none"
        >
          {/* "SOMEONE" — sky-soft, layer-1 horizontal */}
          <motion.div
            style={{ x: layer1X }}
            className="text-6xl md:text-[9rem] font-bold self-start md:ml-10 z-10"
          >
            <span
              ref={(el) => { wordRefs.current[0] = el; }}
              className="inline-block"
              style={{ color: "var(--sky-soft)", willChange: "transform" }}
            >
              {NAME_PART_1}
            </span>
          </motion.div>

          {/* "I LOVE" — sky, italic, layer-2 horizontal */}
          <motion.div
            style={{ x: layer2X }}
            className="text-5xl md:text-[7rem] italic self-end md:mr-20 z-0"
          >
            <span
              ref={(el) => { wordRefs.current[1] = el; }}
              className="inline-block"
              style={{ color: "var(--sky)", opacity: 0.8, willChange: "transform" }}
            >
              {NAME_PART_2}
            </span>
          </motion.div>

          {/* "THROW ME" — cream outline, layer-1 both axes */}
          <motion.div
            style={{ x: layer1X, y: layer1Y }}
            className="text-7xl md:text-[10rem] font-extrabold mt-[-20px] md:mt-[-40px] z-20"
          >
            <span
              ref={(el) => { wordRefs.current[2] = el; }}
              className="inline-block"
              style={{
                WebkitTextStroke: "2px var(--mist)",
                color:            "transparent",
                willChange:       "transform",
              }}
            >
              {NAME_PART_3}
            </span>
          </motion.div>

          {/* "AWAY" — mist, layer-2 both axes */}
          <motion.div
            style={{ x: layer2X, y: layer2Y }}
            className="text-6xl md:text-[9rem] font-bold self-end md:mr-10 z-30"
          >
            <span
              ref={(el) => { wordRefs.current[3] = el; }}
              className="inline-block"
              style={{ color: "var(--mist)", willChange: "transform" }}
            >
              {NAME_PART_4}
            </span>
          </motion.div>

          {/* ── Sticky-note motto (click to cycle) ─────────── */}
          <motion.button
            key={mottoIndex}
            onClick={() => setMottoIndex((i) => (i + 1) % MOTTOS.length)}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1,   rotate: -3 }}
            whileHover={{ scale: 1.05, rotate: -1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-1/2 left-1/4 md:left-1/3 -translate-x-1/2 -translate-y-1/2 z-40 p-4 md:p-6 shadow-md max-w-[200px] md:max-w-[280px] text-left clickable-card"
            style={{
              background:   "rgba(245,243,238,0.92)",
              border:       "1px solid var(--ticket-border)",
              backdropFilter: "blur(4px)",
            }}
            aria-label="Click to see another motto"
          >
            <p className="font-[var(--font-script)] text-2xl md:text-4xl text-[var(--ink)] leading-tight">
              {MOTTOS[mottoIndex]}
            </p>
            {/* Tape strip */}
            <div
              className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-10 h-3 rotate-2"
              style={{ background: "var(--sky-soft)", opacity: 0.85 }}
              aria-hidden
            />
          </motion.button>
        </div>
      </div>

      {/* ── Scroll cue ───────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 flex flex-col items-center"
        style={{ zIndex: 10 }}
      >
        <span
          className="mb-2 uppercase tracking-widest"
          style={{
            fontFamily:    "var(--font-mono)",
            fontSize:      "9px",
            letterSpacing: "0.28em",
            color:         "var(--sky)",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width:    1,
            height:   56,
            overflow: "hidden",
            position: "relative",
            background: "rgba(131,168,207,0.15)",
          }}
        >
          <div
            aria-hidden
            style={{
              position:   "absolute",
              top:        0,
              left:       0,
              width:      "100%",
              height:     "50%",
              background: "linear-gradient(to bottom, var(--sky), transparent)",
              animation:  "studio-scroll-line 2s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

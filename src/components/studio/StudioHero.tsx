"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

/* Lazy-load WebGL canvas to avoid SSR issues */
const LiquidWebGL = dynamic(() => import("./LiquidWebGL"), { ssr: false });

/* ─── Constants ─────────────────────────────────── */

const HEADLINE_LINE_1 = ["We", "craft", "digital"];
const HEADLINE_LINE_2 = ["worlds", "that", "breathe."];
const ALL_WORDS = [...HEADLINE_LINE_1, ...HEADLINE_LINE_2];

const NAV_LINKS = ["Work", "About", "Services", "Contact"];

const TAGS = [
  { text: "01 / STUDIO",       pct: { x:  7, y: 14 }, depth: 1.8 },
  { text: "MMXXVI",            pct: { x: 74, y: 11 }, depth: 0.7 },
  { text: "⟡ DESIGN SYSTEMS",  pct: { x: 80, y: 66 }, depth: 1.5 },
  { text: "MOTION · CODE",     pct: { x:  6, y: 70 }, depth: 1.2 },
  { text: "→ EXPLORE",         pct: { x: 46, y: 90 }, depth: 0.6 },
  { text: "NODE / 2026 / VN",  pct: { x: 30, y: 20 }, depth: 2.0 },
];

/* ─── Utilities ─────────────────────────────────── */

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/* ─── Type helpers ───────────────────────────────── */

interface WordTransform { rx: number; ry: number; tz: number }

/* ─── Sub-components ─────────────────────────────── */

function CursorRig({
  dotRef,
  ringRef,
}: {
  dotRef: React.RefObject<HTMLDivElement | null>;
  ringRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <>
      {/* Small snappy dot */}
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 8,
          height: 8,
          background: "#F3F1EA",
          zIndex: 9999,
          willChange: "transform",
        }}
      />
      {/* Lagging ring */}
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          width: 40,
          height: 40,
          border: "1.5px solid rgba(243,241,234,0.45)",
          zIndex: 9998,
          willChange: "transform",
          transition: "border-color 0.3s, width 0.3s, height 0.3s",
        }}
      />
    </>
  );
}

/* ─── Main component ─────────────────────────────── */

export default function StudioHero() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  /* Refs for RAF state — avoids closure stale values */
  const mouse   = useRef({ x: 0, y: 0 });
  const cursorState = useRef({ dotX: 0, dotY: 0, ringX: 0, ringY: 0, ringScale: 1 });
  const wordTransforms = useRef<WordTransform[]>(
    ALL_WORDS.map(() => ({ rx: 0, ry: 0, tz: 0 }))
  );
  const tagOffsets = useRef<{ ox: number; oy: number }[]>(
    TAGS.map(() => ({ ox: 0, oy: 0 }))
  );
  const ctaMagnet  = useRef({ tx: 0, ty: 0 });

  /* DOM refs */
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tagRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const ctaRef   = useRef<HTMLButtonElement>(null);
  const rafRef   = useRef<number>(0);

  /* ── Boot ── */
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── RAF animation loop ── */
  useEffect(() => {
    if (!mounted || reducedMotion) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const ww = window.innerWidth;
      const wh = window.innerHeight;

      /* — Custom cursor — */
      const cs = cursorState.current;
      cs.dotX  = lerp(cs.dotX,  mx, 0.50);
      cs.dotY  = lerp(cs.dotY,  my, 0.50);
      cs.ringX = lerp(cs.ringX, mx, 0.08);
      cs.ringY = lerp(cs.ringY, my, 0.08);

      const dot  = dotRef.current;
      const ring = ringRef.current;

      if (dot) {
        dot.style.transform = `translate(${cs.dotX - 4}px, ${cs.dotY - 4}px)`;
      }
      if (ring) {
        const rs = cs.ringScale;
        const hw = (40 * rs) / 2;
        ring.style.transform = `translate(${cs.ringX - hw}px, ${cs.ringY - hw}px) scale(${rs})`;
      }

      /* Normalise mouse to [-1, 1] */
      const nMx = (mx / ww) * 2 - 1;
      const nMy = (my / wh) * 2 - 1;

      /* — Kinetic headline — */
      wordRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = (mx - cx) / ww;
        const dy = (my - cy) / wh;
        const dist  = Math.sqrt(dx * dx + dy * dy);
        const str   = Math.exp(-dist * 4.5) * 20; // max ≈ 20deg when very close

        const wt = wordTransforms.current[i];
        wt.rx = lerp(wt.rx, -dy * str, 0.08);
        wt.ry = lerp(wt.ry,  dx * str, 0.08);
        wt.tz = lerp(wt.tz, Math.exp(-dist * 6) * 28, 0.08);

        el.style.transform =
          `perspective(800px) rotateX(${wt.rx}deg) rotateY(${wt.ry}deg) translateZ(${wt.tz}px)`;
      });

      /* — Parallax tags — */
      tagRefs.current.forEach((el, i) => {
        if (!el) return;
        const depth = TAGS[i]?.depth ?? 1;
        const to = tagOffsets.current[i];
        to.ox = lerp(to.ox, nMx * depth * -18, 0.06);
        to.oy = lerp(to.oy, nMy * depth * -12, 0.06);
        el.style.transform = `translate(${to.ox}px, ${to.oy}px)`;
      });

      /* — Magnetic CTA — */
      const cta = ctaRef.current;
      if (cta) {
        const rect = cta.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = mx - cx;
        const dy = my - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const threshold = 120;

        const cm = ctaMagnet.current;
        if (dist < threshold) {
          const factor = (1 - dist / threshold) * 0.32;
          cm.tx = lerp(cm.tx, dx * factor, 0.14);
          cm.ty = lerp(cm.ty, dy * factor, 0.14);
          cs.ringScale = lerp(cs.ringScale, 2.8, 0.10);
          if (ring) ring.style.borderColor = "#D9A441";
        } else {
          cm.tx = lerp(cm.tx, 0, 0.09);
          cm.ty = lerp(cm.ty, 0, 0.09);
          cs.ringScale = lerp(cs.ringScale, 1, 0.08);
          if (ring) ring.style.borderColor = "rgba(243,241,234,0.45)";
        }
        cta.style.transform = `translate(${cm.tx}px, ${cm.ty}px)`;
      }
    };

    animate();
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mounted, reducedMotion]);

  /* ── Hover handlers for secondary links ── */
  const onMagHover  = useCallback(() => { cursorState.current.ringScale = 1.9; }, []);
  const onMagLeave  = useCallback(() => { cursorState.current.ringScale = 1;   }, []);

  return (
    /* Fixed overlay — z-50 covers portfolio nav (z-40) */
    <div
      className="fixed inset-0 overflow-y-auto"
      style={{
        zIndex: 50,
        background: "#0B0C0E",
        color: "#F3F1EA",
        fontFamily: "var(--studio-body, system-ui, sans-serif)",
        cursor: "none",
      }}
    >
      {/* ── WebGL background ── */}
      {mounted && <LiquidWebGL />}

      {/* ── Custom cursor ── */}
      {mounted && !reducedMotion && (
        <CursorRig dotRef={dotRef} ringRef={ringRef} />
      )}

      {/* ── Floating parallax tags ── */}
      {TAGS.map((tag, i) => (
        <div
          key={tag.text}
          ref={(el) => { tagRefs.current[i] = el; }}
          aria-hidden
          className="fixed pointer-events-none select-none"
          style={{
            top:  `${tag.pct.y}%`,
            left: `${tag.pct.x}%`,
            zIndex: 5,
            fontFamily: "var(--studio-mono, monospace)",
            fontSize: "10px",
            letterSpacing: "0.22em",
            color: "#8A8A82",
            opacity: 0.45,
            willChange: "transform",
          }}
        >
          {tag.text}
        </div>
      ))}

      {/* ── Content layer ── */}
      <div className="relative" style={{ zIndex: 10 }}>

        {/* ── Minimal nav ── */}
        <nav
          className="flex justify-between items-center px-8 md:px-16 py-8"
          aria-label="Studio navigation"
        >
          {/* Logo */}
          <div
            className="flex items-center gap-2"
            style={{
              fontFamily: "var(--studio-mono, monospace)",
              fontSize: "12px",
              letterSpacing: "0.2em",
              color: "#D9A441",
            }}
          >
            <span style={{ fontSize: "18px" }}>⟡</span>
            <span className="tracking-widest uppercase">Studio</span>
          </div>

          {/* Menu */}
          <ul
            className="hidden md:flex gap-10"
            role="list"
          >
            {NAV_LINKS.map((label) => (
              <li key={label}>
                <a
                  href="#"
                  className="relative group"
                  style={{
                    fontFamily: "var(--studio-mono, monospace)",
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    color: "#8A8A82",
                    textTransform: "uppercase",
                    textDecoration: "none",
                  }}
                  onMouseEnter={onMagHover}
                  onMouseLeave={onMagLeave}
                >
                  <span
                    className="inline-block transition-colors duration-300 group-hover:text-[#F3F1EA]"
                    style={{ display: "block" }}
                  >
                    {label}
                  </span>
                  {/* Underline reveal */}
                  <span
                    className="absolute bottom-[-2px] left-0 h-px w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "#D9A441" }}
                    aria-hidden
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* Year stamp */}
          <div
            style={{
              fontFamily: "var(--studio-mono, monospace)",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "rgba(138,138,130,0.5)",
            }}
          >
            2026
          </div>
        </nav>

        {/* ── Hero content ── */}
        <main
          className="min-h-[88vh] flex flex-col justify-center px-8 md:px-16 pt-4 pb-28"
          style={{ perspective: "1200px" }}
        >
          {/* Eyebrow */}
          <div
            className="mb-8 flex items-center gap-4"
            style={{
              animation: mounted ? "studio-fade-in 0.8s ease both" : "none",
              animationDelay: "0.1s",
            }}
          >
            <div
              style={{
                width: 24,
                height: 1,
                background: "#D9A441",
              }}
              aria-hidden
            />
            <span
              style={{
                fontFamily: "var(--studio-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.28em",
                color: "#D9A441",
                textTransform: "uppercase",
              }}
            >
              Creative Studio — Est. MMXXVI
            </span>
          </div>

          {/* ── Kinetic Headline ── */}
          <h1
            aria-label="We craft digital worlds that breathe."
            style={{
              fontFamily: "var(--font-display, Fraunces, serif)",
              lineHeight: 0.88,
              fontWeight: 700,
              fontSize: "clamp(3.2rem, 9vw, 10rem)",
              color: "#F3F1EA",
              margin: "0 0 2rem",
              textTransform: "uppercase",
              letterSpacing: "-0.02em",
              animation: mounted ? "studio-fade-in 0.9s ease both" : "none",
              animationDelay: "0.25s",
            }}
          >
            {/* Line 1 */}
            <div className="flex flex-wrap gap-x-[0.18em] mb-[0.06em]">
              {HEADLINE_LINE_1.map((word, i) => (
                <span
                  key={word + i}
                  ref={(el) => { wordRefs.current[i] = el; }}
                  className="inline-block"
                  style={{ willChange: "transform", display: "inline-block" }}
                >
                  {word}
                </span>
              ))}
            </div>
            {/* Line 2 */}
            <div className="flex flex-wrap gap-x-[0.18em]">
              {HEADLINE_LINE_2.map((word, i) => (
                <span
                  key={word + i}
                  ref={(el) => { wordRefs.current[HEADLINE_LINE_1.length + i] = el; }}
                  className="inline-block"
                  style={{
                    willChange: "transform",
                    display: "inline-block",
                    /* Last word — gold accent */
                    color: i === HEADLINE_LINE_2.length - 1 ? "#D9A441" : "#F3F1EA",
                    /* Middle word — sage italic */
                    fontStyle: i === 1 ? "italic" : "normal",
                  }}
                >
                  {word}
                </span>
              ))}
            </div>
          </h1>

          {/* Subtext */}
          <p
            className="max-w-md mb-12 leading-relaxed"
            style={{
              fontSize: "clamp(0.95rem, 1.5vw, 1.15rem)",
              color: "#8A8A82",
              fontFamily: "var(--studio-body, system-ui, sans-serif)",
              animation: mounted ? "studio-fade-in 1s ease both" : "none",
              animationDelay: "0.4s",
            }}
          >
            We build immersive interfaces and bold visual identities
            for brands that refuse to blend in. Motion, code, and
            craft — in service of ideas that matter.
          </p>

          {/* ── CTA row ── */}
          <div
            className="flex flex-wrap items-center gap-6"
            style={{
              animation: mounted ? "studio-fade-in 1s ease both" : "none",
              animationDelay: "0.55s",
            }}
          >
            {/* Primary CTA — magnetic */}
            <button
              ref={ctaRef}
              id="studio-cta-primary"
              className="group relative overflow-hidden"
              aria-label="View our work"
              style={{
                padding: "1rem 2.2rem",
                fontFamily: "var(--studio-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#D9A441",
                border: "1px solid #D9A441",
                background: "transparent",
                willChange: "transform",
                cursor: "none",
              }}
              onMouseEnter={onMagHover}
              onMouseLeave={onMagLeave}
            >
              {/* Fill layer */}
              <span
                aria-hidden
                className="absolute inset-0"
                style={{
                  background: "#D9A441",
                  transform: "translateY(101%)",
                  transition: "transform 0.55s cubic-bezier(0.76,0,0.24,1)",
                }}
                /* CSS group-hover via inline trick */
              />
              <style>{`
                #studio-cta-primary:hover > span:first-child { transform: translateY(0); }
                #studio-cta-primary:hover > span:last-child  { color: #0B0C0E; }
              `}</style>
              <span
                className="relative"
                style={{ transition: "color 0.4s" }}
              >
                View Our Work →
              </span>
            </button>

            {/* Secondary link */}
            <a
              href="#"
              className="group flex items-center gap-2"
              style={{
                fontFamily: "var(--studio-mono, monospace)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#8A8A82",
                textDecoration: "none",
                transition: "color 0.3s",
                cursor: "none",
              }}
              onMouseEnter={onMagHover}
              onMouseLeave={onMagLeave}
            >
              <span className="transition-colors duration-300 group-hover:text-[#F3F1EA]">
                Learn More
              </span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                ↗
              </span>
            </a>
          </div>
        </main>
      </div>

      {/* ── Scroll cue ── */}
      <div
        aria-hidden
        className="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{ zIndex: 10, pointerEvents: "none" }}
      >
        <span
          style={{
            fontFamily: "var(--studio-mono, monospace)",
            fontSize: "9px",
            letterSpacing: "0.28em",
            color: "#8A8A82",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: 1,
            height: 64,
            background: "rgba(138,138,130,0.18)",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "#D9A441",
              animation: "studio-scroll-line 2.2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </div>
  );
}

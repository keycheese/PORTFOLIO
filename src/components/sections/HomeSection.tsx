"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// TODO: đổi tên, châm ngôn và các "mảnh" giới thiệu bản thân theo đúng màu sắc cá nhân
const NAME = "Tên Của Bạn";
const MOTTOS = [
  "throw me away, i'll be fine.",
  "steady amidst chaos.",
  "finding clarity in the clouds.",
];

const FACTS = [
  "đang học lớp 12",
  "thích chụp ảnh film",
  "hay nghe nhạc lo-fi lúc 2AM",
  "đang xây trang này từng dòng code một",
];

/**
 * SIGNATURE ELEMENT của cả site:
 * - Nền "bầu trời" với các ngôi sao/mây trôi nổi phản ứng theo chuyển động chuột (parallax nhẹ).
 * - Câu châm ngôn viết tay, click để chuyển sang câu khác — user "tương tác được" thật sự,
 *   không chỉ là hiệu ứng trang trí.
 * - Cuộn xuống để bắt đầu hành trình qua các section.
 */
export default function HomeSection() {
  const [mottoIndex, setMottoIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Các lớp trôi với tốc độ khác nhau => cảm giác chiều sâu (parallax)
  const layer1X = useTransform(springX, (v: number) => v * 0.02);
  const layer1Y = useTransform(springY, (v: number) => v * 0.02);
  const layer2X = useTransform(springX, (v: number) => v * -0.015);
  const layer2Y = useTransform(springY, (v: number) => v * -0.015);

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
      className="scroll-section relative flex flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Lớp sao trôi nổi — thay bằng SVG ngôi sao riêng nếu muốn giữ đúng vibe moodboard */}
      <motion.div
        style={{ x: layer1X, y: layer1Y }}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-[--sky-deep]/40"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 100}%`,
              fontSize: 10 + (i % 3) * 6,
            }}
          >
            ✦
          </span>
        ))}
      </motion.div>

      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-white/50 blur-3xl"
        aria-hidden
      />

      {/* Nhãn tem kiểu vé máy bay/vé xem phim từ moodboard */}
      <span className="stamp-label mb-8">ONE · ONLY · PORTFOLIO 2026</span>

      <h1 className="font-[--font-display] text-5xl font-bold leading-[1.05] text-[--ink-navy] md:text-8xl">
        {NAME}
      </h1>

      {/* Châm ngôn — click để đổi, thể hiện "màu sắc bản thân" theo nhiều lát cắt */}
      <motion.button
        key={mottoIndex}
        onClick={() => setMottoIndex((i) => (i + 1) % MOTTOS.length)}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="script-tag mt-6 max-w-xl text-3xl md:text-4xl"
        aria-label="Nhấn để xem châm ngôn khác"
      >
        &ldquo;{MOTTOS[mottoIndex]}&rdquo;
      </motion.button>
      <span className="mt-2 text-xs text-[--sky-deep]/60">
        (nhấn vào câu trên để đổi câu khác)
      </span>

      {/* Dải "fact" cuộn ngang liên tục — kiểu ticker trên vé/tem, thêm chất riêng */}
      <div className="mt-14 w-full max-w-3xl overflow-hidden border-y border-[--sky-deep]/20 py-3">
        <motion.div
          className="flex gap-10 whitespace-nowrap text-sm uppercase tracking-wide text-[--sky-deep]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {[...FACTS, ...FACTS].map((f, i) => (
            <span key={i}>✦ {f}</span>
          ))}
        </motion.div>
      </div>

      {/* Gợi ý cuộn xuống — dẫn dắt user sang phần tiếp theo */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
        className="absolute bottom-10 text-xs uppercase tracking-widest text-[--sky-deep]/60"
      >
        cuộn xuống ↓
      </motion.div>
    </section>
  );
}

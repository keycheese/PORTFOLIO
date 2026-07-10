"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import SplitFlap from "@/components/SplitFlap";

const IDENTITY_PHRASES = [
  "CREATIVE DEVELOPER",
  "DESIGN ENTHUSIAST",
  "STORYTELLER",
  "PROBLEM SOLVER",
];

const DEPARTURES = [
  { gate: "G2", title: "HỌC VẤN", path: "/hoc-van", status: "ON TIME", time: "18:30" },
  { gate: "G3", title: "DỰ ÁN HỌC THUẬT", path: "/du-an", status: "BOARDING", time: "19:00" },
  { gate: "G4", title: "HOẠT ĐỘNG NGOẠI KHÓA", path: "/ngoai-khoa", status: "ON TIME", time: "19:45" },
  { gate: "G5", title: "KINH NGHIỆM LÀM VIỆC", path: "/kinh-nghiem", status: "ON TIME", time: "20:15" },
  { gate: "G6", title: "SỞ THÍCH CÁ NHÂN", path: "/so-thich", status: "BOARDING", time: "21:00" },
];

export default function Home() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Stagger wrapper for initial loading
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20 select-none">
      {/* 1. Header nhỏ trên cùng dạng tem hộ chiếu */}
      <div className="flex justify-between items-center border-b border-sky/20 pb-4 mb-16 font-mono text-[10px] md:text-xs text-sky/60 tracking-[0.2em]">
        <span>PASSPORT — PORTFOLIO No. 001</span>
        <span>ISSUED: 2026 // VN</span>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-14"
      >
        {/* 2. Hero Section */}
        <motion.div variants={itemVariants} className="flex flex-col items-center text-center gap-4">
          <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
            XIN CHÀO, TÔI LÀ
          </span>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold text-mist tracking-tight leading-none uppercase">
            [Tên của bạn]
          </h1>
          
          {/* SplitFlap display for roles */}
          <div className="my-4 h-16 flex items-center justify-center">
            <SplitFlap words={IDENTITY_PHRASES} />
          </div>

          <p className="font-script text-2xl md:text-3xl text-sky-soft/90 italic max-w-md mt-2">
            &ldquo;Thiết kế bền vững kết hợp với chuyển động tinh tế.&rdquo;
          </p>
        </motion.div>

        {/* 3. Thẻ châm ngôn tương tác (Motto Card) */}
        <motion.div variants={itemVariants} className="flex flex-col items-center">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="w-full max-w-md h-44 cursor-pointer relative [perspective:1000px] group"
          >
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ transformStyle: "preserve-3d" }}
              className="w-full h-full relative"
            >
              {/* FRONT SIDE */}
              <div
                className="absolute inset-0 ticket-edge p-6 flex flex-col justify-between items-center text-center [backface-visibility:hidden] bg-dusk/90 border border-sky/30 shadow-lg"
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="ticket-cutout-left" />
                <div className="ticket-cutout-right" />
                
                <span className="font-mono text-[9px] tracking-widest text-sky/50 uppercase">
                  MOTTO CARD // GATE 01
                </span>
                
                <p className="font-script text-2xl md:text-3xl text-signal italic px-4">
                  &ldquo;throw me away, i&apos;ll be fine.&rdquo;
                </p>
                
                <span className="font-mono text-[9px] text-sky/40 uppercase group-hover:text-signal transition-colors">
                  [Click to scan / Lật xem]
                </span>
              </div>

              {/* BACK SIDE */}
              <div
                className="absolute inset-0 ticket-edge p-6 flex flex-col justify-between items-center text-center bg-dusk-2 border border-sky/30 shadow-lg [backface-visibility:hidden] [transform:rotateY(180deg)]"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <div className="ticket-cutout-left" />
                <div className="ticket-cutout-right" />
                
                <span className="font-mono text-[9px] tracking-widest text-sky/50 uppercase">
                  DECRYPTION // SUCCESS
                </span>
                
                <p className="text-xs md:text-sm text-sky-soft/90 max-w-xs leading-relaxed px-4">
                  Tự lập và kiên định giữa hỗn độn. Luôn tin rằng sự chân thành và bền vững sẽ tìm được giá trị đích thực.
                </p>
                
                <span className="font-mono text-[9px] text-sky/40 uppercase">
                  [Click to return / Lật lại]
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 4. Bảng khởi hành (Departures Board) */}
        <motion.div variants={itemVariants} className="flex flex-col gap-4">
          <div className="text-center font-mono text-xs text-sky/50 uppercase tracking-widest">
            — BẢNG KHỞI HÀNH {"//"} FLIGHT DEPARTURES —
          </div>

          <div className="bg-ink-2/80 border border-sky/20 rounded-xl p-4 md:p-6 font-mono shadow-2xl relative overflow-hidden">
            {/* Airport Board Header */}
            <div className="border-b border-sky/20 pb-3 mb-4 text-[10px] md:text-xs text-sky/50 flex justify-between uppercase tracking-wider">
              <div className="w-12 md:w-16">TIME</div>
              <div className="w-12 md:w-16">GATE</div>
              <div className="flex-grow px-4">DESTINATION</div>
              <div className="w-24 md:w-28 text-right">STATUS</div>
            </div>

            {/* Departure Rows */}
            <div className="flex flex-col gap-1">
              {DEPARTURES.map((item) => (
                <Link href={item.path} key={item.path} className="block">
                  <motion.div
                    whileHover={{ x: 6, backgroundColor: "rgba(159,198,232,0.06)" }}
                    className="flex justify-between items-center py-2.5 px-2 rounded-md transition-colors border-b border-sky/5 last:border-b-0 group"
                  >
                    <div className="w-12 md:w-16 text-sky/60 text-xs md:text-sm">{item.time}</div>
                    <div className="w-12 md:w-16 text-signal font-bold text-xs md:text-sm">{item.gate}</div>
                    <div className="flex-grow px-4 text-mist font-display font-medium text-xs md:text-sm tracking-wide uppercase group-hover:text-signal transition-colors">
                      {item.title}
                    </div>
                    <div className="w-24 md:w-28 text-right">
                      <span className={`px-2 py-0.5 rounded-sm text-[9px] md:text-[10px] font-bold select-none tracking-wide ${
                        item.status === "BOARDING"
                          ? "bg-static/10 text-static border border-static/20 animate-pulse"
                          : "bg-green-500/10 text-green-400 border border-green-500/20"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </main>
  );
}

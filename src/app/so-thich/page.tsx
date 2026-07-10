"use client";

import { motion } from "framer-motion";
import { Camera, PenTool, Film, Music, BookOpen } from "lucide-react";

const HOBBIES = [
  {
    title: "CHỤP ẢNH FILM",
    desc: "Bắt trọn khoảnh khắc qua lăng kính cơ học cổ điển và chất màu hoài niệm từ những hạt muối bạc.",
    icon: Camera,
    span: "md:col-span-2 md:row-span-2 h-80 md:h-[420px]",
    bgGradient: "from-dusk via-ink-2 to-dusk-2",
  },
  {
    title: "VẼ MINH HOẠ",
    desc: "Sáng tạo thế giới nhân vật sống động thông qua cọ vẽ kỹ thuật số và các bản phác thảo hình hoạ.",
    icon: PenTool,
    span: "md:col-span-1 md:row-span-1 h-56 md:h-[198px]",
    bgGradient: "from-dusk-2 to-ink-2",
  },
  {
    title: "XEM PHIM",
    desc: "Nghiên cứu góc quay, kỹ thuật dựng cảnh và cách phối màu sắc từ các bộ phim điện ảnh kinh điển.",
    icon: Film,
    span: "md:col-span-1 md:row-span-2 h-80 md:h-[420px]",
    bgGradient: "from-dusk to-ink-2",
  },
  {
    title: "NGHE NHẠC LO-FI",
    desc: "Tìm kiếm sự tập trung cao độ trong các phiên làm việc đêm khuya lúc 2 giờ sáng cùng nhạc chillhop.",
    icon: Music,
    span: "md:col-span-1 md:row-span-1 h-56 md:h-[198px]",
    bgGradient: "from-dusk-2 to-dusk",
  },
  {
    title: "ĐỌC SÁCH NGHỆ THUẬT",
    desc: "Tiếp thu tinh hoa tư duy của thế hệ đi trước để cải thiện tri thức thẩm mỹ và bố cục chữ viết.",
    icon: BookOpen,
    span: "md:col-span-2 md:row-span-1 h-56 md:h-[198px]",
    bgGradient: "from-dusk via-ink-2 to-dusk-2",
  },
];

export default function HobbiesPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div>
          <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
            GATE 06 // PERSONAL INTERESTS
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-mist tracking-tight mt-1 uppercase">
            Sở thích cá nhân
          </h1>
        </div>

        {/* Masonry / Moodboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-max">
          {HOBBIES.map((hobby, idx) => {
            const IconComponent = hobby.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`group relative overflow-hidden ticket-edge border border-sky/20 flex flex-col justify-end p-6 select-none cursor-pointer ${hobby.span}`}
              >
                {/* Polaroid side cutouts */}
                <div className="ticket-cutout-left" />
                <div className="ticket-cutout-right" />

                {/* Background visual overlay acting as image placeholder */}
                <div
                  className={`absolute inset-0 bg-gradient-to-tr ${hobby.bgGradient} opacity-90 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500 ease-out z-0`}
                />
                
                {/* Technical stamp pattern inside grid */}
                <div className="absolute top-4 right-4 font-mono text-[9px] text-sky/25 border border-sky/15 px-2 py-0.5 rounded select-none z-10">
                  REF-{100 + idx}
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-ink/75 border border-sky/30 text-signal group-hover:text-static transition-colors duration-300">
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-display text-lg md:text-xl font-bold text-mist tracking-tight uppercase">
                      {hobby.title}
                    </h3>
                  </div>
                  
                  {/* Caption slides up / reveals details */}
                  <p className="text-xs md:text-sm text-sky-soft/80 leading-relaxed max-w-sm mt-1 group-hover:text-mist transition-colors duration-300">
                    {hobby.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

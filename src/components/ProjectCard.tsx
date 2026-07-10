"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useState, useRef, MouseEvent } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
}

const ProjectCard = ({ title, category, thumbnail, videoUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

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
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30, rotate: -3 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative cursor-none card-ticket clickable-card transition-shadow duration-300 hover:shadow-[4px_4px_12px_rgba(26,39,68,0.1)]"
    >
      {/* Corner Stamp */}
      <div className="absolute -top-3 -right-3 z-20 transform rotate-12 group-hover:scale-110 transition-transform duration-300">
        <span className="stamp-label bg-[var(--signal)] border-[var(--ink)] text-[var(--ink)] px-2 py-1 shadow-sm">
          {category}
        </span>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--mist)] rounded-sm" style={{ transform: "translateZ(20px)" }}>
        {videoUrl && isHovered ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 scale-105"
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%] group-hover:grayscale-0"
          />
        )}
        
        {/* Soft Grainy Overlay on Image */}
        <div className="absolute inset-0 bg-[var(--dusk)]/0 group-hover:bg-[var(--dusk)]/5 transition-colors duration-500 mix-blend-multiply" />
      </div>

      <div className="mt-4 flex flex-col gap-1" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-xl font-bold font-[var(--font-display)] text-[var(--ink)] tracking-tight group-hover:text-[var(--dusk-2)] transition-colors">
          {title}
        </h3>
        {/* Torn edge separator line */}
        <div className="w-full h-px border-b border-dashed border-[var(--ticket-border)] my-1"></div>
        <p className="text-xs font-[var(--font-mono)] uppercase text-[var(--dusk)] tracking-widest mt-1">
          {category}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

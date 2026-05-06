"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
}

const ProjectCard = ({ title, category, thumbnail, videoUrl }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative cursor-pointer"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--muted)] rounded-sm">
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
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        )}
        
        {/* Soft Glassmorphism Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>

      <div className="mt-6 flex flex-col gap-1">
        <h3 className="text-lg font-medium tracking-tight group-hover:opacity-70 transition-opacity">
          {title}
        </h3>
        <p className="text-sm text-[var(--secondary)]">
          {category}
        </p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.1] mb-8">
            Digital Designer & <br /> 
            <span className="text-[var(--secondary)]">Creative Developer.</span>
          </h1>
          <p className="text-lg md:text-xl text-[var(--secondary)] max-w-2xl leading-relaxed">
            Crafting minimalist digital experiences that prioritize content and clarity. 
            Focused on branding, motion, and interactive storytelling.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

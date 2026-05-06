"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full bg-[var(--background)]/80 backdrop-blur-md border-b border-transparent hover:border-[var(--border)] transition-colors duration-300"
    >
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-xl font-medium tracking-tight hover:opacity-70 transition-opacity"
        >
          Portfolio.
        </Link>
        
        <div className="flex gap-8">
          {["Work", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm font-medium text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
            >
              {item}
            </Link>
          ))}
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;

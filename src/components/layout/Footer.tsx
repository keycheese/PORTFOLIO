import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative border-t border-[var(--ticket-border)] bg-[var(--ink)] py-12 px-6 overflow-hidden select-none">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8 z-10 relative">
        <div className="flex flex-col gap-3">
          <span className="font-[var(--font-mono)] text-xs text-[var(--dusk)] uppercase tracking-widest stamp-label w-fit border-[var(--dusk)] text-[var(--dusk)] bg-transparent">
            // PORTFOLIO 2026
          </span>
          <h2 className="font-[var(--font-display)] text-3xl md:text-4xl text-[var(--mist)] uppercase tracking-tight">
            [Your Name]
          </h2>
          <p className="font-[var(--font-script)] text-xl md:text-2xl text-[var(--sky-soft)] italic">
            "Timeless design paired with intentional motion."
          </p>
        </div>

        <div className="flex flex-col gap-4 font-[var(--font-mono)] text-sm text-[var(--sky-soft)]">
          <a 
            href="mailto:your.email@example.com"
            className="flex items-center gap-3 hover:text-[var(--mist)] transition-colors group clickable-card"
          >
            <span className="uppercase text-[10px] tracking-widest text-[var(--dusk)] w-16 group-hover:text-[var(--sky)] transition-colors">EMAIL //</span>
            <span>your.email@example.com</span>
          </a>
          <a 
            href="https://github.com/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-[var(--mist)] transition-colors group clickable-card"
          >
            <span className="uppercase text-[10px] tracking-widest text-[var(--dusk)] w-16 group-hover:text-[var(--sky)] transition-colors">GITHUB //</span>
            <span>@yourusername</span>
          </a>
          <a 
            href="https://linkedin.com/in/yourusername" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 hover:text-[var(--mist)] transition-colors group clickable-card"
          >
            <span className="uppercase text-[10px] tracking-widest text-[var(--dusk)] w-16 group-hover:text-[var(--sky)] transition-colors">LINKEDIN //</span>
            <span>/in/yourusername</span>
          </a>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute right-10 top-10 opacity-10 text-[var(--sky)] rotate-12 text-6xl select-none pointer-events-none">
        ✦
      </div>
      <div className="absolute left-1/3 bottom-5 opacity-5 text-[var(--mist)] -rotate-12 text-4xl select-none pointer-events-none">
        ✦
      </div>
      
      {/* Noise overlay specific to footer for texture */}
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
    </footer>
  );
}

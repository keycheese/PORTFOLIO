"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", gate: "G1", path: "/" },
  { label: "Học vấn", gate: "G2", path: "/hoc-van" },
  { label: "Dự án", gate: "G3", path: "/du-an" },
  { label: "Ngoại khoá", gate: "G4", path: "/ngoai-khoa" },
  { label: "Kinh nghiệm", gate: "G5", path: "/kinh-nghiem" },
  { label: "Sở thích", gate: "G6", path: "/so-thich" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-3xl">
      <div className="ticket-edge bg-dusk/90 backdrop-blur-md p-3 md:p-4 shadow-xl flex items-center justify-between border border-sky/35 overflow-visible">
        {/* Ticket Cutouts for Boarding Pass Vibe */}
        <div className="ticket-cutout-left" />
        <div className="ticket-cutout-right" />

        {/* Boarding Pass Branding */}
        <div className="hidden sm:flex flex-col items-start border-r border-sky/20 pr-4 font-mono text-[10px] tracking-wider text-sky/60 select-none">
          <span className="font-bold text-signal">BOARDING PASS</span>
          <span>FLIGHT AG-2026</span>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-1 justify-around items-center gap-1 md:gap-3 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <motion.div
                key={item.path}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative"
              >
                <Link
                  href={item.path}
                  className={`flex flex-col items-center px-2 py-1 rounded transition-colors duration-200 relative ${
                    isActive ? "text-mist font-medium" : "text-sky-soft/70 hover:text-mist"
                  }`}
                >
                  <span className="font-mono text-[9px] md:text-[10px] text-signal font-semibold">
                    {item.gate}
                  </span>
                  <span className="text-[11px] md:text-sm whitespace-nowrap">
                    {item.label}
                  </span>

                  {/* Active Indicator slide dot */}
                  {isActive && (
                    <motion.span
                      layoutId="active-dot"
                      className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full bg-signal"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Boarding Pass Class stamp */}
        <div className="hidden md:flex flex-col items-end border-l border-sky/20 pl-4 font-mono text-[10px] tracking-wider text-sky/60 select-none">
          <span className="font-bold text-static text-right">FIRST CLASS</span>
          <span>GATE IN PROGRESS</span>
        </div>
      </div>
    </nav>
  );
}

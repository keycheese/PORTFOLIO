"use client";

import TicketCard from "@/components/TicketCard";

const EXPERIENCES = [
  {
    code: "03/2025 - PRES",
    tag: "INTERNSHIP",
    title: "[Design Agency / Tech Agency Name]",
    subtitle: "UI/UX Designer Intern",
    description: "Directly contributed to commercial design projects, working closely with the Developer team to ensure interfaces were coded precisely and interactions were optimised.",
    accentPoint: true,
  },
  {
    code: "06/2024 - 12/2024",
    tag: "PART-TIME",
    title: "[Creative Studio / Media Agency Name]",
    subtitle: "Graphic Designer & Video Editor",
    description: "Designed monthly Social Media collateral for clients and edited short-form videos in TikTok/Reels format that generated significant organic engagement.",
    accentPoint: false,
  },
  {
    code: "2023 - 2024",
    tag: "FREELANCE",
    title: "[Logo & Brand Identity Projects]",
    subtitle: "Freelance Designer",
    description: "Took on logo design, product packaging, and event media collateral for small and medium-sized businesses and individual entrepreneurs.",
    accentPoint: false,
  },
];

export default function ExperiencePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col gap-10">
        <div>
          <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
            GATE 05 // PROFESSIONAL EXPERIENCE
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-mist tracking-tight mt-1 uppercase">
            Work Experience
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {EXPERIENCES.map((item, idx) => (
            <TicketCard
              key={idx}
              code={item.code}
              tag={item.tag}
              title={item.title}
              subtitle={item.subtitle}
              description={item.description}
              accentPoint={item.accentPoint}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

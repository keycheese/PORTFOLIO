"use client";

import TicketCard from "@/components/TicketCard";

const ACTIVITIES = [
  {
    code: "2024 - PRES",
    tag: "MEDIA CLUB",
    title: "[School Arts / Media Club Name]",
    subtitle: "Head of Communications & Media",
    description: "Led the visual concept development, content planning, and media production for major campus events attracting thousands of students.",
    accentPoint: true,
  },
  {
    code: "SUMMER 2024",
    tag: "VOLUNTEER",
    title: "[Green Summer Volunteer Campaign Name]",
    subtitle: "Media Team Volunteer",
    description: "Assisted with filming, designing educational materials, and teaching basic soft skills to children in remote and underprivileged school locations.",
    accentPoint: false,
  },
  {
    code: "FALL 2023",
    tag: "CAMPUS EVENT",
    title: "[Freshman Welcome / Festival Event Name]",
    subtitle: "Stage Design Team Lead",
    description: "Developed the 3D stage layout, designed banners and standees, and coordinated LED projection technology throughout the live performance show.",
    accentPoint: false,
  },
  {
    code: "MID 2024",
    tag: "COMPETITION",
    title: "[Creative Ideas Contest / Hackathon Name]",
    subtitle: "UX/UI Design Team Member",
    description: "Participated in a social solution product design challenge and achieved an Honorable Mention award with a smart waste management app.",
    accentPoint: false,
  },
];

export default function ActivitiesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col gap-10">
        <div>
          <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
            GATE 04 // EXTRACURRICULAR ACTIVITIES
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-mist tracking-tight mt-1 uppercase">
            Extracurricular Activities
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {ACTIVITIES.map((item, idx) => (
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

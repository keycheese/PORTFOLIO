"use client";

import TicketCard from "@/components/TicketCard";

const educationHistory = [
  {
    code: "2023 - PRES",
    tag: "UNIVERSITY",
    title: "[Your University Name]",
    subtitle: "Major: Multimedia Design",
    description: "Focusing on advanced courses in UI/UX Design, Video Production, Short Film Scriptwriting, and Graphic Arts. Current cumulative GPA at an Excellent level [GPA].",
    accentPoint: true,
  },
  {
    code: "2020 - 2023",
    tag: "HIGH SCHOOL",
    title: "[Your High School Name]",
    subtitle: "Advanced / Honors Track",
    description: "Awarded Academic Excellence for 3 consecutive years. Actively participated in school academic programs and extracurricular activities.",
    accentPoint: false,
  },
  {
    code: "2024",
    tag: "ADVANCED COURSE",
    title: "[Advanced UI/UX Course Name]",
    subtitle: "Certificate from Coursera / Google / Design Systems",
    description: "Completed a 6-month intensive course covering Figma Advanced, UX Research, and hands-on Design Systems implementation.",
    accentPoint: false,
  },
  {
    code: "2025",
    tag: "CERTIFICATE",
    title: "[Language / Professional Skill Certificate]",
    subtitle: "IELTS / TOEIC / Adobe Certified Professional",
    description: "Achieved IELTS [7.5] or Adobe Certified Professional in Visual Design. Ready to work in an international environment with fluent language skills.",
    accentPoint: false,
  },
];

export default function EducationPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col gap-10">
        <div>
          <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
            GATE 02 // EDUCATION RECORD
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-mist tracking-tight mt-1 uppercase">
            Education &amp; Qualifications
          </h1>
        </div>

        <div className="flex flex-col gap-6">
          {educationHistory.map((item, idx) => (
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

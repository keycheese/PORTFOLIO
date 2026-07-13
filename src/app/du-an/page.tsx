"use client";

import { useState } from "react";
import TicketCard from "@/components/TicketCard";

const PROJECTS = [
  {
    code: "PRJ-01",
    tag: "Design",
    title: "[UI/UX Mobile App Project Name]",
    subtitle: "Mobile Application Interface Design",
    description: "Solved the UX challenge for a travel itinerary booking app. Completed the full process from UX Research and Wireframing to high-quality UI Design in Figma.",
    accentPoint: true,
  },
  {
    code: "PRJ-02",
    tag: "TVC",
    title: "[TVC Advertising Project Name]",
    subtitle: "TVC for a Technology Product",
    description: "Produced a TVC introducing a new noise-cancelling headphone product. Served as Visual Director and VFX Scriptwriter, delivering a vibrant audio-visual message.",
    accentPoint: false,
  },
  {
    code: "PRJ-03",
    tag: "Short Film",
    title: "[School Short Film Project Name]",
    subtitle: "Short Film — Social Psychology Genre",
    description: "Final major project for Film Production course. Achieved an outstanding score through a tight narrative, creative cinematography, and distinctive music composition.",
    accentPoint: false,
  },
  {
    code: "PRJ-04",
    tag: "Design",
    title: "[Brand Identity Project Name]",
    subtitle: "Café Brand Identity System",
    description: "Created the logo, core color palette, packaging design, and comprehensive media collateral for a traditional coffee shop chain.",
    accentPoint: false,
  },
  {
    code: "PRJ-05",
    tag: "Other",
    title: "[Music Video / Motion Graphic Project Name]",
    subtitle: "Animated Motion Graphic Video",
    description: "Combined 2D animation and motion graphic VFX to convey song lyrics with emotional depth and artistic flair.",
    accentPoint: false,
  },
  {
    code: "PRJ-06",
    tag: "Design",
    title: "[Portfolio Website Project Name]",
    subtitle: "Personal Portfolio Website",
    description: "Designed and developed this portfolio platform with an exclusive Boarding Pass-style interface, optimised for smooth page transitions and micro-interactions.",
    accentPoint: false,
  },
];

const FILTER_TAGS = ["ALL", "Design", "TVC", "Short Film", "Other"];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("ALL");

  const filteredProjects = activeFilter === "ALL" 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 md:py-20">
      <div className="flex flex-col gap-10">
        {/* Header */}
        <div className="flex flex-col gap-1 md:flex-row md:justify-between md:items-end">
          <div>
            <span className="font-mono text-xs md:text-sm text-signal font-semibold tracking-widest uppercase">
              GATE 03 // ACADEMIC PROJECTS
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-extrabold text-mist tracking-tight mt-1 uppercase">
              Academic Projects
            </h1>
          </div>
          <span className="font-mono text-[10px] text-sky/50 tracking-wider">
            TOTAL BOARDED: {PROJECTS.length} {"//"} ACTIVE: {filteredProjects.length}
          </span>
        </div>

        {/* Client-side filter tags */}
        <div className="flex flex-wrap gap-2.5 border-b border-sky/15 pb-6">
          {FILTER_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`font-mono text-xs uppercase px-4 py-2 border rounded-full transition-all duration-300 cursor-pointer ${
                activeFilter === tag
                  ? "bg-signal text-ink border-signal font-bold shadow-md shadow-signal/10"
                  : "border-sky/20 text-sky-soft/80 hover:border-sky/50 hover:text-mist"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProjects.map((project, idx) => (
            <TicketCard
              key={idx}
              code={project.code}
              tag={project.tag}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              accentPoint={project.accentPoint}
            />
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 font-mono text-sm text-sky/40">
            [ No matching projects found ]
          </div>
        )}
      </div>
    </main>
  );
}

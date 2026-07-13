// Central data source for the entire page structure.
// Add a new section here => Navigation + scroll container auto-updates.

export type SectionId =
  | "home"
  | "education"
  | "school-projects"
  | "activities"
  | "experience"
  | "hobbies";

export interface SiteSection {
  id: SectionId;
  navLabel: string;       // displayed in dot-nav (short)
  title: string;          // large heading inside section
  stamp: string;          // ticket/stamp label, e.g. "01 / DEPARTURE"
}

export const sections: SiteSection[] = [
  {
    id: "home",
    navLabel: "Home",
    title: "Hi, I'm —",
    stamp: "BOARDING · HOME",
  },
  {
    id: "education",
    navLabel: "Education",
    title: "Education",
    stamp: "01 · EDUCATION",
  },
  {
    id: "school-projects",
    navLabel: "Projects",
    title: "Academic Projects",
    stamp: "02 · SCHOOL PROJECTS",
  },
  {
    id: "activities",
    navLabel: "Activities",
    title: "Extracurricular Activities",
    stamp: "03 · ACTIVITIES",
  },
  {
    id: "experience",
    navLabel: "Experience",
    title: "Work Experience",
    stamp: "04 · EXPERIENCE",
  },
  {
    id: "hobbies",
    navLabel: "Hobbies",
    title: "Beyond Work",
    stamp: "05 · HOBBIES",
  },
];

"use client";

import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Minimalist Identity",
    category: "Branding",
    thumbnail: "/projects/project-1.jpg",
  },
  {
    id: 2,
    title: "Editorial Motion",
    category: "Motion Graphics",
    thumbnail: "/projects/project-2.jpg",
    // videoUrl: "/projects/video-1.mp4", // Placeholder for video
  },
  {
    id: 3,
    title: "Aura Skincare",
    category: "Package Design",
    thumbnail: "/projects/project-3.jpg",
  },
  {
    id: 4,
    title: "Zenith Platform",
    category: "Product Design",
    thumbnail: "/projects/project-4.jpg",
  },
  {
    id: 5,
    title: "Abstract Forms",
    category: "Graphic Design",
    thumbnail: "/projects/project-5.jpg",
  },
  {
    id: 6,
    title: "Urban Rhythms",
    category: "Video Showreel",
    thumbnail: "/projects/project-6.jpg",
    // videoUrl: "/projects/video-2.mp4",
  },
];

const ProjectGrid = () => {
  return (
    <section id="work" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              category={project.category}
              thumbnail={project.thumbnail}
              videoUrl={project.videoUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectGrid;

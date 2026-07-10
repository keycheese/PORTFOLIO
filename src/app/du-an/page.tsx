"use client";

import { useState } from "react";
import TicketCard from "@/components/TicketCard";

const PROJECTS = [
  {
    code: "PRJ-01",
    tag: "Design",
    title: "[Tên dự án UI/UX App Mobile]",
    subtitle: "Thiết kế giao diện ứng dụng di động",
    description: "Giải quyết bài toán trải nghiệm người dùng đối với ứng dụng đặt lịch trình du lịch. Thực hiện đầy đủ quy trình từ UX Research, Wireframe đến UI Design chất lượng cao trên Figma.",
    accentPoint: true,
  },
  {
    code: "PRJ-02",
    tag: "TVC",
    title: "[Tên dự án TVC Quảng cáo]",
    subtitle: "TVC quảng cáo sản phẩm công nghệ",
    description: "Sản xuất video TVC giới thiệu sản phẩm tai nghe chống ồn mới. Đóng vai trò Đạo diễn hình ảnh và Biên kịch kỹ xảo, đem lại thông điệp âm thanh sống động.",
    accentPoint: false,
  },
  {
    code: "PRJ-03",
    tag: "Phim ngắn",
    title: "[Tên dự án Phim ngắn học đường]",
    subtitle: "Phim ngắn thể loại tâm lý xã hội",
    description: "Bài tập lớn cuối kỳ môn Sản xuất Phim. Đạt điểm số xuất sắc nhờ cốt truyện chặt chẽ, góc quay điện ảnh sáng tạo và phối nhạc độc đáo.",
    accentPoint: false,
  },
  {
    code: "PRJ-04",
    tag: "Design",
    title: "[Tên dự án Branding thương hiệu]",
    subtitle: "Bộ nhận diện thương hiệu quán cà phê",
    description: "Sáng tạo logo, hệ thống màu sắc chủ đạo, thiết kế bao bì và bộ ấn phẩm truyền thông toàn diện cho chuỗi cửa hàng cà phê truyền thống.",
    accentPoint: false,
  },
  {
    code: "PRJ-05",
    tag: "Khác",
    title: "[Tên dự án MV Ca nhạc / Motion Graphic]",
    subtitle: "Video hoạt họa đồ họa chuyển động",
    description: "Kết hợp hoạt hình 2D và kỹ xảo đồ họa chuyển động để truyền tải lời bài hát đầy cảm xúc và nghệ thuật.",
    accentPoint: false,
  },
  {
    code: "PRJ-06",
    tag: "Design",
    title: "[Tên dự án Website Portfolio]",
    subtitle: "Trang web giới thiệu cá nhân",
    description: "Thiết kế và phát triển nền tảng portfolio này với giao diện Boarding Pass độc quyền, tối ưu hóa trải nghiệm chuyển trang và tương tác vi mô.",
    accentPoint: false,
  },
];

const FILTER_TAGS = ["ALL", "Design", "TVC", "Phim ngắn", "Khác"];

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
              Dự án học thuật
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
            [ Không tìm thấy dự án nào tương thích ]
          </div>
        )}
      </div>
    </main>
  );
}

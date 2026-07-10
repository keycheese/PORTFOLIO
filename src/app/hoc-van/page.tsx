"use client";

import TicketCard from "@/components/TicketCard";

const educationHistory = [
  {
    code: "2023 - PRES",
    tag: "ĐẠI HỌC",
    title: "[Tên trường Đại học của bạn]",
    subtitle: "Chuyên ngành Thiết kế Đa phương tiện // Multimedia Design",
    description: "Tập trung học tập các học phần nâng cao về UI/UX Design, Kỹ thuật Video, Kịch bản Phim ngắn và Mỹ thuật Đồ họa. Điểm trung bình tích lũy hiện tại đạt mức Xuất sắc [GPA].",
    accentPoint: true,
  },
  {
    code: "2020 - 2023",
    tag: "THPT",
    title: "[Tên trường THPT của bạn]",
    subtitle: "Lớp chuyên / Khối chuyên học thuật",
    description: "Đạt danh hiệu Học sinh Giỏi xuất sắc trong 3 năm học. Tích cực tham gia các phong trào học thuật của trường lớp.",
    accentPoint: false,
  },
  {
    code: "2024",
    tag: "CHUYÊN ĐỀ NÂNG CAO",
    title: "[Tên khóa học UI/UX nâng cao]",
    subtitle: "Chứng chỉ từ Coursera / Google / Thiết kế hệ thống",
    description: "Hoàn thành khóa học 6 tháng chuyên sâu về Figma Advanced, Nghiên cứu trải nghiệm người dùng (UX Research) và Thiết kế Hệ thống (Design Systems) thực chiến.",
    accentPoint: false,
  },
  {
    code: "2025",
    tag: "CHỨNG CHỈ",
    title: "[Tên chứng chỉ tiếng Anh / Kỹ năng chuyên môn]",
    subtitle: "IELTS / TOEIC / Adobe Certified Professional",
    description: "Đạt chứng chỉ IELTS [7.5] hoặc Adobe Certified Professional in Visual Design. Sẵn sàng làm việc trong môi trường quốc tế với khả năng ngoại ngữ lưu loát.",
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
            Học vấn & Bằng cấp
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

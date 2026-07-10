"use client";

import TicketCard from "@/components/TicketCard";

const ACTIVITIES = [
  {
    code: "2024 - PRES",
    tag: "CLB TRUYỀN THÔNG",
    title: "[Tên CLB Nghệ thuật / Truyền thông trường]",
    subtitle: "Trưởng ban Truyền thông & Media",
    description: "Chịu trách nhiệm chính trong việc lên ý tưởng hình ảnh, lập kế hoạch bài viết và chỉ đạo sản xuất các ấn phẩm truyền thông cho các sự kiện lớn thu hút hàng ngàn học sinh/sinh viên tham gia.",
    accentPoint: true,
  },
  {
    code: "SUMMER 2024",
    tag: "TÌNH NGUYỆN",
    title: "[Tên Chiến dịch Tình nguyện Mùa hè xanh]",
    subtitle: "Tình nguyện viên Đội Media",
    description: "Tham gia hỗ trợ ghi hình, thiết kế tư liệu và giảng dạy kỹ năng mềm cơ bản cho trẻ em vùng cao tại các điểm trường khó khăn.",
    accentPoint: false,
  },
  {
    code: "FALL 2023",
    tag: "SỰ KIỆN TRƯỜNG",
    title: "[Tên Sự kiện Chào tân sinh viên / Festival]",
    subtitle: "Trưởng nhóm Thiết kế Sân khấu",
    description: "Lên layout 3D sân khấu, thiết kế các banner, standee và điều phối kỹ thuật chiếu LED trong suốt quá trình chạy show biểu diễn trực tiếp.",
    accentPoint: false,
  },
  {
    code: "MID 2024",
    tag: "CUỘC THI",
    title: "[Tên cuộc thi Sáng tạo Ý tưởng / Hackathon]",
    subtitle: "Thành viên Đội Thiết kế UX/UI",
    description: "Tham gia giải quyết đề bài thiết kế sản phẩm giải pháp xã hội, đạt giải Khuyến khích chung cuộc với sản phẩm ứng dụng quản lý rác thải thông minh.",
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
            Hoạt động ngoại khoá
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

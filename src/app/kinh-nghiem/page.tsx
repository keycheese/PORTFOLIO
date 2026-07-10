"use client";

import TicketCard from "@/components/TicketCard";

const EXPERIENCES = [
  {
    code: "03/2025 - PRES",
    tag: "INTERNSHIP",
    title: "[Tên Công ty Thiết kế / Tech Agency]",
    subtitle: "Thực tập sinh Thiết kế UI/UX // UI/UX Designer Intern",
    description: "Tham gia trực tiếp thiết kế các dự án thương mại dịch vụ của công ty, phối hợp chặt chẽ với team Developer để đảm bảo giao diện được lập trình chính xác và tối ưu hiệu ứng.",
    accentPoint: true,
  },
  {
    code: "06/2024 - 12/2024",
    tag: "PART-TIME",
    title: "[Tên Agency Truyền thông / Creative Studio]",
    subtitle: "Graphic Designer kiêm Video Editor",
    description: "Thiết kế bộ ấn phẩm Social Media hàng tháng cho đối tác, chỉnh sửa các video ngắn định dạng TikTok/Reels đem lại lượt tương tác tự nhiên lớn.",
    accentPoint: false,
  },
  {
    code: "2023 - 2024",
    tag: "FREELANCE",
    title: "[Dự án Thiết kế Logo & Bộ nhận diện]",
    subtitle: "Freelance Designer",
    description: "Nhận thiết kế logo, ấn phẩm bao bì sản phẩm và ấn phẩm truyền thông sự kiện cho các doanh nghiệp vừa và nhỏ, cá nhân kinh doanh tự do.",
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
            Kinh nghiệm làm việc
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

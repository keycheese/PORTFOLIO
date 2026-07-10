// Nguồn dữ liệu trung tâm cho toàn bộ cấu trúc trang.
// Thêm section mới ở đây => Navigation + scroll container tự cập nhật.

export type SectionId =
  | "home"
  | "education"
  | "school-projects"
  | "activities"
  | "experience"
  | "hobbies";

export interface SiteSection {
  id: SectionId;
  navLabel: string;       // hiển thị ở dot-nav (ngắn)
  title: string;          // tiêu đề lớn trong section
  stamp: string;          // nhãn kiểu vé/tem, vd "01 / DEPARTURE"
}

export const sections: SiteSection[] = [
  {
    id: "home",
    navLabel: "Home",
    title: "Xin chào, mình là —",
    stamp: "BOARDING · HOME",
  },
  {
    id: "education",
    navLabel: "Học vấn",
    title: "Học vấn",
    stamp: "01 · EDUCATION",
  },
  {
    id: "school-projects",
    navLabel: "Dự án",
    title: "Dự án trong khuôn khổ môn học",
    stamp: "02 · SCHOOL PROJECTS",
  },
  {
    id: "activities",
    navLabel: "Ngoại khoá",
    title: "Hoạt động ngoại khoá",
    stamp: "03 · ACTIVITIES",
  },
  {
    id: "experience",
    navLabel: "Kinh nghiệm",
    title: "Kinh nghiệm làm việc",
    stamp: "04 · EXPERIENCE",
  },
  {
    id: "hobbies",
    navLabel: "Sở thích",
    title: "Ngoài công việc",
    stamp: "05 · HOBBIES",
  },
];

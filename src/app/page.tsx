import Navigation from "@/components/layout/Navigation";
import HomeSection from "@/components/sections/HomeSection";
import SectionWrapper from "@/components/sections/SectionWrapper";
import { sections } from "@/lib/sections";

// Lấy config section theo id để truyền vào SectionWrapper
const byId = (id: string) => sections.find((s) => s.id === id)!;

export default function Home() {
  return (
    <>
      <div className="grain-overlay" />
      <Navigation />

      <main className="scroll-container">
        <HomeSection />

        <SectionWrapper section={byId("education")}>
          {/* TODO: thay bằng timeline thật — mỗi item là 1 card-ticket */}
          <div className="grid gap-6 md:grid-cols-2">
            {["Trường cấp 3", "Đại học", "Khoá học ngoài", "Chứng chỉ"].map(
              (label) => (
                <div key={label} className="card-ticket p-6">
                  <p className="stamp-label mb-3 inline-block">2023 — nay</p>
                  <h3 className="font-[--font-display] text-xl">{label}</h3>
                  <p className="mt-2 text-sm text-[--ink-navy]/70">
                    Mô tả ngắn sẽ được bổ sung sau.
                  </p>
                </div>
              )
            )}
          </div>
        </SectionWrapper>

        <SectionWrapper section={byId("school-projects")}>
          {/* TODO: grid dự án — click mở modal/trang chi tiết từng dự án */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {["Design", "TVC", "Phim ngắn"].map((label) => (
              <div
                key={label}
                className="card-ticket group aspect-[4/5] cursor-pointer overflow-hidden p-6 transition-transform hover:-translate-y-1"
              >
                <p className="stamp-label mb-3 inline-block">Môn học</p>
                <h3 className="font-[--font-display] text-xl">{label}</h3>
                <p className="mt-2 text-sm text-[--ink-navy]/70">
                  Sẽ bổ sung sản phẩm thực tế + ảnh/video sau.
                </p>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper section={byId("activities")}>
          <div className="space-y-4">
            {["CLB tại trường", "Sự kiện trường", "Hoạt động bên ngoài"].map(
              (label) => (
                <div key={label} className="card-ticket flex items-center gap-4 p-5">
                  <span className="stamp-label">CLB</span>
                  <h3 className="font-[--font-display] text-lg">{label}</h3>
                </div>
              )
            )}
          </div>
        </SectionWrapper>

        <SectionWrapper section={byId("experience")}>
          <div className="grid gap-6 md:grid-cols-2">
            {["Part-time", "Freelance"].map((label) => (
              <div key={label} className="card-ticket p-6">
                <p className="stamp-label mb-3 inline-block">Kinh nghiệm</p>
                <h3 className="font-[--font-display] text-xl">{label}</h3>
              </div>
            ))}
          </div>
        </SectionWrapper>

        <SectionWrapper section={byId("hobbies")}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {["Chụp ảnh", "Vẽ", "Xem phim", "Nghe nhạc"].map((label) => (
              <div
                key={label}
                className="card-ticket flex aspect-square items-center justify-center p-4 text-center"
              >
                <span className="font-[--font-display] text-lg">{label}</span>
              </div>
            ))}
          </div>
        </SectionWrapper>
      </main>
    </>
  );
}

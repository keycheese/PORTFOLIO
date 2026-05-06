import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProjectGrid from "@/components/ProjectGrid";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Hero />
        <ProjectGrid />
        
        {/* About Section - Simple and clean */}
        <section id="about" className="py-32 px-6 bg-[var(--muted)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <h2 className="text-4xl font-medium tracking-tight">Focused on <br /> timeless design.</h2>
            <div className="flex flex-col gap-8 max-w-lg">
              <p className="text-xl text-[var(--secondary)] leading-relaxed">
                I believe that good design is invisible. It should serve the content and facilitate a seamless interaction between the user and the message.
              </p>
              <p className="text-lg text-[var(--secondary)] leading-relaxed">
                With over 8 years of experience in the industry, I have helped brands find their voice through minimalist aesthetics and purposeful motion.
              </p>
              <div className="pt-8">
                <button className="px-8 py-4 bg-[var(--foreground)] text-[var(--background)] text-sm font-medium hover:opacity-90 transition-opacity">
                  Learn more about my process
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

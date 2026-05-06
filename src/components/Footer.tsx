import Link from "next/link";

const Footer = () => {
  return (
    <footer id="contact" className="py-20 px-6 border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-medium tracking-tight mb-4">Let&apos;s build something <br /> remarkable together.</h2>
          <a 
            href="mailto:hello@example.com" 
            className="text-lg text-[var(--secondary)] hover:text-[var(--foreground)] transition-colors underline underline-offset-8 decoration-1"
          >
            hello@example.com
          </a>
        </div>
        
        <div className="flex gap-12">
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[var(--secondary)]">Social</span>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-sm hover:opacity-60 transition-opacity">Instagram</Link>
              <Link href="#" className="text-sm hover:opacity-60 transition-opacity">LinkedIn</Link>
              <Link href="#" className="text-sm hover:opacity-60 transition-opacity">Behance</Link>
            </div>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-[var(--secondary)]">Links</span>
            <div className="flex flex-col gap-2">
              <Link href="#work" className="text-sm hover:opacity-60 transition-opacity">Work</Link>
              <Link href="#about" className="text-sm hover:opacity-60 transition-opacity">About</Link>
              <Link href="#" className="text-sm hover:opacity-60 transition-opacity">Resume</Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 flex justify-between items-center text-[var(--secondary)]">
        <p className="text-xs">© 2024 Portfolio. All rights reserved.</p>
        <p className="text-xs">Built with Next.js & Framer Motion</p>
      </div>
    </footer>
  );
};

export default Footer;

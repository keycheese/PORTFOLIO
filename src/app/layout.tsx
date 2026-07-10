import type { Metadata } from "next";
import { Fraunces, Caveat, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/layout/Navigation";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/layout/Footer";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Dreamy Blue Collage Portfolio",
  description: "A portfolio inspired by indie zine and collage aesthetics.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${fraunces.variable} ${caveat.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--ink)] text-[var(--mist)] flex flex-col antialiased selection:bg-[var(--signal)] selection:text-[var(--ink)]">
        <GrainOverlay />
        <CustomCursor />
        <div className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </div>
        <Footer />
        <Navigation />
      </body>
    </html>
  );
}

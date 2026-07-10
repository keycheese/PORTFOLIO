import type { Metadata } from "next";
import { Space_Grotesk, Instrument_Serif, Space_Mono, Inter } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Boarding Pass Portfolio",
  description: "Nền tảng portfolio cá nhân độc đáo theo concept Boarding Pass.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-ink text-mist flex flex-col antialiased selection:bg-signal selection:text-ink">
        <GrainOverlay />
        <PageTransition>{children}</PageTransition>
        <Navigation />
      </body>
    </html>
  );
}

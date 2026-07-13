import type { Metadata } from "next";
import StudioHero from "@/components/studio/StudioHero";

export const metadata: Metadata = {
  title: "Studio — Creative Design & Motion",
  description:
    "We build immersive interfaces and bold visual identities for brands that refuse to blend in.",
};

export default function StudioPage() {
  return <StudioHero />;
}

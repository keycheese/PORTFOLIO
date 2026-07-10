"use client";

import { useEffect, useState } from "react";

interface SplitFlapProps {
  words: string[];
  intervalMs?: number;
}

export default function SplitFlap({ words, intervalMs = 2200 }: SplitFlapProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [words, intervalMs]);

  const activeWord = words[index];
  const maxLength = Math.max(...words.map((w) => w.length));
  const paddedWord = activeWord.padEnd(maxLength, " ");

  return (
    <div className="inline-flex flex-wrap gap-1 md:gap-1.5 font-mono bg-ink-2 p-2 border border-sky/20 rounded-md">
      {paddedWord.split("").map((char, charIdx) => (
        <div
          key={`${charIdx}-${index}`}
          className="relative w-6 h-10 md:w-8 md:h-12 bg-dusk-2 border border-sky/30 rounded flex items-center justify-center overflow-hidden split-flap-char"
        >
          {/* Horizontal line splitting the card */}
          <div className="absolute inset-x-0 top-1/2 h-[1px] bg-ink/50 z-20" />
          
          <span 
            className="split-flap-inner text-lg md:text-xl font-bold text-signal select-none uppercase"
            style={{ 
              animationDelay: `${charIdx * 0.04}s`,
              display: 'inline-block' 
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        </div>
      ))}
    </div>
  );
}

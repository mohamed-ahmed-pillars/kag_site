"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: any;
  range: number[];
  muted?: boolean;
  brand?: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, muted, brand }) => {
  const opacity = useTransform(progress, range, [0, 1]);
  const isDark = useIsDark();
  const color = brand
    ? (isDark ? "#66CDF5" : "#374C9B")
    : muted
      ? (isDark ? "#a0a0a0" : "#707070")
      : (isDark ? "#ffffff" : "#000000");

  return (
    <span className="relative mt-[12px] mr-3 text-3xl font-normal">
      <span className="absolute" style={{ color, opacity: 0.2 }}>{children}</span>
      <motion.span style={{ opacity, color }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  // Words wrapped in *asterisks* render muted; ~tildes~ render in brand color
  const tokens = text.split(" ").map((raw) => {
    const isMuted = raw.startsWith("*") && raw.endsWith("*");
    const isBrand = raw.startsWith("~") && raw.endsWith("~");
    const word = isMuted ? raw.slice(1, -1) : isBrand ? raw.slice(1, -1) : raw;
    return { word, muted: isMuted, brand: isBrand };
  });

  return (
    <p ref={container} className="flex flex-wrap leading-[0.5] p-4">
      {tokens.map(({ word, muted, brand }, i) => {
        const start = i / tokens.length;
        const end = start + 1 / tokens.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]} muted={muted} brand={brand}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};

"use client";

import { cn } from "@/lib/utils";

interface BlurEffectProps {
  position?: "top" | "bottom";
  intensity?: number;
  className?: string;
}

export function BlurEffect({ position = "bottom", intensity = 80, className }: BlurEffectProps) {
  const maskDirection = position === "bottom"
    ? "linear-gradient(to top, black 30%, transparent 100%)"
    : "linear-gradient(to bottom, black 30%, transparent 100%)";

  return (
    <div
      className={cn("pointer-events-none w-full", className)}
      style={{
        backdropFilter: `blur(${intensity * 0.12}px)`,
        WebkitBackdropFilter: `blur(${intensity * 0.12}px)`,
        maskImage: maskDirection,
        WebkitMaskImage: maskDirection,
        backgroundColor: 'transparent',
      }}
    />
  );
}

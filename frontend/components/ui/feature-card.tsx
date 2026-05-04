"use client";

import { BlurFade } from "@/components/ui/blur-fade";

interface FeatureCardProps {
  title: string;
  description: string;
  illustration: React.ReactNode;
  delay?: number;
}

export function FeatureCard({ title, description, illustration, delay = 0 }: FeatureCardProps) {
  return (
    <BlurFade delay={delay} inView className="h-full">
      <div
        className="relative h-full transform transition-all duration-500 ease-out"
        style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.02) rotateY(3deg) rotateX(2deg)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1) rotateY(0deg) rotateX(0deg)";
        }}
      >
        {/* Main Card */}
        <div
          className="relative w-full h-full flex flex-col rounded-3xl overflow-hidden transition-all duration-500"
          style={{
            backgroundColor: 'var(--card-bg)',
            borderTop: 'var(--card-border-top)',
            boxShadow: 'var(--card-shadow)',
          }}
        >
          {/* Illustration slot */}
          <div className="h-44 sm:h-52 md:h-64 shrink-0 flex items-center justify-center">
            {illustration}
          </div>

          {/* Text content — grows to fill remaining height */}
          <div className="flex-1 px-6 pb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{description}</p>
          </div>
        </div>

        {/* 3D Shadow Layer */}
        <div
          className="absolute inset-0 rounded-3xl bg-gray-400/15 -z-10"
          style={{ transform: "translateZ(-20px) translateY(6px) translateX(3px)", filter: "blur(8px)" }}
        />

        {/* Secondary Shadow Layer */}
        <div
          className="absolute inset-0 rounded-3xl bg-gray-300/10 -z-20"
          style={{ transform: "translateZ(-40px) translateY(10px) translateX(5px)", filter: "blur(14px)" }}
        />
      </div>
    </BlurFade>
  );
}

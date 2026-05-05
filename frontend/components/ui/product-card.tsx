"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === "dark";
}

// ── Product card text colors — edit here to test ──────────────
const cardColors = (isDark: boolean) => ({
  categoryText: isDark ? "#9ca3af" : "#354c9a",   // category label + icon
  titleText:    isDark ? "#f3f4f6" : "#354c9a",   // product title
});
// ──────────────────────────────────────────────────────────────

interface ProductHighlightCardProps {
  className?: string;
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  brandLogoSrc?: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, categoryIcon, category, title, description, imageSrc, imageAlt, brandLogoSrc }, ref) => {
    const COLORS = cardColors(useIsDark());

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);

    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);

    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);
    const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

    return (
      <div className="relative">
        <motion.div
          ref={ref}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            mouseX.set(0);
            mouseY.set(0);
          }}
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            transformStyle: "preserve-3d",
            borderTop: 'var(--card-border-top)',
            boxShadow: 'var(--card-shadow)',
            backgroundColor: 'var(--card-bg)',
          }}
          className={cn(
            "relative h-[260px] sm:h-[300px] md:h-[350px] w-full rounded-3xl transition-shadow duration-300",
            className
          )}
        >
          <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="absolute inset-4 rounded-xl bg-card-foreground/5 shadow-inner">

            {/* Diagonal line texture */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

            {/* Glow effect */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(80px at ${glowX}% ${glowY}%, hsl(var(--primary)), transparent 40%)`,
              }}
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 gap-2">
              <div>
                <div className="flex items-center space-x-2" style={{ color: COLORS.categoryText }}>
                  {categoryIcon}
                  <span className="text-sm font-medium">{category}</span>
                </div>
                <div className="mt-4">
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: COLORS.titleText }}>{title}</h2>
                  <p className="mt-1 max-w-[60%] text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
              {brandLogoSrc && (
                <div className="flex items-end">
                  <img
                    src={brandLogoSrc}
                    alt="brand logo"
                    className="h-16 sm:h-20 md:h-24 w-auto object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Product image */}
        <motion.div
          style={{ rotateX: springRotateX, rotateY: springRotateY }}
          className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 md:-right-12 md:-bottom-12 z-10"
        >
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            whileHover={{ scale: 1.1, y: -20, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="h-28 w-28 sm:h-40 sm:w-40 md:h-56 md:w-56 object-contain"
          />
        </motion.div>
      </div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";

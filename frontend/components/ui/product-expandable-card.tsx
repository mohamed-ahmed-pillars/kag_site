"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { FlowButton } from "@/components/ui/flow-button";
import { cn } from "@/lib/utils";

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === "dark";
}

const cardColors = (isDark: boolean) => ({
  categoryText: isDark ? "#9ca3af" : "#354c9a",
  titleText: isDark ? "#f3f4f6" : "#354c9a",
});

export interface RelatedProduct {
  id: number;
  title: string;
  category: string;
  color: string;
  imageSrc: string;
  onClick: () => void;
}

export interface ProductExpandableCardProps {
  id: number;
  categoryIcon: React.ReactNode;
  category: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  brandLogoSrc?: string;
  specs: {
    origin: string;
    shelfLife: string;
    storage: string;
    sizes: string[];
  };
  packagingOptions: {
    type: string;
    sizes: string[];
  }[];
  features: string[];
  relatedProducts: RelatedProduct[];
  quoteHref: string;
  className?: string;
  onRegisterOpen?: (fn: () => void) => void;
}

export function ProductExpandableCard({
  id,
  categoryIcon,
  category,
  title,
  description,
  imageSrc,
  imageAlt,
  brandLogoSrc,
  specs,
  packagingOptions,
  features,
  relatedProducts,
  quoteHref,
  className,
  onRegisterOpen,
}: ProductExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId();
  const COLORS = cardColors(useIsDark());

  React.useEffect(() => {
    onRegisterOpen?.(() => setActive(true));
  }, [onRegisterOpen]);

  // Collapsed card 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 350], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 350], [-10, 10]), springConfig);
  const glowX = useTransform(mouseX, [0, 350], [0, 100]);
  const glowY = useTransform(mouseY, [0, 350], [0, 100]);
  const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

  // Expanded image 3D tilt
  const imgX = useMotionValue(0);
  const imgY = useMotionValue(0);
  const imgRX = useSpring(useTransform(imgY, [0, 300], [8, -8]), springConfig);
  const imgRY = useSpring(useTransform(imgX, [0, 300], [-8, 8]), springConfig);

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(false); };
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setActive(false);
    };
    if (active) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
      document.addEventListener("mousedown", onClickOutside);
      document.addEventListener("touchstart", onClickOutside);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
    };
  }, [active]);

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/50 dark:bg-black/50 backdrop-blur-md h-full w-full z-40"
          />
        )}
      </AnimatePresence>

      {/* Expanded panel */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-50 p-4">
            <motion.div
              layoutId={`product-card-${id}-${uid}`}
              ref={cardRef}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl"
              style={{ borderTop: 'var(--card-border-top)' }}
            >
              {/* Close button */}
              <div className="sticky top-0 z-10 flex justify-end p-4 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-t-3xl">
                <button
                  onClick={() => setActive(false)}
                  className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 pb-10 flex flex-col items-center gap-8">
                {/* Brand logo */}
                {brandLogoSrc && (
                  <img src={brandLogoSrc} alt="brand logo" className="h-16 w-auto object-contain" />
                )}

                {/* Product image with 3D tilt */}
                <motion.div
                  className="cursor-pointer"
                  onMouseMove={({ clientX, clientY, currentTarget }) => {
                    const { left, top } = currentTarget.getBoundingClientRect();
                    imgX.set(clientX - left);
                    imgY.set(clientY - top);
                  }}
                  onMouseLeave={() => { imgX.set(0); imgY.set(0); }}
                  style={{ rotateX: imgRX, rotateY: imgRY, transformStyle: "preserve-3d" }}
                >
                  <motion.img
                    src={imageSrc}
                    alt={imageAlt}
                    whileHover={{ scale: 1.08, y: -12 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="h-48 md:h-64 w-auto object-contain"
                  />
                </motion.div>

                {/* Name + description */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: '#354c9a' }}>
                    {title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base max-w-md mx-auto">
                    {description}
                  </p>
                </div>

                {/* Quick Specs */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Quick Specs</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Origin", value: specs.origin },
                      { label: "Shelf Life", value: specs.shelfLife },
                      { label: "Storage", value: specs.storage },
                      { label: "Sizes", value: specs.sizes.join(", ") },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging Options */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Packaging Options</h3>
                  <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
                    {packagingOptions.map((opt) => (
                      <div
                        key={opt.type}
                        className="shrink-0 rounded-2xl p-4 min-w-[160px]"
                        style={{ backgroundColor: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                      >
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">{opt.type}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {opt.sizes.map((size) => (
                            <span
                              key={size}
                              className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Product Features */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Product Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div className="mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#354c9a1a' }}>
                          <Check className="w-3 h-3" style={{ color: '#354c9a' }} />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">Related Products</h3>
                    <div className="flex gap-3 overflow-x-auto pb-2 [scrollbar-width:none]">
                      {relatedProducts.map((rel) => (
                        <button
                          key={rel.id}
                          onClick={() => { setActive(false); setTimeout(rel.onClick, 150); }}
                          className={cn("shrink-0 rounded-2xl overflow-hidden w-32 h-32 relative cursor-pointer group", rel.color)}
                        >
                          <img
                            src={rel.imageSrc}
                            alt={rel.title}
                            className="absolute bottom-0 right-0 h-20 w-20 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                          <p className="absolute top-2 left-2 text-xs font-semibold text-gray-800 dark:text-gray-100 max-w-[70%] leading-tight">
                            {rel.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <Link href={quoteHref}>
                  <FlowButton text="Request a Quote" variant="solid" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed card */}
      <div className="relative">
        <motion.div
          layoutId={`product-card-${id}-${uid}`}
          onClick={() => setActive(true)}
          onMouseMove={({ clientX, clientY, currentTarget }) => {
            const { left, top } = currentTarget.getBoundingClientRect();
            mouseX.set(clientX - left);
            mouseY.set(clientY - top);
          }}
          onMouseLeave={() => { mouseX.set(0); mouseY.set(0); }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            borderTop: 'var(--card-border-top)',
            boxShadow: 'var(--card-shadow)',
            backgroundColor: 'var(--card-bg)',
          }}
          className={cn(
            "relative h-[260px] sm:h-[300px] md:h-[350px] w-full rounded-3xl transition-shadow duration-300 cursor-pointer",
            className
          )}
        >
          <div
            style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
            className="absolute inset-4 rounded-xl bg-card-foreground/5 shadow-inner"
          >
            <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
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
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight" style={{ color: COLORS.titleText }}>
                    {title}
                  </h2>
                  <p className="mt-1 max-w-[60%] text-sm text-muted-foreground">{description}</p>
                </div>
              </div>
              {brandLogoSrc && (
                <div className="flex items-end">
                  <img src={brandLogoSrc} alt="brand logo" className="h-16 sm:h-20 md:h-24 w-auto object-contain" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating product image — hide when expanded to avoid snap */}
        {!active && (
          <motion.div
            style={{ rotateX, rotateY }}
            className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 md:-right-12 md:-bottom-12 z-10 pointer-events-none"
          >
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              whileHover={{ scale: 1.1, y: -20, x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="h-28 w-28 sm:h-40 sm:w-40 md:h-56 md:w-56 object-contain"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}

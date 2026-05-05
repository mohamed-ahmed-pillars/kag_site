"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { Check, X, ChevronDown } from "lucide-react";
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
  brandColor: isDark ? "#ffffff" : "#354c9a",
  brandColorBg: isDark ? "#ffffff1a" : "#354c9a1a",
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
  nutritionFacts?: {
    servingSize: string;
    calories: number;
    totalFat: { g: number; dv: number };
    saturatedFat: { g: number; dv: number };
    transFat: { g: number };
    cholesterol: { mg: number; dv: number };
    sodium: { mg: number; dv: number };
    totalCarbs: { g: number; dv: number };
    dietaryFiber: { g: number; dv: number };
    totalSugars: { g: number };
    addedSugars: { g: number; dv: number };
    protein: { g: number };
    vitaminD?: { mcg: number; dv: number };
    calcium?: { mg: number; dv: number };
    iron?: { mg: number; dv: number };
    potassium?: { mg: number; dv: number };
  };
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
  nutritionFacts,
  relatedProducts,
  quoteHref,
  className,
  onRegisterOpen,
}: ProductExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId();
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [showScrollHint, setShowScrollHint] = React.useState(true);
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
    if (!active) { setShowScrollHint(true); return; }
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(false); };
    const onClickOutside = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) setActive(false);
    };
    const onScroll = () => {
      const el = scrollRef.current;
      if (!el) return;
      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;
      setShowScrollHint(!atBottom);
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("touchstart", onClickOutside);
    scrollRef.current?.addEventListener("scroll", onScroll);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("touchstart", onClickOutside);
      scrollRef.current?.removeEventListener("scroll", onScroll);
    };
  }, [active]);

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

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
              className="w-full max-w-4xl rounded-3xl bg-white dark:bg-zinc-900 shadow-2xl"
              style={{ borderTop: 'var(--card-border-top)', maxHeight: '90vh' }}
            >
              <div
                ref={scrollRef}
                className="h-full max-h-[90vh] overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] rounded-3xl"
                onWheel={(e) => e.stopPropagation()}
                onTouchMove={(e) => e.stopPropagation()}
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
                  <img src={brandLogoSrc} alt="brand logo" className="h-36 w-auto object-contain dark:brightness-0 dark:invert" />
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
                    className="h-80 md:h-96 w-auto object-contain"
                  />
                </motion.div>

                {/* Name + description */}
                <div className="text-center">
                  <h2 className="text-3xl font-bold tracking-tight mb-2" style={{ color: COLORS.titleText }}>
                    {title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-base max-w-md mx-auto">
                    {description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.brandColor }}>Specifications</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: "Origin", values: [specs.origin] },
                      { label: "Shelf Life", values: [specs.shelfLife] },
                      { label: "Storage", values: [specs.storage] },
                      { label: "Sizes", values: specs.sizes },
                    ].map(({ label, values }) => (
                      <div
                        key={label}
                        className="rounded-2xl p-4"
                        style={{ backgroundColor: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                      >
                        <p className="text-xs font-medium mb-2" style={{ color: COLORS.brandColor }}>{label}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {values.map((v) => (
                            <span
                              key={v}
                              className="text-xs px-2 py-0.5 rounded-full bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-400"
                            >
                              {v}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Packaging Options */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.brandColor }}>Packaging Options</h3>
                  <div className="flex flex-wrap justify-center gap-3">
                    {packagingOptions.map((opt) => (
                      <div
                        key={opt.type}
                        className="rounded-2xl p-4 w-[160px]"
                        style={{ backgroundColor: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                      >
                        <p className="text-sm font-semibold mb-2" style={{ color: COLORS.brandColor }}>{opt.type}</p>
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

                {/* Nutrition Facts */}
                {nutritionFacts && (
                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.brandColor }}>Nutrition Facts</h3>
                    <div className="p-2.5 font-sans max-w-[260px] mx-auto text-xs" style={{ border: `4px solid ${COLORS.brandColor}`, color: COLORS.brandColor }}>
                      <p className="text-2xl font-extrabold leading-none">Nutrition Facts</p>
                      <div className="mt-1" style={{ borderBottom: `8px solid ${COLORS.brandColor}` }} />
                      <div className="flex justify-between items-end">
                        <span className="text-xl font-extrabold">Calories</span>
                        <span className="text-3xl font-extrabold">{nutritionFacts.calories}</span>
                      </div>
                      <div className="mt-1" style={{ borderBottom: `4px solid ${COLORS.brandColor}` }} />
                      <p className="font-bold text-right text-[10px]">% Daily Value*</p>
                      {[
                        { label: <><span className="font-bold">Total Fat</span> {nutritionFacts.totalFat.g}g</>, dv: nutritionFacts.totalFat.dv },
                        { label: <>Saturated Fat {nutritionFacts.saturatedFat.g}g</>, dv: nutritionFacts.saturatedFat.dv, indent: true },
                        { label: <><span className="italic">Trans</span> Fat {nutritionFacts.transFat.g}g</>, indent: true },
                        { label: <><span className="font-bold">Cholesterol</span> {nutritionFacts.cholesterol.mg}mg</>, dv: nutritionFacts.cholesterol.dv },
                        { label: <><span className="font-bold">Sodium</span> {nutritionFacts.sodium.mg}mg</>, dv: nutritionFacts.sodium.dv },
                        { label: <><span className="font-bold">Total Carbohydrate</span> {nutritionFacts.totalCarbs.g}g</>, dv: nutritionFacts.totalCarbs.dv },
                        { label: <>Dietary Fiber {nutritionFacts.dietaryFiber.g}g</>, dv: nutritionFacts.dietaryFiber.dv, indent: true },
                        { label: <>Total Sugars {nutritionFacts.totalSugars.g}g</>, indent: true },
                        { label: <>Includes {nutritionFacts.addedSugars.g}g Added Sugars</>, dv: nutritionFacts.addedSugars.dv, indent: true, doubleIndent: true },
                        { label: <><span className="font-bold">Protein</span> {nutritionFacts.protein.g}g</> },
                      ].map((row, i) => (
                        <div key={i} className={`flex justify-between py-px ${row.indent ? 'pl-3' : ''} ${(row as { doubleIndent?: boolean }).doubleIndent ? 'pl-6' : ''}`} style={{ borderTop: `1px solid ${COLORS.brandColor}` }}>
                          <span>{row.label}</span>
                          {(row as { dv?: number }).dv !== undefined && <span className="font-bold">{(row as { dv?: number }).dv}%</span>}
                        </div>
                      ))}
                      <div className="mt-1" style={{ borderTop: `8px solid ${COLORS.brandColor}` }} />
                      <div className="grid grid-cols-2 gap-x-2 mt-1">
                        {nutritionFacts.vitaminD && <span>Vitamin D {nutritionFacts.vitaminD.mcg}mcg <b>{nutritionFacts.vitaminD.dv}%</b></span>}
                        {nutritionFacts.calcium && <span>Calcium {nutritionFacts.calcium.mg}mg <b>{nutritionFacts.calcium.dv}%</b></span>}
                        {nutritionFacts.iron && <span>Iron {nutritionFacts.iron.mg}mg <b>{nutritionFacts.iron.dv}%</b></span>}
                        {nutritionFacts.potassium && <span>Potassium {nutritionFacts.potassium.mg}mg <b>{nutritionFacts.potassium.dv}%</b></span>}
                      </div>
                    </div>
                  </div>
                )}

                {/* Product Features */}
                <div className="w-full">
                  <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.brandColor }}>Product Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start gap-2">
                        <div className="mt-0.5 shrink-0 h-5 w-5 rounded-full flex items-center justify-center" style={{ backgroundColor: COLORS.brandColorBg }}>
                          <Check className="w-3 h-3" style={{ color: COLORS.brandColor }} />
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div className="w-full">
                    <h3 className="text-lg font-semibold mb-3" style={{ color: COLORS.brandColor }}>Related Products</h3>
                    <div className="flex flex-wrap justify-center gap-3">
                      {relatedProducts.map((rel) => (
                        <button
                          key={rel.id}
                          onClick={() => {
                          setActive(false);
                          if (timeoutRef.current) clearTimeout(timeoutRef.current);
                          timeoutRef.current = setTimeout(rel.onClick, 150);
                        }}
                          className={cn("rounded-2xl overflow-hidden w-48 h-40 relative cursor-pointer group", rel.color)}
                        >
                          <img
                            src={rel.imageSrc}
                            alt={rel.title}
                            className="absolute bottom-0 right-0 h-28 w-28 object-contain group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 rounded-2xl" />
                          <p className="absolute top-2 left-2 text-sm font-semibold max-w-[60%] leading-tight" style={{ color: '#354c9a' }}>
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

              {/* Scroll hint */}
              <AnimatePresence>
                {showScrollHint && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ y: [0, 6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    className="sticky bottom-4 flex justify-end pr-4 pointer-events-none"
                  >
                    <div className="flex flex-col items-center gap-1 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md">
                      <ChevronDown className="w-4 h-4" style={{ color: COLORS.brandColor }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collapsed card */}
      <div className="relative">
        <motion.div
          layoutId={`product-card-${id}-${uid}`}
          role="button"
          tabIndex={0}
          aria-label={`View ${title} details`}
          onClick={() => setActive(true)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(true); } }}
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
                </div>
              </div>
              {brandLogoSrc && (
                <div className="flex items-end">
                  <img src={brandLogoSrc} alt="brand logo" className="h-16 sm:h-20 md:h-24 w-auto object-contain dark:brightness-0 dark:invert" />
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Floating product image — hide when expanded to avoid snap */}
        {!active && (
          <motion.div
            style={{ rotateX, rotateY }}
            onClick={() => setActive(true)}
            className="absolute -right-4 -bottom-4 sm:-right-8 sm:-bottom-8 md:-right-12 md:-bottom-12 z-10 cursor-pointer"
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

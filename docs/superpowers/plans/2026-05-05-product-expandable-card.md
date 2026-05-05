# Product Expandable Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the routed product detail page with an expand-in-place card modal identical to the news ExpandableCard pattern.

**Architecture:** A new `ProductExpandableCard` component owns both the collapsed card UI (identical to `ProductHighlightCard`) and the expanded overlay layout. `ProductShowcase` swaps its `<Link>` + `ProductHighlightCard` usage for `ProductExpandableCard`. The `/products/[slug]` route is untouched.

**Tech Stack:** Next.js 15, Framer Motion (layoutId, AnimatePresence, useMotionValue, useSpring, useTransform), Tailwind v4, next-themes, lucide-react

---

### Task 1: Create `ProductExpandableCard` component

**Files:**
- Create: `frontend/components/ui/product-expandable-card.tsx`

- [ ] **Step 1: Create the file with full implementation**

```tsx
"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { Check, X } from "lucide-react";
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
}: ProductExpandableCardProps) {
  const [active, setActive] = React.useState(false);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const uid = React.useId();
  const COLORS = cardColors(useIsDark());

  // Collapsed card 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 350], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 350], [-10, 10]), springConfig);
  const glowX = useTransform(mouseX, [0, 350], [0, 100]);
  const glowY = useTransform(mouseY, [0, 350], [0, 100]);
  const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.5]);

  // Expanded image 3D tilt (separate motion values)
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
                  <img
                    src={brandLogoSrc}
                    alt="brand logo"
                    className="h-16 w-auto object-contain"
                  />
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
                <a href={quoteHref}>
                  <FlowButton text="Request a Quote" variant="solid" />
                </a>
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
            {/* Grid texture */}
            <div className="absolute inset-0 rounded-xl bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

            {/* Glow */}
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

        {/* Floating product image */}
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
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
cd frontend && git add components/ui/product-expandable-card.tsx
git commit -m "feat: add ProductExpandableCard component with expand-in-place animation"
```

---

### Task 2: Update `ProductShowcase` to use `ProductExpandableCard`

**Files:**
- Modify: `frontend/components/sections/ProductShowcase.tsx`

- [ ] **Step 1: Replace the file content**

Replace the entire file with the following:

```tsx
'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Droplets, Leaf, Flame, ShoppingBag, Package } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';
import { ProductExpandableCard } from '@/components/ui/product-expandable-card';
import { FlowButton } from '@/components/ui/flow-button';

const defaultSpecs = {
  origin: 'Egypt',
  shelfLife: '24 months',
  storage: 'Store in cool, dry place',
  sizes: ['250ml', '500ml', '1L', '5L', '18L'],
};

const defaultPackaging = [
  { type: 'Glass Bottle', sizes: ['250ml', '500ml', '1L'] },
  { type: 'PET Bottle', sizes: ['500ml', '1L', '2L'] },
  { type: 'Tin Can', sizes: ['5L', '18L'] },
];

const defaultFeatures = [
  'Cold-pressed for maximum freshness',
  'No artificial preservatives',
  'ISO 22000 certified facility',
  'Export-grade quality control',
  'Halal certified',
  'Available for private label',
];

const products = [
  {
    id: 1,
    slug: 'sunflower-oil',
    category_en: 'Oils',
    category_ar: 'الزيوت',
    name_en: 'Sunflower Oil',
    name_ar: 'زيت عباد الشمس',
    desc_en: 'Pure and refined sunflower oil for everyday cooking.',
    desc_ar: 'زيت عباد شمس نقي ومكرر للطبخ اليومي.',
    image: '/products/Tin_Can_Oil_copy.png',
    icon: Droplets,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-yellow-50',
  },
  {
    id: 2,
    slug: 'olive-oil',
    category_en: 'Oils',
    category_ar: 'الزيوت',
    name_en: 'Extra Virgin Olive Oil',
    name_ar: 'زيت زيتون بكر ممتاز',
    desc_en: 'Cold-pressed extra virgin olive oil from the finest olives.',
    desc_ar: 'زيت زيتون بكر معصور على البارد من أجود الزيتون.',
    image: '/products/Tin_Can_Olive_Oil_copy.png',
    icon: Leaf,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-green-50',
  },
  {
    id: 3,
    slug: 'tomato-paste',
    category_en: 'Sauces',
    category_ar: 'الصلصات',
    name_en: 'Tomato Paste',
    name_ar: 'معجون الطماطم',
    desc_en: 'Rich concentrated tomato paste for authentic flavors.',
    desc_ar: 'معجون طماطم مركز غني لنكهات أصيلة.',
    image: '/products/Tin_Can_tomato_copy.png',
    icon: ShoppingBag,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-red-50',
  },
  {
    id: 4,
    slug: 'hot-sauce',
    category_en: 'Sauces',
    category_ar: 'الصلصات',
    name_en: 'Hot Chili Sauce',
    name_ar: 'صلصة الفلفل الحار',
    desc_en: 'Fiery chili sauce made from hand-picked peppers.',
    desc_ar: 'صلصة فلفل حار مصنوعة من الفلفل المختار يدوياً.',
    image: '/products/Tin_Can_Hot_Chili_copy[78].png',
    icon: Flame,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-orange-50',
  },
  {
    id: 5,
    slug: 'tahini',
    category_en: 'Spreads',
    category_ar: 'المعجونات',
    name_en: 'Tahini',
    name_ar: 'طحينة',
    desc_en: 'Smooth and creamy tahini made from roasted sesame seeds.',
    desc_ar: 'طحينة ناعمة وكريمية مصنوعة من السمسم المحمص.',
    image: '/products/Tin_Can_Tahini_copy.png',
    icon: ShoppingBag,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-amber-50',
  },
  {
    id: 6,
    slug: 'mixed-pickles',
    category_en: 'Pickles',
    category_ar: 'المخللات',
    name_en: 'Mixed Pickles',
    name_ar: 'مخلل مشكل',
    desc_en: 'Traditional mixed pickles with a perfect tangy taste.',
    desc_ar: 'مخللات مشكلة تقليدية بطعم حامض مثالي.',
    image: '/products/Tin_Can_Plain_copy[58].png',
    icon: Leaf,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-lime-50',
  },
];

export default function ProductShowcase() {
  const t = useTranslations('home.products');
  const locale = useLocale();

  // Refs to imperatively open a card (for related product clicks)
  const openFns = useRef<Record<number, () => void>>({});

  return (
    <section className="py-20">
      <Container>
        <div className="flex justify-center mb-4">
          <div
            className="inline-block rounded-3xl px-4 py-1.5"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderTop: 'var(--card-border-top)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Package className="w-4 h-4" />
              {t('badge')}
            </span>
          </div>
        </div>
        <SectionTitle subtitle={t('subtitle')} title={t('title')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-14 md:gap-y-16">
          {products.map((product) => {
            const Icon = product.icon;
            const relatedProducts = products
              .filter((p) => p.id !== product.id)
              .slice(0, 4)
              .map((p) => ({
                id: p.id,
                title: locale === 'ar' ? p.name_ar : p.name_en,
                category: locale === 'ar' ? p.category_ar : p.category_en,
                color: p.color,
                imageSrc: p.image,
                onClick: () => openFns.current[p.id]?.(),
              }));

            return (
              <ProductExpandableCard
                key={product.id}
                id={product.id}
                category={locale === 'ar' ? product.category_ar : product.category_en}
                categoryIcon={<Icon className="h-4 w-4" />}
                title={locale === 'ar' ? product.name_ar : product.name_en}
                description={locale === 'ar' ? product.desc_ar : product.desc_en}
                imageSrc={product.image}
                imageAlt={product.name_en}
                brandLogoSrc={product.brandLogo}
                specs={defaultSpecs}
                packagingOptions={defaultPackaging}
                features={defaultFeatures}
                relatedProducts={relatedProducts}
                quoteHref={`/${locale}/quotation`}
                onRegisterOpen={(fn) => { openFns.current[product.id] = fn; }}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link href={`/${locale}/products`}>
            <FlowButton text={t('viewAll')} variant="solid" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
```

- [ ] **Step 2: Add `onRegisterOpen` prop to `ProductExpandableCard`**

In `frontend/components/ui/product-expandable-card.tsx`, add the `onRegisterOpen` prop so parent can trigger open imperatively:

```tsx
// Add to ProductExpandableCardProps interface:
onRegisterOpen?: (fn: () => void) => void;

// Add to function params:
{ ..., onRegisterOpen, ... }: ProductExpandableCardProps

// Add inside the component, after useState:
React.useEffect(() => {
  onRegisterOpen?.(() => setActive(true));
}, [onRegisterOpen]);
```

- [ ] **Step 3: Commit**

```bash
git add frontend/components/ui/product-expandable-card.tsx frontend/components/sections/ProductShowcase.tsx
git commit -m "feat: wire ProductExpandableCard into ProductShowcase, replace Link routing with expand-in-place"
```

---

### Task 3: Verify in browser

- [ ] **Step 1: Start the dev server**

```bash
cd frontend && bun run dev
```

- [ ] **Step 2: Check these behaviours**
  - Click any product card → expands in-place with blurred backdrop
  - Brand logo appears centered at top of expanded panel
  - Product image has 3D tilt on hover inside expanded panel
  - All sections render: specs grid, packaging scroll, features checklist, related products row, CTA button
  - Click outside expanded panel → closes
  - Press `Escape` → closes
  - Click X button → closes
  - Click a related product card → current panel closes, related opens after 150ms
  - Dark mode: all sections readable

- [ ] **Step 3: Commit any fixes found during verification**

```bash
git add -p
git commit -m "fix: product expandable card browser verification fixes"
```

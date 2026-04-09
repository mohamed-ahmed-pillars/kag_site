# Page Neumorphic Reskin Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle all inner pages to match the neumorphic design language used in the homepage sections (white backgrounds, pill badges with inset box-shadows, FeatureCard-style cards, no color gradients).

**Architecture:** Each page file is edited in-place — no new components needed. Reuse existing `FeatureCard`, `ExpandableCard`, `FlowButton` components. Apply consistent neumorphic CSS tokens (defined below) to replace all `bg-primary-*` gradients and pill badges.

**Tech Stack:** Next.js 15, TypeScript, Tailwind v4, Framer Motion, Lucide React. Use `bun run dev` to verify visually.

---

## Neumorphic Design Tokens (reference for all tasks)

```tsx
// Raised pill badge (section header)
const pillBadgeStyle = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};
// className: "inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"

// Large section wrapper (like GlobalMap)
const sectionWrapperStyle = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};
// className: "relative w-full rounded-3xl bg-[#f5f5f5] p-8 md:p-12"

// Filter pill — active (pressed)
const activePillStyle = {
  background: '#e0e0e0',
  boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)',
};

// Filter pill — inactive (raised)
const inactivePillStyle = {
  background: '#f5f5f5',
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '3px 3px 8px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9)',
};

// Neumorphic icon disc (replaces bg-primary-100 icon boxes)
// className: "w-12 h-12 rounded-2xl bg-[#ebebeb] flex items-center justify-center"
// style: { boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }
```

---

## Task 1: Products Page

**File:** `frontend/app/[locale]/products/page.tsx`

**Step 1: Replace the page wrapper background and add neumorphic badge**

Replace the entire file content with:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';
import { CategoryFilter, ProductGrid } from '@/components/sections/products';

export default function ProductsPage() {
  const t = useTranslations('products');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="py-20 bg-white min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Neumorphic badge */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Package className="w-4 h-4" />
                {t('badge') || 'PRODUCTS'}
              </span>
            </div>
          </div>

          <SectionTitle
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </motion.div>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProductGrid activeCategory={activeCategory} />
      </Container>
    </section>
  );
}
```

**Step 2: Restyle CategoryFilter pills**

File: `frontend/components/sections/products/CategoryFilter.tsx`

Replace the `motion.button` className logic with neumorphic inline styles:

```tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Droplets, Soup, Salad } from 'lucide-react';

const categories = [
  { id: 'all', slug: 'all', name_en: 'All Products', name_ar: 'جميع المنتجات', icon: null },
  { id: 'oils', slug: 'oils', name_en: 'Oils', name_ar: 'الزيوت', icon: Droplets },
  { id: 'sauces', slug: 'sauces', name_en: 'Sauces', name_ar: 'الصلصات', icon: Soup },
  { id: 'pickles', slug: 'pickles', name_en: 'Pickles', name_ar: 'المخللات', icon: Salad },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const t = useTranslations('products');
  const locale = useLocale();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.slug;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-gray-700 transition-all"
            style={
              isActive
                ? {
                    background: '#e0e0e0',
                    boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)',
                  }
                : {
                    background: '#f5f5f5',
                    borderTop: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '3px 3px 8px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9)',
                  }
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {locale === 'ar' ? category.name_ar : category.name_en}
          </motion.button>
        );
      })}
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add frontend/app/\[locale\]/products/page.tsx frontend/components/sections/products/CategoryFilter.tsx
git commit -m "feat: restyle products page to neumorphic design language"
```

---

## Task 2: Certifications Page

**File:** `frontend/app/[locale]/certifications/page.tsx`

The certifications page has 6 certs but the homepage Certifications section only has illustrations for 5 (ISO, HACCP, Halal, FDA, Organic). We need a `BrcIllustration` for the 6th (BRC Global Standard). We also reuse the existing illustrations inline.

**Step 1: Replace certifications page with neumorphic version**

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Shield, CheckCircle, X, Calendar, Building2 } from 'lucide-react';
import { Container } from '@/components/ui';
import { FeatureCard } from '@/components/ui/feature-card';

const certifications = [
  {
    id: 1,
    name_en: 'ISO 22000:2018',
    name_ar: 'آيزو 22000:2018',
    issuing_body_en: 'International Organization for Standardization',
    issuing_body_ar: 'المنظمة الدولية للمعايير',
    description_en: 'Food safety management systems - Requirements for any organization in the food chain.',
    description_ar: 'أنظمة إدارة سلامة الغذاء - متطلبات أي منظمة في سلسلة الغذاء.',
    valid_until: '2027-12-31',
  },
  {
    id: 2,
    name_en: 'HACCP',
    name_ar: 'تحليل المخاطر ونقاط التحكم الحرجة',
    issuing_body_en: 'Hazard Analysis Critical Control Points',
    issuing_body_ar: 'تحليل المخاطر ونقاط التحكم الحرجة',
    description_en: 'Systematic preventive approach to food safety from biological, chemical, and physical hazards.',
    description_ar: 'نهج وقائي منهجي لسلامة الغذاء من المخاطر البيولوجية والكيميائية والفيزيائية.',
    valid_until: '2026-06-30',
  },
  {
    id: 3,
    name_en: 'Halal Certification',
    name_ar: 'شهادة حلال',
    issuing_body_en: 'Islamic Food and Nutrition Council',
    issuing_body_ar: 'مجلس الغذاء والتغذية الإسلامي',
    description_en: 'Certification that products are prepared according to Islamic dietary laws.',
    description_ar: 'شهادة بأن المنتجات معدة وفقاً لقوانين الغذاء الإسلامية.',
    valid_until: '2026-12-31',
  },
  {
    id: 4,
    name_en: 'FDA Registered',
    name_ar: 'مسجل لدى FDA',
    issuing_body_en: 'U.S. Food and Drug Administration',
    issuing_body_ar: 'إدارة الغذاء والدواء الأمريكية',
    description_en: 'Registered facility with the U.S. FDA for food export to the United States.',
    description_ar: 'منشأة مسجلة لدى FDA الأمريكية لتصدير الغذاء إلى الولايات المتحدة.',
    valid_until: '2026-10-31',
  },
  {
    id: 5,
    name_en: 'Organic Certification',
    name_ar: 'شهادة عضوية',
    issuing_body_en: 'USDA Organic / EU Organic',
    issuing_body_ar: 'العضوية الأمريكية / العضوية الأوروبية',
    description_en: 'Certification for organic products meeting USDA and EU organic standards.',
    description_ar: 'شهادة للمنتجات العضوية التي تلبي معايير العضوية الأمريكية والأوروبية.',
    valid_until: '2026-08-31',
  },
  {
    id: 6,
    name_en: 'BRC Global Standard',
    name_ar: 'معيار BRC العالمي',
    issuing_body_en: 'British Retail Consortium',
    issuing_body_ar: 'اتحاد التجزئة البريطاني',
    description_en: 'Global standard for food safety, recognized by the Global Food Safety Initiative.',
    description_ar: 'معيار عالمي لسلامة الغذاء، معترف به من مبادرة سلامة الغذاء العالمية.',
    valid_until: '2027-03-31',
  },
];

/* ── Shared badge pill ── */
function CertBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 whitespace-nowrap"
      style={{ background: '#f0f0f0', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
    >
      {children}
    </div>
  );
}

/* ── Illustrations (copied from Certifications section) ── */
function IsoIllustration() {
  const segments = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="absolute w-32 h-32 rounded-full" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}>
        {segments.map((i) => (
          <div key={i} className="absolute w-full h-full" style={{ transform: `rotate(${i * 30}deg)` }}>
            <div className="absolute left-1/2" style={{ top: 4, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 10 : 6, marginLeft: i % 3 === 0 ? -1.5 : -1, borderRadius: 2, background: i % 3 === 0 ? '#888' : '#c0c0c0' }} />
          </div>
        ))}
      </motion.div>
      <div className="absolute w-24 h-24 rounded-full" style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)' }} />
      <motion.div className="relative z-10 flex items-center justify-center" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}>
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path d="M5 13l4 4L19 7" stroke="#333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }} />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <CertBadge>ISO 22000</CertBadge>
      </motion.div>
    </div>
  );
}

function HaccpIllustration() {
  const nodes = [{ x: 50, y: 22, label: 'H' }, { x: 20, y: 52, label: 'A' }, { x: 80, y: 52, label: 'C' }, { x: 50, y: 80, label: 'CP' }];
  const lines: [number, number][] = [[0, 1], [0, 2], [1, 3], [2, 3]];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute" width="200" height="180" viewBox="0 0 100 110">
        {lines.map(([a, b], i) => (
          <motion.line key={i} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} stroke="#ccc" strokeWidth="1.5" strokeDasharray="4 3" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }} />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 280, damping: 18 }} style={{ transformOrigin: `${n.x}px ${n.y}px` }}>
            <circle cx={n.x} cy={n.y} r="11" fill="#e8e8e8" style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.12)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.9))' }} />
            <text x={n.x} y={n.y + 4} textAnchor="middle" fontSize="7" fontWeight="700" fill="#555">{n.label}</text>
          </motion.g>
        ))}
      </svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>HACCP</CertBadge>
      </motion.div>
    </div>
  );
}

function HalalIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <motion.div className="absolute w-28 h-28 rounded-full" style={{ border: '1.5px solid rgba(0,0,0,0.07)' }} animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }} />
      <div className="absolute w-24 h-24 rounded-full" style={{ background: 'linear-gradient(145deg, #efefef, #dcdcdc)', boxShadow: '6px 6px 14px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="52" height="52" viewBox="0 0 52 52" initial={{ scale: 0, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 16 }}>
        <circle cx="24" cy="26" r="16" fill="#444" />
        <circle cx="30" cy="20" r="13" fill="#e8e8e8" />
        <polygon points="40,10 41.5,14.5 46,14.5 42.5,17.5 43.8,22 40,19.2 36.2,22 37.5,17.5 34,14.5 38.5,14.5" fill="#444" />
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
        <CertBadge>Halal</CertBadge>
      </motion.div>
    </div>
  );
}

function FdaIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.div className="relative z-10 flex overflow-hidden" style={{ width: 56, height: 26, borderRadius: 13, boxShadow: '3px 3px 6px rgba(0,0,0,0.12), -2px -2px 5px rgba(255,255,255,0.9)' }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}>
        <div className="flex-1 bg-[#d0d0d0] flex items-center justify-center"><span style={{ fontSize: 8, fontWeight: 800, color: '#555', letterSpacing: 1 }}>FDA</span></div>
        <div className="flex-1 bg-[#444] flex items-center justify-center"><span style={{ fontSize: 8, fontWeight: 800, color: '#fff', letterSpacing: 1 }}>✓</span></div>
      </motion.div>
      <motion.div className="absolute z-20 h-0.5 rounded-full" style={{ width: 56, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.25), transparent)' }} animate={{ y: [-13, 13, -13] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }} />
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
        <CertBadge>FDA</CertBadge>
      </motion.div>
    </div>
  );
}

function OrganicIllustration() {
  const particles = [{ cx: 38, cy: 30 }, { cx: 62, cy: 24 }, { cx: 70, cy: 46 }];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="56" height="56" viewBox="0 0 56 56" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <motion.path d="M28 48 Q28 36 28 30" stroke="#555" strokeWidth="2" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.4 }} />
        <motion.path d="M28 30 Q14 16 20 8 Q36 4 40 18 Q44 30 28 30Z" fill="#555" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 16 }} style={{ transformOrigin: '28px 30px' }} />
        <motion.path d="M28 30 Q30 20 32 12" stroke="#e8e8e8" strokeWidth="1" strokeLinecap="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.4 }} />
        {particles.map((p, i) => (
          <motion.circle key={i} cx={p.cx} cy={p.cy} r="2.5" fill="#aaa" initial={{ opacity: 0, y: 4 }} animate={{ opacity: [0, 0.7, 0], y: [4, -6, -14] }} transition={{ delay: 0.6 + i * 0.2, duration: 1.8, repeat: Infinity, ease: 'easeOut' }} />
        ))}
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>Organic</CertBadge>
      </motion.div>
    </div>
  );
}

function BrcIllustration() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full" style={{ background: 'linear-gradient(145deg, #f0f0f0, #d8d8d8)', boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)' }} />
      <motion.svg className="relative z-10" width="56" height="56" viewBox="0 0 56 56" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        {/* Globe lines */}
        <motion.circle cx="28" cy="28" r="18" stroke="#888" strokeWidth="1.5" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.6 }} />
        <motion.ellipse cx="28" cy="28" rx="9" ry="18" stroke="#aaa" strokeWidth="1" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.5 }} />
        <motion.line x1="10" y1="28" x2="46" y2="28" stroke="#aaa" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.6, duration: 0.4 }} />
        <motion.line x1="13" y1="20" x2="43" y2="20" stroke="#bbb" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.7, duration: 0.3 }} />
        <motion.line x1="13" y1="36" x2="43" y2="36" stroke="#bbb" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.75, duration: 0.3 }} />
      </motion.svg>
      <motion.div className="absolute bottom-7 left-1/2 -translate-x-1/2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
        <CertBadge>BRC</CertBadge>
      </motion.div>
    </div>
  );
}

const illustrations = [
  <IsoIllustration key="iso" />,
  <HaccpIllustration key="haccp" />,
  <HalalIllustration key="halal" />,
  <FdaIllustration key="fda" />,
  <OrganicIllustration key="organic" />,
  <BrcIllustration key="brc" />,
];

export default function CertificationsPage() {
  const t = useTranslations('certifications');
  const locale = useLocale();
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <>
      {/* Header */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z" fill="currentColor" className="text-gray-900" />
                </svg>
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <div key={cert.id} className="cursor-pointer" onClick={() => setSelectedCert(cert)}>
              <FeatureCard
                title={locale === 'ar' ? cert.name_ar : cert.name_en}
                description={locale === 'ar' ? cert.issuing_body_ar : cert.issuing_body_en}
                illustration={illustrations[index]}
                delay={0.05 + index * 0.08}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="rounded-3xl p-8 max-w-lg w-full"
              style={{
                background: '#f5f5f5',
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                >
                  <Shield className="w-8 h-8 text-gray-700" />
                </div>
                <button onClick={() => setSelectedCert(null)} className="p-2 hover:bg-white/60 rounded-lg transition">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {locale === 'ar' ? selectedCert.name_ar : selectedCert.name_en}
              </h2>
              <p className="text-gray-600 font-medium mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                {locale === 'ar' ? selectedCert.issuing_body_ar : selectedCert.issuing_body_en}
              </p>
              <p className="text-gray-500 mb-6">
                {locale === 'ar' ? selectedCert.description_ar : selectedCert.description_en}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4" />
                  <span>{t('validUntil')}: {formatDate(selectedCert.valid_until)}</span>
                </div>
                <div className="flex items-center text-gray-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 me-1" />
                  {t('verified')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/app/\[locale\]/certifications/page.tsx
git commit -m "feat: restyle certifications page to neumorphic design language"
```

---

## Task 3: Blog Page

**File:** `frontend/app/[locale]/blog/page.tsx`

Replace with neumorphic badge header + `ExpandableCard` grid (matching `LatestNews` section). The blog posts data in `lib/data/posts` has `image`, `title_en/ar`, `excerpt_en/ar`, `body_en/ar` — all compatible with `ExpandableCard`.

**Step 1: Replace blog page**

```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Newspaper } from 'lucide-react';
import { Container } from '@/components/ui';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { posts } from '@/lib/data/posts';

const categories = ['all', 'news', 'certifications', 'events'];

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts =
    activeCategory === 'all' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Newspaper className="w-4 h-4" />
                {t('title')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('subtitle')}</p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2 rounded-full font-medium text-gray-700 text-sm transition-all"
              style={
                activeCategory === category
                  ? { background: '#e0e0e0', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)' }
                  : { background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '3px 3px 8px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9)' }
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t(`categories.${category}`)}
            </motion.button>
          ))}
        </div>

        {/* ExpandableCard grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const bodyItems = locale === 'ar' ? post.body_ar : post.body_en;
            return (
              <ExpandableCard
                key={post.id}
                title={locale === 'ar' ? post.title_ar : post.title_en}
                src={post.image}
                description={locale === 'ar' ? post.excerpt_ar : post.excerpt_en}
                classNameExpanded="[&_h4]:text-black [&_h4]:font-semibold [&_h4]:text-lg"
              >
                {bodyItems.map((item, i) => (
                  <React.Fragment key={i}>
                    <h4>{item.heading}</h4>
                    <p>{item.body}</p>
                  </React.Fragment>
                ))}
              </ExpandableCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/app/\[locale\]/blog/page.tsx
git commit -m "feat: restyle blog page to neumorphic design language"
```

---

## Task 4: Export Page

**File:** `frontend/app/[locale]/export/page.tsx`

Replace the dark green hero with a neumorphic card wrapper (matching `GlobalMap`). Restyle all inner sections.

**Step 1: Replace export page**

```tsx
'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import {
  Globe2, Ship, Package, FileCheck, Truck, ShieldCheck, MapPin, ArrowRight, CheckCircle, Building2,
} from 'lucide-react';
import { Container } from '@/components/ui';
import { FeatureCard } from '@/components/ui/feature-card';
import { FlowButton } from '@/components/ui/flow-button';
import Link from 'next/link';

const exportSteps = [
  { icon: FileCheck, key: 'inquiry' },
  { icon: Package, key: 'samples' },
  { icon: ShieldCheck, key: 'quality' },
  { icon: Ship, key: 'shipping' },
  { icon: Truck, key: 'delivery' },
];

const destinations = [
  { region: 'middleEast', countries: ['Saudi Arabia', 'UAE', 'Kuwait', 'Qatar', 'Bahrain', 'Oman'] },
  { region: 'europe', countries: ['Germany', 'UK', 'France', 'Italy', 'Netherlands'] },
  { region: 'africa', countries: ['South Africa', 'Nigeria', 'Kenya', 'Morocco', 'Algeria'] },
  { region: 'americas', countries: ['USA', 'Canada', 'Brazil', 'Mexico'] },
  { region: 'asia', countries: ['Japan', 'South Korea', 'Malaysia', 'Singapore'] },
];

const packagingOptions = [
  { key: 'retail', sizes: ['250ml', '500ml', '1L', '2L'] },
  { key: 'foodservice', sizes: ['5L', '10L', '18L'] },
  { key: 'bulk', sizes: ['200L Drums', 'IBC Tanks', 'Flexitanks'] },
];

/* Step illustrations for FeatureCard */
function StepIllustration({ icon: Icon, number }: { icon: React.ComponentType<{ className?: string }>, number: number }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)',
          boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)',
        }}
      >
        <Icon className="w-10 h-10 text-gray-600" />
      </div>
      <div
        className="absolute top-6 right-1/4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-gray-700"
        style={{ background: '#f0f0f0', boxShadow: '2px 2px 5px rgba(0,0,0,0.1), -1px -1px 4px rgba(255,255,255,0.9)' }}
      >
        {number}
      </div>
    </div>
  );
}

/* Packaging illustration */
function PackagingIllustration({ sizes }: { sizes: string[] }) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-wrap px-4">
      {sizes.map((size, i) => (
        <motion.div
          key={size}
          className="px-3 py-1.5 rounded-full text-xs font-semibold text-gray-600"
          style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 280 }}
        >
          {size}
        </motion.div>
      ))}
    </div>
  );
}

export default function ExportPage() {
  const t = useTranslations('export');
  const locale = useLocale();

  return (
    <>
      {/* Hero — neumorphic card wrapper (like GlobalMap) */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div
          className="relative w-full rounded-3xl bg-[#f5f5f5] overflow-hidden p-8 md:p-12"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              {/* Badge */}
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase text-gray-600"
                style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.08), -2px -2px 5px rgba(255,255,255,0.9)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-gray-500" />
                {t('hero.badge')}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
              <p className="text-lg text-gray-500 mb-8">{t('hero.subtitle')}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/quotation`}>
                  <FlowButton text={t('hero.cta')} variant="solid" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)' }}
              >
                <Globe2 className="w-40 h-40 text-gray-400" />
              </div>
              <motion.div
                className="absolute -top-4 -right-4 rounded-xl p-4"
                style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-500">{t('hero.countries')}</div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 rounded-xl p-4"
                style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-500">{t('hero.continents')}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)' }}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Ship className="w-4 h-4" />
                PROCESS
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('process.title')}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('process.subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {exportSteps.map((step, index) => (
            <FeatureCard
              key={step.key}
              title={t(`process.steps.${step.key}.title`)}
              description={t(`process.steps.${step.key}.description`)}
              illustration={<StepIllustration icon={step.icon} number={index + 1} />}
              delay={0.05 + index * 0.08}
            />
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)' }}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <MapPin className="w-4 h-4" />
                DESTINATIONS
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('destinations.title')}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('destinations.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl p-6"
              style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
            >
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}>
                  <MapPin className="w-3.5 h-3.5 text-gray-600" />
                </div>
                {t(`destinations.regions.${dest.region}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {dest.countries.map((country) => (
                  <span key={country} className="px-3 py-1 rounded-full text-xs text-gray-600" style={{ background: '#ebebeb', boxShadow: '2px 2px 4px rgba(0,0,0,0.08), -1px -1px 3px rgba(255,255,255,0.9)' }}>
                    {country}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packaging Options */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)' }}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Package className="w-4 h-4" />
                PACKAGING
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('packaging.title')}</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('packaging.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packagingOptions.map((option, index) => (
            <FeatureCard
              key={option.key}
              title={t(`packaging.options.${option.key}.title`)}
              description={t(`packaging.options.${option.key}.description`)}
              illustration={<PackagingIllustration sizes={option.sizes} />}
              delay={0.05 + index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Private Label CTA — neumorphic wrapper */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div
          className="relative w-full rounded-3xl bg-[#f5f5f5] p-8 md:p-12"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
          }}
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}>
                <Building2 className="w-7 h-7 text-gray-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('privateLabel.title')}</h2>
              <p className="text-lg text-gray-500 mb-6">{t('privateLabel.subtitle')}</p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: '#ebebeb', boxShadow: '2px 2px 4px rgba(0,0,0,0.09), -1px -1px 3px rgba(255,255,255,0.92)' }}>
                      <CheckCircle className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <span className="text-gray-700">{t(`privateLabel.features.item${i}`)}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/quotation`}>
                <FlowButton text={t('privateLabel.cta')} variant="solid" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="aspect-video rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)' }}>
                <Package className="w-24 h-24 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/app/\[locale\]/export/page.tsx
git commit -m "feat: restyle export page to neumorphic design language"
```

---

## Task 5: Contact Page

**File:** `frontend/app/[locale]/contact/page.tsx`

**Step 1: Replace contact page**

```tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageSquare,
  Facebook, Instagram, Linkedin, Twitter,
} from 'lucide-react';
import { Container } from '@/components/ui';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  subject: z.string().min(5, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  { icon: MapPin, key: 'address' },
  { icon: Phone, key: 'phone' },
  { icon: Mail, key: 'email' },
  { icon: Clock, key: 'hours' },
];

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Twitter, href: '#', label: 'Twitter' },
];

const neuDisc = {
  background: '#ebebeb',
  boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)',
};

const neuCard = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};

export default function ContactPage() {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section className="py-20 bg-white">
      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={neuCard}>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <MessageSquare className="w-4 h-4" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('hero.title')}</h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-1">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('info.title')}</h2>
            <div className="space-y-6">
              {contactInfo.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.key} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={neuDisc}>
                      <Icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{t(`info.${item.key}.title`)}</h3>
                      <p className="text-gray-500 text-sm">{t(`info.${item.key}.value`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">{t('info.social')}</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a key={social.label} href={social.href} className="w-10 h-10 rounded-full flex items-center justify-center transition hover:scale-105" style={neuDisc} aria-label={social.label}>
                      <Icon className="w-4 h-4 text-gray-600" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2">
            <div className="rounded-3xl p-8 bg-[#f5f5f5]" style={neuCard}>
              <h2 className="text-xl font-bold text-gray-900 mb-6">{t('form.title')}</h2>

              {isSuccess && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 rounded-2xl flex items-center gap-2 text-gray-700 text-sm" style={{ background: '#e8e8e8', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }}>
                  <CheckCircle className="w-5 h-5" />
                  {t('form.success')}
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.name')} *</label>
                    <input {...register('name')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 ${errors.name ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.namePlaceholder')} />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.email')} *</label>
                    <input {...register('email')} type="email" className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-0 ${errors.email ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.emailPlaceholder')} />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.phone')}</label>
                    <input {...register('phone')} type="tel" className="w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none" style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.phonePlaceholder')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.subject')} *</label>
                    <input {...register('subject')} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none ${errors.subject ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.subjectPlaceholder')} />
                    {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('form.message')} *</label>
                  <textarea {...register('message')} rows={5} className={`w-full px-4 py-3 rounded-xl border-0 bg-white/70 text-gray-900 placeholder-gray-400 focus:outline-none resize-none ${errors.message ? 'ring-1 ring-red-400' : ''}`} style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }} placeholder={t('form.messagePlaceholder')} />
                  {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-gray-900 transition-all hover:scale-105 disabled:opacity-60"
                  style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.25), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-gray-400/30 border-t-gray-600 rounded-full animate-spin" />
                      {t('form.sending')}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {t('form.submit')}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add frontend/app/\[locale\]/contact/page.tsx
git commit -m "feat: restyle contact page to neumorphic design language"
```

---

## Task 6: Quotation Page

**File:** `frontend/app/[locale]/quotation/page.tsx`

Restyle the hero, progress stepper, and form wrapper. Keep all multi-step logic intact.

**Step 1: Identify the style-only changes to make in the existing file**

The following replacements are needed (do not change any logic/functionality):

1. **Hero section** — change `className="py-16 bg-gradient-to-br from-primary-50 via-white to-secondary-50"` to `className="py-16 bg-white"` and replace the `bg-primary-100 text-primary-700` badge with the neumorphic pill badge pattern.

2. **Success section** — change `className="min-h-screen py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50"` to `className="min-h-screen py-20 bg-white"`.

3. **Progress step circles** — replace `bg-primary-600 text-white` / `bg-green-500 text-white` / `bg-gray-200 text-gray-500` with neumorphic disc styles:
   - Active: `style={{ background: '#e0e0e0', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)' }}`
   - Completed: `style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}`
   - Inactive: `style={{ background: '#f5f5f5', boxShadow: '3px 3px 6px rgba(0,0,0,0.06), -2px -2px 4px rgba(255,255,255,0.9)' }}`

4. **Step connector line** — change `bg-green-500` / `bg-gray-200` to `bg-[#d0d0d0]` / `bg-[#e8e8e8]`.

5. **Form wrapper** — change `className="bg-gray-50 rounded-2xl p-8"` to `className="rounded-3xl p-8 bg-[#f5f5f5]"` with neumorphic `style` prop.

6. **Product item cards** — change `className="p-6 bg-white rounded-xl border border-gray-200"` to `className="p-6 rounded-2xl"` with neumorphic style.

7. **Shipping method radio labels** — change `border-primary-500 bg-primary-50` active state to neumorphic inset style.

8. **Review summary cards** — change `className="p-6 bg-white rounded-xl border border-gray-200"` to neumorphic card style.

9. **Form inputs** — change `focus:ring-primary-500` to `focus:outline-none` and apply the inset neumorphic style: `style={{ boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.08), inset -2px -2px 4px rgba(255,255,255,0.9)' }}` with `className="... border-0 bg-white/70"`.

10. **Navigation buttons** — replace `Button` component with neumorphic inline-styled buttons matching the contact page submit button style.

Apply all these changes to `frontend/app/[locale]/quotation/page.tsx`.

**Step 2: Commit**

```bash
git add frontend/app/\[locale\]/quotation/page.tsx
git commit -m "feat: restyle quotation page to neumorphic design language"
```

---

## Task 7: About — CompanyStory

**File:** `frontend/components/sections/about/CompanyStory.tsx`

**Step 1: Apply neumorphic styling**

1. Change `className="py-20 bg-gradient-to-br from-primary-50 via-white to-secondary-50"` → `className="py-20 bg-white"`
2. Change image placeholder `bg-gradient-to-br from-primary-100 to-secondary-100` → neumorphic: `style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)' }}`
3. Change floating badge from `bg-white rounded-xl shadow-xl` → add neumorphic style: `style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}`
4. Change `text-primary-600` in floating badge → `text-gray-900`
5. Replace badge pill `inline-block px-4 py-2 bg-primary-100 text-primary-700 rounded-full` → neumorphic pill badge
6. Replace highlight icon boxes `bg-primary-100` / `text-primary-600` → `style={neuDisc}` with `text-gray-600`
7. Change highlight card `bg-white shadow-sm` → neumorphic card style

**Step 2: Commit**

```bash
git add frontend/components/sections/about/CompanyStory.tsx
git commit -m "feat: restyle About CompanyStory to neumorphic design language"
```

---

## Task 8: About — CEOProfile

**File:** `frontend/components/sections/about/CEOProfile.tsx`

**Step 1: Apply neumorphic styling**

1. Change quote icon container `bg-primary-100` → neumorphic disc style
2. Change `text-primary-600` on Quote icon → `text-gray-600`
3. Change CEO avatar `bg-gradient-to-br from-primary-100 to-secondary-100` → neumorphic disc: `style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)' }}`
4. Change `text-primary-600` for CEO title → `text-gray-600`

**Step 2: Commit**

```bash
git add frontend/components/sections/about/CEOProfile.tsx
git commit -m "feat: restyle About CEOProfile to neumorphic design language"
```

---

## Task 9: About — MissionVision

**File:** `frontend/components/sections/about/MissionVision.tsx`

**Step 1: Apply neumorphic styling**

1. Replace badge `px-4 py-2 bg-primary-100 text-primary-700 rounded-full` → neumorphic pill badge
2. Remove `text-primary-700` from badge → `text-gray-900`
3. Replace gradient icon boxes `bg-gradient-to-br ${card.color}` → neumorphic disc:
   ```tsx
   style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
   ```
4. Change icon color from `text-white` → `text-gray-600`
5. Remove `shadow-lg group-hover:scale-110 transition-transform` from icon div (keep as static)
6. Change card `bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl` → neumorphic card wrapper style

**Step 2: Commit**

```bash
git add frontend/components/sections/about/MissionVision.tsx
git commit -m "feat: restyle About MissionVision to neumorphic design language"
```

---

## Task 10: About — Timeline

**File:** `frontend/components/sections/about/Timeline.tsx`

**Step 1: Apply neumorphic styling**

1. Change `bg-gray-50` section → `bg-white`
2. Change timeline line `bg-primary-200` → `bg-[#d8d8d8]`
3. Change center dot `bg-primary-600 border-4 border-white shadow` → neumorphic disc:
   ```tsx
   style={{ background: '#e0e0e0', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.12), inset -2px -2px 4px rgba(255,255,255,0.9)' }}
   ```
4. Replace year badge `bg-primary-100 text-primary-700 rounded-full` → neumorphic pill:
   ```tsx
   className="inline-block px-3 py-1 rounded-full text-sm font-bold text-gray-700"
   style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
   ```
5. Change milestone card `bg-white rounded-xl shadow-sm hover:shadow-lg` → neumorphic card

**Step 2: Commit**

```bash
git add frontend/components/sections/about/Timeline.tsx
git commit -m "feat: restyle About Timeline to neumorphic design language"
```

---

## Task 11: About — FacilityGallery

**File:** `frontend/components/sections/about/FacilityGallery.tsx`

**Step 1: Apply neumorphic styling**

1. Change `bg-gray-50` section → `bg-white`
2. Change facility card `bg-white shadow-sm hover:shadow-xl` → neumorphic card style:
   ```tsx
   style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
   ```
3. Replace colored icon boxes `${facility.color}` (e.g. `bg-blue-100 text-blue-600`) → unified neumorphic disc:
   ```tsx
   className="w-20 h-20 rounded-2xl flex items-center justify-center"
   style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
   ```
4. Change all icon colors from colored variants → `text-gray-600`
5. Keep the hover overlay behavior unchanged

**Step 2: Commit**

```bash
git add frontend/components/sections/about/FacilityGallery.tsx
git commit -m "feat: restyle About FacilityGallery to neumorphic design language"
```

---

## Final Verification

```bash
cd frontend && bun run dev
```

Check each route in browser:
- `/en/products` — white bg, neumorphic badge + filter pills
- `/en/certifications` — neumorphic badge + FeatureCard grid with cert illustrations, modal works
- `/en/blog` — neumorphic badge + ExpandableCard grid, filter pills work
- `/en/export` — neumorphic hero card, all sub-sections consistent
- `/en/contact` — neumorphic badge, inset form inputs, neumorphic info icons
- `/en/quotation` — neumorphic badge, stepper, form wrapper, submit works
- `/en/about` — all sub-sections consistent, no primary-color gradients

```bash
git log --oneline -12
```

Expected: 11 commits each with `feat: restyle ... to neumorphic design language`

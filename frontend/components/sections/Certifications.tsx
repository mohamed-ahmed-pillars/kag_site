'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { FeatureCard } from '@/components/ui/feature-card';
import { useTheme } from 'next-themes';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

/* ─── Certification data ─── */
const certifications = [
  {
    id: 1,
    name_en: 'ISO 22000',
    name_ar: 'آيزو 22000',
    issuing_body_en: 'Food Safety Management',
    issuing_body_ar: 'إدارة سلامة الغذاء',
  },
  {
    id: 2,
    name_en: 'HACCP',
    name_ar: 'تحليل المخاطر',
    issuing_body_en: 'Hazard Analysis',
    issuing_body_ar: 'نقاط التحكم الحرجة',
  },
  {
    id: 3,
    name_en: 'Halal',
    name_ar: 'حلال',
    issuing_body_en: 'Islamic Food Certification',
    issuing_body_ar: 'شهادة الغذاء الإسلامي',
  },
  {
    id: 4,
    name_en: 'FDA Approved',
    name_ar: 'موافقة FDA',
    issuing_body_en: 'US Food & Drug Admin',
    issuing_body_ar: 'إدارة الغذاء والدواء الأمريكية',
  },
  {
    id: 5,
    name_en: 'Organic',
    name_ar: 'عضوي',
    issuing_body_en: 'Certified Organic Products',
    issuing_body_ar: 'منتجات عضوية معتمدة',
  },
];

/* ─────────────────────────────────────────────
   Illustrations — one per cert, neumorphic style
───────────────────────────────────────────── */

function IllustrationWithView({ children }: { children: (isInView: boolean) => React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  return <div ref={ref} className="w-full h-full">{children(isInView)}</div>;
}

// ── Certification illustration colors — edit here to test ──────────

const isoColors = (isDark: boolean) => ({
  tickMajor:  "#888",                          // major tick marks (every 3rd)
  tickMinor:  "#c0c0c0",                       // minor tick marks
  bezelFrom:  "#eeeeee",                       // bezel gradient start
  bezelTo:    "#d8d8d8",                       // bezel gradient end
  checkmark:  isDark ? "#555" : "#354c9a",     // checkmark stroke
});

const haccpColors = (isDark: boolean) => ({
  line:        "#ccc",                         // dashed connection lines
  nodeCircle:  "#e8e8e8",                      // node circle fill
  nodeText:    isDark ? "#555" : "#354c9a",    // node letter fill
});

const halalColors = (isDark: boolean) => ({
  pulseRing:      "rgba(0,0,0,0.07)",          // pulse ring border
  circleFrom:     "#efefef",                   // base circle gradient start
  circleTo:       "#dcdcdc",                   // base circle gradient end
  crescent:       isDark ? "#444" : "#354c9a", // crescent & star fill
  crescentCutout: "#e8e8e8",                   // inner circle that carves the crescent
});

const fdaColors = (isDark: boolean) => ({
  discFrom:      "#f0f0f0",                    // base disc gradient start
  discTo:        "#d8d8d8",                    // base disc gradient end
  pillLeft:      "#d0d0d0",                    // left half of pill
  pillLeftText:  isDark ? "#555" : "#354c9a",  // "FDA" label
  pillRight:     isDark ? "#444" : "#354c9a",  // right half of pill
  pillRightText: "#fff",                       // "✓" label
  scanLine:      "rgba(0,0,0,0.25)",           // scan line color
});

const organicColors = (isDark: boolean) => ({
  discFrom:   "#f0f0f0",                       // base disc gradient start
  discTo:     "#d8d8d8",                       // base disc gradient end
  stem:       isDark ? "#555" : "#354c9a",     // stem stroke
  leaf:       isDark ? "#555" : "#354c9a",     // leaf body fill
  vein:       "#e8e8e8",                       // leaf vein stroke
  particles:  "#aaa",                          // floating particle dots
});

// ───────────────────────────────────────────────────────────────────

/** ISO 22000 — rotating segmented ring with a checkmark center */
function IsoIllustration({ isInView }: { isInView: boolean }) {
  const ISO_COLORS = isoColors(useIsDark());
  const segments = Array.from({ length: 12 }, (_, i) => i);
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Outer rotating dashes */}
      <motion.div
        className="absolute w-32 h-32 rounded-full"
        animate={{ rotate: isInView ? 360 : 0 }}
        transition={{ duration: 18, repeat: isInView ? Infinity : 0, ease: 'linear' }}
      >
        {segments.map((i) => (
          <div
            key={i}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 30}deg)` }}
          >
            <div
              className="absolute left-1/2"
              style={{
                top: 4,
                width: i % 3 === 0 ? 3 : 2,
                height: i % 3 === 0 ? 10 : 6,
                marginLeft: i % 3 === 0 ? -1.5 : -1,
                borderRadius: 2,
                background: i % 3 === 0 ? ISO_COLORS.tickMajor : ISO_COLORS.tickMinor,
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* Bezel */}
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${ISO_COLORS.bezelFrom}, ${ISO_COLORS.bezelTo})`,
          boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)',
        }}
      />

      {/* Check mark */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 13l4 4L19 7"
            stroke={ISO_COLORS.checkmark}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>

      {/* Label */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <CertBadge>ISO 22000</CertBadge>
      </motion.div>
    </div>
  );
}

/** HACCP — 7 nodes in a triangle flow (hazard → analysis → control) */
function HaccpIllustration() {
  const HACCP_COLORS = haccpColors(useIsDark());
  const nodes = [
    { x: 50, y: 22, label: 'H' },
    { x: 20, y: 52, label: 'A' },
    { x: 80, y: 52, label: 'C' },
    { x: 50, y: 80, label: 'CP' },
  ];
  const lines = [
    [0, 1], [0, 2], [1, 3], [2, 3],
  ] as [number, number][];

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute" width="200" height="180" viewBox="0 0 100 110">
        {lines.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            stroke={HACCP_COLORS.line}
            strokeWidth="1.5"
            strokeDasharray="4 3"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.12, duration: 0.4 }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.1, type: 'spring', stiffness: 280, damping: 18 }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <circle
              cx={n.x}
              cy={n.y}
              r="11"
              fill={HACCP_COLORS.nodeCircle}
              style={{ filter: 'drop-shadow(2px 2px 3px rgba(0,0,0,0.12)) drop-shadow(-1px -1px 2px rgba(255,255,255,0.9))' }}
            />
            <text
              x={n.x}
              y={n.y + 4}
              textAnchor="middle"
              fontSize="7"
              fontWeight="700"
              fill={HACCP_COLORS.nodeText}
            >
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <CertBadge>HACCP</CertBadge>
      </motion.div>
    </div>
  );
}

/** Halal — crescent moon + star with a soft glow pulse */
function HalalIllustration({ isInView }: { isInView: boolean }) {
  const HALAL_COLORS = halalColors(useIsDark());
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Pulse ring */}
      <motion.div
        className="absolute w-28 h-28 rounded-full"
        style={{ border: `1.5px solid ${HALAL_COLORS.pulseRing}` }}
        animate={isInView ? { scale: [1, 1.5], opacity: [0.5, 0] } : { scale: 1, opacity: 0.5 }}
        transition={{ duration: 2.4, repeat: isInView ? Infinity : 0, ease: 'easeOut' }}
      />

      {/* Circle base */}
      <div
        className="absolute w-24 h-24 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${HALAL_COLORS.circleFrom}, ${HALAL_COLORS.circleTo})`,
          boxShadow: '6px 6px 14px rgba(0,0,0,0.1), -4px -4px 10px rgba(255,255,255,0.92)',
        }}
      />

      {/* Crescent + star SVG */}
      <motion.svg
        className="relative z-10"
        width="52" height="52" viewBox="0 0 52 52"
        initial={{ scale: 0, rotate: -30, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 220, damping: 16 }}
      >
        {/* Crescent: large circle minus smaller offset circle */}
        <circle cx="24" cy="26" r="16" fill={HALAL_COLORS.crescent} />
        <circle cx="30" cy="20" r="13" fill={HALAL_COLORS.crescentCutout} />
        {/* Star */}
        <polygon
          points="40,10 41.5,14.5 46,14.5 42.5,17.5 43.8,22 40,19.2 36.2,22 37.5,17.5 34,14.5 38.5,14.5"
          fill={HALAL_COLORS.crescent}
        />
      </motion.svg>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <CertBadge>Halal</CertBadge>
      </motion.div>
    </div>
  );
}

/** FDA — pill/capsule icon with a scan-line animation */
function FdaIllustration({ isInView }: { isInView: boolean }) {
  const FDA_COLORS = fdaColors(useIsDark());
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Base disc */}
      <div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${FDA_COLORS.discFrom}, ${FDA_COLORS.discTo})`,
          boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)',
        }}
      />

      {/* Pill shape */}
      <motion.div
        className="relative z-10 flex overflow-hidden"
        style={{
          width: 56, height: 26, borderRadius: 13,
          boxShadow: '3px 3px 6px rgba(0,0,0,0.12), -2px -2px 5px rgba(255,255,255,0.9)',
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 18 }}
      >
        <div className="flex-1 flex items-center justify-center" style={{ background: FDA_COLORS.pillLeft }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: FDA_COLORS.pillLeftText, letterSpacing: 1 }}>FDA</span>
        </div>
        <div className="flex-1 flex items-center justify-center" style={{ background: FDA_COLORS.pillRight }}>
          <span style={{ fontSize: 8, fontWeight: 800, color: FDA_COLORS.pillRightText, letterSpacing: 1 }}>✓</span>
        </div>
      </motion.div>

      {/* Scan line */}
      <motion.div
        className="absolute z-20 h-0.5 rounded-full"
        style={{
          width: 56,
          background: `linear-gradient(90deg, transparent, ${FDA_COLORS.scanLine}, transparent)`,
        }}
        animate={isInView ? { y: [-13, 13, -13] } : { y: 0 }}
        transition={{ duration: 2, repeat: isInView ? Infinity : 0, ease: 'easeInOut', delay: 0.5 }}
      />

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <CertBadge>FDA</CertBadge>
      </motion.div>
    </div>
  );
}

/** Organic — leaf with growing stem + floating particles */
function OrganicIllustration({ isInView }: { isInView: boolean }) {
  const ORGANIC_COLORS = organicColors(useIsDark());
  const particles = [
    { cx: 38, cy: 30 },
    { cx: 62, cy: 24 },
    { cx: 70, cy: 46 },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Base disc */}
      <div
        className="absolute w-28 h-28 rounded-full"
        style={{
          background: `linear-gradient(145deg, ${ORGANIC_COLORS.discFrom}, ${ORGANIC_COLORS.discTo})`,
          boxShadow: '7px 7px 14px rgba(0,0,0,0.1), -5px -5px 12px rgba(255,255,255,0.92)',
        }}
      />

      {/* Leaf SVG */}
      <motion.svg
        className="relative z-10"
        width="56" height="56" viewBox="0 0 56 56"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Stem */}
        <motion.path
          d="M28 48 Q28 36 28 30"
          stroke={ORGANIC_COLORS.stem} strokeWidth="2" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        />
        {/* Leaf body */}
        <motion.path
          d="M28 30 Q14 16 20 8 Q36 4 40 18 Q44 30 28 30Z"
          fill={ORGANIC_COLORS.leaf}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 240, damping: 16 }}
          style={{ transformOrigin: '28px 30px' }}
        />
        {/* Leaf vein */}
        <motion.path
          d="M28 30 Q30 20 32 12"
          stroke={ORGANIC_COLORS.vein} strokeWidth="1" strokeLinecap="round" fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.4 }}
        />

        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r="2.5"
            fill={ORGANIC_COLORS.particles}
            initial={{ opacity: 0, y: 4 }}
            animate={isInView ? { opacity: [0, 0.7, 0], y: [4, -6, -14] } : { opacity: 0, y: 4 }}
            transition={{ delay: 0.6 + i * 0.2, duration: 1.8, repeat: isInView ? Infinity : 0, ease: 'easeOut' }}
          />
        ))}
      </motion.svg>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <CertBadge>Organic</CertBadge>
      </motion.div>
    </div>
  );
}

/** Shared neumorphic pill badge */
function CertBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 dark:text-gray-300 whitespace-nowrap"
      style={{
        background: 'var(--neuo-badge-bg)',
        boxShadow: 'var(--neuo-badge-shadow)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Section ─── */
export default function Certifications() {
  const t = useTranslations('home.certifications');
  const locale = useLocale();

  const illustrations = [
    <IllustrationWithView key="iso">{(v) => <IsoIllustration isInView={v} />}</IllustrationWithView>,
    <IllustrationWithView key="haccp">{() => <HaccpIllustration />}</IllustrationWithView>,
    <IllustrationWithView key="halal">{(v) => <HalalIllustration isInView={v} />}</IllustrationWithView>,
    <IllustrationWithView key="fda">{(v) => <FdaIllustration isInView={v} />}</IllustrationWithView>,
    <IllustrationWithView key="organic">{(v) => <OrganicIllustration isInView={v} />}</IllustrationWithView>,
  ];

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
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
              {/* Shield icon inline */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L3 7v5c0 5.25 3.75 10.15 9 11.35C17.25 22.15 21 17.25 21 12V7L12 2Z"
                  fill="currentColor"
                  className="text-gray-900 dark:text-gray-100"
                />
              </svg>
              {t('badge')}
            </span>
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('title')}</h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {certifications.map((cert, index) => (
          <FeatureCard
            key={cert.id}
            title={locale === 'ar' ? cert.name_ar : cert.name_en}
            description={locale === 'ar' ? cert.issuing_body_ar : cert.issuing_body_en}
            illustration={illustrations[index]}
            delay={0.05 + index * 0.08}
          />
        ))}
      </div>
    </section>
  );
}

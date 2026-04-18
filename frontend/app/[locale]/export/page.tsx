'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import {
  Globe2, Ship, Package, FileCheck, Truck, ShieldCheck, MapPin, ArrowRight, CheckCircle, Building2,
} from 'lucide-react';
import { Container } from '@/components/ui';
import { FeatureCard } from '@/components/ui/feature-card';
import { FlowButton } from '@/components/ui/flow-button';
import Link from 'next/link';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── Export page colors — edit here to test ────────────────────────
const exportPageColors = (isDark: boolean) => ({
  badgeDot:       isDark ? '#9ca3af' : '#354c9a',   // hero badge dot
  heading:        isDark ? '#f3f4f6' : '#111827',   // h1 / h2 headings
  subtitle:       isDark ? '#9ca3af' : '#6b7280',   // subtitle paragraphs
  statValue:      isDark ? '#f3f4f6' : '#354c9a',   // floating stat numbers (30+, 5)
  statLabel:      isDark ? '#9ca3af' : '#6b7280',   // floating stat labels
  globeIcon:      isDark ? '#4b5563' : '#354c9a',   // hero globe icon
  stepIcon:       isDark ? '#9ca3af' : '#354c9a',   // step illustration icons
  stepNumber:     isDark ? '#d1d5db' : '#354c9a',   // step number badge text
  regionTitle:    isDark ? '#f3f4f6' : '#354c9a',   // destination region headings
  regionIcon:     isDark ? '#9ca3af' : '#354c9a',   // MapPin icons
  countryTag:     isDark ? '#9ca3af' : '#4b5563',   // country pill text
  packagingSize:  isDark ? '#9ca3af' : '#354c9a',   // packaging size pill text
  ctaIcon:        isDark ? '#9ca3af' : '#354c9a',   // Building2 icon in CTA
  checkIcon:      isDark ? '#9ca3af' : '#354c9a',   // CheckCircle icons in list
  packageIcon:    isDark ? '#4b5563' : '#354c9a',   // large Package icon in CTA
});
// ─────────────────────────────────────────────────────────────────

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

function StepIllustration({ icon: Icon, number, iconColor, numberColor }: { icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>, number: number, iconColor: string, numberColor: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="w-24 h-24 rounded-full flex items-center justify-center" style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}>
        <Icon className="w-10 h-10" style={{ color: iconColor }} />
      </div>
      <div className="absolute top-6 right-1/4 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ color: numberColor, background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}>
        {number}
      </div>
    </div>
  );
}

function PackagingIllustration({ sizes, textColor }: { sizes: string[], textColor: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-wrap px-4">
      {sizes.map((size, i) => (
        <motion.div
          key={size}
          className="px-3 py-1.5 rounded-full text-xs font-semibold"
          style={{ color: textColor, background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
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

const neuCard = {
  borderTop: 'var(--card-border-top)',
  boxShadow: 'var(--card-shadow)',
};

const neuBadge = {
  borderTop: 'var(--card-border-top)',
  boxShadow: 'var(--card-shadow)',
};

function SectionBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>, label: string }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]" style={neuBadge}>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
          <Icon className="w-4 h-4" />
          {label}
        </span>
      </div>
    </div>
  );
}

export default function ExportPage() {
  const t = useTranslations('export');
  const locale = useLocale();
  const C = exportPageColors(useIsDark());

  return (
    <>
      {/* Hero — neumorphic card wrapper */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl bg-[#f5f5f5] dark:bg-[#1e1e1e] overflow-hidden p-8 md:p-12" style={neuCard}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
              <div
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-gray-300"
                style={{ background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: C.badgeDot }} />
                {t('hero.badge')}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('hero.title')}</h1>
              <p className="text-lg mb-8" style={{ color: C.subtitle }}>{t('hero.subtitle')}</p>
              <div className="flex flex-wrap gap-4">
                <Link href={`/${locale}/quotation`}>
                  <FlowButton text={t('hero.cta')} variant="solid" />
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="relative">
              <div
                className="aspect-square rounded-2xl flex items-center justify-center"
                style={{
                   background: 'var(--neuo-surface)',
                   boxShadow: 'var(--neuo-badge-shadow)',
                 }}
               >
                 <Globe2 className="w-40 h-40" style={{ color: C.globeIcon }} />
              </div>
              <motion.div
                className="absolute -top-4 -right-4 rounded-xl p-4"
                style={{ background: 'var(--card-bg)', ...neuCard }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold" style={{ color: C.statValue }}>30+</div>
                <div className="text-sm" style={{ color: C.statLabel }}>{t('hero.countries')}</div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 rounded-xl p-4"
                style={{ background: 'var(--card-bg)', ...neuCard }}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <div className="text-2xl font-bold" style={{ color: C.statValue }}>5</div>
                <div className="text-sm" style={{ color: C.statLabel }}>{t('hero.continents')}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Export Process */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionBadge icon={Ship} label={t('process.badge')} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('process.title')}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.subtitle }}>{t('process.subtitle')}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {exportSteps.map((step, index) => (
            <FeatureCard
              key={step.key}
              title={t(`process.steps.${step.key}.title`)}
              description={t(`process.steps.${step.key}.description`)}
              illustration={<StepIllustration icon={step.icon} number={index + 1} iconColor={C.stepIcon} numberColor={C.stepNumber} />}
              delay={0.05 + index * 0.08}
            />
          ))}
        </div>
      </section>

      {/* Destinations */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionBadge icon={MapPin} label={t('destinations.badge')} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('destinations.title')}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.subtitle }}>{t('destinations.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((dest, index) => (
            <motion.div
              key={dest.region}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-3xl p-6 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={neuCard}
            >
              <h3 className="text-base font-semibold mb-4 flex items-center gap-2" style={{ color: C.regionTitle }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}>
                  <MapPin className="w-3.5 h-3.5" style={{ color: C.regionIcon }} />
                </div>
                {t(`destinations.regions.${dest.region}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {dest.countries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 rounded-full text-xs" style={{ color: C.countryTag, background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
                  >
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
          <SectionBadge icon={Package} label={t('packaging.badge')} />
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('packaging.title')}</h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: C.subtitle }}>{t('packaging.subtitle')}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packagingOptions.map((option, index) => (
            <FeatureCard
              key={option.key}
              title={t(`packaging.options.${option.key}.title`)}
              description={t(`packaging.options.${option.key}.description`)}
              illustration={<PackagingIllustration sizes={option.sizes} textColor={C.packagingSize} />}
              delay={0.05 + index * 0.1}
            />
          ))}
        </div>
      </section>

      {/* Private Label CTA */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl bg-[#f5f5f5] dark:bg-[#1e1e1e] p-8 md:p-12" style={neuCard}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
              >
                <Building2 className="w-7 h-7" style={{ color: C.ctaIcon }} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: C.heading }}>{t('privateLabel.title')}</h2>
              <p className="text-lg mb-6" style={{ color: C.subtitle }}>{t('privateLabel.subtitle')}</p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
                    >
                      <CheckCircle className="w-3.5 h-3.5" style={{ color: C.checkIcon }} />
                    </div>
                    <span style={{ color: C.subtitle }}>{t(`privateLabel.features.item${i}`)}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/${locale}/quotation`}>
                <FlowButton text={t('privateLabel.cta')} variant="solid" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{
                   background: 'var(--neuo-surface)',
                   boxShadow: 'var(--neuo-badge-shadow)',
                 }}
               >
                 <Package className="w-24 h-24" style={{ color: C.packageIcon }} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

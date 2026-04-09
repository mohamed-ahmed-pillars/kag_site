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

const neuCard = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};

const neuBadge = {
  borderTop: '1px solid rgba(255,255,255,0.8)',
  boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
};

function SectionBadge({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>, label: string }) {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]" style={neuBadge}>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
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

  return (
    <>
      {/* Hero — neumorphic card wrapper */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl bg-[#f5f5f5] overflow-hidden p-8 md:p-12" style={neuCard}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
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
                style={{
                  background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)',
                }}
              >
                <Globe2 className="w-40 h-40 text-gray-400" />
              </div>
              <motion.div
                className="absolute -top-4 -right-4 rounded-xl p-4"
                style={{ background: '#f5f5f5', ...neuCard }}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-500">{t('hero.countries')}</div>
              </motion.div>
              <motion.div
                className="absolute -bottom-4 -left-4 rounded-xl p-4"
                style={{ background: '#f5f5f5', ...neuCard }}
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
          <SectionBadge icon={Ship} label="PROCESS" />
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
          <SectionBadge icon={MapPin} label="DESTINATIONS" />
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
              className="rounded-3xl p-6 bg-[#f5f5f5]"
              style={neuCard}
            >
              <h3 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                >
                  <MapPin className="w-3.5 h-3.5 text-gray-600" />
                </div>
                {t(`destinations.regions.${dest.region}`)}
              </h3>
              <div className="flex flex-wrap gap-2">
                {dest.countries.map((country) => (
                  <span
                    key={country}
                    className="px-3 py-1 rounded-full text-xs text-gray-600"
                    style={{ background: '#ebebeb', boxShadow: '2px 2px 4px rgba(0,0,0,0.08), -1px -1px 3px rgba(255,255,255,0.9)' }}
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
          <SectionBadge icon={Package} label="PACKAGING" />
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

      {/* Private Label CTA */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl bg-[#f5f5f5] p-8 md:p-12" style={neuCard}>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
              >
                <Building2 className="w-7 h-7 text-gray-600" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('privateLabel.title')}</h2>
              <p className="text-lg text-gray-500 mb-6">{t('privateLabel.subtitle')}</p>
              <ul className="space-y-3 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: '#ebebeb', boxShadow: '2px 2px 4px rgba(0,0,0,0.09), -1px -1px 3px rgba(255,255,255,0.92)' }}
                    >
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
              <div
                className="aspect-video rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)',
                  boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)',
                }}
              >
                <Package className="w-24 h-24 text-gray-400" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

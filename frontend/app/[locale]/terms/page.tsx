'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Scale } from 'lucide-react';
import { Container } from '@/components/ui';

export default function TermsPage() {
  const t = useTranslations('terms');
  const sections = t.raw('sections') as { title: string; body: string }[];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f] min-h-screen">
      <Container>
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Scale className="w-4 h-4 text-[#354c9a] dark:text-gray-400" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Sections */}
        <div className="max-w-3xl mx-auto space-y-6">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-3xl p-8 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
            >
              <h2 className="text-lg font-bold mb-3 text-[#354c9a] dark:text-gray-100">
                {i + 1}. {section.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                {section.body}
              </p>
            </motion.div>
          ))}

          <p className="text-center text-xs text-gray-400 dark:text-gray-600 pt-4">
            {t('lastUpdated')}
          </p>
        </div>
      </Container>
    </section>
  );
}

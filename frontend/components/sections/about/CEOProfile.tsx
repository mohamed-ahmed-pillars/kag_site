'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── CEOProfile colors — edit here to test ─────────────────────────
const ceoColors = (isDark: boolean) => ({
  quoteIcon:    isDark ? '#9ca3af' : '#354c9a',   // quote icon
  ceoInitials:  isDark ? '#9ca3af' : '#354c9a',   // "CEO" / "م.أ" initials
  name:         isDark ? '#f3f4f6' : '#354c9a',   // CEO name
  title:        isDark ? '#9ca3af' : '#6b7280',   // CEO title label
});
// ─────────────────────────────────────────────────────────────────

export default function CEOProfile() {
  const t = useTranslations('about.ceo');
  const locale = useLocale();
  const C = ceoColors(useIsDark());

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8" style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}>
            <Quote className="w-8 h-8" style={{ color: C.quoteIcon }} />
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 dark:text-gray-100 mb-8 leading-relaxed">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>

          {/* CEO Info */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}>
              <span className="text-2xl font-bold" style={{ color: C.ceoInitials }}>
                {locale === 'ar' ? 'م.أ' : 'CEO'}
              </span>
            </div>
            <h3 className="text-xl font-bold" style={{ color: C.name }}>{t('name')}</h3>
            <p className="font-medium" style={{ color: C.title }}>{t('title')}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

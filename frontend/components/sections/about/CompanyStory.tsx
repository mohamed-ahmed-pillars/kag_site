'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── CompanyStory colors — edit here to test ───────────────────────
const storyColors = (isDark: boolean) => ({
  placeholderIcon: isDark ? '#6b7280' : '#354c9a',   // large Building2 placeholder
  statValue:       isDark ? '#f3f4f6' : '#354c9a',   // "25+" floating badge
  statLabel:       isDark ? '#9ca3af' : '#6b7280',   // years label
  heading:         isDark ? '#f3f4f6' : '#111827',   // section h2
  highlightIcon:   isDark ? '#9ca3af' : '#354c9a',   // highlight grid icons
  highlightValue:  isDark ? '#f3f4f6' : '#354c9a',   // highlight values
  highlightLabel:  isDark ? '#9ca3af' : '#6b7280',   // highlight labels
});
// ─────────────────────────────────────────────────────────────────

const highlights = [
  { icon: Building2, key: 'founded' },
  { icon: Award, key: 'certifications' },
  { icon: Users, key: 'employees' },
  { icon: TrendingUp, key: 'growth' },
];

export default function CompanyStory() {
  const t = useTranslations('about.story');
  const locale = useLocale();
  const C = storyColors(useIsDark());

  const neuDisc = {
    background: 'var(--neuo-surface)',
    boxShadow: 'var(--neuo-badge-shadow)',
  };

  const neuCard = {
    borderTop: 'var(--card-border-top)',
    boxShadow: 'var(--card-shadow)',
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div
              className="aspect-[4/3] rounded-2xl overflow-hidden"
              style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="w-24 h-24 mx-auto mb-4" style={{ color: C.placeholderIcon }} />
                  <p className="text-gray-500 dark:text-gray-400">{t('imagePlaceholder')}</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 rounded-xl p-6"
              style={{ background: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold" style={{ color: C.statValue }}>25+</div>
                <div className="text-sm" style={{ color: C.statLabel }}>{t('yearsLabel')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e] mb-4" style={neuCard}>
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{t('badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: C.heading }}>
              {t('title')}
            </h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400">
              <p>{t('paragraph1')}</p>
              <p>{t('paragraph2')}</p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-xl"
                    style={neuCard}
                  >
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={neuDisc}>
                    <Icon className="w-6 h-6" style={{ color: C.highlightIcon }} />
                  </div>
                  <div>
                    <div className="font-semibold" style={{ color: C.highlightValue }}>
                      {t(`highlights.${item.key}.value`)}
                    </div>
                    <div className="text-sm" style={{ color: C.highlightLabel }}>
                        {t(`highlights.${item.key}.label`)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Target, Eye, Heart, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── MissionVision colors — edit here to test ──────────────────────
const mvColors = (isDark: boolean) => ({
  cardIcon:   isDark ? '#9ca3af' : '#354c9a',   // Mission/Vision/Values icons
  cardTitle:  isDark ? '#f3f4f6' : '#354c9a',   // card h3 titles
  heading:    isDark ? '#f3f4f6' : '#111827',   // section h2
});
// ─────────────────────────────────────────────────────────────────

const cards = [
  { key: 'mission', icon: Target },
  { key: 'vision', icon: Eye },
  { key: 'values', icon: Heart },
];

export default function MissionVision() {
  const t = useTranslations('about.missionVision');
  const C = mvColors(useIsDark());

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
      <Container>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e] mb-4"
            style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Sparkles className="w-4 h-4" />
              {t('badge')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold" style={{ color: C.heading }}
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className="h-full rounded-2xl p-8 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
                  style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}
                  >
                    <Icon className="w-8 h-8" style={{ color: C.cardIcon }} />
                  </div>
                  <h3 className="text-xl font-bold mb-4" style={{ color: C.cardTitle }}>
                    {t(`${card.key}.title`)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {t(`${card.key}.description`)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Target, Eye, Heart, Sparkles } from 'lucide-react';
import { Container } from '@/components/ui';

const cards = [
  { key: 'mission', icon: Target },
  { key: 'vision', icon: Eye },
  { key: 'values', icon: Heart },
];

export default function MissionVision() {
  const t = useTranslations('about.missionVision');

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] mb-4"
            style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)' }}
          >
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-900">
              <Sparkles className="w-4 h-4" />
              {t('badge')}
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-gray-900"
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
                  className="h-full rounded-2xl p-8 bg-[#f5f5f5]"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                  >
                    <Icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {t(`${card.key}.title`)}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
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

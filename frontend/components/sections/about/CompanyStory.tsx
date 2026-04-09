'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Building2, Award, Users, TrendingUp } from 'lucide-react';
import { Container } from '@/components/ui';

const highlights = [
  { icon: Building2, key: 'founded' },
  { icon: Award, key: 'certifications' },
  { icon: Users, key: 'employees' },
  { icon: TrendingUp, key: 'growth' },
];

export default function CompanyStory() {
  const t = useTranslations('about.story');
  const locale = useLocale();

  const neuDisc = {
    background: '#ebebeb',
    boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)',
  };

  const neuCard = {
    borderTop: '1px solid rgba(255,255,255,0.8)',
    boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
  };

  return (
    <section className="py-20 bg-white">
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
              style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.08), inset -4px -4px 10px rgba(255,255,255,0.9)' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <Building2 className="w-24 h-24 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-500">{t('imagePlaceholder')}</p>
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 rounded-xl p-6"
              style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900">25+</div>
                <div className="text-sm text-gray-500">{t('yearsLabel')}</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: locale === 'ar' ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] mb-4" style={neuCard}>
              <span className="text-sm font-semibold text-gray-900">{t('badge')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h2>
            <div className="space-y-4 text-gray-600">
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
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {t(`highlights.${item.key}.value`)}
                      </div>
                      <div className="text-sm text-gray-500">
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

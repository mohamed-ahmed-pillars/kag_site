'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Quote } from 'lucide-react';
import { Container } from '@/components/ui';

export default function CEOProfile() {
  const t = useTranslations('about.ceo');
  const locale = useLocale();

  return (
    <section className="py-20 bg-white">
      <Container size="narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Quote Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-8" style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}>
            <Quote className="w-8 h-8 text-gray-600" />
          </div>

          {/* Quote */}
          <blockquote className="text-2xl md:text-3xl font-medium text-gray-900 mb-8 leading-relaxed">
            &ldquo;{t('quote')}&rdquo;
          </blockquote>

          {/* CEO Info */}
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(145deg, #eeeeee, #d8d8d8)', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)' }}>
              <span className="text-2xl font-bold text-gray-600">
                {locale === 'ar' ? 'م.أ' : 'CEO'}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{t('name')}</h3>
            <p className="text-gray-600 font-medium">{t('title')}</p>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

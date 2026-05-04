'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Factory, Globe, Tags, ShieldCheck, CheckCircle } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';

const services = [
  {
    key: 'manufacturing',
    icon: Factory,
    color: 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400',
  },
  {
    key: 'importExport',
    icon: Globe,
    color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  },
  {
    key: 'privateLabel',
    icon: Tags,
    color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  },
  {
    key: 'quality',
    icon: ShieldCheck,
    color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400',
  },
];

const strengthKeys = ['facilities', 'supplyChain', 'partnerships', 'innovation'];

export default function WhatWeOffer() {
  const t = useTranslations('home.whatWeOffer');

  return (
    <section className="py-20">
      <Container>
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div
                  className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-4`}
                >
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {t(`services.${service.key}.title`)}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {t(`services.${service.key}.description`)}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Operational Strength */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
            {t('strength.title')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {strengthKeys.map((key, index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckCircle className="w-5 h-5 text-primary-200 mt-0.5 shrink-0" />
                <span className="text-white/90">{t(`strength.items.${key}`)}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

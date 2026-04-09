'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Factory, Truck, FlaskConical, PackageCheck, Warehouse, Users } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';

const facilities = [
  { key: 'production', icon: Factory },
  { key: 'laboratory', icon: FlaskConical },
  { key: 'packaging', icon: PackageCheck },
  { key: 'warehouse', icon: Warehouse },
  { key: 'logistics', icon: Truck },
  { key: 'team', icon: Users },
];

export default function FacilityGallery() {
  const t = useTranslations('about.facilities');

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden transition-all duration-300"
                  style={{ background: '#f5f5f5', borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                >
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'linear-gradient(145deg, #eeeeee, #e0e0e0)' }}>
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                    >
                      <Icon className="w-10 h-10 text-gray-600" />
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform">
                    <h3 className="text-lg font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      {t(`items.${facility.key}.title`)}
                    </h3>
                    <p className="text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                      {t(`items.${facility.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Factory, Truck, FlaskConical, PackageCheck, Warehouse, Users } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── FacilityGallery colors — edit here to test ────────────────────
const facilityColors = (isDark: boolean) => ({
  facilityIcon: isDark ? '#9ca3af' : '#354c9a',   // facility placeholder icons
});
// ─────────────────────────────────────────────────────────────────

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
  const C = facilityColors(useIsDark());

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]">
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
                  style={{ background: 'var(--card-bg)', borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                >
                  {/* Placeholder Image */}
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'var(--neuo-surface)' }}>
                    <div
                      className="w-20 h-20 rounded-2xl flex items-center justify-center"
                      style={{ background: 'var(--neuo-badge-bg)', boxShadow: 'var(--neuo-badge-shadow)' }}
                    >
                      <Icon className="w-10 h-10" style={{ color: C.facilityIcon }} />
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

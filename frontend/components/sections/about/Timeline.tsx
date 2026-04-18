'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, SectionTitle } from '@/components/ui';

function useIsDark() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted) return false;
  return resolvedTheme === 'dark';
}

// ── Timeline colors — edit here to test ───────────────────────────
const timelineColors = (isDark: boolean) => ({
  yearBadge:  isDark ? '#d1d5db' : '#354c9a',   // year pill text
  itemTitle:  isDark ? '#f3f4f6' : '#354c9a',   // milestone h3 title
  centerDot:  isDark ? '#6b7280' : '#354c9a',   // center timeline dot
});
// ─────────────────────────────────────────────────────────────────

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  { year: '1999', key: 'founded' },
  { year: '2005', key: 'expansion' },
  { year: '2010', key: 'certification' },
  { year: '2015', key: 'international' },
  { year: '2020', key: 'modernization' },
  { year: '2024', key: 'sustainability' },
];

export default function Timeline() {
  const t = useTranslations('about.timeline');
  const locale = useLocale();
  const C = timelineColors(useIsDark());
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.timeline-item', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
        },
      });
    }, timelineRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f]" ref={timelineRef}>
      <Container>
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#d8d8d8] dark:bg-[#333] hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.year}
                className={`timeline-item relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:text-end md:pe-8' : 'md:text-start md:ps-8'}`}>
                  <div
                    className="rounded-xl p-6 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
                    style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-bold mb-3" style={{ color: C.yearBadge, background: 'var(--neuo-surface)', boxShadow: 'var(--neuo-badge-shadow)' }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-semibold mb-2" style={{ color: C.itemTitle }}>
                      {t(`milestones.${milestone.key}.title`)}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {t(`milestones.${milestone.key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full"
                  style={{ background: C.centerDot }}
                />

                {/* Spacer */}
                <div className="hidden md:block w-5/12" />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

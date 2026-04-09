'use client';

import { useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container, SectionTitle } from '@/components/ui';

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
    <section className="py-20 bg-white" ref={timelineRef}>
      <Container>
        <SectionTitle title={t('title')} subtitle={t('subtitle')} />

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#d8d8d8] hidden md:block" />

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
                    className="rounded-xl p-6 bg-[#f5f5f5]"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.8)', boxShadow: '0 8px 16px -4px rgba(0,0,0,0.2), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.15), -4px -4px 8px rgba(255,255,255,0.9)' }}
                  >
                    <span
                      className="inline-block px-3 py-1 rounded-full text-sm font-bold text-gray-700 mb-3"
                      style={{ background: '#ebebeb', boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)' }}
                    >
                      {milestone.year}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {t(`milestones.${milestone.key}.title`)}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {t(`milestones.${milestone.key}.description`)}
                    </p>
                  </div>
                </div>

                {/* Center Dot */}
                <div
                  className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full"
                  style={{ background: '#e0e0e0', boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.12), inset -2px -2px 4px rgba(255,255,255,0.9)' }}
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

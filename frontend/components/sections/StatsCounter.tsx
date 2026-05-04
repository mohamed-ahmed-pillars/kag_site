'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Package, Globe2, Users, Calendar } from 'lucide-react';
import { Container } from '@/components/ui';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { key: 'products', value: 50, suffix: '+', icon: Package },
  { key: 'countries', value: 30, suffix: '+', icon: Globe2 },
  { key: 'clients', value: 500, suffix: '+', icon: Users },
  { key: 'years', value: 25, suffix: '', icon: Calendar },
];

export default function StatsCounter() {
  const t = useTranslations('home.stats');
  const sectionRef = useRef<HTMLElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      countersRef.current.forEach((counter, index) => {
        if (!counter) return;

        const stat = stats[index];
        const obj = { value: 0 };

        gsap.to(obj, {
          value: stat.value,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onUpdate: () => {
            counter.textContent = Math.floor(obj.value).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-r from-primary-600 to-primary-800"
    >
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.key}
                className="text-center text-white"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                  <Icon className="w-8 h-8" />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <span
                    ref={(el) => {
                      countersRef.current[index] = el;
                    }}
                  >
                    0
                  </span>
                  {stat.suffix}
                </div>
                <div className="text-primary-100 text-sm md:text-base">
                  {t(stat.key)}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

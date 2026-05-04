'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import createGlobe, { COBEOptions } from 'cobe';
import { cn } from '@/lib/utils';
import { FlowButton } from '@/components/ui/flow-button';

/* ── Globe config — KAG export destinations ── */
const GLOBE_CONFIG_LIGHT: COBEOptions = {
  width: 800,
  height: 800,
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [0.208, 0.298, 0.604],   // #354c9a brand navy
  glowColor: [0.95, 0.95, 0.95],
  markers: [
    { location: [30.0444, 31.2357], size: 0.08 },  // Cairo
    { location: [40.7128, -74.006],  size: 0.08 },  // New York
    { location: [51.5074, -0.1278],  size: 0.07 },  // London
    { location: [48.8566, 2.3522],   size: 0.06 },  // Paris
    { location: [52.52,   13.405],   size: 0.06 },  // Berlin
    { location: [24.7136, 46.6753],  size: 0.08 },  // Riyadh
    { location: [25.2048, 55.2708],  size: 0.07 },  // Dubai
    { location: [35.6762, 139.6503], size: 0.05 },  // Tokyo
    { location: [1.3521,  103.8198], size: 0.05 },  // Singapore
    { location: [-33.8688, 151.2093],size: 0.05 },  // Sydney
    { location: [43.6532, -79.3832], size: 0.06 },  // Toronto
    { location: [-23.5505,-46.6333], size: 0.06 },  // São Paulo
    { location: [-26.2041, 28.0473], size: 0.05 },  // Johannesburg
  ],
};

const GLOBE_CONFIG_DARK: COBEOptions = {
  ...GLOBE_CONFIG_LIGHT,
  dark: 1,
  baseColor: [0.55, 0.55, 0.55],
  markerColor: [0.9, 0.9, 0.9],         // neutral in dark mode
  glowColor: [0.4, 0.4, 0.4],
};

function Globe({
  className,
  config = GLOBE_CONFIG_LIGHT,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(0);
  const rRef = useRef(0);
  const isVisibleRef = useRef(false);
  const [, forceUpdate] = useState(0);

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      rRef.current = delta / 200;
      forceUpdate((n) => n + 1);
    }
  };

  useEffect(() => {
    let width = canvasRef.current?.offsetWidth ?? 0;
    let rafId: number;

    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
    });

    const observer = new IntersectionObserver(
      ([entry]) => { isVisibleRef.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    if (canvasRef.current) observer.observe(canvasRef.current);

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;
      if (!pointerInteracting.current) phiRef.current += 0.003;
      globe.update({ phi: phiRef.current + rRef.current, width: width * 2, height: width * 2 });
    };
    rafId = requestAnimationFrame(animate);

    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    });

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div className={cn('absolute inset-0 mx-auto aspect-square w-full max-w-[600px]', className)}>
      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) =>
          updatePointerInteraction(e.clientX - pointerInteractionMovement.current)
        }
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) => e.touches[0] && updateMovement(e.touches[0].clientX)}
      />
    </div>
  );
}

/* ── Stats ── */
const stats = [
  { value: '30+', key: 'countries' },
  { value: '5',   key: 'continents' },
  { value: '500+', key: 'clients' },
];

export default function GlobalMap() {
  const t = useTranslations('home.globalReach');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const globeConfig = resolvedTheme === 'dark' ? GLOBE_CONFIG_DARK : GLOBE_CONFIG_LIGHT;

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      {/* FeatureCard-style wrapper */}
      <div
        className="relative w-full rounded-3xl overflow-visible p-5 sm:p-8 md:p-12"
        style={{
          backgroundColor: 'var(--card-bg)',
          borderTop: 'var(--card-border-top)',
          boxShadow: 'var(--card-shadow)',
        }}
      >
        <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">

          {/* ── Left: text + stats + CTA ── */}
          <div className="z-10 max-w-xl text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-6 text-xs font-bold tracking-widest uppercase text-gray-600 dark:text-gray-300"
              style={{
                background: 'var(--neuo-surface)',
                boxShadow: 'var(--neuo-badge-shadow)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gray-500 dark:bg-gray-400" />
              {t('badge') || 'Global Reach'}
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight mb-4">
              {t('title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-8">
              {t('subtitle')}
            </p>

            {/* Stats row */}
            <div className="flex gap-5 sm:gap-8 mb-8 md:mb-10">
              {stats.map((s) => (
                <div key={s.key}>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">{s.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{t(s.key)}</div>
                </div>
              ))}
            </div>

            <Link href={`/${locale}/export`}>
              <FlowButton text={t('learnMore')} variant="solid" />
            </Link>
          </div>

          {/* ── Right: globe ── */}
          <div className="relative h-[320px] w-full max-w-lg md:h-[480px]">
            <Globe className="absolute top-1/2 -translate-y-1/2 -right-16 scale-125 md:scale-150" config={globeConfig} key={resolvedTheme} />
          </div>
        </div>

        {/* 3D shadow layers — same as FeatureCard */}
        <div
          className="absolute inset-0 rounded-3xl bg-gray-400/15 -z-10"
          style={{ transform: 'translateZ(-20px) translateY(6px) translateX(3px)', filter: 'blur(8px)' }}
        />
        <div
          className="absolute inset-0 rounded-3xl bg-gray-300/10 -z-20"
          style={{ transform: 'translateZ(-40px) translateY(10px) translateX(5px)', filter: 'blur(14px)' }}
        />
      </div>
    </section>
  );
}

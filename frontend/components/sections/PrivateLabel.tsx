'use client';

import { useLocale } from 'next-intl';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Tag } from 'lucide-react';
import { FlowButton } from '@/components/ui/flow-button';
import { BlurFade } from '@/components/ui/blur-fade';

/* ─── Animated Illustrations ─── */

/** Your Brand — label peeling off a can with a custom logo stamp */
function BrandIllustration({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Can body */}
      <div
        className="absolute w-16 h-24 rounded-xl"
        style={{
          background: 'linear-gradient(160deg, #e8e8e8, #d0d0d0)',
          boxShadow: '5px 5px 12px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9)',
        }}
      />
      {/* Label on can */}
      <motion.div
        className="absolute w-14 rounded-md flex items-center justify-center"
        style={{
          height: 36,
          background: '#333',
          top: '50%',
          marginTop: -18,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
      >
        <motion.span
          style={{ fontSize: 9, fontWeight: 800, color: '#fff', letterSpacing: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          YOUR BRAND
        </motion.span>
      </motion.div>
      {/* Peeling corner */}
      <motion.div
        className="absolute"
        style={{ top: '50%', marginTop: -18, right: 'calc(50% - 35px)' }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: [0, 40, 0] }}
        transition={{ delay: 1, duration: 1.5, repeat: isInView ? Infinity : 0, repeatDelay: 2, ease: 'easeInOut' }}
      >
        <div style={{ width: 10, height: 36, background: 'linear-gradient(90deg,#555,#333)', borderRadius: '0 4px 4px 0', opacity: 0.6 }} />
      </motion.div>
      {/* Stamp circle */}
      <motion.div
        className="absolute rounded-full flex items-center justify-center"
        style={{
          width: 32, height: 32,
          top: 'calc(50% - 36px)',
          left: 'calc(50% + 18px)',
          background: '#f5f5f5',
          boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.9)',
          border: '2px dashed #bbb',
        }}
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 280, damping: 16 }}
      >
        <span style={{ fontSize: 10, fontWeight: 900, color: '#555' }}>K</span>
      </motion.div>
      {/* Bottom badge */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <IllustrationBadge>Your Brand</IllustrationBadge>
      </motion.div>
    </div>
  );
}

/** Contract Manufacturing — conveyor belt with boxes moving */
function ManufacturingIllustration({ isInView }: { isInView: boolean }) {
  const boxes = [0, 1, 2];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Belt base */}
      <div
        className="absolute rounded-full"
        style={{
          width: 140, height: 18,
          background: 'linear-gradient(160deg, #ddd, #c8c8c8)',
          boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.1), inset -1px -1px 3px rgba(255,255,255,0.8)',
          top: 'calc(50% + 8px)',
        }}
      />
      {/* Belt lines moving */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 2, height: 12,
            background: '#bbb',
            top: 'calc(50% + 11px)',
          }}
          animate={{ x: [i * 32 - 48, i * 32 + 32 - 48] }}
          transition={{ duration: 1.2, repeat: isInView ? Infinity : 0, ease: 'linear', delay: i * 0.3 }}
        />
      ))}
      {/* Moving boxes */}
      {boxes.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-md flex items-center justify-center"
          style={{
            width: 24, height: 24,
            background: 'linear-gradient(145deg, #e8e8e8, #d0d0d0)',
            boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -2px -2px 4px rgba(255,255,255,0.9)',
            top: 'calc(50% - 4px)',
          }}
          animate={{ x: [-60 + i * 44, 80 + i * 44] }}
          transition={{ duration: 2.5, repeat: isInView ? Infinity : 0, ease: 'linear', delay: i * 0.83 }}
        >
          <span style={{ fontSize: 8, fontWeight: 700, color: '#888' }}>■</span>
        </motion.div>
      ))}
      {/* Factory chimney */}
      <motion.div
        className="absolute flex flex-col items-center"
        style={{ top: 'calc(50% - 52px)', left: 'calc(50% - 30px)' }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {/* Smoke puffs */}
        {[0, 1].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{ width: 8, height: 8, background: '#ddd', top: -14 - i * 8, left: i * 6 }}
            animate={{ opacity: [0, 0.6, 0], y: [0, -10, -20], scale: [0.5, 1, 1.4] }}
            transition={{ duration: 1.8, repeat: isInView ? Infinity : 0, delay: i * 0.6, ease: 'easeOut' }}
          />
        ))}
        {/* Chimney rect */}
        <div style={{ width: 10, height: 22, background: 'linear-gradient(160deg,#ddd,#c8c8c8)', borderRadius: '3px 3px 0 0', boxShadow: '2px 2px 4px rgba(0,0,0,0.08)' }} />
        {/* Building */}
        <div style={{ width: 44, height: 28, background: 'linear-gradient(160deg,#e0e0e0,#ccc)', borderRadius: '4px 4px 0 0', boxShadow: '3px 3px 8px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.85)', marginTop: -2 }} />
      </motion.div>
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <IllustrationBadge>Manufacturing</IllustrationBadge>
      </motion.div>
    </div>
  );
}

/** Flexible MOQ — stack of boxes that grows/shrinks */
function MoqIllustration({ isInView }: { isInView: boolean }) {
  const stackLevels = [3, 2, 1];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Stacked boxes */}
      <div className="relative flex flex-col-reverse items-center gap-1" style={{ marginBottom: 16 }}>
        {stackLevels.map((count, row) => (
          <div key={row} className="flex gap-1">
            {Array.from({ length: count }).map((_, col) => (
              <motion.div
                key={col}
                className="rounded-lg"
                style={{
                  width: 28, height: 28,
                  background: 'linear-gradient(145deg, #e8e8e8, #d2d2d2)',
                  boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -2px -2px 5px rgba(255,255,255,0.9)',
                }}
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.1 + row * 0.15 + col * 0.08, type: 'spring', stiffness: 260, damping: 18 }}
              >
                {/* Box cross lines */}
                <svg width="28" height="28" viewBox="0 0 28 28">
                  <line x1="14" y1="4" x2="14" y2="24" stroke="#c0c0c0" strokeWidth="1" />
                  <line x1="4" y1="14" x2="24" y2="14" stroke="#c0c0c0" strokeWidth="1" />
                </svg>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
      {/* Animated double-arrow (flex) */}
      <motion.div
        className="absolute flex items-center gap-1"
        style={{ bottom: 36, left: '50%', transform: 'translateX(-50%)' }}
        animate={{ scaleX: [1, 1.15, 1] }}
        transition={{ duration: 1.6, repeat: isInView ? Infinity : 0, ease: 'easeInOut', delay: 0.5 }}
      >
        <svg width="48" height="14" viewBox="0 0 48 14">
          <path d="M4 7 L12 2 M4 7 L12 12" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <line x1="4" y1="7" x2="44" y2="7" stroke="#aaa" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M44 7 L36 2 M44 7 L36 12" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
      >
        <IllustrationBadge>Flexible MOQ</IllustrationBadge>
      </motion.div>
    </div>
  );
}

/** Certified Quality — shield with animated checkmark + pulse */
function QualityIllustration({ isInView }: { isInView: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Pulse rings */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{ border: '1.5px solid rgba(0,0,0,0.07)', width: 100 + i * 24, height: 100 + i * 24 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: isInView ? Infinity : 0, ease: 'easeInOut', delay: i * 0.5 }}
        />
      ))}
      {/* Shield */}
      <motion.div
        className="relative flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 240, damping: 16 }}
      >
        <svg width="72" height="80" viewBox="0 0 72 80" fill="none">
          <path
            d="M36 4 L68 16 L68 38 C68 56 52 70 36 76 C20 70 4 56 4 38 L4 16 Z"
            fill="url(#shieldGrad)"
            style={{ filter: 'drop-shadow(4px 4px 8px rgba(0,0,0,0.12)) drop-shadow(-2px -2px 5px rgba(255,255,255,0.9))' }}
          />
          <defs>
            <linearGradient id="shieldGrad" x1="0" y1="0" x2="72" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#e8e8e8" />
              <stop offset="100%" stopColor="#d0d0d0" />
            </linearGradient>
          </defs>
        </svg>
        {/* Checkmark inside shield */}
        <svg className="absolute" width="36" height="36" viewBox="0 0 24 24" fill="none">
          <motion.path
            d="M5 12l4 4L19 7"
            stroke="#444"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <IllustrationBadge>Certified</IllustrationBadge>
      </motion.div>
    </div>
  );
}

function IllustrationBadge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.18em] uppercase text-gray-600 whitespace-nowrap"
      style={{
        background: '#f0f0f0',
        boxShadow: '3px 3px 6px rgba(0,0,0,0.09), -2px -2px 5px rgba(255,255,255,0.92)',
      }}
    >
      {children}
    </div>
  );
}

/* ─── Feature data ─── */
const features = [
  {
    illustration: (v: boolean) => <BrandIllustration isInView={v} />,
    en: { title: 'Your Brand', desc: 'Custom labels, logos, and packaging design tailored to your market.' },
    ar: { title: 'علامتك التجارية', desc: 'تصميم ملصقات وشعارات وتغليف مخصص لسوقك.' },
  },
  {
    illustration: (v: boolean) => <ManufacturingIllustration isInView={v} />,
    en: { title: 'Contract Manufacturing', desc: 'Full-scale production runs using our certified facilities.' },
    ar: { title: 'التصنيع بالعقد', desc: 'دورات إنتاج كاملة في منشآتنا المعتمدة.' },
  },
  {
    illustration: (v: boolean) => <MoqIllustration isInView={v} />,
    en: { title: 'Flexible MOQ', desc: 'Small or large volumes — we scale to your needs.' },
    ar: { title: 'حد أدنى مرن للطلب', desc: 'كميات صغيرة أو كبيرة — نتكيف مع احتياجاتك.' },
  },
  {
    illustration: (v: boolean) => <QualityIllustration isInView={v} />,
    en: { title: 'Certified Quality', desc: 'International food safety standards on every batch.' },
    ar: { title: 'جودة معتمدة', desc: 'معايير سلامة غذائية دولية في كل دفعة إنتاج.' },
  },
];

function FeatureCardWrapper({
  f,
  locale,
  isRTL,
  index,
}: {
  f: (typeof features)[number];
  locale: string;
  isRTL: boolean;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const content = locale === 'ar' ? f.ar : f.en;
  return (
    <BlurFade delay={0.05 + index * 0.08} inView className="h-full">
      <div
        ref={ref}
        className="relative h-full transform transition-all duration-500 ease-out"
        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02) rotateY(3deg) rotateX(2deg)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) rotateY(0deg) rotateX(0deg)'; }}
      >
        <div
          className="relative w-full h-full flex flex-col rounded-3xl bg-[#f5f5f5] overflow-hidden"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.8)',
            boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
          }}
        >
          <div className="h-48 shrink-0 flex items-center justify-center">
            {f.illustration(isInView)}
          </div>
          <div className={`flex-1 px-6 pb-8 ${isRTL ? 'text-right' : ''}`}>
            <h3 className="text-base font-semibold text-gray-900 mb-1">{content.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{content.desc}</p>
          </div>
        </div>
        <div className="absolute inset-0 rounded-3xl bg-gray-400/20 -z-10" style={{ transform: 'translateZ(-20px) translateY(8px) translateX(4px)', filter: 'blur(12px)' }} />
        <div className="absolute inset-0 rounded-3xl bg-gray-300/15 -z-20" style={{ transform: 'translateZ(-40px) translateY(15px) translateX(8px)', filter: 'blur(20px)' }} />
      </div>
    </BlurFade>
  );
}

/* ─── Section ─── */
export default function PrivateLabel2() {
  const locale = useLocale();
  const isRTL = locale === 'ar';

  return (
    <section id="private-label" className="py-16 px-4 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <BlurFade delay={0.05} inView>
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Tag className="w-4 h-4" />
                {locale === 'ar' ? 'التصنيع الخاص' : 'PRIVATE LABEL'}
              </span>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {locale === 'ar' ? 'نصنع لك' : 'We Manufacture For You'}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            {locale === 'ar'
              ? 'خدمات التصنيع بالعلامة التجارية الخاصة والتصنيع بالعقد بمعايير الجودة الدولية.'
              : 'Private label and contract manufacturing services with international quality standards.'}
          </p>
        </BlurFade>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((f, index) => (
          <FeatureCardWrapper key={index} f={f} locale={locale} isRTL={isRTL} index={index} />
        ))}
      </div>

      {/* CTA */}
      <BlurFade delay={0.4} inView>
        <div className="flex justify-center mt-12">
          <Link href={`/${locale}/quotation`}>
            <FlowButton
              text={locale === 'ar' ? 'اطلب عرض سعر' : 'Request a Quote'}
              variant="solid"
            />
          </Link>
        </div>
      </BlurFade>
    </section>
  );
}

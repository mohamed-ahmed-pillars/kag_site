'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowDown, Tag } from 'lucide-react';
import Link from 'next/link';

const slideVariants = {
  initial: { x: '110%', opacity: 0 },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 280, damping: 28 },
  },
  exit: {
    x: '-110%',
    opacity: 0,
    transition: { duration: 0.35, ease: 'easeIn' as const },
  },
};

export default function Hero() {
  const t = useTranslations('home.hero');
  const tPrivate = useTranslations('home.privateLabel');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const bodyFont = isRTL ? 'font-noto-arabic' : 'font-outfit';

  const videoRef = useRef<HTMLVideoElement>(null);
  const cardIndexRef = useRef(0);
  const [cardIndex, setCardIndex] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.currentTime >= 12 && cardIndexRef.current === 0) {
        cardIndexRef.current = 1;
        setCardIndex(1);
      }
    };

    const handleEnded = () => {
      cardIndexRef.current = 0;
      setCardIndex(0);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);
    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const springConfig = { stiffness: 300, damping: 20 };

  // Main card tilt
  const mainX = useMotionValue(0); const mainY = useMotionValue(0);
  const mainRX = useSpring(useTransform(mainY, [0, 350], [8, -8]), springConfig);
  const mainRY = useSpring(useTransform(mainX, [0, 350], [-8, 8]), springConfig);

  // Coords card tilt
  const coordX = useMotionValue(0); const coordY = useMotionValue(0);
  const coordRX = useSpring(useTransform(coordY, [0, 200], [6, -6]), springConfig);
  const coordRY = useSpring(useTransform(coordX, [0, 200], [-6, 6]), springConfig);

  // Scroll card tilt
  const scrollX = useMotionValue(0); const scrollY = useMotionValue(0);
  const scrollRX = useSpring(useTransform(scrollY, [0, 200], [6, -6]), springConfig);
  const scrollRY = useSpring(useTransform(scrollX, [0, 200], [-6, 6]), springConfig);

  const tiltHandlers = (mx: ReturnType<typeof useMotionValue<number>>, my: ReturnType<typeof useMotionValue<number>>) => ({
    onMouseMove: ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
      mx.set(clientX - left); my.set(clientY - top);
    },
    onMouseLeave: () => { mx.set(0); my.set(0); },
  });

  const cardTransform = { rotateX: mainRX, rotateY: mainRY };

  const cardInnerStyle: React.CSSProperties = {
    backgroundColor: 'var(--color-nav-bg)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#ffffff] dark:bg-[#0f0f0f]">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="/kag1.mp4"
        autoPlay
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0 transform-none"
      />

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-14 md:pb-20 lg:pb-24">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20 max-w-[1600px] mx-auto w-full">
          {/* Left Content — sliding cards */}
          <motion.div
            className="w-full max-w-3xl lg:max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Clip so cards don't overflow during slide */}
            <div className="overflow-hidden rounded-3xl">
              <AnimatePresence mode="popLayout" initial={false}>
                {cardIndex === 0 ? (
                  <motion.div
                    key="vision"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    {...tiltHandlers(mainX, mainY)}
                    style={cardTransform}
                    className="rounded-3xl"
                  >
                    <div style={cardInnerStyle} className="rounded-3xl px-8 py-6 md:px-10 md:py-7 text-left">
                      <p className={`${bodyFont} text-[#354c9a] dark:text-white/90 text-xl md:text-2xl lg:text-[1.7rem] leading-snug mb-5 font-medium tracking-normal`}>
                        {t('description')}
                      </p>
                      <Link
                        href={`/${locale}/contact`}
                        className={`${bodyFont} group inline-flex items-center gap-3 text-[#354c9a] dark:text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="border-b border-[#354c9a]/60 dark:border-white/60 pb-0.5 group-hover:border-[#354c9a] dark:group-hover:border-white transition-colors">
                          {t('ctaLink')}
                        </span>
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </Link>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="private-label"
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    {...tiltHandlers(mainX, mainY)}
                    style={cardTransform}
                    className="rounded-3xl"
                  >
                    <div style={cardInnerStyle} className="rounded-3xl px-8 py-6 md:px-10 md:py-7 text-left">
                      <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-[#354c9a]/10 dark:bg-white/10">
                        <Tag className="w-3 h-3 text-[#354c9a] dark:text-white/80" />
                        <span className="text-[#354c9a] dark:text-white/80 text-xs font-semibold tracking-widest uppercase">
                          {tPrivate('badge')}
                        </span>
                      </div>
                      <p className={`${bodyFont} text-[#354c9a] dark:text-white/90 text-xl md:text-2xl lg:text-[1.7rem] leading-snug mb-1 font-semibold tracking-normal`}>
                        {tPrivate('title')}
                      </p>
                      <p className={`${bodyFont} text-[#354c9a] dark:text-white/90 text-base md:text-lg lg:text-xl font-semibold leading-snug mb-5`}>
                        {tPrivate('subtitle')}
                      </p>
                      <Link
                        href={`/${locale}/quotation`}
                        className={`${bodyFont} group inline-flex items-center gap-3 text-[#354c9a] dark:text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}
                      >
                        <span className="border-b border-[#354c9a]/60 dark:border-white/60 pb-0.5 group-hover:border-[#354c9a] dark:group-hover:border-white transition-colors">
                          {tPrivate('cta')}
                        </span>
                        <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            className={`flex-1 ${isRTL ? 'lg:text-start' : 'lg:text-end'}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </div>

        {/* Bottom Row */}
        <div className="flex items-end justify-between mt-16 lg:mt-20 max-w-[1600px] mx-auto w-full">
          {/* Coordinates card */}
          <motion.div
            {...tiltHandlers(coordX, coordY)}
            style={{ rotateX: coordRX, rotateY: coordRY }}
            className="rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div
              className="text-[#354c9a]/60 dark:text-white/50 text-xs md:text-sm font-mono font-bold tracking-wider px-4 py-2 rounded-2xl"
              style={{
                backgroundColor: 'var(--color-nav-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              {t('coordinates')}
            </div>
          </motion.div>

          {/* Scroll CTA card */}
          <motion.div
            {...tiltHandlers(scrollX, scrollY)}
            style={{ rotateX: scrollRX, rotateY: scrollRY }}
            className="rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div
              className={`${bodyFont} flex items-center gap-2 font-bold text-[#354c9a]/80 dark:text-white/70 text-sm px-4 py-2 rounded-2xl ${isRTL ? 'flex-row-reverse' : ''}`}
              style={{
                backgroundColor: 'var(--color-nav-bg)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <span className="hidden md:inline">{t('scrollCta')}</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

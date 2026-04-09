'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Font classes based on locale
  const headingFont = isRTL ? 'font-sahel' : 'font-poppins';
  const bodyFont = isRTL ? 'font-noto-arabic' : 'font-outfit';

  const tags = [
    { key: 'tag1', label: t('tag1') },
    { key: 'tag2', label: t('tag2') },
    { key: 'tag3', label: t('tag3') },
  ];

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-[#ffffff]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          src="https://framerusercontent.com/assets/aMPvRVYHFQxBoB0v2qyJln83jI.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{
            cursor: 'auto',
            width: '100%',
            height: '100%',
            borderRadius: '0px',
            display: 'block',
            objectFit: 'cover',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            objectPosition: '50% 50%',
            transform: 'scale(1.25) translateY(-8%)',
          }}
        />
        {/* Invert: difference blend with white ≡ filter:invert(1) — composited once per frame on GPU, not in filter pipeline */}
        <div className="absolute inset-0" style={{ backgroundColor: 'white', mixBlendMode: 'difference', zIndex: 1 }} />
        {/* Desaturate: color blend with white ≡ filter:grayscale(1) */}
        <div className="absolute inset-0" style={{ backgroundColor: 'white', mixBlendMode: 'color', zIndex: 2 }} />
        {/* Lightening overlay */}
        <div className="absolute inset-0 z-10" style={{ backgroundColor: 'rgba(254,254,254,0.65)' }} />
        <div className="absolute bottom-0 left-0 right-0 z-20" style={{ height: '180px', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.6) 40%, rgba(255,255,255,1) 100%)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', maskImage: 'linear-gradient(to bottom, transparent, black)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black)' }} />
      </div>

      {/* Centered Logo + Tags */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-0.5 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Image
            src="/navbarLogo.svg"
            alt="KAG"
            width={200}
            height={200}
            className="w-100 h-auto object-contain brightness-0"
            priority
          />
        </motion.div>
        <motion.div
          className={`flex items-center gap-6 ${isRTL ? 'flex-row-reverse' : ''}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {tags.map((tag) => (
            <span
              key={tag.key}
              className={`${bodyFont} flex items-center gap-2 text-black/80 text-sm font-bold tracking-wide ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="w-2 h-2 rounded-full bg-black/80" />
              {tag.label}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end px-8 md:px-16 lg:px-24 xl:px-32 pb-16 md:pb-20 lg:pb-24">
        {/* Main Content Grid */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10 lg:gap-20 max-w-[1600px] mx-auto w-full">
          {/* Left Content */}
          <motion.div
            className="flex-1 max-w-xl lg:max-w-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Subheading - Body Font */}
            <p className={`${bodyFont} text-black/90 text-xl md:text-2xl lg:text-[1.7rem] leading-snug mb-8 font-medium tracking-normal`}>
              {t('description')}
            </p>

            {/* CTA Link */}
            <Link
              href={`/${locale}/contact`}
              className={`${bodyFont} group inline-flex items-center gap-3 text-black text-sm font-medium tracking-wide hover:opacity-80 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="border-b border-black/60 pb-0.5 group-hover:border-black transition-colors">
                {t('ctaLink')}
              </span>
              <ArrowRight className={`w-4 h-4 group-hover:translate-x-1 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </motion.div>

          {/* Right Content - Large Headline */}
          <motion.div
            className={`flex-1 ${isRTL ? 'lg:text-start' : 'lg:text-end'}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* <h1 className={`${headingFont} text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-black leading-[1.1] tracking-tight`}>
              {t('headline1')}
              <br />
              {t('headline2')}
              <br />
              <span className="font-normal text-black/60">{t('headline3')}</span>
            </h1> */}
          </motion.div>
        </div>

        {/* Bottom Row */}
        <div className="flex items-end justify-between mt-16 lg:mt-20 max-w-[1600px] mx-auto w-full">
          {/* Coordinates */}
          <motion.div
            className="text-black/50 text-xs md:text-sm font-mono font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('coordinates')}
          </motion.div>
          {/* Scroll CTA */}
          <motion.div
            className={`${bodyFont} flex items-center gap-2 font-bold text-black/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="hidden md:inline">{t('scrollCta')}</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

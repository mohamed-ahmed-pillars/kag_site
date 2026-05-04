'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { ArrowRight, ArrowDown } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  // Font classes based on locale
  const headingFont = isRTL ? 'font-sahel' : 'font-poppins';
  const bodyFont = isRTL ? 'font-noto-arabic' : 'font-outfit';

  const tags = [
    { key: 'tag1', label: t('tag1') },
    { key: 'tag2', label: t('tag2') },
    { key: 'tag3', label: t('tag3') },
  ];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#ffffff] dark:bg-[#0f0f0f]">
      {/* Video Background */}
      <video
        src="/kag1.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0 transform-none"
      />



      {/* Content Container */}
      <div className="relative z-10 h-full w-full flex flex-col justify-end px-5 sm:px-8 md:px-16 lg:px-24 xl:px-32 pb-14 md:pb-20 lg:pb-24">
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
            <p className={`${bodyFont} text-black/90 dark:text-white/90 text-xl md:text-2xl lg:text-[1.7rem] leading-snug mb-8 font-medium tracking-normal`}>
              {t('description')}
            </p>

            {/* CTA Link */}
            <Link
              href={`/${locale}/contact`}
              className={`${bodyFont} group inline-flex items-center gap-3 text-black dark:text-white text-sm font-medium tracking-wide hover:opacity-80 transition-opacity ${isRTL ? 'flex-row-reverse' : ''}`}
            >
              <span className="border-b border-black/60 dark:border-white/60 pb-0.5 group-hover:border-black dark:group-hover:border-white transition-colors">
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
            className="text-black/50 dark:text-white/50 text-xs md:text-sm font-mono font-bold tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            {t('coordinates')}
          </motion.div>
          {/* Scroll CTA */}
          <motion.div
            className={`${bodyFont} flex items-center gap-2 font-bold text-black/70 dark:text-white/70 text-sm ${isRTL ? 'flex-row-reverse' : ''}`}
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

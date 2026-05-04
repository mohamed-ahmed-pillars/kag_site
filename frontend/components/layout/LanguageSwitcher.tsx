'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  isScrolled?: boolean;
}

export default function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
      className={cn(
        'px-3 py-1.5 rounded-full text-sm font-bold transition-colors duration-150',
        isScrolled
          ? 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 border border-gray-200'
          : 'text-white hover:bg-white/10 border border-white/50 lg:border-white/50'
      )}
    >
      {locale === 'en' ? 'ع' : 'EN'}
    </button>
  );
}

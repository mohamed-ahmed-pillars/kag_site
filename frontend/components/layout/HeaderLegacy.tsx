'use client';

import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { useScroll } from '@/components/ui/use-scroll';

const navItems = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'export', href: '/export' },
  { key: 'quotation', href: '/quotation' },
  { key: 'blog', href: '/blog' },
  { key: 'certifications', href: '/certifications' },
  { key: 'contact', href: '/contact' },
];

export default function Header() {
  const scrolled = useScroll(10);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href === '' && pathname === `/${locale}`);
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 mx-auto w-full max-w-5xl border-b border-transparent md:rounded-md md:border md:transition-all md:ease-out',
        {
          'bg-white/95 supports-[backdrop-filter]:bg-white/50 border-gray-200 backdrop-blur-lg md:top-4 md:max-w-4xl md:shadow':
            scrolled,
        },
      )}
    >
      <nav
        className={cn(
          'flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out',
          {
            'md:px-2': scrolled,
          },
        )}
      >
        <Link href={`/${locale}`}>
          <Image
            src="/logo.png"
            alt="KAG"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={cn(
                'px-3 py-2 text-sm font-medium rounded-md transition',
                isActive(item.href)
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <LanguageSwitcher />
        </div>

        <MobileMenu />
      </nav>
    </header>
  );
}

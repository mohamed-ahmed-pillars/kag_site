'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

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

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();

  const isActive = (href: string) => {
    const fullPath = `/${locale}${href}`;
    return pathname === fullPath || (href === '' && pathname === `/${locale}`);
  };

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 hover:bg-gray-100 rounded-md"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: locale === 'ar' ? '-100%' : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: locale === 'ar' ? '-100%' : '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className={`fixed top-0 ${
                locale === 'ar' ? 'left-0' : 'right-0'
              } h-full w-80 bg-white z-50 shadow-xl`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <span className="text-xl font-bold text-primary-600">KAG</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-md transition ${
                          isActive(item.href)
                            ? 'bg-primary-600 text-white'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t">
                  <LanguageSwitcher />
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

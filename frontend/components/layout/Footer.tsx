import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const quickLinks = [
  { key: 'home', href: '' },
  { key: 'about', href: '/about' },
  { key: 'products', href: '/products' },
  { key: 'certifications', href: '/certifications' },
];

const serviceLinks = [
  { key: 'export', href: '/export' },
  { key: 'quotation', href: '/quotation' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
];

const socials = [
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/share/1DNJqy7Bou/?mibextid=wwXIfr' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/kag.egypt' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/kagegypt/' },
];

export default function Footer() {
  const t = useTranslations();
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#0f0f0f] pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[auto_1fr_1fr_1fr] gap-10 mb-12 items-start">

          {/* Brand */}
          <div className="flex flex-col gap-5 max-w-[200px]">
            <Image
              src="/navbarLogo.svg"
              alt="KAG"
              width={120}
              height={40}
              className="w-20 h-auto md:w-48 dark:invert"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {locale === 'ar'
                ? 'شركة رائدة في تصنيع وتصدير المنتجات الغذائية المصرية عالية الجودة'
                : 'A leading company in manufacturing and exporting premium Egyptian food products.'}
            </p>
            {/* Social icons */}
            <div className="flex gap-2">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 bg-[#f0f0f0] dark:bg-[#2a2a2a]"
                  style={{
                    boxShadow: 'var(--neuo-badge-shadow)',
                  }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
              {locale === 'ar' ? 'خدماتنا' : 'Our Services'}
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={`/${locale}${link.href}`}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 mb-4">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gray-400 dark:text-gray-500" />
                {locale === 'ar' ? 'مكتب 2B – الطابق الأول، مبنى 4، ميفيدا بيزنس بارك 3، التجمع الخامس، القاهرة الجديدة، مصر' : 'Office 2B – 1st Floor, Building 4, Mivida Business Park 3, 5th Settlement, New Cairo, Egypt'}
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 shrink-0 text-gray-400 dark:text-gray-500" />
                <a href="tel:+201234567890" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                  +20 123 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 shrink-0 text-gray-400 dark:text-gray-500" />
                <a href="mailto:wecare@kagegypt.com" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
                  wecare@kagegypt.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full mb-6"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(128,128,128,0.2), transparent)',
          }}
        />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400 dark:text-gray-500">
          <p>© {currentYear} KAG. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}/terms`}
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {t('footer.terms')}
            </Link>
            <Link
              href={`/${locale}/privacy`}
              className="hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              {t('footer.privacy')}
            </Link>
          </div>
          <p className="text-gray-400 dark:text-gray-500 text-xs font-bold">
            {locale === 'ar' ? 'صُنع بواسطة ' : 'Made by '}
            <a
              href="https://technologypillars.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-500 dark:hover:text-gray-400 transition-colors duration-200"
            >
              Technology Pillars
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

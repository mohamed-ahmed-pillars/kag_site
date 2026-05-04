import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Footer } from '@/components/layout';
import SmoothScroll from '@/components/layout/SmoothScroll';
import { ScrollToHash } from '@/components/ui/scroll-to-hash';
import '../globals.css';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'KAG - Food Manufacturing & Export',
  description: 'Premium Egyptian food products for global markets',
  icons: {
    icon: [
      {
        url: '/icon-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();
  const isRTL = locale === 'ar';

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body
        className={`${isRTL ? 'font-noto-arabic' : 'font-outfit'
          } antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <SmoothScroll>
              <Header />
              <main className="relative z-10 -mt-14 md:-mt-16 rounded-b-[3.5rem] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.15)]">{children}</main>
              <Footer />

              <ScrollToHash />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

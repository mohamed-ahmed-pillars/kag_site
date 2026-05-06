import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ShieldCheck } from 'lucide-react';
import { Container } from '@/components/ui';
import LegalSections from '@/components/sections/LegalSections';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
  };
}

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'privacy' });
  const sections = t.raw('sections') as { title: string; body: string }[];

  return (
    <section className="py-20 bg-white dark:bg-[#0f0f0f] min-h-screen">
      <Container>
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{ borderTop: 'var(--card-border-top)', boxShadow: 'var(--card-shadow)' }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <ShieldCheck className="w-4 h-4 text-[#354c9a] dark:text-gray-400" />
                {t('hero.badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
        <LegalSections sections={sections} lastUpdated={t('lastUpdated')} />
      </Container>
    </section>
  );
}

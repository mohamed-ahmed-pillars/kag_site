import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t('hero.title')}</h1>
        <p className="text-xl text-gray-600 mb-8">{t('hero.subtitle')}</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          {t('hero.cta')}
        </button>
      </div>
    </main>
  );
}

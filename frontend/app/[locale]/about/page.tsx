import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import {
  CompanyStory,
  CEOProfile,
  Timeline,
  MissionVision,
  FacilityGallery,
  ContactInfo,
} from '@/components/sections/about';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'about.meta' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <CompanyStory />
      <CEOProfile />
      <MissionVision />
      <Timeline />
      <FacilityGallery />
      <ContactInfo />
    </>
  );
}

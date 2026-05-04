import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import {
  CompanyStory,
  CEOProfile,
  Timeline,
  MissionVision,
  FacilityGallery,
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

export default function AboutPage() {
  return (
    <>
      <CompanyStory />
      <CEOProfile />
      <MissionVision />
      <Timeline />
      <FacilityGallery />
    </>
  );
}

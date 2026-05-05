'use client';

import { useRef, useCallback, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Droplets, Leaf, Flame, ShoppingBag, Package } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';
import { ProductExpandableCard } from '@/components/ui/product-expandable-card';
import { FlowButton } from '@/components/ui/flow-button';

const defaultSpecs = {
  origin: 'Egypt',
  shelfLife: '24 months',
  storage: 'Store in cool, dry place',
  sizes: ['250ml', '500ml', '1L', '5L', '18L'],
};

const defaultPackaging = [
  { type: 'Glass Bottle', sizes: ['250ml', '500ml', '1L'] },
  { type: 'PET Bottle', sizes: ['500ml', '1L', '2L'] },
  { type: 'Tin Can', sizes: ['5L', '18L'] },
];

const defaultFeatures = [
  'Cold-pressed for maximum freshness',
  'No artificial preservatives',
  'ISO 22000 certified facility',
  'Export-grade quality control',
  'Halal certified',
  'Available for private label',
];

const products = [
  {
    id: 1,
    slug: 'sunflower-oil',
    category_en: 'Oils',
    category_ar: 'الزيوت',
    name_en: 'Sunflower Oil',
    name_ar: 'زيت عباد الشمس',
    desc_en: 'Pure and refined sunflower oil for everyday cooking.',
    desc_ar: 'زيت عباد شمس نقي ومكرر للطبخ اليومي.',
    image: '/products/Tin_Can_Oil_copy.png',
    icon: Droplets,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-yellow-50',
  },
  {
    id: 2,
    slug: 'olive-oil',
    category_en: 'Oils',
    category_ar: 'الزيوت',
    name_en: 'Extra Virgin Olive Oil',
    name_ar: 'زيت زيتون بكر ممتاز',
    desc_en: 'Cold-pressed extra virgin olive oil from the finest olives.',
    desc_ar: 'زيت زيتون بكر معصور على البارد من أجود الزيتون.',
    image: '/products/Tin_Can_Olive_Oil_copy.png',
    icon: Leaf,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-green-50',
  },
  {
    id: 3,
    slug: 'tomato-paste',
    category_en: 'Sauces',
    category_ar: 'الصلصات',
    name_en: 'Tomato Paste',
    name_ar: 'معجون الطماطم',
    desc_en: 'Rich concentrated tomato paste for authentic flavors.',
    desc_ar: 'معجون طماطم مركز غني لنكهات أصيلة.',
    image: '/products/Tin_Can_tomato_copy.png',
    icon: ShoppingBag,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-red-50',
  },
  {
    id: 4,
    slug: 'hot-sauce',
    category_en: 'Sauces',
    category_ar: 'الصلصات',
    name_en: 'Hot Chili Sauce',
    name_ar: 'صلصة الفلفل الحار',
    desc_en: 'Fiery chili sauce made from hand-picked peppers.',
    desc_ar: 'صلصة فلفل حار مصنوعة من الفلفل المختار يدوياً.',
    image: '/products/Tin_Can_Hot_Chili_copy[78].png',
    icon: Flame,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-orange-50',
  },
  {
    id: 5,
    slug: 'tahini',
    category_en: 'Spreads',
    category_ar: 'المعجونات',
    name_en: 'Tahini',
    name_ar: 'طحينة',
    desc_en: 'Smooth and creamy tahini made from roasted sesame seeds.',
    desc_ar: 'طحينة ناعمة وكريمية مصنوعة من السمسم المحمص.',
    image: '/products/Tin_Can_Tahini_copy.png',
    icon: ShoppingBag,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-amber-50',
  },
  {
    id: 6,
    slug: 'mixed-pickles',
    category_en: 'Pickles',
    category_ar: 'المخللات',
    name_en: 'Mixed Pickles',
    name_ar: 'مخلل مشكل',
    desc_en: 'Traditional mixed pickles with a perfect tangy taste.',
    desc_ar: 'مخللات مشكلة تقليدية بطعم حامض مثالي.',
    image: '/products/Tin_Can_Plain_copy[58].png',
    icon: Leaf,
    brandLogo: '/yamkers_logo.png',
    color: 'bg-lime-50',
  },
];

export default function ProductShowcase() {
  const t = useTranslations('home.products');
  const locale = useLocale();
  const openFns = useRef<Record<number, () => void>>({});

  const makeRegisterOpen = useCallback((id: number) => (fn: () => void) => {
    openFns.current[id] = fn;
  }, []);

  const relatedProductsMap = useMemo(() => {
    return Object.fromEntries(
      products.map((product) => [
        product.id,
        products
          .filter((p) => p.id !== product.id)
          .slice(0, 4)
          .map((p) => ({
            id: p.id,
            title: locale === 'ar' ? p.name_ar : p.name_en,
            category: locale === 'ar' ? p.category_ar : p.category_en,
            color: p.color,
            imageSrc: p.image,
            onClick: () => openFns.current[p.id]?.(),
          })),
      ])
    );
  }, [locale]);

  return (
    <section className="py-20">
      <Container>
        <div className="flex justify-center mb-4">
          <div
            className="inline-block rounded-3xl px-4 py-1.5"
            style={{
              backgroundColor: 'var(--card-bg)',
              borderTop: 'var(--card-border-top)',
              boxShadow: 'var(--card-shadow)',
            }}
          >
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
              <Package className="w-4 h-4" />
              {t('badge')}
            </span>
          </div>
        </div>
        <SectionTitle subtitle={t('subtitle')} title={t('title')} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-y-14 md:gap-y-16">
          {products.map((product) => {
            const Icon = product.icon;
            const relatedProducts = relatedProductsMap[product.id];

            return (
              <ProductExpandableCard
                key={product.id}
                id={product.id}
                category={locale === 'ar' ? product.category_ar : product.category_en}
                categoryIcon={<Icon className="h-4 w-4" />}
                title={locale === 'ar' ? product.name_ar : product.name_en}
                description={locale === 'ar' ? product.desc_ar : product.desc_en}
                imageSrc={product.image}
                imageAlt={product.name_en}
                brandLogoSrc={product.brandLogo}
                specs={defaultSpecs}
                packagingOptions={defaultPackaging}
                features={defaultFeatures}
                relatedProducts={relatedProducts}
                quoteHref={`/${locale}/quotation`}
                onRegisterOpen={makeRegisterOpen(product.id)}
              />
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link href={`/${locale}/products`}>
            <FlowButton text={t('viewAll')} variant="solid" />
          </Link>
        </div>
      </Container>
    </section>
  );
}

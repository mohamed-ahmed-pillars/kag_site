'use client';

import { useRef, useCallback } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Leaf, Droplets } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';
import { ProductExpandableCard } from '@/components/ui/product-expandable-card';
import { FlowButton } from '@/components/ui/flow-button';
import { products } from '@/lib/data/products';

const featuredIds = [1, 5, 4, 13, 14, 11];

function iconForProduct(category: string) {
  if (category === 'fava_beans') return <Leaf className="w-4 h-4" />;
  return <Droplets className="w-4 h-4" />;
}

export default function ProductShowcase() {
  const t = useTranslations('home.products');
  const locale = useLocale();
  const router = useRouter();
  const openFns = useRef<Record<number, (() => void) | undefined>>({});

  const makeRegisterOpen = useCallback((id: number) => (fn: () => void) => {
    openFns.current[id] = fn;
  }, []);

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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredIds.map((featuredId) => {
            const product = products.find((p) => p.id === featuredId)!;
            const relatedProducts = products
              .filter((p) => p.category_en === product.category_en && p.id !== product.id)
              .map((p) => ({
                id: p.id,
                title: locale === 'ar' ? p.name_ar : p.name_en,
                category: p.category_en,
                color: p.color,
                imageSrc: p.image,
                onClick: () => {
                  if (openFns.current[p.id]) {
                    openFns.current[p.id]!();
                  } else {
                    router.push(`/${locale}/products?open=${p.id}`);
                  }
                },
              }));

            return (
              <ProductExpandableCard
                key={product.id}
                id={product.id}
                categoryIcon={iconForProduct(product.category)}
                category={locale === 'ar' ? product.category_ar : product.category_en}
                title={locale === 'ar' ? product.name_ar : product.name_en}
                description={locale === 'ar' ? product.description_ar : product.description_en}
                imageSrc={product.image}
                imageAlt={product.name_en}
                brandLogoSrc={product.brandLogo}
                specs={product.specs}
                packagingOptions={product.packaging}
                features={product.features}
                nutritionFacts={product.nutritionFacts}
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

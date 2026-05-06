'use client';

import { useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { Leaf, Flame, Droplets, ShoppingBag, Package } from 'lucide-react';
import { ProductExpandableCard } from '@/components/ui/product-expandable-card';
import { products } from '@/lib/data/products';

interface ProductGridProps {
  activeCategory: string;
}

function iconForProduct(product: (typeof products)[number]) {
  if (product.category === 'fava_beans') {
    if (product.slug.includes('hot_chili')) return Flame;
    if (product.slug.includes('oil') && !product.slug.includes('olive')) return Droplets;
    if (product.slug.includes('olive')) return Leaf;
    if (product.slug.includes('3000')) return Package;
    return ShoppingBag;
  }
  if (product.slug.includes('doypack') || product.slug.includes('jar') || product.slug.includes('3000')) return Package;
  return ShoppingBag;
}

export default function ProductGrid({ activeCategory }: ProductGridProps) {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const openFns = useRef<Record<number, () => void>>({});

  const openParam = searchParams.get('open');
  const autoOpenId = useRef<number | null>(openParam ? Number(openParam) : null);

  const makeRegisterOpen = useCallback((id: number) => (fn: () => void) => {
    openFns.current[id] = fn;
    if (autoOpenId.current === id) {
      autoOpenId.current = null;
      setTimeout(fn, 120);
    }
  }, []);

  const filteredProducts = useMemo(
    () => activeCategory === 'all' ? products : products.filter((p) => p.category === activeCategory),
    [activeCategory]
  );

  const relatedProductsMap = useMemo(() => {
    return Object.fromEntries(
      products.map((product) => [
        product.id,
        products
          .filter((p) => p.id !== product.id && p.category === product.category)
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
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
      <AnimatePresence mode="popLayout">
        {filteredProducts.map((product, index) => {
          const Icon = iconForProduct(product);
          const relatedProducts = relatedProductsMap[product.id];

          return (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.04 }}
            >
              <ProductExpandableCard
                id={product.id}
                category={locale === 'ar' ? product.category_ar : product.category_en}
                categoryIcon={<Icon className="h-4 w-4" />}
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
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

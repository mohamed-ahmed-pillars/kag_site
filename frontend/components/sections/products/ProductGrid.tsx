'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import { Droplets, Leaf, Flame, ShoppingBag } from 'lucide-react';
import { ProductHighlightCard } from '@/components/ui/product-card';
import { products } from '@/lib/data/products';

interface ProductGridProps {
  activeCategory: string;
}

const categoryIcons: Record<string, React.ReactNode> = {
  oils: <Droplets className="h-4 w-4" />,
  pickles: <Leaf className="h-4 w-4" />,
  sauces: <Flame className="h-4 w-4" />,
};

const defaultIcon = <ShoppingBag className="h-4 w-4" />;

export default function ProductGrid({ activeCategory }: ProductGridProps) {
  const t = useTranslations('products');
  const locale = useLocale();

  const filteredProducts =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
      <AnimatePresence mode="popLayout">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link href={`/${locale}/products/${product.slug}`}>
              <ProductHighlightCard
                category={t(`categories.${product.category}`)}
                categoryIcon={categoryIcons[product.category] ?? defaultIcon}
                title={locale === 'ar' ? product.name_ar : product.name_en}
                description={locale === 'ar' ? product.description_ar : product.description_en}
                imageSrc={product.image}
                imageAlt={product.name_en}
              />
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

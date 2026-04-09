'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Package } from 'lucide-react';
import { Container, SectionTitle } from '@/components/ui';
import { CategoryFilter, ProductGrid } from '@/components/sections/products';

export default function ProductsPage() {
  const t = useTranslations('products');
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="py-20 bg-white min-h-screen">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Neumorphic badge */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5]"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.8)',
                boxShadow: '0 8px 16px -4px rgba(0,0,0,0.35), inset 0 2px 0 rgba(255,255,255,0.5), 4px 4px 8px rgba(0,0,0,0.25), -4px -4px 8px rgba(255,255,255,0.9)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                <Package className="w-4 h-4" />
                {t('badge') || 'PRODUCTS'}
              </span>
            </div>
          </div>

          <SectionTitle
            title={t('title')}
            subtitle={t('subtitle')}
          />
        </motion.div>

        <CategoryFilter
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <ProductGrid activeCategory={activeCategory} />
      </Container>
    </section>
  );
}

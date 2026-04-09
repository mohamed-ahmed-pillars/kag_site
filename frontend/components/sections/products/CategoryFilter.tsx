'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Droplets, Soup, Salad } from 'lucide-react';

const categories = [
  { id: 'all', slug: 'all', name_en: 'All Products', name_ar: 'جميع المنتجات', icon: null },
  { id: 'oils', slug: 'oils', name_en: 'Oils', name_ar: 'الزيوت', icon: Droplets },
  { id: 'sauces', slug: 'sauces', name_en: 'Sauces', name_ar: 'الصلصات', icon: Soup },
  { id: 'pickles', slug: 'pickles', name_en: 'Pickles', name_ar: 'المخللات', icon: Salad },
];

interface CategoryFilterProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  const locale = useLocale();

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-12">
      {categories.map((category) => {
        const Icon = category.icon;
        const isActive = activeCategory === category.slug;

        return (
          <motion.button
            key={category.id}
            onClick={() => onCategoryChange(category.slug)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-medium text-gray-700 transition-all"
            style={
              isActive
                ? {
                    background: '#e0e0e0',
                    boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.12), inset -3px -3px 7px rgba(255,255,255,0.9)',
                  }
                : {
                    background: '#f5f5f5',
                    borderTop: '1px solid rgba(255,255,255,0.8)',
                    boxShadow: '3px 3px 8px rgba(0,0,0,0.12), -3px -3px 8px rgba(255,255,255,0.9)',
                  }
            }
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {Icon && <Icon className="w-5 h-5" />}
            {locale === 'ar' ? category.name_ar : category.name_en}
          </motion.button>
        );
      })}
    </div>
  );
}

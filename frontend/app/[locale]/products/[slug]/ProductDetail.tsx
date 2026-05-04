'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Package,
  ChevronLeft,
  ChevronRight,
  Check,
  ArrowRight,
  FileText,
  Download,
  MessageSquare,
} from 'lucide-react';
import { Container, Button } from '@/components/ui';

interface Product {
  id: number;
  slug: string;
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  category: string;
  featured: boolean;
  color: string;
}

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

// Placeholder specs (will come from Strapi later)
const productSpecs = {
  volume: ['250ml', '500ml', '1L', '5L', '18L'],
  shelfLife: '24 months',
  storage: 'Store in cool, dry place',
  origin: 'Egypt',
};

const packagingOptions = [
  { type_en: 'Glass Bottle', type_ar: 'زجاجة', sizes: ['250ml', '500ml', '1L'] },
  { type_en: 'PET Bottle', type_ar: 'زجاجة بلاستيكية', sizes: ['500ml', '1L', '2L'] },
  { type_en: 'Tin Can', type_ar: 'علبة معدنية', sizes: ['5L', '18L'] },
];

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const t = useTranslations('products.detail');
  const locale = useLocale();
  const [activeImage, setActiveImage] = useState(0);

  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;

  // Placeholder images
  const images = [1, 2, 3, 4];

  return (
    <section className="py-12 bg-white dark:bg-[#0f0f0f] min-h-screen">
      <Container>
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-8">
          <Link href={`/${locale}`} className="hover:text-primary-600">
            {t('breadcrumb.home')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href={`/${locale}/products`} className="hover:text-primary-600">
            {t('breadcrumb.products')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 dark:text-gray-100">{name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Main Image */}
            <div className={`aspect-square rounded-2xl ${product.color} flex items-center justify-center mb-4 overflow-hidden`}>
              <div className="w-48 h-48 rounded-full bg-white/60 dark:bg-gray-800/60 flex items-center justify-center">
                <Package className="w-24 h-24 text-gray-400" />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-20 h-20 rounded-lg ${product.color} flex items-center justify-center transition-all ${
                    activeImage === index
                      ? 'ring-2 ring-primary-600 ring-offset-2'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Package className="w-8 h-8 text-gray-400" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
              {t(`categories.${product.category}`)}
            </span>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {name}
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {description}
            </p>

            {/* Quick Specs */}
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 mb-8">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">{t('quickSpecs')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('specs.origin')}</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{productSpecs.origin}</p>
                 </div>
                 <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('specs.shelfLife')}</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{productSpecs.shelfLife}</p>
                 </div>
                 <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('specs.storage')}</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{productSpecs.storage}</p>
                 </div>
                 <div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{t('specs.sizes')}</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{productSpecs.volume.join(', ')}</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button href={`/${locale}/quotation`} size="lg">
                <MessageSquare className="w-5 h-5 me-2" />
                {t('requestQuote')}
              </Button>
              <Button variant="outline" size="lg">
                <Download className="w-5 h-5 me-2" />
                {t('downloadSpec')}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Packaging Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('packaging.title')}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {packagingOptions.map((option, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6 hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  {locale === 'ar' ? option.type_ar : option.type_en}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {option.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 border dark:border-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('features.title')}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-secondary-100 dark:bg-secondary-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-secondary-600" />
                </div>
                <span className="text-gray-600 dark:text-gray-400">{t(`features.item${i}`)}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('related')}</h2>
              <Link
                href={`/${locale}/products`}
                className="text-primary-600 font-medium flex items-center hover:underline"
              >
                {t('viewAll')}
                <ArrowRight className="ms-2 w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/${locale}/products/${relatedProduct.slug}`}
                  className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden border dark:border-gray-700 hover:shadow-lg transition-all"
                >
                  <div className={`aspect-video ${relatedProduct.color} flex items-center justify-center`}>
                    <Package className="w-12 h-12 text-gray-400" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition">
                      {locale === 'ar' ? relatedProduct.name_ar : relatedProduct.name_en}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </Container>
    </section>
  );
}

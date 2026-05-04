'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Newspaper } from 'lucide-react';
import { Container } from '@/components/ui';
import { ExpandableCard } from '@/components/ui/expandable-card';
import { posts } from '@/lib/data/posts';

const categories = ['all', 'news', 'certifications', 'events'];

export default function BlogPage() {
  const t = useTranslations('blog');
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts =
    activeCategory === 'all' ? posts : posts.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 min-h-screen">
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <div
              className="inline-block rounded-3xl px-4 py-1.5 bg-[#f5f5f5] dark:bg-[#1e1e1e]"
              style={{
                borderTop: 'var(--card-border-top)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 dark:text-gray-100">
                <Newspaper className="w-4 h-4" />
                {t('badge')}
              </span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">{t('title')}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">{t('subtitle')}</p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-2 rounded-full font-medium text-gray-700 dark:text-gray-300 text-sm transition-all"
              style={
                activeCategory === category
                  ? { background: 'var(--cat-active-bg)', boxShadow: 'var(--cat-active-shadow)' }
                  : { background: 'var(--cat-inactive-bg)', borderTop: 'var(--cat-inactive-border-top)', boxShadow: 'var(--cat-inactive-shadow)' }
              }
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t(`categories.${category}`)}
            </motion.button>
          ))}
        </div>

        {/* ExpandableCard grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const bodyItems = locale === 'ar' ? post.body_ar : post.body_en;
            return (
              <ExpandableCard
                key={post.id}
                title={locale === 'ar' ? post.title_ar : post.title_en}
                src={post.image}
                description={locale === 'ar' ? post.excerpt_ar : post.excerpt_en}
                classNameExpanded="[&_h4]:text-gray-900 dark:[&_h4]:text-gray-100 [&_h4]:font-semibold [&_h4]:text-lg"
              >
                {bodyItems.map((item, i) => (
                  <React.Fragment key={i}>
                    <h4>{item.heading}</h4>
                    <p>{item.body}</p>
                  </React.Fragment>
                ))}
              </ExpandableCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

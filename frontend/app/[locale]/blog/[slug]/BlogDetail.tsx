'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import Link from 'next/link';
import {
  Calendar,
  ChevronRight,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from 'lucide-react';
import { Container, Button } from '@/components/ui';
import type { Post } from '@/lib/data/posts';

interface BlogDetailProps {
  post: Post;
  relatedPosts: Post[];
}

export default function BlogDetail({ post, relatedPosts }: BlogDetailProps) {
  const t = useTranslations('blog');
  const locale = useLocale();

  const title = locale === 'ar' ? post.title_ar : post.title_en;
  const body = locale === 'ar' ? post.body_ar : post.body_en;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* Hero Section */}
      <section className={`py-20 ${post.color}`}>
        <Container size="narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
              <Link href={`/${locale}`} className="hover:text-primary-600">
                {t('breadcrumb.home')}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/${locale}/blog`} className="hover:text-primary-600">
                {t('breadcrumb.blog')}
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 dark:text-gray-100 line-clamp-1">{title}</span>
            </nav>

            <span className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium mb-4">
              {t(`categories.${post.category}`)}
            </span>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              {title}
            </h1>

            <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(post.date)}
              </span>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white dark:bg-[#0f0f0f]">
        <Container size="narrow">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-a:text-primary-600"
            dangerouslySetInnerHTML={{ __html: body }}
          />

          {/* Share Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 pt-8 border-t"
          >
            <div className="flex items-center gap-4">
               <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400 font-medium">
                <Share2 className="w-5 h-5" />
                {t('share')}
              </span>
              <div className="flex gap-2">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 flex items-center justify-center hover:bg-sky-200 dark:hover:bg-sky-900/50 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <button
                  onClick={() => navigator.clipboard.writeText(shareUrl)}
                  className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <LinkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Back Button */}
          <div className="mt-8">
            <Button href={`/${locale}/blog`} variant="outline">
              <ArrowLeft className="me-2 w-4 h-4" />
              {t('backToBlog')}
            </Button>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <Container>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">{t('relatedPosts')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/${locale}/blog/${relatedPost.slug}`}
                  className="group flex gap-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-lg transition"
                >
                  <div className={`w-24 h-24 rounded-lg ${relatedPost.color} flex-shrink-0 flex items-center justify-center`}>
                    <span className="text-2xl font-bold text-gray-400 opacity-30">
                      {locale === 'ar' ? relatedPost.title_ar.charAt(0) : relatedPost.title_en.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary-600 transition line-clamp-2">
                      {locale === 'ar' ? relatedPost.title_ar : relatedPost.title_en}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {formatDate(relatedPost.date)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

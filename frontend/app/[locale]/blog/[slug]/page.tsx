import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { posts } from '@/lib/data/posts';
import BlogDetail from './BlogDetail';

interface Props {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  const title = locale === 'ar' ? post.title_ar : post.title_en;
  const description = locale === 'ar' ? post.excerpt_ar : post.excerpt_en;

  return {
    title: `${title} - KAG Blog`,
    description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = posts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}

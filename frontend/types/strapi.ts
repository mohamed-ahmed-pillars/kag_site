// Strapi Media Types
export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number | null;
    height: number | null;
    formats: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    } | null;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string | null;
  url: string;
}

// Base Strapi Response Types
export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Component Types
export interface ComponentSharedSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string | null;
  metaRobots: string | null;
  structuredData: any | null;
  metaViewport: string | null;
  canonicalURL: string | null;
  metaImage: { data: StrapiMedia | null };
}

export interface ComponentSharedMetaSocial {
  id: number;
  socialNetwork: 'Facebook' | 'Twitter';
  title: string;
  description: string;
  image: { data: StrapiMedia | null };
}

// Content Types Attributes
export interface ProductAttributes {
  name: string;
  name_ar: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  specifications: any | null;
  specifications_ar: any | null;
  price: number | null;
  sku: string | null;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  category: { data: StrapiEntity<CategoryAttributes> | null };
  images: { data: StrapiMedia[] };
  thumbnail: { data: StrapiMedia | null };
  localizations: { data: StrapiEntity<ProductAttributes>[] };
}

export interface CategoryAttributes {
  name: string;
  name_ar: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  products: { data: StrapiEntity<ProductAttributes>[] };
  icon: { data: StrapiMedia | null };
  localizations: { data: StrapiEntity<CategoryAttributes>[] };
}

export interface CertificationAttributes {
  title: string;
  title_ar: string;
  issuer: string;
  issuer_ar: string;
  issueDate: string;
  expiryDate: string | null;
  description: string | null;
  description_ar: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  certificate: { data: StrapiMedia | null };
  logo: { data: StrapiMedia | null };
  localizations: { data: StrapiEntity<CertificationAttributes>[] };
}

export interface BlogPostAttributes {
  title: string;
  title_ar: string;
  slug: string;
  excerpt: string | null;
  excerpt_ar: string | null;
  content: string;
  content_ar: string;
  publishDate: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  author: { data: StrapiEntity<AuthorAttributes> | null };
  category: { data: StrapiEntity<BlogCategoryAttributes> | null };
  featuredImage: { data: StrapiMedia | null };
  seo: ComponentSharedSeo | null;
  localizations: { data: StrapiEntity<BlogPostAttributes>[] };
}

export interface AuthorAttributes {
  name: string;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  avatar: { data: StrapiMedia | null };
  posts: { data: StrapiEntity<BlogPostAttributes>[] };
}

export interface BlogCategoryAttributes {
  name: string;
  name_ar: string;
  slug: string;
  description: string | null;
  description_ar: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  posts: { data: StrapiEntity<BlogPostAttributes>[] };
  localizations: { data: StrapiEntity<BlogCategoryAttributes>[] };
}

export interface QuotationRequestAttributes {
  fullName: string;
  email: string;
  phone: string;
  company: string | null;
  country: string;
  message: string | null;
  status: 'pending' | 'reviewed' | 'responded' | 'closed';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  products: { data: StrapiEntity<ProductAttributes>[] };
}

export interface ExportDestinationAttributes {
  country: string;
  country_ar: string;
  region: string;
  region_ar: string;
  exportVolume: number | null;
  description: string | null;
  description_ar: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  flag: { data: StrapiMedia | null };
  localizations: { data: StrapiEntity<ExportDestinationAttributes>[] };
}

export interface SiteSettingAttributes {
  siteName: string;
  siteName_ar: string;
  tagline: string | null;
  tagline_ar: string | null;
  contactEmail: string;
  contactPhone: string;
  address: string;
  address_ar: string;
  socialMedia: {
    facebook: string | null;
    twitter: string | null;
    linkedin: string | null;
    instagram: string | null;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  logo: { data: StrapiMedia | null };
  favicon: { data: StrapiMedia | null };
  defaultSeo: ComponentSharedSeo | null;
  localizations: { data: StrapiEntity<SiteSettingAttributes>[] };
}

// Type Helpers
export type Product = StrapiEntity<ProductAttributes>;
export type Category = StrapiEntity<CategoryAttributes>;
export type Certification = StrapiEntity<CertificationAttributes>;
export type BlogPost = StrapiEntity<BlogPostAttributes>;
export type Author = StrapiEntity<AuthorAttributes>;
export type BlogCategory = StrapiEntity<BlogCategoryAttributes>;
export type QuotationRequest = StrapiEntity<QuotationRequestAttributes>;
export type ExportDestination = StrapiEntity<ExportDestinationAttributes>;
export type SiteSetting = StrapiEntity<SiteSettingAttributes>;

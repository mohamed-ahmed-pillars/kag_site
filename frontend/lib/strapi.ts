import {
  StrapiResponse,
  Product,
  Category,
  Certification,
  BlogPost,
  BlogCategory,
  QuotationRequest,
  ExportDestination,
  SiteSetting,
  ProductAttributes,
  QuotationRequestAttributes,
} from '@/types/strapi';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

async function fetchAPI<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<StrapiResponse<T>> {
  const { params, ...fetchOptions } = options;

  const queryString = params
    ? '?' +
      Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
        .join('&')
    : '';

  const url = `${STRAPI_URL}/api${endpoint}${queryString}`;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
    ...fetchOptions.headers,
  };

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Products API
export const products = {
  async find(locale: string = 'en', filters?: Record<string, any>) {
    return fetchAPI<Product[]>('/products', {
      params: {
        locale,
        'populate': '*',
        ...filters,
      },
    });
  },

  async findOne(slug: string, locale: string = 'en') {
    return fetchAPI<Product[]>('/products', {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        'populate[0]': 'images',
        'populate[1]': 'thumbnail',
        'populate[2]': 'category',
      },
    }).then((response) => ({
      data: response.data[0] || null,
      meta: response.meta,
    }));
  },

  async findByCategory(categorySlug: string, locale: string = 'en') {
    return fetchAPI<Product[]>('/products', {
      params: {
        locale,
        'filters[category][slug][$eq]': categorySlug,
        'populate': '*',
      },
    });
  },

  async findFeatured(locale: string = 'en', limit: number = 6) {
    return fetchAPI<Product[]>('/products', {
      params: {
        locale,
        'filters[featured][$eq]': true,
        'populate': '*',
        'pagination[limit]': limit,
      },
    });
  },
};

// Categories API
export const categories = {
  async find(locale: string = 'en') {
    return fetchAPI<Category[]>('/categories', {
      params: {
        locale,
        'populate[0]': 'icon',
        'populate[1]': 'products',
      },
    });
  },

  async findOne(slug: string, locale: string = 'en') {
    return fetchAPI<Category[]>('/categories', {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        'populate[0]': 'icon',
        'populate[1]': 'products.thumbnail',
      },
    }).then((response) => ({
      data: response.data[0] || null,
      meta: response.meta,
    }));
  },
};

// Certifications API
export const certifications = {
  async find(locale: string = 'en') {
    return fetchAPI<Certification[]>('/certifications', {
      params: {
        locale,
        'populate[0]': 'certificate',
        'populate[1]': 'logo',
      },
    });
  },
};

// Blog API
export const blog = {
  async findPosts(locale: string = 'en', page: number = 1, pageSize: number = 10) {
    return fetchAPI<BlogPost[]>('/blog-posts', {
      params: {
        locale,
        'populate[0]': 'featuredImage',
        'populate[1]': 'author.avatar',
        'populate[2]': 'category',
        'pagination[page]': page,
        'pagination[pageSize]': pageSize,
        'sort': 'publishDate:desc',
      },
    });
  },

  async findPostBySlug(slug: string, locale: string = 'en') {
    return fetchAPI<BlogPost[]>('/blog-posts', {
      params: {
        locale,
        'filters[slug][$eq]': slug,
        'populate[0]': 'featuredImage',
        'populate[1]': 'author.avatar',
        'populate[2]': 'category',
        'populate[3]': 'seo.metaImage',
      },
    }).then((response) => ({
      data: response.data[0] || null,
      meta: response.meta,
    }));
  },

  async findFeaturedPosts(locale: string = 'en', limit: number = 3) {
    return fetchAPI<BlogPost[]>('/blog-posts', {
      params: {
        locale,
        'filters[featured][$eq]': true,
        'populate[0]': 'featuredImage',
        'populate[1]': 'author.avatar',
        'populate[2]': 'category',
        'pagination[limit]': limit,
        'sort': 'publishDate:desc',
      },
    });
  },

  async findCategories(locale: string = 'en') {
    return fetchAPI<BlogCategory[]>('/blog-categories', {
      params: {
        locale,
      },
    });
  },
};

// Export Destinations API
export const exportDestinations = {
  async find(locale: string = 'en') {
    return fetchAPI<ExportDestination[]>('/export-destinations', {
      params: {
        locale,
        'populate': 'flag',
      },
    });
  },
};

// Site Settings API
export const siteSettings = {
  async find(locale: string = 'en') {
    return fetchAPI<SiteSetting>('/site-setting', {
      params: {
        locale,
        'populate[0]': 'logo',
        'populate[1]': 'favicon',
        'populate[2]': 'defaultSeo.metaImage',
      },
    });
  },
};

// Quotations API
export const quotations = {
  async create(data: Omit<QuotationRequestAttributes, 'status' | 'createdAt' | 'updatedAt' | 'publishedAt'>) {
    return fetchAPI<QuotationRequest>('/quotation-requests', {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  },
};

// Helper function to get full image URL
export function getStrapiURL(path: string = ''): string {
  return `${STRAPI_URL}${path}`;
}

// Helper function to get media URL
export function getStrapiMedia(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return getStrapiURL(url);
}

export default {
  products,
  categories,
  certifications,
  blog,
  exportDestinations,
  siteSettings,
  quotations,
  getStrapiURL,
  getStrapiMedia,
};

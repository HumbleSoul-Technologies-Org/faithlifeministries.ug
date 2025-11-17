/**
 * SEO Utility Functions for FaithLife Church
 * Helps manage metadata, Open Graph tags, and structured data dynamically
 */

interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'video';
}

/**
 * Update page metadata for SEO and social sharing
 */
export function updateSEOMetadata(metadata: SEOMetadata) {
  // Update title
  document.title = metadata.title;

  // Update or create meta tags
  updateMetaTag('description', metadata.description);
  if (metadata.keywords) {
    updateMetaTag('keywords', metadata.keywords);
  }

  // Open Graph tags
  updateMetaTag('og:title', metadata.title, 'property');
  updateMetaTag('og:description', metadata.description, 'property');
  if (metadata.image) {
    updateMetaTag('og:image', metadata.image, 'property');
  }
  if (metadata.url) {
    updateMetaTag('og:url', metadata.url, 'property');
  }
  if (metadata.type) {
    updateMetaTag('og:type', metadata.type, 'property');
  }

  // Twitter Card tags
  updateMetaTag('twitter:title', metadata.title);
  updateMetaTag('twitter:description', metadata.description);
  if (metadata.image) {
    updateMetaTag('twitter:image', metadata.image);
  }

  // Update canonical URL
  updateCanonical(metadata.url || window.location.href);
}

/**
 * Helper function to update or create meta tags
 */
function updateMetaTag(name: string, content: string, type: 'name' | 'property' = 'name') {
  let element = document.querySelector(`meta[${type}="${name}"]`);

  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(type, name);
    document.head.appendChild(element);
  }

  element.setAttribute('content', content);
}

/**
 * Update canonical URL
 */
function updateCanonical(url: string) {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;

  if (!canonical) {
    canonical = document.createElement('link');
    canonical.rel = 'canonical';
    document.head.appendChild(canonical);
  }

  canonical.href = url;
}

/**
 * Add JSON-LD structured data to the page
 */
export function addStructuredData(data: Record<string, unknown>) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  addStructuredData(breadcrumbList);
}

/**
 * Generate article/sermon structured data
 */
export function generateArticleSchema(article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FaithLife Church',
      logo: {
        '@type': 'ImageObject',
        url: 'https://res.cloudinary.com/ghost150/image/upload/v1761738140/FAITHLIFE_LOGO_z9xkpt.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };

  addStructuredData(articleSchema);
}

/**
 * Generate event structured data
 */
export function generateEventSchema(event: {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  image?: string;
  url: string;
}) {
  const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate || event.startDate,
    location: event.location || {
      '@type': 'Place',
      name: 'FaithLife Church',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'US',
      },
    },
    image: event.image,
    url: event.url,
    organizer: {
      '@type': 'Organization',
      name: 'FaithLife Church',
      url: 'https://faithlife-church.com',
    },
  };

  addStructuredData(eventSchema);
}

export default {
  updateSEOMetadata,
  addStructuredData,
  generateBreadcrumbSchema,
  generateArticleSchema,
  generateEventSchema,
};

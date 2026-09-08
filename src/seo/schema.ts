import { site } from '../config/site';
import { reviews } from '../data/reviews';
import type { Market } from '../i18n/markets';

/**
 * Typed JSON-LD builders. Rule: no literal numbers or Q&A text here — social
 * proof comes from src/data/reviews.ts and FAQ entries from the same data
 * module that renders the visible accordion. Language/currency signals come
 * from the Market. The Organization itself (name, sameAs) is the one French
 * publishing entity, shared across markets.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema(market: Market) {
  return {
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'IZIKA SAS',
    url: `${site.url}/`,
    sameAs: [
      'https://www.facebook.com/izikacom/',
      'https://www.instagram.com/lacompta/',
      'https://www.linkedin.com/company-beta/8495707/',
      'https://www.youtube.com/channel/UC8q8fwee3fEvR3zbAyKNi8A',
      'https://twitter.com/izika',
    ],
    logo: {
      '@type': 'ImageObject',
      '@id': `${site.url}/#logo`,
      inLanguage: market.schemaInLanguage,
      url: `${site.url}/assets/brand/logo-izika.png`,
      width: 318,
      height: 112,
      caption: 'IZIKA SAS',
    },
    image: { '@id': `${site.url}/#logo` },
  };
}

export function webSiteSchema(market: Market) {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: market.siteName,
    description: market.websiteDescription,
    publisher: { '@id': ORG_ID },
    inLanguage: market.schemaInLanguage,
  };
}

/** Home + pricing only. */
export function webApplicationSchema(market: Market) {
  return {
    '@type': 'WebApplication',
    name: 'izika',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    accountablePerson: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviews.ratingValue,
      reviewCount: reviews.reviewCount,
      bestRating: reviews.bestRating,
      worstRating: reviews.worstRating,
    },
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: market.currency },
      { '@type': 'Offer', price: market.pricing.yearly, priceCurrency: market.currency },
    ],
  };
}

/** FAQ page only — entries must be the exact ones rendered on the page. */
export function faqPageSchema(entries: ReadonlyArray<{ question: string; answer: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: entries.map((e) => ({
      '@type': 'Question',
      name: e.question,
      acceptedAnswer: { '@type': 'Answer', text: e.answer },
    })),
  };
}

/** Articles only. */
export function articleSchema(market: Market, input: {
  url: string;
  title: string;
  description: string;
  datePublished: Date;
  image?: string;
}) {
  return {
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    url: input.url,
    image: new URL(input.image ?? market.articleOgImage, site.url).href,
    datePublished: input.datePublished.toISOString().slice(0, 10),
    dateModified: input.datePublished.toISOString().slice(0, 10),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: input.url,
    inLanguage: market.schemaInLanguage,
  };
}

export function breadcrumbSchema(items: ReadonlyArray<{ name: string; url: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Wraps nodes into the single @graph script payload. */
export function graph(...nodes: Array<Record<string, unknown> | null | undefined>) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

import { site } from '../config/site';
import { reviews } from '../data/reviews';

/**
 * Typed JSON-LD builders. Rule: no literal numbers or Q&A text here — social
 * proof comes from src/data/reviews.ts and FAQ entries from the same data
 * module that renders the visible accordion.
 */

const ORG_ID = `${site.url}/#organization`;
const WEBSITE_ID = `${site.url}/#website`;

export function organizationSchema() {
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
      inLanguage: 'fr-FR',
      url: `${site.url}/assets/img/logo/izika-logo.png`,
      width: 318,
      height: 112,
      caption: 'IZIKA SAS',
    },
    image: { '@id': `${site.url}/#logo` },
  };
}

export function webSiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${site.url}/`,
    name: 'IZIKA : Calcul indemnité kilométrique',
    description: 'Gestion automatique des indemnités kilométriques',
    publisher: { '@id': ORG_ID },
    inLanguage: 'fr-FR',
  };
}

/** Home + pricing only. */
export function webApplicationSchema() {
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
      { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      { '@type': 'Offer', price: '99', priceCurrency: 'EUR' },
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
export function articleSchema(input: {
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
    image: input.image ? new URL(input.image, site.url).href : new URL(site.defaultOgImage, site.url).href,
    datePublished: input.datePublished.toISOString().slice(0, 10),
    dateModified: input.datePublished.toISOString().slice(0, 10),
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: input.url,
    inLanguage: 'fr-FR',
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

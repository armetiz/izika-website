import type { Locale } from './locales';

/**
 * Single source of truth for editorial routes.
 * A page exists in a locale iff its slug is defined for that locale.
 * hreflang, the sitemap and the language switcher all iterate this table —
 * a page cannot be published without being in the sitemap.
 *
 * Articles are NOT listed here: they live in per-locale content collections
 * (src/content/articles/<locale>/), because IK articles are country-specific
 * content, not translations.
 */
export const routes = {
  home: { fr: '' },
  solo: { fr: 'solo' },
  team: { fr: 'team' },
  teamCollectivites: { fr: 'team-collectivites' },
  teamEntreprises: { fr: 'team-entreprises' },
  features: { fr: 'fonctionnalites' },
  pricing: { fr: 'pricing' },
  faq: { fr: 'faq' },
  security: { fr: 'security' },
  legal: { fr: 'mentions-legales' },
  privacy: { fr: 'charte-de-confidentialite' },
  terms: { fr: 'cgv' },
  calculator: { fr: 'calculateur-indemnites-kilometriques' },
  articles: { fr: 'articles' },
} as const satisfies Record<string, Partial<Record<Locale, string>>>;

export type RouteKey = keyof typeof routes;

/** Solution pages share the `/solutions/<slug>` prefix per locale. */
export const solutionsBase = { fr: 'solutions' } as const satisfies Partial<
  Record<Locale, string>
>;

/** Absolute path of an editorial route in a locale, or null if unavailable. */
export function localizedPath(key: RouteKey, locale: Locale): string | null {
  const slug: string | undefined = routes[key][locale];
  if (slug === undefined) return null;
  return slug === '' ? `/${locale}` : `/${locale}/${slug}`;
}

export function solutionPath(slug: string, locale: Locale): string | null {
  const base: string | undefined = solutionsBase[locale];
  if (base === undefined) return null;
  return `/${locale}/${base}/${slug}`;
}

export function articlePath(slug: string, locale: Locale): string {
  return `/${locale}/${slug}`;
}

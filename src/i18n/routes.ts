import type { MarketId } from './markets';

/**
 * Single source of truth for editorial routes.
 * A page exists in a market iff its slug is defined for that market — route
 * partiality is the per-market feature flag (e.g. a market without a French
 * tax barème simply has no `calculator` entry). hreflang, the sitemap and the
 * market switcher all iterate this table — a page cannot be published without
 * being in the sitemap.
 *
 * Articles are NOT listed here: they live in per-market content collections
 * (src/content/articles/<market>/), because IK articles are country-specific
 * content, not translations.
 */
export const routes = {
  home: { fr: '', en: '' },
  solo: { fr: 'solo', en: 'solo' },
  team: { fr: 'team', en: 'team' },
  teamCollectivites: { fr: 'team-collectivites', en: 'team-local-authorities' },
  teamEntreprises: { fr: 'team-entreprises', en: 'team-companies' },
  features: { fr: 'fonctionnalites', en: 'features' },
  pricing: { fr: 'pricing', en: 'pricing' },
  faq: { fr: 'faq', en: 'faq' },
  security: { fr: 'security', en: 'security' },
  legal: { fr: 'mentions-legales', en: 'legal-notice' },
  privacy: { fr: 'charte-de-confidentialite', en: 'privacy-policy' },
  terms: { fr: 'cgv', en: 'terms' },
  calculator: { fr: 'calculateur-indemnites-kilometriques', en: 'mileage-allowance-calculator' },
  articles: { fr: 'articles' },
} as const satisfies Record<string, Partial<Record<MarketId, string>>>;

export type RouteKey = keyof typeof routes;

/** Solution pages share the `/solutions/<slug>` prefix per market. */
export const solutionsBase = { fr: 'solutions', en: 'solutions' } as const satisfies Partial<
  Record<MarketId, string>
>;

/**
 * Per-market slugs of the solution pages, keyed like dict.solutionsMenu.items.
 * Same partiality rule as `routes`: a solution exists in a market iff its slug
 * is defined here — the mega menu and hreflang iterate this table, and the
 * [market]/solutions route enforces that it matches the content collection
 * both ways at build time (declared slug without YAML, or YAML without a
 * declared slug, fails the build).
 */
export const solutionSlugs = {
  agentsImmobilier: {
    fr: 'agents-immobilier-mandataires-immobilier',
    en: 'real-estate-agents',
  },
  agentAssurances: { fr: 'agent-general-assurances', en: 'insurance-agents' },
  professionsLiberales: { fr: 'professions-liberales', en: 'independent-professionals' },
  artisansBtp: { fr: 'artisans-btp', en: 'craftsmen-construction' },
  consultants: { fr: 'consultants', en: 'consultants' },
} as const satisfies Record<string, Partial<Record<MarketId, string>>>;

export type SolutionKey = keyof typeof solutionSlugs;

/** Slug of a solution in a market, or undefined if unavailable there. */
export function solutionSlug(key: SolutionKey, market: MarketId): string | undefined {
  return marketSlug(solutionSlugs[key], market);
}

/** Partial-table lookup — widens the per-key literal objects so indexing by
 * any MarketId type-checks even while a market has no entry yet. */
const marketSlug = (
  table: Partial<Record<MarketId, string>>,
  market: MarketId,
): string | undefined => table[market];

/** Slug of an editorial route in a market, or undefined if unavailable. */
export function routeSlug(key: RouteKey, market: MarketId): string | undefined {
  return marketSlug(routes[key], market);
}

/** URL segment of the solutions section in a market, or undefined. */
export function solutionsBaseSlug(market: MarketId): string | undefined {
  return marketSlug(solutionsBase, market);
}

/** Absolute path of an editorial route in a market, or null if unavailable. */
export function localizedPath(key: RouteKey, market: MarketId): string | null {
  const slug = routeSlug(key, market);
  if (slug === undefined) return null;
  return slug === '' ? `/${market}` : `/${market}/${slug}`;
}

export function solutionPath(slug: string, market: MarketId): string | null {
  const base = solutionsBaseSlug(market);
  if (base === undefined) return null;
  return `/${market}/${base}/${slug}`;
}

export function articlePath(slug: string, market: MarketId): string {
  return `/${market}/${slug}`;
}

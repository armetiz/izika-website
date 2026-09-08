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
  home: { fr: '', uk: '', 'ch-fr': '' },
  solo: { fr: 'solo', uk: 'solo', 'ch-fr': 'solo' },
  team: { fr: 'team', uk: 'team', 'ch-fr': 'team' },
  teamCollectivites: { fr: 'team-collectivites', uk: 'team-local-authorities' },
  teamEntreprises: { fr: 'team-entreprises', uk: 'team-companies', 'ch-fr': 'team-entreprises' },
  features: { fr: 'fonctionnalites', uk: 'features', 'ch-fr': 'fonctionnalites' },
  pricing: { fr: 'pricing', uk: 'pricing', 'ch-fr': 'pricing' },
  faq: { fr: 'faq', uk: 'faq', 'ch-fr': 'faq' },
  security: { fr: 'security', uk: 'security', 'ch-fr': 'security' },
  legal: { fr: 'mentions-legales', uk: 'legal-notice', 'ch-fr': 'mentions-legales' },
  privacy: { fr: 'charte-de-confidentialite', uk: 'privacy-policy', 'ch-fr': 'charte-de-confidentialite' },
  terms: { fr: 'cgv', uk: 'terms', 'ch-fr': 'cgv' },
  calculator: {
    fr: 'calculateur-indemnites-kilometriques',
    uk: 'mileage-allowance-calculator',
    // Same slug as /fr on purpose: « indemnité kilométrique » is the term the
    // Swiss Ordonnance sur les frais professionnels and the CSI model
    // règlement use too, and hreflang fr-FR/fr-CH exists precisely to
    // disambiguate identical slugs. What separates the two pages for a search
    // engine is the content (CHF 0.75, règlement de frais, art. 327a CO),
    // not the URL.
    'ch-fr': 'calculateur-indemnites-kilometriques',
  },
  articles: { fr: 'articles', 'ch-fr': 'articles' },
} as const satisfies Record<string, Partial<Record<MarketId, string>>>;

/*
 * /ch-fr deliberately has NO `teamCollectivites` entry: « collectivités » is a
 * French administrative category. The Swiss public-sector equivalent (communes,
 * cantons) needs its own copy, not a translation — route partiality masks the
 * page, its chrome links and its sitemap entries until then.
 */

export type RouteKey = keyof typeof routes;

/** Solution pages share the `/solutions/<slug>` prefix per market. */
export const solutionsBase = { fr: 'solutions', uk: 'solutions' } as const satisfies Partial<
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
    uk: 'real-estate-agents',
  },
  agentAssurances: { fr: 'agent-general-assurances', uk: 'insurance-agents' },
  professionsLiberales: { fr: 'professions-liberales', uk: 'independent-professionals' },
  artisansBtp: { fr: 'artisans-btp', uk: 'craftsmen-construction' },
  consultants: { fr: 'consultants', uk: 'consultants' },
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

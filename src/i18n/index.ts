import fr from './fr';
import en from './en';
import type { Language } from './languages';
import { getMarket, marketIds, xDefaultMarket, type MarketId } from './markets';
import { localizedPath, type RouteKey } from './routes';

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DeepWiden<T> = T extends string ? string : { [K in keyof T]: DeepWiden<T[K]> };

/** Every language dictionary must satisfy this shape (derived from fr). */
export type Dict = DeepReadonly<DeepWiden<typeof fr>>;

const dictionaries: Record<Language, Dict> = { fr, en };

/** Chrome dictionary of a market — resolves the market's language internally. */
export function t(market: MarketId): Dict {
  return dictionaries[getMarket(market).language];
}

/**
 * hreflang alternates of an editorial route — null below 2 markets (the
 * single emission rule shared by Seo.astro and the sitemap: an fr-only page
 * deliberately ships zero hreflang tags).
 */
export function hreflangAlternates(routeKey: RouteKey): {
  xDefaultHref: string | null;
  alternates: Array<{ market: MarketId; href: string }>;
} | null {
  const alternates = marketIds
    .map((market) => ({ market, href: localizedPath(routeKey, market) }))
    .filter((a): a is { market: MarketId; href: string } => a.href !== null);
  if (alternates.length < 2) return null;
  return { xDefaultHref: localizedPath(routeKey, xDefaultMarket), alternates };
}

/**
 * Split a content id "<market>/<slug>". An id whose first segment is not a
 * market must fail the build, not publish under a ghost URL segment.
 */
export function splitContentId(id: string): [MarketId, string] {
  const [market, ...rest] = id.split('/');
  if (!(marketIds as readonly string[]).includes(market)) {
    throw new Error(`Content id "${id}": "${market}" is not a market id (${marketIds.join(', ')}).`);
  }
  return [market as MarketId, rest.join('/')];
}

export { languages, type Language } from './languages';
export { marketIds, MARKETS, getMarket, xDefaultMarket, type Market, type MarketId } from './markets';
export * from './routes';

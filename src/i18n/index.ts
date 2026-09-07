import fr from './fr';
import en from './en';
import { languageEndonym, type Language } from './languages';
import { COUNTRIES, countryIds, regionIds, type CountryId, type RegionId } from './countries';
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
 * Model of the country selector: the countries izika serves, grouped by
 * region, each carrying the languages it is available in. This is the only
 * place that joins countries, markets, languages and routes — the component
 * (CountrySwitcher.astro) just renders it.
 *
 * Names are read straight off the dictionary by CountryId / RegionId, so a
 * country or region added without a translation fails to compile here rather
 * than rendering a blank row.
 */
export interface SwitcherLanguage {
  market: MarketId;
  /** Endonym — « Français » on an English page. */
  name: string;
  href: string;
  hreflang: string;
  lang: Language;
  current: boolean;
}

export interface SwitcherCountry {
  id: CountryId;
  /** Localized in the page's language — « Royaume-Uni » on /fr. */
  name: string;
  languages: SwitcherLanguage[];
  current: boolean;
}

export interface SwitcherRegion {
  id: RegionId;
  name: string;
  countries: SwitcherCountry[];
}

export function countrySwitcher(
  current: MarketId,
  routeKey?: RouteKey,
): { regions: SwitcherRegion[]; countryCount: number } {
  const dict = t(current);
  const currentMarket = getMarket(current);
  // Sorted in the reading language, not by ISO code: « Royaume-Uni » comes
  // after « France » in French, « United Kingdom » after « France » in English.
  const collator = new Intl.Collator(currentMarket.numberLocale);

  const countries = countryIds
    .map((id): SwitcherCountry => {
      const languages = marketIds
        .filter((m) => getMarket(m).country === id)
        .map((m): SwitcherLanguage => {
          const market = getMarket(m);
          return {
            market: m,
            name: languageEndonym[market.language],
            // Same page in the other market when it exists there, its home
            // otherwise — route partiality is a per-market feature flag.
            href: (routeKey ? localizedPath(routeKey, m) : null) ?? localizedPath('home', m) ?? `/${m}`,
            hreflang: market.hreflang,
            lang: market.language,
            current: m === current,
          };
        })
        .sort((a, b) => collator.compare(a.name, b.name));
      return {
        id,
        name: dict.countries[id],
        languages,
        current: languages.some((l) => l.current),
      };
    })
    // A country with no market yet is a data error, not a row to render.
    .filter((c) => c.languages.length > 0)
    .sort((a, b) => collator.compare(a.name, b.name));

  const regions = regionIds
    .map((id): SwitcherRegion => ({
      id,
      name: dict.regions[id],
      countries: countries.filter((c) => COUNTRIES[c.id].region === id),
    }))
    .filter((r) => r.countries.length > 0);

  return { regions, countryCount: countries.length };
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

export { languages, languageEndonym, type Language } from './languages';
export { countryIds, regionIds, COUNTRIES, getCountry, type Country, type CountryId, type RegionId } from './countries';
export { marketIds, MARKETS, getMarket, xDefaultMarket, type Market, type MarketId } from './markets';
export * from './routes';

import fr from './fr';
import en from './en';
import type { Language } from './languages';
import { getMarket, type MarketId } from './markets';

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DeepWiden<T> = T extends string ? string : { [K in keyof T]: DeepWiden<T[K]> };

/** Every language dictionary must satisfy this shape (derived from fr). */
export type Dict = DeepReadonly<DeepWiden<typeof fr>>;

const dictionaries: Record<Language, Dict> = { fr, en };

/** Chrome dictionary of a market — resolves the market's language internally. */
export function t(market: MarketId): Dict {
  return dictionaries[getMarket(market).language];
}

export { languages, type Language } from './languages';
export { marketIds, MARKETS, getMarket, xDefaultMarket, type Market, type MarketId } from './markets';
export * from './routes';

import fr from './fr';
import type { Locale } from './locales';

type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> };
type DeepWiden<T> = T extends string ? string : { [K in keyof T]: DeepWiden<T[K]> };

/** Every locale dictionary must satisfy this shape (derived from fr). */
export type Dict = DeepReadonly<DeepWiden<typeof fr>>;

const dictionaries: Record<Locale, Dict> = { fr };

export function t(locale: Locale): Dict {
  return dictionaries[locale];
}

export { locales, defaultLocale, xDefaultLocale, type Locale } from './locales';
export * from './routes';

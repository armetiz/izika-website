export const locales = ['fr'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'fr';

/**
 * Locale that `/` redirects to; also drives the hreflang x-default target.
 * Flip to 'en' when the English locale becomes the international fallback.
 */
export const xDefaultLocale: Locale = 'fr';

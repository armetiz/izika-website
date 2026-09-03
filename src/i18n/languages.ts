/**
 * Languages the site chrome can speak (ISO 639-1). A language is only a way
 * to communicate — regulatory constraints and product typology belong to a
 * Market (src/i18n/markets.ts). Adding a language here breaks the build until
 * its dictionary exists in src/i18n/index.ts.
 */
export const languages = ['fr', 'en'] as const;

export type Language = (typeof languages)[number];

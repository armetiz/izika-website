/**
 * Languages the site chrome can speak (ISO 639-1). A language is only a way
 * to communicate — regulatory constraints and product typology belong to a
 * Market (src/i18n/markets.ts), and the place a visitor picks is a Country
 * (src/i18n/countries.ts). Adding a language here breaks the build until its
 * dictionary exists in src/i18n/index.ts and its endonym is listed below.
 */
export const languages = ['fr', 'en'] as const;

export type Language = (typeof languages)[number];

/**
 * Language names written in the language itself, capitalised (« Français »,
 * not the French lowercase spelling « français ») — treated as a proper noun.
 * Endonyms on purpose: a visitor who cannot read the current page's language
 * must still recognise their own in the country selector.
 */
export const languageEndonym: Record<Language, string> = {
  fr: 'Français',
  en: 'English',
};

/**
 * Cross-market site constants only — anything country-specific (currency,
 * legal entity, SEO geo signals, app URLs…) lives on the Market
 * (src/i18n/markets.ts).
 */
export const site = {
  url: 'https://izika.com',
  /**
   * Main conversion CTA — signup on the app. Kept here only as TrackedLink's
   * default href. TODO multi-market: give TrackedLink a market prop and use
   * getMarket(market).joinUrl instead.
   */
  joinUrl: 'https://go.izika.com/join',
  twitterHandle: '@izika',
  defaultOgImage: '/assets/img/social/opengraph-ban.jpg',
} as const;

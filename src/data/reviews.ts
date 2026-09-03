/**
 * Single source of truth for social proof. Feeds both the visible Trustpilot
 * badges and the JSON-LD aggregateRating — the old site shipped 4.9/249 in
 * JSON-LD but displayed 265, which Google can penalize.
 */
export const reviews = {
  ratingValue: '4.9',
  reviewCount: '265',
  bestRating: '5',
  worstRating: '1',
} as const;

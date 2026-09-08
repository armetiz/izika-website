/**
 * The four product feature cards shown on the home and pricing pages
 * (identical on both). One module per market: feature-cards.fr.ts / .uk.ts.
 */
export interface ProductFeatureCard {
  icon: string;
  alt: string;
  title: string;
  badge?: string;
  text: string;
}

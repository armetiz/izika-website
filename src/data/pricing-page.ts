/**
 * Copy contract of the pricing page (PricingPage.astro shell). One module per
 * market: pricing-page.fr.ts / pricing-page.uk.ts. Prices come from
 * MARKETS.<market>.pricing (single source, also feeds the JSON-LD).
 */
export interface PricingTier {
  name: string;
  /** Suffix appended after the name (Solo ∞). */
  infinity?: boolean;
  /** Price line, may contain inline HTML (<sup>€</sup>). */
  priceHtml: string;
}

/**
 * One cell per tier: 'yes' → green check, 'no' → dash,
 * { limited } → red cross with a note underneath.
 */
export type Cell = 'yes' | 'no' | { limited: string };

export interface FeatureSection {
  title: string;
  rows: ReadonlyArray<{ label: string; cells: readonly [Cell, Cell, Cell] }>;
}

export interface PricingPageCopy {
  hero: { heading: string };
  tiers: ReadonlyArray<PricingTier>;
  tableAria: {
    infinity: string;
    included: string;
    notIncluded: string;
    limited: string;
  };
  featureSections: ReadonlyArray<FeatureSection>;
  featuresCta: string;
  faqTitle: string;
  subscriptionFaq: ReadonlyArray<{ question: string; answer: string }>;
}

/**
 * Copy contract of the home page (HomePage.astro shell). One module per
 * market: home-page.fr.ts / home-page.en.ts. Prices come from
 * MARKETS.<market>.pricing (single source, also feeds the JSON-LD); the four
 * product feature cards are shared with pricing (feature-cards.<market>.ts).
 */
import type { ProductLandingCopy } from './landing-page';

export interface HomeWorksCard {
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  tagline: string;
  /** Body paragraph, may contain inline HTML (<br>, emojis). */
  textHtml: string;
}

export interface HomePricingPlan {
  name: string;
  /** Suffix appended after the name (Solo ∞). */
  nameSuffix?: string;
  price: string;
  priceSuffix?: string;
  bigPrice?: boolean;
  featured?: boolean;
  features: ReadonlyArray<string>;
  /** Team card: "+" separator rendered after the first feature. */
  plusAfterFirst?: boolean;
  eventId: string;
  ctaLabel: string;
}

export interface HomePageCopy {
  hero: {
    title: string;
    lead: string;
    ctaLabel: string;
    collage: ProductLandingCopy['hero']['collage'];
  };
  featuresCta: string;
  testimonials: {
    title: string;
    entries: ReadonlyArray<{ author: string; role: string; textHtml: string }>;
    /** Label of the Trustpilot reviews CTA (markets with a Trustpilot presence). */
    readReviewsLabel: string;
  };
  works: {
    title: string;
    importCard: HomeWorksCard & { badge: string; logosNote: string; logosNoteTitle: string };
    provisionsCard: HomeWorksCard;
    exportCard: HomeWorksCard;
    settingsCard: HomeWorksCard;
    ctaLabel: string;
  };
  calendarLogos: ReadonlyArray<{ src: string; alt: string }>;
  team: {
    eyebrow: string;
    title: string;
    benefits: ReadonlyArray<string>;
    moreLabel: string;
    tryLabel: string;
    imageAlt: string;
  };
  pricing: {
    title: string;
    ariaUnlimited: string;
    plans: ReadonlyArray<HomePricingPlan>;
  };
}

/**
 * Copy contract of the solo/team product landings (ProductLanding.astro
 * shell). One module per page and market: solo-page.fr.ts, team-page.uk.ts…
 * The "compliance" section is shared between solo and team per market
 * (compliance-section.fr.ts / .uk.ts).
 */
import type { CropRect } from '../lib/crop';

export interface LandingScreen {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface LandingChecklistCopy {
  eyebrow: string;
  title: string;
  items: ReadonlyArray<string>;
}

export interface ComplianceCopy extends LandingChecklistCopy {
  imageAlt: string;
}

export interface ProductLandingCopy {
  hero: {
    titlePrefix: string;
    /** Rotating highlighted words; the first one is the no-JS fallback. */
    words: ReadonlyArray<string>;
    ctaLabel: string;
    /** Plain-text lead (solo)… */
    lead?: string;
    /** …or a checkmark list (team). Exactly one of the two. */
    leadChecklist?: ReadonlyArray<string>;
    collage: {
      desktopSrc: string;
      desktopAlt: string;
      desktopWidth: number;
      desktopHeight: number;
      tabletSrc: string;
      tabletAlt: string;
      tabletWidth: number;
      tabletHeight: number;
      /** Small tablet overlay — market-dependent like the two above. */
      ipadSrc: string;
      ipadAlt: string;
      ipadWidth: number;
      ipadHeight: number;
      /** Fenêtre à cadrer dans le master (le relevé entier, pas sa vignette). */
      ipadCrop?: CropRect;
      /** Phone overlay. */
      mobileSrc: string;
      mobileAlt: string;
      mobileWidth: number;
      mobileHeight: number;
    };
  };
  /** Icon row under the hero; text may contain inline HTML (<br>). */
  highlights: ReadonlyArray<{ icon: string; text: string }>;
  simplify: LandingChecklistCopy & { screen: LandingScreen };
  speedUp: LandingChecklistCopy & { screen: LandingScreen };
  compliance: ComplianceCopy;
  testimonials: ReadonlyArray<{ author: string; role: string; text: string }>;
  closing: { title: string; text: string; ctaLabel: string };
}

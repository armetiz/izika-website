/**
 * Copy contract of the features page (FeaturesPage.astro shell). One module
 * per market provides it: features-page.fr.ts / features-page.uk.ts.
 */
import type { CropRect } from '../lib/crop';

export interface FeaturesPageCopy {
  hero: {
    heading: string;
    subheading: string;
    cta: string;
  };
  iconBlocks: ReadonlyArray<{
    icon: string;
    alt: string;
    title: string;
    text: string;
  }>;
  cards: ReadonlyArray<{
    image: string;
    imageAlt: string;
    /** Dimensions du master, pas de la vignette rendue. */
    imageWidth: number;
    imageHeight: number;
    /**
     * Fenêtre à cadrer dans le master. Les trois cartes montrent trois
     * sections du même écran de paramètres : le zoom est ici, plus dans trois
     * fichiers `card-*` (plans/pays/03-inventaire-assets.md § 4.3).
     */
    imageCrop: CropRect;
    title: string;
    /** Paragraphs, may contain inline HTML (<strong>, <br>, emojis). */
    paragraphsHtml: ReadonlyArray<string>;
  }>;
  team: {
    iconAlt: string;
    title: string;
    text: string;
    linkLabel: string;
  };
  cta: {
    title: string;
    ctaLabel: string;
  };
}

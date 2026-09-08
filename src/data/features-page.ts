/**
 * Copy contract of the features page (FeaturesPage.astro shell). One module
 * per market provides it: features-page.fr.ts / features-page.uk.ts.
 */
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

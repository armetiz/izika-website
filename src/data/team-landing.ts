/**
 * Copy contract of the TeamLanding shell (src/components/templates/TeamLanding.astro).
 * Each market provides its own implementation (see team-landing.fr.ts) and
 * the market's pages pass it as a prop — the shell holds no language string.
 * `…Html` fields are trusted inline HTML (span/br), rendered via set:html.
 */
export interface TeamLandingCopy {
  hero: {
    /** H1 text before the highlighted audience word (keep trailing nbsp). */
    titlePrefix: string;
    catch: string;
    cta: string;
    imageAlt: string;
  };
  heroBenefits: ReadonlyArray<{ icon: string; text: string }>;
  intro: {
    titleHtml: string;
    collaboratorsHtml: string;
    managersHtml: string;
  };
  collaborators: {
    kicker: string;
    title: string;
    points: readonly string[];
    screens: ReadonlyArray<{ src: string; alt: string }>;
  };
  managers: {
    kicker: string;
    title: string;
    points: readonly string[];
    screens: ReadonlyArray<{ src: string; alt: string }>;
  };
  security: {
    kicker: string;
    title: string;
    points: readonly string[];
    imageAlt: string;
  };
  testimonials: ReadonlyArray<{ author: string; role: string; text: string }>;
}

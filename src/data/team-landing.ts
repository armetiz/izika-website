/**
 * Copy contract of the TeamLanding shell (src/components/templates/TeamLanding.astro).
 * Each market provides its own implementation (see team-landing.fr.ts) and
 * the market's pages pass it as a prop — the shell holds no language string.
 * `…Html` fields are trusted inline HTML (span/br), rendered via set:html.
 */
import type { LandingScreen } from './landing-page';

export interface TeamLandingCopy {
  hero: {
    /** H1 text before the highlighted audience word (keep trailing nbsp). */
    titlePrefix: string;
    catch: string;
    cta: string;
    image: string;
    imageAlt: string;
    imageWidth: number;
    imageHeight: number;
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
    screen: LandingScreen;
  };
  managers: {
    kicker: string;
    title: string;
    points: readonly string[];
    screen: LandingScreen;
  };
  security: {
    kicker: string;
    title: string;
    points: readonly string[];
    imageAlt: string;
  };
  testimonials: ReadonlyArray<{ author: string; role: string; text: string }>;
  /**
   * Closing CTA — la même section « essai gratuit » que les landings /solo et
   * /team (ProductLandingCopy.closing), pour que toutes les landings se
   * terminent sur le même appel à l'action.
   */
  closing: {
    title: string;
    text: string;
    ctaLabel: string;
    /** Argument marché facultatif rendu sous le CTA (HTML inline de confiance). */
    noteHtml?: string;
  };
}

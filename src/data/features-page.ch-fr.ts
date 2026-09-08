import type { FeaturesPageCopy } from './features-page';
import { featuresPageFr } from './features-page.fr';
import { TAUX_ACTUEL, TAUX_ANTERIEUR } from './mileage-ch';
import { chfPerKm } from '../lib/format';

/**
 * Page /ch-fr/fonctionnalites. Dérivée de features-page.fr.ts : les
 * fonctionnalités sont les mêmes, le produit est le même.
 *
 * Deux blocs ne peuvent pas être repris tels quels :
 * - « Barèmes kilométriques » et le bloc « Gestion multi-véhicules », qui
 *   parlent de puissance fiscale en CV et de barème électrique — deux notions
 *   inexistantes en Suisse, où le forfait est plat et indifférent à la
 *   motorisation ;
 * - « Export conforme aux normes fiscales en vigueur », qui n'a pas de
 *   référent : la norme, en Suisse, c'est le règlement de frais de
 *   l'entreprise.
 */
export const featuresPageChFr: FeaturesPageCopy = {
  ...featuresPageFr,
  hero: {
    ...featuresPageFr.hero,
    subheading:
      'Des fonctionnalités fiables pour vous faire gagner toujours plus de temps sur vos frais kilométriques',
  },
  iconBlocks: [
    {
      icon: '/assets/landing-pages/icon_km-auto.png',
      alt: 'izika import des rdv depuis le calendrier',
      title: 'Génération automatique des déplacements',
      text: 'izika génère votre liste de déplacements à partir des rendez-vous de votre agenda.',
    },
    {
      icon: '/assets/landing-pages/icon_cal-to-rdv.png',
      alt: 'SVG',
      title: 'Connexion avec votre agenda en ligne',
      text: 'Connectez votre agenda en ligne préféré : Google Agenda, Outlook, Office360, iCloud, lien .ics…',
    },
    {
      icon: '/assets/landing-pages/icon_bareme-personnalise.png',
      alt: 'taux kilométrique personnalisé',
      title: 'Le taux de votre règlement de frais',
      text: `${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou un taux libre : izika applique celui que votre canton a approuvé, pas un barème imposé.`,
    },
    {
      icon: '/assets/landing-pages/icon_report-conformity.png',
      alt: 'SVG',
      title: 'Relevés justifiables en cas de contrôle',
      text: "Un export mensuel et/ou annuel complet, où chaque déplacement porte sa date, son motif professionnel, son trajet et sa distance.",
    },
  ],
  cards: [
    {
      image: '/assets/img/fonctionnalites/fonctionnalites-vehicules.jpg',
      imageAlt: 'Gestion multi-véhicules',
      title: 'Gestion multi-véhicules',
      paragraphsHtml: [
        '🚘 Configurez vos différents véhicules et définissez votre véhicule par défaut.',
        `⚡ Le forfait suisse est <strong>indifférent à la motorisation</strong> : thermique, hybride ou 100 % électrique, c'est le même taux, sans majoration à appliquer.`,
      ],
    },
    ...featuresPageFr.cards.slice(1),
  ],
  team: {
    ...featuresPageFr.team,
    text: "Flux d'approbation des demandes de remboursement de frais et preuve du respect de l'art. 327a CO",
  },
};

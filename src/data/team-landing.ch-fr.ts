import type { TeamLandingCopy } from './team-landing';
import { teamLandingFr } from './team-landing.fr';
import { TAUX_ACTUEL, TAUX_ANTERIEUR } from './mileage-ch';
import { chfPerKm } from '../lib/format';
import { marketAssets } from '../lib/assets';

/**
 * Copy de la landing /ch-fr/team-entreprises. Dérivée de team-landing.fr.ts :
 * les captures et la mécanique d'approbation sont identiques.
 *
 * Deux blocs sont réécrits, pas traduits :
 * - `heroBenefits` et `managers`, où l'argument suisse est l'art. 327a CO :
 *   le remboursement des frais imposés par le travail est une obligation
 *   légale, pas une politique interne, et son al. 3 rend nul tout accord qui
 *   en mettrait la charge sur le salarié. L'outil sert donc autant à *prouver*
 *   qu'à *calculer* ;
 * - `security`, dont la version française vend « fabriqué en France » et « la
 *   conformité aux règles fiscales françaises » — deux arguments sans prise
 *   en Suisse, où la question posée est la souveraineté des données et où la
 *   référence fiscale est le règlement de frais cantonal.
 *
 * Pas de landing `/ch-fr/team-collectivites` : « collectivités » est une
 * catégorie administrative française (voir le commentaire de routes.ts).
 */
export const teamLandingChFr: TeamLandingCopy = marketAssets('ch-fr', {
  ...teamLandingFr,
  hero: {
    ...teamLandingFr.hero,
    catch:
      "Remboursez les frais de déplacement de vos collaborateurs sans y passer vos journées — et gardez la preuve que vous le faites.",
  },
  heroBenefits: [
    {
      icon: '/assets/markets/ch-fr/icons/compliance.png',
      text: 'Preuve du respect de l’art. 327a CO',
    },
    { icon: '/assets/markets/ch-fr/icons/calendar-to-trip.png', text: 'Gestion intelligente des RDV' },
    { icon: '/assets/markets/ch-fr/icons/approval.png', text: "Flux d'approbation efficaces" },
    {
      icon: '/assets/icons/teams-folders.png',
      text: 'Ventilation par équipe et par dossier',
    },
    {
      icon: '/assets/markets/ch-fr/icons/security.png',
      text: 'Sécurisé, fiable, hébergement européen',
    },
  ],
  intro: {
    titleHtml: `izika <span class="text-primary">Team</span>, c'est :`,
    collaboratorsHtml: `Un <span class="text-primary">outil de calcul des frais kilométriques</span><br>pour vos collaborateurs roulants`,
    managersHtml: `Une interface d'<span class="text-primary">approbation des demandes de remboursement</span><br>pour vos gestionnaires`,
  },
  collaborators: {
    ...teamLandingFr.collaborators,
    title: 'Une application de calcul des frais kilométriques rapide et facile',
    points: [
      'Mise en route simplissime sur invitation.',
      "Import des RDV depuis un agenda électronique et/ou saisie manuelle intuitive.",
      'Calcul des distances pour chaque déplacement.',
      'Paramétrage des déplacements en tournée ou en étoile.',
      'Gestion des justificatifs et des attributions à des dossiers ou projets.',
    ],
  },
  managers: {
    ...teamLandingFr.managers,
    title: "Des flux d'approbation limpides, et une trace de ce que vous remboursez",
    points: [
      "L'art. 327a CO vous oblige à rembourser les frais imposés par l'exécution du travail. izika vous en donne la trace : chaque déplacement daté, motivé, mesuré, approuvé.",
      'Toutes les demandes sont centralisées et organisées (par équipe, par dossier, etc.) pour simplifier la vie des gestionnaires.',
      "Demandes de remboursement ultra-lisibles, simples à parcourir, justificatifs à portée de clic.",
      "Acceptez des demandes en un clin d'oeil. Refusez-les en deux clins d'oeil. Les managers pointent les RDV problématiques.",
      'Organisez vos équipes comme bon vous semble. Assignez à chaque équipe des managers, des dossiers ou des projets.',
    ],
  },
  security: {
    kicker: 'Cadre légal & fiabilité',
    title: 'izika, aligné sur le droit suisse du remboursement des frais.',
    points: [
      `Le taux appliqué est celui de VOTRE règlement de frais, approuvé par votre canton : ${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou tout autre montant — izika n'impose aucun barème.`,
      "Chaque déplacement porte son motif professionnel, son trajet et sa distance : ce que l'administration fiscale demande de justifier lors d'un contrôle.",
      'Un support en français, direct et non sous-traité, à votre écoute pour répondre à toutes vos questions.',
      'Conforme à la nLPD et au RGPD ; hébergement européen, hors cloud américain.',
    ],
    imageAlt: 'izika, relevés de frais kilométriques prêts pour votre fiduciaire',
  },
});

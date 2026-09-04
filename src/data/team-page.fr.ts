import type { ProductLandingCopy } from './landing-page';
import { complianceSectionFr } from './compliance-section.fr';

export const teamPageFr: ProductLandingCopy = {
  hero: {
    titlePrefix: 'Gestion des IK pour les',
    words: ['entreprises', 'collectivités', 'associations'],
    ctaLabel: 'Tester gratuitement izika',
    leadChecklist: [
      "Calcul automatique des IK depuis l'agenda des collaborateurs terrain",
      "Des flux d'approbation transparents et efficaces pour les gestionnaires",
      'Des documents comptables fiables et normalisés',
    ],
    collage: {
      desktopSrc: '/assets/landing-pages/team/screen-approve-demand.jpg',
      desktopAlt: 'izika sur ordinateur de bureau',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/landing-pages/team/screen-next-rdv2.jpg',
      tabletAlt: 'configurer les rendez-vous en étoile',
      tabletWidth: 1618,
      tabletHeight: 1210,
      ipadAlt: 'izika sur ipad',
      mobileAlt: 'izika sur mobile',
    },
  },
  highlights: [
    {
      icon: '/assets/landing-pages/icon_cal-to-rdv.png',
      text: 'Génération en ligne de relevés de déplacements',
    },
    {
      icon: '/assets/landing-pages/team/icon_approval.png',
      text: "Flux d'approbation des demandes d'IK",
    },
    {
      icon: '/assets/landing-pages/team/icon_teams-and-folders.png',
      text: 'Ventilation des IK par équipe et par dossier',
    },
    {
      icon: '/assets/landing-pages/icon_report-conformity.png',
      text: 'Relevés conformes aux normes fiscales',
    },
    {
      icon: '/assets/landing-pages/team/icon_security.png',
      text: 'Sécurité, confidentialité<br /> créé et hébergé en France',
    },
  ],
  carouselLabel: "Captures d'écran de l'application",
  simplify: {
    eyebrow: "Vos relevés d'IK en 2 min.",
    title: 'Simplifiez le calcul des IK pour vos collaborateurs',
    items: [
      'Calcul instantané des distances et IK de chaque trajet',
      'Synchronisé avec les agendas en ligne (Outlook, Google...)',
      'Paramétrage des déplacements en tournée ou en étoile.',
      "Possibilité d'attacher des justificatifs, facturettes, rapports de visites",
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_rdv-etoiles.png',
        alt: 'Configuration des déplacements en étoile ou en tournée',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_dossiers.png',
        alt: 'catégorisation des rendez-vous en dossiers',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_justificatifs.png',
        alt: 'association des justificatifs aux rendez-vous',
        width: 920,
        height: 719,
      },
    ],
  },
  speedUp: {
    eyebrow: 'Centralisation et automatisation',
    title: "Accélérez le traitement des demandes d'IK",
    items: [
      'Organisation par équipe pour chaque gestionnaire',
      'Approbation et rejet en un clic, pointage des trajets à vérifier',
      'Consolidation analytique par collaborateur et par client ou dossier',
      "Conformité fiscale des relevés d'indemnités kilométriques",
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_liste-demandes.png',
        alt: "Liste des demandes d'indemnisation",
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_approve.png',
        alt: 'approuver une demande',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_voir-itineraire.png',
        alt: "Voir l'itinéraire en détail",
        width: 920,
        height: 719,
      },
    ],
  },
  compliance: complianceSectionFr,
  testimonials: [
    {
      author: 'Olivier',
      role: 'Expert-comptable',
      text: 'Nous avons suggéré à izika d’inclure dans la version Team la gestion de la chaîne d’approbation des indemnités kilométriques depuis le conducteur jusqu’à la paie. Et le résultat dépasse nos espérances! Merci beaucoup.',
    },
    {
      author: 'Romain F',
      role: 'Dirigeant de groupement d’agences immobilières',
      text: 'J’aime beaucoup le fait de remplacer des déclarations sous Excel avec des kilométrages fantaisistes de la part de certains des salariés par un calcul effectué par un tiers sur la base des RDV de l’agenda Outlook des techniciens de maintenance (...)',
    },
    {
      author: 'France',
      role: 'Comptable (SARL de climatisation)',
      text: 'izika gère les distances et les IK, mais aussi les pièces jointes comme les tickets de parking. Cela nous permet de tout centraliser du commercial à son manager puis à la comptabilité.',
    },
    {
      author: 'Mohed',
      role: 'président d’association',
      text: 'Je trouve que le système des approbations et refus des relevés d’IK des salariés est super bien pensé, mais on apprécie surtout de recevoir des données fiables de la part des commerciaux terrain.',
    },
  ],
  closing: {
    title: "Voulez-vous tester le meilleur outil de gestion d'IK ?",
    text: 'Essayez gratuitement toutes les fonctionnalités de izika Team pour votre organisation',
    ctaLabel: 'Tester izika pendant 2 mois',
  },
};

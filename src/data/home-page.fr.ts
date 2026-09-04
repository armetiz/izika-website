import type { HomePageCopy } from './home-page';
import { MARKETS } from '../i18n/markets';

const pricing = MARKETS.fr.pricing;

export const homePageFr: HomePageCopy = {
  hero: {
    title: 'Vos IK en un temps record',
    lead: 'Votre temps est précieux, obtenez vos indemnités kilométriques en 10 min sans maux de tête.',
    ctaLabel: 'Tester gratuitement izika',
    collage: {
      desktopSrc: '/assets/landing-pages/team/screen-next-rdv.jpg',
      desktopAlt: 'izika sur ordinateur de bureau',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/landing-pages/header-screen-ipad-horizontal.jpg',
      tabletAlt: 'izika sur tablette',
      tabletWidth: 1618,
      tabletHeight: 1010,
      ipadAlt: 'izika sur ipad',
      mobileAlt: 'izika sur mobile',
    },
  },
  featuresCta: 'Découvrir toutes les fonctionnalités',
  testimonials: {
    title: 'Plus de 3500 indépendants et entreprises ont choisi izika.',
    entries: [
      {
        author: 'Pierre-Louis',
        role: 'Réparateur téléphones & informatique',
        textHtml:
          'Vraiment top, se synchronise avec tous les agendas. Le service rendu m’a fait gagner des heures voire des semaines de calculs de frais kilométrique pour les déplacements chez mes clients. Service client très rapide et réactif.',
      },
      {
        author: 'Martial',
        role: 'Agent immobilier',
        textHtml:
          "Une simplicité exceptionnelle !<br> Jamais je n'ai eu autant de plaisir à faire mes frais kilométriques ! Avant, c'était une vraie galère... avec izika c'est devenu un jeu d'enfant !",
      },
      {
        author: 'Romain',
        role: 'Agent commercial',
        textHtml:
          "Très satisfait de l'utilisation. Vraiment pratique et très bien pensé. Le service client est top, très réactif et de bon conseil utilisateur.<br> Je recommande les yeux fermés.",
      },
    ],
    readReviewsLabel: 'Lire les avis',
  },
  works: {
    title: 'Comment izika calcule les indemnités kilométriques pour vous ?',
    importCard: {
      image: '/assets/landing-pages/how-it-works-calendar-import.png',
      imageWidth: 2000,
      imageHeight: 1334,
      imageAlt: 'izika import des rdv depuis le calendrier',
      title: 'Importez et gérez vos RDV',
      badge: 'automatique',
      tagline: "En quelques clics, un jeu d'enfant !",
      textHtml:
        "Connectez izika à votre agenda, et vos rendez-vous apparaissent automatiquement sur l'écran de gestion des déplacements. Les distances sont déjà calculées depuis les adresses renseignées dans votre agenda ! 👌",
      logosNote: "+ d'autres",
      logosNoteTitle: 'Toutes les applications comptabiles avec CalDAV',
    },
    provisionsCard: {
      image: '/assets/landing-pages/how-it-works-mensual-provisions.png',
      imageWidth: 2000,
      imageHeight: 1299,
      imageAlt: 'izika provisions ik mensuelles',
      title: 'Vous déclarez des IK mensuelles ?',
      tagline: "Aucun problème, c'est prévu.",
      textHtml:
        "izika calcule pour vous des provisions d'indemnités kilométriques mensuelles indicatives tout au long de la période fiscale. Reportez le montant réel des provisions que vous percevez mois par mois et izika en tiendra compte automatiquement lors de l'édition du relevé général en fin de période fiscale.",
    },
    exportCard: {
      image: '/assets/landing-pages/how-it-works-mileage-allowances-export.png',
      imageWidth: 2000,
      imageHeight: 1764,
      imageAlt: "izika rapport d'indemnités kilométriques",
      title: "Éditez votre relevé d'IK",
      tagline: "C'est déjà fini 😮 ? Oui oui.",
      textHtml:
        'Une fois vos RDV importés et vos déplacements affinés, éditez votre relevé de frais kilométriques prêt à être transmis à votre comptable ou à inclure dans votre bilan. izika liste chaque déplacement professionnel avec toutes les informations obligatoires normalisées dans le respect des règles comptables et fiscales.',
    },
    settingsCard: {
      image: '/assets/landing-pages/how-it-works-parameters.png',
      imageWidth: 2000,
      imageHeight: 1454,
      imageAlt: 'izika paramètres',
      title: "Besoin d'aller encore plus vite ? 🚀",
      tagline: "C'est possible, izika s'apdate à vos habitudes.",
      textHtml:
        "Vous pouvez affiner vos paramètres et optimiser les traitements automatiques de l'application :<br> Configurez vos adresses de départ et de retour habituelles, votre véhicule principal, vos habitudes de déplacements : en tournée ou en étoile...",
    },
    ctaLabel: 'Tester izika',
  },
  calendarLogos: [
    { src: '/assets/landing-pages/google-icon.svg', alt: "Import d'IK depuis Google Agenda" },
    { src: '/assets/landing-pages/icloud-icon.svg', alt: "Import d'IK depuis iCloud" },
    { src: '/assets/landing-pages/outlook-icon.svg', alt: "Import d'IK depuis Microsoft Outlook" },
    { src: '/assets/landing-pages/office365-icon.png', alt: "Import d'IK depuis Microsoft Office 365" },
    { src: '/assets/landing-pages/ics-icon.svg', alt: "Import d'IK depuis fichier ICS" },
    { src: '/assets/landing-pages/dolibarr-icon.png', alt: "Import d'IK depuis Dolibarr" },
  ],
  team: {
    eyebrow: 'Entreprises, collectivités, associations',
    title: "Vous gérez les IK de vos collaborateurs ? izika Team, c'est :",
    benefits: [
      'Toutes les fonctionnalités de izika Solo pour vos collaborateurs',
      'Cartographie ultra fiable pour un calcul des distances précis et sans erreurs',
      "Centralisation des demandes d'IK",
      "Rationalisation des flux d'approbation",
      "Gestion d'équipes et de dossiers",
      'Exports personnalisés',
    ],
    moreLabel: 'En savoir plus sur izika Team',
    tryLabel: 'Tester gratuitement pendant 2 mois',
    imageAlt: 'izika team',
  },
  pricing: {
    title: 'Tarification',
    ariaUnlimited: 'illimité',
    plans: [
      {
        name: 'Solo',
        price: 'Gratuit',
        features: [
          '10 trajets/mois',
          '1 Utilisateur',
          "Gestion d'adresses et de véhicules favoris",
          "Connexion à tous les types d'agenda",
          "Gestion des provisions mensuelles d'IK",
          "Rapports d'IK limité à 10 déplacements / mois",
        ],
        eventId: 'cta_section_pricing_free',
        ctaLabel: 'Tester gratuitement',
      },
      {
        name: 'Solo',
        nameSuffix: '∞',
        price: `${pricing.yearly} €`,
        priceSuffix: '/ an',
        bigPrice: true,
        featured: true,
        features: [
          'Nombre illimité de trajets',
          '1 Utilisateur',
          "Gestion d'adresses et de véhicules favoris",
          "Connexion à tous les types d'agenda",
          "Gestion des provisions mensuelles d'IK",
          "Rapports d'IK complet",
        ],
        eventId: 'cta_section_pricing_solo',
        ctaLabel: 'Tester gratuitement',
      },
      {
        name: 'Team',
        price: 'Sur mesure',
        features: [
          'Fonctionnalités de Solo',
          'Multi utilisateurs',
          "Gestion des utilisateurs (création d'équipe, définition de superviseur/manageur)",
          "Flux d'approbation intelligents des demandes d'IK",
          'Gestion analytique des RDV',
          'Pièces jointes associées aux RDV',
          'Exports complets personnalisés',
        ],
        plusAfterFirst: true,
        eventId: 'cta_section_pricing_team',
        ctaLabel: 'Tester gratuitement pendant 2 mois',
      },
    ],
  },
};

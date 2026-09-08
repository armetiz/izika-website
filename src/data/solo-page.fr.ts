import type { ProductLandingCopy } from './landing-page';
import { complianceSectionFr } from './compliance-section.fr';

export const soloPageFr: ProductLandingCopy = {
  hero: {
    titlePrefix: 'Gestion des IK pour les',
    words: ['indépendants', 'entrepreneurs'],
    ctaLabel: 'Tester gratuitement izika',
    lead: 'Votre temps est précieux, obtenez vos indemnités kilométriques en 10 min sans maux de tête.',
    collage: {
      desktopSrc: '/assets/app/screen-next-stop-wide.fr.jpg',
      desktopAlt: 'izika sur ordinateur de bureau',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/app/screen-settings.fr.png',
      tabletAlt: 'paramétrez izika pour accélérer le traitement de vos IK',
      tabletWidth: 1642,
      tabletHeight: 1202,
      ipadSrc: '/assets/app/report-mileage.fr.jpg',
      ipadAlt: 'izika sur ipad',
      ipadWidth: 533,
      ipadHeight: 711,
      mobileSrc: '/assets/app/screen-mobile-trips.fr.jpg',
      mobileAlt: 'izika sur mobile',
      mobileWidth: 407,
      mobileHeight: 867,
    },
  },
  highlights: [
    {
      icon: '/assets/icons/calendar-to-trip.fr.png',
      text: 'Import des rendez-vous depuis votre agenda',
    },
    {
      icon: '/assets/icons/auto-distance.fr.png',
      text: 'Calcul automatique des distances',
    },
    {
      icon: '/assets/icons/compliance.fr.png',
      text: 'Relevés conformes aux normes fiscales',
    },
    {
      icon: '/assets/icons/security.fr.png',
      text: 'Sécurité, confidentialité<br /> créé et hébergé en France',
    },
  ],
  carouselLabel: "Captures d'écran de l'application",
  simplify: {
    eyebrow: "Vos relevés d'IK en 2 min.",
    title: 'Simplifiez le calcul de vos IK',
    items: [
      'Calcul instantané des distances et des indemnités kilométriques de chaque trajet',
      'Synchronisé avec les agendas en ligne (Outlook, Google...)',
      "Possibilité d'attacher des justificatifs, facturettes, rapports de visites",
      'Éditez en un clic votre relevé de frais kilométriques prêt à être transmis à votre comptable ou à inclure dans votre bilan.',
    ],
    screens: [
      {
        src: '/assets/app/screen-next-stop.fr.png',
        alt: 'Configuration des déplacements en étoile ou en tournée',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/screen-receipts.fr.png',
        alt: 'association des justificatifs aux rendez-vous',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/report-accounting.fr.png',
        alt: 'éditez votre rapport comptable en 1 clic',
        width: 1078,
        height: 790,
      },
    ],
  },
  speedUp: {
    eyebrow: 'Pour aller encore plus vite',
    title: "izika s'adapte à vos usages",
    items: [
      'Créez vos adresses favorites (domicile, bureau...) pour accélérer la saisie',
      'Choisissez votre mode de déplacement par défaut (en étoile ou en tournée)',
      'Ajoutez vos différents véhicules (izika gère aussi les véhicules électriques !)',
      'Déclarez vos provisions mensuelles, izika calcule le reste à charge à la fin de votre période fiscale',
    ],
    screens: [
      {
        src: '/assets/app/screen-settings-addresses.fr.png',
        alt: 'Listez vos adresses principales',
        width: 1644,
        height: 1204,
      },
      {
        src: '/assets/app/screen-settings-travel-mode.fr.png',
        alt: 'Configurez votre mode de déplacement par défaut',
        width: 1640,
        height: 1208,
      },
      {
        src: '/assets/app/screen-settings-vehicles.fr.png',
        alt: 'Listez vos différents véhicules',
        width: 1642,
        height: 1200,
      },
      {
        src: '/assets/app/screen-provisions.fr.png',
        alt: 'Enregistrez vos provisions mensuelles',
        width: 1076,
        height: 792,
      },
    ],
  },
  compliance: complianceSectionFr,
  testimonials: [
    {
      author: 'Eleonore',
      role: '',
      text: "Cela fait un peu plus d'un an que j'utilise izika et j'ai mené des recherches avant de souscrire à cette appli : elle était la seule qui me permettait de calculer les distances entre plusieurs points de rendez-vous notés sur mon agenda électronique.",
    },
    {
      author: 'Arnaud Philippe',
      role: '',
      text: "Interface pratique en lien avec google Agenda, édition rapide du tableau d'IK, gain de temps important. Bonne ergonomie de l'application.",
    },
    {
      author: 'Christian Dumay',
      role: '',
      text: "J'utilise izika depuis 3 ans et le conseille autour de moi. Le temps que je gagne chaque mois est utilisé pour d'autres activités ! Tout est simple et ergonomique. La rigueur des rendez-vous au quotidien, une fois mécanisée, ne compte plus. Merci",
    },
    {
      author: 'Frédéric Bessede',
      role: '',
      text: "Ma comptabilité kilométrique de l'année en 15 minutes grand max, avec juste un peu de rigueur au fil de mon agenda gmail pour indiquer mes lieux de rdvs (ce qui est la moindre des choses), vraiment nickel (...)",
    },
  ],
  closing: {
    title: "Voulez-vous tester le meilleur outil de calcul d'IK ?",
    text: "izika est gratuit jusqu'à 10 trajets par mois ! Essayez toutes les fonctionnalités sans engagement.",
    ctaLabel: 'Tester gratuitement izika',
  },
};

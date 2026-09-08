import type { FeaturesPageCopy } from './features-page';

export const featuresPageFr: FeaturesPageCopy = {
  hero: {
    heading: 'Fonctionnalités',
    subheading:
      'Des fonctionnalités fiables pour vous faire gagner toujours plus de temps sur vos IK',
    cta: 'Essayez gratuitement',
  },
  iconBlocks: [
    {
      icon: '/assets/markets/fr/icons/auto-distance.png',
      alt: 'izika import des rdv depuis le calendrier',
      title: 'Génération automatique des déplacements',
      text: 'izika génère votre liste de déplacements à partir des rendez-vous de votre agenda.',
    },
    {
      icon: '/assets/markets/fr/icons/calendar-to-trip.png',
      alt: 'SVG',
      title: 'Connexion avec votre agenda en ligne',
      text: 'Connectez votre agenda en ligne préféré : Google Agenda, Outlook, Office360, iCloud, lien .ics…',
    },
    {
      icon: '/assets/icons/custom-rate.png',
      alt: 'configurez votre mode de déplacement par défaut',
      title: 'Barèmes kilométriques',
      text: 'Vous pouvez choisir d’utiliser les barêmes officiels ou bien de créer votre propre barême personnalisé.',
    },
    {
      icon: '/assets/markets/fr/icons/compliance.png',
      alt: 'SVG',
      title: 'Export conforme aux normes fiscales en vigueur',
      text: 'Vous récupérez un export mensuel et/ou annuel complet, lisible, fiable et conforme aux normes fiscales.',
    },
  ],
  cards: [
    {
      image: '/assets/markets/fr/app/screen-settings-vehicles.png',
      imageAlt: 'Gestion multi-véhicules',
      imageWidth: 1642,
      imageHeight: 1200,
      imageCrop: { x: 0, y: 0.137, w: 0.62, h: 0.5656 },
      title: 'Gestion multi-véhicules',
      paragraphsHtml: [
        '🚘 Configurez vos différents véhicules et leurs puissances fiscales, et définissez votre véhicule par défaut.',
        '⚡ Prise en compte du barême propre aux <strong>véhicules électriques</strong>.',
      ],
    },
    {
      image: '/assets/markets/fr/app/screen-settings-addresses.png',
      imageAlt: 'Adresses favorites',
      imageWidth: 1644,
      imageHeight: 1204,
      imageCrop: { x: 0, y: 0, w: 0.62, h: 0.5644 },
      title: 'Adresses favorites',
      paragraphsHtml: [
        "🏢 Saisissez vos adresses favorites pour les définir automatiquement comme points de départ et d'arrivée de vos déplacements réguliers.",
      ],
    },
    {
      image: '/assets/markets/fr/app/screen-settings-travel-mode.png',
      imageAlt: 'Modes de déplacement',
      imageWidth: 1640,
      imageHeight: 1208,
      imageCrop: { x: 0, y: 0.384, w: 0.62, h: 0.5612 },
      title: 'Modes de déplacement',
      paragraphsHtml: [
        'Choisissez votre mode de déplacement par défaut :',
        '⏭️ En <strong>tournée</strong> si vous enchainez les rendez-vous les uns à la suite des autres<br>✴️ En <strong>étoile</strong> si vous revenez à votre point de départ entre chaque rendez-vous.',
      ],
    },
  ],
  team: {
    iconAlt: 'gestion multi vehicule et vehicule favori',
    title: 'Gestion de flottes',
    text: "Gestion des flux d'approbation des demandes d'IK des salariés pour les entreprises",
    linkLabel: 'En savoir plus sur izika Team',
  },
  cta: {
    title: "Prêt à tester ? Essayez gratuitement et sans obligation d'achat",
    ctaLabel: 'Créez votre compte',
  },
};

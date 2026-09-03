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
      alt: 'configurez votre mode de déplacement par défaut',
      title: 'Barèmes kilométriques',
      text: 'Vous pouvez choisir d’utiliser les barêmes officiels ou bien de créer votre propre barême personnalisé.',
    },
    {
      icon: '/assets/landing-pages/icon_report-conformity.png',
      alt: 'SVG',
      title: 'Export conforme aux normes fiscales en vigueur',
      text: 'Vous récupérez un export mensuel et/ou annuel complet, lisible, fiable et conforme aux normes fiscales.',
    },
  ],
  cards: [
    {
      image: '/assets/img/fonctionnalites/fonctionnalites-vehicules.jpg',
      imageAlt: 'Gestion multi-véhicules',
      title: 'Gestion multi-véhicules',
      paragraphsHtml: [
        '🚘 Configurez vos différents véhicules et leurs puissances fiscales, et définissez votre véhicule par défaut.',
        '⚡ Prise en compte du barême propre aux <strong>véhicules électriques</strong>.',
      ],
    },
    {
      image: '/assets/img/fonctionnalites/fonctionnalites-adresses.jpg',
      imageAlt: 'Adresses favorites',
      title: 'Adresses favorites',
      paragraphsHtml: [
        "🏢 Saisissez vos adresses favorites pour les définir automatiquement comme points de départ et d'arrivée de vos déplacements réguliers.",
      ],
    },
    {
      image: '/assets/img/fonctionnalites/fonctionnalites-mode-deplacement.jpg',
      imageAlt: 'Modes de déplacement',
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

import type { TeamLandingCopy } from './team-landing';

/**
 * Copy française des landings /team-collectivites et /team-entreprises
 * (portée de templates/landing/team-*.html.twig via TeamLanding.astro).
 * Le mot d'audience du H1 est passé à part par chaque page.
 */
export const teamLandingFr: TeamLandingCopy = {
  hero: {
    titlePrefix: 'Gestion des IK pour les\u00a0',
    catch:
      'Faites gagner à votre structure un maximum de temps sur la gestion de ses indemnités kilométriques.',
    cta: 'Tester gratuitement izika',
    image: '/assets/markets/fr/app/screen-calendar-import.jpg',
    imageAlt: 'izika sur ordinateur de bureau',
    imageWidth: 1618,
    imageHeight: 1010,
  },
  heroBenefits: [
    { icon: '/assets/markets/fr/icons/calendar-to-trip.png', text: 'Gestion intelligente des RDV' },
    { icon: '/assets/markets/fr/icons/approval.png', text: "Flux d'approbation efficaces" },
    {
      icon: '/assets/icons/teams-folders.png',
      text: 'Ventilation par équipe et par dossier',
    },
    {
      icon: '/assets/markets/fr/icons/compliance.png',
      text: 'Rapports conformes aux règles fiscales',
    },
    {
      icon: '/assets/markets/fr/icons/security.png',
      text: 'Sécurisé, fiable, hébergé en France',
    },
  ],
  intro: {
    titleHtml: `izika <span class="text-primary">Team</span>, c'est :`,
    collaboratorsHtml: `Un <span class="text-primary">outil de calcul d'IK</span><br>pour vos collaborateurs roulants`,
    managersHtml: `Une interface d'<span class="text-primary">approbation des demandes d'IK</span><br>pour vos gestionnaires`,
  },
  collaborators: {
    kicker: 'Pour vos collaborateurs,',
    title: "Une application de calcul d'IK rapide et facile",
    points: [
      'Mise en route simplissime sur invitation.',
      "Import des RDV depuis un agenda électronique et/ou saisie manuelle intuitive.",
      'Calcul des distances pour chaque déplacement.',
      'Paramétrage des déplacements en tournée ou en étoile.',
      'Gestion des justificatifs et des attributions à des dossiers ou projets.',
    ],
    screen: {
      src: '/assets/markets/fr/app/screen-next-stop.jpg',
      alt: 'Configuration des déplacements en étoile ou en tournée',
      width: 1618,
      height: 1210,
    },
  },
  managers: {
    kicker: 'Pour vos gestionnaires,',
    title: "Des flux d'approbation limpides et efficaces",
    points: [
      'Toutes les demandes sont centralisées et organisées (par équipe, par dossier, etc.) pour simplifier la vie des gestionnaires.',
      "Demandes d'indemnisations ultra-lisibles, simples à parcourir, justificatifs à portée de clic.",
      "Acceptez des demandes en un clin d'oeil. Refusez des demandes en deux clins d'oeil. Les managers pointent les RDV problématiques.",
      'Organisez vos équipes comme bon vous semble. Assignez à chaque équipe des managers, des dossiers ou des projets.',
      'Editez des rapports complets et conformes aux règles comptables et fiscales.',
    ],
    screen: {
      src: '/assets/markets/fr/app/screen-claims-list.png',
      alt: "Liste des demandes d'indemnisation",
      width: 920,
      height: 719,
    },
  },
  security: {
    kicker: 'Sécurité & fiabilité',
    title: 'izika, fabriqué en France, pour des entreprises françaises et européennes.',
    points: [
      'Un support ultra-efficace en français et non sous-traité, à votre écoute pour répondre à toutes vos questions.',
      'Hébergé en France, sur des serveurs français sécurisés.',
      "Conforme aux règles fiscales françaises et européennes. Rapports d'IK validés par l'administration et les experts comptables.",
      'Conforme à la RGPD et aux règles de confidentialité et de sécurité.',
    ],
    imageAlt: 'izika validé par les experts-comptables',
  },
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
    title: "Prêt à tester le meilleur outil de gestion d'IK ?",
    text: "Toutes les fonctionnalités de izika Team, sans aucune limite pendant 3 mois. Notre équipe est à votre disposition pour vous accompagner dans la mise en place d'izika dans votre structure.",
    ctaLabel: 'Tester izika gratuitement pendant 3 mois',
  },
};

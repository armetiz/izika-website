/**
 * French UI dictionary — the source of truth for the Dict type.
 * Rule: a component shared between markets contains no hardcoded language
 * string — reusable chrome/interface labels live here (per LANGUAGE), while
 * long-form marketing copy stays in the per-market pages (or per-market data
 * modules like src/data/team-landing.fr.ts) and reaches shared components via
 * props. Market-bound values (legal lines, currency, URLs…) live on the
 * Market, not here.
 */
export default {
  nav: {
    features: 'Fonctionnalités',
    pricing: 'Nos offres et tarifs',
    solutions: 'Solutions',
    articles: 'Articles',
    faq: 'FAQ',
    login: 'Connexion',
    menuOpen: 'Ouvrir la navigation',
    menuClose: 'Fermer la navigation',
  },
  cta: {
    /** Libellé unique de tous les CTA d'essai (header, articles, solutions). */
    try: 'Essayer gratuitement',
    signupNow: "S'inscrire maintenant",
  },
  a11y: {
    logoAlt: 'Logo izika',
    countrySwitcher: 'Pays et langue',
    legalNav: 'Informations légales',
    /** Placeholders {rating}/{max} filled from src/data/reviews.ts. */
    ratingAria: 'Note {rating} sur {max}',
  },
  /**
   * Noms de pays (clés = CountryId) et de régions (clés = RegionId), dans la
   * langue du dictionnaire : un visiteur français lit « Royaume-Uni ». Les
   * noms de langues, eux, restent des endonymes (src/i18n/languages.ts).
   */
  countries: {
    FR: 'France',
    GB: 'Royaume-Uni',
    CH: 'Suisse',
  },
  regions: {
    europe: 'Europe',
    americas: 'Amériques',
    asiaPacific: 'Asie-Pacifique',
  },
  countrySwitcher: {
    /** Titre du panneau. */
    title: 'Choisissez votre pays',
    /** Pourquoi le choix compte : ce n'est pas qu'une traduction. */
    hint: 'Le pays détermine le barème kilométrique, la devise et les mentions légales appliqués.',
    /** aria-label du bouton, complété du pays et de la langue courants. */
    trigger: 'Changer de pays ou de langue',
    close: 'Fermer',
    /** Rendu visuellement masqué sur la ligne sélectionnée. */
    currentSelection: 'Sélection actuelle',
    /** Pays disponible dans plusieurs langues : libellé du groupe de liens. */
    languagesLabel: 'Langues disponibles',
  },
  footer: {
    mission: 'Consacrez-vous à ce qui compte vraiment !',
    quote:
      '"Notre ambition est de gérer intégralement les frais kilométriques et de libérer du temps pour les collaborateurs et les dirigeants avec un logiciel intelligent et solide."',
    /** Ancienneté affichée dans le bandeau légal — même source que la FAQ
     *  et la page tarifs (izika SAS existe depuis 2014). */
    since: 'Éditeur français indépendant depuis 2014',
    calculator: "Calculateur d'indemnités kilométriques",
    team: 'Entreprises, associations & collectivités',
    security: 'Sécurité',
    legal: 'Mentions légales',
    privacy: 'Charte de confidentialité',
    terms: 'CGV',
    cookies: 'Consentement des cookies',
    seeAllReviews: 'Voir tous les avis',
  },
  articlesHub: {
    metaTitle: 'Articles — barèmes, guides et intégrations | izika',
    metaDescription:
      "Tous les articles izika : barèmes officiels d'indemnités kilométriques, intégrations d'agendas en ligne et guides pratiques.",
    heading: 'Articles',
    lead: "Barèmes officiels, guides pratiques et intégrations d'agendas pour vos indemnités kilométriques.",
    baremesTitle: 'Barèmes kilométriques',
    baremeCard: 'Barème kilométrique',
    integrationsTitle: "Intégrations d'agendas",
    guidesTitle: 'Guides & conseils',
  },
  article: {
    ctaTitle: 'Envie de gagner du temps sur le calcul de vos IK ?',
    ctaText: 'Vos IK en quelques minutes au lieu de plusieurs heures.',
    ctaMore: 'En savoir +',
    bottomTitle: 'izika automatise la gestion de vos indemnités kilométriques',
    bottomButton: 'Découvrez izika',
    tocTitle: 'Sommaire',
    breadcrumbHome: 'Accueil',
  },
  solutionsMenu: {
    soloGroup: 'Solos et Indépendants',
    teamGroup: 'PME et Équipes',
    soloMore: 'Découvrir izika pour les indépendants →',
    teamMore: 'Découvrir izika pour les équipes →',
    blurb:
      "izika est la solution de déclaration d'IK recommandée par les experts comptables pour les entrepreneurs et les PME.",
    blurbImageAlt: 'Conforme aux règles fiscales',
    items: {
      agentsImmobilier: { title: 'Agent Immobilier', text: 'Agents & mandataires' },
      agentAssurances: {
        title: "Agent Général d'assurances",
        text: 'Déplacements clients et IK sans saisie',
      },
      professionsLiberales: {
        title: 'Professions libérales',
        text: 'Médecins, kinés, infirmiers, avocats…',
      },
      artisansBtp: { title: 'Artisans & BTP', text: 'Déplacements chantiers' },
      consultants: { title: 'Consultants', text: 'Vos trajets clients sans effort' },
      reseauxAgences: { title: 'Réseaux d’agences', text: 'Suivi homogène des IK' },
      banqueAssurance: {
        title: 'Banque & Assurance',
        text: "Gestion d'IK pour vos conseillers terrain",
      },
      administrations: {
        title: 'Administrations',
        text: 'IK pour collectivités, associations, ...',
      },
      btpServices: {
        title: 'BTP / Services techniques',
        text: 'Gérez les trajets de vos équipes mobiles',
      },
      commerces: {
        title: 'Commerces & Distribution',
        text: 'Déplacements de vos équipes, simplifiés',
      },
    },
  },
  solutionPage: {
    signupTitle: 'Testez gratuitement',
    signupText: 'Pas de besoin de carte de crédit • Vos IK en 5 min',
    bandTitle: 'Votre temps est précieux !',
    bandText:
      'Laissez izika faire vos indemnités kilométriques pour vous et utilisez votre temps autrement.',
  },
} as const;

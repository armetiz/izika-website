/**
 * French UI dictionary — the source of truth for the Dict type.
 * Long-form marketing copy stays in the per-locale pages; only site chrome
 * (nav, footer, shared CTA labels) lives here.
 */
export default {
  lang: 'fr',
  nav: {
    features: 'Fonctionnalités',
    pricing: 'Tarifs',
    faq: 'FAQ',
    solutions: 'Solutions',
    articles: 'Articles',
    solo: 'Indépendants',
    team: 'Entreprises',
    login: 'Connexion',
    signup: 'Créer un compte',
  },
  cta: {
    join: 'Essayer gratuitement',
    demo: 'Demander une démo',
  },
  footer: {
    product: 'Produit',
    resources: 'Ressources',
    company: 'Société',
    legal: 'Mentions légales',
    privacy: 'Charte de confidentialité',
    terms: 'CGV',
    security: 'Sécurité',
    calculator: 'Calculateur IK',
    copyright: '© izika SAS',
  },
  article: {
    ctaTitle: 'Envie de gagner du temps sur le calcul de vos IK ?',
    ctaButton: 'Essayer izika gratuitement',
    tocTitle: 'Sommaire',
    breadcrumbHome: 'Accueil',
  },
} as const;

import type { Dict } from './index';

/**
 * English UI dictionary — same shape as fr.ts (the Dict source of truth).
 * Serves the international market chrome; solutionsMenu labels are translated
 * ahead of time even though the mega menu is hidden on /en (no solutions
 * content there yet).
 */
const en: Dict = {
  nav: {
    features: 'Features',
    pricing: 'Plans and pricing',
    solutions: 'Solutions',
    articles: 'Articles',
    faq: 'FAQ',
    login: 'Log in',
    menuOpen: 'Open navigation',
    menuClose: 'Close navigation',
  },
  cta: {
    join: 'Try it for free',
    test: 'Try izika',
    testFree: 'Try izika for free',
    tryFree: 'Try for free',
    signupNow: 'Sign up now',
  },
  a11y: {
    logoAlt: 'izika logo',
    marketSwitcher: 'Language selector',
    ratingAria: 'Rated {rating} out of {max}',
  },
  footer: {
    mission: 'Focus on what really matters!',
    quote:
      '"Our ambition is to fully take care of mileage expenses and free up time for employees and managers with smart, solid software."',
    founderName: 'Pierre A., co-founder',
    founderAvatarAlt: 'Pierre A., co-founder of izika',
    calculator: 'Mileage allowance calculator',
    team: 'Companies, non-profits & local authorities',
    security: 'Security',
    legal: 'Legal notice',
    privacy: 'Privacy policy',
    terms: 'Terms of sale',
    cookies: 'Cookie consent',
    seeAllReviews: 'See all reviews',
  },
  article: {
    ctaTitle: 'Want to save time on your mileage allowances?',
    ctaText: 'Your mileage reports in a few minutes instead of hours.',
    ctaMore: 'Learn more',
    bottomTitle: 'izika automates your mileage allowance management',
    bottomButton: 'Discover izika',
    tocTitle: 'Table of contents',
    breadcrumbHome: 'Home',
  },
  solutionsMenu: {
    soloGroup: 'Solos and freelancers',
    teamGroup: 'SMBs and teams',
    soloMore: 'Discover izika for freelancers →',
    teamMore: 'Discover izika for teams →',
    blurb:
      'izika is the mileage allowance reporting solution recommended by chartered accountants for entrepreneurs and SMBs.',
    blurbImageAlt: 'Compliant with tax rules',
    items: {
      agentsImmobilier: { title: 'Real estate agents', text: 'Agents & independent brokers' },
      agentAssurances: {
        title: 'Insurance agents',
        text: 'Client visits and mileage without data entry',
      },
      professionsLiberales: {
        title: 'Independent professionals',
        text: 'Doctors, physiotherapists, nurses, lawyers…',
      },
      artisansBtp: { title: 'Craftsmen & construction', text: 'Site-to-site travel' },
      consultants: { title: 'Consultants', text: 'Your client trips, effortlessly' },
      reseauxAgences: { title: 'Agency networks', text: 'Consistent mileage tracking' },
      banqueAssurance: {
        title: 'Banking & insurance',
        text: 'Mileage management for your field advisors',
      },
      administrations: {
        title: 'Public administrations',
        text: 'Mileage for local authorities, non-profits, ...',
      },
      btpServices: {
        title: 'Construction / technical services',
        text: 'Manage your mobile teams’ trips',
      },
      commerces: {
        title: 'Retail & distribution',
        text: 'Your teams’ travel, simplified',
      },
    },
  },
  solutionPage: {
    signupTitle: 'Try it for free',
    signupText: 'No credit card required • Your mileage report in 5 min',
    bandTitle: 'Your time is precious!',
    bandText: 'Let izika do your mileage allowances for you and spend your time differently.',
  },
};

export default en;

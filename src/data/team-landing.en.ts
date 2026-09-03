import type { TeamLandingCopy } from './team-landing';

/**
 * English copy of the /en/team-local-authorities and /en/team-companies
 * landings (translation of team-landing.fr.ts). The audience word of the H1
 * is passed separately by each page.
 */
export const teamLandingEn: TeamLandingCopy = {
  hero: {
    titlePrefix: 'Mileage allowance management for ',
    catch:
      'Save your organization a maximum of time on the management of its mileage allowances.',
    cta: 'Try izika for free',
    imageAlt: 'izika on a desktop computer',
  },
  heroBenefits: [
    { icon: '/assets/landing-pages/icon_cal-to-rdv.png', text: 'Smart appointment management' },
    { icon: '/assets/landing-pages/team/icon_approval.png', text: 'Efficient approval workflows' },
    {
      icon: '/assets/landing-pages/team/icon_teams-and-folders.png',
      text: 'Breakdown by team and by project',
    },
    {
      icon: '/assets/landing-pages/icon_report-conformity.png',
      text: 'Reports compliant with tax rules',
    },
    {
      icon: '/assets/landing-pages/team/icon_security.png',
      text: 'Secure, reliable, hosted in France',
    },
  ],
  intro: {
    titleHtml: `Izika <span class="text-primary">Team</span> is:`,
    collaboratorsHtml: `A <span class="text-primary">mileage allowance calculation tool</span><br>for your employees on the road`,
    managersHtml: `An <span class="text-primary">approval interface for mileage claims</span><br>for your managers`,
  },
  collaborators: {
    kicker: 'For your employees,',
    title: 'A fast, easy mileage allowance application',
    points: [
      'Effortless onboarding by invitation.',
      'Appointments imported from an electronic calendar and/or intuitive manual entry.',
      'Distance calculation for every trip.',
      'Round-trip or star-pattern travel configuration.',
      'Management of supporting documents and assignments to projects or clients.',
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_rdv-etoiles.png',
        alt: 'Configuring star-pattern or round trips',
      },
      {
        src: '/assets/landing-pages/team/illu_dossiers.png',
        alt: 'categorizing appointments into projects',
      },
      {
        src: '/assets/landing-pages/team/illu_justificatifs.png',
        alt: 'attaching supporting documents to appointments',
      },
    ],
  },
  managers: {
    kicker: 'For your managers,',
    title: 'Clear, efficient approval workflows',
    points: [
      'All claims are centralized and organized (by team, by project, etc.) to make managers’ lives easier.',
      'Ultra-readable claims, easy to browse, supporting documents one click away.',
      'Approve claims in the blink of an eye. Reject them in two. Managers flag problematic appointments.',
      'Organize your teams however you like. Assign managers, projects or clients to each team.',
      'Generate complete reports compliant with accounting and tax rules.',
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_liste-demandes.png',
        alt: 'List of mileage claims',
      },
      { src: '/assets/landing-pages/team/illu_approve.png', alt: 'approving a claim' },
      { src: '/assets/landing-pages/team/illu_voir-itineraire.png', alt: 'Viewing the route in detail' },
    ],
  },
  security: {
    kicker: 'Security & reliability',
    title: 'izika, made in France, for French and European companies.',
    points: [
      'Ultra-efficient, non-outsourced support, ready to answer all your questions.',
      'Hosted in France, on secure French servers.',
      'Compliant with French and European tax rules. Mileage reports validated by the tax administration and chartered accountants.',
      'Compliant with the GDPR and with privacy and security rules.',
    ],
    imageAlt: 'izika validated by chartered accountants',
  },
  testimonials: [
    {
      author: 'Olivier',
      role: 'Chartered accountant',
      text: 'We suggested that izika include in the Team version the management of the mileage allowance approval chain, from the driver all the way to payroll. And the result exceeds our expectations! Thank you very much.',
    },
    {
      author: 'Romain F',
      role: 'Head of a real estate agency group',
      text: 'I really like replacing Excel declarations — with fanciful mileage figures from some employees — with a calculation done by a third party based on the appointments in the Outlook calendar of the maintenance technicians (...)',
    },
    {
      author: 'France',
      role: 'Accountant (air-conditioning company)',
      text: 'IZIKA handles distances and mileage allowances, but also attachments such as parking receipts. It lets us centralize everything, from the sales rep to their manager and on to accounting.',
    },
    {
      author: 'Mohed',
      role: 'non-profit president',
      text: 'I find the system of approving and rejecting employees’ mileage reports really well designed, but what we appreciate most is receiving reliable data from the field sales team.',
    },
  ],
};

import type { ProductLandingCopy } from './landing-page';
import { complianceSectionEn } from './compliance-section.en';

export const teamPageEn: ProductLandingCopy = {
  hero: {
    titlePrefix: 'Mileage allowance management for',
    words: ['companies', 'local authorities', 'non-profits'],
    ctaLabel: 'Try izika for free',
    leadChecklist: [
      "Automatic mileage allowance calculation from field employees' calendars",
      'Transparent, efficient approval workflows for managers',
      'Reliable, standardized accounting documents',
    ],
    collage: {
      desktopSrc: '/assets/landing-pages/team/screen-approve-demand.jpg',
      desktopAlt: 'izika on a desktop computer',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/landing-pages/team/screen-next-rdv2.jpg',
      tabletAlt: 'configuring star-pattern appointments',
      tabletWidth: 1618,
      tabletHeight: 1210,
      ipadAlt: 'izika on an iPad',
      mobileAlt: 'izika on a mobile phone',
    },
  },
  highlights: [
    {
      icon: '/assets/landing-pages/icon_cal-to-rdv.png',
      text: 'Online generation of trip reports',
    },
    {
      icon: '/assets/landing-pages/team/icon_approval.png',
      text: 'Approval workflows for mileage claims',
    },
    {
      icon: '/assets/landing-pages/team/icon_teams-and-folders.png',
      text: 'Mileage breakdown by team and by project',
    },
    {
      icon: '/assets/landing-pages/icon_report-conformity.png',
      text: 'Reports compliant with tax rules',
    },
    {
      icon: '/assets/landing-pages/team/icon_security.png',
      text: 'Security, privacy —<br /> built and hosted in France',
    },
  ],
  carouselLabel: 'Application screenshots',
  simplify: {
    eyebrow: 'Your mileage reports in 2 min.',
    title: 'Simplify mileage allowance calculation for your employees',
    items: [
      'Instant calculation of the distances and mileage allowances of every trip',
      'Synced with online calendars (Outlook, Google...)',
      'Round-trip or star-pattern travel configuration.',
      'Attach supporting documents, receipts, visit reports',
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_rdv-etoiles.png',
        alt: 'Configuring star-pattern or round trips',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_dossiers.png',
        alt: 'categorizing appointments into projects',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_justificatifs.png',
        alt: 'attaching supporting documents to appointments',
        width: 920,
        height: 719,
      },
    ],
  },
  speedUp: {
    eyebrow: 'Centralization and automation',
    title: 'Speed up the processing of mileage claims',
    items: [
      'Organization by team for each manager',
      'One-click approval and rejection, flagging of trips to verify',
      'Analytical consolidation by employee and by client or project',
      'Tax compliance of the mileage allowance reports',
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_liste-demandes.png',
        alt: 'List of mileage claims',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_approve.png',
        alt: 'approving a claim',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_voir-itineraire.png',
        alt: 'Viewing the route in detail',
        width: 920,
        height: 719,
      },
    ],
  },
  compliance: complianceSectionEn,
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
      text: "I find the system of approving and rejecting employees' mileage reports really well designed, but what we appreciate most is receiving reliable data from the field sales team.",
    },
  ],
  closing: {
    title: 'Want to try the best mileage allowance management tool?',
    text: 'Try every izika Team feature for free for your organization',
    ctaLabel: 'Try izika for 2 months',
  },
};

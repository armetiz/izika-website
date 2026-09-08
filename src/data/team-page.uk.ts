import type { ProductLandingCopy } from './landing-page';
import { complianceSectionUk } from './compliance-section.uk';

export const teamPageUk: ProductLandingCopy = {
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
      desktopSrc: '/assets/app/screen-claim-approve-wide.uk.jpg',
      desktopAlt: 'izika on a desktop computer',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/app/screen-next-stop-tablet.uk.jpg',
      tabletAlt: 'configuring star-pattern appointments',
      tabletWidth: 1618,
      tabletHeight: 1210,
      ipadSrc: '/assets/app/report-mileage.uk.jpg',
      ipadAlt: 'izika on an iPad',
      ipadWidth: 533,
      ipadHeight: 711,
      mobileSrc: '/assets/app/screen-mobile-trips.uk.jpg',
      mobileAlt: 'izika on a mobile phone',
      mobileWidth: 407,
      mobileHeight: 867,
    },
  },
  highlights: [
    {
      icon: '/assets/icons/calendar-to-trip.uk.png',
      text: 'Online generation of trip reports',
    },
    {
      icon: '/assets/icons/approval.uk.png',
      text: 'Approval workflows for mileage claims',
    },
    {
      icon: '/assets/icons/teams-folders.png',
      text: 'Mileage breakdown by team and by project',
    },
    {
      icon: '/assets/icons/compliance.uk.png',
      text: 'Reports compliant with tax rules',
    },
    {
      icon: '/assets/icons/security.uk.png',
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
        src: '/assets/app/screen-next-stop.uk.png',
        alt: 'Configuring star-pattern or round trips',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/screen-folders.uk.png',
        alt: 'categorizing appointments into projects',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/screen-receipts.uk.png',
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
        src: '/assets/app/screen-claims-list.uk.png',
        alt: 'List of mileage claims',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/screen-claim-approve.uk.png',
        alt: 'approving a claim',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/app/screen-route.uk.png',
        alt: 'Viewing the route in detail',
        width: 920,
        height: 719,
      },
    ],
  },
  compliance: complianceSectionUk,
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
      text: 'izika handles distances and mileage allowances, but also attachments such as parking receipts. It lets us centralize everything, from the sales rep to their manager and on to accounting.',
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

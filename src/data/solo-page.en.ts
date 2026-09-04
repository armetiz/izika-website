import type { ProductLandingCopy } from './landing-page';
import { complianceSectionEn } from './compliance-section.en';

export const soloPageEn: ProductLandingCopy = {
  hero: {
    titlePrefix: 'Mileage allowance management for',
    words: ['freelancers', 'entrepreneurs'],
    ctaLabel: 'Try izika for free',
    lead: 'Your time is precious — get your mileage allowances in 10 minutes without the headache.',
    collage: {
      desktopSrc: '/assets/landing-pages/team/screen-next-rdv.jpg',
      desktopAlt: 'izika on a desktop computer',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/landing-pages/screens/parametres.png',
      tabletAlt: 'configure izika to speed up your mileage processing',
      tabletWidth: 1642,
      tabletHeight: 1202,
      ipadAlt: 'izika on an iPad',
      mobileAlt: 'izika on a mobile phone',
    },
  },
  highlights: [
    {
      icon: '/assets/landing-pages/icon_cal-to-rdv.png',
      text: 'Appointments imported from your calendar',
    },
    {
      icon: '/assets/landing-pages/icon_km-auto.png',
      text: 'Automatic distance calculation',
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
    title: 'Simplify your mileage allowance calculation',
    items: [
      'Instant calculation of the distances and mileage allowances of every trip',
      'Synced with online calendars (Outlook, Google...)',
      'Attach supporting documents, receipts, visit reports',
      'Generate in one click your mileage expense report, ready to hand to your accountant or include in your annual accounts.',
    ],
    screens: [
      {
        src: '/assets/landing-pages/team/illu_rdv-etoiles.png',
        alt: 'Configuring star-pattern or round trips',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/team/illu_justificatifs.png',
        alt: 'attaching supporting documents to appointments',
        width: 920,
        height: 719,
      },
      {
        src: '/assets/landing-pages/screens/rapport-comptable.png',
        alt: 'generate your accounting report in 1 click',
        width: 1078,
        height: 790,
      },
    ],
  },
  speedUp: {
    eyebrow: 'To go even faster',
    title: 'izika adapts to your habits',
    items: [
      'Save your favourite addresses (home, office...) to speed up data entry',
      'Choose your default travel mode (star pattern or round trip)',
      'Add your different vehicles (izika also handles electric vehicles!)',
      'Report your monthly provisions — izika computes the remaining balance at the end of your tax period',
    ],
    screens: [
      {
        src: '/assets/landing-pages/screens/parametres-adresses.png',
        alt: 'List your main addresses',
        width: 1644,
        height: 1204,
      },
      {
        src: '/assets/landing-pages/screens/parametres_mode-deplacement.png',
        alt: 'Configure your default travel mode',
        width: 1640,
        height: 1208,
      },
      {
        src: '/assets/landing-pages/screens/parametres-vehicules.png',
        alt: 'List your different vehicles',
        width: 1642,
        height: 1200,
      },
      {
        src: '/assets/landing-pages/screens/provisions.png',
        alt: 'Record your monthly provisions',
        width: 1076,
        height: 792,
      },
    ],
  },
  compliance: complianceSectionEn,
  testimonials: [
    {
      author: 'Eleonore',
      role: '',
      text: 'I have been using izika for a little over a year and I did my research before subscribing to this app: it was the only one that let me compute the distances between several appointment locations noted in my electronic calendar.',
    },
    {
      author: 'Arnaud Philippe',
      role: '',
      text: 'Practical interface connected to Google Calendar, quick generation of the mileage table, significant time savings. Great ergonomics.',
    },
    {
      author: 'Christian Dumay',
      role: '',
      text: 'I have been using izika for 3 years and recommend it around me. The time I save every month goes to other activities! Everything is simple and ergonomic. The daily discipline of appointments, once automated, no longer matters. Thank you',
    },
    {
      author: 'Frédéric Bessede',
      role: '',
      text: "My whole year's mileage accounting in 15 minutes tops, with just a bit of discipline in my Gmail calendar to note my appointment locations (which is the least I can do) — really spotless (...)",
    },
  ],
  closing: {
    title: 'Want to try the best mileage allowance calculation tool?',
    text: 'izika is free up to 10 trips per month! Try every feature with no commitment.',
    ctaLabel: 'Try izika for free',
  },
};

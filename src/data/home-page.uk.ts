import type { HomePageCopy } from './home-page';
import { MARKETS } from '../i18n/markets';

const pricing = MARKETS.uk.pricing;

// Currency symbol before the amount, English style (€99), unlike the fr page.
export const homePageUk: HomePageCopy = {
  hero: {
    title: 'Your mileage report in record time',
    lead: 'Your time is precious — get your mileage allowances in 10 minutes without the headache.',
    ctaLabel: 'Try izika for free',
    collage: {
      desktopSrc: '/assets/app/screen-next-stop-wide.uk.jpg',
      desktopAlt: 'izika on a desktop computer',
      desktopWidth: 1618,
      desktopHeight: 1010,
      tabletSrc: '/assets/app/step-settings-wide.uk.jpg',
      tabletAlt: 'izika on a tablet',
      tabletWidth: 1618,
      tabletHeight: 1010,
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
  testimonialsBackground: '/assets/photos/laptop-app.uk.jpg',
  featuresCta: 'Discover all the features',
  testimonials: {
    title: 'Since 2014, more than 3,500 freelancers and companies have chosen izika.',
    entries: [
      {
        author: 'Pierre-Louis',
        role: 'Phone & IT repair technician',
        textHtml:
          'Really great — it syncs with every calendar. The service saved me hours, even weeks, of mileage expense calculations for my trips to clients. Customer support is very fast and responsive.',
      },
      {
        author: 'Martial',
        role: 'Real estate agent',
        textHtml:
          "Exceptionally simple!<br> I have never enjoyed doing my mileage expenses this much! It used to be a real chore… with izika it has become child's play!",
      },
      {
        author: 'Romain',
        role: 'Sales agent',
        textHtml:
          'Very satisfied with the app. Really practical and well thought out. Customer support is great — very responsive and full of good advice.<br> I recommend it with my eyes closed.',
      },
    ],
    readReviewsLabel: 'Read the reviews',
  },
  works: {
    title: 'How does izika compute your mileage allowances for you?',
    importCard: {
      image: '/assets/app/step-calendar-import.uk.png',
      imageWidth: 2000,
      imageHeight: 1334,
      imageAlt: 'izika imports appointments from the calendar',
      title: 'Import and manage your appointments',
      badge: 'automatic',
      tagline: "A few clicks — child's play!",
      textHtml:
        'Connect izika to your calendar and your appointments automatically appear on the trip management screen. Distances are already computed from the addresses in your calendar! 👌',
      logosNote: '+ more',
      logosNoteTitle: 'Every application compatible with CalDAV',
    },
    provisionsCard: {
      image: '/assets/app/step-provisions.uk.png',
      imageWidth: 2000,
      imageHeight: 1299,
      imageAlt: 'izika monthly mileage provisions',
      title: 'Do you report monthly mileage allowances?',
      tagline: "No problem, we've got you covered.",
      textHtml:
        'izika computes indicative monthly mileage allowance provisions for you throughout the tax period. Enter the actual provision amounts you receive month by month and izika will automatically account for them when generating the final report at the end of the tax period.',
    },
    exportCard: {
      image: '/assets/app/step-mileage-export.uk.png',
      imageWidth: 2000,
      imageHeight: 1764,
      imageAlt: 'izika mileage allowance report',
      title: 'Generate your mileage report',
      tagline: 'Done already 😮? Yes indeed.',
      textHtml:
        'Once your appointments are imported and your trips fine-tuned, generate your mileage expense report, ready to hand to your accountant or include in your annual accounts. izika lists every business trip with all the required information, standardized in compliance with accounting and tax rules.',
    },
    settingsCard: {
      image: '/assets/app/step-settings.uk.png',
      imageWidth: 2000,
      imageHeight: 1454,
      imageAlt: 'izika settings',
      title: 'Need to go even faster? 🚀',
      tagline: 'You can — izika adapts to your habits.',
      textHtml:
        "Fine-tune your settings and optimize the application's automatic processing:<br> Set your usual departure and return addresses, your main vehicle, your travel habits — round trips or star pattern...",
    },
    ctaLabel: 'Try izika',
  },
  calendarLogos: [
    { src: '/assets/integrations/google.svg', alt: 'Mileage import from Google Calendar' },
    { src: '/assets/integrations/icloud.svg', alt: 'Mileage import from iCloud' },
    { src: '/assets/integrations/outlook.svg', alt: 'Mileage import from Microsoft Outlook' },
    { src: '/assets/integrations/office365.png', alt: 'Mileage import from Microsoft Office 365' },
    { src: '/assets/integrations/ics.svg', alt: 'Mileage import from ICS file' },
    { src: '/assets/integrations/dolibarr.png', alt: 'Mileage import from Dolibarr' },
  ],
  team: {
    eyebrow: 'Companies, local authorities, non-profits',
    title: "Managing your employees' mileage allowances? izika Team gives you:",
    benefits: [
      'All the izika Solo features for your employees',
      'Ultra-reliable mapping for precise, error-free distance calculation',
      'Centralized mileage allowance claims',
      'Streamlined approval workflows',
      'Team and project management',
      'Custom exports',
    ],
    moreLabel: 'Learn more about izika Team',
    tryLabel: 'Try free for 2 months',
    image: '/assets/app/screen-claims-list.uk.png',
    imageAlt: 'izika team',
    imageWidth: 920,
    imageHeight: 719,
  },
  pricing: {
    title: 'Pricing',
    ariaUnlimited: 'unlimited',
    plans: [
      {
        name: 'Solo',
        price: 'Free',
        features: [
          '10 trips/month',
          '1 user',
          'Favourite addresses and vehicles',
          'Connects to every type of calendar',
          'Monthly mileage provision management',
          'Mileage reports limited to 10 trips / month',
        ],
        eventId: 'cta_section_pricing_free',
        ctaLabel: 'Try for free',
      },
      {
        name: 'Solo',
        nameSuffix: '∞',
        price: `€${pricing.yearly}`,
        priceSuffix: '/ year',
        bigPrice: true,
        featured: true,
        features: [
          'Unlimited trips',
          '1 user',
          'Favourite addresses and vehicles',
          'Connects to every type of calendar',
          'Monthly mileage provision management',
          'Complete mileage reports',
        ],
        eventId: 'cta_section_pricing_solo',
        ctaLabel: 'Try for free',
      },
      {
        name: 'Team',
        price: 'Custom quote',
        features: [
          'All Solo features',
          'Multiple users',
          'User management (team creation, supervisor/manager roles)',
          'Smart approval workflows for mileage claims',
          'Analytical appointment management',
          'Attachments linked to appointments',
          'Complete custom exports',
        ],
        plusAfterFirst: true,
        eventId: 'cta_section_pricing_team',
        ctaLabel: 'Try free for 2 months',
      },
    ],
  },
};

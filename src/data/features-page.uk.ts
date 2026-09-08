import type { FeaturesPageCopy } from './features-page';

export const featuresPageUk: FeaturesPageCopy = {
  hero: {
    heading: 'Features',
    subheading: 'Reliable features that keep saving you more time on your mileage allowances',
    cta: 'Try it for free',
  },
  iconBlocks: [
    {
      icon: '/assets/markets/uk/icons/auto-distance.png',
      alt: 'izika imports appointments from the calendar',
      title: 'Automatic trip generation',
      text: 'izika builds your trip list from the appointments in your calendar.',
    },
    {
      icon: '/assets/markets/uk/icons/calendar-to-trip.png',
      alt: 'SVG',
      title: 'Connects to your online calendar',
      text: 'Connect your favourite online calendar: Google Calendar, Outlook, Office 365, iCloud, .ics link…',
    },
    {
      icon: '/assets/icons/custom-rate.png',
      alt: 'configure your default travel mode',
      title: 'Mileage allowance scales',
      text: 'Choose between the official scales or create your own custom mileage scale.',
    },
    {
      icon: '/assets/markets/uk/icons/compliance.png',
      alt: 'SVG',
      title: 'Exports compliant with current tax rules',
      text: 'You get a complete monthly and/or yearly export — readable, reliable and tax-compliant.',
    },
  ],
  cards: [
    {
      image: '/assets/markets/uk/app/card-settings-vehicles.jpg',
      imageAlt: 'Multi-vehicle management',
      title: 'Multi-vehicle management',
      paragraphsHtml: [
        '🚘 Set up your vehicles and their tax horsepower, and define your default vehicle.',
        '⚡ The specific scale for <strong>electric vehicles</strong> is taken into account.',
      ],
    },
    {
      image: '/assets/markets/uk/app/card-settings-addresses.jpg',
      imageAlt: 'Favourite addresses',
      title: 'Favourite addresses',
      paragraphsHtml: [
        '🏢 Save your favourite addresses so they are automatically used as the start and end points of your regular trips.',
      ],
    },
    {
      image: '/assets/markets/uk/app/card-settings-travel-mode.jpg',
      imageAlt: 'Travel modes',
      title: 'Travel modes',
      paragraphsHtml: [
        'Choose your default travel mode:',
        '⏭️ <strong>Round trip</strong> if you chain appointments one after another<br>✴️ <strong>Star pattern</strong> if you return to your starting point between appointments.',
      ],
    },
  ],
  team: {
    iconAlt: 'fleet management',
    title: 'Fleet management',
    text: "Approval workflows for employees' mileage allowance claims, built for companies.",
    linkLabel: 'Learn more about izika Team',
  },
  cta: {
    title: 'Ready to try? Test it for free, with no obligation to buy',
    ctaLabel: 'Create your account',
  },
};

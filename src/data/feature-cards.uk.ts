import type { ProductFeatureCard } from './feature-cards';

export const featureCardsUk: ReadonlyArray<ProductFeatureCard> = [
  {
    icon: '/assets/markets/uk/icons/calendar-to-trip.png',
    alt: 'Appointments imported from the calendar',
    title: 'Automatic entry',
    text: 'izika automatically imports your appointments from your electronic calendar.',
  },
  {
    icon: '/assets/markets/uk/icons/auto-distance.png',
    alt: 'Automatic distance calculation',
    title: 'Automatic calculations',
    text: 'izika automatically computes the distances and the amount of your mileage allowances without leaving the application.',
  },
  {
    icon: '/assets/markets/uk/icons/compliance.png',
    alt: 'Compliant with tax rules',
    title: 'Tax compliance',
    text: 'izika is approved and validated by chartered accountants and the tax administration.',
  },
  {
    icon: '/assets/icons/team.png',
    alt: 'Vehicle fleet management',
    title: 'Fleet management',
    badge: 'team',
    text: 'izika team is the only tool managing mileage allowance approval workflows for companies.',
  },
];

import type { ProductFeatureCard } from './feature-cards';

export const featureCardsUk: ReadonlyArray<ProductFeatureCard> = [
  {
    icon: '/assets/landing-pages/icon_cal-to-rdv.png',
    alt: 'Appointments imported from the calendar',
    title: 'Automatic entry',
    text: 'izika automatically imports your appointments from your electronic calendar.',
  },
  {
    icon: '/assets/landing-pages/icon_km-auto.png',
    alt: 'Automatic distance calculation',
    title: 'Automatic calculations',
    text: 'izika automatically computes the distances and the amount of your mileage allowances without leaving the application.',
  },
  {
    icon: '/assets/landing-pages/icon_report-conformity.png',
    alt: 'Compliant with tax rules',
    title: 'Tax compliance',
    text: 'izika is approved and validated by chartered accountants and the tax administration.',
  },
  {
    icon: '/assets/landing-pages/icon_team.png',
    alt: 'Vehicle fleet management',
    title: 'Fleet management',
    badge: 'team',
    text: 'izika team is the only tool managing mileage allowance approval workflows for companies.',
  },
];

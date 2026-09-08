import type { PricingPageCopy } from './pricing-page';
import { MARKETS } from '../i18n/markets';
import { localizedPath } from '../i18n/routes';

const pricing = MARKETS.uk.pricing;

// Currency symbol before the amount, English style (€99), unlike the fr page.
export const pricingPageUk: PricingPageCopy = {
  hero: {
    heading: 'Simplify your mileage expenses with the most efficient software on the market.',
  },
  tiers: [
    { name: 'Solo', priceHtml: 'Free' },
    { name: 'Solo', infinity: true, priceHtml: `€${pricing.yearly} /year` },
    { name: 'Team', priceHtml: `€${pricing.monthly} /month /user` },
  ],
  tableAria: {
    infinity: 'unlimited',
    included: 'included',
    notIncluded: 'not included',
    limited: 'limited',
  },
  featureSections: [
    {
      title: 'Driver features',
      rows: [
        { label: 'Unlimited trips', cells: [{ limited: '10 trips/month' }, 'yes', 'yes'] },
        { label: 'Automatic distance calculation', cells: ['yes', 'yes', 'yes'] },
        { label: 'Supporting documents', cells: ['yes', 'yes', 'yes'] },
        { label: 'Monthly provision management', cells: ['yes', 'yes', 'no'] },
        { label: 'Calendar synchronization', cells: ['yes', 'yes', 'yes'] },
        { label: 'Favourite addresses', cells: ['yes', 'yes', 'yes'] },
        { label: 'Multi-vehicle management / electric vehicle scale', cells: ['yes', 'yes', 'yes'] },
        { label: 'Default travel behaviour settings (star pattern/round trip)', cells: ['yes', 'yes', 'yes'] },
      ],
    },
    {
      title: 'Company features',
      rows: [
        { label: 'User management (teams/supervisors)', cells: ['no', 'no', 'yes'] },
        { label: 'Approval workflows (approve, reject, flag errors)', cells: ['no', 'no', 'yes'] },
        { label: 'Complete custom exports (analytical accounting)', cells: ['no', 'no', 'yes'] },
      ],
    },
  ],
  featuresCta: 'Discover all the features',
  faqTitle: 'Frequently asked questions about the subscription',
  subscriptionFaq: [
    {
      question: 'Can I cancel my subscription?',
      answer: `<p>
        Yes, you can cancel your subscription whenever you want, by email or from the application.
        You will keep access to the application until the end of your subscription period.
    </p>`,
    },
    {
      question: 'Do you have a refund policy?',
      answer: `<p>If you are not satisfied — and even though it is not systematic — we can issue a refund.</p>`,
    },
    {
      question: 'How does billing work?',
      answer: `<p>Entrepreneurs choosing izika Solo get one yearly invoice per user;
        the subscription renews automatically and you can cancel the renewal at any
        time.
        Fleet managers who opt for izika Team get a monthly invoice for each user
        and a yearly invoice for the Manager account.
        The subscription can also be cancelled at any time.</p>`,
    },
    {
      question: 'What about security and privacy?',
      answer: `<p>
        IZIKA SAS is a French company founded in 2014; we follow a strict
        <a href="${localizedPath('security', 'uk')}" class="underline">security policy</a> that we apply scrupulously.
    </p>`,
    },
    {
      question: 'Can I manage my mileage allowances for past years?',
      answer: `<p>Yes, by subscribing you get access to the whole current year as well as the 3 previous years,
        provided your calendar allows it (iCloud calendars, for instance, do not).</p>`,
    },
  ],
};

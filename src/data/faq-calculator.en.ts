import { articlePath } from '../i18n';

/**
 * FAQ entries of /en/mileage-allowance-calculator — single source of truth
 * for the visible accordion AND the FAQPage JSON-LD (via faqPageSchema).
 * Facts: gov.uk (AMAP rates & "Increasing mileage rates" policy paper, 2026).
 */
export const faqCalculatorEntries: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'What are HMRC approved mileage rates (AMAP)?',
    answer: `<p>
        Approved Mileage Allowance Payments are the per-mile amounts set by HMRC that an employer
        can pay you, free of income tax and National Insurance, when you use your own vehicle for
        business journeys. For 2026/27 the rates are 55p per mile for the first 10,000 business
        miles in a car or van, 25p per mile above that, 24p per mile for motorcycles and 20p per
        mile for bicycles.
    </p>`,
  },
  {
    question: 'What changed in 2026?',
    answer: `<p>
        The headline car and van rate rose from 45p to 55p per mile for the first 10,000 business
        miles — the first change since 2011/12. It was announced on 21 May 2026 and applies
        retrospectively from 6 April 2026, the start of the 2026/27 tax year. The over-10,000-mile
        rate (25p), motorcycle rate (24p) and bicycle rate (20p) are unchanged.
    </p>`,
  },
  {
    question: 'My employer pays me less than the approved rate — what can I do?',
    answer: `<p>
        You can claim Mileage Allowance Relief on the difference between what your employer paid
        and the approved amount, through Self Assessment or a P87 form. If your employer pays you
        <em>more</em> than the approved amount, the excess is taxable and must be reported.
    </p>`,
  },
  {
    question: 'Do electric and hybrid cars use different rates?',
    answer: `<p>
        No — the approved rates are fuel-agnostic. A fully electric or hybrid car claims the same
        55p then 25p per mile as a petrol or diesel car (2026/27 rates).
    </p>`,
  },
  {
    question: 'How does the 10,000-mile threshold work?',
    answer: `<p>
        The threshold applies per tax year (6 April to 5 April): the first 10,000 business miles in
        your car or van are paid at 55p, and every business mile above 10,000 at 25p. Motorcycles
        and bicycles have a single flat rate, with no threshold.
    </p>`,
  },
  {
    question: 'What about carrying colleagues?',
    answer: `<p>
        An employer can additionally pay 5p per passenger per business mile, tax-free, for carrying
        fellow employees in a car or van when the journey is also a business journey for them.
    </p>`,
  },
  {
    question: 'I am self-employed — do these rates apply to me?',
    answer: `<p>
        Yes, through the simplified expenses flat rates, which mirror the AMAP amounts: 55p per
        mile for the first 10,000 miles and 25p above (cars and goods vehicles, 2026/27), or 24p
        per mile for motorcycles — instead of deducting actual vehicle costs.
    </p>`,
  },
  {
    question: 'What records do I need to keep?',
    answer: `<p>
        For each business journey: the date, the start and end points, the distance and the
        business purpose. That is exactly what izika reconstructs automatically from your online
        calendar — see our article on the
        <a href="${articlePath('hmrc-mileage-rates-2026', 'en')}">2026/27 HMRC mileage rates</a>.
    </p>`,
  },
];

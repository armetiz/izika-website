import { localizedPath } from '../i18n';

/**
 * FAQ entries (English) — single source of truth for the /uk/faq accordion AND
 * the FAQPage JSON-LD (via faqPageSchema). Translation of faq.fr.ts, adapted
 * for the international market: the entry about the 2025 French scale article
 * is omitted (articles are fr-only), the custom-scale answer keeps its
 * international angle.
 */
export const faqEntries: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'How do I report my mileage allowances?',
    answer: `
        <p>
            <strong>Mileage allowances</strong> are the flat-rate reimbursement of the
            costs of using your personal vehicle for business purposes.</p>
        <p>
            Tax rules require you to substantiate your mileage claim by providing the
            purpose of each trip (evidence that the expense serves the business), the
            address and the distance of <strong>every business trip</strong>, so that it
            is deductible and the calculation basis is justified.
        </p>`,
  },
  {
    question: 'How do I connect my calendar to izika?',
    answer: `
        <p>
            You can connect most online calendars to izika: <strong>Google Calendar</strong> is the recommended calendar for its ease of
            use and reliability. izika computes your mileage expenses from Google
            Calendar, Outlook, ICS, Dolibarr, Zimbra, and more.
        </p>
        <p>
            Limitations imposed by Apple restrict the iCloud calendar to 6 months of
            history.
        </p>`,
  },
  {
    question: 'Is my data safe?',
    answer: `<p>
            Absolutely:
            our servers are hosted in France, at Scaleway, with high-grade security
            systems. Moreover, your appointment data stays in your online calendar —
            izika only ever has read access to it.
        </p>
        <p>
            IZIKA SAS is a French company from the Montpellier area. We have been
            processing business data since 2014 for more than 9,000 customers, securely.
            Your data is processed in compliance with the GDPR.
        </p>
        <p>
            <a href="${localizedPath('security', 'uk')}" rel="nofollow">Security policy.</a>
        </p>`,
  },
  {
    question: 'What does the izika subscription include?',
    answer: `<p>Your paid izika subscription guarantees that your data is never
            exploited, because your subscription is our only revenue. By subscribing,
            you get access to the whole current year up to the renewal date, as well as
            the whole previous year. E.g. subscribing on 12 March 2019: access from
            1 January 2018 to 12 March 2020. If you need access to earlier years,
            contact us!
        </p>`,
  },
  {
    question: 'Which mileage allowance scales are available?',
    answer: `<p>
            All the official French mileage scales currently in force are preloaded for
            cars.</p>
            <p>
            Do you ride a motorbike? Do you live outside France? Does your company use
            its own specific mileage allowance scale? You can use our custom mileage
            scale and apply the scale of your choice in all of those cases.
        </p>`,
  },
  {
    question: 'I want to change my email address?',
    answer: `<p>
            If you want to change the email address associated with your account, use
            the chat to contact us 24/7.
        </p>`,
  },
  {
    question: 'How does izika make mileage claims audit-proof?',
    answer: `<p>
            <strong>Purpose of the business trip: </strong>
            Proves that the trip was made in the interest of the business, as required by tax regulations.
        </p>
        <p>
            <strong>Appointment address: </strong>
            Allows a precise computation of the distance travelled, which is the basis for the allowance amount.
        </p>
        <p>
            <strong>Distance travelled for each appointment: </strong>
            Allows the accuracy of the allowance calculation basis to be verified.
        </p>
        <p>
            <strong>Mileage allowance scale applied: </strong>
            Proves, based on the yearly mileage total per vehicle and its tax horsepower, which mileage allowance scale applies.
        </p>`,
  },
];

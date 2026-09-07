import type { Language } from './languages';
import type { CountryId } from './countries';
import { site } from '../config/site';

/**
 * A Market is a country-level deployment of izika.com (legal entity, currency,
 * tax rules, SEO geo signals, third-party integrations), decoupled from the
 * Language its pages are written in. The URL segment scheme is
 * `/{country}-{language}/` with a short alias when a country has a single
 * language: `/fr/` (France, fr), `/en/` (UK for now), future `/ch-fr/`.
 *
 * Visitors never pick a Market: they pick a Country, then a language served
 * there (CountrySwitcher.astro) — the pair resolves to exactly one Market.
 *
 * Adding an id to `marketIds` breaks the build until MARKETS provides its
 * Market — and until every route it should serve exists in routes.ts (route
 * partiality is the per-market feature flag: a missing key hides the page,
 * its chrome links and its sitemap entries).
 */
export const marketIds = ['fr', 'en'] as const; // + 'ch-fr' later

export type MarketId = (typeof marketIds)[number];

export interface Market {
  /** URL segment ('fr', 'ch-fr', 'en'). */
  id: MarketId;
  /** Country this deployment serves — its name is localized by the
   * dictionaries and its region drives the country selector. */
  country: CountryId;
  language: Language;
  /** ISO 4217. */
  currency: string;
  /** BCP 47 tag driving Intl.NumberFormat ('fr-FR'). */
  numberLocale: string;
  /** hreflang value ('fr-FR', 'en-GB'). */
  hreflang: string;
  /** og:locale ('fr_FR'). */
  ogLocale: string;
  /** JSON-LD inLanguage. */
  schemaInLanguage: string;
  /** og:site_name / WebSite name. */
  siteName: string;
  /** JSON-LD WebSite description. */
  websiteDescription: string;
  /** Fallback meta description for pages without a dedicated one. */
  defaultDescription: string;
  /** Main conversion CTA — signup on the app. */
  joinUrl: string;
  /** App login. */
  appUrl: string;
  /** Axeptio cookiesVersion. */
  cookiesVersion: string;
  /** null for markets without a Trustpilot presence. */
  trustpilot: { widgetLocale: string; url: string } | null;
  /** Legal entity + the ©/RCS/address footer line(s), byte-exact. */
  legal: { entity: string; footerLines: readonly string[] };
  /** Feeds webApplicationSchema offers (and later the pricing page). */
  pricing: { yearly: string; monthly: string };
}

export const MARKETS: Record<MarketId, Market> = {
  fr: {
    id: 'fr',
    country: 'FR',
    language: 'fr',
    currency: 'EUR',
    numberLocale: 'fr-FR',
    hreflang: 'fr-FR',
    ogLocale: 'fr_FR',
    schemaInLanguage: 'fr-FR',
    siteName: 'izika : Calcul indemnité kilométrique',
    websiteDescription: 'Gestion automatique des indemnités kilométriques',
    defaultDescription:
      'Obtenez vos indemnités kilométriques automatiques depuis votre agenda en ligne : Google, Outlook, Dolibarr, Zimbra, ICS. Simple, déclaratif, rapide.',
    joinUrl: site.joinUrl,
    appUrl: 'https://go.izika.com',
    cookiesVersion: 'izika-fr-EU',
    trustpilot: {
      widgetLocale: 'fr-FR',
      url: 'https://fr.trustpilot.com/review/izika.com',
    },
    legal: {
      entity: 'izika SAS',
      footerLines: [
        'RCS Montpellier 807746524 - 199 rue Hélène Boucher 34170 Castelnau-le-Lez, France',
      ],
    },
    pricing: { yearly: '99', monthly: '10' },
  },
  // English market, currently targeted at the United Kingdom (decision
  // 2026-09-03): UK tax engine (HMRC AMAP calculator + article), en-GB SEO
  // signals. Pricing stays in EUR for now. The French tax engine, articles
  // and hub remain fr-only, masked by route partiality.
  en: {
    id: 'en',
    country: 'GB',
    language: 'en',
    currency: 'EUR',
    numberLocale: 'en-GB',
    hreflang: 'en-GB',
    ogLocale: 'en_GB',
    schemaInLanguage: 'en-GB',
    siteName: 'izika: Mileage allowance automation',
    websiteDescription: 'Automatic mileage allowance management',
    defaultDescription:
      'Get your mileage allowances automatically from your online calendar: Google, Outlook, Dolibarr, Zimbra, ICS. Simple, declarative, fast.',
    joinUrl: site.joinUrl,
    appUrl: 'https://go.izika.com',
    // TODO: create an English consent version in Axeptio and switch this —
    // until then /en visitors get the French consent UI.
    cookiesVersion: 'izika-fr-EU',
    // Reviews live on fr.trustpilot.com (French) — no Trustpilot blocks on /en.
    trustpilot: null,
    // The legal entity stays the French company; address untranslated.
    legal: {
      entity: 'izika SAS',
      footerLines: [
        'RCS Montpellier 807746524 - 199 rue Hélène Boucher 34170 Castelnau-le-Lez, France',
      ],
    },
    pricing: { yearly: '99', monthly: '10' },
  },
};

export function getMarket(id: MarketId): Market {
  return MARKETS[id];
}

/**
 * Market that `/` redirects to; also drives the hreflang x-default target.
 * Flip to 'en' when the international market becomes the fallback.
 */
export const xDefaultMarket: MarketId = 'fr';

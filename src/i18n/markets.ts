import type { Language } from './languages';
import type { CountryId } from './countries';
import { site } from '../config/site';

/**
 * A Market is a country-level deployment of izika.com (legal entity, currency,
 * tax rules, SEO geo signals, third-party integrations), decoupled from the
 * Language its pages are written in. The URL segment scheme is
 * `/{country}-{language}/` with a short alias when a country has a single
 * language: `/fr/` (France, fr), `/uk/` (United Kingdom, en), `/ch-fr/`
 * (Suisse romande — Switzerland has four languages, so no short alias is
 * possible). The alias is always the COUNTRY, never the language: `/uk` and
 * a future `/us` or `/ie` are three English markets, and only the country
 * segment tells them apart.
 *
 * Visitors never pick a Market: they pick a Country, then a language served
 * there (CountrySwitcher.astro) — the pair resolves to exactly one Market.
 *
 * Adding an id to `marketIds` breaks the build until MARKETS provides its
 * Market — and until every route it should serve exists in routes.ts (route
 * partiality is the per-market feature flag: a missing key hides the page,
 * its chrome links and its sitemap entries).
 */
export const marketIds = ['fr', 'uk', 'ch-fr'] as const;

export type MarketId = (typeof marketIds)[number];

export interface Market {
  /** URL segment ('fr', 'uk', 'ch-fr'). */
  id: MarketId;
  /** Country this deployment serves — its name is localized by the
   * dictionaries and its region drives the country selector. */
  country: CountryId;
  language: Language;
  /** ISO 4217. */
  currency: string;
  /** BCP 47 tag driving Intl.NumberFormat ('fr-FR'). */
  numberLocale: string;
  /**
   * Thousands separator forced over the locale's own, when CLDR and local
   * usage disagree — see makeFormatters in src/lib/format.ts. Undefined on
   * every market where the locale is right.
   */
  numberGroupSeparator?: string;
  /** hreflang value ('fr-FR', 'en-GB'). */
  hreflang: string;
  /** og:locale ('fr_FR'). */
  ogLocale: string;
  /** JSON-LD inLanguage. */
  schemaInLanguage: string;
  /**
   * og:image served on every page of this market — a 1200x630 banner with its
   * marketing baseline baked in, so it is market copy, not a shared logo.
   * Required: a new market cannot compile until it has its own banner
   * (public/assets/social/og-default.<market>.jpg).
   */
  ogImage: string;
  /**
   * og:image of articles that carry no cover of their own. Same rule: the
   * default visual states a tax scheme, so every market owns one
   * (public/assets/social/og-article-default.<market>.jpg).
   */
  articleOgImage: string;
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
  /**
   * null for markets without a Trustpilot presence. `widgetLocale: null`
   * means "rating badges yes, official TrustBox no" — the review texts are
   * French, so the embedded widget would drop French copy into an English
   * page while the 4.9/265 badge stays true in any language.
   */
  trustpilot: { widgetLocale: string | null; url: string } | null;
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
    ogImage: '/assets/social/og-default.fr.jpg',
    articleOgImage: '/assets/social/og-article-default.fr.jpg',
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
  // United Kingdom, served in English (decision 2026-09-03): UK tax engine
  // (HMRC AMAP calculator + article), en-GB SEO signals. Pricing stays in EUR
  // for now. The French tax engine, articles and hub remain fr-only, masked
  // by route partiality. The segment was `/en` until 2026-09-07 and was
  // renamed to `/uk`: a language segment cannot host Ireland, the US or
  // Australia, which are next on the English track.
  uk: {
    id: 'uk',
    country: 'GB',
    language: 'en',
    currency: 'EUR',
    numberLocale: 'en-GB',
    hreflang: 'en-GB',
    ogLocale: 'en_GB',
    schemaInLanguage: 'en-GB',
    ogImage: '/assets/social/og-default.uk.jpg',
    articleOgImage: '/assets/social/og-article-default.uk.jpg',
    siteName: 'izika: Mileage allowance automation',
    websiteDescription: 'Automatic mileage allowance management',
    defaultDescription:
      'Get your mileage allowances automatically from your online calendar: Google, Outlook, Dolibarr, Zimbra, ICS. Simple, declarative, fast.',
    joinUrl: site.joinUrl,
    appUrl: 'https://go.izika.com',
    // TODO: create an English consent version in Axeptio and switch this —
    // until then /uk visitors get the French consent UI.
    cookiesVersion: 'izika-fr-EU',
    // Same business unit as fr, addressed by its locale-neutral URL. The badge
    // must show here: webApplicationSchema emits aggregateRating on /uk either
    // way, and a rating in JSON-LD with nothing visible is the mismatch
    // src/data/reviews.ts warns about. Widget off — the reviews are French.
    trustpilot: {
      widgetLocale: null,
      url: 'https://www.trustpilot.com/review/izika.com',
    },
    // The legal entity stays the French company; address untranslated.
    legal: {
      entity: 'izika SAS',
      footerLines: [
        'RCS Montpellier 807746524 - 199 rue Hélène Boucher 34170 Castelnau-le-Lez, France',
      ],
    },
    pricing: { yearly: '99', monthly: '10' },
  },
  // Swiss market, French-speaking (Suisse romande) — decision 2026-09-07,
  // plans/pays/ch-suisse.md. First market to SHARE a language with another
  // (src/i18n/fr.ts is reused as-is) and first non-euro market: prices,
  // JSON-LD offers and the calculator all format in CHF via numberLocale
  // 'fr-CH' (thousands apostrophe). The Swiss scheme is not a national
  // barème — the rate comes from the employer's règlement de frais approved
  // by its canton — so /ch-fr never claims conformity to an "official
  // barème"; see src/data/mileage-ch.ts.
  'ch-fr': {
    id: 'ch-fr',
    country: 'CH',
    language: 'fr',
    currency: 'CHF',
    numberLocale: 'fr-CH',
    // CLDR renders fr-CH thousands with a narrow no-break space ; l'usage
    // suisse écrit l'apostrophe (CHF 9’750.00), y compris dans les textes
    // fédéraux et sur le certificat de salaire.
    numberGroupSeparator: '’',
    hreflang: 'fr-CH',
    ogLocale: 'fr_CH',
    schemaInLanguage: 'fr-CH',
    ogImage: '/assets/social/og-default.ch-fr.jpg',
    articleOgImage: '/assets/social/og-article-default.ch-fr.jpg',
    siteName: 'izika : indemnités kilométriques en Suisse',
    websiteDescription: 'Gestion automatique des indemnités kilométriques',
    defaultDescription:
      "Obtenez vos indemnités kilométriques automatiquement depuis votre agenda en ligne : Google, Outlook, Dolibarr, Zimbra, ICS. Au taux de votre règlement de frais, CHF 0.75/km inclus.",
    joinUrl: site.joinUrl,
    appUrl: 'https://go.izika.com',
    // Same French consent UI as /fr, and deliberately so: Suisse romande
    // reads French, and an opt-in CMP satisfies a fortiori the Swiss opt-out
    // regime (art. 45c let. b LTC) plus the PFPDT's 06/10/2025 guidance. Only
    // the vendor wording would differ — create 'izika-ch-fr' in the Axeptio
    // console when the Swiss privacy copy is finalised, then flip this line.
    // This is NOT the /uk bug: there the language itself was wrong.
    cookiesVersion: 'izika-fr-EU',
    // Reviews are French and the market is French-speaking: badge AND widget,
    // unlike /uk. Free conversion leverage from day one.
    trustpilot: {
      widgetLocale: 'fr-FR',
      url: 'https://fr.trustpilot.com/review/izika.com',
    },
    // The publishing entity stays the French company; the Swiss customer
    // contracts with it. Terms carry a Swiss-specific section instead
    // (/ch-fr/cgv, article 30).
    legal: {
      entity: 'izika SAS',
      footerLines: [
        'RCS Montpellier 807746524 - 199 rue Hélène Boucher 34170 Castelnau-le-Lez, France',
      ],
    },
    // Swiss price list, not a conversion of the euro one (Stripe plan in CHF).
    pricing: { yearly: '149', monthly: '12' },
  },
};

export function getMarket(id: MarketId): Market {
  return MARKETS[id];
}

/**
 * Market that `/` redirects to; also drives the hreflang x-default target.
 * Flip to 'uk' when the international market becomes the fallback.
 */
export const xDefaultMarket: MarketId = 'fr';

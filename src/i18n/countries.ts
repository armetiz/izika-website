/**
 * Countries izika serves, and the regions the country selector groups them
 * under.
 *
 * A Country is what a visitor picks — the place whose barème, currency and
 * legal entity apply. A Market (src/i18n/markets.ts) is the deployment that
 * serves one country in one language. The two are deliberately distinct: a
 * single country can carry several markets (`/be-fr`, `/be-nl`), and a
 * language can serve several countries (`/en` for the UK, a future `/ie`).
 *
 * Adding an id here breaks the build until a dictionary names it
 * (`dict.countries.<id>`, enforced by the typed lookup in ./index.ts) and
 * until at least one Market points at it — a country without a market would
 * render as an empty row in the selector.
 */
export const countryIds = ['FR', 'GB'] as const; // ISO 3166-1 alpha-2

export type CountryId = (typeof countryIds)[number];

/**
 * Selector groupings, in display order. Regions are only rendered once more
 * than one has countries — with a single region the headings are noise.
 * The roadmap (plans/pays/00-priorisation-marches.md) stays inside these
 * three; add one the day a country falls outside.
 */
export const regionIds = ['europe', 'americas', 'asiaPacific'] as const;

export type RegionId = (typeof regionIds)[number];

export interface Country {
  id: CountryId;
  region: RegionId;
}

export const COUNTRIES: Record<CountryId, Country> = {
  FR: { id: 'FR', region: 'europe' },
  GB: { id: 'GB', region: 'europe' },
};

export function getCountry(id: CountryId): Country {
  return COUNTRIES[id];
}

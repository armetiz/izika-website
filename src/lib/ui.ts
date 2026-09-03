/**
 * Shared UI class strings (same philosophy as cta.ts: plain constants used by
 * .astro pages and React islands alike; keep the strings literal so
 * Tailwind's scanner picks the classes up).
 */

/** Round ✓ / numbered bullet in checklists and step lists. */
export const checkBullet =
  'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white';

/** Small uppercase kicker above a section title. */
export const eyebrow = 'mb-2 text-sm font-bold tracking-wide uppercase';

/** Highlight pill sitting next to a heading (block flow, e.g. in a flex row). */
export const badgePill =
  'mt-1 inline-block shrink-0 rounded-full bg-primary-hover px-2 py-0.5 text-xs font-bold text-white';

/** Highlight pill inside running text (inline flow). */
export const badgePillInline =
  'ml-1 inline-block rounded-full bg-primary-hover px-2 py-0.5 align-middle text-xs font-bold text-white';

/** Data tables (barème/rate tables on the calculator pages). */
export const tableClass = 'w-full border-collapse text-sm';
export const thClass = 'border border-beige-line bg-table-head px-3 py-2 text-left font-bold';
export const tdClass = 'border border-beige-line px-3 py-2 text-muted';

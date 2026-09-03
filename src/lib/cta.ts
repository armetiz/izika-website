/**
 * Shared primary CTA button classes (the theme's .btn-primary equivalents).
 * Plain constants rather than a component because CTAs are rendered by
 * TrackedLink, bare <a> tags and React islands alike. Keep the strings
 * literal so Tailwind's scanner picks the classes up.
 */
export const btnPrimary =
  'btn-3d inline-block min-w-40 rounded-card bg-primary px-4 py-3 text-center font-bold text-white hover:bg-primary-hover';

export const btnPrimarySm =
  'btn-3d inline-block rounded-card bg-primary px-[1.125rem] py-2.5 text-sm font-bold text-white hover:bg-primary-hover';

export const btnPill =
  'btn-3d inline-block min-w-40 rounded-full bg-primary px-4 py-3 text-center font-bold text-white hover:bg-primary-hover';

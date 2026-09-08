/**
 * Sommaire des mentions légales — source unique partagée par /fr et /ch-fr,
 * qui y ajoute une entrée. Le corps vit dans
 * src/components/legal/LegalNoticeBodyFr.astro.
 */
export const legalNoticeTocFr = [
  { href: '#intro', label: '1. Introduction' },
  { href: '#rcp', label: '2. Responsabilité civile professionnelle' },
  { href: '#cnil', label: '3. Déclaration CNIL' },
  { href: '#hosting', label: '4. Hébergement' },
] as const;

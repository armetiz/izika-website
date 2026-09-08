/**
 * Sommaire de la politique de sécurité — source unique partagée par /fr et
 * /ch-fr. Le corps vit dans src/components/legal/SecurityBodyFr.astro.
 */
export const securityTocFr = [
  { href: '#encryption', label: '1. Chiffrement des échanges' },
  { href: '#hosting', label: '2. Infrastructure Française' },
  { href: '#licensing', label: '3. Typologie des licences' },
  { href: '#updates', label: '4. Gestion des mises à jour' },
  { href: '#password-policy', label: '5. Politique de mots de passe et stockage' },
  { href: '#questions', label: '6. Vous avez des questions ?' },
] as const;

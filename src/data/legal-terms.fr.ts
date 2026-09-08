/**
 * Titres des articles des CGV françaises — source unique du sommaire de
 * `LegalShell`, partagée par /fr/cgv et /ch-fr/cgv. Le corps des articles vit
 * dans src/components/legal/TermsBodyFr.astro : les deux marchés servent le
 * MÊME contrat, /ch-fr y ajoutant un article 30 propre au droit suisse plutôt
 * qu'un jeu complet de CGV qui divergerait avec le temps.
 */
export const termsArticleTitlesFr = [
  'PRÉAMBULE',
  'DÉFINITIONS',
  'OBJET',
  'DURÉE',
  'INFORMATION PRÉCONTRACTUELLE',
  'DESCRIPTION DES SERVICES APPLICATIFS',
  'PRÉREQUIS TECHNIQUES',
  'RÉSEAU ET ACCÈS A IZIKA',
  'SÉCURISATION DE l’ACCÈS A IZIKA',
  'PROTECTION DES ÉQUIPEMENTS',
  'QUALITÉ DES SERVICES',
  'SUSPENSION DES SERVICES',
  'MAINTENANCE ET ASSISTANCE',
  'LICENCE D’UTILISATION',
  'DONNÉES PERSONNELLES',
  'SECURITÉ DES DONNÉES',
  'CONDITIONS FINANCIÈRES',
  'PROPRIÉTÉ',
  'DROIT DES TIERS',
  'GARANTIE D’ÉVICTION',
  'RESPONSABILITÉ',
  'FORCE MAJEURE',
  'ASSURANCE',
  'RÉSILIATION',
  'REVERSIBILITÉ',
  'CONFIDENTIALITÉ',
  'DONNÉES NOMINATIVES – DROIT D’ACCÈS',
  'DIVERS',
  'DROIT APPLICABLE – ARBITRAGE – JURIDICTION COMPÉTENTE',
] as const;

/**
 * Sommaire de la charte de confidentialité — source unique partagée par /fr
 * et /ch-fr, qui y ajoute une entrée. Le corps vit dans
 * src/components/legal/PrivacyBodyFr.astro.
 */
export const privacyTocFr = [
  { href: '#intro', label: '1. Définition et nature des données à caractère personnel' },
  { href: '#rcp', label: '2. Objet de la présente charte de confidentialité' },
  { href: '#cnil', label: '3. Identité du responsable de la collecte de données' },
  { href: '#collecte', label: '4. Collecte des données à caractère personnel' },
  { href: '#destinataires', label: '5. Destinataires des données collectées' },
  { href: '#conservation', label: '6. Durée de conservation des données à caractère personnel' },
  { href: '#identite', label: '7. Concernant les pièces d’identité' },
  { href: '#cartes', label: '8. Concernant les données relatives aux cartes bancaires' },
  { href: '#statistiques', label: '9. Concernant les statistiques de mesure d’audience' },
  { href: '#securite', label: '10. Sécurité' },
  { href: '#cookies', label: '11. Cookies' },
  { href: '#consentement', label: '12. Consentement' },
  { href: '#donnees', label: '13. Accès à vos données à caractère personnel' },
  { href: '#modifications', label: '14. Modifications' },
  { href: '#date', label: '15. Entrée en vigueur' },
] as const;

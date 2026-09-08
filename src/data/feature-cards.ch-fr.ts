import type { ProductFeatureCard } from './feature-cards';

/**
 * Les quatre cartes produit de /ch-fr (accueil + tarifs). Trois sont
 * identiques au marché français ; la troisième change de sens : « conformité
 * fiscale » n'a pas de référent en Suisse, où aucun barème national n'est
 * opposable. Elle devient l'argument du taux libre.
 */
export const featureCardsChFr: ReadonlyArray<ProductFeatureCard> = [
  {
    icon: '/assets/landing-pages/icon_cal-to-rdv.png',
    alt: "Import des RDV depuis l'agenda",
    title: 'Saisie automatique',
    text: 'izika importe automatiquement vos rendez-vous depuis votre agenda électronique.',
  },
  {
    icon: '/assets/landing-pages/icon_km-auto.png',
    alt: 'Calculs des distances automatiques',
    title: 'Calculs automatiques',
    text: "izika calcule automatiquement les distances et le montant de vos indemnités sans quitter l'application.",
  },
  {
    icon: '/assets/landing-pages/icon_bareme-personnalise.png',
    alt: 'Taux personnalisé',
    title: 'Votre taux, pas le nôtre',
    text: "CHF 0.75, CHF 0.70 ou le taux de votre règlement de frais : izika applique celui que votre canton a approuvé.",
  },
  {
    icon: '/assets/landing-pages/icon_team.png',
    alt: 'Gestion des flottes de véhicules',
    title: 'Gestion de flottes',
    badge: 'team',
    text: "izika Team centralise les demandes de remboursement et leur approbation, du collaborateur à la comptabilité.",
  },
];

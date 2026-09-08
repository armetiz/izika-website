import type { ProductFeatureCard } from './feature-cards';

export const featureCardsFr: ReadonlyArray<ProductFeatureCard> = [
  {
    icon: '/assets/icons/calendar-to-trip.fr.png',
    alt: "Import des RDV depuis l'agenda",
    title: 'Saisie automatique',
    text: 'izika importe automatiquement vos rendez-vous depuis votre agenda électronique.',
  },
  {
    icon: '/assets/icons/auto-distance.fr.png',
    alt: 'Calculs des distances automatiques',
    title: 'Calculs automatiques',
    text: "izika calcule automatiquement les distances et le montant de vos IK sans quitter l'application.",
  },
  {
    icon: '/assets/icons/compliance.fr.png',
    alt: 'Conforme aux règles fiscales',
    title: 'Conformité fiscale',
    text: "izika est approuvé et validé par les experts-comptables et l'administration.",
  },
  {
    icon: '/assets/icons/team.png',
    alt: 'Gestion des flottes de véhicules',
    title: 'Gestion de flottes',
    badge: 'team',
    text: "izika team est le seul outil de gestion des flux d'approbation d'IK pour les entreprises.",
  },
];

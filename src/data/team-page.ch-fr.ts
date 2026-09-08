import type { ProductLandingCopy } from './landing-page';
import { teamPageFr } from './team-page.fr';
import { complianceSectionChFr } from './compliance-section.ch-fr';
import { TAUX_ACTUEL } from './mileage-ch';
import { chfPerKm } from '../lib/format';
import { marketAssets } from '../lib/assets';

/**
 * Landing /ch-fr/team. Dérivée de team-page.fr.ts pour la mécanique produit,
 * réécrite sur l'axe qui n'existe dans aucun autre marché d'izika :
 * **l'art. 327a du Code des obligations**.
 *
 * En France, l'indemnité kilométrique est une tolérance fiscale : l'employeur
 * *peut* rembourser sans charges jusqu'au barème. En Suisse, l'art. 327a CO
 * fait du remboursement des frais imposés par l'exécution du travail une
 * **obligation de droit du travail**, et son al. 3 frappe de nullité tout
 * accord contraire. L'argument de vente change donc de nature : on ne vend
 * plus seulement de l'optimisation à l'employeur, on vend la **preuve** qu'il
 * s'acquitte d'une obligation légale — et au salarié, la garantie d'un droit.
 *
 * La section détaillée sur l'art. 327a vit dans la page
 * src/pages/ch-fr/team.astro (bloc éditorial hors du shell ProductLanding) ;
 * ce module en porte les accroches.
 */
export const teamPageChFr: ProductLandingCopy = marketAssets('ch-fr', {
  ...teamPageFr,
  hero: {
    ...teamPageFr.hero,
    words: ['entreprises', 'associations', 'administrations'],
    leadChecklist: [
      "Le remboursement des frais professionnels est une obligation légale (art. 327a CO) : izika en produit la preuve, déplacement par déplacement",
      "Calcul automatique des kilomètres depuis l'agenda des collaborateurs terrain",
      "Des flux d'approbation transparents et efficaces pour les gestionnaires",
      'Le taux de votre règlement de frais appliqué uniformément à toute la structure',
    ],
  },
  highlights: [
    {
      icon: '/assets/icons/compliance.ch-fr.png',
      text: 'Preuve du respect de<br /> l’art. 327a CO',
    },
    {
      icon: '/assets/icons/calendar-to-trip.ch-fr.png',
      text: 'Génération en ligne des relevés de déplacements',
    },
    {
      icon: '/assets/icons/approval.ch-fr.png',
      text: "Flux d'approbation des demandes de remboursement",
    },
    {
      icon: '/assets/icons/teams-folders.png',
      text: 'Ventilation par équipe et par dossier',
    },
    {
      icon: '/assets/icons/security.ch-fr.png',
      text: 'Sécurité, confidentialité<br /> hébergement européen',
    },
  ],
  simplify: {
    ...teamPageFr.simplify,
    eyebrow: 'Les relevés de vos collaborateurs en 2 min.',
    title: 'Simplifiez le calcul des frais kilométriques de vos collaborateurs',
    items: [
      'Calcul instantané des distances et du montant de chaque trajet',
      'Synchronisé avec les agendas en ligne (Outlook, Google...)',
      'Paramétrage des déplacements en tournée ou en étoile.',
      "Possibilité d'attacher des justificatifs, quittances, rapports de visites",
    ],
  },
  speedUp: {
    ...teamPageFr.speedUp,
    eyebrow: 'Centralisation et automatisation',
    title: 'Accélérez le traitement des demandes de remboursement',
    items: [
      'Organisation par équipe pour chaque gestionnaire',
      'Approbation et rejet en un clic, pointage des trajets à vérifier',
      'Consolidation analytique par collaborateur et par client ou dossier',
      `Un taux unique pour toute la structure, celui de votre règlement de frais — ${chfPerKm(TAUX_ACTUEL)} ou un autre`,
    ],
  },
  compliance: complianceSectionChFr,
  closing: {
    title: 'Voulez-vous tester le meilleur outil de gestion des frais kilométriques ?',
    text: 'Essayez gratuitement toutes les fonctionnalités de izika Team pour votre organisation',
    ctaLabel: 'Tester izika pendant 2 mois',
  },
});

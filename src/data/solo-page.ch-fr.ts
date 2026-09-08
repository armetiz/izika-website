import type { ProductLandingCopy } from './landing-page';
import { soloPageFr } from './solo-page.fr';
import { complianceSectionChFr } from './compliance-section.ch-fr';
import { TAUX_ACTUEL, TAUX_ANTERIEUR } from './mileage-ch';
import { chfPerKm } from '../lib/format';

/**
 * Landing /ch-fr/solo. Dérivée de solo-page.fr.ts : les captures, les
 * bénéfices produit et les avis clients sont les mêmes — ce sont les mêmes
 * écrans et les mêmes clients. Ce qui change relève du pays.
 *
 * Trois réécritures :
 * - « Relevés conformes aux normes fiscales » : il n'existe pas de norme
 *   fiscale unique en Suisse, la référence est le règlement de frais ;
 * - « créé et hébergé en France » : l'argument souverain qui porte en Suisse
 *   est l'absence de cloud américain, pas le drapeau français ;
 * - « izika gère aussi les véhicules électriques » : il n'y a pas de barème
 *   électrique suisse, le forfait est indifférent à la motorisation — la
 *   promesse serait vide.
 *
 * Les témoignages restent ceux de clients réels (français) : en inventer des
 * suisses serait un faux, et les avis Trustpilot sont communs aux marchés.
 */
export const soloPageChFr: ProductLandingCopy = {
  ...soloPageFr,
  hero: {
    ...soloPageFr.hero,
    lead: 'Votre temps est précieux : obtenez votre relevé de frais kilométriques en 10 minutes, au taux de votre règlement de frais.',
  },
  highlights: [
    {
      icon: '/assets/landing-pages/icon_cal-to-rdv.png',
      text: 'Import des rendez-vous depuis votre agenda',
    },
    {
      icon: '/assets/landing-pages/icon_km-auto.png',
      text: 'Calcul automatique des distances',
    },
    {
      icon: '/assets/landing-pages/icon_bareme-personnalise.png',
      text: `Taux libre :<br /> ${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou le vôtre`,
    },
    {
      icon: '/assets/landing-pages/team/icon_security.png',
      text: 'Sécurité, confidentialité<br /> hébergement européen, hors cloud américain',
    },
  ],
  simplify: {
    ...soloPageFr.simplify,
    eyebrow: 'Votre relevé de frais en 2 min.',
    title: 'Simplifiez le calcul de vos frais kilométriques',
    items: [
      'Calcul instantané des distances et du montant de chaque trajet',
      'Synchronisé avec les agendas en ligne (Outlook, Google...)',
      "Possibilité d'attacher des justificatifs, quittances, rapports de visites",
      'Éditez en un clic votre relevé prêt à être transmis à votre fiduciaire ou à votre service comptable.',
    ],
  },
  speedUp: {
    ...soloPageFr.speedUp,
    items: [
      'Créez vos adresses favorites (domicile, bureau...) pour accélérer la saisie',
      'Choisissez votre mode de déplacement par défaut (en étoile ou en tournée)',
      `Enregistrez le taux de votre règlement de frais — ${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou tout autre taux approuvé`,
      'Déclarez vos provisions mensuelles, izika calcule le solde à la fin de votre exercice',
    ],
  },
  compliance: complianceSectionChFr,
  closing: {
    ...soloPageFr.closing,
    title: 'Voulez-vous tester le meilleur outil de calcul de frais kilométriques ?',
  },
};

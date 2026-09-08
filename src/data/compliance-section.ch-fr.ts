import type { ComplianceCopy } from './landing-page';

/**
 * Section « Conformité, sécurité, fiabilité » — identique sur /ch-fr/solo et
 * /ch-fr/team, pendant suisse de compliance-section.fr.ts.
 *
 * Réécriture complète et non traduction : chacun des quatre piliers français
 * est faux ou hors sujet en Suisse.
 * - « Conformité avec les règles fiscales » → il n'y a pas de barème national
 *   suisse ; la référence est le règlement de frais approuvé par le canton.
 * - « experts-comptables » → l'interlocuteur romand est la fiduciaire.
 * - « RGPD » → le RGPD s'applique, mais la nLPD aussi (art. 3 nLPD, effets en
 *   Suisse) : citer la seule norme européenne sonnerait étranger.
 * - « Support en France » → vrai, mais répond à côté : la question posée en
 *   Suisse est celle de la souveraineté des données, pas du drapeau.
 */
export const complianceSectionChFr: ComplianceCopy = {
  eyebrow: 'Conformité, sécurité, fiabilité',
  title:
    'Des relevés alignés sur votre règlement de frais, acceptés par votre fiduciaire',
  items: [
    "Relevés conformes au règlement de frais de votre entreprise, au taux qu'il fixe — CHF 0.75, CHF 0.70 ou tout autre taux approuvé par votre canton",
    'Cartographie ultra fiable pour un calcul des distances précis et sans erreurs',
    "Chaque déplacement justifié — date, motif professionnel, trajet, distance : ce que réclame l'administration fiscale en cas de contrôle",
    'Conformité nLPD et RGPD, chiffrement avancé, hébergement européen hors cloud américain',
    'Support en français, direct et non sous-traité',
  ],
  imageAlt: 'izika, relevés de frais kilométriques prêts pour votre fiduciaire',
};

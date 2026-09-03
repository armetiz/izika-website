/**
 * Barème kilométrique fiscal français — données + calcul purs, source de
 * vérité unique pour le simulateur (island React), les tables HTML
 * pré-rendues au build et l'exemple de calcul de la page calculateur.
 *
 * Ce module est PAYS-spécifique (barème CGI) : un barème suisse serait un
 * module de données distinct, pas une abstraction commune. Aucun formatage ni
 * copy générée ici — formatters dans src/lib/format.ts (pilotés par le
 * Market), libellés dans src/data/bareme-ik.labels.fr.ts. Les labels
 * réglementaires (« 3 CV et moins ») restent : indissociables du barème.
 *
 * Montant d'une tranche : d × coef + fixe (d = distance annuelle en km).
 * Véhicule électrique : montant final majoré de 20 % (art. 6 B ann. IV CGI).
 *
 * Les barèmes 2023, 2024 et 2025 sont identiques (dernière revalorisation :
 * barème 2023). Le sélecteur d'année reste exposé pour que l'ajout d'un
 * barème revalorisé se réduise à une entrée dans BAREMES.
 */

export type Categorie = 'voiture' | 'moto';
export type Motorisation = 'thermique' | 'electrique';
export type Periode = 'semaine' | 'mois' | 'annee';

export interface Tranche {
  /** Borne supérieure incluse, en km/an. `null` = dernière tranche. */
  maxKm: number | null;
  coef: number;
  fixe: number;
}

export interface ClassePuissance {
  key: string;
  label: string;
  /** Au moins une tranche ; la dernière a maxKm === null. */
  tranches: readonly [Tranche, ...Tranche[]];
}

export interface Bareme {
  label: string;
  classes: readonly ClassePuissance[];
}

export const MAJORATION_ELECTRIQUE = 0.2;

const BAREME_VOITURE: Bareme = {
  label: 'Voiture',
  classes: [
    {
      key: '3',
      label: '3 CV et moins',
      tranches: [
        { maxKm: 5000, coef: 0.529, fixe: 0 },
        { maxKm: 20000, coef: 0.316, fixe: 1065 },
        { maxKm: null, coef: 0.37, fixe: 0 },
      ],
    },
    {
      key: '4',
      label: '4 CV',
      tranches: [
        { maxKm: 5000, coef: 0.606, fixe: 0 },
        { maxKm: 20000, coef: 0.34, fixe: 1330 },
        { maxKm: null, coef: 0.407, fixe: 0 },
      ],
    },
    {
      key: '5',
      label: '5 CV',
      tranches: [
        { maxKm: 5000, coef: 0.636, fixe: 0 },
        { maxKm: 20000, coef: 0.357, fixe: 1395 },
        { maxKm: null, coef: 0.427, fixe: 0 },
      ],
    },
    {
      key: '6',
      label: '6 CV',
      tranches: [
        { maxKm: 5000, coef: 0.665, fixe: 0 },
        { maxKm: 20000, coef: 0.374, fixe: 1457 },
        { maxKm: null, coef: 0.447, fixe: 0 },
      ],
    },
    {
      key: '7',
      label: '7 CV et plus',
      tranches: [
        { maxKm: 5000, coef: 0.697, fixe: 0 },
        { maxKm: 20000, coef: 0.394, fixe: 1515 },
        { maxKm: null, coef: 0.47, fixe: 0 },
      ],
    },
  ],
};

// Barème officiel des deux-roues > 50 cm³ : tranches 3 000 / 6 000 km et
// classes de puissance propres (l'ancienne SPA réutilisait à tort les
// tranches voiture).
const BAREME_MOTO: Bareme = {
  label: 'Moto (plus de 50 cm³)',
  classes: [
    {
      key: '1-2',
      label: '1 ou 2 CV',
      tranches: [
        { maxKm: 3000, coef: 0.395, fixe: 0 },
        { maxKm: 6000, coef: 0.099, fixe: 891 },
        { maxKm: null, coef: 0.248, fixe: 0 },
      ],
    },
    {
      key: '3-5',
      label: '3, 4 ou 5 CV',
      tranches: [
        { maxKm: 3000, coef: 0.468, fixe: 0 },
        { maxKm: 6000, coef: 0.082, fixe: 1158 },
        { maxKm: null, coef: 0.275, fixe: 0 },
      ],
    },
    {
      key: '6+',
      label: 'Plus de 5 CV',
      tranches: [
        { maxKm: 3000, coef: 0.606, fixe: 0 },
        { maxKm: 6000, coef: 0.079, fixe: 1583 },
        { maxKm: null, coef: 0.343, fixe: 0 },
      ],
    },
  ],
};

export const ANNEES = ['2025', '2024', '2023'] as const;
export type Annee = (typeof ANNEES)[number];

export const BAREMES: Record<Annee, Record<Categorie, Bareme>> = {
  '2025': { voiture: BAREME_VOITURE, moto: BAREME_MOTO },
  '2024': { voiture: BAREME_VOITURE, moto: BAREME_MOTO },
  '2023': { voiture: BAREME_VOITURE, moto: BAREME_MOTO },
};

export const PERIODES: Record<Periode, { facteur: number }> = {
  semaine: { facteur: 52 },
  mois: { facteur: 12 },
  annee: { facteur: 1 },
};

export interface ResultatIK {
  kmAnnuels: number;
  trancheIndex: number;
  tranche: Tranche;
  /** Montant issu du barème, avant majoration électrique. */
  montantBase: number;
  /** 0 pour un véhicule thermique. */
  majoration: number;
  montant: number;
}

export function computeIK(input: {
  categorie: Categorie;
  motorisation: Motorisation;
  annee: Annee;
  puissance: string;
  km: number;
  periode: Periode;
}): ResultatIK | null {
  const bareme = BAREMES[input.annee]?.[input.categorie];
  const classe = bareme?.classes.find((c) => c.key === input.puissance);
  if (!classe || !(input.km > 0)) return null;

  const kmAnnuels = input.km * PERIODES[input.periode].facteur;
  const trancheIndex = classe.tranches.findIndex(
    (t) => t.maxKm === null || kmAnnuels <= t.maxKm
  );
  const tranche = classe.tranches[trancheIndex];
  const montantBase = kmAnnuels * tranche.coef + tranche.fixe;
  const majoration = input.motorisation === 'electrique' ? montantBase * MAJORATION_ELECTRIQUE : 0;

  return { kmAnnuels, trancheIndex, tranche, montantBase, majoration, montant: montantBase + majoration };
}

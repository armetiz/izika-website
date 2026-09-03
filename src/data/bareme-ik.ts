/**
 * Barème kilométrique fiscal français — source de vérité unique pour le
 * simulateur (island React), les tables HTML pré-rendues au build et
 * l'exemple de calcul de la page calculateur.
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
  tranches: readonly [Tranche, Tranche, Tranche];
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

export const PERIODES: Record<Periode, { label: string; parLabel: string; facteur: number }> = {
  semaine: { label: 'Semaine (× 52)', parLabel: 'par semaine', facteur: 52 },
  mois: { label: 'Mois (× 12)', parLabel: 'par mois', facteur: 12 },
  annee: { label: 'Année', parLabel: 'par an', facteur: 1 },
};

export interface ResultatIK {
  kmAnnuels: number;
  trancheIndex: 0 | 1 | 2;
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
  ) as 0 | 1 | 2;
  const tranche = classe.tranches[trancheIndex];
  const montantBase = kmAnnuels * tranche.coef + tranche.fixe;
  const majoration = input.motorisation === 'electrique' ? montantBase * MAJORATION_ELECTRIQUE : 0;

  return { kmAnnuels, trancheIndex, tranche, montantBase, majoration, montant: montantBase + majoration };
}

const nfEuros = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const nfNombre = new Intl.NumberFormat('fr-FR');
const nfCoef = new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 3, maximumFractionDigits: 3 });

export const formatEuros = (n: number) => nfEuros.format(n);
export const formatNombre = (n: number) => nfNombre.format(n);
export const formatCoef = (n: number) => nfCoef.format(n);

/** Libellé d'une tranche, ex. « De 5 001 à 20 000 km » / « Au-delà de 20 000 km ». */
export function labelTranche(classe: ClassePuissance, index: number): string {
  const tranche = classe.tranches[index];
  if (index === 0) return `Jusqu'à ${formatNombre(tranche.maxKm!)} km`;
  if (tranche.maxKm === null) return `Au-delà de ${formatNombre(classe.tranches[index - 1].maxKm!)} km`;
  return `De ${formatNombre(classe.tranches[index - 1].maxKm! + 1)} à ${formatNombre(tranche.maxKm)} km`;
}

/** Formule d'une tranche, ex. « d × 0,529 » ou « (d × 0,316) + 1 065 € ». */
export function formuleTranche(tranche: Tranche): string {
  const produit = `d × ${nfCoef.format(tranche.coef)}`;
  return tranche.fixe > 0 ? `(${produit}) + ${formatNombre(tranche.fixe)} €` : produit;
}

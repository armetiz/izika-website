import type { ClassePuissance, Periode, Tranche } from './bareme-ik';
import type { Formatters } from '../lib/format';

/**
 * Copy française du barème kilométrique — libellés générés à partir des
 * données de src/data/bareme-ik.ts, formatés par les formatters du Market
 * (src/lib/format.ts). Copy du marché fr uniquement, comme le simulateur.
 */

export const PERIODE_LABELS: Record<Periode, { label: string; parLabel: string }> = {
  semaine: { label: 'Semaine (× 52)', parLabel: 'par semaine' },
  mois: { label: 'Mois (× 12)', parLabel: 'par mois' },
  annee: { label: 'Année', parLabel: 'par an' },
};

/** Libellé d'une tranche, ex. « De 5 001 à 20 000 km » / « Au-delà de 20 000 km ». */
export function labelTranche(fmt: Formatters, classe: ClassePuissance, index: number): string {
  const tranche = classe.tranches[index];
  if (index === 0) return `Jusqu'à ${fmt.formatNumber(tranche.maxKm!)} km`;
  if (tranche.maxKm === null)
    return `Au-delà de ${fmt.formatNumber(classe.tranches[index - 1].maxKm!)} km`;
  return `De ${fmt.formatNumber(classe.tranches[index - 1].maxKm! + 1)} à ${fmt.formatNumber(tranche.maxKm)} km`;
}

/** Formule d'une tranche, ex. « d × 0,529 » ou « (d × 0,316) + 1 065 € ». */
export function formuleTranche(fmt: Formatters, tranche: Tranche): string {
  const produit = `d × ${fmt.formatCoef(tranche.coef)}`;
  return tranche.fixe > 0 ? `(${produit}) + ${fmt.formatNumber(tranche.fixe)} €` : produit;
}

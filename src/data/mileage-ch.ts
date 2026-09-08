/**
 * Indemnité kilométrique suisse — données + calcul purs, source de vérité
 * unique pour le calculateur (island React), les tables pré-rendues au build
 * et l'exemple de calcul de /ch-fr/calculateur-indemnites-kilometriques.
 *
 * Module PAYS-spécifique, délibérément distinct du barème français
 * (src/data/bareme-ik.ts) et du schéma HMRC (src/data/mileage-uk.ts) : les
 * trois n'ont pas la même forme. La Suisse est la plus simple — un forfait
 * plat par kilomètre, `montant = d × taux`, sans tranche, sans puissance
 * fiscale et sans majoration électrique.
 *
 * ⚠ Différence de NATURE, pas seulement de chiffres : il n'existe pas de
 * barème national opposable en Suisse. Le taux figure au **règlement de
 * frais** (Spesenreglement) que l'entreprise fait approuver par
 * l'administration fiscale de son canton, sur la base du règlement type de la
 * Conférence suisse des impôts (CSI). CHF 0.75 est le **maximum admis
 * fiscalement** par l'Ordonnance sur les frais professionnels, pas un montant
 * dû : une entreprise peut rembourser moins. C'est pour cela que le taux
 * libre existe et que /ch-fr ne promet jamais une « conformité au barème
 * officiel » — cette promesse n'aurait pas d'objet.
 *
 * Aucun formatage ici — formatters dans src/lib/format.ts (pilotés par le
 * Market), plus `chfPerKm` pour l'écriture suisse du taux (CHF 0.75, point
 * décimal).
 */

export type Periode = 'semaine' | 'mois' | 'annee';

/** Clé du taux appliqué. `libre` = taux saisi par l'utilisateur. */
export type TauxKey = 'actuel' | 'anterieur' | 'libre';

export interface Taux {
  key: TauxKey;
  /** CHF par kilomètre. `null` pour le taux libre (saisi à l'exécution). */
  chfParKm: number | null;
  /** Période pendant laquelle ce taux est le maximum admis (affichée telle quelle). */
  depuis: string;
}

/**
 * Maximum admis fiscalement depuis le 1ᵉʳ janvier 2026 (Ordonnance du DFF sur
 * la déduction des frais professionnels, annexe). Nouveauté 2026 : ce montant
 * est désormais indexé sur le prix au kilomètre publié chaque année par le
 * TCS, donc susceptible de bouger sans révision législative — d'où une
 * constante et non un littéral disséminé dans la copy.
 */
export const TAUX_ACTUEL = 0.75;

/**
 * Maximum admis jusqu'au 31 décembre 2025 — et taux encore inscrit dans
 * beaucoup de règlements de frais approuvés avant 2026. Un salarié remboursé
 * à 0.70 n'est donc pas dans l'erreur : il applique un règlement en vigueur.
 * Ce n'est pas un historique décoratif, c'est un cas courant, d'où sa place
 * dans le sélecteur à parité avec le taux actuel.
 */
export const TAUX_ANTERIEUR = 0.7;

export const TAUX: Record<TauxKey, Taux> = {
  actuel: { key: 'actuel', chfParKm: TAUX_ACTUEL, depuis: 'depuis le 1ᵉʳ janvier 2026' },
  anterieur: { key: 'anterieur', chfParKm: TAUX_ANTERIEUR, depuis: "jusqu'au 31 décembre 2025" },
  libre: { key: 'libre', chfParKm: null, depuis: 'règlement de frais de votre entreprise' },
};

export const PERIODES: Record<Periode, { facteur: number }> = {
  semaine: { facteur: 52 },
  mois: { facteur: 12 },
  annee: { facteur: 1 },
};

export interface ResultatCH {
  kmAnnuels: number;
  /** Taux effectivement appliqué, en CHF/km. */
  taux: number;
  montant: number;
  /**
   * Montant qu'aurait donné l'autre taux recommandé (0.70 si l'on calcule à
   * 0.75, et inversement), `null` pour un taux libre. Sert à chiffrer ce que
   * coûte un règlement de frais resté à l'ancien taux.
   */
  montantComparaison: number | null;
}

export function computeCH(input: {
  /** Taux appliqué, en CHF/km — déjà résolu par l'appelant. */
  taux: number;
  km: number;
  periode: Periode;
  /** Taux à comparer ; omis pour un taux libre. */
  tauxComparaison?: number;
}): ResultatCH | null {
  if (!(input.km > 0) || !(input.taux > 0)) return null;

  const kmAnnuels = input.km * PERIODES[input.periode].facteur;

  return {
    kmAnnuels,
    taux: input.taux,
    montant: kmAnnuels * input.taux,
    montantComparaison:
      input.tauxComparaison !== undefined ? kmAnnuels * input.tauxComparaison : null,
  };
}

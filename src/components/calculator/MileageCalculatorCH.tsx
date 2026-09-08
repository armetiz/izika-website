import { useMemo, useState } from 'react';
import {
  PERIODES,
  TAUX,
  TAUX_ACTUEL,
  TAUX_ANTERIEUR,
  computeCH,
  type Periode,
  type TauxKey,
} from '../../data/mileage-ch';
import { chfPerKm, makeFormatters } from '../../lib/format';
import { badgePill } from '../../lib/ui';
import {
  SegmentedRadio,
  StepBadge,
  amountBoxClass,
  ctaFooterClass,
  ctaLinkClass,
  ctaPayload,
  emptyStateClass,
  formClass,
  inputClass,
  kickerClass,
  resultPanelClass,
  stepListClass,
} from './shared';

/**
 * Calculateur d'indemnités kilométriques suisse. Tout le calcul vit dans
 * src/data/mileage-ch.ts, partagé avec les tables pré-rendues de la page.
 * Composant PAYS-spécifique (copy française inline, forfait plat suisse) : il
 * n'existe que sous routes.calculator du marché ch-fr ; le formatage vient du
 * Market via les props sérialisables numberLocale/currency.
 *
 * La différence de fond avec SimulateurIK : ici le taux est un **choix**, pas
 * une donnée réglementaire. 0.75 est le maximum admis fiscalement, pas un
 * montant dû. Trois options exposées à parité — 0.75, 0.70 (encore inscrit
 * dans de nombreux règlements approuvés avant 2026) et un taux libre, qui est
 * le cas réel de toute entreprise dont le règlement dit autre chose. Le
 * cadrage est dans l'interface, pas seulement dans le texte de la page.
 */

interface Props {
  numberLocale: string;
  currency: string;
  /** Séparateur de milliers du marché (l'apostrophe suisse), cf. makeFormatters. */
  groupSeparator?: string;
  /** CTA de conversion du marché (getMarket(...).joinUrl). */
  joinUrl: string;
}

const PERIODE_LABELS: Record<Periode, { label: string; parLabel: string }> = {
  semaine: { label: 'Semaine (× 52)', parLabel: 'par semaine' },
  mois: { label: 'Mois (× 12)', parLabel: 'par mois' },
  annee: { label: 'Année', parLabel: 'par an' },
};

export default function MileageCalculatorCH({
  numberLocale,
  currency,
  groupSeparator,
  joinUrl,
}: Props) {
  const { formatCurrency, formatNumber } = useMemo(
    () => makeFormatters({ numberLocale, currency, groupSeparator }),
    [numberLocale, currency, groupSeparator]
  );
  const [tauxKey, setTauxKey] = useState<TauxKey>('actuel');
  const [tauxLibre, setTauxLibre] = useState('');
  const [kmSaisis, setKmSaisis] = useState('');
  const [periode, setPeriode] = useState<Periode>('annee');

  const km = Number.parseFloat(kmSaisis.replace(',', '.'));
  const tauxSaisi = Number.parseFloat(tauxLibre.replace(',', '.'));
  const taux =
    tauxKey === 'libre'
      ? Number.isFinite(tauxSaisi)
        ? tauxSaisi
        : Number.NaN
      : TAUX[tauxKey].chfParKm!;
  // Comparer 0.75 à 0.70 chiffre ce que coûte un règlement resté à l'ancien
  // plafond ; comparer un taux libre à un plafond n'aurait pas de sens.
  const tauxComparaison =
    tauxKey === 'actuel' ? TAUX_ANTERIEUR : tauxKey === 'anterieur' ? TAUX_ACTUEL : undefined;

  const resultat = useMemo(
    () =>
      Number.isFinite(km) && km > 0 && Number.isFinite(taux) && taux > 0
        ? computeCH({ taux, km, periode, tauxComparaison })
        : null,
    [km, taux, periode, tauxComparaison]
  );

  const ecart = resultat?.montantComparaison != null ? resultat.montant - resultat.montantComparaison : null;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Formulaire */}
      <form
        className={formClass}
        onSubmit={(e) => e.preventDefault()}
        aria-label="Paramètres du calcul d'indemnités kilométriques"
      >
        <p className={kickerClass}>Votre situation</p>

        <SegmentedRadio
          name="taux"
          legend="Taux appliqué par votre règlement de frais"
          value={tauxKey}
          columns={3}
          options={[
            { value: 'actuel', label: chfPerKm(TAUX_ACTUEL) },
            { value: 'anterieur', label: chfPerKm(TAUX_ANTERIEUR) },
            { value: 'libre', label: 'Autre taux' },
          ]}
          onChange={setTauxKey}
        />

        <p className="-mt-2 text-sm text-muted">
          {tauxKey === 'actuel' && (
            <>
              Maximum admis fiscalement {TAUX.actuel.depuis}. Votre employeur peut l'appliquer{' '}
              <strong className="text-ink">sans faire réapprouver</strong> son règlement de frais.
            </>
          )}
          {tauxKey === 'anterieur' && (
            <>
              Maximum admis {TAUX.anterieur.depuis}, et taux encore inscrit dans beaucoup de
              règlements de frais : si c'est le vôtre, vous n'êtes pas dans l'erreur.
            </>
          )}
          {tauxKey === 'libre' && (
            <>
              Le taux qui vous concerne est celui de votre règlement de frais, quel qu'il soit :
              0.75 est un plafond fiscal, pas un montant dû.
            </>
          )}
        </p>

        {tauxKey === 'libre' && (
          <div>
            <label htmlFor="ch-taux" className="mb-2 block text-sm font-bold">
              Taux de votre règlement (CHF par km)
            </label>
            <input
              id="ch-taux"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              placeholder="Ex. 0.65"
              className={inputClass}
              value={tauxLibre}
              onChange={(e) => setTauxLibre(e.target.value)}
            />
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ch-km" className="mb-2 block text-sm font-bold">
              Distance parcourue (km)
            </label>
            <input
              id="ch-km"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="Ex. 12 000"
              className={inputClass}
              value={kmSaisis}
              onChange={(e) => setKmSaisis(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="ch-periode" className="mb-2 block text-sm font-bold">
              Période de référence
            </label>
            <select
              id="ch-periode"
              className={inputClass}
              value={periode}
              onChange={(e) => setPeriode(e.target.value as Periode)}
            >
              {(Object.keys(PERIODES) as Periode[]).map((p) => (
                <option key={p} value={p}>
                  {PERIODE_LABELS[p].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Résultat */}
      <div className={resultPanelClass} aria-live="polite">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg leading-snug font-bold">Votre indemnité kilométrique</h2>
          <span className={badgePill}>
            {Number.isFinite(taux) && taux > 0 ? `${chfPerKm(taux)} / km` : 'taux à saisir'}
          </span>
        </div>

        {resultat ? (
          <div className="mt-4 flex flex-1 flex-col">
            <p className={amountBoxClass}>
              <span className="block text-4xl font-bold">{formatCurrency(resultat.montant)}</span>
              <span className="mt-1 block text-sm text-muted">
                par an — soit {formatCurrency(resultat.montant / 12)} / mois ou{' '}
                {formatCurrency(resultat.montant / 52)} / semaine
              </span>
            </p>

            <p className={'mt-5 ' + kickerClass}>Le détail du calcul</p>
            {/* pb keeps the separator off the last step when mt-auto collapses to 0. */}
            <ol className={stepListClass}>
              <li className="flex items-start gap-3">
                <StepBadge n={1} />
                <span>
                  <strong className="text-ink">Distance annualisée :</strong>{' '}
                  {periode === 'annee' ? (
                    <>{formatNumber(resultat.kmAnnuels)} km par an.</>
                  ) : (
                    <>
                      {formatNumber(km)} km {PERIODE_LABELS[periode].parLabel} ×{' '}
                      {PERIODES[periode].facteur} = {formatNumber(resultat.kmAnnuels)} km par an.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <StepBadge n={2} />
                <span>
                  <strong className="text-ink">Forfait unique :</strong>{' '}
                  {formatNumber(resultat.kmAnnuels)} × {chfPerKm(resultat.taux)} ={' '}
                  {formatCurrency(resultat.montant)}. Pas de tranche de distance, pas de puissance
                  fiscale : le forfait couvre carburant, assurance, amortissement, entretien et
                  pneus.
                </span>
              </li>
              {ecart !== null && (
                <li className="flex items-start gap-3">
                  <StepBadge n={3} />
                  <span>
                    <strong className="text-ink">Écart avec l'autre taux :</strong>{' '}
                    {tauxKey === 'actuel' ? (
                      <>
                        au taux antérieur de {chfPerKm(TAUX_ANTERIEUR)}, la même distance donnerait{' '}
                        {formatCurrency(resultat.montantComparaison!)}, soit{' '}
                        {formatCurrency(ecart)} de moins.
                      </>
                    ) : (
                      <>
                        au plafond actuel de {chfPerKm(TAUX_ACTUEL)}, la même distance donnerait{' '}
                        {formatCurrency(resultat.montantComparaison!)}, soit{' '}
                        {formatCurrency(-ecart)} de plus. Passer à ce taux ne nécessite pas de
                        faire réapprouver le règlement de frais.
                      </>
                    )}
                  </span>
                </li>
              )}
              <li className="flex items-start gap-3">
                <StepBadge n={ecart !== null ? 4 : 3} />
                <span>
                  <strong className="text-ink">Ce qui fait foi :</strong> le règlement de frais de
                  votre employeur, approuvé par l'administration fiscale de son canton. Le montant
                  ci-dessus est une estimation, pas une norme opposable — mais l'art. 327a CO
                  impose que le forfait couvre réellement vos frais.
                </span>
              </li>
            </ol>

            <p className={ctaFooterClass}>
              Ces kilomètres, izika peut les compter pour vous depuis votre agenda.{' '}
              <a href={joinUrl} className={ctaLinkClass} data-track-click={ctaPayload}>
                Essayer gratuitement <span aria-hidden="true">›</span>
              </a>
            </p>
          </div>
        ) : (
          <div className={emptyStateClass}>
            <p className="max-w-xs text-sm text-muted">
              Saisissez la distance parcourue pour obtenir votre montant au taux de votre règlement
              de frais — avec le détail du calcul, étape par étape.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

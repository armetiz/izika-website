import { useMemo, useState } from 'react';
import {
  ANNEES,
  BAREMES,
  MAJORATION_ELECTRIQUE,
  PERIODES,
  computeIK,
  type Annee,
  type Categorie,
  type Motorisation,
  type Periode,
} from '../../data/bareme-ik';
import { PERIODE_LABELS, labelTranche } from '../../data/bareme-ik.labels.fr';
import { makeFormatters } from '../../lib/format';
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
 * Simulateur d'indemnités kilométriques. Toute la logique de calcul vit dans
 * src/data/bareme-ik.ts, partagée avec les tables pré-rendues de la page.
 * Composant PAYS-spécifique (barème CGI, copy française inline) : il n'existe
 * que sous routes.calculator du marché fr ; le formatage vient du Market via
 * les props sérialisables numberLocale/currency (l'île ne bundle pas la
 * config du site).
 * Le style suit la charte du thème : pastilles rounded-full jaune/blanc,
 * cartes blanches shadow-card, panneaux soft-primary, cercles jaunes numérotés.
 */

interface Props {
  numberLocale: string;
  currency: string;
  /** CTA de conversion du marché (getMarket(...).joinUrl). */
  joinUrl: string;
}

export default function SimulateurIK({ numberLocale, currency, joinUrl }: Props) {
  const { formatCurrency, formatNumber, formatCoef } = useMemo(
    () => makeFormatters({ numberLocale, currency }),
    [numberLocale, currency]
  );
  const [categorie, setCategorie] = useState<Categorie>('voiture');
  const [motorisation, setMotorisation] = useState<Motorisation>('thermique');
  const [annee, setAnnee] = useState<Annee>('2025');
  const [puissance, setPuissance] = useState('5');
  const [kmSaisis, setKmSaisis] = useState('');
  const [periode, setPeriode] = useState<Periode>('annee');

  const bareme = BAREMES[annee][categorie];
  const classe = bareme.classes.find((c) => c.key === puissance) ?? bareme.classes[0];

  const changeCategorie = (next: Categorie) => {
    setCategorie(next);
    // La classe de puissance sélectionnée peut ne pas exister dans l'autre
    // barème (voiture : 3→7 CV, moto : 1-2 / 3-5 / 6+).
    const nextBareme = BAREMES[annee][next];
    if (!nextBareme.classes.some((c) => c.key === puissance)) {
      setPuissance(nextBareme.classes[Math.floor(nextBareme.classes.length / 2)].key);
    }
  };

  const km = Number.parseFloat(kmSaisis.replace(',', '.'));
  const resultat = useMemo(
    () =>
      Number.isFinite(km) && km > 0
        ? computeIK({ categorie, motorisation, annee, puissance: classe.key, km, periode })
        : null,
    [categorie, motorisation, annee, classe.key, km, periode]
  );

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
          name="categorie"
          legend="Type de véhicule"
          value={categorie}
          options={[
            { value: 'voiture', label: 'Voiture' },
            { value: 'moto', label: 'Moto (> 50 cm³)' },
          ]}
          onChange={changeCategorie}
        />

        <SegmentedRadio
          name="motorisation"
          legend="Motorisation"
          value={motorisation}
          options={[
            { value: 'thermique', label: 'Thermique / hybride' },
            { value: 'electrique', label: 'Électrique (+ 20 %)' },
          ]}
          onChange={setMotorisation}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ik-annee" className="mb-2 block text-sm font-bold">
              Année du barème
            </label>
            <select
              id="ik-annee"
              className={inputClass}
              value={annee}
              onChange={(e) => setAnnee(e.target.value as Annee)}
            >
              {ANNEES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="ik-puissance" className="mb-2 block text-sm font-bold">
              Puissance fiscale
            </label>
            <select
              id="ik-puissance"
              className={inputClass}
              value={classe.key}
              onChange={(e) => setPuissance(e.target.value)}
            >
              {bareme.classes.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ik-km" className="mb-2 block text-sm font-bold">
              Distance parcourue (km)
            </label>
            <input
              id="ik-km"
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
            <label htmlFor="ik-periode" className="mb-2 block text-sm font-bold">
              Période de référence
            </label>
            <select
              id="ik-periode"
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
      <div
        className={resultPanelClass}
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg leading-snug font-bold">Votre indemnité kilométrique</h2>
          <span className={badgePill}>
            barème {annee}
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
                  <strong className="text-ink">Tranche du barème :</strong>{' '}
                  {labelTranche({ formatCurrency, formatNumber, formatCoef }, classe, resultat.trancheIndex).toLowerCase()} — {classe.label} (
                  {bareme.label.toLowerCase()}).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <StepBadge n={3} />
                <span>
                  <strong className="text-ink">Formule appliquée :</strong>{' '}
                  {resultat.tranche.fixe > 0 ? (
                    <>
                      ({formatNumber(resultat.kmAnnuels)} × {formatCoef(resultat.tranche.coef)}) +{' '}
                      {formatNumber(resultat.tranche.fixe)} € = {formatCurrency(resultat.montantBase)}
                    </>
                  ) : (
                    <>
                      {formatNumber(resultat.kmAnnuels)} × {formatCoef(resultat.tranche.coef)} ={' '}
                      {formatCurrency(resultat.montantBase)}
                    </>
                  )}
                </span>
              </li>
              {resultat.majoration > 0 && (
                <li className="flex items-start gap-3">
                  <StepBadge n={4} />
                  <span>
                    <strong className="text-ink">Véhicule électrique :</strong> majoration de{' '}
                    {MAJORATION_ELECTRIQUE * 100} %, soit + {formatCurrency(resultat.majoration)}.
                  </span>
                </li>
              )}
            </ol>

            <p className={ctaFooterClass}>
              Ces kilomètres, izika peut les compter pour vous depuis votre agenda.{' '}
              <a
                href={joinUrl}
                className={ctaLinkClass}
                data-track-click={ctaPayload}
              >
                Essayez gratuitement <span aria-hidden="true">›</span>
              </a>
            </p>
          </div>
        ) : (
          <div className={emptyStateClass}>
            <p className="max-w-xs text-sm text-muted">
              Saisissez la distance parcourue pour obtenir votre montant selon le barème fiscal{' '}
              {annee} — avec le détail du calcul, étape par étape.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

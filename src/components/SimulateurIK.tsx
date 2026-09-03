import { useMemo, useState } from 'react';
import {
  ANNEES,
  BAREMES,
  MAJORATION_ELECTRIQUE,
  PERIODES,
  computeIK,
  formatCoef,
  formatEuros,
  formatNombre,
  labelTranche,
  type Annee,
  type Categorie,
  type Motorisation,
  type Periode,
} from '../data/bareme-ik';
import { site } from '../config/site';
import { trackClickPayload } from '../lib/tracking';

/**
 * Simulateur d'indemnités kilométriques. Toute la logique de calcul vit dans
 * src/data/bareme-ik.ts, partagée avec les tables pré-rendues de la page.
 * Le style suit la charte du thème : pastilles rounded-full jaune/blanc,
 * cartes blanches shadow-card, panneaux soft-primary, cercles jaunes numérotés.
 */

const inputClass =
  'w-full rounded-card border border-beige-line bg-white px-3 py-2.5 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/40';

// Même contexte que le trackingContext de la page hôte.
const ctaPayload = trackClickPayload('calculator_result_cta', 'page_calculator');

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white"
      aria-hidden="true"
    >
      {n}
    </span>
  );
}

function SegmentedRadio<T extends string>(props: {
  name: string;
  legend: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">{props.legend}</legend>
      <div className="grid grid-cols-2 gap-2">
        {props.options.map((option) => (
          <label
            key={option.value}
            className="cursor-pointer rounded-full border border-beige-line bg-white px-3 py-2.5 text-center text-sm font-bold text-muted transition-colors has-checked:border-primary has-checked:bg-primary has-checked:text-white"
          >
            <input
              type="radio"
              name={props.name}
              value={option.value}
              checked={props.value === option.value}
              onChange={() => props.onChange(option.value)}
              className="sr-only"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default function SimulateurIK() {
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
        className="space-y-5 rounded-card bg-white p-6 shadow-card lg:p-8"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Paramètres du calcul d'indemnités kilométriques"
      >
        <p className="text-sm font-bold tracking-wide uppercase">Votre situation</p>

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
                  {PERIODES[p].label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </form>

      {/* Résultat */}
      <div
        className="flex flex-col rounded-card bg-white p-6 shadow-card lg:p-8"
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg leading-snug font-bold">Votre indemnité kilométrique</h2>
          <span className="mt-1 inline-block shrink-0 rounded-full bg-primary-hover px-2 py-0.5 text-xs font-bold text-white">
            barème {annee}
          </span>
        </div>

        {resultat ? (
          <div className="mt-4 flex flex-1 flex-col">
            <p className="rounded-card bg-soft-primary px-6 py-5 text-center">
              <span className="block text-4xl font-bold">{formatEuros(resultat.montant)}</span>
              <span className="mt-1 block text-sm text-muted">
                par an — soit {formatEuros(resultat.montant / 12)} / mois ou{' '}
                {formatEuros(resultat.montant / 52)} / semaine
              </span>
            </p>

            <p className="mt-5 text-sm font-bold tracking-wide uppercase">Le détail du calcul</p>
            <ol className="mt-3 space-y-3 text-sm text-muted">
              <li className="flex items-start gap-3">
                <StepBadge n={1} />
                <span>
                  <strong className="text-ink">Distance annualisée :</strong>{' '}
                  {periode === 'annee' ? (
                    <>{formatNombre(resultat.kmAnnuels)} km par an.</>
                  ) : (
                    <>
                      {formatNombre(km)} km {PERIODES[periode].parLabel} ×{' '}
                      {PERIODES[periode].facteur} = {formatNombre(resultat.kmAnnuels)} km par an.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <StepBadge n={2} />
                <span>
                  <strong className="text-ink">Tranche du barème :</strong>{' '}
                  {labelTranche(classe, resultat.trancheIndex).toLowerCase()} — {classe.label} (
                  {bareme.label.toLowerCase()}).
                </span>
              </li>
              <li className="flex items-start gap-3">
                <StepBadge n={3} />
                <span>
                  <strong className="text-ink">Formule appliquée :</strong>{' '}
                  {resultat.tranche.fixe > 0 ? (
                    <>
                      ({formatNombre(resultat.kmAnnuels)} × {formatCoef(resultat.tranche.coef)}) +{' '}
                      {formatNombre(resultat.tranche.fixe)} € = {formatEuros(resultat.montantBase)}
                    </>
                  ) : (
                    <>
                      {formatNombre(resultat.kmAnnuels)} × {formatCoef(resultat.tranche.coef)} ={' '}
                      {formatEuros(resultat.montantBase)}
                    </>
                  )}
                </span>
              </li>
              {resultat.majoration > 0 && (
                <li className="flex items-start gap-3">
                  <StepBadge n={4} />
                  <span>
                    <strong className="text-ink">Véhicule électrique :</strong> majoration de{' '}
                    {MAJORATION_ELECTRIQUE * 100} %, soit + {formatEuros(resultat.majoration)}.
                  </span>
                </li>
              )}
            </ol>

            <p className="mt-auto border-t border-beige-line pt-4 text-sm text-muted">
              Ces kilomètres, izika peut les compter pour vous depuis votre agenda.{' '}
              <a
                href={site.joinUrl}
                className="font-bold text-ink underline hover:text-primary-hover"
                data-track-click={ctaPayload}
              >
                Essayez gratuitement <span aria-hidden="true">›</span>
              </a>
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-1 flex-col items-center justify-center rounded-card bg-soft-neutral px-6 py-10 text-center">
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

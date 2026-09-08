import { useMemo, useState } from 'react';
import {
  PASSENGER_RATE,
  PERIODS,
  RATES,
  TAX_YEARS,
  computeMileage,
  type Period,
  type TaxYear,
  type VehicleType,
} from '../../data/mileage-uk';
import { makeFormatters, pence } from '../../lib/format';
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
 * UK mileage allowance calculator (HMRC AMAP rates). All the maths lives in
 * src/data/mileage-uk.ts, shared with the pre-rendered tables of the page.
 * COUNTRY-specific component (English copy inline, UK scheme): it only exists
 * under routes.calculator of the uk market; formatting comes from the page
 * via the serialisable numberLocale/currency props (GBP — the island does not
 * bundle any site/market config).
 * Styling mirrors SimulateurIK: rounded-full pills, white shadow-card panels,
 * soft-primary result box, numbered yellow badges.
 */

interface Props {
  numberLocale: string;
  currency: string;
  /** Conversion CTA of the market (getMarket(...).joinUrl). */
  joinUrl: string;
}

const PERIOD_LABELS: Record<Period, { label: string; perLabel: string }> = {
  week: { label: 'Week (× 52)', perLabel: 'per week' },
  month: { label: 'Month (× 12)', perLabel: 'per month' },
  year: { label: 'Year', perLabel: 'per year' },
};

export default function MileageCalculatorUK({ numberLocale, currency, joinUrl }: Props) {
  const { formatCurrency, formatNumber } = useMemo(
    () => makeFormatters({ numberLocale, currency }),
    [numberLocale, currency]
  );
  const [vehicle, setVehicle] = useState<VehicleType>('carVan');
  const [taxYear, setTaxYear] = useState<TaxYear>('2026/27');
  const [milesInput, setMilesInput] = useState('');
  const [period, setPeriod] = useState<Period>('year');
  const [passengerInput, setPassengerInput] = useState('');

  const rates = RATES[taxYear][vehicle];
  const miles = Number.parseFloat(milesInput.replace(',', '.'));
  const passengerMiles = Number.parseFloat(passengerInput.replace(',', '.'));

  const result = useMemo(
    () =>
      Number.isFinite(miles) && miles > 0
        ? computeMileage({
            vehicle,
            taxYear,
            miles,
            period,
            passengerMiles: Number.isFinite(passengerMiles) ? passengerMiles : 0,
          })
        : null,
    [vehicle, taxYear, miles, period, passengerMiles]
  );

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Form */}
      <form
        className={formClass}
        onSubmit={(e) => e.preventDefault()}
        aria-label="Mileage allowance calculation settings"
      >
        <p className={kickerClass}>Your situation</p>

        <SegmentedRadio
          name="vehicle"
          legend="Vehicle type"
          value={vehicle}
          columns={3}
          options={[
            { value: 'carVan', label: 'Car / van' },
            { value: 'motorcycle', label: 'Motorcycle' },
            { value: 'bicycle', label: 'Bicycle' },
          ]}
          onChange={setVehicle}
        />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="uk-tax-year" className="mb-2 block text-sm font-bold">
              Tax year
            </label>
            <select
              id="uk-tax-year"
              className={inputClass}
              value={taxYear}
              onChange={(e) => setTaxYear(e.target.value as TaxYear)}
            >
              {TAX_YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="uk-period" className="mb-2 block text-sm font-bold">
              Reference period
            </label>
            <select
              id="uk-period"
              className={inputClass}
              value={period}
              onChange={(e) => setPeriod(e.target.value as Period)}
            >
              {(Object.keys(PERIODS) as Period[]).map((p) => (
                <option key={p} value={p}>
                  {PERIOD_LABELS[p].label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="uk-miles" className="mb-2 block text-sm font-bold">
              Business miles
            </label>
            <input
              id="uk-miles"
              type="number"
              inputMode="decimal"
              min="0"
              step="any"
              placeholder="E.g. 8,000"
              className={inputClass}
              value={milesInput}
              onChange={(e) => setMilesInput(e.target.value)}
            />
          </div>
          {vehicle === 'carVan' && (
            <div>
              <label htmlFor="uk-passenger-miles" className="mb-2 block text-sm font-bold">
                Miles with a passenger
              </label>
              <input
                id="uk-passenger-miles"
                type="number"
                inputMode="decimal"
                min="0"
                step="any"
                placeholder={`Optional (+${pence(PASSENGER_RATE)}/mile)`}
                className={inputClass}
                value={passengerInput}
                onChange={(e) => setPassengerInput(e.target.value)}
              />
            </div>
          )}
        </div>
      </form>

      {/* Result */}
      <div
        className={resultPanelClass}
        aria-live="polite"
      >
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg leading-snug font-bold">Your mileage allowance</h2>
          <span className={badgePill}>
            {taxYear} rates
          </span>
        </div>

        {result ? (
          <div className="mt-4 flex flex-1 flex-col">
            <p className={amountBoxClass}>
              <span className="block text-4xl font-bold">{formatCurrency(result.total)}</span>
              <span className="mt-1 block text-sm text-muted">
                per year — that's {formatCurrency(result.total / 12)} / month or{' '}
                {formatCurrency(result.total / 52)} / week
              </span>
            </p>

            <p className={'mt-5 ' + kickerClass}>How it's worked out</p>
            {/* pb keeps the separator off the last step when mt-auto collapses to 0. */}
            <ol className={stepListClass}>
              <li className="flex items-start gap-3">
                <StepBadge n={1} />
                <span>
                  <strong className="text-ink">Annualised distance:</strong>{' '}
                  {period === 'year' ? (
                    <>{formatNumber(result.annualMiles)} business miles per tax year.</>
                  ) : (
                    <>
                      {formatNumber(miles)} miles {PERIOD_LABELS[period].perLabel} ×{' '}
                      {PERIODS[period].factor} = {formatNumber(result.annualMiles)} miles per tax
                      year.
                    </>
                  )}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <StepBadge n={2} />
                <span>
                  <strong className="text-ink">Approved rate ({rates.label.toLowerCase()}):</strong>{' '}
                  {result.bands.map((band, index) => (
                    <span key={index}>
                      {index > 0 && ' + '}
                      {formatNumber(band.miles)} miles × {pence(band.rate)} ={' '}
                      {formatCurrency(band.amount)}
                    </span>
                  ))}
                  .
                </span>
              </li>
              {result.passengerAmount > 0 && (
                <li className="flex items-start gap-3">
                  <StepBadge n={3} />
                  <span>
                    <strong className="text-ink">Passenger payments:</strong>{' '}
                    {pence(PASSENGER_RATE)} per passenger mile, adding{' '}
                    {formatCurrency(result.passengerAmount)}.
                  </span>
                </li>
              )}
            </ol>

            <p className={ctaFooterClass}>
              These miles, izika can count them for you straight from your calendar.{' '}
              <a
                href={joinUrl}
                className={ctaLinkClass}
                data-track-click={ctaPayload}
              >
                Try it for free <span aria-hidden="true">›</span>
              </a>
            </p>
          </div>
        ) : (
          <div className={emptyStateClass}>
            <p className="max-w-xs text-sm text-muted">
              Enter your business miles to get your tax-free amount at the {taxYear} HMRC approved
              rates — with the calculation detailed step by step.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

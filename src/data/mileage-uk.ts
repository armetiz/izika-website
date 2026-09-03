/**
 * UK HMRC Approved Mileage Allowance Payments (AMAP) — pure data + maths,
 * single source of truth for the calculator (React island), the pre-rendered
 * HTML tables and the worked example on the calculator page.
 *
 * COUNTRY-specific module (ITEPA 2003 s.230), deliberately NOT shared with
 * the French barème (src/data/bareme-ik.ts): the two schemes have different
 * shapes — the UK is a progressive per-band rate (first 10,000 miles at the
 * high rate, the remainder at the low rate, per tax year), the French barème
 * is a slab formula by tax horsepower. Formatting comes from src/lib/format.
 *
 * 2026/27: first rate change since 2011/12 — cars and vans go from 45p to
 * 55p for the first 10,000 business miles (announced 21 May 2026,
 * retrospective to 6 April 2026, Taxation (Energy and Vehicles) Bill).
 * Motorcycles (24p) and bicycles (20p) are flat rates, unchanged.
 * Rates are fuel-agnostic: electric and hybrid vehicles use the same rates.
 * Passenger payments: 5p per passenger per business mile (cars and vans).
 */

export type VehicleType = 'carVan' | 'motorcycle' | 'bicycle';
export type Period = 'week' | 'month' | 'year';

export interface RateBand {
  /** Upper bound included, in business miles per tax year. `null` = last band. */
  maxMiles: number | null;
  /** £ per mile. */
  rate: number;
}

export interface VehicleRates {
  key: VehicleType;
  label: string;
  bands: readonly [RateBand, ...RateBand[]];
}

/** £ per passenger per business mile (cars and vans only). */
export const PASSENGER_RATE = 0.05;

const CAR_VAN_2026: VehicleRates = {
  key: 'carVan',
  label: 'Car or van',
  bands: [
    { maxMiles: 10000, rate: 0.55 },
    { maxMiles: null, rate: 0.25 },
  ],
};

/** 45p headline rate, unchanged from 2011/12 through 2025/26. */
const CAR_VAN_LEGACY: VehicleRates = {
  key: 'carVan',
  label: 'Car or van',
  bands: [
    { maxMiles: 10000, rate: 0.45 },
    { maxMiles: null, rate: 0.25 },
  ],
};

const MOTORCYCLE: VehicleRates = {
  key: 'motorcycle',
  label: 'Motorcycle',
  bands: [{ maxMiles: null, rate: 0.24 }],
};

const BICYCLE: VehicleRates = {
  key: 'bicycle',
  label: 'Bicycle',
  bands: [{ maxMiles: null, rate: 0.2 }],
};

export const TAX_YEARS = ['2026/27', '2025/26', '2024/25'] as const;
export type TaxYear = (typeof TAX_YEARS)[number];

export const RATES: Record<TaxYear, Record<VehicleType, VehicleRates>> = {
  '2026/27': { carVan: CAR_VAN_2026, motorcycle: MOTORCYCLE, bicycle: BICYCLE },
  '2025/26': { carVan: CAR_VAN_LEGACY, motorcycle: MOTORCYCLE, bicycle: BICYCLE },
  '2024/25': { carVan: CAR_VAN_LEGACY, motorcycle: MOTORCYCLE, bicycle: BICYCLE },
};

export const PERIODS: Record<Period, { factor: number }> = {
  week: { factor: 52 },
  month: { factor: 12 },
  year: { factor: 1 },
};

export interface BandBreakdown {
  /** Miles charged in this band. */
  miles: number;
  /** £ per mile applied to them. */
  rate: number;
  amount: number;
}

export interface MileageResult {
  annualMiles: number;
  /** Only the bands actually reached (at least one). */
  bands: readonly BandBreakdown[];
  vehicleAmount: number;
  /** 0 when no passenger miles were entered. */
  passengerAmount: number;
  total: number;
}

export function computeMileage(input: {
  vehicle: VehicleType;
  taxYear: TaxYear;
  miles: number;
  period: Period;
  /** Annualised like `miles`; capped at the annualised business miles. */
  passengerMiles?: number;
}): MileageResult | null {
  const rates = RATES[input.taxYear]?.[input.vehicle];
  if (!rates || !(input.miles > 0)) return null;

  const factor = PERIODS[input.period].factor;
  const annualMiles = input.miles * factor;

  const bands: BandBreakdown[] = [];
  let previousMax = 0;
  for (const band of rates.bands) {
    const upper = band.maxMiles ?? Infinity;
    const miles = Math.min(annualMiles, upper) - previousMax;
    if (miles <= 0) break;
    bands.push({ miles, rate: band.rate, amount: miles * band.rate });
    previousMax = upper;
  }

  const vehicleAmount = bands.reduce((sum, band) => sum + band.amount, 0);
  const annualPassengerMiles = Math.min(
    Math.max(input.passengerMiles ?? 0, 0) * factor,
    annualMiles,
  );
  // Passenger payments only exist for cars and vans (ITEPA 2003 s.233).
  const passengerAmount = input.vehicle === 'carVan' ? annualPassengerMiles * PASSENGER_RATE : 0;

  return {
    annualMiles,
    bands,
    vehicleAmount,
    passengerAmount,
    total: vehicleAmount + passengerAmount,
  };
}

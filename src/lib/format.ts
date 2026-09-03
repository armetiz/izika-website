/**
 * Market-driven number/currency formatting. Every displayed amount goes
 * through a formatter built from the market's numberLocale/currency — no
 * hardcoded Intl locale outside this module.
 */
export interface Formatters {
  formatCurrency: (n: number) => string;
  formatNumber: (n: number) => string;
  /** 3 fixed decimals — the barème coefficient precision. */
  formatCoef: (n: number) => string;
}

export function makeFormatters(options: { numberLocale: string; currency: string }): Formatters {
  const currency = new Intl.NumberFormat(options.numberLocale, {
    style: 'currency',
    currency: options.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const number = new Intl.NumberFormat(options.numberLocale);
  const coef = new Intl.NumberFormat(options.numberLocale, {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });

  return {
    formatCurrency: (n) => currency.format(n),
    formatNumber: (n) => number.format(n),
    formatCoef: (n) => coef.format(n),
  };
}

/** UK pence rate: "0.55" → "55p". */
export const pence = (rate: number) => `${Math.round(rate * 100)}p`;

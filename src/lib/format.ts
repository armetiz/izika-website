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

export function makeFormatters(options: {
  numberLocale: string;
  currency: string;
  /**
   * Thousands separator forced in place of the locale's own. Only for the
   * cases where CLDR and local usage disagree: CLDR renders fr-CH thousands
   * with a narrow no-break space, while Swiss usage — Fedlex, certificats de
   * salaire, factures — writes the apostrophe (9'750.00). Left undefined,
   * the locale decides, which is the right default everywhere else.
   */
  groupSeparator?: string;
}): Formatters {
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

  // formatToParts rather than a string replace: only the `group` parts are
  // substituted, so the space between the amount and the currency code — a
  // no-break space of the same family — is left alone.
  const groupSeparator = options.groupSeparator;
  const format = (fmt: Intl.NumberFormat, n: number) =>
    groupSeparator === undefined
      ? fmt.format(n)
      : fmt
          .formatToParts(n)
          .map((part) => (part.type === 'group' ? groupSeparator : part.value))
          .join('');

  return {
    formatCurrency: (n) => format(currency, n),
    formatNumber: (n) => format(number, n),
    formatCoef: (n) => format(coef, n),
  };
}

/** UK pence rate: "0.55" → "55p". */
export const pence = (rate: number) => `${Math.round(rate * 100)}p`;

/**
 * Swiss per-km rate: 0.75 → "CHF 0.75". Written with a decimal POINT and the
 * code in front, per Swiss usage — Intl's fr-CH plain-number format would
 * render "0,75", which no Swiss règlement de frais writes.
 */
export const chfPerKm = (rate: number) => `CHF ${rate.toFixed(2)}`;

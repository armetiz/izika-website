import { checkBullet } from '../../lib/ui';
import { trackClickPayload } from '../../lib/tracking';

/**
 * Shared UI shell of the two calculator islands (SimulateurIK /
 * MileageCalculatorUK): identical form controls, result panel and step list —
 * only the tax engine and the copy differ, and they stay in each island.
 * Keep the class strings literal for Tailwind's scanner.
 */

export const inputClass =
  'w-full rounded-card border border-beige-line bg-white px-3 py-2.5 text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/40';

// Same context as the host pages' trackingContext.
export const ctaPayload = trackClickPayload('calculator_result_cta', 'page_calculator');

export const formClass = 'space-y-5 rounded-card bg-white p-6 shadow-card lg:p-8';
export const resultPanelClass = 'flex flex-col rounded-card bg-white p-6 shadow-card lg:p-8';
export const kickerClass = 'text-sm font-bold tracking-wide uppercase';
export const amountBoxClass = 'rounded-card bg-soft-primary px-6 py-5 text-center';
export const stepListClass = 'mt-3 space-y-3 pb-4 text-sm text-muted';
export const ctaFooterClass = 'mt-auto border-t border-beige-line pt-4 text-sm text-muted';
export const ctaLinkClass = 'font-bold text-ink underline hover:text-primary-hover';
export const emptyStateClass =
  'mt-4 flex flex-1 flex-col items-center justify-center rounded-card bg-soft-neutral px-6 py-10 text-center';

export function StepBadge({ n }: { n: number }) {
  return (
    <span className={checkBullet} aria-hidden="true">
      {n}
    </span>
  );
}

export function SegmentedRadio<T extends string>(props: {
  name: string;
  legend: string;
  value: T;
  options: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
  /** Grid columns (default 2). */
  columns?: 2 | 3;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-bold">{props.legend}</legend>
      <div className={props.columns === 3 ? 'grid grid-cols-3 gap-2' : 'grid grid-cols-2 gap-2'}>
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

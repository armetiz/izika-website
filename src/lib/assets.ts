import { marketIds, type MarketId } from '../i18n/markets';

/**
 * Naming convention of public/assets — see plans/pays/03-inventaire-assets.md.
 *
 * NEUTRAL visuals live under the family that names them; MARKET-dependent ones
 * live in a per-market tree that mirrors those same families:
 *
 *     /assets/icons/custom-rate.png              neutral — reusable everywhere
 *     /assets/markets/fr/icons/compliance.png    market-dependent — one tree per market
 *     /assets/markets/uk/icons/compliance.png
 *
 * The discriminant is the market, not the language: a visual carries a
 * currency, a distance unit and a tax scheme, so `be-fr` and `fr` need
 * different files even though both read French.
 *
 * A market tree is a self-contained package: it is what a designer receives
 * when a market opens, and `diff -rq markets/fr markets/de` states what is
 * missing without running anything.
 *
 * There is NO fallback. Each market owns a physical file, even when its bytes
 * are still the French ones — an inherited visual would be a silent, invisible
 * decision, which is exactly the failure mode this convention exists to kill.
 * Every build lists the market files whose bytes are still identical across
 * markets (src/integrations/asset-guard.mjs): that list IS the localisation
 * debt, and a missing file fails the build outright.
 */
export function marketAsset(neutralPath: string, market: MarketId): string {
  if (!neutralPath.startsWith('/assets/')) {
    throw new Error(`marketAsset: "${neutralPath}" is not an /assets path.`);
  }
  return `/assets/markets/${market}/${neutralPath.slice('/assets/'.length)}`;
}

/** `/assets/markets/<market>/…` — the market segment is captured. */
const MARKET_ASSET = new RegExp(`^/assets/markets/(?:${marketIds.join('|')})/(.+)$`);

/**
 * Retargets every MARKET asset path of a copy object onto `market`, deeply.
 *
 * A market whose copy is derived from another one (`/ch-fr` reuses the French
 * wording of `/fr`) would otherwise inherit its visuals too — the silent
 * mutualisation this convention forbids. Wrapping the derived object states,
 * in one visible call, that the copy is shared but the visuals are not:
 *
 *     export const soloPageChFr = marketAssets('ch-fr', { ...soloPageFr, … });
 *
 * Only paths that ALREADY live in a market tree are rewritten, so neutral
 * assets stay untouched, and the operation is idempotent — an override written
 * by hand with the right market survives unchanged. Nothing is invented: the
 * retargeted file must exist in public/, and the build fails on it otherwise
 * (src/integrations/asset-guard.mjs).
 */
export function marketAssets<T>(market: MarketId, copy: T): T {
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') {
      const m = MARKET_ASSET.exec(value);
      return m ? `/assets/markets/${market}/${m[1]}` : value;
    }
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  };
  return walk(copy) as T;
}

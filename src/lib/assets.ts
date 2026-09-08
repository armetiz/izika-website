import { marketIds, type MarketId } from '../i18n/markets';

/**
 * Naming convention of public/assets — see plans/pays/03-inventaire-assets.md.
 *
 * The folder names the family (app/, icons/, verticals/…), the file names the
 * subject, and a MARKET-dependent visual carries the market id before its
 * extension:
 *
 *     /assets/icons/compliance.fr.png     market-dependent — one file per market
 *     /assets/icons/custom-rate.png       neutral — reusable everywhere
 *
 * The discriminant is the market, not the language: a visual carries a
 * currency, a distance unit and a tax scheme, so `be-fr` and `fr` need
 * different files even though both read French.
 *
 * There is NO fallback. Each market owns a physical file, even when its bytes
 * are still the French ones — an inherited visual would be a silent, invisible
 * decision, which is exactly the failure mode this convention exists to kill.
 * Every build lists the market files whose bytes are still identical across
 * markets (src/integrations/asset-guard.mjs): that list IS the localisation
 * debt, and a missing file fails the build outright.
 */
export function marketAsset(neutralPath: string, market: MarketId): string {
  const dot = neutralPath.lastIndexOf('.');
  if (dot <= neutralPath.lastIndexOf('/')) {
    throw new Error(`marketAsset: "${neutralPath}" has no file extension.`);
  }
  return `${neutralPath.slice(0, dot)}.${market}${neutralPath.slice(dot)}`;
}

/** `.fr.` / `.uk.` / `.ch-fr.` right before the extension of an /assets path. */
const MARKET_ASSET = new RegExp(
  `^(/assets/[A-Za-z0-9_./-]+)\\.(${marketIds.join('|')})(\\.[a-z]+)$`,
);

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
 * Only paths that ALREADY carry a market id are rewritten, so neutral assets
 * stay untouched, and the operation is idempotent — an override written by
 * hand with the right market survives unchanged. Nothing is invented: the
 * retargeted file must exist in public/, and the build fails on it otherwise
 * (src/integrations/asset-guard.mjs).
 */
export function marketAssets<T>(market: MarketId, copy: T): T {
  const walk = (value: unknown): unknown => {
    if (typeof value === 'string') {
      const m = MARKET_ASSET.exec(value);
      return m ? `${m[1]}.${market}${m[3]}` : value;
    }
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') {
      return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, walk(v)]));
    }
    return value;
  };
  return walk(copy) as T;
}

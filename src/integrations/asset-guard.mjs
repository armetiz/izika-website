import { createHash } from 'node:crypto';
import { readdir, readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Closes the hole described in plans/pays/03-inventaire-assets.md: nothing in
 * public/ goes through `astro:assets`, so a wrong image path does not fail the
 * build — it 404s silently at runtime, and the page ships without its visual.
 * Tolerable with one set of assets; the number-one risk as soon as every
 * market owns its own copy of every visual.
 *
 * Three passes on the emitted site, after every page is written:
 *
 * 1. BROKEN — an /assets path referenced by an emitted page with no file
 *    behind it. Fails the build.
 * 2. ORPHANS — a file in public/assets that no page references. A warning:
 *    it costs deploy weight and hides dead visuals, but it breaks nothing.
 * 3. LOCALISATION DEBT — files of `/assets/markets/<market>/…` whose bytes
 *    are still identical to another market's. Those are the visuals a market
 *    was opened without, and the list a designer works from. A warning, on
 *    purpose: shipping the French visual is a known, dated compromise, not a
 *    build error.
 *
 * Pass 3 keys on the path INSIDE the market tree, so what counts as a market
 * asset is structural — no guessing whether a two-letter chunk of a filename
 * happens to be a market id.
 */
const IMAGE = /\.(png|jpe?g|svg|ico|webp|avif|gif)$/i;
// Both root-relative (href/src/url()) and absolute (canonical, JSON-LD) forms.
const REFERENCE = /(?:https?:\/\/[^"'()\s]*)?(\/assets\/[A-Za-z0-9_@./-]+\.(?:png|jpe?g|svg|ico|webp|avif|gif))/g;
const MARKET_VARIANT = /^\/assets\/markets\/([^/]+)\/(.+)$/;

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, out);
    else out.push(full);
  }
  return out;
}

export default function assetGuard() {
  return {
    name: 'izika:asset-guard',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const distDir = fileURLToPath(dir);
        const files = await walk(distDir);
        const pages = files.filter((f) => f.endsWith('.html'));

        // ---- 1. broken references ----------------------------------------
        const referenced = new Map(); // asset path -> pages referencing it
        for (const page of pages) {
          const html = await readFile(page, 'utf8');
          for (const [, asset] of html.matchAll(REFERENCE)) {
            const from = path.relative(distDir, page);
            referenced.set(asset, (referenced.get(asset) ?? new Set()).add(from));
          }
        }

        const broken = [];
        for (const [asset, from] of referenced) {
          try {
            await stat(path.join(distDir, asset));
          } catch {
            broken.push({ asset, from: [...from].sort() });
          }
        }
        if (broken.length > 0) {
          const detail = broken
            .map(({ asset, from }) => `  ${asset}\n      referenced by ${from.slice(0, 5).join(', ')}${from.length > 5 ? ` (+${from.length - 5})` : ''}`)
            .join('\n');
          throw new Error(
            `asset-guard: ${broken.length} image path(s) point to no file.\n${detail}\n` +
              'Market assets are named <name>.<market>.<ext> and have NO fallback: ' +
              'produce the file, or point the copy at the market that has one.',
          );
        }

        // ---- 2. orphans ---------------------------------------------------
        const onDisk = files
          .filter((f) => IMAGE.test(f))
          .map((f) => '/' + path.relative(distDir, f))
          .filter((p) => p.startsWith('/assets/'));
        const orphans = onDisk.filter((p) => !referenced.has(p)).sort();
        if (orphans.length > 0) {
          logger.warn(
            `${orphans.length} unreferenced image(s) shipped:\n  ` + orphans.join('\n  '),
          );
        }

        // ---- 3. localisation debt ----------------------------------------
        const variants = new Map(); // "<family>/<name><ext>" -> [{ market, hash }]
        for (const p of onDisk) {
          const m = MARKET_VARIANT.exec(p);
          if (!m) continue;
          const bytes = await readFile(path.join(distDir, p));
          const hash = createHash('sha1').update(bytes).digest('hex');
          variants.set(m[2], (variants.get(m[2]) ?? []).concat({ market: m[1], hash }));
        }

        const debt = [];
        for (const [key, list] of variants) {
          const byHash = new Map();
          for (const { market, hash } of list) {
            byHash.set(hash, (byHash.get(hash) ?? []).concat(market));
          }
          for (const markets of byHash.values()) {
            if (markets.length > 1) debt.push(`${key} — same bytes in ${markets.sort().join(', ')}`);
          }
        }
        if (debt.length > 0) {
          logger.warn(
            `${debt.length} market visual(s) not localised yet (byte-identical across markets):\n  ` +
              debt.sort().join('\n  ') +
              '\n  → plans/pays/03-inventaire-assets.md § « Le lot à produire par marché »',
          );
        }

        logger.info(
          `${referenced.size} image path(s) checked, 0 broken, ${orphans.length} orphan(s), ${debt.length} to localise.`,
        );
      },
    },
  };
}

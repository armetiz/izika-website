import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

/**
 * Appends one explicit 301 line per French article to dist/_redirects at
 * build time: the 37 legacy root-level article URLs (/{slug}) move to
 * /fr/{slug}. Generated from the content directory so the redirect map can
 * never drift from the collection. A blanket /:slug catch-all is forbidden on
 * Cloudflare Pages (_redirects is evaluated before static assets).
 */
export default function legacyRedirects() {
  return {
    name: 'izika:legacy-redirects',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const articlesDir = new URL('../../src/content/articles/fr/', import.meta.url);
        let slugs = [];
        try {
          const files = await readdir(articlesDir);
          slugs = files
            .filter((f) => f.endsWith('.md'))
            .map((f) => path.basename(f, '.md'))
            .sort();
        } catch {
          logger.warn('No src/content/articles/fr directory — no article redirects generated.');
          return;
        }

        const redirectsPath = path.join(fileURLToPath(dir), '_redirects');
        let existing = '';
        try {
          existing = await readFile(redirectsPath, 'utf8');
        } catch {
          // no static _redirects file yet — generated lines stand alone
        }

        const lines = slugs.map((slug) => `/${slug}  /fr/${slug}  301`);
        const generated = [
          '',
          '# ---- Legacy root-level article URLs (generated at build time) ----',
          ...lines,
          '',
        ].join('\n');

        await writeFile(redirectsPath, existing.trimEnd() + '\n' + generated);
        logger.info(`Wrote ${lines.length} article redirect lines to _redirects.`);
      },
    },
  };
}

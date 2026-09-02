// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import legacyRedirects from './src/integrations/legacy-redirects.mjs';

// The public site is fully static — no adapter, no worker. The Keystatic
// admin (/keystatic, SSR) is only mounted on the dev server, where it runs on
// the Node runtime (Keystatic's API is not workerd-compatible today, see
// docs/keystatic-admin.md for the production admin options).
const enableKeystatic = process.env.KEYSTATIC_ADMIN !== '0';

// NOTE: no Astro `i18n` block on purpose. Locale routing is fully hand-rolled
// (explicit src/pages/<locale>/ dirs + src/i18n/routes.ts as the single source
// of truth for links/hreflang/sitemap). Astro 7's i18n option with
// prefixDefaultLocale breaks unprefixed rest-param routes, including the
// injected /keystatic admin routes.
// https://astro.build/config
export default defineConfig({
  site: 'https://izika.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  integrations: [react(), ...(enableKeystatic ? [keystatic()] : []), legacyRedirects()],
  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: '_blank',
          rel: ['nofollow', 'noopener'],
          properties: { className: ['external-link'] },
        },
      ],
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'append' }],
    ],
  },
  vite: { plugins: [tailwindcss()] },
});

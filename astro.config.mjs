// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import legacyRedirects from './src/integrations/legacy-redirects.mjs';

// https://astro.build/config
export default defineConfig({
  site: 'https://izika.com',
  trailingSlash: 'never',
  build: { format: 'file' },
  output: 'static',
  adapter: cloudflare(),
  integrations: [react(), keystatic(), legacyRedirects()],
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
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

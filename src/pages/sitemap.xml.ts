import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import { locales, routes, localizedPath, articlePath, solutionPath, type RouteKey } from '../i18n';

/**
 * Hand-rolled sitemap iterating the same sources of truth as the router:
 * the routes table (editorial pages x available locales), the solutions
 * collection and the articles collection (lastmod from frontmatter). A page
 * cannot exist without appearing here.
 */
export const GET: APIRoute = async () => {
  const urls: Array<{ loc: string; lastmod?: string; alternates?: Array<{ hreflang: string; href: string }> }> = [];

  for (const key of Object.keys(routes) as RouteKey[]) {
    const available = locales
      .map((locale) => ({ locale, path: localizedPath(key, locale) }))
      .filter((a): a is { locale: (typeof locales)[number]; path: string } => a.path !== null);
    for (const { path } of available) {
      urls.push({
        loc: new URL(path, site.url).href,
        alternates:
          available.length >= 2
            ? available.map((a) => ({ hreflang: a.locale, href: new URL(a.path, site.url).href }))
            : undefined,
      });
    }
  }

  const solutions = await getCollection('solutions');
  for (const entry of solutions) {
    const [locale, slug] = entry.id.split('/') as [(typeof locales)[number], string];
    const path = solutionPath(slug, locale);
    if (path) urls.push({ loc: new URL(path, site.url).href });
  }

  const articles = await getCollection('articles');
  for (const entry of articles) {
    const [locale, slug] = entry.id.split('/') as [(typeof locales)[number], string];
    if (entry.data.robots?.includes('noindex')) continue;
    urls.push({
      loc: new URL(articlePath(slug, locale), site.url).href,
      lastmod: entry.data.date.toISOString().slice(0, 10),
    });
  }

  const hasAlternates = urls.some((u) => u.alternates);
  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"${hasAlternates ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"' : ''}>`,
    ...urls.map((u) =>
      [
        '  <url>',
        `    <loc>${u.loc}</loc>`,
        ...(u.lastmod ? [`    <lastmod>${u.lastmod}</lastmod>`] : []),
        ...(u.alternates ?? []).map(
          (a) => `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`,
        ),
        '  </url>',
      ].join('\n'),
    ),
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};

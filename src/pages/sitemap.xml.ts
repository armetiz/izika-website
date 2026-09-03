import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';
import {
  marketIds,
  MARKETS,
  routes,
  localizedPath,
  articlePath,
  hreflangAlternates,
  solutionPath,
  solutionSlug,
  solutionSlugs,
  splitContentId,
  type RouteKey,
  type SolutionKey,
} from '../i18n';

/**
 * Hand-rolled sitemap iterating the same sources of truth as the router:
 * the routes table (editorial pages x available markets), the solutions
 * collection and the articles collection (lastmod from frontmatter). A page
 * cannot exist without appearing here.
 */
export const GET: APIRoute = async () => {
  const urls: Array<{ loc: string; lastmod?: string; alternates?: Array<{ hreflang: string; href: string }> }> = [];

  for (const key of Object.keys(routes) as RouteKey[]) {
    // x-default first, then one alternate per market — hreflangAlternates owns
    // the shared emission rule (nothing below 2 markets, same as Seo.astro).
    const group = hreflangAlternates(key);
    const alternates = group
      ? [
          ...(group.xDefaultHref !== null
            ? [{ hreflang: 'x-default', href: new URL(group.xDefaultHref, site.url).href }]
            : []),
          ...group.alternates.map((a) => ({
            hreflang: MARKETS[a.market].hreflang,
            href: new URL(a.href, site.url).href,
          })),
        ]
      : undefined;
    for (const market of marketIds) {
      const path = localizedPath(key, market);
      if (path !== null) urls.push({ loc: new URL(path, site.url).href, alternates });
    }
  }

  const solutions = await getCollection('solutions');
  // Solutions of different markets paired by their solutionSlugs key are
  // alternates — same >= 2 markets emission rule (no x-default, like articles).
  for (const entry of solutions) {
    const [market, slug] = splitContentId(entry.id);
    const path = solutionPath(slug, market);
    if (!path) continue;
    const key = (Object.keys(solutionSlugs) as SolutionKey[]).find(
      (k) => solutionSlug(k, market) === slug,
    );
    const siblings = key
      ? marketIds
          .map((m) => ({ market: m, slug: solutionSlug(key, m) }))
          .filter((a): a is { market: (typeof marketIds)[number]; slug: string } => a.slug !== undefined)
          .map((a) => ({
            hreflang: MARKETS[a.market].hreflang,
            href: new URL(solutionPath(a.slug, a.market)!, site.url).href,
          }))
      : [];
    urls.push({
      loc: new URL(path, site.url).href,
      alternates: siblings.length >= 2 ? siblings : undefined,
    });
  }

  const articles = await getCollection('articles');
  // Articles of different markets sharing a hreflangKey are alternates —
  // emitted only when a key spans >= 2 entries (zero today, single market).
  const byHreflangKey = new Map<string, Array<{ hreflang: string; href: string }>>();
  for (const entry of articles) {
    const key = entry.data.hreflangKey;
    if (!key) continue;
    const [market, slug] = splitContentId(entry.id);
    const list = byHreflangKey.get(key) ?? [];
    list.push({
      hreflang: MARKETS[market].hreflang,
      href: new URL(articlePath(slug, market), site.url).href,
    });
    byHreflangKey.set(key, list);
  }
  for (const entry of articles) {
    const [market, slug] = splitContentId(entry.id);
    if (entry.data.robots?.includes('noindex')) continue;
    const group = entry.data.hreflangKey ? byHreflangKey.get(entry.data.hreflangKey) : undefined;
    urls.push({
      loc: new URL(articlePath(slug, market), site.url).href,
      lastmod: entry.data.date.toISOString().slice(0, 10),
      alternates: group && group.length >= 2 ? group : undefined,
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

#!/usr/bin/env node
/**
 * One-shot, idempotent migration of the 37 markdown articles from the Symfony
 * site (data/pages/*.md) into src/content/articles/fr/.
 *
 * - Normalizes the three legacy date formats to YYYY-MM-DD.
 * - Renames meta_robots -> robots.
 * - Fixes the known broken og:image path of note-de-frais-modele-comptabilite.
 * - Rewrites blog.izika.com/wp-content/uploads hotlinks (http and https) to
 *   local /wp-content/uploads paths and records them in a manifest; missing
 *   files are downloaded from the live blog.
 * - Rewrites absolute links to izika.com into relative paths (so
 *   rehype-external-links never marks them nofollow).
 * - Strips the [TOC] placeholder and sets `toc: true` instead.
 * - Flags residual raw HTML (the old pipeline stripped it).
 */
import { readdir, readFile, writeFile, mkdir, access, copyFile } from 'node:fs/promises';
import path from 'node:path';
import matter from 'gray-matter';

const SOURCE = '/Users/thomas/Workspace/izika/website/data/pages';
const SOURCE_UPLOADS = '/Users/thomas/Workspace/izika/website/public/wp-content/uploads';
const DEST = new URL('../src/content/articles/fr/', import.meta.url).pathname;
const DEST_PUBLIC = new URL('../public/', import.meta.url).pathname;
const MANIFEST = new URL('../scripts/uploads-manifest.json', import.meta.url).pathname;

function normalizeDate(raw) {
  // Formats seen: "2020-02-09 11:02 +02:00" (quoted or not), 2020-06-19T00:00:00
  // (the latter is parsed into a Date object by the YAML parser).
  if (raw instanceof Date) return raw.toISOString().slice(0, 10);
  const s = String(raw).trim().replace(/^"|"$/g, '');
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!m) throw new Error(`Unparseable date: ${raw}`);
  return m[1];
}

const files = (await readdir(SOURCE)).filter((f) => f.endsWith('.md')).sort();
await mkdir(DEST, { recursive: true });

const articleSlugs = new Set(files.map((f) => path.basename(f, '.md')));

// Internal links must point directly at final /fr/... URLs (no 301 chains).
// Keys are legacy root-level paths found in article bodies; includes source
// typos and old redirect aliases.
const linkFixes = new Map([
  ['/indemnites-kilometriques', '/fr/indemnite-kilometrique'],
  ['/vtc', '/fr/vtc-indemnites-kilometriques'],
  ['/team', '/fr/team'],
  ['/solo', '/fr/solo'],
  ['/faq', '/fr/faq'],
  ['/pricing', '/fr/pricing'],
  ['/fonctionnalites', '/fr/fonctionnalites'],
  ['/calculateur-indemnites-kilometriques', '/fr/calculateur-indemnites-kilometriques'],
  [
    '/integration-integration-docorga-agenda-professionnel-sante',
    '/fr/integration-docorga-agenda-professionnel-sante',
  ],
  [
    '/google-agenda-pour-les-professionnels',
    '/fr/integration-google-agenda-pour-les-professionnels',
  ],
]);

function rewriteInternalLink(target) {
  const [pathname] = target.split(/[?#]/);
  if (linkFixes.has(pathname)) return target.replace(pathname, linkFixes.get(pathname));
  if (articleSlugs.has(pathname.replace(/^\//, ''))) return `/fr${target}`;
  return target; // assets, /wp-content, /content… stay as-is
}

const referencedUploads = new Set();
const warnings = [];

for (const file of files) {
  const slug = path.basename(file, '.md');
  const raw = await readFile(path.join(SOURCE, file), 'utf8');
  const { data, content } = matter(raw);

  const fm = {
    title: data.title,
    description: data.description,
    date: normalizeDate(data.date),
  };
  if (data.image) fm.image = data.image;
  if (data.note) fm.note = String(data.note).trim();
  if (data.meta_robots) fm.robots = data.meta_robots;

  // Known broken og:image path (directory on disk is ...-2020-comptabilite).
  if (slug === 'note-de-frais-modele-comptabilite') {
    fm.image = 'content/pages/note-de-frais-modele-2020-comptabilite/modele-note-de-frais.jpg';
  }

  let body = content;

  // [TOC] placeholder -> frontmatter flag.
  if (/^\[TOC\]\s*$/m.test(body)) {
    body = body.replace(/^\[TOC\]\s*$\n?/m, '');
    fm.toc = true;
  }

  // Localize blog.izika.com wp-content hotlinks.
  body = body.replace(
    /https?:\/\/blog\.izika\.com(\/wp-content\/uploads\/[^\s)"']+)/g,
    (_all, uploadPath) => {
      referencedUploads.add(decodeURI(uploadPath));
      return uploadPath;
    },
  );

  // Absolute internal links -> relative (avoids nofollow from rehype-external-links).
  body = body.replace(/https?:\/\/(?:www\.)?izika\.com\//g, '/');

  // Root-level internal links -> final /fr/... URLs (no 301 chains).
  body = body.replace(/\]\((\/[^)\s]+)([^)]*)\)/g, (_all, target, rest) => {
    return `](${rewriteInternalLink(target)}${rest})`;
  });

  // Residual raw HTML (old pipeline used html_input: strip).
  const htmlTags = body.match(/<[a-zA-Z][^>]*>/g);
  if (htmlTags) warnings.push(`${slug}: raw HTML found: ${[...new Set(htmlTags)].join(' ')}`);

  const out = matter.stringify(body, fm);
  await writeFile(path.join(DEST, file), out);
}

// Copy referenced uploads from the local mirror; download the missing ones.
let copied = 0;
const missing = [];
for (const uploadPath of [...referencedUploads].sort()) {
  const rel = uploadPath.replace('/wp-content/uploads/', '');
  const src = path.join(SOURCE_UPLOADS, rel);
  const dst = path.join(DEST_PUBLIC, 'wp-content/uploads', rel);
  await mkdir(path.dirname(dst), { recursive: true });
  try {
    await access(src);
    await copyFile(src, dst);
    copied++;
  } catch {
    missing.push(uploadPath);
  }
}

for (const uploadPath of missing) {
  const url = `https://blog.izika.com${uploadPath}`;
  const dst = path.join(DEST_PUBLIC, uploadPath.replace(/^\//, ''));
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    await writeFile(dst, Buffer.from(await res.arrayBuffer()));
    copied++;
    console.log(`downloaded: ${url}`);
  } catch (e) {
    warnings.push(`MISSING upload (copy manually): ${uploadPath} — ${e.message}`);
  }
}

await writeFile(MANIFEST, JSON.stringify([...referencedUploads].sort(), null, 2));

console.log(`Migrated ${files.length} articles to ${DEST}`);
console.log(`Uploads referenced: ${referencedUploads.size}, copied/downloaded: ${copied}`);
for (const w of warnings) console.warn(`WARN ${w}`);

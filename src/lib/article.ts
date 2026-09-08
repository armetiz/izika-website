import type { MarkdownHeading } from 'astro';

/** Mots par minute — vitesse de lecture silencieuse d'un adulte sur du contenu explicatif. */
const WORDS_PER_MINUTE = 200;

/**
 * Compte les mots du markdown brut, débarrassé de ce qui ne se lit pas :
 * frontmatter, blocs de code, syntaxe de tableau et URLs des liens. Sans ça,
 * les 11 pages de barème — 15 lignes de tableau chacune — annonceraient un
 * temps de lecture deux fois trop long.
 */
export function countWords(body: string): number {
  const text = body
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[|>#*_~-]/g, ' ');
  return text.split(/\s+/).filter(Boolean).length;
}

/** Durée de lecture en minutes, jamais nulle. */
export function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Titres retenus par le sommaire : h2 et h3, comme l'ancien [TOC] CommonMark. */
export function tocHeadings(headings: MarkdownHeading[]): MarkdownHeading[] {
  return headings.filter((h) => h.depth >= 2 && h.depth <= 3);
}

/**
 * Un sommaire ne s'affiche que s'il aide : au moins 4 sections ET un article
 * assez long pour qu'on le parcoure. Les 12 fiches d'intégration (144 à 438
 * mots) sont ainsi exclues — `integration-dolibarr-module-agenda` a bien ses
 * 4 titres, mais 201 mots. Le frontmatter `toc: true` force l'affichage pour
 * les cas limites (un article long découpé en 3 sections seulement).
 */
const MIN_HEADINGS = 4;
const MIN_WORDS = 400;

export function showToc(
  headings: MarkdownHeading[],
  words: number,
  forced: boolean,
): boolean {
  if (tocHeadings(headings).length === 0) return false;
  return forced || (tocHeadings(headings).length >= MIN_HEADINGS && words >= MIN_WORDS);
}

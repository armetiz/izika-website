import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Articles are per-locale directories (fr/, later en/, de/…): entry id is
 * "<locale>/<slug>". IK articles are country-specific content, not
 * translations of each other; `translationOf` marks the rare genuinely
 * translated article and drives its hreflang pair.
 */
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
    note: z.string().optional(),
    robots: z.string().optional(),
    toc: z.boolean().default(false),
    translationOf: z.string().optional(),
  }),
});

const solutions = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/solutions' }),
  // Schema is defined in Phase 5 from the ~40 blocks of _solutions_base.html.twig.
  schema: z.object({}).passthrough(),
});

export const collections = { articles, solutions };

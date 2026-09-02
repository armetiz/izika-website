import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { routes, type RouteKey } from './i18n/routes';

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

/** Image with alt text (title is the optional HTML title attribute). */
const solutionImage = z.object({
  src: z.string(),
  alt: z.string(),
  title: z.string().optional(),
});

const routeKeys = Object.keys(routes) as [RouteKey, ...RouteKey[]];

/**
 * Solution landing pages — one YAML per page, mirroring the block structure of
 * the old _solutions_base.html.twig. Fields left optional carry defaults from
 * the base template, rendered by SolutionPage.astro:
 * - head.ctaHref → site.joinUrl; head.primaryCtaText → 'Tester izika gratuitement'
 * - featureHighlights.ctaText → 'Tester izika'
 * - customerCase.ctaBlock.buttonUrl → site.joinUrl
 * The mid-page yellow CTA band ("Votre temps est précieux !") had no per-page
 * override in any child template, so it is hardcoded in SolutionPage.astro.
 * `text`/`intro` fields may contain inline HTML (p, ul, li, strong).
 */
const solutions = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/solutions' }),
  schema: z.object({
    /** <title> / meta description (meta_title / meta_description in Twig). */
    meta: z.object({
      title: z.string(),
      description: z.string(),
    }),
    /** eventContext of the data-track-click payloads on this page. */
    trackingContext: z.string(),
    /** Hero section. */
    head: z.object({
      title1: z.string(),
      title2: z.string(),
      catch: z.string(),
      ctaHref: z.string().optional(),
      primaryCtaText: z.string().optional(),
      secondaryCta: z
        .object({ routeKey: z.enum(routeKeys), text: z.string() })
        .optional(),
      image: solutionImage,
    }),
    /** Checklist + signup card. */
    featureHighlights: z.object({
      title: z.string(),
      image: solutionImage,
      items: z.array(z.object({ title: z.string(), text: z.string() })),
      ctaText: z.string().optional(),
    }),
    /** Alternating rows on beige + testimonial with Trustpilot rating. */
    benefits: z.object({
      title: z.string(),
      items: z
        .array(
          z.object({
            title: z.string(),
            text: z.string(),
            image: z.string(),
            imageAlt: z.string(),
          }),
        )
        .optional(),
      testimonial: z.object({
        quote: z.string(),
        avatar: z.string(),
        avatarAlt: z.string(),
        name: z.string(),
        companyTitle: z.string(),
      }),
    }),
    /** Customer story: intro, 3 gains, testimonial, final CTA card. */
    customerCase: z.object({
      title: z.string(),
      intro: z.string(),
      avatar: z.string(),
      avatarAlt: z.string(),
      gainsTitle: z.string(),
      gains: z
        .array(
          z.object({ image: z.string(), imageAlt: z.string(), text: z.string() }),
        )
        .length(3),
      testimonial: z.object({
        quote: z.string(),
        name: z.string(),
        companyTitle: z.string(),
      }),
      ctaBlock: z.object({
        text: z.string(),
        buttonUrl: z.string().optional(),
        buttonText: z.string().optional(),
      }),
    }),
  }),
});

export const collections = { articles, solutions };

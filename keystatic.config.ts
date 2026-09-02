import { config, collection, fields } from '@keystatic/core';

// Local mode in dev (edits hit the working tree, no OAuth). GitHub mode in
// production: editors use the web UI, every save is a commit that triggers a
// Cloudflare Pages rebuild. Adjust owner/name when the GitHub repo exists.
const storage = import.meta.env.PROD
  ? ({ kind: 'github', repo: { owner: 'izika', name: 'www' } } as const)
  : ({ kind: 'local' } as const);

export default config({
  storage,
  ui: { brand: { name: 'izika' } },
  collections: {
    articlesFr: collection({
      label: 'Articles (FR)',
      path: 'src/content/articles/fr/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['date'],
      schema: {
        title: fields.slug({
          name: { label: 'Titre (meta title)', validation: { isRequired: true } },
        }),
        description: fields.text({
          label: 'Meta description',
          multiline: true,
          validation: { isRequired: true },
        }),
        date: fields.date({
          label: 'Date de publication',
          validation: { isRequired: true },
        }),
        image: fields.text({
          label: 'Image OG (chemin /content/… ou /assets/…)',
        }),
        note: fields.text({
          label: 'Note éditoriale (jamais publiée)',
          multiline: true,
        }),
        robots: fields.text({
          label: 'Meta robots (ex : noindex, nofollow)',
        }),
        toc: fields.checkbox({
          label: 'Afficher le sommaire',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: 'Contenu', extension: 'md' }),
      },
    }),
  },
});

# izika.com — site vitrine

Site vitrine d'izika, migré de Symfony + Twig vers **Astro + Keystatic**.
Build 100 % statique, déployé sur Cloudflare Pages.

## Commandes

```sh
npm run dev               # serveur de dev + admin Keystatic sur /keystatic
npm run build             # build statique dans dist/ (admin désactivé)
npm run migrate:articles  # (one-shot) re-migre les articles depuis l'ancien repo
npx astro check           # vérification TypeScript
./migration/check-redirects.sh <base-url>  # vérifie les 301 sur un déploiement
```

## Architecture

- `src/pages/fr/` — pages françaises ; une future locale = un nouveau dossier
  (`en/`, `de/`…). Les articles sont servis par `fr/[slug].astro`.
- `src/i18n/routes.ts` — **source de vérité unique** des routes éditoriales :
  liens internes (`localizedPath`), hreflang et sitemap itèrent cette table.
  Une page ne peut pas exister sans être dans le sitemap.
- `src/i18n/fr.ts` — dictionnaire du chrome (nav, footer). `type Dict` dérive
  de ce fichier : une locale incomplète ne compile pas.
- `src/content/articles/<locale>/` — collections d'articles par locale,
  éditées via Keystatic (voir `docs/keystatic-admin.md`). Les articles IK sont
  spécifiques à chaque pays, pas des traductions.
- `src/content/solutions/fr/*.yaml` — pages « solutions » data-driven,
  rendues par `SolutionPage.astro`.
- `src/data/` — données partagées entre UI et JSON-LD (avis Trustpilot, FAQ) :
  jamais de littéraux dans `src/seo/schema.ts`.
- `src/components/Seo.astro` — canonique auto-référencée, og:url, hreflang
  (émis seulement quand une page existe en ≥ 2 locales).
- `public/_redirects` — règles 301 statiques ; les 37 redirections d'articles
  historiques (`/{slug}` → `/fr/{slug}`) sont **générées au build** par
  `src/integrations/legacy-redirects.mjs`.
- `src/pages/sitemap.xml.ts` — sitemap fait main (routes × locales + articles
  avec lastmod).

## Ajouter une locale (ex. `de`)

1. `src/i18n/locales.ts` : ajouter `'de'` au tuple → le typage force la suite.
2. `src/i18n/de.ts` : dictionnaire complet (les clés manquantes = erreurs).
3. `src/i18n/routes.ts` : ajouter le slug `de` de chaque route lancée
   (`features: { fr: 'fonctionnalites', de: 'funktionen' }`). Une route sans
   slug `de` n'existe pas en allemand — les lancements partiels sont normaux.
4. Créer `src/pages/de/…` en réutilisant les composants avec le dico `de`.
5. Articles : nouveau dossier `src/content/articles/de/` + collection
   Keystatic dédiée (contenu original, pas des traductions).
6. hreflang, sitemap et sélecteur de langue s'étendent automatiquement.

## Analytics

IDs via variables d'env `PUBLIC_*` (voir `.env.example`) ; vide = script non
rendu. `public/assets/analytics.js` (bundle précompilé) gère les attributs
`data-track-click` posés par `TrackedLink.astro`.

## Migration depuis l'ancien site

Voir `/Users/thomas/Workspace/izika/website` (repo source, conservé en
lecture seule) et `migration/` pour la vérification des redirections.
La checklist SEO post-lancement est dans le plan de migration.

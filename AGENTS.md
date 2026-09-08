## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Organisation des composants

`src/components/` est découpé par rôle :

- `ui/` — briques génériques et sans domaine (`Card`, `GradientHero`, `TrackedLink`…)
- `sections/` — blocs de page marketing réutilisables (`Landing*`, `LogoCloud`, `CtaCalendarCard`)
- `layout/` — chrome du site (`Header`, `Footer`, `SolutionsMenu`, `CountrySwitcher`)
- `head/` — balises `<head>` et scripts (`Seo`, `JsonLd`, `HreflangTags`, `Analytics`)
- `templates/` — pages complètes composées, pilotées par les données de `src/data/`
  et instanciées par une route de `src/pages/<market>/`
- `calculator/` — simulateurs React par marché et leur `shared.tsx`
- `legal/` — `LegalShell` et les corps de textes légaux

Une route dans `src/pages/` reste fine : elle choisit le marché, importe la copie
depuis `src/data/` et délègue le rendu à un `templates/`.

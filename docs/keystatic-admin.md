# Admin Keystatic

## En développement (aujourd'hui)

L'admin est monté par le serveur de dev uniquement :

```sh
npm run dev
# → http://127.0.0.1:4321/keystatic
```

Mode `local` : chaque sauvegarde écrit directement dans
`src/content/articles/fr/` — on relit le diff git et on committe.

Le build public (`npm run build`) désactive l'intégration (`KEYSTATIC_ADMIN=0`
dans le script) : le site déployé est 100 % statique, aucune route serveur.

## Pourquoi l'admin n'est pas déployé sur Cloudflare Pages

L'API de Keystatic n'est pas compatible avec le runtime Workers (workerd)
aujourd'hui (`exports is not defined` — interop CJS/ESM, constaté avec
@keystatic/astro 6.0.0 + Astro 7). Le site public n'en a pas besoin ; seul
l'admin est concerné.

## Pour activer l'édition web (mode GitHub) plus tard

1. Créer le repo GitHub et ajuster `owner`/`name` dans `keystatic.config.ts`.
2. Créer la GitHub App via l'écran de setup de Keystatic (`/keystatic` en dev
   vous guide) ; récupérer `KEYSTATIC_GITHUB_CLIENT_ID`,
   `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`.
3. Déployer un **second** projet minuscule dédié à l'admin, depuis ce même
   repo, avec `KEYSTATIC_ADMIN=1` et un adaptateur **Node** (`@astrojs/node`,
   ex. sur Railway/Fly/Render) — ou re-tester `@astrojs/cloudflare` quand la
   compatibilité workerd de Keystatic sera corrigée (suivre
   https://github.com/Thinkmill/keystatic/issues).
4. Chaque sauvegarde d'un éditeur = commit sur le repo = rebuild Cloudflare
   Pages du site public. L'admin et le site sont découplés par conception.

## Vérification à faire à la main (go/no-go éditeur)

Ouvrir `/keystatic` en dev, éditer un article barème (grosse table),
sauvegarder, puis vérifier `git diff` : seules les modifications voulues
doivent apparaître (tables intactes). Le parsing Markdoc des 37 articles est
déjà validé par script, mais l'aller-retour de l'éditeur visuel doit être
confirmé une fois dans le navigateur.

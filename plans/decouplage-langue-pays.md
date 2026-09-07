# Marché anglais (/en) — Reste à faire avant lancement

État au 2026-09-03 : le site /en est techniquement complet — 20 pages (vitrine, 4 landings, 5 solutions, 3 pages légales, calculateur HMRC + article 2026/27), hreflang `en-GB`/`fr-FR`/x-default, sitemap, méga-menu, page 404 bilingue. Ciblage acté : **Royaume-Uni** (signaux SEO en-GB), tarifs en EUR pour le moment. Ce document liste uniquement ce qui reste à faire, par équipe.

## Juridique — bloquant

- [ ] Faire relire par un juriste les 3 pages légales anglaises : `/en/legal-notice`, `/en/privacy-policy`, `/en/terms`. Ce sont des traductions de courtoisie ; chaque page affiche « the French version prevails » et le droit applicable reste le droit français (art. 29 des terms). Valider cette approche ou fournir des versions dédiées.

## Produit / App — bloquant

- [ ] Confirmer que le parcours post-clic est en anglais : inscription et interface `go.izika.com`, onboarding, e-mails transactionnels, chat support « 24/7 ».
- [ ] **Taux HMRC dans l'app** : le site UK promet des rapports « current rates included ». Aujourd'hui l'app précharge les barèmes français (+ barème personnalisé). Intégrer nativement les taux AMAP (2026/27 : 55p les 10 000 premiers miles puis 25p pour voitures/vans, 24p motos, 20p vélos, +5p/passager/mile — miles et £) ou assumer le barème personnalisé et ajuster la promesse du site.
- [ ] Une fois tranché : réviser la réponse FAQ « Which mileage allowance scales are available? » sur `/en/faq` (elle décrit l'état actuel, contradictoire avec la promesse du calculateur).

## Marketing / Contenu

- [ ] **Consentement Axeptio en anglais** : créer la version EN dans le dashboard Axeptio puis remplacer `cookiesVersion: 'izika-fr-EU'` dans `src/i18n/markets.ts` (TODO en commentaire). En attendant, les visiteurs /en voient le bandeau cookies en français.
- [ ] **Preuve sociale** : `/en` n'affiche aucune note ni avis (les avis Trustpilot sont sur fr.trustpilot.com, en français). Ouvrir une présence anglaise (www.trustpilot.com, G2, Capterra…) puis renseigner `trustpilot` dans le Market en — les blocs réapparaîtront automatiquement.
- [ ] **Socle éditorial UK** : 1 article aujourd'hui (`/en/hmrc-mileage-rates-2026`) contre ~30 en fr. Sujets candidats : mileage log requirements, guide Mileage Allowance Relief / P87, AMAP vs AFR/AER (company cars), electric vehicle mileage. Les articles se créent dans Keystatic (collection « Articles (EN) ») ou en markdown dans `src/content/articles/en/`.
- [ ] **Vidéo démo** en anglais ou sous-titrée (la vidéo YouTube actuelle est FR ; le bouton « Démo vidéo » a été retiré de la home /en en attendant).
- [ ] E-mails Brevo (marketing) en anglais.

## Design / Assets

- [ ] **Bannière OpenGraph anglaise** : l'image partagée sur les réseaux pour toutes les pages /en est aujourd'hui la bannière française (« indemnités kilométriques automatiques »). Fournir un visuel EN ; côté dev, le champ passera dans le Market (aujourd'hui `site.defaultOgImage`, partagé).
- [ ] **Captures d'écran produit en anglais** : tous les visuels app du site /en sont en français (héros, carrousels des landings, badge « CERTIFIÉ CONFORME » du méga-menu, rapports en €/km). Dépend de l'app en anglais. Priorité : hero home, visuels du calculateur, méga-menu.

## SEO / Growth

- [ ] Décision `/ → /en` : la racine redirige vers `/fr` et le hreflang x-default pointe `/fr` (constante `xDefaultMarket` dans `src/i18n/markets.ts` — une ligne à changer le jour venu).
- [ ] Soumettre le sitemap mis à jour dans Google Search Console et Bing ; surveiller le rapport hreflang (paires fr-FR/en-GB actives sur toutes les pages équivalentes).
- [ ] Test manuel du funnel complet en anglais avant l'annonce (join → connexion agenda → premier rapport).

## Dev — dette assumée, non bloquante

- [ ] Hub `/en/articles` : inexistant (voulu tant qu'il n'y a qu'un article). Avant de l'ouvrir : internationaliser la copy FR inline de `src/pages/[market]/articles/index.astro` puis ajouter `articles` au marché en dans `src/i18n/routes.ts`.
- [ ] `TrackedLink` garde `site.joinUrl` comme href par défaut (cross-marché, même URL aujourd'hui) — passer par une prop `market` si les URLs d'app divergent un jour (TODO dans `src/config/site.ts`).
- [ ] Version anglaise du consentement : voir Axeptio ci-dessus (le champ est prêt).

## Langues portées par l'équipe

L'équipe est francophone et assure le support en **français et en anglais**,
dans aucune autre langue. Le marché anglais est donc, de ce point de vue, le
seul marché supplémentaire qui ne coûte rien : le support « 24/7 » promis sur
`/en` est tenable tel quel, et la copy anglaise est relisible en interne.

Ce n'est plus vrai dès le marché suivant s'il n'est ni anglophone ni
francophone — voir `plans/pays/README.md`, section « Ce que l'équipe peut
porter, linguistiquement », et les conséquences tirées dans
`plans/pays/de-allemagne.md`.

## Rappels d'architecture (pour les équipes qui ajoutent du contenu)

- Une page éditoriale existe dans un marché ssi sa route est déclarée dans `src/i18n/routes.ts` ; une solution ssi son slug est dans `solutionSlugs` **et** son YAML dans `src/content/solutions/<marché>/` (le build échoue sinon, dans les deux sens). Menu, footer, hreflang et sitemap suivent automatiquement.
- Les textes du chrome partagé vivent dans `src/i18n/fr.ts` / `en.ts` (jamais en dur dans un composant partagé) ; la copy marketing longue vit dans les pages ou les modules `*.fr.ts` / `*.en.ts`.
- Ajouter un marché = ajouter l'id dans `marketIds` : le compilateur liste exactement ce qui manque (Market, dictionnaire si nouvelle langue, routes, pages).

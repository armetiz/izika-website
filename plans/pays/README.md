# plans/pays — suivi de l'internationalisation

Répertoire de suivi de l'ouverture de nouveaux pays chez izika : quels marchés
viser, dans quel ordre, et où en est chacun. Complète
`plans/decouplage-langue-pays.md`, qui reste le reste-à-faire du seul marché
déjà lancé côté site (`/en`, Royaume-Uni).

## Contenu

| Fichier | Rôle |
|---|---|
| `00-priorisation-marches.md` | Analyse Europe + monde : compatibilité de chaque pays avec le moteur izika, structure de son barème, langues. C'est le document de décision. |

Les fiches pays détaillées viendront ensuite, une par pays engagé, nommées
`<iso2>-<pays>.md` (`ie-irlande.md`, `be-belgique.md`…). Une fiche pays contient
le barème complet sourcé, le reste-à-faire par équipe (modèle : le découpage
Juridique / Produit / Marketing / Design / SEO / Dev de
`plans/decouplage-langue-pays.md`) et l'état d'avancement.

## Deux états d'avancement, pas un

La couverture d'un pays avance sur deux jambes indépendantes. Ne jamais les
confondre dans un tableau de suivi :

- **`app`** — le barème du pays est embarqué nativement dans `go.izika.com`.
  Aujourd'hui : **France uniquement**. Partout ailleurs, l'utilisateur doit
  saisir un barème personnalisé à la main.
- **`site`** — le marché vitrine est en production : pages, dictionnaire,
  routes, SEO, calculateur, contenu. Aujourd'hui : **France et Royaume-Uni**.

Le Royaume-Uni est donc en `site` sans `app` : c'est un pays **à intégrer**, pas
un pays intégré. Le site promet des rapports « current rates included » que
l'app ne sait pas encore produire.

## Méthode de priorisation

Deux axes, appliqués dans cet ordre :

1. **Compatibilité du barème** avec le moteur izika, sur une échelle A → D
   définie dans `00-priorisation-marches.md`. Le moteur calcule un montant
   affine par morceaux en distance : `montant = d × coef + fixe` par tranche.
2. **Potentiel et coût d'ouverture** en départage : taille du marché, langue
   déjà couverte par le site, réutilisation de l'entité juridique et de la
   devise, concurrence locale.

## Où vit la vérité technique

Le suivi ci-dessus décrit ; il ne décide pas. Les sources de vérité du code
restent :

- `src/i18n/markets.ts` — registre des marchés (`marketIds`), un `Market` par
  déploiement pays.
- `src/i18n/countries.ts` — pays servis (`countryIds`) et régions du sélecteur
  de pays ; leurs noms sont traduits dans chaque dictionnaire (`dict.countries`,
  `dict.regions`). C'est ce que le visiteur choisit — la langue vient ensuite.
- `src/i18n/languages.ts` — langues du chrome et leurs endonymes.
- `src/i18n/routes.ts` — quelles pages existent dans quel marché (la partialité
  des routes est le feature flag par marché).
- `src/data/bareme-ik.ts` — barème français (`Tranche { maxKm, coef, fixe }`).
- `src/data/mileage-uk.ts` — barème HMRC AMAP (`RateBand { maxMiles, rate }`).
- `README.md`, section « Ajouter une locale » — la recette pas à pas.

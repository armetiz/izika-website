# plans/pays — suivi de l'internationalisation

Répertoire de suivi de l'ouverture de nouveaux pays chez izika : quels marchés
viser, dans quel ordre, et où en est chacun. Complète
`plans/decouplage-langue-pays.md`, qui reste le reste-à-faire du seul marché
déjà lancé côté site (`/uk`, Royaume-Uni).

## Contenu

| Fichier | Rôle |
|---|---|
| `00-priorisation-marches.md` | Analyse Europe + monde : compatibilité de chaque pays avec le moteur izika, structure de son barème, langues. C'est le document de décision. |
| `02-bonnes-pratiques-i18n-saas.md` | Cadrage : ce qui marche et ne marche pas dans l'internationalisation d'un SaaS, confronté à l'état d'izika. À lire avant la procédure. |
| `01-procedure-ouverture-marche.md` | **La procédure répétable** : les trois couches de garantie du dépôt, l'inventaire de ce que rien ne vérifie, et les six phases d'une ouverture. À dérouler à chaque marché. |
| `03-inventaire-assets.md` | **La convention d'assets et le lot par marché** : arbre neutre + un arbre par marché sous `public/assets/markets/`, garde-fous de build, et les 56 visuels qu'une ouverture demande. Référence de la rubrique « Design / Assets » des fiches pays. |
| `de-allemagne.md` | Plan de déploiement marketing du marché `/de` — première ouverture décidée. |
| `ch-suisse.md` | Plan du marché `/ch-fr` — **construit et buildé au 2026-09-07** ; reste à faire hors dépôt (TVA, validation juridique, TWINT). Cas de test « langue maîtrisée », premier marché non-euro. |
| `be-belgique.md` | Plan du marché `/be-fr` — cas de test « langue maîtrisée », barème à indexation instable. |

Les fiches pays suivantes se nomment `<iso2>-<pays>.md` (`ie-irlande.md`,
`be-belgique.md`…), sur le modèle de `de-allemagne.md`. Une fiche pays contient
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
  routes, SEO, calculateur, contenu. Aujourd'hui : **France, Royaume-Uni et
  Suisse romande** (`/ch-fr`, construit le 2026-09-07).

Le Royaume-Uni est donc en `site` sans `app` : c'est un pays **à intégrer**, pas
un pays intégré. Le site promet des rapports « current rates included » que
l'app ne sait pas encore produire.

La Suisse est le cas le moins tendu des trois : son forfait plat se saisit
sans peine dans le barème personnalisé, et `/ch-fr` ne promet nulle part un
barème embarqué — il dit au contraire que le taux vient du règlement de frais
de l'entreprise. Restent à confirmer côté app la saisie d'un taux en CHF et
l'affichage d'une devise autre que l'euro dans les rapports.

## Ce que l'équipe peut porter, linguistiquement

Contrainte structurelle, à appliquer avant toute autre considération.

L'équipe izika est francophone. Elle assure le support client en **français et
en anglais**, et **dans aucune autre langue**. Elle n'a par ailleurs aucune
maîtrise des subtilités des autres langues : sur une question de style, de
registre ou de culture propre à l'allemand, au néerlandais ou à l'italien, elle
ne peut pas trancher seule.

Deux conséquences pratiques, qui valent pour tous les documents de ce
répertoire :

1. **La langue de support est un critère de priorisation**, au même titre que
   la compatibilité du barème. Un marché anglophone (Irlande, Canada,
   Australie, Nouvelle-Zélande) ou francophone (Belgique `fr`, Suisse romande,
   Luxembourg) ne coûte rien de ce côté. Tout autre marché impose un choix
   explicite : assumer et **annoncer** un support en anglais, ou financer une
   ressource externe. Ce choix se prend avant d'écrire la copy, parce qu'il
   apparaît dans la FAQ, dans la page conformité et dans le pied de page.
2. **Aucune copy en langue tierce ne se valide sans glose française.** Tout
   texte allemand, néerlandais ou italien livré à l'équipe doit être accompagné
   de sa retraduction en français, faute de quoi personne ici ne peut en
   valider le fond. Cela vaut a fortiori pour les textes juridiquement
   engageants — Impressum, AGB, Datenschutzerklärung : demander au prestataire
   un résumé français **en plus** du texte, l'équipe ne pouvant pas les
   auto-vérifier.

Ce n'est pas un obstacle à l'ouverture d'un marché non anglophone ni
francophone, c'est un poste de coût et un délai à inscrire au plan dès le
départ.

## Méthode de priorisation

Deux axes, appliqués dans cet ordre :

1. **Compatibilité du barème** avec le moteur izika, sur une échelle A → D
   définie dans `00-priorisation-marches.md`. Le moteur calcule un montant
   affine par morceaux en distance : `montant = d × coef + fixe` par tranche.
2. **Langue portable par l'équipe** — voir la section précédente. Un marché
   dont la langue n'est ni le français ni l'anglais n'est pas disqualifié, mais
   il embarque une décision sur la langue de support et un circuit de
   relecture qui doivent figurer au plan.
3. **Potentiel et coût d'ouverture** en départage : taille du marché, langue
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

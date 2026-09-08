# Procédure d'ouverture d'un marché

État au 2026-09-07. Ce document ne décrit aucun pays : il décrit **comment on
en ouvre un**. Il est tiré de l'observation d'un marché livré (`/uk`,
Royaume-Uni) et des plans d'ouverture rédigés depuis (`de-allemagne.md`,
`ch-suisse.md`, `be-belgique.md`).

Il a deux usages : servir de checklist à la prochaine ouverture, et servir de
grille de relecture aux plans pays existants.

## Le constat qui structure tout : trois couches de garantie

Le dépôt garantit certaines choses automatiquement et d'autres pas du tout.
Savoir dans quelle couche tombe une tâche dit immédiatement quelle attention
elle demande.

| Couche | Mécanisme | Ce qui se passe en cas d'oubli |
|---|---|---|
| **1 — Typage** | `Record<MarketId, …>`, `Record<Language, …>`, `Record<CountryId, …>`, `Dict` dérivé de `fr.ts` | `astro check` échoue. **Impossible d'oublier.** |
| **2 — Garde-fous de build** | 5 `throw` dans `src/i18n/index.ts` et les routes `[market]/` | Le build échoue. **Impossible de publier une incohérence de données.** |
| **3 — Rien** | Champs `string` du `Market`, variables d'env, assets, dashboards tiers, textes juridiques, parité de l'app | **Rien ne se passe. Le site part en production avec le défaut.** |

### Couche 1 — ce que le compilateur exige déjà

- `MARKETS: Record<MarketId, Market>` — ajouter un id dans `marketIds` casse le
  build jusqu'à ce que le `Market` complet existe.
- `dictionaries: Record<Language, Dict>` et `Dict` dérivé de `src/i18n/fr.ts` —
  une clé manquante dans une locale ne compile pas.
- `COUNTRIES: Record<CountryId, Country>` et `dict.countries` / `dict.regions`
  indexés par `CountryId` / `RegionId` — un pays sans nom traduit ne compile
  pas.
- `languageEndonym: Record<Language, string>` — une langue sans endonyme ne
  compile pas.
- `routes` et `solutionSlugs` en `Partial<Record<MarketId, string>>` — la
  partialité est **volontaire** : elle est le feature flag par marché.

### Couche 2 — ce que le build refuse

- Un `id` de contenu dont le premier segment n'est pas un marché
  (`splitContentId`).
- Un slug d'article qui entre en collision avec un slug de route éditoriale.
- Un article dans un répertoire orphelin (marché inexistant).
- Une solution déclarée dans `solutionSlugs` sans YAML correspondant — **et**
  un YAML sans slug déclaré. Les deux sens échouent.

Conséquence utile : **une page ne peut pas exister sans être dans le sitemap**,
et hreflang, menu, pied de page et sélecteur de pays se dérivent tous de
`routes.ts`. Toute cette famille est gratuite.

### Couche 3 — l'angle mort

C'est là que tout s'est joué sur `/uk`. Les défauts connus de ce marché,
recensés dans `plans/decouplage-langue-pays.md`, tombent **tous** dans la
couche 3 — aucun n'est un oubli de code, tous sont des oublis de choses que
rien ne vérifie :

| Défaut `/uk` constaté | Pourquoi rien ne l'a arrêté |
|---|---|
| `cookiesVersion: 'izika-fr-EU'` — bandeau cookies en français sur `/uk` | `cookiesVersion` est un `string`. N'importe quelle valeur compile. |
| Tarifs affichés en EUR sur un marché GBP | `pricing: { yearly: string }` et `currency: string` sont indépendants. |
| Bannière OpenGraph française sur toutes les pages `/uk` | `defaultOgImage` est dans `src/config/site.ts`, **global**, pas sur le `Market`. |
| Captures d'écran produit en français | Les assets ne sont pas dans le système de types. Voir `03-inventaire-assets.md`. |
| Pages légales publiées en « traduction de courtoisie » non relue | Un texte juridique est du contenu, pas un type. |
| Le site promet des taux HMRC que l'app ne calcule pas | **Aucun lien** entre l'état du site et l'état de l'app. |
| Aucune preuve sociale au lancement | `trustpilot: null` est une valeur légitime. |
| Segment d'URL `/en` — une langue là où le modèle attend un pays (corrigé en `/uk` le 07/09/2026) | `MarketId` est une union de littéraux libres : `'en'` compile aussi bien que `'uk'`. Rien ne relie le segment au `country` du `Market`. |

**La règle qui en découle : le typage couvre la structure, jamais la
véracité.** Le compilateur garantit qu'un marché a une `cookiesVersion`, pas
que ce soit la bonne. Il garantit qu'un marché a un prix, pas qu'il soit dans
la bonne devise. Toute la procédure ci-dessous n'existe que pour couvrir la
couche 3.

### Le contre-exemple encourageant

Le hub `/articles` était, au lancement de `/uk`, du français en dur dans un
composant partagé — dette explicitement notée. Elle a été payée depuis : la
copy vit maintenant dans `dict.articlesHub`, donc dans la couche 1. Le
mécanisme fonctionne quand on l'utilise ; il ne se déclenche pas tout seul.

## Inventaire de la couche 3

La checklist qui n'existe nulle part dans le code. À dérouler intégralement à
chaque ouverture.

| Élément | Où | Piège |
|---|---|---|
| `currency` | `Market` | Doit être cohérent avec `pricing` — rien ne le vérifie |
| `numberLocale`, `hreflang`, `ogLocale`, `schemaInLanguage` | `Market` | Quatre chaînes qui doivent s'accorder entre elles et avec le couple pays × langue |
| `pricing.yearly` / `.monthly` | `Market` | Montant **et** devise **et** mention HT/TTC selon le droit local |
| `cookiesVersion` | `Market` | Doit exister côté dashboard Axeptio, pas seulement dans le code |
| `trustpilot` | `Market` | `null` compile ; décider si badge, widget, ou rien |
| `legal.entity` / `footerLines` | `Market` | Mentions imposées par le droit **du pays visé**, pas du nôtre |
| `joinUrl` / `appUrl` | `Market` | Pointent tous vers la même app aujourd'hui |
| Bannière OpenGraph | `src/config/site.ts` — **global** | Un seul visuel pour tous les marchés — inventaire et voies dans `03-inventaire-assets.md` |
| Captures produit, badges, visuels | `public/assets/` | Dépendent de l'app dans la langue du marché — inventaire et voies dans `03-inventaire-assets.md` |
| Variables `PUBLIC_*` | Cloudflare Pages | Build-time : une variable absente rend un script muet sans erreur |
| Textes juridiques | `src/pages/<market>/` | Relecture par un juriste **du pays** |
| Parité de l'app | hors dépôt | Le site peut promettre ce que l'app ne fait pas |
| Langue du support | hors dépôt | L'équipe couvre le français et l'anglais, rien d'autre |
| TVA, OSS, représentant fiscal | hors dépôt | Hors UE, rien du socle européen ne se transpose |
| Moyens de paiement locaux | hors dépôt | Une absence coûte des conversions de façon invisible |
| Hypothèses du module de barème | `src/data/<barème>.ts` | « Un barème par an » est une hypothèse, pas un fait — voir la Belgique |
| Dictionnaire partagé entre marchés | `src/i18n/<lang>.ts` | Une copy ajoutée pour un marché s'impose à l'autre |

## La procédure, en six phases

### Phase 0 — Qualification (avant toute décision)

Cinq questions. Une seule réponse bloquante suffit à ne pas ouvrir le marché.

1. **Le pays a-t-il un barème officiel au kilomètre ?** Sinon, pas de promesse
   de conformité possible — c'est le niveau D de `00-priorisation-marches.md`.
2. **Le barème s'écrit-il `d × coef + fixe` ?** Niveaux A et B : oui. Niveau C :
   il manque un paramètre externe, c'est une extension du moteur, pas un jeu de
   données.
3. **L'app peut-elle servir ce barème aujourd'hui ?** Nativement, ou via le
   barème personnalisé. Si non, le marché part avec l'écart site / app du
   Royaume-Uni — c'est un choix, il doit être explicite.
4. **L'équipe parle-t-elle la langue ?** Français et anglais : oui. Sinon,
   voir `README.md`, section « Ce que l'équipe peut porter, linguistiquement » :
   arbitrage de la langue de support et circuit de glose française à
   contractualiser **avant** la phase 3.
5. **Le juridique local impose-t-il une page ou une mention qu'on n'a pas ?**
   Impressum allemand, représentant local, mention HT/TTC, droit de
   rétractation.
6. **Le pays est-il hors zone euro, ou hors UE ?** Une devise nouvelle touche
   l'affichage, la facturation et le niveau de prix. Hors UE, le guichet OSS ne
   s'applique pas : il faut instruire la TVA locale et l'éventuel représentant
   fiscal. C'est un coût **récurrent**, et il ne dépend pas de l'équipe
   produit.
7. **La langue est-elle déjà servie par un marché existant ?** Si oui, deux
   contraintes nouvelles apparaissent : le dictionnaire est **partagé**, donc
   aucune copy spécifique à un marché ne peut y vivre ; et les deux marchés se
   **cannibalisent** en SEO tant que le nouveau n'a pas de pages sans
   équivalent.

Sortie de phase : une ligne dans le tableau de `00-priorisation-marches.md` et
la décision d'ouvrir ou non.

### Phase 1 — Décisions à acter

À trancher **avant** d'écrire une ligne, parce que chacune se propage dans la
copy de plusieurs pages :

- Périmètre : parité complète ou tête de pont — la partialité des routes rend
  le lancement partiel normal.
- Segment d'URL et `MarketId` : alias court (`/de`) ou pays-langue
  (`/be-fr`). **Le segment est toujours le pays, jamais la langue** — alias
  court seulement quand le pays n'est servi que dans une langue. C'est la
  seule règle du socle qui a déjà été enfreinte : le marché britannique a été
  ouvert sous `/en` et renommé en `/uk` le 07/09/2026, parce qu'un segment de
  langue ne peut pas héberger l'Irlande, les États-Unis ni l'Australie, qui
  sont la suite de la piste anglophone. Le renommage n'a rien coûté (site pas
  encore en production) ; sur un marché indexé, il aurait coûté des 301 et de
  l'équité SEO.
- Registre et ton de la copy.
- **Langue du support**, et ce qu'on en dit publiquement.
- Devise affichée et mention fiscale.
- Preuve sociale : badge, widget, ou rien.
- Ce que la page conformité a le droit d'affirmer.

Sortie de phase : le tableau « Décisions actées » en tête de la fiche pays.

### Phase 2 — Socle technique

Ordre imposé par le compilateur ; chaque étape ne compile qu'une fois la
précédente faite. C'est la partie facile et elle ne se planifie pas :
`npx astro check` liste exactement ce qui manque.

1. `src/i18n/countries.ts` — `countryIds` + `COUNTRIES`.
2. `src/i18n/languages.ts` — si langue nouvelle : `languages` + `languageEndonym`.
3. `src/i18n/markets.ts` — `marketIds` + le `Market`.
4. Nom du pays dans **tous** les dictionnaires existants (`dict.countries`).
5. `src/i18n/<lang>.ts` — dictionnaire complet, si langue nouvelle.
6. `src/i18n/routes.ts` — slugs des routes lancées, `solutionsBase`,
   `solutionSlugs`.
7. `src/pages/<market>/` — les pages, réutilisant les composants partagés.
8. `src/data/<barème>.ts` — module pays-spécifique, **jamais** une abstraction
   commune : c'est la règle posée par les en-têtes de `bareme-ik.ts` et
   `mileage-uk.ts`.

### Phase 3 — Contenu

Le vrai coût. Ordre de grandeur mesuré sur les modules `.uk.ts` : environ
1 650 lignes pour une parité complète, dictionnaire et cinq YAML de solutions
inclus.

Trois natures de contenu, à ne pas confondre :

- **Traduisible** — chrome, libellés d'interface.
- **Adaptable** — copy marketing : la structure tient, les références changent
  (organisme de sécurité sociale, profession comptable de référence, unités).
- **À réécrire** — tout ce qui affirme un fait local : barème, conformité,
  témoignages, pages légales. Les articles sont, par construction, du contenu
  original et non des traductions.

Si la langue n'est pas portée par l'équipe : chaque livrable arrive **avec sa
glose française**, sinon la validation est une signature à l'aveugle.

### Phase 4 — La couche 3

Dérouler l'inventaire ci-dessus, ligne à ligne. C'est la phase qu'on oublie et
c'est la seule où les défauts passent en production.

### Phase 5 — Go / no-go

- [ ] `npx astro check` puis `npm run build` passent.
- [ ] Aucune page du marché n'affirme une capacité que l'app n'a pas.
- [ ] Le bandeau de consentement s'affiche dans la langue du marché.
- [ ] Les prix affichent la bonne devise **et** la mention fiscale exigée
      localement.
- [ ] Les pages légales sont relues par un juriste du pays — pas des
      traductions de courtoisie.
- [ ] La langue du support est annoncée là où un prospect la cherche.
- [ ] hreflang cohérent sur les pages présentes dans ≥ 2 marchés, absent sur
      les pages mono-marché.
- [ ] Sitemap soumis, moteurs locaux inclus.
- [ ] Tunnel complet testé de bout en bout dans la langue du marché.

### Phase 6 — Après lancement

Reprendre la fiche pays et y consigner la dette assumée, comme le fait
`plans/decouplage-langue-pays.md`. Une dette écrite se paie ; une dette orale
se redécouvre au marché suivant.

## Ce que les cas allemand, suisse et belge ont révélé

Trois plans rédigés sur trois pays choisis exprès pour être différents. Ce que
la comparaison apprend sur le processus lui-même.

### La langue coûte environ la moitié, pas les neuf dixièmes

L'hypothèse de départ était qu'un marché dans une langue maîtrisée serait
radicalement moins cher. C'est vrai, mais l'écart est plus faible qu'attendu.
Tombent : le dictionnaire, la glose française, l'arbitrage de la langue de
support, la pseudo-localisation, le rédacteur natif, et l'inutilisabilité de la
preuve sociale. Restent, à l'identique : le juridique, le fiscal, le contenu
éditorial original, les assets, et la parité de l'app.

**Le juridique, en particulier, ne diminue pas.** Le dossier suisse est aussi
lourd que l'allemand — il est seulement différent, et hors UE, donc rien du
socle européen ne s'y transpose.

### Chaque pays casse une hypothèse différente du code

C'est l'enseignement le plus opérationnel, et aucun des trois ne se déduisait
des deux autres :

| Pays | Hypothèse cassée | Portée |
|---|---|---|
| Royaume-Uni | Le site ne devance pas l'app | Générale — toujours ouverte |
| Allemagne | Une langue = une équipe capable de la juger | Toute langue tierce |
| Suisse | La devise est l'euro ; l'UE est le cadre fiscal | Tout marché hors zone euro ou hors UE |
| Suisse | Une langue = un marché | Tout marché partageant sa langue |
| Belgique | Un barème par année civile | Tout barème à indexation infra-annuelle |

**Conséquence pour la phase 0 : la bonne question n'est pas « ce pays est-il
compatible ? » mais « quelle hypothèse du produit ce pays casse-t-il ? »** Un
pays de niveau A peut casser plus de choses qu'un pays de niveau B — la Suisse
en est la démonstration.

### Instruire un marché audite les marchés existants

Effet secondaire non anticipé et précieux : la recherche juridique suisse a mis
au jour un défaut affectant **les marchés déjà en production**. La plateforme
européenne de règlement en ligne des litiges a été abrogée par le règlement
(UE) 2024/3228 — plaintes closes le 20 mars 2025, plateforme supprimée le
20 juillet 2025. Toute mention ou lien subsistant sur `/fr` et `/uk` pointe vers
une plateforme inexistante, ce qui constitue en soi une information trompeuse.

**À intégrer au processus : toute recherche juridique menée pour un nouveau
marché doit être relue à la lumière des marchés existants.** Ce qui a changé
ailleurs a souvent changé chez nous aussi.

### Ce qui a bien fonctionné dans la méthode

- **Partir du code plutôt que d'un modèle générique.** Les trois plans nomment
  des fichiers et des symboles réels ; ils sont exécutables tels quels.
- **Le tableau « décisions actées » en tête.** Les arbitrages pris avant
  rédaction (périmètre, registre, devise) ont évité de réécrire la copy après
  coup.
- **La section « le piège n° 1 » propre à chaque pays.** C'est elle qui empêche
  l'erreur grossière — confondre Kilometerpauschale et Entfernungspauschale,
  promettre un barème national là où la Suisse n'a que des règlements
  cantonaux, supposer un taux annuel en Belgique.
- **Chiffrer la copy en lignes** plutôt qu'en « pages ». 1 650 lignes est un
  ordre de grandeur qu'on peut devis er ; « traduire le site » ne l'est pas.

### Ce qui a moins bien fonctionné

- **La priorisation initiale a raisonné à effort technique constant**, sans
  critère de langue ni de devise. Elle plaçait l'Allemagne devant la Suisse
  alors que les deux ont des coûts de nature incomparable. Les deux critères
  sont désormais en phase 0.
- **Le juridique a été traité en dernier dans les premiers plans**, alors que
  c'est le seul poste dont le délai ne dépend pas de l'équipe. Il doit être
  commandé en premier, même s'il se livre en dernier.
- **La donnée dont on dispose déjà n'a pas été utilisée.** Le trafic et les
  inscriptions par pays existent dans l'analytics et le CRM ; ils n'ont pas été
  versés au dossier. Voir `02-bonnes-pratiques-i18n-saas.md` § 4.1 — c'est la
  correction la plus rentable à apporter à la méthode.

## Rendre la procédure auto-portante

La conclusion de l'audit est qu'on gagnerait plus à **faire remonter des
éléments de la couche 3 vers la couche 1** qu'à allonger les checklists. Quatre
pistes, par rapport bénéfice / coût décroissant :

1. **Dériver ce qui est dérivable.** `hreflang`, `ogLocale`,
   `schemaInLanguage` et `numberLocale` valent aujourd'hui, pour les deux
   marchés existants, exactement `langue-PAYS`, `langue_PAYS`, `langue-PAYS` et
   `langue-PAYS`. Quatre chaînes saisies à la main qui doivent s'accorder : les
   calculer depuis `country` et `language` supprime d'un coup quatre occasions
   de faute de frappe silencieuse.
2. **Déplacer `defaultOgImage` de `site.ts` vers le `Market`.** Le compilateur
   réclamera alors une bannière par marché, et la dette `/uk` devient
   impossible à reproduire.
3. **Typer `cookiesVersion`.** Un type gabarit indexé sur `MarketId` ferait
   échouer `izika-fr-EU` sur le marché `uk` à la compilation.
4. **Rattacher la devise au prix.** `pricing` portant sa propre devise, ou un
   type croisant `currency` et `pricing`, rend impossible d'afficher des euros
   sur un marché en livres.

Aucune n'est un préalable à l'ouverture d'un marché ; toutes réduisent le coût
de la suivante.

## Modèle de fiche pays

Structure validée sur `de-allemagne.md` et à reprendre telle quelle :

1. En-tête daté + état d'avancement (`app` / `site`).
2. Tableau « Décisions actées ».
3. La ou les spécificités qui distinguent ce pays — la section qui évite
   l'erreur grossière.
4. Chemin technique, dans l'ordre imposé par le compilateur.
5. Positionnement et SEO locaux.
6. Reste-à-faire par équipe : Juridique / Produit-App / Marketing-Contenu /
   Design-Assets / SEO-Growth / Dev, en cases `- [ ]`, avec le caractère
   bloquant dans le titre de section.
7. Séquencement en lots, avec les dépendances.
8. Risques.
9. Sources datées.

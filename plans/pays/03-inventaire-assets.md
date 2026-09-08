# Assets images — convention, parc, lot par marché

**Ce document décrit l'état actuel des assets du site et ce qu'il reste à
faire.** Il ne raconte pas comment on y est arrivé : il sert à comprendre le
parc tel qu'il est, et à ouvrir un nouveau marché sans redécouvrir les règles.

Il complète `01-procedure-ouverture-marche.md` (couches de garantie) : les
assets, longtemps classés en **couche 3** — ni typage, ni garde-fou de build —
sont désormais en **couche 1**, la section 6 dit comment.

> **Règle fondatrice.** Les visuels d'un marché sont **produits par la
> designer, à 100 %**. Ni génération à la build, ni composants HTML qui
> redessinent les écrans de l'app, ni SVG à texte substitué. Le dev fournit la
> plomberie, les garde-fous et la visibilité de la dette. Pas le pixel.

---

## 1. Pourquoi la designer, et pas la génération

La voie « composant » — redessiner les écrans de l'app en HTML/CSS et les
rendre à la build, texte et chiffres pris dans les dictionnaires — est
**écartée**. Les raisons, dans l'ordre où elles pèsent :

1. **La qualité.** Un écran redessiné en HTML n'est pas la capture d'un
   produit : c'est une imitation qu'il faut maintenir en parallèle du vrai
   produit. La dérive est mécanique et invisible.
2. **Le volume ne le justifie pas.** Ouvrir un marché complet demande
   **48 visuels**. C’est un lot de production, pas une chaîne industrielle.
3. **Ce n'est pas qu'une traduction.** Ces visuels portent quatre axes de
   variation — langue, devise, unité de distance, forme du barème :
   - `verticals/*/report` : « VOLVO V60 D3 (**6cv**) - d x 0.386 »,
     « 18 400 km / 7 198 € »
   - `app/report-mileage` : « RENAULT CLIO (**6cv**) - d x 0.386 »,
     « 21 890 km / 5 876 € »
   - `icons/approval` : « 200**km** - 56**€** », « APPROUVER »
   - `icons/calendar-to-trip` : « 1 250 **km** » — l'asset le plus utilisé du
     site (25 points d'usage)

   Traduire les libellés laisserait une colonne « puissance fiscale » dans un
   visuel belge — le contre-sens signalé dans `be-belgique.md` — et des
   kilomètres dans un visuel britannique.
4. **Le SVG à texte vivant ne sauve rien.** Les 15 SVG du dépôt ne contiennent
   **aucun texte** (0 `<text>`, 0 `<tspan>`) : ce sont des pictogrammes de menu
   et des logos partenaires, déjà réutilisables partout. Convertir les écrans
   denses en SVG buterait sur l'absence de retour à la ligne (l'allemand est
   20 à 30 % plus long que le français : débordement silencieux) et sur la
   police de l'app, qui n'est pas Open Sans et n'est pas fournie.

### L'enjeu, en une ligne

`src/data/mileage-uk.ts` définit le barème HMRC en **miles** et en **pence**
(45p), mais `/uk` sert aujourd’hui **48 visuels** dont les octets sont ceux du
français : rapports en kilomètres et en euros, badge « CERTIFIÉ CONFORME » en
français. Ce n'est pas un défaut esthétique, c'est une **promesse produit
fausse** — et le build la répète à chaque exécution, une ligne par visuel.

*Constat annexe hors périmètre : `src/i18n/markets.ts:130` donne
`currency: 'EUR'` au marché `uk`.*

---

## 2. Convention

### 2.1 Arborescence

Un seul arbre, `public/assets/`, coupé en deux : **les visuels neutres, rangés
par famille ; les visuels marché-dépendants, rangés par marché puis par les
mêmes familles.**

```
assets/
  articles/      <slug-article>/<fichier>             — un dossier par article
  brand/         logo-izika
  icons/         pictogrammes neutres + calendar.svg
  illustrations/ sketch-* (croquis au trait, neutres)
  integrations/  logos partenaires (google, outlook, icloud, ics, dolibarr…)
  menu/solo|team/ pictogrammes du méga-menu
  people/        portrait-* génériques
  verticals/<id>/ portraits de cas client (neutres)

  markets/<marché>/       ← un arbre complet par marché, familles identiques
    app/           screen-*, report-*, step-*, card-*   — captures de l'app
    brand/         emblem-origin
    icons/         pictogrammes portant texte, devise ou distance
    photos/        photographies (laptop-app)
    social/        og-default, og-article-default
    verticals/<id>/ agenda, next-stop, calendar-to-mileage, report
```

**Le dossier nomme la famille, le fichier nomme le sujet** — pas de préfixe qui
répète le dossier, et **aucun suffixe de marché dans les noms de fichiers** :
le marché est porté par le chemin.

Le préfixe subsiste **là où une famille contient plusieurs genres** : dans
`app/`, `screen-` (capture d'écran), `report-` (document produit), `step-`
(illustration d'étape « comment ça marche ») et `card-` (recadrage de carte de
fonctionnalité) disent des choses différentes.

Certaines familles n'existent que d'un côté : `app/`, `photos/` et `social/`
sont **intégralement marché-dépendantes** (aucun dossier neutre), `menu/`,
`integrations/`, `people/` et `articles/` sont intégralement neutres, `icons/`,
`brand/` et `verticals/` existent des deux côtés.

### 2.2 Un arbre par marché

```
assets/icons/custom-rate.png                 neutre : réutilisable partout
assets/markets/fr/icons/compliance.png       marché-dépendant : un arbre par marché
assets/markets/uk/icons/compliance.png
assets/markets/ch-fr/icons/compliance.png
```

**Le discriminant est le marché, pas la langue.** Cohérent avec le modèle
`Market ≠ Language` de `src/i18n/markets.ts` : la Belgique francophone parlera
`fr` mais appliquera un forfait unique, pas le barème par puissance fiscale ;
le Royaume-Uni parle `en` mais compte en miles.

**Être hors de `markets/` est un signal** : ce fichier-là est réutilisable tel
quel dans tout marché à venir.

Trois propriétés viennent de la structure, et pas d'une convention à respecter :

- **Un arbre de marché est un colis.** `zip -r uk.zip
  public/assets/markets/uk` est le brief complet de la designer, sans les
  neutres mélangés ; le retour se réintègre en écrasant le dossier.
- **La complétude se lit sans rien exécuter.** `diff -rq markets/fr markets/de`
  liste ce qui manque au marché allemand.
- **Ouvrir un marché est une commande.** `cp -r markets/fr markets/de`, au lieu
  de renommer 48 fichiers un par un.

### 2.3 Pas de mutualisation, pas de fallback

Un visuel marché-dépendant a **un fichier physique par marché**, même quand ses
octets sont encore ceux d'un autre marché. Il n'existe **aucun repli
implicite** : `markets/de/icons/compliance.png` absent ne retombe pas sur
celui de `markets/fr/`, il fait **échouer le build**.

C'est la règle centrale. Une variante manquante doit être une décision inscrite
quelque part, jamais un silence — et un fichier absent est plus honnête qu'un
fichier partagé. Le prix est en octets : un marché non localisé pèse autant
qu'un marché localisé. Le prix est assumé, il se compte au lieu de se deviner.

### 2.4 Assets d'article

Les images d'un article ne sont **pas** des variantes de marché : les articles
IK sont du contenu national, pas des traductions les uns des autres. Un asset
d'article ne sert qu'à cet article et vit dans son dossier :

```
assets/articles/parametrer-son-compte/connexion.jpg
assets/articles/<slug>/cover.jpg          ← le frontmatter `image:`
```

Hors de `markets/`, donc jamais dupliqués par marché. Quand deux articles
montrent la même image, le
fichier est **dupliqué dans les deux dossiers** (cas de `voiture-electrique.jpg`).

Les URL historiques de l'ère WordPress (2017-2019) restent servies par
**19 redirections 301 explicites** dans `public/_redirects` : ces URL sont
indexées dans Google Images et référencées depuis des pages tierces.

### 2.5 Identifiant de verticale

`solutionSlugs` (`src/i18n/routes.ts`) donne à chaque verticale une clé stable
et un slug par marché. Les dossiers d'assets utilisent le **slug anglais**
comme identifiant canonique :

| Clé | Dossier d'assets | Slug `/fr` | Slug `/uk` |
|---|---|---|---|
| `agentsImmobilier` | `verticals/real-estate-agents/` | `agents-immobilier-mandataires-immobilier` | `real-estate-agents` |
| `agentAssurances` | `verticals/insurance-agents/` | `agent-general-assurances` | `insurance-agents` |
| `professionsLiberales` | `verticals/independent-professionals/` | `professions-liberales` | `independent-professionals` |
| `artisansBtp` | `verticals/craftsmen-construction/` | `artisans-btp` | `craftsmen-construction` |
| `consultants` | `verticals/consultants/` | `consultants` | `consultants` |

Les pictogrammes du méga-menu suivent le même identifiant
(`assets/menu/solo/real-estate-agents.svg`).

---

## 3. État du parc

| | |
|---|---:|
| Fichiers dans `public/assets` | **171** |
| Poids total | **11 Mo** |
| Visuels marché-dépendants (sujets distincts) | **48** |
| Fichiers qu'ils représentent (48 × 2 ou 3 marchés) | **122** — 8,7 Mo |
| Fichiers neutres, réutilisables partout | **49** — 2,1 Mo |
| Chemins d'assets marché-dépendants en dur dans un composant | **0** |
| Marchés servis | `fr`, `uk`, `ch-fr` |

Répartition : `markets/fr` 48 fichiers (3,5 Mo), `markets/uk` 48 (3,5 Mo),
`markets/ch-fr` 26 (1,7 Mo), et côté neutre `articles/` 19 (1,2 Mo), `menu/` 10,
`integrations/` 6, `icons/` 5, `verticals/` 4, `people/` 2, `brand/` 1,
`illustrations/` 1.

Sortie du build :

```
[izika:asset-guard] 170 image path(s) checked, 0 broken, 0 orphan(s), 48 to localise.
```

Les **48 « to localise »** sont les visuels dont les octets sont encore
identiques d'un marché à l'autre. C'est la dette de localisation, et c'est la
liste de travail de la designer, régénérée à chaque build.

## 4. Le lot à produire par marché

C'est la section opérationnelle : **la liste que la designer reçoit quand un
marché s'ouvre.**

| Famille | Visuels | Poids | `/fr` | `/uk` | `/ch-fr` |
|---|---:|---:|:-:|:-:|:-:|
| `app/` — captures de l'app | 18 | ≈ 1,5 Mo | ✓ | ✓ | ✓ |
| `verticals/` — 5 verticales × 4 gabarits | 20 | ≈ 1,8 Mo | ✓ | ✓ | — |
| `icons/` — pictogrammes à texte/devise | 6 | ≈ 76 Ko | ✓ | ✓ | 5 |
| `social/` — bannières OG | 2 | ≈ 64 Ko | ✓ | ✓ | ✓ |
| `photos/` — `laptop-app` | 1 | ≈ 148 Ko | ✓ | ✓ | ✓ |
| `brand/` — `emblem-origin` | 1 | ≈ 12 Ko | ✓ | ✓ | — |
| **Total** | **48** | **≈ 3,5 Mo** | **48** | **48** | **26** |

**Un marché complet = 48 visuels, ≈ 3,5 Mo.** Un marché sans pages solutions —
c'est le cas de `/ch-fr` — **= 26 visuels, ≈ 1,7 Mo**. Le lot suit la
partialité des routes : pas de pages solutions, pas de `verticals/`, pas de
`icons/provisions`.

Les 20 fichiers de `verticals/` sont **réguliers depuis l'uniformisation du
gabarit** (§ 5) : 5 verticales × 4 gabarits — `agenda`, `next-stop`,
`calendar-to-mileage`, `report`. C'est le seul sous-lot qui se calcule au lieu
de se lire page par page.

**Ce tableau est le contenu de `public/assets/markets/<marché>/`.** Le lot ne
s'extrait pas d'une liste : c'est le dossier lui-même, et il se transmet tel
quel.

### 4.1 Les 7 visuels à traiter en premier

Sélection par densité de texte × fréquence d'usage × dépendance fiscale.

| # | Visuel | Usages | Pourquoi celui-là |
|---|---|---:|---|
| 1 | `icons/calendar-to-trip` | **25** | L'asset le plus utilisé du site. Affiche « RDV : » et « 1 250 km » |
| 2 | `icons/compliance` | **25** | « CERTIFIÉ CONFORME » en texte **courbe sur un cercle**, plus « 1 250 km » et « 501 € » |
| 3 | `photos/laptop-app` | 12 | Composite photo + écran incrusté en perspective. Le seul que ni SVG ni HTML ne reproduiraient |
| 4 | `app/step-mileage-export` | 5 | Rapport complet, adresses françaises, « RENAULT CLIO (6cv) - d x 0.386 », « 21 890 km / 5 876 € » |
| 5 | `app/screen-claims-list` | 6 | Le visuel « équipe » le plus dense : colonnes, statuts, montants |
| 6 | `verticals/*/report` | 5 × 2 | Le plus chargé en fiscal, et dupliqué cinq fois |
| 7 | `social/og-default` | 3 | Baseline marketing entièrement cuite dans l'image, servie sur **toutes** les pages du marché |

*`icons/calendar-to-trip` et `icons/compliance` totalisent **50 points d'usage**
à eux deux, pour deux fichiers de moins de 25 Ko. Meilleur rapport
effort/portée du dossier.*

`app/report-accounting` figurait ici en 4ᵉ position — « cœur de la promesse :
barème, puissance fiscale, devise ». Il a été **supprimé du dépôt** avec les
carrousels (§ 4.4) : c'était le 3ᵉ écran d'un bloc qui n'en montrait qu'un.
Le site n'affiche donc plus aucun rapport comptable ; `app/step-mileage-export`
et `app/report-mileage` restent les seuls documents fiscaux servis.

### 4.2 Deux arbitrages marketing, pas des traductions

- `icons/security` est un cadenas aux couleurs du **drapeau français** ;
  `brand/emblem-origin` est un **coq tricolore**. Aucun texte, mais un signal
  pays fort, servi aujourd'hui sur `/uk`. Soit c'est un argument assumé
  (« données hébergées en France ») et il reste, soit c'en est un contresens
  hors de France et il faut une variante. `/ch-fr` a déjà tranché : pas de bloc
  cocorico (`src/pages/ch-fr/team-entreprises.astro`).
- `people/portrait-*` et `verticals/*/portrait-customer` sont des personnes
  réelles ou des modèles photographiques. Leur pertinence par marché est un
  arbitrage marketing. Ils sont **neutres** aujourd'hui — un seul fichier, hors
  de `markets/` : les localiser demande d'abord cette décision.

### 4.3 Comment faire passer le lot de 48 à ≈ 38

Les 18 visuels de `app/` ne montrent que **8 écrans distincts** :

| Écran | Fichiers | Ce qui les distingue |
|---|---:|---|
| Paramètres | **7** | 1 variante à section masquée, 3 recadrages de carte, 1 illustration d'étape, 1 cadrage large, 1 plein écran |
| « RDV suivant » | 3 | illustration 920×719, `desktopSrc` 1618×1010, `tabletSrc` 1618×1210 |
| Import d'agenda | 2 | l'un ne montre qu'une des deux fenêtres |
| Relevé d'IK | 2 | `report-mileage.jpg` 533×711 et `step-mileage-export.png` 2000×1764 — **même document**, l'un cadré, l'autre posé sur une feuille |
| 4 autres | 4 | un fichier chacun |

Sept fichiers pour l'écran « Paramètres », c'est **sept visuels à produire par
marché** pour un seul écran de l'app. Si la designer livre **un master par
écran** et que les recadrages en sont dérivés, le lot par marché tombe de 48 à
≈ 38, soit **un cinquième d'effort en moins à chaque ouverture**.

Ces fichiers ne sont pas interchangeables en l'état (ratios et cadrages
différents, portés par `desktopSrc`/`tabletSrc` et par des cartes de
fonctionnalité distinctes). **C'est une décision produit + design, pas une
tâche de nettoyage.**

*Incohérence visible en production : `step-settings` affiche « TWINGO 5CV /
BERLINGO 8CV » et « MODE DE DÉPLACEMENT PRÉFÉRÉ » là où `screen-settings`
affiche « BERLINGO 8CV / ZOÉ 4CV » et « MODE DE DÉPLACEMENT PAR DÉFAUT » — deux
jeux de données pour le même écran. Plus grave depuis § 4.4 :
`step-provisions` est désormais **le seul visuel de l'écran Provisions**, et
c'est celui qui libelle deux lignes consécutives « juin » (589 km puis 39 km)
et affiche « 15 € » dans quatre lignes « montant versé ». La version correcte,
`screen-provisions`, n'était servie que dans un carrousel et a été supprimée
avec lui. **À ré-exporter.***

### 4.4 Réduction appliquée : un seul écran par bloc

Les blocs « fonctionnalités » des landings `/solo`, `/team` et `team-*`
affichaient **trois captures** dans une rangée `overflow-x-auto snap-x`
(`LandingScreenCarousel`) — successeur sans JS des carrousels slick de l'ère
Twig. Cette rangée n'avait **aucune affordance** : ni flèches, ni pastilles, et
une scrollbar overlay invisible sous macOS. Les slides 2 et 3 n'étaient donc
jamais vus en desktop, et rien n'indiquait leur existence en mobile.

Le composant est remplacé par `LandingScreenshot.astro`, qui rend **une seule
image**. Les contrats de copie portent désormais `screen` au singulier
(`src/data/landing-page.ts`, `src/data/team-landing.ts`) et `carouselLabel` a
disparu.

Conséquences :

- **8 sujets par marché deviennent orphelins et sont retirés du dépôt**
  (récupérables dans l'historique git) : `report-accounting`,
  `screen-claim-approve`, `screen-folders`, `screen-provisions`,
  `screen-receipts`, `screen-route`, `screen-settings-travel-mode`,
  `screen-settings-vehicles`. Soit **24 fichiers**, 3 marchés confondus.
- Le lot par marché passe de 56 à **48 visuels** (`/ch-fr` : 34 → **26**), et
  `app/` de 26 à **18 fichiers**.
- **Aucune régression visuelle en desktop** : la page rendait déjà la seule
  première image. La perte réelle est en mobile, où le glissement tactile
  fonctionnait — sans que rien ne le signale.
- Les listes à puces de ces blocs annoncent encore quatre ou cinq
  fonctionnalités pour une seule capture. **À arbitrer côté copie** : soit le
  texte se resserre sur ce que l'image montre, soit le bloc assume l'écart.

---

## 5. Le gabarit des pages verticales

Les cinq verticales partagent **un seul gabarit** (`SolutionPage.astro`,
collection `solutions`) et donc **exactement 10 emplacements d'image**. Le
gabarit ne contraint pas quel fichier remplit un emplacement : c'est aux YAML
de rester cohérents entre eux, et ils ne l'étaient pas.

| Emplacement | immo | assurance | artisans | consultants | libérales |
|---|---|---|---|---|---|
| `head.image` | `agenda` dédié | dédié | dédié | dédié | dédié |
| `featureHighlights.image` | `next-stop` dédié | dédié | dédié | dédié | dédié |
| `benefits[0].image` | `calendar-to-mileage` dédié | dédié | dédié | dédié | dédié |
| `benefits[1].image` | `report` dédié | dédié | dédié | dédié | dédié |
| `benefits[2].image` | `photos/laptop-app` | idem | idem | idem | idem |
| `benefits.testimonial.avatar` | **`portrait-testimonial` dédié** | **`people/portrait-persona`** | `people/portrait-testimonial` | idem | idem |
| `customerCase.avatar` | **`portrait-customer` dédié** | **dédié** | `people/portrait-persona` | `people/portrait-persona` | **dédié** |
| `customerCase.gains[0].image` | `icons/calendar-to-trip` | idem | idem | idem | idem |
| `customerCase.gains[1].image` | `icons/trip-modes` | **`icons/provisions`** | trip-modes | trip-modes | trip-modes |
| `customerCase.gains[2].image` | `icons/compliance` | idem | idem | idem | idem |

Les quatre premiers emplacements sont **uniformes** : chaque verticale a ses
quatre visuels dédiés, dans son dossier, sous les mêmes noms. Le lot
`verticals/` d'un marché se calcule donc : 5 × 4 = 20 fichiers.

### 5.1 Uniformisation appliquée : `featureHighlights.image`

Quatre verticales servaient le croquis au trait `illustrations/sketch-calendar`
là où assurance servait une capture d'app dédiée — deux registres visuels
différents au même endroit de la page. Les cinq servent désormais
`markets/<marché>/verticals/<id>/next-stop.png`.

Conséquences :

- Les deux `illustrations/sketch-calendar` (fr et uk) n'étaient référencés que
  là : ils sont **retirés du dépôt** (récupérables dans l'historique git,
  commit `770b1ba`). La famille `illustrations/` ne contient plus que
  `sketch-accountant.png`, neutre.
- Le lot par marché est alors passé de 53 à 56 visuels : −1 croquis,
  +4 `next-stop`. Il est depuis retombé à **48** (§ 4.4).
- Les quatre nouveaux `next-stop` portent aujourd'hui **les octets de celui de
  l'assurance** — état de départ assumé, comme pour un marché non localisé.
  Ils montrent donc des rendez-vous d'agent d'assurance sur les pages immo,
  artisans, consultants et libérales. **À produire par la designer**, au même
  titre que `agenda` et `report`.
- Point aveugle à connaître : `asset-guard` compare les octets **entre
  marchés**, pas entre verticales. Ces quatre doublons n'apparaissent donc pas
  dans la ligne « to localise » du build — seulement dans la comparaison RMSE
  décrite en § 7.

### 5.2 Divergences restantes, à trancher

Trois emplacements sur dix restent hétérogènes, et deux d'entre eux ne sont pas
un simple choix de fichier :

1. **Le cas client est incarné sur 3 verticales et anonyme sur 2.** Immo,
   assurance et libérales affichent un portrait dédié
   (`verticals/<id>/portrait-customer.jpg`) ; artisans et consultants
   retombent sur `people/portrait-persona.jpg`, alors que la copie de ces pages
   nomme quand même une personne. Uniformiser vers le haut = 2 portraits à
   produire ; vers le bas = perdre l'incarnation sur trois pages qui l'ont.
2. **Le témoignage de mi-page a trois sources pour un seul emplacement** : un
   portrait dédié (immo), `people/portrait-persona.jpg` (assurance) et
   `people/portrait-testimonial.png` (les trois autres). Aucune règle derrière
   ce partage à trois.
3. **Assurance met en avant « provisions mensuelles » là où les quatre autres
   mettent « modes de déplacement »** (`icons/provisions` vs
   `icons/trip-modes`). Ce n'est pas un écart d'image : c'est un **bénéfice
   produit différent**, et le texte du bloc diffère en conséquence. À trancher
   côté marketing, pas côté assets — soit les cinq verticales mettent en avant
   le même bénéfice, soit la divergence est assumée et documentée. Noter au
   passage que `icons/provisions` n'existe pas pour `/ch-fr` : la question se
   reposera à chaque marché qui ouvre des pages solutions.

Origine commune : ces pages ont été construites une par une à l'époque
Twig/WordPress, chacune réutilisant ce qui était sous la main. Tant que les
emplacements 6, 7 et 9 divergent, **le lot d'un marché ne se calcule pas
entièrement depuis le gabarit** — il faut encore lire les portraits page par
page. C'est l'objet des deux tâches de parité en § 9.

## 6. Les garde-fous côté dev

### 6.1 Le build échoue sur un chemin d'image faux

`src/integrations/asset-guard.mjs`, branché dans `astro.config.mjs`. Après
émission des 93 pages, il relit le HTML produit et fait trois passes :

1. **Cassé → erreur.** Tout chemin `/assets/…` référencé par une page émise et
   sans fichier derrière fait échouer le build, avec la liste des pages
   fautives. C'était le mode de défaillance numéro un : un 404 silencieux à
   l'exécution, invisible en CI.
2. **Orphelin → avertissement.** Un fichier de `public/assets` qu'aucune page
   ne référence : du poids déployé pour rien.
3. **Dette de localisation → avertissement.** Les fichiers de
   `/assets/markets/<marché>/` dont les octets sont encore identiques d'un
   marché à l'autre. Un avertissement et pas une erreur, volontairement :
   servir le visuel français est un compromis connu et daté, pas un bug de
   build. La passe compare le chemin **à l'intérieur** de l'arbre de marché :
   ce qui est un asset de marché est structurel, il n'y a plus à deviner si un
   fragment de deux lettres dans un nom de fichier est un identifiant de
   marché.

Le message de la passe 3 renvoie explicitement au § « Le lot à produire par
marché » de ce document — **si ce titre change, changer aussi le message.**

### 6.2 `defaultOgImage` vit sur le marché

Le champ n'est pas global : il est porté par le `Market`, en **deux** champs
obligatoires — `ogImage` (bannière du marché) et `articleOgImage` (repli des
articles sans couverture). Un nouveau marché **ne compile pas** tant qu'il n'a
pas ses deux bannières. `Seo.astro` et `ArticleLayout.astro` les lisent depuis
le marché.

### 6.3 Un composant ne code jamais en dur un asset marché-dépendant

La règle : **un composant peut coder en dur un asset neutre**
(`illustrations/sketch-accountant.png`, `icons/team.png`, `icons/calendar.svg`) ;
un asset marché-dépendant vient de la copie (`src/data/`) ou de `marketAsset()`.

Le dictionnaire n'est pas un point d'extension valable : `src/i18n/fr.ts` est
partagé par `/fr` et `/ch-fr`, il ne peut porter aucun chemin marqué par un
marché.

### 6.4 Une résolution d'asset par marché, sans repli implicite

`src/lib/assets.ts` :

- `marketAsset(chemin, market)` — envoie `/assets/<famille>/<sujet>` sur
  `/assets/markets/<marché>/<famille>/<sujet>`. Pour les composants qui
  reçoivent le marché mais pas la copie (`SolutionsMenu.astro`).
- `marketAssets(market, copie)` — retarge en profondeur **tous** les chemins
  d'une copie dérivée. `/ch-fr` réutilise la rédaction française de `/fr` par
  spread (`{ ...soloPageFr, … }`) et hériterait donc aussi de ses visuels, en
  silence : exactement la mutualisation que la convention interdit. Les cinq
  fichiers `*.ch-fr.ts` dérivés par spread sont enveloppés dans cet appel,
  visible en tête de fichier. Seuls les chemins vivant **déjà** dans un arbre de
  marché sont réécrits — les assets neutres ne bougent pas, et un override écrit
  à la main survit tel quel.

---

## 7. Qualité du parc — points ouverts

- **7 aplats enregistrés en JPEG** au lieu de PNG (`screen-*-wide`,
  `screen-*-tablet`, `step-settings-wide`, `card-*`) : artefacts autour du texte
  **et** surpoids. Ré-encoder un JPEG en PNG ne récupère pas les artefacts déjà
  cuits — seule la designer peut ré-exporter depuis la source.
- **0 WebP, 0 AVIF, rien ne passe par `astro:assets`.** Chantier de performance
  à part entière, hors périmètre de ce dossier.
- **Surdimensionnement** : traité une fois (un avatar était en 4000×4000 pour
  un affichage à quelques dizaines de pixels). À re-contrôler après chaque
  campagne de production, avec `magick identify` contre les tailles d'affichage.
- **Doublons** : à re-contrôler après chaque campagne, en groupant les rasters
  par dimensions puis en comparant chaque paire du groupe en RMSE
  (`magick compare -metric RMSE`, seuil d'alerte 0,10). C'est ainsi qu'a été
  trouvé un rapport de verticale qui n'était qu'un ré-encodage 3× plus lourd du
  rapport générique — invisible à l'œil.
- Les visuels d'articles legacy (captures d'interfaces tierces en français)
  restent tels quels : contenu national, aucune vocation à être localisé.

---

## 8. Procédure d'ouverture d'un marché — volet assets

À reporter dans la rubrique « Design / Assets » des fiches pays.

1. **Copier l'arbre du marché de référence** :
   `cp -r public/assets/markets/fr public/assets/markets/de`. Le site est alors
   complet et fonctionnel, avec des visuels français : c'est un état de départ
   assumé, pas un oubli.
2. **Ajouter** `ogImage` et `articleOgImage` au `Market` — sans quoi ça ne
   compile pas.
3. **Lancer `npm run build`** : la liste des visuels non localisés est la
   commande de travail de la designer.
4. **Transmettre le dossier** (`zip -r de.zip public/assets/markets/de`) et
   remplacer les fichiers au retour. Aucun code à toucher : les chemins sont
   déjà les bons, seuls les octets changent. `diff -rq markets/fr markets/de`
   dit à tout moment ce qui reste identique au français.
5. **Relancer le build** jusqu'à ce que la ligne « to localise » retombe à 0
   pour le marché.

Le coût réel est la production du visuel. La plomberie ne coûte plus rien.

---

## 9. Reste-à-faire

### Design / Assets

- [ ] **Identifier et fournir la police de l'app** (ce n'est pas Open Sans,
      la seule famille du site — `src/styles/global.css:5-8`). Sans elle, aucun
      ré-export ne sera raccord.
- [ ] Produire le lot `/uk` : **48 visuels**, miles et livres sterling.
      `npm run build` en imprime la liste.
- [ ] Produire le lot `/ch-fr` : **26 visuels**, CHF et taux de règlement de
      frais — pas de barème national opposable (`src/data/mileage-ch.ts`).
- [ ] **Ré-exporter `app/step-provisions`** : seul visuel restant de l'écran
      Provisions, il porte deux lignes « juin » et quatre « montant versé » à
      15 € (§ 4.3).
- [ ] **Produire les 4 `verticals/<id>/next-stop`** d'immo, artisans,
      consultants et libérales (§ 5.1) : ils portent aujourd'hui les octets de
      celui de l'assurance, donc des rendez-vous d'agent d'assurance sur quatre
      pages qui ne le sont pas. Invisible pour `asset-guard`.
- [ ] Ré-exporter en PNG les 7 aplats aujourd'hui en JPEG (§ 7).

### Produit / Design

- [ ] **Trancher les 3 emplacements encore divergents** des pages verticales
      (§ 5.2) : portrait du cas client (dédié sur 3 verticales, générique sur
      2), portrait du témoignage de mi-page (trois sources pour un emplacement),
      et surtout `gains[1]` — assurance met en avant les **provisions** là où
      les quatre autres mettent les **modes de déplacement**. Ce dernier est un
      arbitrage marketing, pas un choix d'image.
- [ ] Arbitrer **un master par écran** plutôt que 7 fichiers pour l'écran
      « Paramètres » (§ 4.3). Décision qui vaut −21 % sur chaque ouverture.
- [ ] **Resserrer la copie des blocs `simplify` / `speedUp` / `collaborators` /
      `managers`** : ils listent quatre ou cinq fonctionnalités pour une seule
      capture depuis § 4.4.
- [ ] Confirmer l'affichage des miles et des devises non-euro **dans l'app** :
      les visuels ne peuvent pas montrer ce que l'app ne sait pas produire.

### Dev

- [ ] **Contrôler la parité des pages verticales** au build (§ 5) : même
      emplacement ⇒ même famille d'asset sur les cinq verticales, pour qu'une
      nouvelle divergence ne s'installe pas en silence. Les 4 premiers
      emplacements sont désormais réguliers, c'est le moment de figer la règle.
- [ ] **Détecter les doublons entre verticales** dans `asset-guard` : il ne
      compare aujourd'hui que les variantes d'un même sujet entre marchés, donc
      cinq `next-stop` identiques dans cinq dossiers passent inaperçus (§ 5.1).
- [ ] Passer les images par `astro:assets` (WebP/AVIF, dimensions vérifiées à
      la compilation). Chantier performance, à planifier séparément.

### Marketing

- [ ] Arbitrer les marqueurs pays (`icons/security` au drapeau français,
      `brand/emblem-origin`) sur les marchés non français (§ 4.2).
- [ ] Arbitrer la pertinence culturelle des personas par marché.
- [ ] **Nommer un propriétaire des assets par marché.**
      `02-bonnes-pratiques-i18n-saas.md` §4.7 le réclame et le note « non
      formalisé ».

---

## 10. Comment re-mesurer

```bash
# Parc total
find public/assets -type f | wc -l && du -sh public/assets

# Lot d'un marché — c'est un dossier, pas une requête
find public/assets/markets/uk -type f | wc -l && du -sh public/assets/markets/uk

# Ce qui manque à un marché par rapport à la référence
diff -rq public/assets/markets/fr public/assets/markets/uk

# Visuels neutres (tout ce qui est hors markets/)
find public/assets -type f -not -path 'public/assets/markets/*' | wc -l

# Points d'usage d'un visuel, marchés confondus
grep -rEoh '/assets/markets/[a-z-]+/[A-Za-z0-9_./-]+\.[a-z]+' src/ \
  | sed -E 's|/assets/markets/[a-z-]+/|/assets/|' | sort | uniq -c | sort -rn

# Emplacements d'image des pages verticales
for f in src/content/solutions/fr/*.yaml; do echo "== $f"; grep -n 'assets/' "$f"; done

# Chemins cassés, orphelins, dette de localisation
npm run build

# Aucun chemin d'un autre marché dans un marché donné
grep -rho '/assets/markets/[a-z-]*/' dist/uk | sort -u | grep -v '/markets/uk/'
```

Documents liés : `01-procedure-ouverture-marche.md` (couches de garantie),
`02-bonnes-pratiques-i18n-saas.md` (§4.6 pseudo-localisation, §4.7 propriétaire
par marché), `de-allemagne.md` et `be-belgique.md` (rubriques « Design /
Assets »).

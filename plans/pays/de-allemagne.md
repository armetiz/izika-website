# Marché allemand (`/de`) — plan de déploiement marketing

État au 2026-09-07 : rien n'existe. L'Allemagne est le premier marché ouvert
depuis la refonte Country / Market / Language (`src/i18n/countries.ts`), et le
premier à demander une **langue entièrement nouvelle** — `/uk` avait réutilisé
l'anglais déjà écrit, `/de` part d'une page blanche.

Ce document est le plan de déploiement **côté site**. Il ne traite pas du
moteur de l'app, sauf là où le site en dépend (§ Produit / App).

## Décisions actées

| Décision | Choix | Conséquence |
|---|---|---|
| Périmètre | **Parité complète avec `/uk`** — 20 pages, dont les 5 solutions | ~4 400 lignes de copy à produire en allemand |
| Calculateur | **Un outil, deux onglets** : Dienstreise + Pendlerpauschale | Le second attire le volume, le premier convertit |
| Registre | **`Sie`** (vouvoiement) | Rassure Selbständige, PME et Steuerberater |
| Segment d'URL | `/de` | Alias court, l'Allemagne n'a qu'une langue servie |
| Devise | EUR | Aucun travail — contrairement à CHF ou GBP |
| **Langue de support** | **à trancher** — voir la section suivante | Détermine ce que la FAQ, la page conformité et le pied de page peuvent promettre |

## La contrainte qui pèse le plus : nous ne parlons pas allemand

À corriger d'emblée, parce que le reste de ce plan a d'abord été écrit sans en
tenir compte. L'équipe izika est francophone, assure le support en **français
et en anglais**, et **dans aucune autre langue**. Elle ne maîtrise pas non plus
les subtilités de style, de registre ou de culture propres à l'allemand.

L'Allemagne est donc le premier marché envisagé qui sort de ce que l'équipe
sait porter seule. Le pays reste ouvrable — c'est la décision prise — mais à
trois conditions, qui deviennent la partie la plus contraignante du plan.

### 1. Trancher la langue de support, avant d'écrire la copy

Trois options, à arbitrer explicitement :

| Option | Ce qu'on annonce | Risque |
|---|---|---|
| **Support en anglais assumé** | « Support auf Englisch und Französisch », dit clairement dans la FAQ, la page conformité et le pied de page | Frein réel sur les Steuerberater et les PME classiques ; acceptable pour les Selbständige et les métiers tech |
| **Ressource germanophone** | Support en allemand | Coût récurrent, à financer avant le lancement |
| **Ne rien dire** | — | À exclure : un prospect allemand qui découvre après coup qu'il ne sera pas supporté dans sa langue, c'est un remboursement et un avis négatif |

Ce choix n'est pas un détail de fin de projet : il apparaît dans la copy de
plusieurs pages, donc il conditionne le lot 4. La FAQ française parle
aujourd'hui d'un support réactif et le pied de page revendique un éditeur
français ; les deux formulations doivent être refaites pour `/de`, pas
traduites.

### 2. Toute copy allemande arrive avec sa glose française

Personne dans l'équipe ne peut valider le fond d'un texte allemand. Le circuit
de production doit donc livrer, pour **chaque** module de copy, le texte
allemand **et sa retraduction en français** en regard. Sans ça, la validation
est une signature à l'aveugle sur ~1 650 lignes.

Concrètement : prévoir la glose comme un livrable du rédacteur natif, pas comme
une étape optionnelle, et l'intégrer au devis. C'est ce qui permet de trancher
les questions de fond — un argument de vente est-il juste, une promesse
est-elle tenable — indépendamment de la qualité de langue, que seul le natif
juge.

### 3. Les textes juridiques exigent un résumé français

Impressum, AGB et Datenschutzerklärung sont juridiquement engageants et
rédigés en allemand. L'équipe ne peut pas les auto-vérifier. Demander au
juriste allemand un **résumé français** en plus du texte, listant ce qui est
affirmé et ce qui est engagé.

### Ce que ça change au séquencement

Un lot 0 apparaît, préalable à tout le reste : arbitrer la langue de support et
contractualiser le circuit de rédaction (rédacteur natif + glose). Tant qu'il
n'est pas fait, le lot 4 ne peut pas démarrer et le lot 3 part sans garantie de
relecture.

## Pourquoi l'Allemagne est un bon premier pas

Trois raisons, dont une qui n'apparaissait pas dans
`00-priorisation-marches.md` :

1. **Le barème est le plus simple d'Europe.** 0,30 €/km, forfait unique, une
   seule tranche, `fixe = 0`. Niveau A.
2. **C'est le plus grand marché du tableau**, et le seul à combiner niveau A et
   potentiel « très élevé ».
3. **C'est le seul pays que l'app peut déjà servir honnêtement.** Un forfait
   plat de 0,30 €/km, c'est exactement ce qu'un barème personnalisé exprime.
   Là où `/uk` promet des taux AMAP à deux bandes que l'app ne sait pas
   calculer, `/de` ne promet qu'un taux unique déjà atteignable. **À confirmer
   avec le produit** — si c'est exact, l'Allemagne se lance sans le décalage
   site / app qui pèse sur le Royaume-Uni.

L'Allemagne était classée 4ᵉ dans `00-priorisation-marches.md`, derrière le
Royaume-Uni, l'Irlande et la Belgique — et c'est le seul du top 5 servi dans
une langue que l'équipe ne porte pas, ce qui reste vrai après ce plan. Ce
classement raisonnait à effort technique constant ; le point 3 change la donne pour un déploiement **site**,
qui n'attend rien de l'app. Le reste-à-faire UK côté moteur
(`plans/decouplage-langue-pays.md`) reste ouvert et n'est pas bloqué par ce
chantier — les deux pistes avancent en parallèle.

## Le piège allemand n° 1 : deux mécanismes, pas un

C'est la chose à ne pas rater. L'allemand a **deux** barèmes kilométriques qui
n'ont rien à voir, et confondre les deux dans la copy détruit la crédibilité
auprès d'un lecteur allemand.

| | **Kilometerpauschale** (Dienstreise) | **Entfernungspauschale** (Pendlerpauschale) |
|---|---|---|
| Taux 2026 | **0,30 €/km** (0,20 deux-roues) | **0,38 €/km dès le 1ᵉʳ km** |
| Qui paie | L'employeur, exonéré de charges | Personne — c'est une déduction fiscale |
| Quand | Déplacement professionnel hors du lieu de travail habituel | Trajet domicile ↔ travail |
| Distance comptée | **Aller et retour**, tous les kilomètres | **Distance simple**, × jours travaillés |
| Mode de transport | Véhicule personnel | Indifférent (même à pied ou en train) |
| Où ça se règle | Note de frais / Reisekostenabrechnung | Déclaration de revenus (Steuererklärung) |
| **Produit izika** | ✅ C'est exactement ça | ❌ Autre métier (Taxfix, WISO…) |

La réforme du 1ᵉʳ janvier 2026 (Steueränderungsgesetz 2025, adopté au Bundesrat
le 19 décembre 2025) a supprimé l'ancien palier — c'était 0,30 € les 20
premiers kilomètres puis 0,38 € au-delà, c'est désormais 0,38 € dès le premier.
La Mobilitätsprämie (14 % de 0,38 €, soit 5,32 c/km) a été pérennisée.

**Le taux de la Dienstreise, lui, n'a pas bougé : 0,30 €/km.** Beaucoup
d'articles allemands mélangent les deux ; il faut que le nôtre soit celui qui
tranche proprement.

Stratégiquement, c'est une aubaine : la Pendlerpauschale est un sujet à volume
de recherche massif et saisonnier (pic janvier → juillet, période de
déclaration), fraîchement réformé donc peu couvert. On capte ce trafic, et
l'onglet Dienstreise du même calculateur convertit ceux pour qui izika a un
sens. C'est le rôle du calculateur à deux onglets.

## Chemin technique

Le compilateur guide l'ordre : chaque étape ne compile qu'une fois la
précédente faite.

### 1. Déclarer le pays, la langue et le marché

```ts
// src/i18n/countries.ts
export const countryIds = ['FR', 'GB', 'DE'] as const;
COUNTRIES: { …, DE: { id: 'DE', region: 'europe' } }

// src/i18n/languages.ts
export const languages = ['fr', 'en', 'de'] as const;
languageEndonym: { …, de: 'Deutsch' }

// src/i18n/markets.ts
export const marketIds = ['fr', 'uk', 'de'] as const;
```

Le `Market` `de` : `country: 'DE'`, `language: 'de'`, `currency: 'EUR'`,
`numberLocale: 'de-DE'`, `hreflang: 'de-DE'`, `ogLocale: 'de_DE'`,
`trustpilot: null` (voir § Marketing), entité légale izika SAS inchangée.

Ajouter `DE: 'Allemagne'` / `'Germany'` / `'Deutschland'` aux trois
dictionnaires — `dict.countries` est typé par `CountryId`, donc un pays sans
traduction ne compile pas.

### 2. Écrire `src/i18n/de.ts`

Dictionnaire complet du chrome, ~115 lignes. Le type `Dict` dérive de `fr.ts` :
**une clé manquante casse le build**, ce qui est le filet de sécurité — le
compilateur garantit la complétude, pas la justesse. Chaque clé doit arriver
avec sa glose française (voir la contrainte n° 2 ci-dessus) : c'est le seul
moyen de relire ce fichier autrement qu'à l'aveugle. Points d'attention propres
à l'allemand :

- `footer.since` — « Éditeur français indépendant depuis 2014 » se traduit mal
  tel quel. En Allemagne, l'argument qui porte n'est pas la francité mais
  l'hébergement européen hors cloud américain : « Unabhängiger europäischer
  Anbieter seit 2014 — Hosting in der EU ».
- `countrySwitcher.hint` — mentionne le barème, la devise et les mentions
  légales ; en allemand, dire « Kilometerpauschale » et pas
  « Entfernungspauschale ».
- `footer.legal` → « Impressum », `footer.privacy` → « Datenschutzerklärung »,
  `footer.terms` → « AGB ».
- Les noms de pays existants (`FR`, `GB`) en allemand : « Frankreich »,
  « Vereinigtes Königreich ».

### 3. Slugs dans `src/i18n/routes.ts`

Un `de` par route lancée. Proposition :

| Clé | Slug `de` | Note |
|---|---|---|
| `home` | `''` | |
| `solo` | `solo` | Nom de produit, gardé tel quel |
| `team` | `team` | Idem |
| `teamEntreprises` | `team-unternehmen` | |
| `teamCollectivites` | `team-behoerden` | Behörden & Vereine |
| `features` | `funktionen` | |
| `pricing` | `preise` | Pas `pricing` : l'allemand a son mot |
| `faq` | `faq` | |
| `security` | `sicherheit` | |
| `legal` | **`impressum`** | Terme légal, non négociable |
| `privacy` | `datenschutz` | |
| `terms` | `agb` | Allgemeine Geschäftsbedingungen |
| `calculator` | `kilometerpauschale-rechner` | L'aimant SEO |
| `articles` | *(absent)* | Comme `/uk` — hub non ouvert |

`solutionsBase.de = 'loesungen'`, et dans `solutionSlugs` :
`immobilienmakler`, `versicherungsvertreter`, `freiberufler`, `handwerk-bau`,
`berater`.

Rappel du garde-fou : une solution existe dans un marché **ssi** son slug est
ici **et** son YAML est dans `src/content/solutions/de/` — le build échoue dans
les deux sens.

### 4. Pages et modules de copy

13 pages sous `src/pages/de/`, calquées sur `src/pages/uk/`, plus les 5 YAML de
solutions. Les composants sont déjà partagés ; ce qui est à produire, c'est la
copy :

| Module à créer | Lignes (réf. `.uk.ts`) |
|---|---|
| `src/data/home-page.de.ts` | 174 |
| `src/data/team-page.de.ts` | 138 |
| `src/data/solo-page.de.ts` | 136 |
| `src/data/team-landing.de.ts` | 114 |
| `src/data/faq.de.ts` | 101 |
| `src/data/pricing-page.de.ts` | 82 |
| `src/data/faq-rechner.de.ts` | 75 |
| `src/data/features-page.de.ts` | 73 |
| `src/data/feature-cards.de.ts` | 29 |
| `src/data/compliance-section.de.ts` | 14 |
| `src/i18n/de.ts` | ~115 |
| 5 × `src/content/solutions/de/*.yaml` | ~5 × 120 |
| **Total** | **≈ 1 650 lignes** |

Ce n'est pas une traduction. Les témoignages sont français et nominatifs, les
métiers ne se recouvrent pas (« mandataire immobilier » n'a pas d'équivalent
allemand direct — le pendant est `Immobilienmakler` sous la IMV), et les
arguments de conformité changent de référentiel (voir § Marketing).

### 5. Calculateur à deux onglets

Nouveau module de données pur `src/data/mileage-de.ts`, sur le modèle de
`src/data/mileage-uk.ts` — pays-spécifique, **délibérément non partagé** avec
`bareme-ik.ts`, comme le dit l'en-tête de ce dernier. Il porte les deux
régimes :

```
Dienstreise        →  d × 0,30            (0,20 pour les deux-roues)
Entfernungspauschale →  d × 0,38 × Arbeitstage   (distance simple)
```

Les deux sont affines, `fixe = 0` : c'est le module le plus simple des trois.
La complexité n'est pas dans le calcul mais dans l'**UI** — il faut que
l'utilisateur comprenne en un coup d'œil lequel des deux onglets le concerne,
sinon on produit un chiffre faux avec assurance. Le tableau du § « piège
n° 1 » doit se retrouver dans la page, pas seulement dans ce plan.

Nouvel îlot React `src/components/MileageCalculatorDE.tsx`, réutilisant
`src/components/calculator/shared.tsx` (`SegmentedRadio`, `StepBadge`) comme le
fait déjà celui du UK. Les libellés réglementaires vont dans
`src/data/mileage-de.labels.de.ts`, jamais dans le module de données.

### 6. Articles

Collection `src/content/articles/de/` — la collection Keystatic
`articles_de` apparaît automatiquement dès que `de` est dans `marketIds`.

Trois articles pour ouvrir, **contenu original, pas des traductions** :

1. `kilometerpauschale-2026` — le pilier : les deux mécanismes, les taux, qui
   paie quoi, ce qu'il faut prouver. `hreflangKey` partagé avec
   `fr/bareme-indemnites-kilometriques-2026` et `en/hmrc-mileage-rates-2026`.
2. `entfernungspauschale-2026` — la réforme des 38 cents dès le 1ᵉʳ km. Sujet
   frais, gros volume, angle « ce qui a changé au 1ᵉʳ janvier ».
3. `fahrtenbuch-oder-kilometerpauschale` — la question que se pose tout
   Selbständiger allemand. Article de conversion.

Pas de hub `/de/articles` au lancement (comme `/uk`) : la copy française inline
de `src/pages/[market]/articles/index.astro` devrait être internationalisée
d'abord. Les articles restent accessibles en `/de/<slug>` et par le sitemap.

## Positionnement et SEO

### Le concurrent n'est pas celui qu'on croit

Le marché allemand de la Reisekostenabrechnung est saturé — Circula (désigné
successeur officiel de DATEV Reisekosten classic), Factorial, HRworks, SAP
Concur, Moss, Rydoo, Payhawk, Candis, Lexware, Spendit, Pleo, N2F, hrmony.
**Tous font de la suite de gestion de frais complète** : justificatifs photo,
OCR, Verpflegungsmehraufwand, workflows d'approbation, cartes de paiement.

izika ne joue pas à ce jeu et ne doit pas prétendre le contraire. L'angle est
le même qu'en France : **on ne saisit rien, l'agenda fait le travail**. C'est
la seule chose que ces quinze concurrents ne proposent pas.

### Les deux ancres de confiance allemandes

En France, la copy s'appuie sur « recommandé par les experts-comptables »
(`src/data/compliance-section.fr.ts`). L'équivalent allemand n'est pas une
traduction, ce sont deux références précises :

- **GoBD** — les principes de tenue et de conservation des documents
  numériques. Tout acheteur allemand demandera si les relevés sont
  GoBD-konform. Sans réponse, le pilier « conformité fiscale » tombe à plat.
  **À trancher avec le produit et le juridique avant d'écrire la page.**
- **DATEV** — le standard de fait des Steuerberater. Un export DATEV est, en
  Allemagne, ce qu'est le relevé validé par l'expert-comptable en France.
  Écart produit à qualifier : peut-on l'annoncer, et sinon que dit-on ?

Troisième argument, gratuit celui-là : **l'hébergement européen**. Scaleway
(France, UE) face à des concurrents sur cloud américain — c'est un argument qui
porte réellement en Allemagne, et il est déjà vrai.

### Grappes de mots-clés

| Grappe | Intention | Page cible |
|---|---|---|
| `Kilometerpauschale`, `Kilometergeld`, `km-Geld Dienstreise` | Informationnelle → conversion | Calculateur, onglet Dienstreise |
| `Pendlerpauschale`, `Entfernungspauschale 2026`, `38 Cent` | Informationnelle, très gros volume, saisonnier | Calculateur, onglet Pendlerpauschale + article dédié |
| `Fahrtkostenabrechnung`, `Reisekostenabrechnung Vorlage` | Transactionnelle | `/de` home, `/de/team-unternehmen` |
| `Fahrtenbuch`, `Fahrtenbuch App`, `ordnungsgemäßes Fahrtenbuch` | Transactionnelle, forte concurrence | Article `fahrtenbuch-oder-kilometerpauschale` |
| `Reisekosten Selbständige`, `Freiberufler Fahrtkosten` | Conversion | `/de/solo`, `/de/loesungen/freiberufler` |

Saisonnalité à intégrer au calendrier éditorial : le pic Pendlerpauschale court
de janvier à juillet. Publier l'article de réforme **avant** janvier 2027 pour
capter le cycle complet.

## Juridique — bloquant

- [ ] **Impressum** (`/de/impressum`) — obligation légale au titre du § 5 DDG,
      pas une page de courtoisie. Une infraction expose à une
      *Abmahnung* (mise en demeure payante), pratique courante en Allemagne.
      Doit contenir : dénomination complète et forme juridique (izika SAS),
      adresse postale réelle (pas de boîte postale), e-mail **et** moyen de
      contact rapide, représentant légal (Pierre Aulagne), **le registre
      étranger** — un prestataire hors d'Allemagne doit citer son registre
      d'origine, donc RCS Montpellier 807 746 524 — et le numéro de TVA
      intracommunautaire (USt-IdNr. FR37 807 746 524). Le site publiant des
      articles, ajouter le responsable du contenu au sens du § 18 al. 2 MStV.
- [ ] **Datenschutzerklärung** (`/de/datenschutz`) — même base RGPD que la
      charte française, mais les attentes de forme allemandes sont plus
      strictes (finalités, bases légales et durées article par article). Ne
      pas se contenter d'une traduction de courtoisie comme pour `/uk`.
- [ ] **AGB** (`/de/agb`) — vérifier le droit de rétractation de 14 jours
      (Widerrufsrecht) : il ne s'applique pas aux Selbständige, mais s'applique
      si un particulier peut souscrire. Vérifier aussi la clause de droit
      applicable : les CGV françaises désignent le droit français (art. 29),
      ce qui se heurte au droit de la consommation allemand pour les
      consommateurs.
- [ ] **Affichage des prix (PAngV)** — la page `/de/preise` doit indiquer
      explicitement si les montants sont HT ou TTC (`zzgl. USt.` /
      `inkl. MwSt.`). Aujourd'hui les prix `/fr` et `/uk` sont affichés sans
      cette mention.
- [ ] **TVA** — ventes en Allemagne : OSS pour les particuliers, autoliquidation
      pour les assujettis. À arbitrer avec la compta avant l'ouverture des
      paiements.
- [ ] **Résumé français de chaque texte juridique allemand** — Impressum, AGB,
      Datenschutzerklärung. L'équipe ne lit pas l'allemand juridique et ne peut
      pas vérifier ce qui est engagé en son nom. À exiger du juriste dans la
      commande, pas à demander après coup.

## Produit / App — à confirmer

- [ ] **Le barème 0,30 €/km est-il déjà servable** par le barème personnalisé
      de `go.izika.com` ? Si oui, `/de` se lance sans dette, et c'est un
      argument fort à faire figurer sur la page. Si non, l'écart site / app du
      Royaume-Uni se reproduit et il faut ajuster la promesse.
- [ ] **Parcours post-clic en allemand** — inscription, onboarding, interface,
      e-mails transactionnels. Même question que pour `/uk`, non résolue à ce
      jour. Comme pour la copy du site, l'app en allemand ne sera relisible par
      l'équipe qu'avec une glose française.
- [ ] **Support** — l'équipe couvre le français et l'anglais. Décider si les
      clients allemands sont supportés en anglais (et l'annoncer) ou si une
      ressource germanophone est financée. Bloquant pour le lot 4 : la réponse
      s'écrit dans la FAQ et la page conformité.
- [ ] **GoBD** — position officielle sur la conformité des relevés.
- [ ] **Export DATEV** — existe / prévu / hors sujet. Détermine ce que la page
      conformité peut affirmer.

## Marketing / Contenu

- [ ] **Contractualiser le circuit de rédaction** avant d'écrire la première
      ligne : rédacteur natif allemand, registre **`Sie`**, livraison
      systématique du texte **avec sa retraduction française en regard**. La
      glose est un livrable, pas une faveur — sans elle, l'équipe ne peut rien
      valider.
- [ ] Produire les ~1 650 lignes de copy allemande listées au § 4 — une
      traduction littérale de la copy française se repère immédiatement sur ce
      marché.
- [ ] **Reprendre les formulations qui parlent de l'équipe** : `footer.since`
      (« Éditeur français indépendant depuis 2014 »), le pilier « support en
      France » de `compliance-section.fr.ts` et les réponses de la FAQ sur le
      support. Elles doivent dire la vérité sur les langues couvertes, pas être
      traduites telles quelles.
- [ ] **Consentement Axeptio en allemand** : créer la version DE dans le
      dashboard, puis renseigner `cookiesVersion` du marché `de`. Ne pas
      reproduire l'erreur de `/uk`, qui pointe encore sur `izika-fr-EU`
      (`docs/mise-en-production.md`, vigilance 2).
- [ ] **Preuve sociale** : `trustpilot: null` au lancement. Les avis sont sur
      `fr.trustpilot.com` et en français. Deux options — ouvrir une présence
      `de.trustpilot.com`, ou reproduire le compromis `/uk`
      (`widgetLocale: null` : badge de note oui, widget non). Trancher avant
      d'écrire la home, les blocs en dépendent.
- [ ] **Témoignages** : les trois de la home sont français et nominatifs.
      Prévoir des cas allemands, ou assumer des témoignages traduits avec la
      mention du pays.
- [ ] Les 3 articles de lancement (§ 6).

## Design / Assets

- [ ] **Bannière OpenGraph allemande** — `site.defaultOgImage` est la bannière
      française « indemnités kilométriques automatiques ». Même dette que
      `/uk` ; le champ devra passer sur le `Market`.
- [ ] **Captures produit en allemand** — héros, carrousels des landings,
      visuels du calculateur, rapports en €/km. Dépend de l'app en allemand.
      Priorité : héros de la home, visuels du calculateur.
- [ ] Badge « CERTIFIÉ CONFORME » du méga-menu
      (`solutionsMenu.blurbImageAlt`) : version allemande, et libellé cohérent
      avec ce que le juridique autorise à affirmer sur GoBD.

## SEO / Growth

- [ ] hreflang : les paires `de-DE` ↔ `fr-FR` ↔ `en-GB` s'émettent
      automatiquement dès que la route existe dans ≥ 2 marchés
      (`hreflangAlternates`). Rien à câbler, mais à **vérifier** sur les pages
      partiellement lancées.
- [ ] `hreflangKey` des articles : relier `kilometerpauschale-2026` à ses
      équivalents FR et EN. Les articles sans équivalent (Entfernungspauschale)
      n'en portent pas — c'est le comportement voulu.
- [ ] Soumettre le sitemap à Google Search Console **et à Bing** — Bing pèse
      plus lourd en Allemagne qu'en France.
- [ ] Décision `xDefaultMarket` : reste `fr`. À ne pas toucher pour ce
      lancement.
- [ ] Test manuel du tunnel complet en allemand avant l'annonce.

## Dev

- [ ] `docs/mise-en-production.md` § 5 « Contenu et pages légales » : ajouter la
      ligne allemande.
- [ ] Vérifier que `CountrySwitcher.astro` reste lisible à 3 pays / 3 langues —
      il a été écrit et testé à 2.
- [ ] `TrackedLink` garde `site.joinUrl` en href par défaut, commun à tous les
      marchés. Toujours vrai pour `de` tant que l'app n'a pas d'URL dédiée.
- [ ] `npx astro check` puis `npm run build` : le typage doit lister exactement
      ce qui manque à chaque étape. C'est la vérification principale.

## Séquencement proposé

| Lot | Contenu | Dépend de |
|---|---|---|
| **0. Préalables** | Arbitrage de la langue de support ; contrat du rédacteur natif incluant la glose française ; commande juridique incluant les résumés français | — |
| **1. Socle** | `countries.ts`, `languages.ts`, `markets.ts`, `de.ts`, slugs `routes.ts`, home `/de` | Lot 0 |
| **2. Aimant SEO** | `mileage-de.ts`, `MileageCalculatorDE.tsx`, page calculateur, article Entfernungspauschale | Lot 1 |
| **3. Légal** | Impressum, Datenschutz, AGB, mention PAngV sur les prix | Relecture juriste allemand |
| **4. Conversion** | solo, team, team-unternehmen, team-behoerden, funktionen, preise, faq, sicherheit | Lot 1 + arbitrages GoBD / DATEV **et langue de support** |
| **5. Longue traîne** | 5 solutions, 2 articles restants | Lot 4 |

Le lot 0 ne produit rien de visible et conditionne tout le reste : c'est celui
qu'on oublie et qui décale le lancement. Les lots 2 et 3 sont ensuite
parallélisables. Le lot 3 est le seul dont le délai ne dépend pas de nous : la
relecture juridique allemande est à lancer en premier même si elle se livre en
dernier.

## Risques

- **Nous ne parlons pas allemand.** C'est le risque dominant, et il ne se
  résout pas en cours de route : il se traite en amont, par un arbitrage sur la
  langue de support et un circuit de rédaction qui livre la glose française.
  Sans ça, l'équipe valide 1 650 lignes à l'aveugle et découvre les erreurs par
  les retours clients.
- **Un support qui ne parle pas la langue du marché.** Un prospect allemand qui
  ne l'apprend qu'après paiement, c'est un remboursement et un avis négatif.
  L'annonce doit être en amont et visible, quelle que soit l'option retenue.
- **La copy est le vrai coût, pas le code.** Le code se résume à une entrée
  dans trois tableaux et un module de barème trivial. Sous-estimer les 1 650
  lignes de rédaction allemande native est le principal risque de dérive.
- **L'Impressum n'est pas une page légale de plus.** C'est une obligation dont
  le non-respect est activement sanctionné par des tiers en Allemagne. Il ne
  doit pas être traité comme les traductions de courtoisie de `/uk`.
- **Confondre les deux barèmes** dans un seul article ou un seul écran de
  calculateur discrédite l'ensemble auprès d'un lecteur allemand, qui connaît
  la différence.
- **Promettre GoBD ou DATEV sans le produit derrière** reproduirait, en pire,
  le décalage « current rates included » de `/uk`. Le juridique tranche avant
  que la copy ne soit écrite, pas après.
- **Marché concurrentiel dense.** Quinze acteurs installés, dont un adoubé par
  DATEV. La différenciation par l'agenda doit être le premier message de la
  home, pas un argument de la troisième section.

## Sources

Consultées le 2026-09-07.

- Kilometerpauschale Dienstreise 0,30 €/km — [Circula](https://www.circula.com/de/blog/kilometerpauschale), [Lexware](https://www.lexware.de/wissen/mitarbeiter-gehalt/wissenswertes-zur-kilometerpauschale/), [ETL](https://www.etl.de/aktuelles/fahrtkosten-bei-dienstreisen-2026/)
- Réforme Entfernungspauschale 2026 — [Bundesfinanzministerium](https://www.bundesfinanzministerium.de/Content/DE/Standardartikel/Themen/Steuern/das-aendert-sich-2026.html), [Haufe](https://www.haufe.de/personal/entgelt/erhoehung-der-entfernungspauschale_78_532080.html), [ADAC](https://www.adac.de/rund-ums-fahrzeug/auto-kaufen-verkaufen/autokosten/pendlerpauschale/)
- Impressumspflicht § 5 DDG — [eRecht24](https://www.e-recht24.de/artikel/datenschutz/209.html), [IHK Chemnitz](https://www.ihk.de/chemnitz/recht-und-steuern/rechtsinformationen/internetrecht/pflichtangaben-im-internet-die-impressumspflicht-4401580)
- Paysage concurrentiel — [Factorial](https://factorialhr.de/blog/beste-reisekosten-software/), [Qonto](https://qonto.com/de/blog/business/spesenmanagement/tool-reisekostenabrechnung), [Capterra DE](https://www.capterra.com.de/directory/30559/expense-report/software)

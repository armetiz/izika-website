# Marché belge francophone (`/be-fr`) — plan de déploiement marketing

État au 2026-09-07 : rien n'existe. La Belgique est classée 3ᵉ dans
`plans/pays/00-priorisation-marches.md`, et c'est le **premier marché dont la
langue est déjà écrite** : `/be-fr` réutilise `src/i18n/fr.ts` tel quel. C'est
aussi le premier pays du répertoire à porter **plusieurs marchés** — `/be-fr`
maintenant, `/be-nl` peut-être plus tard — le cas d'école cité en tête de
`src/i18n/countries.ts`.

Ce document est le plan de déploiement **côté site**. Il ne traite pas du
moteur de l'app, sauf là où le site en dépend (§ Produit / App).

Il porte sur **`/be-fr` seul**. `/be-nl` est une décision distincte et
ultérieure, traitée en § « Ce que coûterait `/be-nl` ».

## Décisions actées

| Décision | Choix | Conséquence |
|---|---|---|
| Périmètre | **Parité avec `/uk`** — 20 pages, dont les 5 solutions | ~1 520 lignes de copy, mais **adaptées**, pas traduites (voir § coût réel) |
| Langue | **Français**, dictionnaire `fr` **réutilisé** | Zéro ligne de dictionnaire à écrire. C'est la décision structurante |
| Segment d'URL | **`/be-fr`**, pas `/be` | Pas d'alias court : la Belgique a vocation à porter deux marchés |
| Registre | **Vouvoiement**, comme `/fr` | Aucun arbitrage : c'est déjà le registre de la copy française |
| Devise | EUR | Aucun travail |
| Support | **Français**, sans réserve ni annonce particulière | Le marché est dans les cordes de l'équipe |
| Preuve sociale | **`fr.trustpilot.com` réutilisé**, widget compris | Seul marché supplémentaire où la preuve sociale se transporte intacte |
| Calculateur | **Un outil, deux à trois onglets** : voiture (régime annuel / trimestriel) + vélo | Le vélo est l'aimant SEO, la voiture convertit |
| `/be-nl` | **Hors périmètre**, décision ultérieure | Conditions listées en fin de document |

## Ce qui tombe par rapport à l'Allemagne

C'est la raison d'être de ce plan. `de-allemagne.md` fait apparaître un **lot 0**
— arbitrer la langue de support, contractualiser un rédacteur natif livrant sa
glose française, exiger des résumés français des textes juridiques. Ce lot 0
disparaît en Belgique francophone. Poste par poste :

| Poste du plan allemand | En Belgique francophone | Coût résiduel |
|---|---|---|
| Arbitrage de la langue de support | **Tombe entièrement.** Le français est la langue du marché *et* celle de l'équipe | Néant |
| Rédacteur natif + glose française systématique | **Tombe entièrement.** L'équipe écrit et relit elle-même | Une relecture belge ponctuelle (voir § français de Belgique) |
| Résumés français des textes juridiques | **Tombe.** Les textes belges francophones sont lisibles en interne | Le juriste belge reste nécessaire pour **écrire**, plus pour **traduire** |
| Dictionnaire complet (`de.ts`, ~130 lignes) | **Tombe entièrement.** `fr.ts` est réutilisé par construction | Deux clés à traiter — et le problème inverse apparaît (voir plus bas) |
| Traduction de ~1 650 lignes de copy | **Devient une adaptation.** La structure, les arguments, les visuels tiennent | ~30 % de rédaction réelle |
| Captures produit dans la langue | **Tombent.** L'app est en français, les visuels du site aussi | Néant |
| Bannière OpenGraph localisée | **Tombe.** La bannière française est en français | Néant |
| Version de consentement Axeptio | **Probablement tombe.** `izika-fr-EU` est en français et à portée UE | À confirmer avec Axeptio ; à défaut, un clonage sans traduction |
| Preuve sociale à reconstruire | **Tombe.** Les 265 avis à 4,9 sont en français | Néant — c'est même un atout net |
| Témoignages à retourner | **Tombent en partie.** Trois témoignages français nominatifs restent lisibles | Ajouter un ou deux cas belges à terme |

**Ce qui ne tombe pas — et qui coûte vraiment :**

1. **Le barème.** L'Allemagne, c'est une constante (`0,30`). La Belgique, c'est
   deux régimes concurrents, quatre valeurs par an, une période décalée sur
   l'année civile et un accident d'indexation mensuelle en 2026. C'est le
   barème le plus difficile de tout `00-priorisation-marches.md` **en dehors du
   niveau C**, alors qu'il est classé A. La grille de compatibilité mesure la
   forme du calcul (`d × coef`, `fixe = 0`), pas la volatilité de la donnée.
2. **Le juridique.** Le Code de droit économique belge n'est ni le droit
   français ni le droit allemand. Les clauses abusives, le droit de
   rétractation et l'affichage des prix appellent une révision des CGV, pas une
   traduction. Un juriste belge reste nécessaire.
3. **Le contenu éditorial.** Un pays sans articles ne se référence pas. Trois
   articles belges originaux, pas des copies de `/fr`.
4. **Deux coûts que l'Allemagne n'a pas du tout :**
   - **La cannibalisation SEO.** `/fr` et `/be-fr` sont dans la même langue et
     se disputeront les mêmes requêtes en Belgique. `/de` n'a aucun concurrent
     interne. C'est le risque n° 1 de ce marché.
   - **Le dictionnaire partagé.** `/de` s'écrit son propre `de.ts`. `/be-fr`
     hérite de `fr.ts` **sans pouvoir en dévier** — voir la section suivante,
     c'est la contrainte technique nouvelle du marché.

**Conclusion honnête :** la Belgique n'est pas gratuite. Elle échange un coût
linguistique contre un coût de données et un coût SEO. Le lot 0 allemand
disparaît, mais un lot 0 belge le remplace : figer la stratégie de
différenciation `/fr` ↔ `/be-fr` et arrêter la source de vérité du barème.

## Le piège belge n° 1 : deux régimes d'indexation, et un troisième accident

C'est la difficulté centrale du pays. La Belgique n'a pas *un* barème
kilométrique : elle en a **deux, au choix de l'employeur**, issus de **deux
arrêtés royaux différents**.

| | **Régime annuel** | **Régime trimestriel** |
|---|---|---|
| Base légale | Art. 13, AR du 18 janvier 1965 | Art. 74, AR du 13 juillet 2017 (modifié par l'AR du 10 novembre 2022) |
| Période | 1ᵉʳ juillet → 30 juin | Trimestre civil |
| Indexation | Indice santé lissé | **80 %** indice santé lissé **+ 20 %** prix des carburants |
| Publication | Circulaire BOSA annuelle au *Moniteur belge* | Circulaire BOSA **trimestrielle** au *Moniteur belge* |
| Valeur en cours | **0,4761 €/km** (01/07/2026 → 30/06/2027) | **0,4440 €/km** (01/07/2026 → 30/09/2026) |
| Valeur précédente | 0,4449 €/km (2025-2026) | 0,4326 €/km (T1 2026) |
| Réactivité | Lente, lissée | Rapide — la part carburant fait diverger les deux séries |

**L'employeur choisit**, sauf si une CCT sectorielle ou d'entreprise impose
l'un des deux. Celui qui opte pour l'annuel **doit s'y tenir sur toute la
période du 1ᵉʳ juillet au 30 juin** : le basculement ne peut se faire qu'au
1ᵉʳ juillet. Les deux montants sont des **plafonds, pas des planchers** — il
n'existe pas d'obligation légale générale de verser une indemnité
kilométrique forfaitaire, seulement de rembourser les frais professionnels.

**Fondement et exonération.** Les deux barèmes sont ceux de l'indemnité versée
aux **agents de l'État**. Tant que l'employeur ne dépasse pas ce montant, le
remboursement est qualifié de *frais propres à l'employeur* : ni revenu
imposable pour le travailleur, ni rémunération soumise aux cotisations **ONSS**.
Deux précisions à ne pas rater dans la copy :

- Le plafond souvent cité de **24 000 km/an** est une **position de
  l'administration fiscale**, pas de l'ONSS, et elle est **contestée en
  jurisprudence**. Les instructions administratives ONSS ne mentionnent aucun
  plafond kilométrique annuel. Ne jamais l'attribuer à l'ONSS.
- L'ONSS exige en revanche que le véhicule **n'appartienne pas à l'employeur et
  ne soit pas financé par lui**.

### L'accident d'avril–juin 2026, qui casse le modèle pour de bon

Face à la flambée des carburants, l'**AR du 18 mai 2026**, rétroactif au
1ᵉʳ avril, a instauré à titre exceptionnel une indexation **mensuelle** sur
trois mois :

| Mois | €/km |
|---|---|
| avril 2026 | 0,4571 |
| mai 2026 | 0,4841 |
| juin 2026 | 0,5055 |

Le T2 2026 avait pourtant été fixé à 0,4327 : il a été **écrasé**. Le régime
trimestriel a repris ses droits au 1ᵉʳ juillet 2026. Les employeurs sur base
annuelle n'ont pas été concernés.

Ce n'est pas une anecdote : c'est une **discontinuité permanente dans la
série**. Toute structure de données qui suppose « un taux par trimestre » est
déjà fausse pour 2026. Il faut une **liste de périodes datées**, sans hypothèse
sur leur durée.

### Conséquences produit — le cœur du sujet

Le sélecteur d'année de nos deux calculateurs (`ANNEES` dans
`src/data/bareme-ik.ts`, `TAX_YEARS` dans `src/data/mileage-uk.ts`) suppose
**un barème par an**, indexé par une clé d'année. Cette hypothèse ne tient pas
en Belgique, pour trois raisons cumulées :

1. Le barème change **jusqu'à quatre fois par an** (six en 2026).
2. La période du régime annuel **ne s'aligne pas sur l'année civile**
   (1ᵉʳ juillet → 30 juin).
3. Les deux régimes **coexistent** : à une même date correspondent **deux**
   taux valides, et lequel s'applique dépend de l'employeur, pas de la loi.

**Ce que ça implique pour `src/data/mileage-be.ts`.** Le module ne doit pas
imiter `bareme-ik.ts` ni `mileage-uk.ts`. Il porte une **liste de périodes
datées par régime**, pas une table indexée par année :

```ts
export type Regime = 'annuel' | 'trimestriel';

export interface RatePeriod {
  /** Début inclus, ISO 8601 (« 2026-07-01 »). */
  from: string;
  /** Fin incluse (« 2027-06-30 »). */
  to: string;
  /** €/km — quatre décimales, c'est la précision des circulaires. */
  rate: number;
  /** Circulaire BOSA et sa publication au Moniteur, pour l'affichage. */
  source: string;
}

export const PERIODS: Record<Regime, readonly RatePeriod[]>;
```

Le régime mensuel d'avril-juin 2026 se range sans exception dans cette forme :
trois périodes d'un mois dans la liste `trimestriel`. C'est précisément
l'intérêt de ne pas typer la durée.

Le calcul reste trivial (`d × rate`, `fixe = 0`) : **la difficulté n'est pas le
calcul, c'est la donnée et sa datation.**

**Ce que ça implique pour l'UI du calculateur.**

- Deux questions au lieu d'une : le **régime** puis la **période**. Or le
  régime n'est pas un choix du visiteur mais de son employeur — la question
  doit être posée comme telle (« Votre employeur applique-t-il le barème annuel
  ou trimestriel ? ») avec une troisième option « je ne sais pas » qui affiche
  **les deux résultats côte à côte**. C'est la seule réponse honnête.
- Un total annuel « 15 000 km × taux » est **faux** dès que l'année traverse
  une frontière de période. Il faut ventiler par période, comme le calculateur
  UK ventile par bande — sauf que la ventilation est **temporelle**, pas
  kilométrique. Le composant doit demander une distance **par période**, ou
  assumer explicitement une répartition uniforme et le dire.
- Chaque chiffre affiché doit porter **sa période de validité et sa source**
  (« 0,4761 €/km — circulaire BOSA n° 767, MB du 16 juin 2026, valable du
  1ᵉʳ juillet 2026 au 30 juin 2027 »). Sur ce marché, un taux sans date est
  inutilisable.

**Ce que ça implique pour la maintenance.** C'est le vrai coût récurrent, et il
n'existe sur aucun autre marché du répertoire :

- **Rythme** : une circulaire annuelle (fin juin) **plus** quatre circulaires
  trimestrielles (fin décembre, mars, juin, septembre). Cinq mises à jour par
  an au minimum.
- **Responsable** : à désigner nommément. Sans propriétaire, la donnée pourrit.
- **Risque d'affichage périmé** : au 7 septembre 2026, la valeur du **T4 2026
  n'est pas encore publiée**. Un site lancé aujourd'hui affiche donc un barème
  dont la prochaine valeur est inconnue, et qui sera périmé début octobre.
- **Garde-fou technique à écrire** : si `today > dernier to` d'un régime, le
  calculateur affiche une bannière « barème en attente de publication au
  Moniteur » plutôt qu'un chiffre faux avec assurance. Ce n'est pas une note de
  bas de page, c'est un composant.

## Le piège belge n° 2 : l'indemnité vélo, l'angle que la France n'a pas

La **CCT n° 164** du Conseil national du Travail rend l'indemnité vélo
obligatoire dans le secteur privé pour les trajets domicile–lieu de travail
depuis le 1ᵉʳ mai 2023. C'est une obligation légale nationale, sans équivalent
français, et un sujet dont les chiffres circulent **faux** partout — y compris
sur un site fédéral.

**Deux montants, systématiquement confondus.** C'est le pendant belge du piège
allemand « Kilometerpauschale vs Entfernungspauschale » : le nôtre doit être
l'article qui tranche.

| | **Montant dû par la CCT 164** | **Plafond d'exonération fisc + ONSS** |
|---|---|---|
| Nature | Minimum **obligatoire** | Maximum **toléré** |
| 2025 | 0,29 €/km | 0,36 €/km — 3 610 €/an |
| **2026** | **0,30 €/km** | **0,37 €/km — 3 700 €/an** |
| Source | Art. 6 CCT 164, indexé chaque 1ᵉʳ janvier | SPF Finances / instructions ONSS |

Le plafond annuel de 3 700 € est celui du **SPF Finances** et de l'**ONSS** ;
la page du **SPF Mobilité et Transports** annonce 3 690 €, repris par plusieurs
secrétariats sociaux. En matière fiscale, l'autorité est le SPF Finances.

**Les autres règles utiles :**

- **Plafond de distance** : art. 5 CCT 164, « maximum **20 kilomètres par
  trajet simple** ». Le « 40 km/jour » repris partout est une déduction, pas le
  texte — un travailleur qui ne fait que l'aller reste plafonné à 20 km.
- **Champ d'application** : art. 2 §2 — toute CCT sectorielle ou d'entreprise
  prévoyant une indemnité vélo **spécifique évince la CCT 164**, *même si elle
  est moins favorable*. Il n'y a **aucune condition d'équivalence**.
- **Régularité** : art. 4 §1, une fois par semaine suffit ; un usage limité à
  l'été est couvert.
- **Justification** : art. 8 — le travailleur remplit une **déclaration sur
  l'honneur** mensuelle (kilomètres parcourus et nombre de jours), l'employeur
  définit les modalités de contrôle.
- **Cumul** : art. 4 §2 — cumulable avec un autre mode pour des **tronçons
  différents** ou des **périodes différentes**. La limite est
  l'anti-double-indemnisation d'une même distance au même moment. L'indemnité
  vélo relève du **domicile-travail**, l'indemnité kilométrique voiture des
  **déplacements professionnels** : ce sont deux compteurs distincts qui se
  cumulent naturellement.

**Le volume, honnêtement mesuré.** La CCT 164 *stricto sensu* ne s'applique
qu'aux commissions paritaires sans CCT vélo propre : **44 (S)CP, soit 9,7 % des
travailleurs du privé**, environ 300 000 personnes en borne haute. Mais ce
n'est pas le bon chiffre pour évaluer l'intérêt éditorial : en 2024,
**867 751 salariés** ont perçu une indemnité vélo, soit **20,4 % des salariés
belges**, pour **329 M€** versés par 63 957 entreprises. Le sujet de recherche,
c'est ce second chiffre.

### Ce qu'izika en fait — trois réponses, dont une négative

- **Produit : non, pas au lancement.** L'indemnité vélo porte sur le
  **domicile-travail**, que l'agenda ne contient pas. La promesse d'izika
  — « l'agenda fait le travail » — ne s'applique pas ici. Le comptage en jours
  et le plafond par trajet simple sont par ailleurs un autre modèle de données.
  Le dire clairement évite de reproduire le décalage site / app du UK.
- **Calculateur : oui, un onglet.** Taux plat, plafond de 20 km par trajet
  simple, plafond annuel de 3 700 € : c'est le module le plus simple du site.
  C'est le pendant belge de l'onglet Pendlerpauschale allemand — gros volume,
  sujet fraîchement légiféré, faible concurrence — et il amène sur la page le
  public qui, lui, a un usage voiture professionnel.
- **Éditorial : oui, prioritaire.** Un article qui distingue proprement les
  0,30 €/km dus et les 0,37 €/km exonérés, cite l'article 5 au lieu du
  « 40 km/jour », et signale la règle d'éviction de l'art. 2 §2, est
  immédiatement meilleur que ce qui circule. C'est l'article de lancement n° 1.

### Le budget mobilité : à mentionner, pas à intégrer

Institué par la loi du 17 mars 2019 et réformé par la loi du 25 novembre 2021,
le budget mobilité reste **facultatif** au 7 septembre 2026 — l'avant-projet
qui le rendrait obligatoire (50+ travailleurs au 1ᵉʳ janvier 2027) est passé en
Conseil des ministres le 9 janvier 2026 mais **n'est pas publié au Moniteur**.
Les articles annonçant une obligation « dès 2026 » sont périmés.

Son adoption reste marginale : **18 386 travailleurs en 2024**, moins de 1 % des
salariés du privé, pour ~3 % du parc de voitures de société.

Le rapport avec izika est **essentiellement négatif, et c'est ce qui le rend
utile** : depuis le 1ᵉʳ janvier 2023, un employeur **ne peut plus verser
d'indemnité kilométrique exonérée** en plus du budget mobilité lorsque celui-ci
a été calculé en incluant les frais d'usage professionnel du véhicule.
L'indemnité vélo n'est pas cumulable non plus.

→ Une case à cocher ou un avertissement dans le calculateur, pas un module. Et
un angle éditorial peu couvert : « budget mobilité et indemnité kilométrique :
que puis-je cumuler ? ». Détail technique amusant à citer dans l'article : la
formule de TCO de l'AR du 10 septembre 2023 utilise « 30 % de l'indemnité
kilométrique » au sens de l'art. 74 de l'AR du 13 juillet 2017 — c'est-à-dire
**exactement le barème trimestriel ci-dessus**.

## Chemin technique

Le compilateur guide l'ordre, comme pour `/de`.

### 1. Déclarer le pays et le marché — sans nouvelle langue

```ts
// src/i18n/countries.ts
export const countryIds = ['FR', 'GB', 'BE'] as const;
COUNTRIES: { …, BE: { id: 'BE', region: 'europe' } }

// src/i18n/languages.ts  →  INCHANGÉ. Pas de nouvelle langue.

// src/i18n/markets.ts
export const marketIds = ['fr', 'uk', 'be-fr'] as const;
```

Le `Market` `be-fr`, champ par champ :

| Champ | Valeur | Note |
|---|---|---|
| `id` | `'be-fr'` | Pas `'be'` — voir § articulation `/be-nl` |
| `country` | `'BE'` | |
| `language` | `'fr'` | **Réutilisation**, pas duplication |
| `currency` | `'EUR'` | |
| `numberLocale` | `'fr-BE'` | Rendu identique à `fr-FR` en ICU (vérifié) ; correct sémantiquement, et discriminant le jour où `nl-BE` arrive |
| `hreflang` | `'fr-BE'` | Le signal de ciblage régional |
| `ogLocale` | `'fr_BE'` | |
| `schemaInLanguage` | `'fr-BE'` | |
| `siteName` | Repris de `fr` | |
| `websiteDescription` / `defaultDescription` | **Réécrits** | Doivent différer de `/fr` — voir § cannibalisation |
| `joinUrl` / `appUrl` | `site.joinUrl` / `go.izika.com` | Inchangés |
| `cookiesVersion` | `'izika-fr-EU'` **à confirmer** | La version est en français et à portée UE : probablement réutilisable telle quelle, contrairement à `/uk` et `/de` |
| `trustpilot` | `{ widgetLocale: 'fr-FR', url: 'https://fr.trustpilot.com/review/izika.com' }` | Widget **actif** — les avis sont en français et lisibles par un Belge |
| `legal` | izika SAS, RCS Montpellier 807746524, adresse française | Inchangé — aucun établissement belge |
| `pricing` | `{ yearly: '99', monthly: '10' }` | Mais l'affichage change, voir § juridique |

Ajouter `BE: 'Belgique'` à `src/i18n/fr.ts` **et** `BE: 'Belgium'` à
`src/i18n/en.ts` : `dict.countries` est typé par `CountryId`, un pays sans
traduction ne compile pas.

### 2. Le dictionnaire n'est pas à écrire — il est à partager

C'est la contrainte technique **nouvelle** de ce marché, et elle n'existe dans
aucun plan précédent. Dans `src/i18n/index.ts` :

```ts
const dictionaries: Record<Language, Dict> = { fr, en };
export function t(market: MarketId): Dict {
  return dictionaries[getMarket(market).language];
}
```

Le dictionnaire est résolu **par langue**, pas par marché. `/be-fr` reçoit donc
**exactement le même `fr.ts` que `/fr`**, octet pour octet. Jusqu'ici, chaque
langue n'avait qu'un marché ; la Belgique est le premier cas où deux marchés se
partagent un dictionnaire, et le chrome (en-tête, méga-menu, pied de page) ne
peut pas diverger entre les deux sans changer l'architecture.

Deux clés de `src/i18n/fr.ts` posent problème telles quelles sur `/be-fr` :

| Ligne | Clé | Texte actuel | Problème |
|---|---|---|---|
| 66 | `footer.since` | « Éditeur français indépendant depuis 2014 » | Vrai, mais c'est un argument de proximité qui ne porte pas en Belgique |
| 102 | `solutionsMenu.blurb` | « …recommandée par les **experts comptables** » | Le titre n'existe pas tel quel en Belgique — l'équivalent relève de l'**ITAA** |

Trois options, à trancher **avant** le lot 1 :

1. **Reformuler pour les deux marchés.** « Éditeur européen indépendant depuis
   2014 » et « recommandée par les professionnels du chiffre » fonctionnent en
   France comme en Belgique. Coût nul, mais ça modifie `/fr` en production.
2. **Faire porter ces deux chaînes par le `Market`** plutôt que par le
   dictionnaire, comme `legal` et `pricing` le sont déjà. Techniquement propre,
   c'est le sens de l'architecture, mais ça touche `Header`, `Footer` et
   `SolutionsMenu`.
3. **Ne rien faire.** Acceptable au lancement : les deux formulations sont
   inexactes en Belgique sans être fausses. À documenter comme dette.

Recommandation : **option 1 au lancement, option 2 le jour où un troisième
marché francophone arrive** (`/ch-fr`, `/lu-fr`) — à ce moment-là, la question
se posera trois fois.

### 3. Slugs dans `src/i18n/routes.ts`

Même langue, mêmes requêtes : les slugs de `be-fr` sont **identiques à ceux de
`fr`**, à une exception près. Diverger sans raison rendrait la relation
`/fr` ↔ `/be-fr` illisible, et le couplage hreflang se fait par `RouteKey`, pas
par slug — aucune contrainte technique n'impose de les aligner ni de les
séparer.

| Clé | Slug `be-fr` | Note |
|---|---|---|
| `home` | `''` | |
| `solo`, `team` | `solo`, `team` | Noms de produit |
| `teamEntreprises` | `team-entreprises` | |
| `teamCollectivites` | `team-collectivites` | En Belgique : communes, CPAS, intercommunales |
| `features` | `fonctionnalites` | |
| `pricing` | `pricing` | Anglicisme hérité de `/fr` ; dette partagée, hors périmètre |
| `faq`, `security` | `faq`, `security` | |
| `legal` | `mentions-legales` | |
| `privacy` | `charte-de-confidentialite` | |
| `terms` | `cgv` | |
| `calculator` | `calculateur-indemnites-kilometriques` | Même requête qu'en France |
| `articles` | *(absent)* | Comme `/uk` — hub non ouvert au lancement |

`solutionsBase['be-fr'] = 'solutions'`. Dans `solutionSlugs`, quatre slugs sur
cinq sont repris tels quels (`agent-general-assurances`,
`professions-liberales`, `artisans-btp`, `consultants`). **Une exception
fondée** : `agentsImmobilier` passe de
`agents-immobilier-mandataires-immobilier` à **`agents-immobiliers`** — le
« mandataire immobilier » est un statut français issu de la loi Hoguet, sans
équivalent belge. La profession belge est encadrée par l'**IPI** avec les
colonnes courtier, syndic et régisseur.

Rappel du garde-fou : une solution existe dans un marché **ssi** son slug est
ici **et** son YAML est dans `src/content/solutions/be-fr/` — le build échoue
dans les deux sens.

### 4. Pages et modules de copy — ce qui se réutilise vraiment

13 pages sous `src/pages/be-fr/`, calquées sur `src/pages/fr/`, plus les 5 YAML
de solutions. Les pages importent leurs modules de copy explicitement
(`import { homePageFr } from '../../data/home-page.fr'`), donc **rien n'empêche
`src/pages/be-fr/index.astro` d'importer un `home-page.be-fr.ts`** — le
verrouillage par langue ne touche que le dictionnaire.

Estimation module par module, en partant de la copy française existante :

| Module | Lignes | Réutilisable tel quel | Ce qui doit changer |
|---|---|---|---|
| `home-page.be-fr.ts` | 174 | ~70 % | Témoignages, mentions « France », exemples chiffrés |
| `team-page.be-fr.ts` | 138 | ~75 % | « Créé et hébergé en France » |
| `solo-page.be-fr.ts` | 136 | ~75 % | Idem + « normes fiscales » à requalifier |
| `team-landing.be-fr.ts` | 114 | ~65 % | Bloc « fabriqué en France, pour des entreprises françaises », « support en français non sous-traité », « règles fiscales françaises » |
| `faq.be-fr.ts` | 101 | ~60 % | Réponses barème, hébergement, « entreprise française de la région montpelliéraine » |
| `pricing-page.be-fr.ts` | 82 | ~85 % | Mention HT / TTC (voir § juridique) |
| `faq-calculateur.be-fr.ts` | 75 | **~0 %** | Entièrement français : puissance fiscale en CV, barème CGI, exemple « 5 CV et 4 000 km » |
| `features-page.be-fr.ts` | 73 | ~80 % | « Configurez vos véhicules et leurs puissances fiscales » |
| `feature-cards.be-fr.ts` | 29 | ~90 % | Libellé « Conformité fiscale » |
| `compliance-section.be-fr.ts` | 14 | **~0 %** | Les 4 items sont touchés : « experts-comptables », « support en France » |
| 5 × `src/content/solutions/be-fr/*.yaml` | ~650 | ~70 % | « puissance fiscale », « barème fiscal », métiers |
| `src/i18n/be-fr.ts` | **0** | — | **N'existe pas.** `fr.ts` est réutilisé |
| **Total** | **≈ 1 586** | **≈ 68 %** | **≈ 500 lignes de rédaction réelle** |

À comparer aux **~1 650 lignes intégralement à produire** en allemand, dont
aucune n'est relisible en interne. C'est le vrai gain du marché belge, et il
est considérable — mais 500 lignes ne sont pas zéro.

### 5. Calculateur

Nouveau module de données pur `src/data/mileage-be.ts` (structure au § piège
n° 1), **délibérément non partagé** avec `bareme-ik.ts` ni `mileage-uk.ts`,
conformément à l'en-tête de ces deux modules. Nouvel îlot React
`src/components/MileageCalculatorBE.tsx`, réutilisant
`src/components/calculator/shared.tsx` (`SegmentedRadio`, `StepBadge`) comme
celui du UK. Libellés réglementaires dans `src/data/mileage-be.labels.be-fr.ts`,
jamais dans le module de données.

**Bug bloquant à corriger dans `src/lib/format.ts`.** `formatCoef` est figé à
trois décimales (`minimumFractionDigits: 3, maximumFractionDigits: 3`), ce qui
convient au barème français (`0,529`). Les circulaires belges publient
**quatre** décimales : `formatCoef(0.4761)` rend **`0,476`**, un chiffre faux
sur une page dont l'argument est la précision. Il faut paramétrer la précision
ou ajouter un formateur dédié. C'est une ligne de code, mais elle est
bloquante.

### 6. Articles

Collection `src/content/articles/be-fr/` — la collection Keystatic
`articles_be-fr` apparaît automatiquement dès que `be-fr` est dans `marketIds`
(`keystatic.config.ts` la génère par `marketIds.map`). *À vérifier* : c'est la
première clé de collection Keystatic à contenir un tiret ; le libellé affiché
sera « Articles (BE-FR) ».

Trois articles pour ouvrir, **contenu original, pas des traductions de `/fr`** :

1. `indemnite-velo-cct-164-2026` — l'aimant. Les deux montants, le plafond de
   20 km par trajet simple, la règle d'éviction sectorielle. Pas de
   `hreflangKey` : la France n'a pas d'équivalent.
2. `indemnite-kilometrique-belgique-2026` — le pilier : les deux régimes, la
   série des taux, qui choisit, l'exonération ONSS et fiscale, l'épisode
   mensuel d'avril-juin 2026. `hreflangKey` partagé avec
   `fr/bareme-indemnites-kilometriques-2026` et `en/hmrc-mileage-rates-2026`.
3. `budget-mobilite-et-indemnite-kilometrique` — article de conversion sur une
   requête peu couverte, qui répond à une question de non-cumul que personne ne
   traite clairement.

Pas de hub `/be-fr/articles` au lancement (comme `/uk`) : la copy française
inline de `src/pages/[market]/articles/index.astro` devrait d'abord être
internationalisée. Les articles restent accessibles en `/be-fr/<slug>` et par le
sitemap.

## Le français de Belgique

L'équipe maîtrise le français — pas les usages belges. Le risque n'est pas la
langue, c'est la **référence** : une copy qui parle d'URSSAF, de barème CGI ou
d'experts-comptables à un lecteur belge est *factuellement fausse*, et le lecteur
le voit immédiatement.

### Ce qui est faux en Belgique dans la copy existante

| Élément français | Où | Équivalent belge |
|---|---|---|
| URSSAF | Absent du code, présent dans les articles `/fr` | **ONSS** (fr) / RSZ (nl) |
| Barème CGI, art. 6 B ann. IV | `bareme-ik.labels.fr.ts`, `faq-calculateur.fr.ts` | AR du 18/01/1965 et AR du 13/07/2017 ; circulaires **BOSA** au *Moniteur belge* |
| DGFiP, impots.gouv.fr | Articles `/fr` | **SPF Finances** |
| « experts-comptables » | `fr.ts` l. 102, `compliance-section.fr.ts`, 5 YAML solutions, `team-landing.fr.ts` | **ITAA** — titres protégés : « expert-comptable certifié » et « conseiller fiscal certifié ». *À confirmer* auprès de l'ITAA avant de figer le libellé |
| Puissance fiscale en CV | `faq-calculateur.fr.ts`, `faq.fr.ts`, `features-page.fr.ts`, 3 YAML | **Sans objet** : le barème belge est un forfait unique, indépendant du véhicule. Les CV existent en Belgique pour la taxe de circulation régionale, **pas** pour l'indemnité kilométrique — les mentionner serait une erreur de fond |
| « Éditeur français indépendant depuis 2014 » | `fr.ts` l. 66 | Voir § dictionnaire partagé |
| « Support en France, à l'écoute et réactif » | `compliance-section.fr.ts` | À reformuler : c'est vrai, mais l'argument porte à l'envers vu de Bruxelles. « Support en français, non sous-traité » dit la même chose sans le contre-sens |
| « Conforme aux règles fiscales **françaises** et européennes » | `team-landing.fr.ts` l. 87 | À réécrire pour la Belgique |
| Journal officiel | Articles `/fr` | ***Moniteur belge*** |
| Prélèvement à la source | Articles `/fr` | **Précompte professionnel** (mécanisme différent) |
| Convention collective de branche | — | **CCT** de **commission paritaire** (CP / SCP) |
| Cabinet d'expertise comptable | — | **Secrétariat social** pour la paie et les frais |
| Greffe / RCS | Mentions légales | **BCE** et numéro d'entreprise |

### Ce que l'équipe peut faire seule, et ce qu'elle ne peut pas

**Seule** : toute la copy marketing, la structure, les arguments, la relecture
de fond, les pages produit. Le français écrit professionnel belge et français
sont pratiquement identiques — « septante » et « nonante » relèvent de l'oral
et n'ont pas leur place dans de la copy, et les faux amis courants (« GSM »
pour téléphone portable) ne concernent pas notre vocabulaire.

**Pas seule**, et c'est là qu'un relecteur belge reste indispensable :

- **Le vocabulaire administratif et RH**, où une erreur discrédite : ONSS,
  précompte professionnel, commission paritaire, secrétariat social, ITAA,
  numéro d'entreprise. Ce sont des mots à charge institutionnelle, pas des
  synonymes.
- **Les titres professionnels protégés** — se tromper sur « expert-comptable
  certifié » est le genre d'erreur qu'un professionnel du chiffre relève.
- **Les trois pages légales**, qui ne relèvent pas de la relecture mais de la
  rédaction juridique (§ suivant).
- **Le ton institutionnel**, plus sobre et moins promotionnel qu'en France dans
  le B2B belge. *À confirmer* par le relecteur.

Le profil recherché n'est donc pas un traducteur mais un **relecteur métier
belge** — idéalement un professionnel du chiffre ou un consultant RH — mobilisé
sur une passe de relecture, pas sur un contrat de rédaction. C'est une
différence de nature, et de facture, avec le circuit allemand.

## Juridique — bloquant

Le point de départ est favorable et souvent ignoré : l'**art. XII.3 du Code de
droit économique** transpose le principe du **pays d'origine** de la directive
2000/31/CE. Un prestataire établi en France relève du droit français pour le
« domaine coordonné » — donc pour les mentions légales. Mais l'**art. XII.4**
en exclut explicitement « les obligations contractuelles concernant les
contrats conclus par les consommateurs ». **La forme est française, le fond du
contrat B2C est belge.** Tout le reste de cette section découle de là.

- [ ] **Mentions légales** (`/be-fr/mentions-legales`) — le RCS français
      suffit ; **aucune inscription à la BCE** n'est requise sans unité
      d'établissement en Belgique, et **aucune immatriculation TVA belge** non
      plus (§ TVA). Aligner malgré tout le contenu sur l'art. XII.6 CDE, quasi
      identique à l'art. 6-III LCEN : dénomination, adresse géographique,
      e-mail de contact rapide, numéro d'entreprise le cas échéant, numéro de
      TVA. Coût quasi nul, et supprime toute discussion.
- [ ] **CGV** (`/be-fr/cgv`) — le vrai chantier. Quatre points :
      - **Clause de droit applicable** : le règlement Rome I, art. 6 §2, laisse
        la clause « droit français » licite **mais** conserve au consommateur
        belge le bénéfice des règles impératives belges. Pire, une clause
        rédigée de façon à laisser croire que seul le droit français s'applique
        est elle-même susceptible d'être jugée abusive (CJUE, *Amazon EU*,
        C-191/15). Il faut **ajouter la réserve explicite**, pas seulement
        maintenir la clause.
      - **Clause attributive de juridiction** : double verrou fermé. L'art.
        VI.83, 23° CDE la classe en liste noire, et le règlement Bruxelles I
        bis (art. 17 à 19) garantit au consommateur le for de son domicile. Une
        clause « tribunaux de Montpellier » est **inopposable** à un
        consommateur belge. Elle reste valable en B2B.
      - **Clauses abusives** : l'art. VI.83 CDE contient **33 clauses noires**,
        sans pouvoir d'appréciation du juge, contre 12 noires et 10 grises en
        France. À auditer en priorité : révision unilatérale des prix (2° et
        3°), modification unilatérale des caractéristiques essentielles (4°),
        exonération de responsabilité pour faute lourde (13°), reconduction
        automatique avec préavis excessif (19° et 20°).
      - **Droit de rétractation** : les 14 jours de l'art. VI.47 CDE
        **s'appliquent**. L'exception « contenu numérique » de l'art. VI.53,
        13° vise les *contenus* ; un abonnement SaaS est un **service
        numérique**, et l'exception du 1° suppose un service *pleinement
        exécuté* — ce qui n'arrive jamais en 14 jours d'abonnement. Prévoir le
        formulaire type et le recueil de la demande expresse d'exécution
        immédiate avec paiement au prorata.
- [ ] **Retirer le lien vers la plateforme ODR** s'il figure encore dans les
      CGV : elle est **fermée depuis le 20 juillet 2025** (règlement UE
      2024/3228). La mention est aujourd'hui trompeuse. Concerne aussi `/fr` et
      `/uk` — à vérifier sur les trois marchés.
- [ ] **Règlement extrajudiciaire** — le livre XVI CDE impose de communiquer
      les coordonnées du service de traitement des plaintes (art. XVI.2) et de
      l'entité qualifiée compétente (art. XVI.4). izika restant soumise au droit
      français sur ce point, son médiateur français reste la référence ;
      mentionner **en plus** le Service de Médiation pour le Consommateur belge
      est une bonne pratique de transparence.
- [ ] **Charte de confidentialité** (`/be-fr/charte-de-confidentialite`) — le
      socle RGPD est identique. Trois ajouts :
      - La **CNIL reste autorité chef de file** (art. 56 RGPD, établissement
        unique en France). **Aucun représentant belge** n'est à désigner.
      - Ajouter les coordonnées de l'**APD** à côté de celles de la CNIL : un
        client belge peut la saisir directement (art. 56 §2).
      - **Le point d'exposition réel : les cookies.** Le guichet unique de
        l'art. 56 ne couvre pas l'ePrivacy. L'APD est compétente seule sur le
        bandeau de consentement vu par un visiteur belge, sans passer par la
        CNIL. Sa doctrine (refus aussi visible qu'accepter, pas de cookie wall,
        pas de dark patterns) est alignée sur celle de la CNIL, donc sans
        surcoût — mais c'est la seule brèche belge autonome.
      - Âge du consentement des mineurs : **13 ans en Belgique** (loi du
        30 juillet 2018, art. 7) contre 15 en France. Sans objet pour un SaaS
        professionnel ; à retenir si un usage grand public s'ouvre.
- [ ] **TVA et affichage des prix** — c'est le point qui touche la page tarifs :
      - **B2C** : TVA belge à **21 %** via le guichet unique **OSS**, au-delà du
        seuil de 10 000 € de chiffre d'affaires transfrontière UE cumulé.
        Aucune immatriculation belge.
      - **B2B** : **autoliquidation** par le preneur assujetti belge (art. 51
        §2 du Code de la TVA belge), facture HT portant la mention
        « Autoliquidation » et le numéro de TVA du client. **Vérification VIES
        systématique et archivage de la preuve** — sans elle, l'administration
        peut réclamer la TVA française.
      - **Collectivités belges** : le test opérationnel est unique — numéro de
        TVA valide dans VIES → HT et autoliquidation ; pas de numéro → TTC belge
        via OSS. *À faire confirmer par la compta*, ça concerne un segment
        client entier.
      - **Affichage** : l'art. VI.3 CDE impose au consommateur un **prix total
        TVA comprise**. Or 21 % en Belgique contre 20 % en France : **un TTC
        unique ne peut pas être affiché sur les deux marchés**. La page
        `/be-fr/pricing` doit soit afficher le TTC belge, soit afficher HT et
        TTC côte à côte avec le taux. Aujourd'hui `/fr` et `/uk` n'affichent
        aucune mention. Trancher avant d'écrire la page.
- [ ] **Faire relire les trois pages par un juriste belge.** Contrairement à
      l'allemand, l'équipe pourra **lire et valider** ce qui lui est livré : pas
      de résumé français à commander. La commande porte sur la rédaction, pas
      sur la traduction.

## Produit / App — à confirmer

- [ ] **Le forfait belge est-il servable par le barème personnalisé** de
      `go.izika.com` ? Un taux unique `d × coef`, `fixe = 0`, est exactement ce
      qu'un barème personnalisé exprime — c'est le même raisonnement que pour
      l'Allemagne. Si oui, `/be-fr` se lance sans dette. Si non, l'écart
      site / app du Royaume-Uni se reproduit.
- [ ] **Le barème personnalisé accepte-t-il un changement de taux en cours
      d'année ?** C'est la question spécifiquement belge, et elle est plus dure
      que la précédente. Un utilisateur belge sur le régime trimestriel a
      **quatre taux dans une même année**, et six en 2026. Si l'app ne sait
      porter qu'un taux par exercice, le relevé annuel est faux — et ce n'est
      pas rattrapable par le site.
- [ ] **Support** : aucune décision à prendre. Le français est couvert.
- [ ] **Ce que le site peut promettre** sur la conformité ONSS / SPF Finances :
      à trancher avec le juridique **avant** d'écrire
      `compliance-section.be-fr.ts`, comme GoBD et DATEV pour `/de`.

## Marketing / Contenu

- [ ] **Trancher la stratégie de différenciation `/fr` ↔ `/be-fr` avant
      d'écrire la première ligne.** C'est le lot 0 belge. Sans elle, on produit
      deux pages françaises quasi identiques qui se cannibalisent (§ SEO).
- [ ] Produire les ~500 lignes de rédaction réelle du § 4 — l'essentiel est de
      l'adaptation, mais `faq-calculateur.be-fr.ts` et
      `compliance-section.be-fr.ts` sont à réécrire intégralement.
- [ ] **Recruter un relecteur métier belge** (professionnel du chiffre ou
      consultant RH) pour une passe de relecture terminologique. Une
      prestation ponctuelle, pas un contrat de rédaction.
- [ ] **Reprendre les deux clés partagées de `src/i18n/fr.ts`** (`footer.since`
      l. 66, `solutionsMenu.blurb` l. 102) selon l'option retenue au § 2.
- [ ] **Consentement Axeptio** : vérifier que `izika-fr-EU` couvre la Belgique.
      Si oui, c'est le premier marché supplémentaire sans travail Axeptio —
      contrairement à `/uk`, qui traîne encore ce défaut
      (`docs/mise-en-production.md`, vigilance 2).
- [ ] **Preuve sociale** : activer le widget (`widgetLocale: 'fr-FR'`), les
      avis étant en français. Seul marché supplémentaire où c'est possible.
      *À confirmer* que Trustpilot ne propose pas de locale `fr-BE`.
- [ ] **Témoignages** : les trois de la home restent lisibles. Viser un ou deux
      cas belges dans les six mois, l'ancrage local comptant beaucoup sur ce
      marché.
- [ ] Les 3 articles de lancement (§ 6), dans l'ordre indiqué — le vélo
      d'abord.

## Design / Assets

- [ ] **Rien de bloquant, et c'est notable.** La bannière OpenGraph française,
      les captures produit, les visuels des landings et le badge « CERTIFIÉ
      CONFORME » du méga-menu sont en français et se transportent tels quels.
      C'est le seul marché du répertoire dans ce cas.
- [ ] **Un seul visuel à refaire** : tout écran montrant le barème français par
      puissance fiscale (tableau du calculateur, visuels de
      `/fr/calculateur-indemnites-kilometriques`). Le barème belge est un
      forfait unique — un tableau à colonnes CV est un contre-sens visuel.
- [ ] Vérifier que les rapports en €/km affichés dans les captures ne portent
      pas de mention « barème CGI » ou de puissance fiscale.

## SEO / Growth

- [ ] **Traiter la cannibalisation `/fr` ↔ `/be-fr`** — voir § dédié
      ci-dessous. Premier poste, avant toute considération technique.
- [ ] hreflang : les paires `fr-FR` ↔ `fr-BE` ↔ `en-GB` s'émettent
      automatiquement dès qu'une route existe dans ≥ 2 marchés
      (`hreflangAlternates` dans `src/i18n/index.ts`). Rien à câbler, mais à
      **vérifier** sur les routes partiellement lancées.
- [ ] `hreflangKey` des articles : relier `indemnite-kilometrique-belgique-2026`
      à ses équivalents FR et EN. L'article vélo n'en porte pas — comportement
      voulu.
- [ ] `xDefaultMarket` reste `fr`. Un visiteur non ciblé atterrit sur `/fr`,
      ce qui reste le bon défaut.
- [ ] Soumettre le sitemap à Google Search Console. Bing pèse peu en Belgique
      francophone, priorité basse.
- [ ] **Surveillance à 4 puis 8 semaines** dans Search Console — voir la liste
      précise au § cannibalisation.
- [ ] Test manuel du tunnel complet depuis une IP belge avant l'annonce.

## Dev

- [ ] **`src/lib/format.ts`** : `formatCoef` est figé à 3 décimales et tronque
      `0,4761` en `0,476`. Bloquant pour le calculateur belge.
- [ ] `docs/mise-en-production.md` § 5 « Contenu et pages légales » : ajouter la
      ligne belge.
- [ ] **`CountrySwitcher.astro`** — voir § dédié ci-dessous. Rien ne casse au
      lancement de `/be-fr` seul, mais le point est à documenter.
- [ ] Vérifier que la clé de collection Keystatic `articles_be-fr` (avec tiret)
      fonctionne dans l'admin — c'est la première.
- [ ] `TrackedLink` garde `site.joinUrl` en href par défaut, commun à tous les
      marchés. Toujours vrai pour `be-fr`.
- [ ] `npx astro check` puis `npm run build` : le typage liste exactement ce qui
      manque à chaque étape. C'est la vérification principale.

## Positionnement et SEO

### Le risque n° 1 : `/fr` et `/be-fr` se cannibalisent

C'est le problème que l'Allemagne n'a pas et que la Belgique impose. Deux pages
en français, même intention de recherche, contenus proches : Google peut les
traiter comme des doublons et n'en indexer qu'une, avec le message « Page en
double, Google n'a pas sélectionné la même page canonique ».

**Le hreflang ne résout pas ça.** `hreflangAlternates` fait exactement ce qu'il
faut — dès que `/be-fr` déclare un slug pour une route servie par `/fr`, les
deux pages émettent `fr-FR` et `fr-BE`, plus le `x-default` vers `/fr`. C'est le
cas d'usage canonique du ciblage régional, et il est déjà câblé. Mais le
hreflang **désambiguïse**, il ne **dédoublonne** pas : il n'aide que si les deux
pages diffèrent assez pour mériter d'exister toutes les deux.

**Ce qui doit différer, concrètement :**

| Élément | `/fr` | `/be-fr` |
|---|---|---|
| Barème cité | 0,529 €/km à 0,316 €/km selon CV et tranche | 0,4761 ou 0,4440 €/km selon régime |
| Autorités | DGFiP, URSSAF, CGI | SPF Finances, ONSS, *Moniteur belge* |
| Structure du barème | 5 classes de CV × 3 tranches | Forfait unique, deux régimes d'indexation |
| Exemples chiffrés | « 5 CV, 4 000 km » | Un déplacement type, sans puissance fiscale |
| Sujet propre | Barème 2026, provisions mensuelles | **Indemnité vélo, budget mobilité** |
| Pages légales | Droit français | Réserve Rome I, TVA 21 %, APD |

Si `/be-fr/faq` est `/fr/faq` moins trois mots, c'est du duplicate, et le
marché ne se référencera pas. **La différenciation éditoriale n'est pas un
raffinement de fin de projet, c'est la condition d'existence du marché.** C'est
pourquoi elle est en tête du lot 0.

**À surveiller dans Search Console, à 4 puis 8 semaines :**

- Rapport « Ciblage international » : erreurs hreflang, en particulier les
  balises retour manquantes.
- Rapport « Pages » → « Page en double, Google n'a pas sélectionné la même page
  canonique » : c'est le signal direct de cannibalisation.
- Rapport « Performances » filtré sur **Pays = Belgique** : vérifier laquelle
  des deux URL Google sert réellement aux requêtes belges. Si `/fr` continue de
  sortir en Belgique après huit semaines, la différenciation est insuffisante.

### Le sélecteur de pays : la branche jamais exercée

Point d'attention à documenter, avec une nuance qui change son urgence.

`countrySwitcher` (`src/i18n/index.ts`) groupe les marchés par pays et
`CountrySwitcher.astro` bifurque sur `country.languages.length === 1`. La
branche « plusieurs langues » — celle qui rend `languagesLabel` et une liste de
pastilles par langue — **n'a jamais été rendue** : `/fr` et `/uk` sont chacun
seuls sur leur pays.

**Au lancement de `/be-fr` seul, elle ne l'est toujours pas.** La Belgique
n'aura qu'un marché, donc `languages.length === 1`, et le rendu passe par la
branche mono-langue déjà éprouvée. Ce qui change au lancement est mineur et
sans risque : `countryCount` passe à 3, « Belgique » s'insère avant « France »
dans le tri par `Intl.Collator`, et `showRegions` reste `false` puisque les
trois pays sont en `europe`.

**C'est le jour où `/be-nl` arrive que la branche se déclenche pour la première
fois**, et elle n'aura jamais été testée à ce moment-là. Deux conséquences :

1. Ne pas traiter ce point comme bloquant pour `/be-fr`. Il ne l'est pas.
2. L'inscrire au plan `/be-nl` comme un vrai poste de recette — clavier,
   lecteurs d'écran, `aria-label` composé, état courant, mobile — et non comme
   une vérification de dernière minute.

### Concurrence et canal

Le paysage belge diffère de la France sur un point structurant : l'employeur
belge délègue massivement la paie et le traitement des frais à un **secrétariat
social** — Partena, Securex, Acerta, SD Worx, Liantis, Group S. Ces acteurs ne
sont pas des concurrents frontaux : ce sont les **prescripteurs**, et ce sont
eux qui publient les barèmes que tout le monde cite. Leur audience éditoriale
sur « indemnité kilométrique » est dominante, et c'est contre leurs pages qu'il
faudra se positionner en recherche organique.

Côté outils, la Belgique héberge des acteurs installés du poste frais et
mobilité — Rydoo (belge, ex-Xpenditure) et Mbrella notamment. Comme en
Allemagne, ce sont des **suites de gestion de frais complètes**. L'angle izika
reste le même partout : **on ne saisit rien, l'agenda fait le travail**. *Le
détail du paysage concurrentiel belge reste à confirmer avant d'écrire la page
d'accueil.*

### Grappes de mots-clés

| Grappe | Intention | Page cible |
|---|---|---|
| `indemnité kilométrique 2026`, `indemnité kilométrique belgique`, `barème kilométrique belgique` | Informationnelle → conversion | Calculateur, onglet voiture |
| `indemnité vélo`, `CCT 164`, `indemnité vélo 2026` | Informationnelle, gros volume, obligation légale récente | Calculateur, onglet vélo + article dédié |
| `frais de déplacement`, `défraiement`, `note de frais` | Transactionnelle | `/be-fr` home, `/be-fr/team-entreprises` |
| `budget mobilité`, `budget mobilité indemnité kilométrique` | Informationnelle, peu couverte | Article dédié |
| `frais professionnels indépendant` | Conversion | `/be-fr/solo`, `/be-fr/solutions/consultants` |

Deux notes de vocabulaire : « défraiement » est plus courant en Belgique qu'en
France, et « note de frais » y coexiste avec « déclaration de frais ». *Les
volumes de recherche restent à mesurer.*

## Ce que coûterait `/be-nl` — décision distincte

`/be-nl` n'est pas dans ce plan, et ce n'est pas un oubli. Les conditions sont
**exactement celles de l'allemand**, listées dans `plans/pays/README.md`,
section « Ce que l'équipe peut porter, linguistiquement » :

1. **Arbitrer la langue de support.** L'équipe ne parle pas néerlandais. Soit
   le support néerlandophone est annoncé en anglais, soit une ressource est
   financée. Ce choix apparaît dans la FAQ, la page conformité et le pied de
   page.
2. **Contractualiser un rédacteur natif livrant sa glose française.** ~1 650
   lignes, dictionnaire `nl.ts` compris — car contrairement à `/be-fr`, le
   néerlandais est une **langue nouvelle** : `src/i18n/languages.ts`, son
   endonyme, et un dictionnaire complet.
3. **Exiger un résumé français des textes juridiques néerlandais.**

Le barème, lui, est identique : c'est le même pays. Tout le travail de données
de `mileage-be.ts` est déjà payé — seuls les libellés changent
(`mileage-be.labels.be-nl.ts`).

**Ce qu'implique un marché belge unilingue francophone**, et qu'il faut assumer
en le lançant :

- La Belgique francophone représente environ **40 % de la population**, la
  Flandre néerlandophone environ 60 %. `/be-fr` seul adresse donc la part
  minoritaire du marché.
- Le sélecteur de pays affichera « Belgique — Français » **sans mention du
  néerlandais**. Un visiteur flamand comprendra que le site n'est pas pour lui,
  ou basculera sur `/uk`. C'est acceptable, mais c'est un choix visible.
- Beaucoup d'entreprises belges sont bilingues, et une PME bruxelloise ou
  wallonne se sert très bien d'un site francophone. Le manque à gagner est réel
  mais borné.
- **Rien dans le lancement `/be-fr` ne ferme la porte**, à condition de
  respecter les interdits du § suivant.

### Ce qu'il faut prévoir maintenant, et ce qu'il ne faut surtout pas faire

**À faire :**

- **`MarketId = 'be-fr'`, jamais `'be'`.** C'est le seul point vraiment
  irréversible. Un alias court `/be` imposerait, le jour où `/be-nl` arrive,
  une migration d'URL, un jeu de redirections 301 et une perte de signal SEO
  sur toutes les pages du marché. Le coût aujourd'hui est nul.
- `countryIds` accueille `BE` **une fois** ; les deux marchés futurs pointeront
  sur le même `Country`. La distinction Country / Market de
  `src/i18n/countries.ts` est faite pour ça et n'a rien à changer.
- Ajouter `BE` aux dictionnaires `fr` **et** `en` dès maintenant : le typage
  l'impose de toute façon.

**À ne surtout pas faire :**

- **Ne pas créer un alias `/be`** — répété parce que c'est le piège naturel :
  « la Belgique n'a qu'un marché aujourd'hui, autant faire court ».
- **Ne pas dupliquer `src/i18n/fr.ts` en `be-fr.ts`.** Le dictionnaire est
  résolu par **langue**, pas par marché. Une copie créerait deux sources de
  vérité pour le chrome et casserait le type `Dict`, dérivé de `fr`.
- **Ne pas ajouter `nl` à `src/i18n/languages.ts`** par anticipation : le
  typage exigerait immédiatement un dictionnaire complet et le build casserait.
- **Ne pas déclarer de slugs `be-nl`** dans `routes.ts` : un slug sans page est
  une erreur de build, dans les deux sens.
- **Ne pas mentionner le néerlandais dans la copy `/be-fr`** tant que `/be-nl`
  n'existe pas. Promettre un marché flamand qui n'arrive pas est le même type
  de dette que le « current rates included » de `/uk`.

## Séquencement proposé

| Lot | Contenu | Dépend de |
|---|---|---|
| **0. Préalables** | Stratégie de différenciation `/fr` ↔ `/be-fr` arrêtée ; source de vérité et propriétaire du barème désignés ; commande juridique belge lancée ; arbitrage des deux clés partagées de `fr.ts` | — |
| **1. Socle** | `countries.ts`, `markets.ts`, slugs `routes.ts`, correctif `format.ts`, home `/be-fr` | Lot 0 |
| **2. Aimant SEO** | `mileage-be.ts`, `MileageCalculatorBE.tsx`, page calculateur, article indemnité vélo | Lot 1 |
| **3. Légal** | Mentions légales, charte, CGV révisées, affichage HT/TTC de la page tarifs | Relecture juriste belge + arbitrage TVA |
| **4. Conversion** | solo, team, team-entreprises, team-collectivites, fonctionnalites, pricing, faq, security | Lot 1 + arbitrage conformité ONSS / SPF Finances |
| **5. Longue traîne** | 5 solutions, 2 articles restants | Lot 4 |

Le lot 0 belge est **beaucoup plus léger que l'allemand** — pas de contrat de
rédaction, pas de circuit de glose — mais il n'est pas vide, et son poste
principal (la différenciation `/fr` ↔ `/be-fr`) est celui qu'on est le plus
tenté de sauter. Les lots 2 et 3 sont parallélisables. Le lot 3 est le seul
dont le délai ne dépend pas de nous.

## Risques

- **La cannibalisation `/fr` ↔ `/be-fr`.** Risque dominant, et propre à ce
  marché. Deux pages françaises trop proches ne produisent pas deux fois plus
  de trafic : elles produisent une page indexée et une page ignorée. Le hreflang
  est câblé et ne suffit pas. La différenciation éditoriale se décide au lot 0.
- **Le barème périmé.** Cinq mises à jour par an au minimum, deux régimes
  concurrents, et une valeur du T4 2026 non publiée à ce jour. Un site qui
  affiche un taux faux sur un sujet réglementaire perd sa crédibilité d'un
  coup, et c'est précisément l'argument de vente. Sans propriétaire nommé et
  sans garde-fou automatique, c'est une question de mois.
- **Confondre les deux régimes d'indexation** dans un article ou un écran de
  calculateur. Un lecteur belge — surtout un professionnel du chiffre —
  connaît la différence, et le fait qu'elle dépende de l'employeur.
- **Confondre les deux montants de l'indemnité vélo** — 0,30 €/km dus contre
  0,37 €/km exonérés. L'erreur est massivement répandue, y compris sur un site
  fédéral : la reproduire nous met au même niveau que ce qu'on veut remplacer.
- **Sous-estimer le juridique parce que la langue est familière.** Le français
  belge se lit sans effort, ce qui donne l'illusion que le droit se lit aussi.
  Les 33 clauses noires de l'art. VI.83 CDE et le TTC à 21 % ne se devinent pas.
- **Le décalage site / app sur le changement de taux en cours d'année.** Si
  `go.izika.com` ne sait pas porter quatre taux dans un exercice, le relevé
  annuel d'un utilisateur belge au régime trimestriel est faux — et le site ne
  peut pas le rattraper.
- **Croire que la Belgique est gratuite.** ~500 lignes de rédaction, un
  relecteur belge, un juriste belge, une révision des CGV, un module de données
  à maintenir cinq fois par an et un risque SEO structurel. Beaucoup moins que
  l'Allemagne, très loin de zéro.

## Sources

Consultées le 2026-09-07.

- Barème annuel, base légale — art. 13 de l'AR du 18 janvier 1965 ; circulaire
  BOSA n° 722, MB du 25 juillet 2023 —
  [etaamb](https://etaamb.openjustice.be/fr/circulaire_n2023043792.html)
- Barème trimestriel, base légale — art. 74 de l'AR du 13 juillet 2017, modifié
  par l'[AR du 10 novembre 2022, MB du 16 novembre 2022](https://www.ejustice.just.fgov.be/eli/arrete/2022/11/10/2022042597/justel)
- Taux 2026-2027 (0,4761 €/km), circulaire n° 767 —
  [Securex](https://www.securex.be/fr/lex4you/employeur/actualites/nouvelle-indemnite-kilometrique-avec-indexation-annuelle-a-partir-du-1er-juillet-2026),
  [Unisoc](https://www.unisoc.be/articles/fr/public/indemnite-kilometrique-revision-des-montants-annuel-et-trimestriel-au-1er-juillet-2026),
  [CODEF](https://www.codef.be/actualite/indemnite-kilometrique-annuelle-nouveau-montant-a-partir-du-1er-juillet-2026/)
- Série trimestrielle complète —
  [Securex, montants socio-juridiques](https://www.securex.be/fr/lex4you/employeur/montants-actuels/montants-socio-juridiques/indemnite-kilometrique),
  [UVCW](https://www.uvcw.be/personnel/actus/art-8401)
- Régime mensuel exceptionnel avril–juin 2026 (AR du 18 mai 2026, circulaire
  n° 765 ; circulaire fiscale 2026/C/73 du 16 juillet 2026) —
  [DGConnect](https://www.dgconnect.be/actualites/actualite/720858527752537329),
  [Degand & Partners](https://blog.degandpartners.com/fr/article/indemnite-kilometrique-decryptage-du-regime-mensuel-transitoire-avril-juin-2026/31878)
- Cohérence du régime choisi sur toute la période —
  [Attentia](https://www.attentia.be/fr/actualites/indemnite-kilometrique-pour-les-deplacements-professionnels-juillet-2026),
  [UCM](https://www.ucm.be/actualites/lindemnite-kilometrique-pour-deplacements-professionnels-au-1er-juillet-2026)
- Régime ONSS des remboursements de frais —
  [instructions administratives ONSS](https://www.socialsecurity.be/employer/instructions/dmfa/fr/latest/instructions/salary/particularcases/expensesreimbursement.html)
- CCT n° 164, texte intégral (art. 2, 3, 4, 5, 6, 8) —
  [CNT-NAR](https://cnt-nar.be/sites/default/files/documents/fr/cct-164.pdf)
- Évaluation de la CCT n° 164, chiffres d'adoption — Rapport CNT n° 139 /
  CCE 2025-2055 du 5 novembre 2025 —
  [CNT-NAR](https://cnt-nar.be/sites/default/files/documents/fr/Rapport-139-F.pdf)
- Plafonds fiscaux de l'indemnité vélo (0,37 €/km et 3 700 € pour 2026) —
  [SPF Finances](https://fin.belgium.be/fr/particuliers/declaration-impot/revenus/indemnites-frais-deplacement-domicile-lieu-travail)
- Montant CCT 164 de 2026 (0,30 €/km, sources secondaires convergentes) —
  [Securex](https://www.securex.be/fr/lex4you/employeur/actualites/indemnite-velo-en-2026-tout-ce-que-vous-devez-savoir),
  [UCM](https://www.ucm.be/actualites/velo-au-travail-quelle-indemnite-pour-le-travailleur-en-2026),
  [Attentia](https://www.attentia.be/fr/actualites/indemnite-velo-montants-2026/)
- Budget mobilité — loi du 17 mars 2019, réforme par la loi du 25 novembre 2021,
  AR du 10 septembre 2023 ; [lebudgetmobilite.be](https://lebudgetmobilite.be/)
- Livre XII CDE (art. XII.3, XII.4, XII.6 à XII.8) —
  [loi du 15 décembre 2013](https://www.ejustice.just.fgov.be/eli/loi/2013/12/15/2013011667/justel),
  [DigitalWallonia](https://www.digitalwallonia.be/fr/publications/informations-site-ecommerce/)
- Livre VI CDE (art. VI.3, VI.45, VI.47, VI.53, VI.83, VI.84) —
  [Credit2Consumer](https://credit2consumer.be/fr/article/cde-vi-pratiques-du-marche-et-protection-du-consommateur),
  [Actualités du droit belge](https://www.actualitesdroitbelge.be/legislation/code-de-droit-economique/code-de-droit-economique---les-droits-et-obligations-des-parties-dans-le-cadre-d-un-contrat-de-vente-sur-internet/article-vi-53-du-code-de-droit-economique)
- Droit applicable au contrat de consommation — règlement Rome I, art. 6 —
  [Lynxlex](https://www.lynxlex.com/fr/text/rome-i-r%C3%A8gl-5932008/article-6-contrats-de-consommation/638) ;
  CJUE *Amazon EU* C-191/15 —
  [Squire Patton Boggs](https://larevue.squirepattonboggs.com/piqure-de-rappel-quel-droit-appliquer-en-matiere-de-commerce-en-ligne-au-sein-de-l-ue_a3160.html)
- Fermeture de la plateforme ODR au 20 juillet 2025 (règlement UE 2024/3228) —
  [CMS Belgique](https://cms.law/en/bel/legal-updates/the-odr-platform-is-closing-what-businesses-need-to-know),
  [Commission européenne](https://consumer-redress.ec.europa.eu/site-relocation_en)
- Livre XVI CDE et Service de Médiation pour le Consommateur —
  [loi du 4 avril 2014](https://etaamb.openjustice.be/fr/loi-du-04-avril-2014_n2014011245.html),
  [mediationconsommateur.be](https://mediationconsommateur.be/a-propos-de-nous-qui-sommes-nous/)
- TVA — [SPF Finances, redevable](https://finances.belgium.be/fr/entreprises/tva/international/determination-redevable-tva),
  [impots.gouv.fr, guichet unique OSS](https://www.impots.gouv.fr/professionnel/jutilise-le-guichet-unique-tva-ioss-oss)
- BCE, entreprise étrangère sans établissement —
  [Liantis](https://blog.liantis.be/fr/comptable-et-expert-comptable/entreprise-etrangere-quelles-demarches-aupres-de-la-bce),
  [UCM](https://www.ucm.be/produits/entreprises-etrangeres)
- RGPD — [EDPB, lignes directrices 8/2022 sur l'autorité chef de file](https://www.edpb.europa.eu/system/files/2023-10/edpb_guidelines_202208_identifying_lsa_targeted_update_fr.pdf),
  [APD](https://www.autoriteprotectiondonnees.be/citoyen/contact),
  [loi du 30 juillet 2018](https://etaamb.openjustice.be/fr/loi-du-30-juillet-2018_n2018040581.html)

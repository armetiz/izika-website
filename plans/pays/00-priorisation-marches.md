# Priorisation des marchés — quels pays izika peut servir

État au 2026-09-07 : izika sert un pays côté application (la France) et deux
côté site (France, Royaume-Uni). Ce document classe les pays d'Europe, puis du
reste du monde, par **compatibilité avec le moteur izika actuel**, et donne
pour chacun la structure de son barème et les langues à couvrir. Il sert à
décider quoi ouvrir ensuite ; il ne décrit pas le reste-à-faire d'un pays donné
(ça, c'est le rôle des fiches pays, cf. `README.md`).

## 1. Ce qu'izika doit savoir faire pour servir un pays

La promesse produit, reprise de la home (`src/data/home-page.fr.ts`,
`src/i18n/markets.ts`) :

> Vos IK en un temps record. Obtenez vos indemnités kilométriques automatiques
> depuis votre agenda en ligne : Google, Outlook, Dolibarr, Zimbra, ICS.

Trois conditions doivent donc être réunies dans le pays visé :

1. **Il existe une pratique d'indemnisation kilométrique** des individus —
   indépendants qui déduisent leurs frais, ou collaborateurs remboursés par
   leur employeur. Sans ça, il n'y a pas de marché, quelle que soit la
   faisabilité technique.
2. **Cette indemnisation repose sur un barème officiel au kilomètre**, ce qui
   rend le calcul automatisable et opposable à l'administration. C'est le
   pilier « conformité fiscale » de l'offre
   (`src/data/compliance-section.fr.ts`).
3. **Ce barème s'exprime sous la forme `montant = d × coefficient + fixe`**,
   la forme que le moteur sait calculer.

Ce troisième point mérite d'être précisé, parce qu'il est moins restrictif
qu'il n'en a l'air. Le moteur français (`Tranche { maxKm, coef, fixe }` dans
`src/data/bareme-ik.ts`) calcule un montant **affine par morceaux en
distance**. Or, un barème à bandes marginales — « les 10 000 premiers miles à
0,55 £, le reste à 0,25 £ » — se réduit exactement à cette forme :

```
d ≤ 10 000  →  d × 0,55
d > 10 000  →  d × 0,25 + 3 000        (car 10 000 × (0,55 − 0,25) = 3 000)
```

Et un forfait plat unique n'est que le cas dégénéré `fixe = 0`, une seule
tranche. **La quasi-totalité des barèmes européens rentre donc dans le
moule.** Ce qui n'y rentre pas, ce sont les barèmes indexés sur autre chose que
la distance : le modèle exact du véhicule (Italie) ou le prix du carburant du
jour (Europe centrale).

## 2. Grille de compatibilité

| Niveau | Définition | Coût d'intégration du barème |
|---|---|---|
| **A** | Forfait unique au kilomètre. Une seule tranche, `fixe = 0`. | Une constante. |
| **B** | Affine par tranches : bandes de distance et/ou classes de véhicule. Forme FR / UK. | Un module de données, sur le modèle de `src/data/bareme-ik.ts`. |
| **C** | Affine, mais un paramètre vient de l'extérieur du barème : prix du carburant publié, consommation du véhicule. | Module de données **plus** une donnée à rafraîchir et une saisie utilisateur en plus. |
| **D** | Pas de barème légal au kilomètre, ou barème indexé sur le modèle exact du véhicule. | Non réductible à quelques coefficients. À écarter en l'état. |

À cette grille s'ajoute l'**état d'intégration**, qui distingue les deux moitiés
du produit et qui est ce qui rend le classement actionnable :

- **`app`** — barème embarqué nativement dans `go.izika.com`. **France
  uniquement.**
- **`site`** — marché vitrine en production. **France et Royaume-Uni.**
- **`—`** — rien.

Un pays déjà en `site` coûte beaucoup moins cher à finir qu'un pays à ouvrir de
zéro : tout le travail de contenu, de SEO et de localisation est déjà payé.

## 3. Europe — tableau de synthèse

Trié par priorité. Les taux sont ceux de 2026 ; voir les sources en §8.

| Pays | État | Niv. | Structure du barème | Taux 2026 | Unité | Langues officielles | Potentiel |
|---|---|---|---|---|---|---|---|
| **France** | `app` `site` | B | 5 classes de CV × 3 tranches (5 000 / 20 000 km), +20 % électrique | `d × 0,529` → `d × 0,316 + 1 065` … | km / EUR | fr | *référence* |
| **Royaume-Uni** | `site` | B | 2 bandes marginales + majoration passager | 0,55 £/mi puis 0,25 £/mi ; +0,05 £/passager | **mi / GBP** | en | Élevé |
| **Irlande** | — | B | 4 bandes cumulatives × 3 classes de cylindrée | 41,80 → 90,63 → 39,22 → 25,87 c/km (1501 cm³+) | km / EUR | en, ga | Moyen |
| **Belgique** | — | A | Forfait unique, indexé | 0,4761 €/km (juil. 2026 → juin 2027) | km / EUR | nl, fr, de | Élevé |
| **Suisse** | — | A | Forfait unique | CHF 0,75/km (depuis le 01/01/2026) | km / CHF | de, fr, it, rm | Élevé |
| **Allemagne** | — | A | Forfait unique (déplacement professionnel) | 0,30 €/km ; 0,20 €/km deux-roues | km / EUR | de | Très élevé |
| **Pays-Bas** | — | A | Forfait unique | 0,25 €/km | km / EUR | nl | Élevé |
| **Autriche** | — | A | Forfait + majoration passager, plafonné | 0,50 €/km ; +0,15 €/passager ; max 30 000 km/an | km / EUR | de | Moyen |
| **Espagne** | — | A | Forfait unique (AEAT) | 0,26 €/km | km / EUR | es (+ ca, gl, eu) | Élevé |
| **Portugal** | — | A | Forfait unique | 0,40 €/km | km / EUR | pt | Moyen |
| **Luxembourg** | — | A | Forfait unique, non indexé | 0,30 €/km | km / EUR | lb, fr, de | Faible (volume) |
| **Danemark** | — | B | 2 tranches | 3,94 DKK/km ≤ 20 000 km, puis 2,28 DKK/km | km / DKK | da | Moyen |
| **Pologne** | — | A | Forfait par cylindrée | 1,15 zł/km (> 900 cm³) ; 0,89 zł/km (≤ 900 cm³) | km / PLN | pl | Moyen |
| **Finlande** | — | A | Forfait unique | 0,55 €/km | km / EUR | fi, sv | Moyen |
| **Suède** | — | A | Forfait unique | 25 SEK/mille (2,50 SEK/km) | **mille suédois** / SEK | sv | Moyen |
| **Norvège** | — | A | Forfait unique, partiellement exonéré | 5,30 NOK/km dont 3,50 exonérés | km / NOK | no | Moyen |
| **Slovénie** | — | A | Forfait unique | 0,43 €/km | km / EUR | sl | Faible |
| **Croatie** | — | A | Forfait unique | 0,50 €/km (0,40 en « loko vožnja ») | km / EUR | hr | Faible |
| **Estonie** | — | A | Forfait unique, plafonné au mois | 0,30 €/km *(à confirmer)* | km / EUR | et | Faible |
| **Tchéquie** | — | **C** | Base au km **+** consommation × prix réglementaire du carburant | 5,90 CZK/km + carburant | km / CZK | cs | Moyen |
| **Slovaquie** | — | **C** | Base au km **+** carburant réel | 0,313 €/km + carburant | km / EUR | sk | Faible |
| **Hongrie** | — | **C** | Forfait d'entretien **+** carburant au barème NAV | 15 Ft/km + carburant | km / HUF | hu | Moyen |
| **Roumanie** | — | **C** | Pas de taux au km : 7,5 L/100 km × prix du carburant sur facture | — | km / RON | ro | Moyen |
| **Italie** | — | **D** | Tabelle ACI indexées sur le **modèle exact** du véhicule | milliers de lignes, republiées chaque décembre | km / EUR | it | Très élevé *(mais bloqué)* |
| **Grèce** | — | **D** | Aucun barème légal ; taux négocié employeur / salarié | — | — | el | — |
| **Lettonie**, **Lituanie**, **Bulgarie** | — | **D** | Aucun taux national ; fixé par chaque entreprise | — | — | lv, lt, bg | — |

## 4. Fiches Europe

### Royaume-Uni — niveau B, `site` sans `app`

Autorité : HMRC, *Approved Mileage Allowance Payments* (ITEPA 2003 s.230).
Deux bandes marginales par année fiscale (6 avril → 5 avril), remises sous
forme affine :

```
d ≤ 10 000 mi  →  d × 0,55
d > 10 000 mi  →  d × 0,25 + 3 000
```

Motos 0,24 £/mi et vélos 0,20 £/mi à taux plat, une seule tranche. Majoration
de 0,05 £ par passager et par mile pour les voitures et fourgonnettes. Les taux
sont **indépendants de la motorisation** : pas de majoration électrique, à la
différence de la France. 2026/27 est la première revalorisation depuis 2011/12
(45p → 55p, annoncée le 21 mai 2026, rétroactive au 6 avril 2026).

Ce barème est déjà modélisé côté site dans `src/data/mileage-uk.ts` et exposé
par le calculateur `/en/mileage-allowance-calculator`. Il **n'est pas dans
l'app**. Deux ruptures d'hypothèse à traiter au passage : l'unité est le
**mile** et la devise la **livre**, alors que le moteur raisonne aujourd'hui en
kilomètres et en euros. Langue : anglais, déjà couvert (`src/i18n/en.ts`).

### Irlande — niveau B

Autorité : Revenue, *Civil Service motor travel rates*, inchangés depuis le
1er septembre 2022. Quatre bandes **cumulatives sur l'année civile** (compteur
remis à zéro le 1er janvier) × trois classes de cylindrée. Particularité
contre-intuitive : la bande 2 est la mieux payée, pas la bande 1.

| Bande | ≤ 1 200 cm³ | 1 201–1 500 cm³ | 1 501 cm³ + |
|---|---|---|---|
| ≤ 1 500 km | 41,80 c | 43,40 c | 51,82 c |
| 1 501 – 5 500 km | 72,64 c | 79,18 c | 90,63 c |
| 5 501 – 25 000 km | 31,78 c | 31,79 c | 39,22 c |
| > 25 000 km | 20,56 c | 23,85 c | 25,87 c |

Sous forme affine, colonne 1 501 cm³ + :

```
d ≤ 1 500   →  d × 0,5182
d ≤ 5 500   →  d × 0,9063 − 582,15
d ≤ 25 000  →  d × 0,3922 + 2 245,40
d > 25 000  →  d × 0,2587 + 5 582,90
```

Les véhicules 100 % électriques se déclarent dans la colonne 1 201–1 500 cm³ ;
les hybrides à leur cylindrée réelle. Il existe en plus un jeu de *reduced
rates* à taux plat (21,23 / 23,80 / 25,96 c) pour les trajets liés à l'emploi
mais pas à l'exercice des fonctions, et un barème moto à deux tranches
(seuil 6 437 km). Langues : anglais et irlandais, l'anglais suffit en pratique.
**Zéro nouvelle langue, zéro nouvelle devise** — le dictionnaire `en` et une
partie du contenu UK se réutilisent tels quels.

### Belgique — niveau A

Autorité : SPF Finances, alignement sur l'indemnité des agents de l'État.
Forfait unique, `fixe = 0`, mais **deux régimes d'indexation coexistent** et
c'est la seule complexité du pays :

- indexation **annuelle**, du 1er juillet au 30 juin : 0,4761 €/km pour
  2026-2027 (0,4449 €/km sur la période précédente) ;
- indexation **trimestrielle**, plus réactive : 0,4326 €/km au T1 2026,
  0,4440 €/km au T3 2026. L'employeur choisit son régime.

Le montant est exonéré de cotisations et d'impôt tant qu'il ne dépasse pas
celui versé aux fonctionnaires. Culture de l'indemnité kilométrique parmi les
plus fortes d'Europe, y compris l'indemnité vélo, largement répandue.

Langues : néerlandais (~60 %), français (~40 %), allemand (marginal). Le schéma
d'URL `/{pays}-{langue}` documenté dans `src/i18n/markets.ts` est fait pour ce
cas : `/be-fr` réutilise le dictionnaire `fr` existant, `/be-nl` impose
d'ajouter `nl` à `src/i18n/languages.ts` et un dictionnaire complet. Ouvrir
`/be-fr` seul est un lancement partiel parfaitement légitime.

### Suisse — niveau A

Autorité : Ordonnance sur les frais professionnels, art. 327a CO. Forfait
unique passé de CHF 0,70 à **CHF 0,75/km** au 1er janvier 2026 ; les règlements
de frais déjà approuvés à 0,70 restent valables (clause du grand-père). Le taux
couvre tout : carburant, assurance, amortissement, entretien, pneus.

Déjà semi-anticipée dans le code — `marketIds` porte le commentaire
`// + 'ch-fr' later`, et `src/data/bareme-ik.ts` cite explicitement le cas
suisse. Langues : allemand (~62 %), français (~23 %), italien (~8 %). Devise
CHF, à ajouter au moteur. Pouvoir d'achat et prix de la mobilité très élevés :
le meilleur revenu par utilisateur d'Europe.

### Allemagne — niveau A

Deux mécanismes **distincts**, à ne pas confondre :

- **Dienstreise** (déplacement professionnel, ce qui concerne izika) :
  0,30 €/km, tous kilomètres comptés aller et retour, 0,20 €/km pour les
  deux-roues. Inchangé en 2026.
- **Entfernungspauschale** (trajet domicile-travail, déduction fiscale
  personnelle) : passée à 0,38 €/km **dès le premier kilomètre** au
  1er janvier 2026, en remplacement de l'ancien système à deux paliers. Elle ne
  compte que la distance simple, pas l'aller-retour.

Barème trivial à intégrer ; c'est le plus grand marché d'Europe et le seul du
tableau à combiner niveau A et potentiel « très élevé ». Une seule langue,
allemande, mais un dictionnaire complet à produire.

### Pays-Bas — niveau A

Forfait unique porté de 0,23 à **0,25 €/km**, avec effet rétroactif au
1er janvier 2026 (décision d'approbation du secrétaire d'État aux Finances, la
loi n'étant pas encore modifiée). L'application n'est pas obligatoire :
l'employeur décide s'il relève son taux et à partir de quand. Une seule langue.

### Autriche — niveau A

*Amtliches Kilometergeld* : 0,50 €/km en voiture, 0,25 €/km à moto ou à vélo,
plus **0,15 € par passager transporté**. Plafonné à 30 000 km/an pour la
voiture et la moto, 3 000 km/an pour le vélo. Le plafond et la majoration
passager sont deux notions que le moteur ne connaît pas encore — la majoration
passager est cependant exactement celle du Royaume-Uni, donc mutualisable.
Langue allemande : à ouvrir avec l'Allemagne, pas avant.

### Espagne — niveau A

Forfait unique de **0,26 €/km** exonéré d'IRPF, relevé depuis l'ancien plafond
historique de 0,19 € par l'ordre HFP/792/2023. Péages et parking exonérés en
plus sur justificatif. Le trajet domicile-travail est explicitement exclu. Au-
delà de 0,26 €/km, l'excédent est imposable sur la fiche de paie. Langue
castillane, plus quatre langues co-officielles régionales que le marché
n'impose pas de couvrir.

### Portugal — niveau A

Forfait de **0,40 €/km** pour l'usage d'un véhicule personnel, au-delà duquel
la différence devient un revenu du travail soumis à retenue et à Sécurité
sociale. Une seule langue. Marché plus petit, mais forte densité de travailleurs
indépendants.

### Luxembourg — niveau A

Forfait de **0,30 €/km**, non indexé, inchangé depuis le 1er août 2015, et
identique quel que soit le carburant ou la cylindrée. C'est le barème le plus
simple d'Europe. Volume domestique faible, mais le pays est francophone à
l'écrit et déjà couvert par le dictionnaire `fr` — coût marginal quasi nul si
la Belgique est ouverte.

### Danemark — niveau B

Deux tranches sur l'année : **3,94 DKK/km** jusqu'à 20 000 km, puis
**2,28 DKK/km**, soit `d × 2,28 + 33 200` au-delà du seuil. Vélo, cyclomoteur
et trottinette électrique à 0,64 DKK/km. Même forme que le Royaume-Uni. Devise
DKK et langue danoise à ajouter.

### Pologne — niveau A (par classe)

*Kilometrówka* fixée par le règlement du ministre de l'Infrastructure du
25 mars 2002, inchangée en 2026 : **1,15 zł/km** au-dessus de 900 cm³,
**0,89 zł/km** en dessous, 0,69 zł/km pour les motos, 0,42 zł/km pour les
cyclomoteurs. Plafond de remboursement sans charge fiscale ni ZUS. Deux classes
de cylindrée, une tranche chacune : le cas le plus simple du niveau B.

### Pays nordiques — niveau A

**Finlande** 0,55 €/km, le taux le plus généreux de la zone euro, modulé par le
véhicule, le nombre de passagers et la charge. **Suède** 25 SEK par *mille*
suédois — attention, le mille suédois vaut 10 km ; 12 SEK/mille en voiture de
société, 9,50 pour l'électrique. **Norvège** 5,30 NOK/km dont seulement
3,50 NOK exonérés : c'est le seul pays du tableau où le barème publié dépasse
le plafond fiscal, ce qui impose d'afficher deux montants.

### Niveau C — Europe centrale

Quatre pays où le remboursement additionne un forfait d'usure **et** le
carburant réellement consommé :

- **Tchéquie** — 5,90 CZK/km (décret 573/2025), plus la consommation moyenne du
  véhicule × le prix réglementaire du carburant, révisé en cours d'année.
- **Slovaquie** — 0,313 €/km depuis le 1er janvier 2026, plus le carburant
  calculé sur la consommation figurant à la carte grise.
- **Hongrie** — 15 Ft/km forfaitaires d'entretien, plus le carburant au barème
  NAV.
- **Roumanie** — pas de taux au kilomètre du tout : 7,5 L/100 km × le prix du
  carburant figurant sur la facture.

Le calcul reste linéaire en distance, mais il demande deux choses que le
produit ne fait pas : demander à l'utilisateur la consommation de son véhicule,
et rafraîchir un prix de carburant officiel plusieurs fois par an. C'est une
extension du moteur, pas un simple jeu de données.

### Niveau D — à écarter

- **Italie** — le plus grand marché inexploitable du tableau. Les *tabelle ACI*
  publiées chaque décembre au *Gazzetta Ufficiale* donnent un coût kilométrique
  par **modèle exact** de véhicule : des milliers de lignes, à réimporter tous
  les ans. Rien à voir avec une poignée de coefficients. À reconsidérer
  seulement si une source de données ACI exploitable est trouvée.
- **Grèce, Lettonie, Lituanie, Bulgarie** — aucun barème national. Le taux est
  négocié entre employeur et salarié, ou fixé par chaque entreprise. Pas de
  référentiel opposable, donc pas de promesse de conformité possible.

## 5. Hors Europe — tier 2

| Pays | Niv. | Structure | Taux 2026 | Unité | Langues | Remarque |
|---|---|---|---|---|---|---|
| **États-Unis** | A | Forfait unique IRS | 0,725 $/mi, puis **0,76 $/mi au 01/07/2026** | mi / USD | en | Revalorisation en cours d'année : le moteur doit savoir dater un barème, pas seulement l'annualiser. |
| **Canada** | B | 2 tranches (ARC) | 0,73 $/km les 5 000 premiers km, puis 0,67 $/km ; +0,04 $ dans les territoires | km / CAD | en, fr | Bilingue : réutilise **les deux** dictionnaires existants. Le supplément territorial est une 3ᵉ dimension. |
| **Australie** | A | Forfait plafonné (ATO) | 0,91 $/km à partir du 01/07/2026, plafonné à 5 000 km/véhicule/an | km / AUD | en | Année fiscale juillet → juin. |
| **Nouvelle-Zélande** | B | Tier 1 / Tier 2 au-delà de 14 000 km, **par motorisation** | Essence 1,20 / 0,37 $ ; diesel 1,30 / 0,38 ; hybride 0,90 / 0,24 ; électrique 1,22 / 0,23 | km / NZD | en, mi | Le seul barème du document qui croise tranche de distance **et** motorisation. |

Les quatre sont anglophones (le Canada, aussi francophone) : ils réutilisent le
dictionnaire `en` et prolongent l'investissement fait pour le Royaume-Uni.
Aucun n'est prioritaire tant que le UK n'est pas terminé, mais ils forment la
suite naturelle de la piste anglophone.

## 6. Classement recommandé

L'effort est affiché en deux colonnes parce que les deux moitiés du produit
avancent indépendamment.

| Rang | Pays | Niv. | Effort **app** | Effort **site** | Pourquoi |
|---|---|---|---|---|---|
| **1** | **Royaume-Uni** | B | Barème AMAP + support des **miles** et de **GBP** | *néant, déjà en production* | Le seul pays où le coût d'acquisition est déjà payé. |
| **2** | **Irlande** | B | Module 4 bandes × 3 cylindrées | Nouveau `MarketId`, dictionnaire `en` **réutilisé**, contenu UK partiellement réutilisable | Meilleur ratio effort / retour : zéro nouvelle langue, zéro nouvelle devise. |
| **3** | **Belgique** (`/be-fr`) | A | Une constante indexée | Nouveau `MarketId`, dictionnaire `fr` **réutilisé** | Culture IK la plus forte d'Europe, coût de localisation quasi nul. `/be-nl` en second temps. |
| **4** | **Allemagne** | A | Une constante | Nouveau `MarketId` **et** nouvelle langue `de` (dictionnaire complet) | Le plus grand marché du tableau, le barème le plus simple. Le coût est éditorial, pas technique. |
| **5** | **Suisse** (`/ch-fr`) | A | Une constante + devise **CHF** | Nouveau `MarketId`, dictionnaire `fr` réutilisé | Déjà anticipée dans le code. Meilleur revenu par utilisateur. `/ch-de` suit l'Allemagne. |

Le vrai arbitrage tient en une phrase : **élargir en anglais** (Royaume-Uni →
Irlande → Canada / Australie / Nouvelle-Zélande) ou **élargir en français**
(Belgique → Suisse romande → Luxembourg). Les deux pistes réutilisent un
dictionnaire existant et ne coûtent qu'un jeu de slugs et du contenu. La piste
francophone est plus dense en pratique de l'IK ; la piste anglophone donne
accès à des marchés bien plus grands, mais impose au moteur de sortir du
kilomètre et de l'euro — travail qui, une fois fait pour le Royaume-Uni,
bénéficie à tous les suivants.

Recommandation : **finir le Royaume-Uni d'abord**, quel que soit le pays
choisi ensuite. Tant que l'app ne connaît pas les taux AMAP, le site promet
des rapports « current rates included » qu'elle ne sait pas produire, et
ouvrir un troisième marché vitrine ne fait qu'aggraver l'écart.

## 7. Points à trancher

- [ ] **Barème UK dans l'app** — prérequis à toute nouvelle ouverture. Déjà
      listé comme bloquant dans `plans/decouplage-langue-pays.md`, section
      « Produit / App ». Tant qu'il n'est pas fait, la promesse « current rates
      included » de `/en` est fausse.
- [ ] **Unités non métriques** — le moteur raisonne en kilomètres. Le
      Royaume-Uni et les États-Unis sont en miles, la Suède en *mille* suédois
      (10 km). Décider si l'unité devient un attribut du barème ou du `Market`.
- [ ] **Devises non-euro** — GBP, CHF, DKK, SEK, NOK, PLN, CZK, HUF. Le
      `Market` porte déjà `currency` et `numberLocale`
      (`src/i18n/markets.ts`) ; côté app, à vérifier. Noter que `/en` affiche
      aujourd'hui ses tarifs en EUR alors que son calculateur est en GBP.
- [ ] **Majoration passager** — Royaume-Uni (0,05 £/mi) et Autriche
      (0,15 €/km). Notion absente du moteur, mutualisable entre les deux.
- [ ] **Plafond annuel** — Autriche (30 000 km) et Australie (5 000 km). Notion
      absente du moteur.
- [ ] **Barème daté en cours d'année** — États-Unis (changement au 1er juillet
      2026), Belgique (indexation trimestrielle). Le sélecteur d'année existant
      (`ANNEES` dans `src/data/bareme-ik.ts`, `TAX_YEARS` dans
      `src/data/mileage-uk.ts`) suppose un barème par an.
- [ ] **Année fiscale décalée** — Royaume-Uni (6 avril), Australie et
      Nouvelle-Zélande (1er juillet), Irlande (année civile mais compteur de
      bandes remis à zéro). Le rapport annuel doit suivre la bonne fenêtre.
- [ ] **Entité juridique et TVA** hors de France — aujourd'hui izika SAS pour
      tous les marchés, y compris `/en`.
- [ ] **Consentement Axeptio** — une version par marché ; `/en` utilise encore
      `izika-fr-EU`.
- [ ] **Preuve sociale locale** — les avis Trustpilot sont sur
      `fr.trustpilot.com`, en français. Le champ `trustpilot` du `Market` est
      `null` partout ailleurs, donc les blocs disparaissent.
- [ ] **Socle éditorial** — un pays sans articles ne se référence pas. `/fr`
      en compte 37, `/en` un seul.
- [ ] **Vérifier le plafond mensuel estonien** et les taux lettons, lituaniens
      et bulgares avant de figer leur classement en D.

## 8. Sources

Consultées le 2026-09-07.

- Comparatif européen — [Eurodev](https://www.eurodev.com/blog/mileage-reimbursement-rates-europe), [Miletrack 2026](https://miletrack.app/en-us/blog/mileage-rates-europe-2026/), [TrackJack](https://www.trackjackeurope.com/en/employee-mileage-allowance-2026/)
- France — [barème 2026](https://www.n2f.com/blog/bareme-kilometrique-annuel/), [Nexco](https://www.nexco-expertise.com/indemnite-kilometrique-2026)
- Royaume-Uni — modélisé dans `src/data/mileage-uk.ts` (HMRC AMAP, ITEPA 2003 s.230)
- Irlande — [Revenue, Civil Service rates](https://www.revenue.ie/en/employing-people/employee-expenses/travel-and-subsistence/civil-service-rates.aspx), [ExpenseIn 2026](https://www.expensein.com/blog/business-expenses/irish-mileage-rates)
- Belgique — [Partena Professional](https://www.partena-professional.be/en/our-insights/infoflashes/kilometre-allowance-significant-increase-1st-january-2026), [UCM T3 2026](https://www.ucm.be/actualites/lindemnite-kilometrique-pour-deplacements-professionnels-au-1er-juillet-2026), [Mbrella](https://www.mbrella.eu/blog/mileage-allowance)
- Suisse — [spesen-app.ch](https://spesen-app.ch/blog-posts/kilometerentschadigung-schweiz-2026), [Rydoo](https://www.rydoo.com/compliance/switzerland/mileage-switzerland/)
- Allemagne — [Taxmaro, réforme 2026](https://www.taxmaro.com/post/kilometerpauschale-2026), [Circula](https://www.circula.com/de/blog/kilometerpauschale)
- Pays-Bas — [Forvis Mazars](https://www.forvismazars.com/nl/en/who-we-are/news-events-and-publications/news/increase-in-mileage-allowance), [Grant Thornton](https://www.grantthornton.nl/insights/human-capital-services/verhoging-reiskostenvergoeding-naar-25-cent-per-kilometer/)
- Autriche — [BMF](https://www.bmf.gv.at/themen/steuern/kraftfahrzeuge/kilometergeld.html), [finanz.at](https://www.finanz.at/steuern/kilometergeld/)
- Espagne — [Sabbatic](https://sabbatic.es/blog/kilometraje-exento/), [Okticket](https://okticket.es/blog/kilometraje-exento-irpf)
- Portugal — [CRN Contabilidade](https://crncontabilidade.pt/blog/valor-por-km-em-viatura-propria-em-2026-quanto-se-paga-e-como-calcular/), [Ordem dos Contabilistas Certificados](https://www.occ.pt/pt-pt/noticias/irs-quilometros)
- Luxembourg — [pixie.lu](https://www.pixie.lu/corpus/rh/38-0112/quels-sont-les-baremes-kilometriques-applicables-au-luxembourg-en-2026/)
- Danemark — [BDO Danemark](https://www.bdo.dk/da-dk/faglig-info/depechen/depechen-artikler-2025/satserne-for-skattefrie-korepenge-og-diater-mv-i-2026), [Dansk Industri](https://www.danskindustri.dk/vi-radgiver-dig/personale/nyhedsarkiver---personaleforhold/nyheder-personalejura/2025/11/satser-for-kilometerpenge-og-rejseudgifter-2026/)
- Norvège — [Skatteetaten](https://www.skatteetaten.no/en/rates/car-allowance-distance-based-allowance/)
- Finlande — [Heeros](https://www.heeros.com/kilometrikorvaukset)
- Pologne — [Poradnik Przedsiębiorcy](https://poradnikprzedsiebiorcy.pl/-stawka-za-1-km-przebiegu-pojazdu-jaki-limit)
- Slovénie — [Data.si](https://data.si/blog/kilometrina/) · Croatie — [locco.hr](https://locco.hr/blog/koristenje-privatnog-automobila/) · Slovaquie — [Podnikajte.sk](https://www.podnikajte.sk/stravne-a-pracovne-cesty/zakladna-nahrada-za-1km-pri-pouziti-motoroveho-vozidla-od-1-1-2026)
- Tchéquie — [Finance.cz](https://www.finance.cz/clanky/553528-cestovni-nahrady-2026-uprava-sazeb-za-kilometr-stravneho-i-cen-pohonnych-hmot/) · Hongrie — [RoadRecord](https://www.roadrecord.hu/kikuldetesi-rendelveny-sajat-gepkocsihoz/kikuldetes-elszamolasa/) · Roumanie — [portalcodulfiscal.ro](https://www.portalcodulfiscal.ro/decontare-combustibil-deplasare-autoturism-personal-regie-autonoma-52081.htm)
- Italie — [tabelle ACI 2026, BibLus](https://biblus.acca.it/tabelle-aci-2022/), [N2F](https://www.n2f.com/blog/it/aci-2026-nuove-tabelle-rimborso-chilometrico/)
- Grèce — [Perk](https://www.perk.com/uk/blog/mileage-allowance-greece/) · Baltes — [Perk Estonie](https://www.perk.com/uk/blog/mileage-allowance-estonia/), [Perk Lituanie](https://www.perk.com/uk/blog/mileage-allowance-lithuania/)
- États-Unis — [IRS](https://www.irs.gov/newsroom/irs-sets-2026-business-standard-mileage-rate-at-725-cents-per-mile-up-25-cents), [hausse au 1er juillet](https://bradyware.com/irs-raises-business-mileage-rate/)
- Canada — [Ministère des Finances](https://www.canada.ca/en/department-finance/news/2026/01/government-announces-the-2026-automobile-deduction-limits-and-expense-benefit-rates-for-businesses.html)
- Australie — [ATO](https://softwaredevelopers.ato.gov.au/CentsperKilometreDeductionRateforCarExpenses) · Nouvelle-Zélande — [IRD](https://www.ird.govt.nz/income-tax/income-tax-for-businesses-and-organisations/types-of-business-expenses/claiming-vehicle-expenses/kilometre-rates-2025-2026)

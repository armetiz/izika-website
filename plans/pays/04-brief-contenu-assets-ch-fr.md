# Brief designer — contenu des visuels `/ch-fr`

**Objet.** Ce document donne le **contenu à inscrire dans les images** du lot
suisse, produit en variante des visuels `/fr`. Il ne dit rien de la forme :
mise en page, couleurs, typographie et cadrages sont ceux des masters français,
inchangés. Seul le **texte à l'intérieur des images** change.

Périmètre : les 19 visuels de `public/assets/markets/ch-fr/`
(cf. `03-inventaire-assets.md` § 4). Le colis se transmet tel quel :
`zip -r ch-fr.zip public/assets/markets/ch-fr`.

---

## 1. Les cinq règles qui priment sur tout le reste

**1. Il n'existe pas de barème suisse.** La France a un barème national opposable,
indexé sur la puissance fiscale du véhicule. La Suisse n'a rien de tel : le taux
figure au **règlement de frais** (*Spesenreglement*) que l'entreprise fait
approuver par l'administration fiscale de son canton. Aucune image ne doit
écrire « barème », « barème officiel », « barème fiscal suisse » ni
« conforme au barème ». Ces mots n'ont pas d'objet en Suisse.

**2. Pas de puissance fiscale, donc pas de « CV ».** Tout ce qui suit un modèle
de véhicule en français — `(6cv)`, `8CV`, `4CV` — **disparaît** dans la variante
suisse. Le véhicule n'entre pas dans le calcul.

**3. Un seul taux, `CHF 0.75`, pour toute l'entreprise et tous les véhicules.**
C'est le maximum admis fiscalement depuis le **1ᵉʳ janvier 2026** (Ordonnance du
DFF sur la déduction des frais professionnels ; il était de `CHF 0.70` jusqu'au
31 décembre 2025). Conséquence directe sur les images : **aucune majoration
électrique**, contrairement au barème français. La Tesla et la Škoda sont
remboursées au même taux.

**4. Tous les montants sont vérifiables.** `montant = km × 0.75`, sans tranche
et sans coefficient. Les écrans français affichent des ratios variables d'une
ligne à l'autre (170 km / 88 €, puis 1 092 km / 501 €) — c'est le barème par
puissance fiscale. **En Suisse, un lecteur peut poser la multiplication sur
chaque ligne.** Une ligne fausse est une ligne qui décrédibilise l'écran :
tous les chiffres de ce document sont calculés, ils sont à recopier tels quels.

**5. Le vocabulaire n'est pas le même, alors que la langue l'est.** Le site
`/ch-fr` ne dit jamais « IK » ni « indemnités kilométriques » ; il dit **frais
kilométriques**. Table de correspondance :

| Dans les visuels `/fr` | Dans les visuels `/ch-fr` |
|---|---|
| INDEMNITÉS KILOMÉTRIQUES | **FRAIS KILOMÉTRIQUES** |
| LISTE DES DEMANDES D'INDEMNISATION | **LISTE DES DEMANDES DE REMBOURSEMENT** |
| IK (étiquette du document, icône `compliance`) | **FRAIS KM** |
| expert-comptable | **fiduciaire** |
| code postal / 69200 | **NPA** / 1096 (4 chiffres) |

---

## 2. Conventions d'écriture suisses

Elles doivent être **identiques à celles du site**, qui les applique déjà
(`src/lib/format.ts`, `src/i18n/markets.ts`) : une image qui écrirait autrement
jurerait avec le texte affiché juste à côté.

| | Écriture | Contre-exemple à éviter |
|---|---|---|
| Montant | `13’800.00 CHF` | `13 800,00 €`, `CHF 13'800.00`, `13.800 CHF` |
| Taux au km | `CHF 0.75` (code **devant**, point décimal) | `0,75 CHF`, `0.75 CHF/km` |
| Distance | `18’400 km` | `18 400 km` |
| Séparateur de milliers | apostrophe typographique **’** (U+2019) | espace, apostrophe droite `'` |
| Date | `08.01.2026` (points) | `08/01/2026` |
| Adresse | `Avenue de Rumine 22, 1005 Lausanne` — **numéro après la rue**, NPA à 4 chiffres devant la localité | `22 avenue de Rumine, 69005 Lausanne` |

> L'asymétrie montant / taux est voulue et vient du site : le **montant** suit
> le format Intl `fr-CH` (code après), le **taux au km** suit l'usage des
> règlements de frais (`CHF 0.75`, code devant).

---

## 3. Le personnage et ses trois adresses

Un commercial d'une PME vaudoise, équivalent suisse du « DUPONT Michel » des
visuels français.

**Collaborateur : CHAPPUIS Laurent**

| Rôle | Libellé dans l'app | Adresse |
|---|---|---|
| Domicile *(adresse par défaut)* | `domicile` | **Chemin des Vignes 8, 1096 Cully** |
| Bureau | `bureau` | **Avenue de Rumine 22, 1005 Lausanne** |
| Filiale | `filiale` | **Rue de Lyon 42, 1203 Genève** |

Ces trois adresses reproduisent la géométrie du jeu français — domicile en
périphérie, bureau au centre, filiale dans une autre ville à ~65 km : Cully /
Lausanne / Genève est l'exact équivalent romand de Vourles / Lyon /
Saint-Étienne. Rues réelles, numéros et occupants fictifs, comme côté français.

---

## 4. Déroulement d'adresses — une journée type

Distances routières **approximatives** (arrondies au km, ce que l'app affiche).
La chaîne est cohérente de bout en bout : chaque étape part de l'arrivée de la
précédente.

| # | De → à | Distance |
|---|---|---:|
| 1 | Domicile *(Cully)* → Bureau *(Lausanne)* | **11 km** |
| 2 | Bureau *(Lausanne)* → client Bovay SA, Rue Centrale 14, 1110 Morges | **13 km** |
| 3 | Morges → client Golay Sàrl, Grand-Rue 27, 1260 Nyon | **20 km** |
| 4 | Nyon → Filiale *(Genève)* | **25 km** |
| 5 | Filiale *(Genève)* → Domicile *(Cully)* | **74 km** |
| | **Total journée** | **143 km** |
| | **Montant (143 × 0.75)** | **107.25 CHF** |

Autres distances utilisables, si un écran demande d'autres destinations :

| Trajet | Distance |
|---|---:|
| Lausanne → Vevey | 19 km |
| Lausanne → Yverdon-les-Bains | 37 km |
| Lausanne → Genève | 63 km |
| Lausanne → Fribourg | 72 km |
| Nyon → Genève | 25 km |
| Cully → Morges | 25 km |

---

## 5. Noms de RDV

**Le générique, à utiliser en priorité : `visite client`.**

Les écrans français mélangent des personas (une infirmière, un commercial). La
variante suisse s'en tient au commercial, ce que vendent les pages `/ch-fr`.
Réservoir cohérent, à piocher selon le nombre de lignes de l'écran :

`visite client` · `RDV vente` · `visite hebdo` · `prospection` · `contrôle
chantier` · `dîner client` · `réunion filiale` · `livraison`

*(En Suisse romande, le **dîner** est le repas de midi : `dîner client` et non
`déjeuner client`, qui serait un petit-déjeuner.)*

Ce réservoir sert aux écrans génériques (commercial). **Les visuels des pages
métier** (`verticals/<id>/…`) prennent leurs motifs dans
`05-donnees-visuels-par-marche.md` § 7, colonne `/ch-fr`.

Les écrans français suffixent le RDV d'un nom de client (`visite Michelon`,
`client Bompard`). Clients fictifs romands, à réutiliser d'un écran à l'autre :

**Bovay SA** · **Golay Sàrl** · **Zbinden** · **Currat** · **Pittet** ·
**Dutoit** · **Progin**

*(En Suisse romande une société est une **SA** ou une **Sàrl**, jamais une SARL
ni une GmbH.)*

Collaborateurs, pour les écrans d'équipe — un mélange romand / alémanique /
international, tel qu'on le lit sur un organigramme vaudois réel :

Laurent Chappuis · Sandrine Bovay · Camille Dutoit · Nicolas Zbinden ·
Nadia Pittet · Michel Golay · Aline Currat · Yves Progin · Elena Ferrari ·
Omar Baumann · Julien Rochat

---

## 6. Véhicules

Deux modèles réellement courants en Suisse, qui conservent la structure du
visuel français (un thermique, un électrique) :

| | Libellé exact dans l'image |
|---|---|
| Thermique | **ŠKODA OCTAVIA** |
| Électrique | **TESLA MODEL Y** ⚡ |

- **Pas de mention de puissance** après le modèle : ni `8CV`, ni `4CV`, ni
  `(6cv)`. C'est la différence la plus visible avec le master français.
- Le **Š** de Škoda porte son caron. À défaut, écrire `SKODA` — jamais `Skoda`
  mal accentué.
- L'éclair ⚡ reste s'il figure sur le master : il qualifie le véhicule, pas le
  taux. **Les deux véhicules sont remboursés à `CHF 0.75`** — aucune majoration
  électrique en Suisse, contrairement au barème français.
- Substitut possible si l'on préfère éviter une marque américaine :
  **VW ID.4** à la place de la Tesla.

---

## 7. Les chiffres, écran par écran

Tous vérifiés : `montant = km × 0.75`.

### 7.1 `app/report-mileage` — le relevé annuel

| Emplacement | `/fr` | **`/ch-fr`** |
|---|---|---|
| En-tête, nom | DUPONT Michel | **CHAPPUIS Laurent** |
| En-tête, adresse | 2 rue des buissons / 69 200 Vourles | **Chemin des Vignes 8 / 1096 Cully** |
| Titre | INDEMNITÉS KILOMÉTRIQUES | **FRAIS KILOMÉTRIQUES** |
| Période | du 01/01/2020 au 31/12/2020 | **du 01.01.2026 au 31.12.2026** |
| Bandeau véhicule | RENAULT CLIO (6cv) - d x 0.386 | **ŠKODA OCTAVIA - d x 0.75** |
| Bandeau total | 21 890 km / 5 876 € | **18’400 km / 13’800.00 CHF** |

*(L'année 2026 est imposée par le taux : `CHF 0.75` ne s'applique qu'à partir du
1ᵉʳ janvier 2026. Un relevé daté 2025 devrait afficher `CHF 0.70`.)*

Détail des déplacements — même structure que le master (puce d'origine, RDV en
aller-retour `⇄` ou en chaîne `↳`, distance à droite) :

| Date | Origine / RDV | Adresse | km |
|---|---|---|---:|
| 08.01.2026 | ● domicile | | |
| | ⇄ visite client Bovay SA | Rue Centrale 14, 1110 Morges | **50 km** |
| 09.01.2026 | ● bureau | | |
| | ⇄ RDV vente Golay Sàrl | Grand-Rue 27, 1260 Nyon | **60 km** |
| | ● bureau | | |
| | ⇄ visite client Zbinden | Avenue de la Gare 5, 1800 Vevey | **38 km** |
| 10.01.2026 | ● bureau | | |
| | ↳ prospection Currat | Rue du Simplon 3, 1006 Lausanne | **4 km** |
| | ↳ dîner client Pittet | Place du Marché 2, 1020 Renens | **7 km** |

### 7.2 `app/screen-settings-addresses` — adresses favorites

```
ADRESSES FAVORITES :
★ bureau      Avenue de Rumine 22, 1005 Lausanne
★ domicile    adresse par défaut
              Chemin des Vignes 8, 1096 Cully
★ filiale     Rue de Lyon 42, 1203 Genève
```

### 7.3 `app/screen-settings-vehicles` — véhicules

```
VÉHICULES :
🚗 škoda OCTAVIA
🚗 tesla MODEL Y ⚡
```

La casse du master français est conservée (marque en bas de casse, modèle en
capitales). **Rien après le modèle** : le `8CV` / `4CV` français disparaît.

### 7.4 `app/screen-claims-list` — liste des demandes

Titre : **LISTE DES DEMANDES DE REMBOURSEMENT**.
Colonnes inchangées : COLLABORATEUR · STATUT · KM / MONTANT · PÉRIODE.

| Collaborateur | Statut | km / montant | Période |
|---|---|---|---|
| Julien Rochat | à traiter | 170 km / **127.50 CHF** | juillet 2026 |
| Sandrine Bovay | à traiter | 468 km / **351.00 CHF** | août 2026 |
| Camille Dutoit | validée | 312 km / **234.00 CHF** | août 2026 |
| Camille Dutoit | en attente | 52 km / **39.00 CHF** | juin 2026 |
| Nicolas Zbinden | validée | 1’092 km / **819.00 CHF** | juillet 2026 |
| Laure Chappuis | à traiter | 598 km / **448.50 CHF** | août 2026 |
| Nadia Pittet | validée | 556 km / **417.00 CHF** | août 2026 |
| Omar Baumann | validée | 200 km / **150.00 CHF** | août 2026 |
| Michel Golay | validée | 58 km / **43.50 CHF** | juin 2026 |
| Aline Currat | à traiter | 320 km / **240.00 CHF** | août 2026 |
| Yves Progin | à traiter | 704 km / **528.00 CHF** | juillet 2026 |

C'est l'écran où la règle 4 se voit le mieux : **onze lignes, un seul taux**.

### 7.5 `app/screen-claim-approve` — validation d'une demande

| Emplacement | **`/ch-fr`** |
|---|---|
| Nom | **SANDRINE BOVAY** |
| Période | **Juillet 2026** |
| Montant | **1’155.00 CHF** |
| Sous-titre | **1’540 km / 118 rdv** |
| Détail | ● domicile → ↳ RDV vente Golay Sàrl → ↳ visite client Zbinden → ↳ dîner client Pittet → ● bureau ; puis ● bureau → ↳ contrôle chantier Currat → ● bureau |

### 7.6 `app/screen-next-stop` — agenda et « RDV suivant »

En-tête du mois : **JUIN 2026**. Popup inchangée
(`DESTINATION :` / `RDV suivant` / `Maison` / `Bureau`).

| Heure | RDV | Dossier | Adresse | km |
|---|---|---|---|---:|
| 09:15 | visite hebdo | Bovay | Rue Centrale 14, 1110 Morges | 25 km |
| 10:00 | contrôle chantier | | Avenue de Lonay 6, 1110 Morges | 3 km |
| 10:45 | visite client | Golay | Route Suisse 12, 1163 Etoy | 9 km |
| 11:20 | visite client | Zbinden | Grand-Rue 27, 1260 Nyon | 18 km |

### 7.7 `icons/compliance` — le tampon

- Étiquette du document : `IK` → **`FRAIS KM`**
- Chiffres : `1 250 km` / `501 €` → **`1’250 km`** / **`937.50 CHF`**
- Le texte courbe **CERTIFIÉ CONFORME** est conservé : il ne revendique aucun
  barème, seulement la conformité du document. Ne rien y ajouter qui nomme une
  norme suisse.

### 7.8 `icons/calendar-to-trip` — l'asset le plus servi du site

Seul changement : `1 250 km` → **`1’250 km`** (apostrophe typographique).
`RDV :` est valable tel quel en Suisse romande.

### 7.9 `icons/security` — le cadenas

Le master français est un cadenas **aux couleurs du drapeau français**. Sur
`/ch-fr` l'argument vendu n'est pas le pavillon de l'éditeur mais la
**souveraineté des données** : hébergement européen, hors cloud américain, nLPD
et RGPD. Deux voies, à trancher côté marketing :

1. Cadenas **neutre** (pas de drapeau) — le plus sûr ;
2. Cadenas + mention **hébergement européen**.

Un cadenas au drapeau suisse serait un contresens : izika n'héberge pas en
Suisse.

### 7.10 `icons/approval`, `icons/auto-distance`

Pas de texte, pas de devise, pas de distance. **Aucun changement de contenu.**
Le fichier doit néanmoins exister dans l'arbre `ch-fr` (pas de repli implicite,
cf. `03-inventaire-assets.md` § 2.3) : ré-exporter le master tel quel suffit.

### 7.11 `social/og-default`, `social/og-article-default`, `photos/laptop-app`

- Bannières OG (1200×630) : la baseline y est cuite. Elle doit parler de
  **frais kilométriques**, jamais d'IK ni de barème. Formulation retenue par le
  site : *« Gestion automatique des frais kilométriques »*.
- `photos/laptop-app` : l'écran incrusté doit être un des écrans suisses
  ci-dessus, pas le master français.

---

## 8. Contrôle avant livraison

Cinq questions, dans cet ordre :

1. Le mot **barème** apparaît-il quelque part ? → à supprimer.
2. Un **CV / cv** subsiste-t-il après un modèle de véhicule ? → à supprimer.
3. Chaque **montant** est-il égal à `km × 0.75` ? → poser la multiplication.
4. Les milliers sont-ils séparés par une **apostrophe ’**, les décimales par un
   **point**, les dates par des **points** ?
5. Le mot **IK** ou **indemnités kilométriques** subsiste-t-il ? → *frais
   kilométriques*.

Au retour du lot, `npm run build` imprime la liste des fichiers dont les octets
sont encore identiques au marché français : elle doit tomber à zéro pour
`ch-fr`, **sauf** `icons/approval` et `icons/auto-distance` (§ 7.10), qui n'ont
légitimement rien à localiser.

# Données à inscrire dans les visuels — UK · CH · BE · DE

**Objet.** Ce document donne le **contenu chiffré et textuel à écrire dans les
images**, pour quatre variantes produites à partir des masters `/fr`. Il ne dit
rien de la forme : mise en page, couleurs, typographie et cadrages sont ceux du
français, inchangés.

Complément : `04-brief-contenu-assets-ch-fr.md` détaille la Suisse écran par
écran. La section 2 ci-dessous en est le résumé, **sans divergence** — même
personnage, mêmes adresses, mêmes véhicules.

---

## 0. Les six règles communes aux quatre variantes

**1. Aucun « CV » nulle part.** Le barème français dépend de la puissance
fiscale du véhicule : `RENAULT CLIO (6cv)`. **Aucun** des quatre pays ne
fonctionne comme ça. Tout ce qui suit un modèle — `(6cv)`, `8CV`, `4CV` —
disparaît. C'est la différence la plus visible avec le master français.

**2. Aucune majoration électrique.** Le +20 % français n'existe dans aucun des
quatre pays. Sur chaque variante, le véhicule thermique et le véhicule
électrique sont remboursés **au même taux**. L'éclair ⚡ peut rester s'il figure
sur le master : il qualifie le véhicule, pas le taux.

**3. Un seul taux par variante, donc des montants vérifiables.** `montant =
distance × taux`, sans tranche. Un lecteur doit pouvoir poser la multiplication
sur chaque ligne. Tous les chiffres de ce document sont calculés : ils se
recopient tels quels.

**4. Le Royaume-Uni est en MILES, pas en kilomètres.** C'est la variante qui
demande le plus d'attention : ni `km`, ni `€`, ni `1 250 km`. Les trois autres
restent en km.

**5. Numéro de rue.** UK : **numéro devant** (`22 Kings Road`). CH, BE, DE :
**numéro après** (`Avenue de Rumine 22`, `Rue de la Station 24`,
`Lindenstraße 14`).

**6. La distance d'une ligne de RDV.** Elle vaut le trajet **d'où l'on vient
jusqu'au RDV** ; quand la destination suivante est un point fixe (domicile,
bureau, filiale), **le retour est compté sur la même ligne**. La somme des
lignes d'une journée égale donc exactement la boucle réellement parcourue —
c'est ce qui rend chaque total vérifiable.

---

## 1. Royaume-Uni — Anglais (`/uk`)

### 1.1 Barème

| | |
|---|---|
| Régime | **HMRC Approved Mileage Allowance Payments (AMAP)** — barème officiel opposable |
| Taux à écrire | **55p per mile** (année fiscale 2026/27, premiers 10 000 miles) |
| Au-delà de 10 000 miles | 25p per mile — **hors sujet ici** : tous les exemples restent sous le seuil, donc un seul taux |
| Unité | **mile** |
| Devise | **£** |
| Véhicule | Sans effet sur le taux. Électrique et thermique : 55p |

Formulations autorisées : *HMRC approved rates*, *HMRC compliant*.
Formulation interdite : rien qui présente le taux comme un **dû** — l'AMAP est
le **maximum exonéré**, pas une obligation de paiement.

### 1.2 Conventions d'écriture

| | Écriture | Contre-exemple |
|---|---|---|
| Montant | `£5,214.00` (symbole devant) | `5 214,00 £`, `5.214,00 GBP` |
| Taux | `55p per mile` | `£0.55/km`, `0,55 £` |
| Distance | `9,480 miles` (virgule de milliers) | `9 480 km`, `9.480 miles` |
| Date | `12 Oct 2026` | `10/12/2026` (ambigu US/UK) |
| Adresse | `22 Kings Road, Reading RG1 3BY` — **numéro devant**, code postal **après** la ville | `Kings Road 22, RG1 3BY Reading` |

### 1.3 Le personnage et ses trois adresses

**Collaborateur : HARPER James** — commercial d'une PME de la Thames Valley.

| Rôle | Libellé dans l'app | Adresse |
|---|---|---|
| Domicile *(adresse par défaut)* | `home` | **14 Wilton Road, Reading RG30 2SS** |
| Bureau | `office` | **22 Kings Road, Reading RG1 3BY** |
| Filiale | `branch` | **8 Oxford Business Park, Cowley, Oxford OX4 2JZ** |

### 1.4 Véhicules

| | Libellé exact dans l'image |
|---|---|
| Thermique | **FORD PUMA** |
| Électrique | **TESLA MODEL Y** ⚡ |

Rien après le modèle. Même taux pour les deux.

### 1.5 Les dix déplacements

| Jour | Départ | RDV | Puis | Distance |
|---|---|---|---|---:|
| **Mon 12 Oct 2026** | home | Hartley & Co, Basingstoke | next appointment | 19 miles |
|  | Hartley & Co, Basingstoke | Denton Systems, Newbury | office | 34 miles |
| | | | **Total du jour** | **53 miles** |
| **Tue 13 Oct 2026** | office | Wexford Retail, Bracknell | next appointment | 10 miles |
|  | Wexford Retail, Bracknell | Aldgate Print, Maidenhead | office | 23 miles |
| | | | **Total du jour** | **33 miles** |
| **Wed 14 Oct 2026** | office | Beaumont Foods, Didcot | next appointment | 18 miles |
|  | Beaumont Foods, Didcot | Whitlock Engineering, Oxford | branch | 18 miles |
|  | branch | Redmayne Ltd, High Wycombe | home | 46 miles |
| | | | **Total du jour** | **82 miles** |
| **Thu 15 Oct 2026** | office | Calloway Motors, Swindon | office | 80 miles |
| | | | **Total du jour** | **80 miles** |
| **Fri 16 Oct 2026** | office | Pinewood Clinic, Guildford | next appointment | 25 miles |
|  | Pinewood Clinic, Guildford | Marchant & Sons, Woking | home | 31 miles |
| | | | **Total du jour** | **56 miles** |

**Total de la semaine : 304 miles × 55p = £167.20**

### 1.6 Chiffres clés à reporter dans les visuels

| Visuel | `/fr` | **`/uk`** |
|---|---|---|
| `app/report-mileage` — bandeau véhicule | RENAULT CLIO (6cv) - d x 0.386 | **FORD PUMA — 55p per mile** |
| `app/report-mileage` — bandeau total | 21 890 km / 5 876 € | **9,480 miles / £5,214.00** |
| `icons/calendar-to-trip` | 1 250 km | **780 miles** |
| `icons/compliance` | 1 250 km / 501 € | **780 miles / £429.00** |
| `icons/approval` | 200km - 56€ | **200 miles – £110.00** |
| Étiquette du document (`compliance`) | IK | **MILEAGE** |
| Titre du relevé | INDEMNITÉS KILOMÉTRIQUES | **MILEAGE ALLOWANCE** |
| Liste des demandes | LISTE DES DEMANDES D'INDEMNISATION | **EXPENSE CLAIMS** |
| Expert-comptable | expert-comptable | **accountant** |

Réservoir de noms (clients et collaborateurs, réutilisables d'un écran à
l'autre) : *Hartley · Denton · Wexford · Aldgate · Beaumont · Whitlock ·
Redmayne · Calloway · Pinewood · Marchant* — James Harper · Sarah Whitlock ·
Tom Beaumont · Priya Nair · Daniel Okafor · Emma Callow · Ryan Doyle.

---

## 2. Suisse — Français (`/ch-fr`)

Résumé de `04-brief-contenu-assets-ch-fr.md`, à lire en entier avant production.

### 2.1 Barème

| | |
|---|---|
| Régime | **Il n'existe pas de barème suisse.** Le taux figure au *règlement de frais* approuvé par le canton |
| Taux à écrire | **CHF 0.75** (maximum admis fiscalement depuis le 1ᵉʳ janvier 2026 ; c'était CHF 0.70 jusqu'au 31.12.2025) |
| Unité / devise | km · **CHF** |

**Interdit dans les images :** « barème », « barème officiel », « conforme au
barème ». Ces mots n'ont pas d'objet en Suisse. L'année **2026** est imposée par
le taux : un relevé daté 2025 devrait afficher CHF 0.70.

### 2.2 Conventions d'écriture

`13’800.00 CHF` (code **après**, point décimal) · taux `CHF 0.75` (code
**devant**) · `18’400 km` (apostrophe typographique **’** U+2019) · date
`12.01.2026` (points) · adresse `Avenue de Rumine 22, 1005 Lausanne` (NPA à
4 chiffres devant la localité).

Vocabulaire : **frais kilométriques** (jamais « IK »), **FRAIS KM** sur
l'étiquette, **LISTE DES DEMANDES DE REMBOURSEMENT**, **fiduciaire** (pas
expert-comptable), **NPA** (pas code postal).

### 2.3 Le personnage et ses trois adresses

**Collaborateur : CHAPPUIS Laurent** — commercial d'une PME vaudoise.

| Rôle | Libellé dans l'app | Adresse |
|---|---|---|
| Domicile *(adresse par défaut)* | `domicile` | **Chemin des Vignes 8, 1096 Cully** |
| Bureau | `bureau` | **Avenue de Rumine 22, 1005 Lausanne** |
| Filiale | `filiale` | **Rue de Lyon 42, 1203 Genève** |

### 2.4 Véhicules

| | Libellé exact dans l'image |
|---|---|
| Thermique | **ŠKODA OCTAVIA** |
| Électrique | **TESLA MODEL Y** ⚡ |

Le **Š** porte son caron ; à défaut écrire `SKODA`, jamais `Skoda` mal accentué.
Substitut si l'on préfère éviter une marque américaine : **VW ID.4**.

### 2.5 Les dix déplacements

| Jour | Départ | RDV | Puis | Distance |
|---|---|---|---|---:|
| **Lundi 12.01.2026** | domicile | Bovay SA, Morges | RDV suivant | 25 km |
|  | Bovay SA, Morges | Golay Sàrl, Nyon | bureau | 50 km |
| | | | **Total du jour** | **75 km** |
| **Mardi 13.01.2026** | bureau | Zbinden, Vevey | bureau | 38 km |
| | | | **Total du jour** | **38 km** |
| **Mercredi 14.01.2026** | bureau | Currat, Renens | RDV suivant | 7 km |
|  | Currat, Renens | Pittet, Morges | RDV suivant | 8 km |
|  | Pittet, Morges | Dutoit, Etoy | filiale | 50 km |
|  | filiale | Progin, Nyon | domicile | 80 km |
| | | | **Total du jour** | **145 km** |
| **Jeudi 15.01.2026** | bureau | Rochat SA, Yverdon-les-Bains | bureau | 74 km |
| | | | **Total du jour** | **74 km** |
| **Vendredi 16.01.2026** | domicile | Ferrari & Cie, Fribourg | RDV suivant | 64 km |
|  | Ferrari & Cie, Fribourg | Baumann, Bulle | domicile | 92 km |
| | | | **Total du jour** | **156 km** |

**Total de la semaine : 488 km × CHF 0.75 = 366.00 CHF**

En Suisse romande une société est une **SA** ou une **Sàrl** — jamais une SARL,
jamais une GmbH.

### 2.6 Chiffres clés à reporter dans les visuels

| Visuel | `/fr` | **`/ch-fr`** |
|---|---|---|
| `app/report-mileage` — bandeau véhicule | RENAULT CLIO (6cv) - d x 0.386 | **ŠKODA OCTAVIA - d x 0.75** |
| `app/report-mileage` — bandeau total | 21 890 km / 5 876 € | **18’400 km / 13’800.00 CHF** |
| `icons/calendar-to-trip` | 1 250 km | **1’250 km** |
| `icons/compliance` | 1 250 km / 501 € | **1’250 km / 937.50 CHF** |
| `icons/approval` | 200km - 56€ | **200 km – 150.00 CHF** |

Noms : *Bovay SA · Golay Sàrl · Zbinden · Currat · Pittet · Dutoit · Progin ·
Rochat SA · Ferrari & Cie · Baumann* — Laurent Chappuis · Sandrine Bovay ·
Camille Dutoit · Nicolas Zbinden · Nadia Pittet · Aline Currat · Yves Progin.

---

## 3. Belgique — Français (`/be-fr`)

### 3.1 Barème

| | |
|---|---|
| Régime retenu | **Régime annuel** (art. 13, AR du 18 janvier 1965) — circulaire BOSA, période **01/07/2026 → 30/06/2027** |
| Taux à écrire | **0,4761 €/km** — **quatre décimales obligatoires** |
| Unité / devise | km · **€** |
| Véhicule | Sans effet. Électrique et thermique : 0,4761 |

**Quatre décimales, pas trois.** `0,476` est un chiffre faux : c'est la
précision publiée par les circulaires belges, et l'arrondi décrédibilise
l'image auprès d'un lecteur belge.

**Le régime est figé.** La Belgique a un second régime, trimestriel
(0,4440 €/km). Ne pas le mélanger : un employeur qui a choisi l'annuel s'y tient
du 1ᵉʳ juillet au 30 juin. **Une seule valeur dans tout le lot.**

**Interdit dans les images :** présenter le taux comme un dû — c'est un
**plafond d'exonération**, pas une obligation de versement. Et ne jamais
attribuer le plafond de 24 000 km/an à l'ONSS : c'est une position fiscale
contestée, pas une règle ONSS.

### 3.2 Conventions d'écriture

| | Écriture | Contre-exemple |
|---|---|---|
| Montant | `8 760,24 €` (symbole **après**, virgule décimale) | `€8,760.24`, `8.760,24 EUR` |
| Taux | `0,4761 €/km` | `0,476 €/km`, `0.4761 €` |
| Distance | `18 400 km` (espace insécable) | `18.400 km`, `18,400 km` |
| Date | `12/10/2026` | `10/12/2026`, `2026-10-12` |
| Adresse | `Rue de la Station 24, 1435 Mont-Saint-Guibert` — **numéro après la rue**, code postal à **4 chiffres** | `24 rue de la Station, 01435 …` |

### 3.3 Le personnage et ses trois adresses

**Collaborateur : LAMBERT Nicolas** — commercial d'une PME du Brabant wallon.

| Rôle | Libellé dans l'app | Adresse |
|---|---|---|
| Domicile *(adresse par défaut)* | `domicile` | **Rue de la Station 24, 1435 Mont-Saint-Guibert** |
| Bureau | `bureau` | **Chaussée de Charleroi 112, 1060 Bruxelles** |
| Filiale | `filiale` | **Boulevard d'Avroy 78, 4000 Liège** |

### 3.4 Véhicules

| | Libellé exact dans l'image |
|---|---|
| Thermique | **VOLKSWAGEN GOLF** |
| Électrique | **BMW i4** ⚡ |

Rien après le modèle. La Belgique **a** des chevaux fiscaux — mais pour la taxe
de circulation, pas pour l'indemnité kilométrique, qui est un forfait plat. Donc
aucun `CV` dans les visuels.

### 3.5 Les dix déplacements

| Jour | Départ | RDV | Puis | Distance |
|---|---|---|---|---:|
| **Lundi 12/10/2026** | domicile | Nihoul & Fils, Wavre | RDV suivant | 10 km |
|  | Nihoul & Fils, Wavre | Delvaux SRL, Louvain-la-Neuve | bureau | 38 km |
| | | | **Total du jour** | **48 km** |
| **Mardi 13/10/2026** | bureau | Piret SA, Anvers | bureau | 96 km |
| | | | **Total du jour** | **96 km** |
| **Mercredi 14/10/2026** | bureau | Servais & Cie, Nivelles | RDV suivant | 34 km |
|  | Servais & Cie, Nivelles | Collard SRL, Charleroi | RDV suivant | 28 km |
|  | Collard SRL, Charleroi | Hensen SA, Namur | domicile | 80 km |
| | | | **Total du jour** | **142 km** |
| **Jeudi 15/10/2026** | domicile | Ghislain SRL, Namur | RDV suivant | 42 km |
|  | Ghislain SRL, Namur | Bastin SA, Liège | filiale | 66 km |
|  | filiale | Dubois & Associés, Verviers | domicile | 158 km |
| | | | **Total du jour** | **266 km** |
| **Vendredi 16/10/2026** | bureau | Van Roy SA, Gand | bureau | 112 km |
| | | | **Total du jour** | **112 km** |

**Total de la semaine : 664 km × 0,4761 = 316,13 €**

En Belgique, une société est une **SA** ou une **SRL**. **`SPRL` est mort** :
supprimé par le Code des sociétés et des associations de 2019. L'écrire dans une
image date le visuel de sept ans.

### 3.6 Chiffres clés à reporter dans les visuels

| Visuel | `/fr` | **`/be-fr`** |
|---|---|---|
| `app/report-mileage` — bandeau véhicule | RENAULT CLIO (6cv) - d x 0.386 | **VOLKSWAGEN GOLF - d x 0,4761** |
| `app/report-mileage` — bandeau total | 21 890 km / 5 876 € | **18 400 km / 8 760,24 €** |
| `icons/calendar-to-trip` | 1 250 km | **1 250 km** |
| `icons/compliance` | 1 250 km / 501 € | **1 250 km / 595,13 €** *(595,125 arrondi au centime supérieur)* |
| `icons/approval` | 200km - 56€ | **200 km – 95,22 €** |

Le vocabulaire français du master reste valable (**indemnités kilométriques**,
**IK**, **expert-comptable** — on dit aussi *comptable agréé* en Belgique, les
deux passent).

Noms : *Nihoul & Fils · Delvaux SRL · Piret SA · Servais & Cie · Collard SRL ·
Hensen SA · Ghislain SRL · Bastin SA · Dubois & Associés · Van Roy SA* —
Nicolas Lambert · Sophie Delvaux · Julien Piret · Marie Collard · Thomas Hensen ·
Céline Servais · Bruno Van Roy.

---

## 4. Belgique — Anglais (`/be-en`)

**Variante de langue, pas de pays.** Le personnage, les adresses, les clients,
les distances, le taux et les véhicules sont **exactement ceux de la section 3**.
Seuls changent les **libellés d'interface** et les **conventions de nombre**.

### 4.1 Ce qui change

| | `/be-fr` | **`/be-en`** |
|---|---|---|
| Montant | `8 760,24 €` | **`€8,760.24`** (symbole devant, point décimal, virgule de milliers) |
| Taux | `0,4761 €/km` | **`€0.4761/km`** — toujours **quatre décimales** |
| Distance | `18 400 km` | **`18,400 km`** — reste en **km** |
| Date | `12/10/2026` | **`12 Oct 2026`** |
| Adresse | inchangée | **inchangée** — `Rue de la Station 24, 1435 Mont-Saint-Guibert` ne se traduit pas |
| Formes sociales | SA / SRL | **inchangées** — `Delvaux SRL`, `Piret SA` |

### 4.2 Libellés d'interface

| `/fr` | **`/be-en`** |
|---|---|
| INDEMNITÉS KILOMÉTRIQUES | **MILEAGE ALLOWANCE** |
| LISTE DES DEMANDES D'INDEMNISATION | **EXPENSE CLAIMS** |
| IK *(étiquette `compliance`)* | **MILEAGE** |
| domicile / bureau / filiale | **home / office / branch** |
| RDV suivant | **next appointment** |
| visite client | **client visit** |
| à traiter / validée / en attente | **to review / approved / pending** |
| expert-comptable | **accountant** |
| CERTIFIÉ CONFORME | **CERTIFIED COMPLIANT** |

Le terme fiscal belge est **glosé, pas traduit** : écrire *kilometre allowance
(indemnité kilométrique)* quand la place le permet, sinon *kilometre allowance*.
Le taux vient de la **circulaire fédérale BOSA** — le mentionner ainsi, jamais
comme un « Belgian tax scale ».

### 4.3 Les dix déplacements

Mêmes trajets, mêmes distances qu'en 3.5.

| Jour | Départ | RDV | Puis | Distance |
|---|---|---|---|---:|
| **Mon 12 Oct 2026** | home | Nihoul & Fils, Wavre | next appointment | 10 km |
|  | Nihoul & Fils, Wavre | Delvaux SRL, Louvain-la-Neuve | office | 38 km |
| | | | **Total du jour** | **48 km** |
| **Tue 13 Oct 2026** | office | Piret SA, Antwerp | office | 96 km |
| | | | **Total du jour** | **96 km** |
| **Wed 14 Oct 2026** | office | Servais & Cie, Nivelles | next appointment | 34 km |
|  | Servais & Cie, Nivelles | Collard SRL, Charleroi | next appointment | 28 km |
|  | Collard SRL, Charleroi | Hensen SA, Namur | home | 80 km |
| | | | **Total du jour** | **142 km** |
| **Thu 15 Oct 2026** | home | Ghislain SRL, Namur | next appointment | 42 km |
|  | Ghislain SRL, Namur | Bastin SA, Liège | branch | 66 km |
|  | branch | Dubois & Associés, Verviers | home | 158 km |
| | | | **Total du jour** | **266 km** |
| **Fri 16 Oct 2026** | office | Van Roy SA, Ghent | office | 112 km |
| | | | **Total du jour** | **112 km** |

**Total de la semaine : 664 km × €0.4761 = €316.13**

Seuls **Anvers → Antwerp** et **Gand → Ghent** changent de nom : ce sont des
exonymes anglais établis. **Wavre, Nivelles, Charleroi, Namur, Liège,
Louvain-la-Neuve, Verviers restent tels quels.**

### 4.4 Chiffres clés

| Visuel | **`/be-en`** |
|---|---|
| `app/report-mileage` — bandeau véhicule | **VOLKSWAGEN GOLF — €0.4761/km** |
| `app/report-mileage` — bandeau total | **18,400 km / €8,760.24** |
| `icons/calendar-to-trip` | **1,250 km** |
| `icons/compliance` | **1,250 km / €595.13** *(595.125 rounded up)* |
| `icons/approval` | **200 km – €95.22** |

---

## 5. Allemagne — Anglais (`/de-en`)

### 5.1 Barème

| | |
|---|---|
| Régime | **Kilometerpauschale** (déplacement professionnel, *Dienstreise*) |
| Taux à écrire | **€0.30 per km** — forfait unique, une seule tranche |
| Unité / devise | km · **€** |
| Véhicule | Sans effet. Électrique et thermique : 0.30 (0,20 pour un deux-roues, hors périmètre) |
| Distance comptée | **Aller ET retour**, tous les kilomètres |

**Le piège à ne pas rater.** L'Allemagne a un **second** dispositif,
l'**Entfernungspauschale / Pendlerpauschale** à **0,38 €/km**. Ce n'est ni le
même métier, ni le même payeur, ni la même distance (trajet simple domicile ↔
travail, déduction fiscale personnelle). **Aucune image ne doit afficher 0,38,
ni le mot Pendlerpauschale.** Confondre les deux détruit la crédibilité auprès
d'un lecteur allemand.

### 5.2 Conventions d'écriture

Interface anglaise, donc **conventions de nombre anglaises**, comme en 4.1 :

| | Écriture | Contre-exemple |
|---|---|---|
| Montant | `€5,520.00` | `5.520,00 €`, `EUR 5520` |
| Taux | `€0.30 per km` | `0,30 €/km`, `€0.38` |
| Distance | `18,400 km` | `18.400 km` |
| Date | `12 Oct 2026` | `12.10.2026` (correct en allemand, incohérent en UI anglaise) |
| Adresse | `Lindenstraße 14, 40723 Hilden` — **numéro après la rue**, code postal à **5 chiffres** | `14 Linden Street, Hilden 40723` |

Le **ß** de `Lindenstraße` et les trémas (`Köln`, `Düsseldorf`,
`Mönchengladbach`, `Krüger`, `Söhne`) sont conservés tels quels. Ne jamais
transcrire en `Koeln` ni en `Koln`.

### 5.3 Le personnage et ses trois adresses

**Collaborateur : BECKER Andreas** — commercial d'une PME (*Mittelstand*) de
Rhénanie-du-Nord-Westphalie.

| Rôle | Libellé dans l'app | Adresse |
|---|---|---|
| Domicile *(adresse par défaut)* | `home` | **Lindenstraße 14, 40723 Hilden** |
| Bureau | `office` | **Königsallee 92, 40212 Düsseldorf** |
| Filiale | `branch` | **Hohenzollernring 57, 50672 Köln** |

### 5.4 Véhicules

| | Libellé exact dans l'image |
|---|---|
| Thermique | **VOLKSWAGEN PASSAT** |
| Électrique | **VOLKSWAGEN ID.4** ⚡ |

Rien après le modèle : l'Allemagne ne connaît pas la puissance fiscale
française.

### 5.5 Les dix déplacements

| Jour | Départ | RDV | Puis | Distance |
|---|---|---|---|---:|
| **Mon 12 Oct 2026** | home | Vogel GmbH, Wuppertal | next appointment | 22 km |
|  | Vogel GmbH, Wuppertal | Kern & Partner, Solingen | office | 42 km |
| | | | **Total du jour** | **64 km** |
| **Tue 13 Oct 2026** | office | Hartmann AG, Essen | next appointment | 35 km |
|  | Hartmann AG, Essen | Brandt GmbH, Duisburg | office | 47 km |
| | | | **Total du jour** | **82 km** |
| **Wed 14 Oct 2026** | office | Seidel Logistik, Krefeld | office | 52 km |
| | | | **Total du jour** | **52 km** |
| **Thu 15 Oct 2026** | office | Neumann GmbH, Leverkusen | next appointment | 30 km |
|  | Neumann GmbH, Leverkusen | Fischer & Söhne, Köln | branch | 20 km |
|  | branch | Weber AG, Bonn | home | 100 km |
| | | | **Total du jour** | **150 km** |
| **Fri 16 Oct 2026** | office | Krüger GmbH, Mönchengladbach | next appointment | 32 km |
|  | Krüger GmbH, Mönchengladbach | Lorenz KG, Neuss | office | 36 km |
| | | | **Total du jour** | **68 km** |

**Total de la semaine : 416 km × €0.30 = €124.80**

Formes sociales allemandes : **GmbH**, **AG**, **KG**, **GmbH & Co. KG**.
Jamais SA, jamais SARL, jamais Ltd.

### 5.6 Libellés d'interface et glose

Mêmes libellés anglais qu'en 4.2, avec deux termes **glosés, pas traduits** —
c'est ce qui permet au lecteur allemand de reconnaître son propre régime :

| Où | Texte à écrire |
|---|---|
| Titre du relevé | **MILEAGE ALLOWANCE** *(Kilometerpauschale)* |
| Nom du taux | **statutory flat rate — Kilometerpauschale, €0.30 per km** |
| Note de frais | **expense report** *(Reisekostenabrechnung)* |
| Étiquette `compliance` | **MILEAGE** |

### 5.7 Chiffres clés à reporter dans les visuels

| Visuel | `/fr` | **`/de-en`** |
|---|---|---|
| `app/report-mileage` — bandeau véhicule | RENAULT CLIO (6cv) - d x 0.386 | **VOLKSWAGEN PASSAT — €0.30 per km** |
| `app/report-mileage` — bandeau total | 21 890 km / 5 876 € | **18,400 km / €5,520.00** |
| `icons/calendar-to-trip` | 1 250 km | **1,250 km** |
| `icons/compliance` | 1 250 km / 501 € | **1,250 km / €375.00** |
| `icons/approval` | 200km - 56€ | **200 km – €60.00** |

Noms : *Vogel GmbH · Kern & Partner · Hartmann AG · Brandt GmbH · Seidel
Logistik · Neumann GmbH · Fischer & Söhne · Weber AG · Krüger GmbH · Lorenz KG*
— Andreas Becker · Julia Hartmann · Stefan Vogel · Katrin Brandt · Michael Weber ·
Lena Neumann · Tobias Krüger.

---

## 6. Tableau de contrôle avant livraison

Une colonne par variante. Chaque case doit être vraie sur **chaque** image.

| | `/uk` | `/ch-fr` | `/be-fr` | `/be-en` | `/de-en` |
|---|---|---|---|---|---|
| Unité de distance | **miles** | km | km | km | km |
| Devise | £ | CHF | € | € | € |
| Taux unique | 55p/mile | CHF 0.75 | 0,4761 €/km | €0.4761/km | €0.30 per km |
| Séparateur de milliers | `,` | `’` | espace | `,` | `,` |
| Séparateur décimal | `.` | `.` | `,` | `.` | `.` |
| Symbole devise | devant | **après** (taux : devant) | après | devant | devant |
| Numéro de rue | **devant** | après | après | après | après |
| Un `CV` subsiste ? | ✗ | ✗ | ✗ | ✗ | ✗ |
| Une majoration électrique ? | ✗ | ✗ | ✗ | ✗ | ✗ |
| Le mot « barème » ? | *approved rates* OK | ✗ **interdit** | plafond, pas dû | ceiling, not due | statutory rate OK |

Cinq questions à poser sur chaque visuel, dans cet ordre :

1. **L'unité est-elle la bonne ?** Un `km` sur un visuel `/uk` est une promesse
   produit fausse, pas une coquille.
2. **Un `CV / cv` subsiste-t-il après un modèle de véhicule ?** → à supprimer.
3. **Chaque montant est-il égal à `distance × taux` ?** → poser la
   multiplication, ligne par ligne.
4. **Les séparateurs et le placement du symbole sont-ils ceux de la colonne
   ci-dessus ?** Une image qui écrirait autrement jurerait avec le texte du site
   affiché juste à côté.
5. **Le visuel `/de-en` affiche-t-il 0,38 quelque part ?** → erreur grave, c'est
   l'autre dispositif.
6. **Sur une page métier, les motifs de RDV viennent-ils du tableau de ce
   métier (§ 7) ?** Le cas à surveiller : un `next-stop` d'artisan qui montrerait
   encore des RDV d'assurance.

---

## 7. Motifs de RDV par métier

**Où ça sert.** Les quatre visuels de chaque page métier —
`verticals/<id>/agenda`, `next-stop`, `report` et `calendar-to-mileage` —
affichent des intitulés de RDV. Aujourd'hui, les quatre `next-stop` qui ne
concernent pas l'assurance reprennent ceux de l'assurance
(`03-inventaire-assets.md` § 5.1). Sur une page métier, **on ne prend les
motifs que dans le tableau de ce métier.**

Quinze motifs par métier, à piocher selon le nombre de lignes de l'écran. Ils
ont été choisis génériques pour que la plupart des gens du métier s'y
reconnaissent, et tirés du vocabulaire de chaque fiche `solutions/fr`.

### 7.1 Règles d'écriture

**1. Un motif, puis un nom.** C'est la structure du master : `Suivi chantier`
suivi d'un dossier de couleur, ou `Réception béton – Lemaître`. Le nom vient du
réservoir du marché (§ 1.6, 2.6, 3.6, 5.7). Exemple pour le même RDV :

| `/fr` | `/uk` | `/ch-fr` | `/be-fr` | Allemand |
|---|---|---|---|---|
| Visite maison – M. Lupin | House viewing – Mr Hartley | Visite villa – M. Golay | Visite maison – M. Piret | Hausbesichtigung – Vogel |

**2. La civilité, on la met ou on la retire, mais jamais au mauvais format.** En
français, c'est `M.` / `Mme` (CH, BE, FR). `Mr.` avec un point est américain.
Au Royaume-Uni, on écrit `Mr` / `Mrs` / `Ms`, **sans point**. En allemand,
**le nom de famille seul** : `Hr.` / `Fr.` existent, mais rallongent la ligne
et ne s'écrivent pas dans un agenda. **Quand la place manque, le nom seul passe
partout.**

**3. Casse.** Une majuscule au premier mot, puis des minuscules (`Visite de
risque`, `Site meeting`). **Exception allemande :** tous les noms communs
prennent une majuscule (`Angebot Bad`, `Aufmaß Küche`). C'est une règle de
grammaire, pas un choix de style.

**4. Longueur.** La colonne *car.* compte les caractères de l'allemand. Ils ont
été choisis courts exprès : **18 caractères au plus**, 12 en moyenne, soit
moins que les plus longs motifs du master (`Devis porte de garage`, 21). Ceux
qui dépassent 16 sont en gras dans la colonne. Si une ligne ne tient
toujours pas, **retirer le nom avant de toucher au motif**. Ne jamais couper
un mot allemand, ni l'abréger soi-même (`Besicht.`).

**5. Ä, ö, ü, ß.** Se conservent (`Schlüsselübergabe`, `Aufmaß`), comme pour
les adresses (§ 5.2).

**6. Dans la colonne anglaise.** Elle sert à `/uk`, `/be-en` et `/de-en`. Quand
un mot n'est compris qu'au Royaume-Uni (*snagging*, *CPD*, *motor quote*…), la
note donne l'équivalent neutre à prendre pour `/be-en` et `/de-en`.

**7. Le piège des repas — CH et BE.** En Suisse romande comme en Belgique,
**le dîner, c'est le repas de midi** (déjeuner = matin, souper = soir). Si on
écrit `Déjeuner client` à 12:30 sur un écran `/ch-fr` ou `/be-fr`, le RDV a
l'air d'être pris au petit-déjeuner. Écrire **`Dîner client`**.

**8. Le gras dans les colonnes CH / BE** signale que le mot **diffère du
français de France**. Ce n'est pas une mise en forme à reproduire. Les cases
sans gras se recopient telles quelles depuis le master.

**L'allemand.** Personne dans l'équipe ne le parle. Chaque motif allemand a
donc son **sens retraduit en français** dans la dernière colonne. Quand
l'allemand ne reprend pas le mot à mot du français, c'est que l'usage
allemand dit les choses autrement ; la note explique pourquoi. Avant une mise
en ligne, faire relire la colonne par un natif.

### 7.2 Les tableaux

### Agent général d'assurances — `verticals/insurance-agents/`

| # | `/fr` (master) | `/uk` · `/be-en` · `/de-en` | `/ch-fr` | `/be-fr` | Allemand | car. | Sens de l'allemand · notes |
|---:|---|---|---|---|---|---:|---|
| 1 | Signature contrat | Policy signing | Signature contrat | Signature contrat | Vertragsabschluss | **17** | « conclusion du contrat », terme consacré en assurance. Court : `Unterschrift` (« signature ») |
| 2 | Bilan annuel | Annual review | Bilan annuel | Bilan annuel | Jahresgespräch | 14 | « entretien annuel » |
| 3 | Expertise sinistre | Claim inspection | Expertise sinistre | Expertise sinistre | Schadentermin | 13 | « RDV sinistre » — `Schadenbesichtigung` (19) est exact mais trop long |
| 4 | Déclaration sinistre | Claim meeting | Déclaration sinistre | Déclaration sinistre | Schadenmeldung | 14 | « déclaration de sinistre » |
| 5 | Devis auto | Motor quote | **Offre auto** | Devis auto | Kfz-Angebot | 11 | « offre auto » (Kfz = véhicule). CH : un devis se dit **offre**. UK : *motor* est le mot assurance ; be-en/de-en : `Car insurance quote` |
| 6 | Assurance habitation | Home insurance | **Assurance ménage** | **Assurance incendie** | Hausrat | 7 | « contenu du logement ». CH : l'*assurance ménage* couvre le mobilier. BE : on dit *assurance incendie* pour l'habitation |
| 7 | Prévoyance pro | Income protection | **Prévoyance 3e pilier** | **Revenu garanti** | Vorsorge | 8 | « prévoyance ». CH : la prévoyance se pense en piliers (3e = privé). BE : *assurance revenu garanti* pour un indépendant |
| 8 | Flotte auto | Fleet insurance | Flotte auto | Flotte auto | Fuhrpark | 8 | « parc de véhicules » |
| 9 | Remise de documents | Document drop-off | Remise de documents | Remise de documents | Unterlagen | 10 | « documents » — l'agenda allemand dit simplement le mot |
| 10 | Visite de risque | Risk survey | Visite de risque | Visite de risque | Risikoprüfung | 13 | « examen du risque » |
| 11 | RDV prospect | Prospect meeting | RDV prospect | RDV prospect | Erstgespräch | 12 | « premier entretien » — c'est ainsi qu'on nomme un RDV prospect |
| 12 | RC pro | Public liability | **RC entreprise** | **RC exploitation** | Haftpflicht | 11 | « responsabilité civile ». UK : *public liability* est la RC pro britannique ; be-en/de-en : `Liability cover` |
| 13 | Suivi client | Client follow-up | Suivi client | Suivi client | Kundentermin | 12 | « RDV client », le plus générique |
| 14 | Réunion partenaire | Partner meeting | **Séance partenaire** | Réunion partenaire | Partnertreffen | 14 | « rencontre partenaire ». CH : une réunion se dit **séance** |
| 15 | Déj. réseau | Networking lunch | **Dîner réseau** | **Dîner réseau** | Geschäftsessen | 14 | « repas d'affaires ». CH/BE : **dîner = repas de midi** (cf. note en tête) |

### Agent immobilier — `verticals/real-estate-agents/`

| # | `/fr` (master) | `/uk` · `/be-en` · `/de-en` | `/ch-fr` | `/be-fr` | Allemand | car. | Sens de l'allemand · notes |
|---:|---|---|---|---|---|---:|---|
| 1 | Estimation | Valuation | Estimation | Estimation | Bewertung | 9 | « évaluation » |
| 2 | Visite appartement | Flat viewing | Visite appartement | Visite appartement | Besichtigung | 12 | « visite » — `Wohnungsbesichtigung` (20) trop long. UK : une visite se dit **viewing** ; be-en/de-en : `Apartment viewing` |
| 3 | Visite maison | House viewing | **Visite villa** | Visite maison | Hausbesichtigung | 16 | « visite de maison ». CH : une maison individuelle se dit **villa**, même modeste |
| 4 | Contre-visite | Second viewing | Contre-visite | **Deuxième visite** | Zweitbesichtigung | **17** | « deuxième visite » |
| 5 | Signature mandat | Agency agreement | Signature mandat | Signature mandat | Maklervertrag | 13 | « contrat d'agent immobilier » |
| 6 | Signature compromis | Offer meeting | **Réservation** | Signature compromis | Reservierung | 12 | « réservation ». Le compromis n'existe **ni en CH, ni en DE, ni au UK** : on passe directement chez le notaire (CH/DE) ou au *solicitor* (UK). L'étape amont est une réservation / une offre |
| 7 | Signature acte | Completion | **Acte notarié** | Signature acte | Notartermin | 11 | « RDV chez le notaire ». UK : *completion* = transfert de propriété et remise des clés |
| 8 | Remise des clés | Key handover | Remise des clés | Remise des clés | Schlüsselübergabe | **17** | « remise des clés » |
| 9 | État des lieux | Inventory check-in | État des lieux | État des lieux | Wohnungsübergabe | 16 | « remise du logement » (avec procès-verbal). UK : *inventory* est le terme de la location |
| 10 | Prospection quartier | Canvassing | Prospection quartier | Prospection quartier | Akquise | 7 | « prospection » |
| 11 | Photos du bien | Photo shoot | Photos du bien | Photos du bien | Fototermin | 10 | « séance photo » |
| 12 | Diagnostics | EPC assessment | **Visite technique** | **Certificat PEB** | Energieausweis | 14 | « certificat énergétique ». UK : EPC = DPE britannique. BE : le PEB est le DPE belge. CH : le CECB n'est pas obligatoire partout, d'où *visite technique* |
| 13 | Point propriétaire | Vendor update | Point propriétaire | Point propriétaire | Eigentümertermin | 16 | « RDV propriétaire » |
| 14 | RDV acquéreur | Buyer meeting | RDV acquéreur | RDV acquéreur | Käufertermin | 12 | « RDV acheteur » |
| 15 | Portes ouvertes | Open house | Portes ouvertes | Portes ouvertes | Sammelbesichtigung | **18** | « visite groupée » — la pratique allemande courante, surtout en location |

### Artisans du BTP — `verticals/craftsmen-construction/`

| # | `/fr` (master) | `/uk` · `/be-en` · `/de-en` | `/ch-fr` | `/be-fr` | Allemand | car. | Sens de l'allemand · notes |
|---:|---|---|---|---|---|---:|---|
| 1 | Devis porte de garage | Garage door quote | **Offre porte de garage** | Devis porte de garage | Angebot Garagentor | **18** | « offre porte de garage ». CH : un devis se dit **offre** |
| 2 | Devis salle de bain | Bathroom quote | **Offre salle de bains** | Devis salle de bain | Angebot Bad | 11 | « offre salle de bain » |
| 3 | Métré cuisine | Kitchen measure-up | Métré cuisine | Métré cuisine | Aufmaß Küche | 12 | « métré cuisine » — *Aufmaß* est le mot exact du métier |
| 4 | Ouverture chantier | Site start | Ouverture chantier | Ouverture chantier | Baustart | 8 | « démarrage chantier » |
| 5 | Suivi chantier | Site visit | Suivi chantier | Suivi chantier | Baustelle | 9 | « chantier » — l'agenda allemand écrit juste le mot |
| 6 | Réunion de chantier | Site meeting | **Séance de chantier** | Réunion de chantier | Baubesprechung | 14 | « réunion de chantier ». CH : terme usuel **séance de chantier** |
| 7 | Réception travaux | Handover | **Réception d'ouvrage** | **Réception provisoire** | Bauabnahme | 10 | « réception de l'ouvrage ». BE : la réception se fait en deux temps, *provisoire* puis *définitive* |
| 8 | Levée de réserves | Snagging | **Reprise des défauts** | Levée de réserves | Mängelbeseitigung | **17** | « élimination des défauts ». CH : la norme SIA parle de *défauts*, pas de réserves. UK : *snagging* ; be-en/de-en : `Defect fixing` |
| 9 | Pose fenêtres | Window fitting | Pose fenêtres | **Pose châssis** | Fenstermontage | 14 | « pose de fenêtres ». BE : une fenêtre se dit **châssis** |
| 10 | Dépannage fuite | Leak call-out | Dépannage fuite | Dépannage fuite | Rohrbruch | 9 | « rupture de canalisation » — l'intitulé d'urgence typique |
| 11 | Entretien chaudière | Boiler service | Entretien chaudière | Entretien chaudière | Heizungswartung | 15 | « entretien chauffage » |
| 12 | Livraison matériaux | Materials delivery | Livraison matériaux | Livraison matériaux | Lieferung | 9 | « livraison » |
| 13 | Passage négoce | Builders' merchant | **Passage fournisseur** | **Passage fournisseur** | Baustoffhandel | 14 | « négoce de matériaux ». UK : *builders' merchant* ; be-en/de-en : `Supplier pickup` |
| 14 | RDV architecte | Architect meeting | RDV architecte | RDV architecte | Architekt | 9 | « architecte » |
| 15 | Réfection toiture | Roof repair | Réfection toiture | Réfection toiture | Dachreparatur | 13 | « réparation toiture » |

### Consultants — `verticals/consultants/`

| # | `/fr` (master) | `/uk` · `/be-en` · `/de-en` | `/ch-fr` | `/be-fr` | Allemand | car. | Sens de l'allemand · notes |
|---:|---|---|---|---|---|---:|---|
| 1 | Kick-off mission | Project kick-off | **Kick-off mandat** | Kick-off mission | Kick-off | 8 | « lancement » — l'anglicisme est d'usage. CH : une mission se dit **mandat** |
| 2 | Atelier client | Client workshop | Atelier client | Atelier client | Workshop | 8 | « atelier » — anglicisme d'usage |
| 3 | COPIL | Steering committee | COPIL | COPIL | Lenkungskreis | 13 | « comité de pilotage » |
| 4 | Point d'avancement | Progress review | **Point de situation** | Point d'avancement | Jour fixe | 9 | « réunion de suivi récurrente » — expression française, mais **usage allemand courant** |
| 5 | Audit sur site | On-site audit | Audit sur site | Audit sur site | Audit vor Ort | 13 | « audit sur place » |
| 6 | RDV prospect | Prospect meeting | RDV prospect | RDV prospect | Erstgespräch | 12 | « premier entretien » |
| 7 | Présentation offre | Pitch | Présentation offre | Présentation offre | Pitch | 5 | « présentation commerciale » — anglicisme d'usage |
| 8 | Restitution | Debrief | Restitution | Restitution | Abschlusstermin | 15 | « RDV de clôture » |
| 9 | Formation | Training session | Formation | Formation | Schulung | 8 | « formation » |
| 10 | Déjeuner client | Client lunch | **Dîner client** | **Dîner client** | Geschäftsessen | 14 | « repas d'affaires ». CH/BE : **dîner = repas de midi** |
| 11 | Séminaire | Away day | Séminaire | Séminaire | Klausur | 7 | « séminaire au vert » (abrégé de *Klausurtagung*). UK : *away day* ; be-en/de-en : `Off-site` |
| 12 | Entretiens équipes | Staff interviews | Entretiens équipes | Entretiens équipes | Interviews | 10 | « entretiens » |
| 13 | Réunion partenaire | Partner meeting | **Séance partenaire** | Réunion partenaire | Partnertreffen | 14 | « rencontre partenaire » |
| 14 | Signature contrat | Contract signing | Signature contrat | Signature contrat | Unterschrift | 12 | « signature » |
| 15 | Comité de direction | Board meeting | **Séance de direction** | Comité de direction | Geschäftsführung | 16 | « direction générale » — le RDV porte le nom de l'instance |

### Professions libérales — `verticals/independent-professionals/`

| # | `/fr` (master) | `/uk` · `/be-en` · `/de-en` | `/ch-fr` | `/be-fr` | Allemand | car. | Sens de l'allemand · notes |
|---:|---|---|---|---|---|---:|---|
| 1 | Visite à domicile | Home visit | Visite à domicile | Visite à domicile | Hausbesuch | 10 | « visite à domicile » |
| 2 | Tournée de soins | Nursing round | Tournée de soins | Tournée de soins | Pflegetour | 10 | « tournée de soins » |
| 3 | Prise de sang | Blood test | Prise de sang | Prise de sang | Blutabnahme | 11 | « prise de sang » |
| 4 | Pansement | Dressing change | Pansement | Pansement | Verbandswechsel | 15 | « changement de pansement » |
| 5 | Kiné à domicile | Physio home visit | **Physio à domicile** | Kiné à domicile | Physiotherapie | 14 | « kinésithérapie ». CH : on dit **physio**, jamais kiné |
| 6 | Visite EHPAD | Care home visit | **Visite EMS** | **Maison de repos** | Pflegeheim | 10 | « maison de retraite ». CH : **EMS** (établissement médico-social). BE : **maison de repos** |
| 7 | Consultation | Consultation | Consultation | Consultation | Sprechstunde | 12 | « consultation » |
| 8 | Garde | On-call | Garde | Garde | Bereitschaft | 12 | « astreinte, garde » |
| 9 | Audience tribunal | Court hearing | Audience tribunal | Audience tribunal | Gerichtstermin | 14 | « audience au tribunal » |
| 10 | RDV client | Client meeting | RDV client | RDV client | Mandantentermin | 15 | « RDV client » — le mot des avocats et fiscalistes |
| 11 | Expertise | Expert assessment | Expertise | Expertise | Gutachten | 9 | « expertise » |
| 12 | Visite de chantier | Site inspection | Visite de chantier | Visite de chantier | Baustellentermin | 16 | « RDV chantier » (architecte) |
| 13 | Réunion de cabinet | Practice meeting | **Séance de cabinet** | Réunion de cabinet | Teambesprechung | 15 | « réunion d'équipe » |
| 14 | Formation continue | CPD course | Formation continue | Formation continue | Fortbildung | 11 | « formation continue ». UK : *CPD* ; be-en/de-en : `Training course` |
| 15 | Bilan client | Year-end review | **Bouclement** | Bilan client | Jahresabschluss | 15 | « clôture annuelle ». CH : la clôture des comptes se dit **bouclement** |

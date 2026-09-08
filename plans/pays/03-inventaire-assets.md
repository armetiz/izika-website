# Inventaire et audit des assets images

**Date : 2026-09-07.** État du dépôt au moment de l'inventaire : refacto `en → uk`
et ajout du marché `ch-fr` **en cours dans l'arbre de travail**. Les chemins et
les compteurs de références ci-dessous sont pris sur cet arbre ; l'inventaire des
fichiers de `public/` n'est pas affecté par ce refacto.

**Passe de rationalisation appliquée le 2026-09-07** — 6 fichiers supprimés,
2 références repointées, ≈ 1,0 Mo récupéré. Détail en § 5. Les tableaux
ci-dessous décrivent l'état **après** cette passe : 102 fichiers, ≈ 7,3 Mo.

Ce document répond à une question : **la localisation des visuels peut-elle
entrer dans la procédure de déploiement d'un pays, ou reste-t-elle un travail de
designer ?** Il sert de base à l'audit de rationalisation et de nommage, et il
est la référence que la rubrique « Design / Assets » des fiches pays doit
pointer, en remplacement des trois cases à cocher qu'elle contient aujourd'hui.

Il complète `01-procedure-ouverture-marche.md`, qui classe les assets en
**couche 3** — l'angle mort : ni typage, ni garde-fou de build. Rien ne casse
quand on oublie un visuel ; le site part en production avec le visuel français.

---

## 1. Chiffres d'entrée

| | |
|---|---|
| Fichiers image | **102** (108 avant la passe de rationalisation) |
| Poids total | **≈ 7,3 Mo** (8,3 Mo avant) |
| Répartition | 56 PNG · 30 JPG · 15 SVG · 1 ICO |
| WebP / AVIF / GIF | **0** |
| Fichiers dans `src/` | **0** — il n'existe pas de `src/assets/` |
| Passant par `astro:assets` | **0** — aucun `import`, aucun `<Image>`, aucun `<Picture>` |
| Assets localisés aujourd'hui | **0** — aucun suffixe de marché, aucun dossier par marché |
| Orphelins restants | **0** |
| Références cassées | **0** |

**La conséquence à retenir avant tout le reste.** Comme rien ne passe par
`astro:assets`, un chemin d'image cassé **ne fait pas échouer le build** : il
produit un 404 silencieux à l'exécution. C'est supportable avec un seul jeu
d'assets. Ça devient le risque numéro un dès qu'on multiplie les variantes par
marché — et c'est exactement le mode de défaillance que la procédure d'ouverture
cherche à éliminer partout ailleurs.

**Méthode.** Poids et dimensions relevés sur disque. Compteurs de références
obtenus par extraction des chemins `/assets/`, `/content/`, `/wp-content/` dans
`src/` et `public/content/`. **44 des 108 fichiers alors présents ont été
ouverts et regardés**
pour renseigner la colonne « Dépendance » : elle est constatée, pas déduite. Les
quelques lignes déduites d'un motif sont marquées « (déduit) ». Les 15 SVG ont
été vérifiés au grep.

---

## 2. Verdict de faisabilité

**Réponse courte : partiellement automatisable, et le SVG n'est pas le bon
levier.**

| Famille | Volume | Automatisable ? | Qui fait le travail |
|---|---:|---|---|
| **A — Redessins d'app à plat** | 41 fichiers, 4,1 Mo | **Oui**, en composants | Dev (les 8 clés), designer ou SVG pour la traîne |
| **B — Composites photo** | 1 fichier, 155 Ko | Non | **Designer** |
| **C — Illustrations au trait manuscrit** | 2 fichiers, 0,3 Mo | Non | **Designer** |
| **D — Pictogrammes et logos** | 29 fichiers, 0,2 Mo | Sans objet | **Personne** — réutilisables tels quels |
| **E — Photos et personas** | 6 fichiers, 1,1 Mo | Sans objet | Personne (arbitrage culturel seulement) |
| **F — OG / marketing** | 1 fichier, 37 Ko | **Oui**, générable à la build | Dev |
| **G — Legacy WordPress** | 16 fichiers, 1,2 Mo | Hors périmètre | Personne |
| **H — Contenu réglementaire** | 3 fichiers, 145 Ko | Non — contenu pays | Rédaction + designer |
| **Favicons** | 3 fichiers, 98 Ko | Sans objet | Personne |

### Pourquoi pas le SVG à texte vivant

Les 15 SVG du dépôt **ne contiennent aucun texte** : 0 occurrence de `<text>`,
0 de `<tspan>`, uniquement des `<path>`, `<circle>`, `<g>`. Ce sont des
pictogrammes de menu et des logos partenaires, déjà réutilisables en toute
langue. **Le SVG existant n'est donc pas le problème.**

Convertir la famille A en SVG à texte vivant serait techniquement possible — ce
sont des aplats, pas des photos — mais trois obstacles rendent cette voie
insuffisante pour les visuels denses :

1. **Pas de retour à la ligne.** SVG `<text>` ne sait pas envelopper le texte.
   L'allemand est 20 à 30 % plus long que le français : le texte déborde du cadre
   ou dépasse la zone, en silence, sans casser aucun build. On remplace un
   problème invisible par un autre.
2. **La police est à embarquer.** Ces visuels n'utilisent pas Open Sans, la seule
   famille du site (`src/styles/global.css:5-8`). Il faut identifier et fournir
   la police de l'app, sans quoi le SVG se rendra dans une substitution.
3. **Le texte n'est pas la seule chose à changer.** Ces visuels portent du droit
   fiscal français.

Ce troisième point est le décisif. Extraits relevés dans les fichiers :

- `screens/rapport-comptable.png` : « BARÈME · d × 0.407 », « citroën BERLINGO
  **8CV** », « PÉRIODE FISCALE », « 1 682 € »
- `solutions/*/rapport-print-ombre.png` : « VOLVO V60 D3 (**6cv**) - d x 0.386 »,
  « 18 400 km / 7 198 € »
- `header-screen-ipad.jpg` : « RENAULT CLIO (**6cv**) - d x 0.386 », « 21 890 km
  / 5 876 € »
- `team/icon_approval.png` : « 200**km** - 56**€** », « APPROUVER »
- `icon_cal-to-rdv.png` : « 1 250 **km** » — l'asset le plus utilisé du site

Quatre axes de variation, pas un seul : **langue**, **devise**, **unité de
distance**, **forme du barème**. Traduire les libellés d'un `<text>` laisserait
une colonne « puissance fiscale » dans un visuel belge — le contre-sens déjà
signalé dans `be-belgique.md` — et des kilomètres dans un visuel britannique.

### Constat qui vaut d'être lu maintenant

`src/data/mileage-uk.ts` définit le barème HMRC en **miles** et en **pence**
(`maxMiles`, « £ per mile », 45p). `src/i18n/markets.ts` donne `currency: 'CHF'`
au marché `ch-fr`.

Or les données du marché `uk` référencent **~90 images**, toutes en km et en
euros — `home-page.uk.ts` (12 réfs), `solo-page.uk.ts` (13), `team-page.uk.ts`
(13), `team-landing.uk.ts` (11), `features-page.uk.ts` (7),
`feature-cards.uk.ts` (4), et 10 réfs dans chacun des 5 YAML
`src/content/solutions/uk/`. Le badge « CERTIFIÉ CONFORME », en français, est
servi sur `uk` **et** sur `ch-fr`.

**Le site britannique montre donc aujourd'hui des rapports en kilomètres et en
euros, sous un barème annoncé en miles et en livres.** Ce n'est pas un défaut
esthétique, c'est une promesse produit fausse. C'est la démonstration la plus
directe de ce que « couche 3 » veut dire.

*Constat annexe, à vérifier car l'arbre est en cours de refacto :
`src/i18n/markets.ts:123` donne `currency: 'EUR'` au marché `uk`.*

### La règle de décision

> Aplat redessiné + texte dense → **composant**.
> Aplat redessiné + texte rare → **SVG** si la source vectorielle existe, sinon designer.
> Photo, perspective ou trait manuscrit → **designer**.
> Sans texte ni marqueur pays → **rien à faire**.

---

## 3. Inventaire

**Légende « Dépendance »** — ce qui doit changer d'un marché à l'autre :
`L` langue · `€` devise · `km` unité de distance · `F` fiscal (barème,
puissance fiscale, période) · `P` marqueur pays (drapeau, emblème) · `—` rien.

**Légende « Voie »** : `Composant` · `SVG` · `Designer` · `Neutre` ·
`Retirer` · `Hors périm.`

La colonne **« Src vecto ? »** est laissée vide : **c'est celle que le designer
doit remplir.** Elle tranche, pour chaque ligne, entre ré-export SVG et
redessin.

### Famille A — redessins d'app à plat (41 fichiers, ≈ 4,1 Mo)

Aplats de couleur, texte typographié, aucune photo, aucun dégradé. Tous
vectorisables, tous reconstructibles en HTML/CSS.

#### A1 — Écran « Paramètres » : 8 fichiers pour un seul écran

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/landing-pages/screens/parametres.png` | 136 | 1642×1202 | 2 | L · F | Composant | | `screen-settings` |
| `assets/landing-pages/screens/parametres-adresses.png` | 106 | 1644×1204 | 2 | L (déduit) | Retirer | | variante masquée |
| `assets/landing-pages/screens/parametres-vehicules.png` | 84 | 1642×1200 | 2 | L · F | Retirer | | variante masquée |
| `assets/landing-pages/screens/parametres_mode-deplacement.png` | 87 | 1640×1208 | 2 | L | Retirer | | variante masquée |
| `assets/landing-pages/how-it-works-parameters.png` | 89 | 2000×1454 | 2 | L · F | Composant | | `step-settings` |
| `assets/landing-pages/header-screen-ipad-horizontal.jpg` | 92 | 1618×1010 | 2 | L · F | Retirer | | doublon de `how-it-works-parameters` |
| `assets/img/fonctionnalites/fonctionnalites-adresses.jpg` | 77 | 960×640 | 2 | L | Retirer | | recadrage de `parametres` |
| `assets/img/fonctionnalites/fonctionnalites-vehicules.jpg` | 44 | 960×640 | 3 | L · F | Retirer | | recadrage de `parametres` |
| `assets/img/fonctionnalites/fonctionnalites-mode-deplacement.jpg` | 45 | 960×640 | 2 | L (déduit) | Retirer | | recadrage de `parametres` |

**Constat.** Neuf fichiers, ≈ 760 Ko, montrent **le même écran**. Les trois
`screens/parametres-*` sont `parametres.png` avec des sections masquées en
barres grises ; les trois `fonctionnalites-*.jpg` en sont des recadrages ; et
`header-screen-ipad-horizontal.jpg` est le même contenu que
`how-it-works-parameters.png` (mêmes données : « renault TWINGO 5CV », « citroën
BERLINGO 8CV », « MODE DE DÉPLACEMENT PRÉFÉRÉ »). Un composant unique avec un
paramètre de mise en évidence remplace les neuf.

*Note de cohérence : `parametres.png` affiche « BERLINGO 8CV / ZOÉ 4CV » et
« MODE DE DÉPLACEMENT PAR DÉFAUT », tandis que `how-it-works-parameters.png`
affiche « TWINGO 5CV / BERLINGO 8CV » et « MODE DE DÉPLACEMENT PRÉFÉRÉ ». Deux
jeux de données et deux libellés pour le même écran : la dérive que la
factorisation supprime.*

#### A2 — Rapports et exports

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/landing-pages/screens/rapport-comptable.png` | 69 | 1078×790 | 2 | L · € · km · F | **Composant (clé 1)** | | `report-accounting` |
| `assets/landing-pages/how-it-works-mileage-allowances-export.png` | 137 | 2000×1764 | 5 | L · € · km · F | **Composant (clé 6)** | | `step-export` |
| `assets/landing-pages/header-screen-ipad.jpg` | 38 | 533×711 | 1 | L · € · km · F | Composant | | `report-mileage` — **pas un mockup device malgré son nom** |
| `assets/landing-pages/screens/provisions.png` | 87 | 1076×792 | 2 | L · € · km | **Composant (clé 7)** | | `screen-provisions` |
| `assets/landing-pages/how-it-works-mensual-provisions.png` | 71 | 2000×1299 | 2 | L · € · km | Composant | | `step-provisions` |

*Anomalie de contenu relevée dans `how-it-works-mensual-provisions.png` : deux
lignes consécutives sont libellées « juin » (589 km puis 39 km), là où
`screens/provisions.png` affiche correctement « mai » puis « juin ». Erreur
visible en production, invisible pour tout outil — un composant la rendrait
impossible.*

#### A3 — Agenda et rendez-vous

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/landing-pages/how-it-works-calendar-import.png` | 86 | 2000×1334 | 2 | L · km | Composant | | `step-calendar-import` |
| `assets/landing-pages/header-screen-macbook.jpg` | 119 | 1618×1010 | 1 | L · km | Retirer | | doublon de `how-it-works-calendar-import` |
| `assets/landing-pages/header-screen-iphone-x.jpg` | 35 | 407×867 | 1 | L · € · km | Composant | | `screen-mobile-trips` |
| `assets/landing-pages/team/illu_rdv-etoiles.png` | 64 | 920×719 | 6 | L · km | Composant | | `screen-next-stop` |
| `assets/landing-pages/team/screen-next-rdv.jpg` | 184 | 1618×1010 | 4 | L · km | Retirer | | même scène que `illu_rdv-etoiles` |
| `assets/landing-pages/team/screen-next-rdv2.jpg` | 198 | 1618×1210 | 2 | L · km | Retirer | | même scène, autre date |
| `assets/landing-pages/team/illu_justificatifs.png` | 46 | 920×719 | 6 | L · km | Composant | | `screen-receipts` |
| `assets/landing-pages/team/illu_dossiers.png` | 49 | 920×719 | 4 | L · km | Composant | | `screen-folders` |
| `assets/landing-pages/team/illu_voir-itineraire.png` | 44 | 920×719 | 4 | L · km | Composant | | `screen-route` |

**Constat.** `illu_rdv-etoiles.png`, `screen-next-rdv.jpg` et
`screen-next-rdv2.jpg` sont la même scène (« RDV suivant / Maison / Bureau »)
à trois cadrages et deux dates. 446 Ko pour un visuel.

**Constat de format.** `header-screen-*.jpg` et `team/screen-*.jpg` — 7 fichiers,
≈ 800 Ko — sont des **aplats enregistrés en JPEG**. Le JPEG sur de l'aplat
produit des artefacts autour du texte et pèse plus lourd qu'un PNG. Erreur de
format, indépendamment de l'i18n.

#### A4 — Validation d'équipe

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/landing-pages/team/illu_liste-demandes.png` | 69 | 920×719 | 5 | L · € · km | **Composant (clé 2)** | | `screen-claims-list` |
| `assets/landing-pages/team/illu_approve.png` | 42 | 920×719 | 4 | L · € · km | Composant | | `screen-claim-approve` |
| `assets/landing-pages/team/screen-approve-demand.jpg` | 135 | 1618×1010 | 2 | L · € · km | Retirer | | même scène que `illu_approve` |

#### A5 — Solutions : 4 gabarits × 5 verticales (15 fichiers, ≈ 1,6 Mo)

Dimensions strictement identiques d'une verticale à l'autre : ce sont bien des
gabarits, pas des visuels distincts. Seules les données changent (noms de
clients, intitulés de rendez-vous, villes).

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/solutions/agent-general-assurances/rdv-template.png` | 171 | 1397×1037 | 2 | L · € · km | **Composant (clé 3)** | | `vertical/<id>/agenda` |
| `assets/solutions/agents-immobilier-mandataires-immobilier/rdv-template.png` | 126 | 1210×791 | 2 | L · € · km | idem | | |
| `assets/solutions/artisans-btp/rdv-template.png` | 132 | 1210×791 | 2 | L · € · km | idem | | |
| `assets/solutions/consultants/rdv-template.png` | 131 | 1210×791 | 2 | L · € · km | idem | | |
| `assets/solutions/professions-liberales/rdv-template.png` | 130 | 1210×791 | 2 | L · € · km | idem | | |
| `assets/solutions/agent-general-assurances/rapport-print-ombre.png` | 190 | 1452×1458 | 2 | L · € · km · F | **Composant (clé 4)** | | `vertical/<id>/report` |
| `assets/solutions/artisans-btp/rapport-print-ombre.png` | 169 | 1452×1458 | 2 | L · € · km · F | idem | | |
| `assets/solutions/consultants/rapport-print-ombre.png` | 165 | 1452×1458 | 2 | L · € · km · F | idem | | |
| `assets/solutions/professions-liberales/rapport-print-ombre.png` | 137 | 1452×1458 | 2 | L · € · km · F | idem | | |
| `assets/solutions/agent-general-assurances/calendar-to-ik.png` | 105 | 1229×1000 | 2 | L · km | **Composant (clé 5)** | | `vertical/<id>/calendar-to-mileage` |
| `assets/solutions/agents-immobilier-mandataires-immobilier/calendar-to-ik.png` | 155 | 1229×1000 | 2 | L · km | idem | | |
| `assets/solutions/artisans-btp/calendar-to-ik.png` | 105 | 1229×1000 | 2 | L · km | idem | | |
| `assets/solutions/consultants/calendar-to-ik.png` | 97 | 1229×1000 | 2 | L · km | idem | | |
| `assets/solutions/professions-liberales/calendar-to-ik.png` | 103 | 1229×1000 | 2 | L · km | idem | | |
| `assets/solutions/agent-general-assurances/rdv-suivant.png` | 87 | 1000×600 | 2 | L · km | Composant | | `vertical/<id>/next-stop` |

**Constat.** Le gabarit `rdv-suivant` n'était utilisé que par une verticale sur
cinq ; trois fichiers sur quatre étaient morts, et la cinquième verticale
(`agents-immobilier-mandataires-immobilier`) n'a jamais eu le sien. Ce n'était
pas une asymétrie, c'était un gabarit abandonné à mi-chemin. **Les 3 fichiers
morts ont été supprimés** ; seul `agent-general-assurances/rdv-suivant.png`
subsiste, et il reste le seul usage du gabarit.

**Constat, découvert à la comparaison RMSE.**
`agents-immobilier-mandataires-immobilier/rapport-print-ombre.png` (425 Ko)
n'était pas un rapport propre à la verticale : c'était une copie ré-encodée du
rapport générique `landing-pages/how-it-works-mileage-allowances-export.png`
(RMSE 0,0011), trois fois plus lourde pour les mêmes pixels. Les quatre autres
verticales ont bien leur rapport spécifique (RMSE 0,55 entre elles).
**Les 2 références YAML ont été repointées vers le rapport partagé et la copie
supprimée.** Cette verticale n'a donc, à ce jour, pas de rapport dédié — c'est
désormais visible dans le contenu au lieu d'être masqué par un doublon.

### Famille B — composite photo (1 fichier, 155 Ko)

Photographie réelle avec l'écran de l'app incrusté en perspective. Ni SVG ni
HTML ne reproduisent ça.

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/solutions/laptop-screen-izika.jpg` | 155 | 2000×1333 | 10 | L · € · km | **Designer** | | `photo-laptop-app` |

**Constat, traité.** `assets/img/mockup-liste-rdv.jpg` (290 Ko) était un
ré-encodage de cette même photographie — mêmes dimensions, RMSE 0,0040. Il
n'était utilisé qu'une fois, en `background-image` inline dans
`HomePage.astro:89`. **Cette déclaration pointe désormais sur
`laptop-screen-izika.jpg` et le doublon a été supprimé.** Un seul fichier à
refaire par marché au lieu de deux.

**Piste d'automatisation, à ne pas confondre avec du travail de designer.** Si
la partie écran devient un composant (famille A), on peut la rendre puis la
recomposer dans la photo par transformation perspective, les quatre coins étant
calibrés une seule fois. C'est du sur-mesure, mais c'est reproductible par
marché. À arbitrer selon le nombre de marchés visés.

### Famille C — illustrations au trait à texte manuscrit (2 fichiers, ≈ 265 Ko)

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/solutions/visuel-agenda-professionnel.png` | 133 | 1024×1024 | 8 | L | **Designer** | | `sketch-calendar` |
| `assets/img/illustrations/expert-comptable-large.png` | 132 | 1203×1349 | 2 | — | Neutre | | `sketch-accountant` |

**Constat.** `visuel-agenda-professionnel.png` est un croquis à main levée dont
le texte est **écrit à la main** (« VISITE BUREAU R.KIPLING », « HOME STAGING
CHEZ V.HUGO », « RDV USINE B.FRANKLIN »). Aucune substitution de chaîne, ni en
SVG ni en HTML, ne reproduira cette écriture. C'est le seul visuel du dépôt qui
soit **irréductiblement** un travail de designer. `expert-comptable-large.png`,
du même trait, ne porte qu'un « iK » sur une feuille : réutilisable tel quel.

### Famille D — pictogrammes et logos (29 fichiers, ≈ 220 Ko)

**Attention : les icônes 500×500 ne sont pas toutes neutres.** Quatre d'entre
elles portent du texte français, de la devise ou de l'unité de distance.

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/landing-pages/icon_report-conformity.png` | 16 | 500×500 | **24** | L · € · km · P | **Composant ou SVG** | | `icon-compliance` |
| `assets/landing-pages/icon_cal-to-rdv.png` | 8 | 500×500 | **25** | L · km | **Composant ou SVG** | | `icon-calendar-to-trip` |
| `assets/landing-pages/icon_km-auto.png` | 10 | 500×500 | 9 | L · km | Composant ou SVG | | `icon-auto-distance` |
| `assets/landing-pages/team/icon_approval.png` | 8 | 500×500 | 6 | L · € · km | Composant ou SVG | | `icon-approval` |
| `assets/landing-pages/icon-provisions.png` | 19 | 500×500 | 2 | L · € | Composant ou SVG | | `icon-provisions` |
| `assets/landing-pages/team/icon_security.png` | 9 | 500×500 | 9 | **P** | **Arbitrage** | | `icon-security` |
| `assets/landing-pages/team/cocorico.png` | 18 | 122×156 | 4 | **P** | **Arbitrage** | | `emblem-made-in-france` |
| `assets/landing-pages/icon_bareme-personnalise.png` | 21 | 500×500 | 5 | — | Neutre | | `icon-custom-rate` |
| `assets/landing-pages/icon_team.png` | 12 | 500×500 | 4 | — | Neutre | | `icon-team` |
| `assets/landing-pages/team/icon_teams-and-folders.png` | 8 | 500×500 | 6 | — | Neutre | | `icon-teams-folders` |
| `assets/landing-pages/illu-tournee-etoile.png` | 24 | 500×500 | 8 | — | Neutre | | `icon-trip-modes` |
| `assets/img/logo/izika-logo.png` | 29 | 318×112 | 4 | — | Neutre | | `logo-izika` |
| `assets/landing-pages/dolibarr-icon.png` | 2 | 256×256 | 2 | — | Neutre | | inchangé |
| `assets/landing-pages/office365-icon.png` | 6 | 864×1024 | 2 | — | Neutre | | inchangé |
| `assets/landing-pages/google-icon.svg` | 1 | vb 48×48 | 2 | — | Neutre | s.o. | inchangé |
| `assets/landing-pages/icloud-icon.svg` | 1 | vb 80×52 | 2 | — | Neutre | s.o. | inchangé |
| `assets/landing-pages/outlook-icon.svg` | 1 | vb 103×104 | 2 | — | Neutre | s.o. | inchangé |
| `assets/landing-pages/ics-icon.svg` | 2 | vb 551×551 | 2 | — | Neutre | s.o. | inchangé |
| `assets/svg/illustrations/calendar.svg` | 7 | vb 128×126 | 1 | — | Neutre | s.o. | inchangé |
| `assets/solutions/menu/solo/*.svg` (5 fichiers) | 8 | vb ~32×31 | 1 ch. | — | Neutre | s.o. | inchangé |
| `assets/solutions/menu/team/*.svg` (5 fichiers) | 9 | vb ~33×32 | 1 ch. | — | Neutre | s.o. | inchangé |

**Les deux plus utilisés du site sont langue-dépendants.**
`icon_cal-to-rdv.png` (25 réfs) affiche « RDV : » et « 1 250 km ».
`icon_report-conformity.png` (24 réfs) affiche « CERTIFIÉ CONFORME » en texte
**courbe sur un cercle**, plus « 1 250 km » et « 501 € ». Ces deux-là sont le
meilleur rapport effort/portée du dossier : deux fichiers, 49 points d'usage,
servis sur tous les marchés.

*Le badge « CERTIFIÉ CONFORME » est le symptôme parfait de la couche 3 : son
`alt` est déjà traduit (`solutionsMenu.blurbImageAlt`), mais son image est en
dur en français à `SolutionsMenu.astro:146`. Le texte accessible est localisé, le
texte visible ne l'est pas.*

**Deux arbitrages, pas des traductions.** `team/icon_security.png` est un cadenas
aux couleurs du **drapeau français** ; `team/cocorico.png` est un **coq
tricolore**. Aucun texte, mais un signal pays fort, servi aujourd'hui sur `uk` et
`ch-fr`. Soit c'est un argument assumé (« données hébergées en France ») et il
reste, soit c'en est un contresens hors de France et il faut une variante. C'est
une décision marketing, à acter en phase 1 d'une ouverture — pas une tâche de
production.

### Famille E — photos et personas (6 fichiers, ≈ 1,1 Mo) et favicons (3 fichiers)

Langue-agnostiques. Aucune action, sauf arbitrage de pertinence culturelle.

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/solutions/testimonial-avatar.png` | 130 | **4000×4000** | 6 | — | Neutre — **redimensionner** | s.o. | `avatar-testimonial` |
| `assets/solutions/persona.jpg` | 53 | 600×600 | 6 | — | Neutre | s.o. | `persona-default` |
| `assets/solutions/agent-general-assurances/customer-case-avatar.jpg` | 366 | 2000×1333 | 2 | — | Neutre — alléger | s.o. | `vertical/<id>/customer` |
| `assets/solutions/professions-liberales/customer-case-avatar.jpg` | 264 | 1920×1280 | 2 | — | Neutre — alléger | s.o. | idem |
| `assets/solutions/agents-immobilier-mandataires-immobilier/agent-immobilier-cedric.jpg` | 285 | 2000×1250 | 2 | — | Neutre — alléger | s.o. | idem |
| `assets/solutions/agents-immobilier-mandataires-immobilier/agente-immobiliere.jpg` | 31 | 400×400 | 2 | — | Neutre | s.o. | `vertical/<id>/persona` |
| `apple-touch-icon.png` · `favicon-32.png` · `favicon.ico` | 98 | 180² · 32² · 144² | 3 | — | Neutre | s.o. | inchangé |

**Constat.** `testimonial-avatar.png` fait **4000×4000 pixels** pour un avatar
affiché à quelques dizaines de pixels. Trois photos dépassent 260 Ko. Ces
quatre lignes représentent à elles seules ~1 Mo de gaspillage, sans rapport avec
l'i18n mais dans le même audit.

*Note : les avatars « customer case » sont des personnes réelles ou des modèles
photographiques ; leur pertinence par marché est un arbitrage marketing, pas une
tâche de localisation.*

### Famille F — OG / marketing (1 fichier, 37 Ko)

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie | Src vecto ? | Nommage cible |
|---|---:|---|---:|---|---|---|---|
| `assets/img/social/opengraph-ban.jpg` | 37 | 1200×630 | 1 | L | **Composant (clé 8)** | | `og-default.<market>` |

Baseline marketing entièrement en français cuite dans l'image : « indemnités
kilométriques automatiques », « Solution globale de gestion des indemnités
kilométriques pour indépendants et entreprises », « Voir la vidéo », « Créez un
compte gratuitement ». Référencée une seule fois — mais depuis
`src/config/site.ts:15`, une constante **globale**, donc servie sur **toutes** les
pages de **tous** les marchés.

Une bannière OG est une page 1200×630 : c'est le meilleur candidat du dossier à
la génération à la build, texte pris dans les dictionnaires.

### Famille G — legacy WordPress (16 fichiers, ≈ 1,2 Mo) — hors périmètre

Captures d'interfaces tierces (Google Agenda, Dolibarr, iCloud) en français,
illustrant des articles français. Les articles sont du **contenu pays**, pas des
traductions : ces images n'ont pas vocation à être localisées. Chemins conservés
pour ne pas casser les URL historiques.

| Chemin | Ko | Dimensions | Réfs | Voie |
|---|---:|---|---:|---|
| `wp-content/uploads/2017/02/IK-voitures-2017.jpg` | 54 | 806×209 | 1 | Hors périm. |
| `wp-content/uploads/2017/03/ajouter-un-agenda-dans-Google.png` | 29 | 285×466 | 1 | Hors périm. |
| `wp-content/uploads/2017/03/icloud-partage-calendrier.jpg` | 28 | 495×289 | 1 | Hors périm. |
| `wp-content/uploads/2017/03/importer-un-agenda-ICS-dans-Google-agenda.jpg` | 28 | 847×303 | 1 | Hors périm. |
| `wp-content/uploads/2017/08/onboarding-izika-0-une-ligne-de-RDV-dans-mes-IK.jpg` | 19 | 867×82 | 1 | Hors périm. |
| `wp-content/uploads/2017/08/onboarding-izika-1-connexion.jpg` | 22 | 527×485 | 1 | Hors périm. |
| `wp-content/uploads/2017/08/onboarding-izika-2-google-account-selector2.jpg` | 32 | 656×726 | 1 | Hors périm. |
| `wp-content/uploads/2017/08/onboarding-izika-3-adresses-favorites.jpg` | 33 | 600×235 | 1 | Hors périm. |
| `wp-content/uploads/2017/08/onboarding-izika-5-agendas-Google.jpg` | 36 | 600×235 | 1 | Hors périm. |
| `wp-content/uploads/2018/09/Dolibarr-agenda-7-1024x473.png` | 165 | 1024×473 | 1 | Hors périm. |
| `wp-content/uploads/2018/09/Publication-agenda-Dolibarr-ICS-1-1024x458.png` | 128 | 1024×458 | 1 | Hors périm. |
| `wp-content/uploads/2018/09/Publication-agenda-Dolibarr-ICS-3-1024x474.png` | 127 | 1024×474 | 1 | Hors périm. |
| `wp-content/uploads/2018/09/Publication-agenda-Dolibarr-ICS-4-1024x434.png` | 79 | 1024×434 | 1 | Hors périm. |
| `wp-content/uploads/2019/01/Voiture-electrique.jpg` | 53 | 960×507 | 2 | Hors périm. |
| `wp-content/uploads/2019/03/GRC-CONTACT-CRM-lien-ICS-pour-IZIKA-1024x585.png` | 257 | 1024×585 | 1 | Hors périm. |
| `wp-content/uploads/2019/10/voiture-calculer-ik-1-1024x683.jpg` | 97 | 1024×683 | 1 | Hors périm. |

### Famille H — contenu réglementaire (3 fichiers, ≈ 145 Ko)

| Chemin | Ko | Dimensions | Réfs | Dépendance | Voie |
|---|---:|---|---:|---|---|
| `content/pages/bareme-indemnite-kilometrique.jpg` | 22 | 1200×600 | 1 | F | Rédaction + designer |
| `content/pages/bareme-indemnites-kilometriques-2020/bareme-indemnites-kilometriques.jpg` | 40 | 1200×600 | **0** | F | **Orphelin à confirmer** |
| `content/pages/note-de-frais-modele-2020-comptabilite/modele-note-de-frais.jpg` | 85 | 1024×683 | **0** | F | **Orphelin à confirmer** |

Barèmes fiscaux français. Ce n'est pas de la traduction, c'est du contenu
national : chaque pays a le sien, ou n'en a pas. Les deux orphelins sont datés
2020 et pourraient répondre à des URL héritées — **à confirmer avant
suppression**.

---

## 4. Les 8 visuels clés retenus pour la voie composant

Sélection par densité de texte × fréquence d'usage × dépendance fiscale. Ces
8 composants couvrent **20 fichiers et ≈ 2,4 Mo**, parce que les gabarits
`solutions/` sont dupliqués cinq fois.

| # | Composant | Fichiers couverts | Pourquoi celui-là |
|---|---|---:|---|
| 1 | Export comptable | 1 | Cœur de la promesse. Barème, puissance fiscale, devise : l'exemple type de ce qu'un SVG traduit raterait |
| 2 | Liste des demandes | 1 | 5 réfs ; colonnes, statuts, montants — le visuel « équipe » le plus dense |
| 3 | Agenda / RDV (`rdv-template`) | 5 | 1 composant, 5 verticales, données par verticale |
| 4 | Rapport imprimé (`rapport-print-ombre`) | 4 | idem ; le plus chargé en fiscal. La 5ᵉ verticale partage désormais le rapport générique |
| 5 | Agenda → IK (`calendar-to-ik`) | 5 | idem |
| 6 | Export d'IK (`how-it-works-mileage-allowances-export`) | 1 | 5 réfs ; rapport complet, adresses françaises |
| 7 | Provisions mensuelles | 2 | Factorise deux fichiers et corrige l'anomalie « juin/juin » |
| 8 | Bannière OG | 1 | Générable à la build ; débloque la dette OG de tous les marchés |

**Rapport effort/portée à considérer en priorité.** Hors de cette liste,
`icon_cal-to-rdv.png` et `icon_report-conformity.png` totalisent **49 points
d'usage** à eux deux, pour deux fichiers de moins de 25 Ko. Si la source
vectorielle existe, ce sont les deux premiers à traiter, quelle que soit la voie
retenue.

**Dépendances à lever avant de commencer.**

- [ ] **Identifier et fournir la police de l'app.** Les visuels n'utilisent pas
      Open Sans. Sans elle, aucun composant ni SVG ne sera raccord.
- [ ] Brancher le barème sur `src/data/bareme-ik.ts` (FR),
      `src/data/mileage-uk.ts` (UK, miles/£), `src/data/mileage-ch.ts` (CHF).
- [ ] Décider du sort des marqueurs pays (`icon_security`, `cocorico`).

---

## 5. Rationalisation — constats d'audit

Chaque point est vérifié sur l'arbre courant.

### Passe appliquée le 2026-09-07 — 6 fichiers supprimés, ≈ 1,0 Mo

**Orphelins supprimés — 4 fichiers, 304 Ko, aucune référence dans le dépôt**

| Fichier | Ko |
|---|---:|
| `assets/solutions/artisans-btp/rdv-suivant.png` | 78 |
| `assets/solutions/consultants/rdv-suivant.png` | 79 |
| `assets/solutions/professions-liberales/rdv-suivant.png` | 83 |
| `assets/solutions/customer-case-avatar.jpg` | 64 |

**Doublons stricts résolus — 2 fichiers, 715 Ko**

| Supprimé | Ko | Remplacé par | RMSE | Référence repointée |
|---|---:|---|---:|---|
| `assets/img/mockup-liste-rdv.jpg` | 290 | `assets/solutions/laptop-screen-izika.jpg` | 0,0040 | `src/components/HomePage.astro:89` |
| `assets/solutions/agents-immobilier-mandataires-immobilier/rapport-print-ombre.png` | 425 | `assets/landing-pages/how-it-works-mileage-allowances-export.png` | 0,0011 | `src/content/solutions/fr/agents-immobilier-mandataires-immobilier.yaml:61`, `src/content/solutions/uk/real-estate-agents.yaml:61` |

**Vérifications après la passe** : build `astro build` vert (93 pages) ;
0 référence cassée ; **0 orphelin restant** ; les 99 chemins d'image émis dans
`dist/` existent tous. 108 → 102 fichiers, 8 390 → 7 372 Ko sous
`public/assets` + `public/content` + `public/wp-content`.

**Correction de méthode.** Une première passe avait annoncé 6 orphelins en
comptant les deux images de `content/pages/`. C'était faux : elles sont
référencées depuis le frontmatter d'articles avec un chemin **sans slash
initial** (`src/content/articles/fr/bareme-indemnites-kilometriques-2020.md:9`,
`note-de-frais-modele-comptabilite.md:8`), que le motif de recherche exigeait.
Elles ont été conservées. La détection retenue ne présume plus du slash initial.

**Le second doublon n'avait pas été vu à l'œil.** Il a été trouvé en groupant
les 90 rasters par dimensions puis en comparant chaque paire du groupe en RMSE.
C'est la méthode à rejouer après toute campagne de production d'assets.

### Doublons restants — non traités, et pourquoi

Ces fichiers montrent la même scène mais **ne sont pas interchangeables** : les
collapser changerait le rendu. Ils disparaîtront par la factorisation en
composants (§ 4), pas par une suppression.

| Scène | Fichiers | Poids | Pourquoi on ne les fusionne pas |
|---|---:|---:|---|
| Écran « Paramètres » | 9 | 760 Ko | 3 variantes masquées + 3 recadrages, chacun porte une carte de fonctionnalité distincte de `features-page` |
| « RDV suivant » | 3 | 446 Ko | `screen-next-rdv.jpg` est un `desktopSrc` (1618×1010), `screen-next-rdv2.jpg` un `tabletSrc` (1618×1210) : deux ratios pour deux cadres d'appareil |
| Validation de demande | 2 | 177 Ko | `desktopSrc` 1618×1010 vs illustration 920×719, dates différentes |
| Provisions mensuelles | 2 | 158 Ko | avec et sans chrome de navigateur |
| Import d'agenda | 2 | 205 Ko | `header-screen-macbook.jpg` ne montre qu'une des deux fenêtres |
| `calendar-to-ik.png` × 5 | 5 | 565 Ko | RMSE 0,09-0,10 entre elles : même gabarit, **données différentes** par verticale |

**Gaspillage de poids**

- `solutions/testimonial-avatar.png` : **4000×4000** pour un avatar.
- 3 JPG au-dessus de 260 Ko (`agent-general-assurances/customer-case-avatar.jpg`
  à 366 Ko, `professions-liberales/customer-case-avatar.jpg` à 264 Ko,
  `agents-immobilier-mandataires-immobilier/agent-immobilier-cedric.jpg` à
  285 Ko). Surdimensionnement, pas doublon : hors du périmètre traité.
- 7 aplats enregistrés en **JPEG** au lieu de PNG (`header-screen-*`,
  `team/screen-*`) : artefacts autour du texte **et** surpoids.
- **0 WebP, 0 AVIF** sur 7,3 Mo, et rien ne passe par `astro:assets`.

**Nommage incohérent**

- Séparateurs mélangés : `icon_team.png` / `icon-provisions.png`,
  `parametres-vehicules.png` / `parametres_mode-deplacement.png`.
- Langues mélangées : `rdv-suivant` / `calendar-to-ik`, `illu_dossiers` /
  `how-it-works-parameters`.
- Préfixes non systématiques : `illu_`, `illu-`, `icon_`, `icon-`, `screen-`,
  `header-screen-`, `visuel-`.
- **Noms trompeurs** : `header-screen-ipad.jpg` n'est pas un mockup d'iPad, c'est
  un rapport d'IK ; `header-screen-ipad-horizontal.jpg` est un écran de
  paramètres. Un nom qui ment coûte plus cher qu'un nom laid.

**Dossiers à slug français référencés depuis les autres marchés**

`src/content/solutions/uk/craftsmen-construction.yaml` pointe sur
`/assets/solutions/artisans-btp/`, `independent-professionals.yaml` sur
`/assets/solutions/professions-liberales/`, `real-estate-agents.yaml` sur
`/assets/solutions/agents-immobilier-mandataires-immobilier/`, etc.

**Recommandation : déclarer le slug français comme identifiant canonique de
verticale et le documenter, plutôt que renommer.** Sans validation au build, un
renommage de masse ne produirait que des 404 silencieux, pour un gain purement
cosmétique. Si un renommage est décidé un jour, il doit venir **après** la mise
en place d'une résolution d'assets typée, pas avant.

---

## 6. Convention de nommage proposée

Proposition, non appliquée.

**Le discriminant est le marché, pas la langue.** Cohérent avec le modèle
`Market ≠ Language` de `src/i18n/markets.ts`. La Belgique francophone parlera
`fr` mais appliquera un forfait unique, pas le barème par puissance fiscale :
c'est bien `be-fr` qui change le visuel, pas `fr`. Le Royaume-Uni parle `en` mais
compte en miles.

**Suffixe de marché uniquement sur les assets marché-dépendants :**

```
report-accounting.fr.png
report-accounting.uk.png
icon-compliance.fr.svg
og-default.ch-fr.jpg
```

Les assets neutres restent **sans suffixe** — l'absence de suffixe devient le
signal « réutilisable partout », et se lit d'un `ls`.

**Fallback explicite, jamais implicite.** Une variante manquante doit être une
décision inscrite quelque part, pas un silence. Un asset marché-dépendant sans
variante pour un marché servi est une dette, et doit se voir comme telle.

**Normalisation** : `kebab-case` partout, préfixes fermés `icon-` / `illu-` /
`screen-` / `report-` / `photo-` / `logo-` / `og-`, anglais pour les noms de
fichiers (le contenu est localisé, pas le code).

---

## 7. Ce qui manque au système

Trois trous, à rapprocher de la section « Rendre la procédure auto-portante » de
`01-procedure-ouverture-marche.md` — l'objectif étant de remonter ces éléments de
la couche 3 vers la couche 1, où le compilateur les réclame.

**1. Une vingtaine de chemins codés en dur dans les composants**, sans point
d'extension par marché :

- `src/components/SolutionsMenu.astro:146` — le badge « CERTIFIÉ CONFORME », en
  français, dont le `alt` est pourtant déjà traduit.
- `src/components/LandingDeviceCollage.astro:52,59` et
  `src/components/TeamLanding.astro:56` — des captures en dur alors que les
  autres images du même composant arrivent en props. Incohérence interne.
- `src/components/HomePage.astro:89` — un mockup en `background-image` inline,
  non paramétrable sans refactor.
- `src/components/SolutionsMenu.astro:30-34,60-80` — les 10 icônes de menu (SVG
  neutres : sans conséquence i18n, mais même absence de point d'extension).

**2. `defaultOgImage` est global** — `src/config/site.ts:15`. Un seul visuel pour
tous les marchés. Le correctif structurant est déjà identifié : déplacer le champ
sur le `Market`, ce qui fait échouer la compilation tant qu'un marché n'a pas sa
bannière.

**3. La bonne nouvelle : la couche de variation existe déjà, et elle est typée.**
Les chemins d'images vivent dans `src/data/<page>.<market>.ts` et dans les YAML
`src/content/solutions/<market>/` — donc **déjà par marché**. Ils sont
simplement identiques d'un marché à l'autre, par copier-coller. Pour la grande
majorité des visuels produit, servir une variante ne demande **aucun code** : un
fichier de plus, une chaîne à changer. Le coût réel est la production du visuel,
pas la plomberie.

C'est ce qui rend la voie « composant » raisonnable : elle ne remplace pas une
architecture manquante, elle remplit une architecture qui attend déjà.

---

## 8. Reste-à-faire par équipe

### Design / Assets

- [ ] **Remplir la colonne « Src vecto ? »** de la section 3. C'est le
      prérequis : elle tranche, ligne par ligne, entre ré-export SVG et redessin.
- [ ] **Identifier et fournir la police de l'app** (ce n'est pas Open Sans).
      Bloque les voies composant *et* SVG.
- [ ] Fournir la bannière OG par marché, ou valider sa génération à la build.
- [ ] `visuel-agenda-professionnel.png` : seul visuel irréductiblement designer
      (texte manuscrit). Décider s'il est localisé ou retiré des marchés non
      francophones.
- [ ] Normaliser les exports : PNG pour les aplats, dimensions cohérentes entre
      jumeaux, avatars à taille d'affichage.

### Dev

- [ ] Remonter les ~20 chemins en dur en props ou dans les data files.
- [ ] Déplacer `defaultOgImage` de `site.ts` vers le `Market`.
- [ ] Introduire une résolution d'asset par marché, avec fallback **explicite**.
- [ ] Faire échouer le build sur un chemin d'asset inexistant — sans quoi la
      multiplication des variantes se paiera en 404 silencieux.
- [x] Retirer les orphelins et les doublons stricts — fait le 2026-09-07 (§ 5).

### Produit / App

- [ ] Confirmer l'affichage des miles et des devises non-euro dans l'app : les
      visuels ne peuvent pas montrer ce que l'app ne sait pas produire.

### Marketing

- [ ] Arbitrer les marqueurs pays (`icon_security` au drapeau français,
      `cocorico`) sur les marchés non français.
- [ ] Arbitrer la pertinence culturelle des personas par marché.
- [ ] **Nommer un propriétaire des assets par marché.**
      `02-bonnes-pratiques-i18n-saas.md` §4.7 le réclame et le note « non
      formalisé ».

---

## 9. Sources et méthode

- Inventaire relevé le **2026-09-07** sur l'arbre de travail, refacto `en → uk`
  et ajout `ch-fr` en cours.
- Poids et dimensions : `stat` et `sips` sur `public/`.
- Compteurs de références : extraction des chemins `/assets/`, `/content/`,
  `/wp-content/` dans `src/` et `public/content/`. Les favicons sont référencés
  sans ces préfixes (`src/layouts/BaseLayout.astro:59-61`,
  `src/pages/404.astro:20-21`) et n'apparaissent donc pas dans ces compteurs.
- Orphelins et références cassées : diff entre chemins référencés et fichiers
  présents, **sans présumer du slash initial** (le frontmatter d'article utilise
  des chemins relatifs).
- Doublons : les 90 rasters groupés par dimensions, puis comparaison RMSE de
  chaque paire intra-groupe (`magick compare -metric RMSE`), seuil d'alerte 0,10.
- Colonne « Dépendance » : **44 des 108 fichiers alors présents ouverts et
  regardés**. Les
  lignes déduites d'un motif sont marquées « (déduit) ».
- SVG : `grep '<text\|<tspan'` sur les 15 fichiers — 0 occurrence.
- Documents liés : `01-procedure-ouverture-marche.md` (couches de garantie,
  inventaire de la couche 3), `02-bonnes-pratiques-i18n-saas.md` (§4.6
  pseudo-localisation, §4.7 propriétaire par marché), `de-allemagne.md` et
  `be-belgique.md` (rubriques « Design / Assets »).

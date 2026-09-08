# Internationalisation d'un SaaS — ce qui marche, ce qui ne marche pas

Note de cadrage, écrite le 2026-09-07. Ce document n'est pas propre à izika :
il rassemble ce qui est établi sur l'internationalisation d'un SaaS, et le
confronte à l'état réel du produit. Il se lit avant
`01-procedure-ouverture-marche.md`, qui en est la mise en œuvre mécanique.

## 1. Quatre choses qu'on appelle « international » et qui n'ont rien à voir

La confusion entre ces quatre niveaux est la première cause d'échec, parce
qu'elle fait croire qu'un chantier est fini alors qu'un seul des quatre l'est.

| Niveau | Question à laquelle il répond | État chez izika |
|---|---|---|
| **Internationalisation** (i18n) | Le produit *peut-il* exister dans une autre langue et un autre pays ? | **Fait, et bien fait** — côté site |
| **Localisation** (l10n) | Est-il *adapté* à ce marché : devise, formats, barème, mentions ? | Partiel — `/uk` affiche des euros |
| **Transcréation** | La copy *convainc-elle* un lecteur local, ou sent-elle la traduction ? | Non commencé |
| **Ouverture de marché** | A-t-on des clients, une preuve locale, un support, une conformité ? | Non commencé |

`/uk` est l'illustration exacte du piège : l'i18n est achevée, la localisation
est à moitié faite, la transcréation et l'ouverture de marché n'ont pas
commencé — et le marché est pourtant « lancé ».

**À retenir :** un marché n'est pas ouvert quand la page existe. Il est ouvert
quand un client local peut acheter, payer, être facturé conformément et être
aidé dans une langue qu'il comprend.

## 2. Ce qu'izika fait déjà mieux que la plupart des SaaS

À dire, parce que ce sont exactement les décisions qui coûtent très cher à
rattraper et qui sont ici déjà prises.

- **Pays et langue sont découplés.** L'immense majorité des SaaS indexe tout
  sur une chaîne de locale (`fr`, `en-US`) et découvre trois ans plus tard que
  la Belgique, la Suisse et le Canada ne rentrent pas dans le modèle. Le
  refactor est alors transverse et douloureux. `Country` × `Language` →
  `Market` est le bon modèle, et il est déjà là.
- **Le contenu est originé, pas traduit.** `src/content.config.ts` pose que les
  articles sont « country-specific content, not translations ». C'est
  contre-intuitif et c'est juste : le contenu SEO traduit sous-performe
  systématiquement.
- **La partialité des routes est un feature flag.** Un lancement partiel est
  prévu par le modèle au lieu d'être une exception bricolée. C'est ce qui rend
  possible d'ouvrir un marché en trois pages sans dette.
- **Le compilateur sert de checklist.** Rare et précieux — voir les trois
  couches dans `01-procedure-ouverture-marche.md`.

Autrement dit : la partie que la plupart des équipes ratent est déjà réussie.
Ce qui reste à travailler, c'est tout ce qui n'est pas du code.

## 3. Les sept pièges classiques

### 3.1 Traduire le site et croire qu'on a ouvert un marché

Le piège dominant. La traduction est le prérequis le moins différenciant :
elle ne fait ni acheter, ni rester. Ce qui déplace l'aiguille est ailleurs —
preuve locale, moyens de paiement, conformité, support.

### 3.2 La largeur avant la profondeur

Ouvrir N marchés en parallèle produit presque toujours N demi-marchés qui
sous-performent tous et qu'on n'ose plus fermer. Le consensus est net :
**aller au bout d'un marché avant d'en ouvrir un second**, parce que le SEO
local, les clients référençables et le contenu composent — lentement d'abord,
puis vite.

C'est le point de vigilance actuel : `/uk` n'est pas terminé, et trois marchés
supplémentaires sont en préparation. Ce n'est pas disqualifiant si c'est un
choix explicite d'exploration, ce qui est le cas ici. Ça le devient si les
quatre avancent à moitié en même temps.

### 3.3 Prendre hreflang pour un levier d'acquisition

hreflang **n'apporte aucun trafic**. Il évite qu'un marché en cannibalise un
autre et sert la bonne page au bon visiteur. Le classement vient du contenu
local, des liens locaux et des signaux d'entité locale. Corollaire direct pour
izika : 37 articles en français contre 1 en anglais explique le positionnement
de `/uk` bien mieux que n'importe quel réglage technique.

Cas particulier à surveiller : plusieurs marchés dans la **même langue**
(`/fr`, `/be-fr`, `/ch-fr`). hreflang gère la désambiguïsation, mais du contenu
quasi identique sur trois marchés francophones se cannibalise quand même. La
réponse n'est pas technique, elle est éditoriale : chaque marché doit avoir des
pages qui n'ont pas d'équivalent ailleurs.

### 3.4 Convertir le prix au lieu de le positionner

Afficher la bonne devise est le minimum, pas la localisation du prix. Trois
questions distinctes :

- **Le niveau** — le pouvoir d'achat suisse supporte un prix nettement
  supérieur au prix français ; l'inverse vaut pour l'Europe centrale. Garder un
  prix unique est un choix légitime, mais c'en est un.
- **Les moyens de paiement** — un moyen local absent coûte des conversions de
  façon invisible : Bancontact en Belgique, TWINT en Suisse, iDEAL aux
  Pays-Bas. On ne voit jamais ces pertes dans les statistiques.
- **La facturation** — TVA, mentions HT/TTC, autoliquidation, OSS, et hors UE
  pour la Suisse. C'est un coût **récurrent**, pas une tâche de lancement.

### 3.5 Sous-estimer le support

Le support est le poste qui échoue en dernier et se voit le plus. Deux règles
simples :

- Si la langue n'est pas couverte, **le dire avant l'achat**, visiblement. Un
  client qui l'apprend après paiement produit un remboursement et un avis
  négatif — soit exactement les deux choses qu'on cherchait à gagner.
- Les attentes de réactivité et de formalisme ne sont pas universelles : elles
  sont fixées par les concurrents locaux et par le droit local, pas par une
  supposée culture nationale. Regarder ce que promettent les concurrents du
  pays est plus fiable que n'importe quelle généralité.

### 3.6 La taxe N×

Chaque marché multiplie le coût de **tout changement futur** : une nouvelle
fonctionnalité, c'est N copies à mettre à jour ; un changement de prix, N
pages ; une nouvelle obligation légale, N relectures. À deux marchés c'est
indolore, à cinq c'est structurant.

La contenir se joue à la conception : garder petite la surface spécifique par
marché, partager tout ce qui peut l'être, et utiliser la partialité des routes
pour ne pas ouvrir des pages qu'on ne maintiendra pas.

### 3.7 Ne pas définir de critère d'arrêt

Presque personne ne le fait, et les marchés morts s'accumulent parce que les
fermer est politiquement coûteux. À définir **avant** le lancement : ce à quoi
ressemble le succès à 6 et 12 mois, et ce qu'on fait si ce n'est pas atteint.

## 4. Ce qui marche vraiment, par ordre d'impact

### 4.1 Suivre la demande qui existe déjà

**La pratique la plus rentable, et celle qu'on oublie le plus souvent.** Avant
de choisir un marché sur des critères théoriques, regarder les données déjà
disponibles : d'où viennent les visites, les inscriptions, les essais, les
clients payants aujourd'hui ?

Un SaaS français a presque toujours, sans l'avoir cherché, des utilisateurs
belges, suisses et luxembourgeois. Ce sont des marchés où la preuve de demande
est **déjà faite** et gratuite. Vérifier cela dans l'analytics et le CRM change
souvent l'ordre de priorité établi sur le papier — et c'est une donnée qu'izika
possède et n'a pas encore versée au dossier.

### 4.2 Un marché à la fois, jusqu'à la preuve

Définir ce qu'est « la preuve » (des clients payants locaux, un canal
d'acquisition qui tourne, un support tenable), l'atteindre sur un marché, puis
seulement ouvrir le suivant. Le second marché coûte moins cher que le premier
si et seulement si le premier est allé au bout.

### 4.3 La preuve locale bat la traduction

Par ordre d'efficacité : des clients du pays cités nommément, des avis en
langue locale, des cas d'usage locaux, des chiffres locaux. Une page
parfaitement traduite sans un seul client local convertit mal ; une page
imparfaite avec trois témoignages locaux convertit.

Conséquence concrète : la question de la preuve sociale (`trustpilot` sur le
`Market`) n'est pas un détail de fin de projet, c'est un levier de conversion
de premier ordre. Sur un marché francophone, les avis existants sont
directement réutilisables — c'est un avantage que l'Allemagne n'a pas.

### 4.4 Le contenu originé, et surtout le volume

Le contenu local est le moteur d'acquisition d'un SaaS de ce type. Le facteur
limitant n'est pas la qualité d'un article mais la **cadence**. Décider, avant
d'ouvrir, combien d'articles par mois le marché recevra — et si la réponse est
« zéro après le lancement », ne pas ouvrir.

### 4.5 Glossaire avant traducteur

Avant la première commande de traduction, figer un **glossaire** de quelques
dizaines de termes métier — indemnité kilométrique, barème, relevé, note de
frais, déplacement professionnel, agenda — avec leur équivalent validé par
marché. Sans glossaire, chaque prestataire invente sa terminologie et la marque
se fragmente d'un marché à l'autre, de façon irréversible et coûteuse.

C'est aussi la réponse la plus directe au problème « nous ne jugeons pas
l'allemand » : un glossaire validé une fois, plus une rétrotraduction
systématique, permettent de contrôler le fond sans maîtriser la langue.

### 4.6 Pseudo-localisation avant traduction

Pratique standard et peu coûteuse : remplacer les chaînes par des versions
allongées et accentuées pour révéler, **avant** de payer une traduction, les
textes en dur et les ruptures de mise en page. L'allemand est typiquement 20 à
30 % plus long que le français : la navigation, le méga-menu et les boutons
sont les premiers à casser. Le faire avant la copy évite de repayer la mise en
page après.

### 4.7 Un propriétaire nommé par marché

Un marché sans responsable identifié se dégrade silencieusement : les taux
périment, les pages légales vieillissent, les articles s'arrêtent. Le nom
compte plus que le processus.

## 5. Application à izika — état et action

| Pratique | État aujourd'hui | Action |
|---|---|---|
| Découplage pays / langue | ✅ Acquis | Rien |
| Contenu originé | ✅ Acquis en principe | Tenir la cadence par marché |
| Localisation du prix | ❌ EUR partout, y compris `/uk` | Décider niveau, devise, moyens de paiement |
| Preuve locale | ❌ Absente hors France | Trancher la preuve sociale avant d'écrire la home |
| Support | ⚠️ FR + EN uniquement | Annoncer la langue avant l'achat |
| Glossaire terminologique | ❌ Inexistant | À figer avant la première traduction externe |
| Pseudo-localisation | ❌ Jamais faite | À faire avant la copy allemande |
| Demande existante mesurée | ❓ Donnée non versée | Extraire visites et inscriptions par pays |
| Critères d'arrêt | ❌ Non définis | À écrire dans chaque fiche pays |
| Propriétaire par marché | ❓ Non formalisé | Nommer |

## 6. Le test le moins cher avant d'investir

Une pratique qui évite d'engager 1 650 lignes de copy sur une intuition : pour
chaque marché candidat, publier **une page et un calculateur** dans la langue
cible, y envoyer un peu de trafic payant, et mesurer sur quelques semaines le
coût d'acquisition et le taux d'inscription. La partialité des routes rend ce
test presque gratuit ici — c'est précisément ce pour quoi elle a été conçue.

Ce n'est pas une objection aux lancements en parité complète, qui se
justifient quand la conviction est faite. C'est l'option à connaître pour les
marchés sur lesquels elle ne l'est pas.

## 7. Définir le succès avant d'ouvrir

Pour chaque marché, écrire dans sa fiche, **avant** le lancement :

- ce qu'on vise à 6 et 12 mois — visiteurs organiques, essais, clients payants ;
- le canal d'acquisition principal et qui le tient ;
- la cadence de contenu qu'on s'engage à tenir ;
- ce qu'on fait si l'objectif n'est pas atteint : persévérer, réduire à une
  page vitrine, ou fermer.

Un marché sans ces quatre lignes n'est pas prêt à être ouvert, quelle que soit
la qualité de son plan technique.

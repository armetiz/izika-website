# Marché suisse (`/ch-fr`) — plan de déploiement marketing

**État au 2026-09-07 : le marché `/ch-fr` est construit et buildé.** Ce document
reste le plan de référence ; la section « Ce qui est fait » ci-dessous dit où
s'arrête le code et ce qui reste bloquant hors du dépôt. Deux affirmations du
plan initial se sont révélées fausses à la vérification des sources : elles
sont corrigées **en place**, avec la mention *(corrigé)*.

## Ce qui est fait

| Lot | État | Détail |
|---|---|---|
| **1. Socle** | ✅ | `countries.ts` (`CH`), `markets.ts` (`ch-fr`, CHF, `fr-CH`), `routes.ts`, `dict.countries.CH` en `fr` et `en`, home `/ch-fr` |
| **2. Aimant SEO** | ✅ | `src/data/mileage-ch.ts`, `MileageCalculatorCH.tsx`, `/ch-fr/calculateur-indemnites-kilometriques`, 3 articles sourcés |
| **3. Légal** | ⚠️ rédigé, **à faire valider** | CGV = mêmes articles 1-29 que `/fr` + article 30 « dispositions suisses » ; charte + section 16 nLPD/LTC ; mentions légales + section 5 LCD |
| **4. Fiscal / paiement** | ❌ **bloquant, hors dépôt** | TVA suisse, facturation en CHF, TWINT — voir § risques |
| **5. Conversion** | ✅ | solo, team, team-entreprises, fonctionnalités, tarifs (CHF 149/an, CHF 12/mois/utilisateur), FAQ, sécurité |
| **6. Longue traîne** | ⏸ différé | les 5 solutions ne sont pas ouvertes en `ch-fr` (partialité de `solutionSlugs`) |

Décisions prises en cours d'exécution, et pourquoi :

- **Prix suisses propres**, pas une conversion : `pricing: { yearly: '149',
  monthly: '12' }`, adossé au plan Stripe CHF existant. Alimente aussi les
  offres JSON-LD (`priceCurrency: 'CHF'`).
- **Droit de rétractation harmonisé sur la France** (décision produit) : 14
  jours accordés **contractuellement** aux clients suisses, article 30.3 des
  CGV. Le droit suisse n'en prévoit aucun ; plutôt que d'exclure ou de se
  taire, un régime unique et **une seule implémentation** dans le tunnel de
  souscription. Corollaire : la piste « exception d'exécution immédiate »
  (art. L221-28 c. conso.) proposée plus bas **n'est pas retenue** — elle
  créerait précisément la divergence que l'on cherche à éviter.
- **Un seul jeu de CGV.** Les articles 1 à 29 sont partagés via
  `src/components/legal/TermsBodyFr.astro` ; `/ch-fr` ajoute l'article 30. Même
  traitement pour la charte, les mentions légales et la sécurité. Deux
  documents complets auraient divergé à la première modification.
- **`footer.since` reste la ligne partagée** : « Éditeur français indépendant
  depuis 2014 » vaut aussi en Suisse — la ligne légale juste en dessous porte
  déjà le RCS Montpellier. Pas de champ d'override tant qu'aucune divergence
  réelle ne l'impose.
- **Pas de `/ch-fr/team-collectivites`** : « collectivités » est une catégorie
  administrative française. La partialité des routes masque la page.
- **`cookiesVersion` reste `izika-fr-EU`**, volontairement : l'UI de
  consentement est en français, ce qui est correct en Suisse romande, et
  l'opt-in satisfait *a fortiori* la LTC. Ce n'est **pas** le bug de `/uk`, où
  la langue elle-même était fausse. Créer `izika-ch-fr` reste souhaitable pour
  le libellé des finalités, mais n'est pas bloquant.

**Vérifié au build** : `npx astro check` → 0 erreur ; `npm run build` → 93
pages ; hreflang `fr-FR` / `en-GB` / `fr-CH` + `x-default` émis sur les routes
partagées ; sitemap complet ; formats CHF contrôlés au rendu.

## Origine

Le code attendait ce marché — `marketIds` portait le commentaire
`// + 'ch-fr' later` et `src/data/bareme-ik.ts` citait explicitement le cas
suisse comme exemple de module de barème distinct.

Ce plan porte sur la **Suisse romande** en français. Il est, avec
`be-belgique.md`, un cas de test du processus décrit dans
`01-procedure-ouverture-marche.md` : que coûte réellement l'ouverture d'un
marché quand la langue n'est plus un obstacle ?

## Décisions actées

| Décision | Choix | Conséquence |
|---|---|---|
| Segment d'URL | `/ch-fr` | Schéma pays-langue : la Suisse a plusieurs langues, l'alias court est exclu |
| Langue | Français | Dictionnaire `fr` **réutilisé**, aucune nouvelle langue |
| Devise | **CHF** | Premier marché non-euro — c'est le vrai coût de ce pays |
| Support | Français | Déjà couvert par l'équipe |
| Périmètre | À trancher — voir § séquencement | La parité complète n'est pas évidente ici |

## Ce qui tombe par rapport à l'Allemagne

C'est la raison d'être de ce plan. Poste par poste :

| Poste | Allemagne | Suisse romande |
|---|---|---|
| Nouvelle langue dans `languages.ts` | Oui | **Non** — `fr` existe |
| Dictionnaire `src/i18n/<lang>.ts` (~115 lignes) | À écrire | **Aucun** — partagé avec `/fr` |
| Arbitrage de la langue de support | Bloquant | **Sans objet** |
| Glose française de toute la copy | Livrable contractuel | **Sans objet** |
| Résumé français des textes juridiques | À exiger du juriste | **Sans objet** — le juriste suisse écrit en français |
| Rédacteur natif | Indispensable | **Relecteur** romand suffit |
| Pseudo-localisation (allongement des chaînes) | Nécessaire | **Sans objet** — même langue, même longueur |
| Preuve sociale | Avis français inutilisables | **Réutilisables** — `fr.trustpilot.com` |
| **Lot 0** | 3 préalables bloquants | **Supprimé** |

**Ce qui ne tombe pas, et qu'il ne faut pas sous-estimer :**

- **La devise.** Poste entièrement absent du dossier allemand, et qui touche le
  code, la facturation et la fiscalité. Voir § piège n° 1.
- **Le juridique.** Il n'est pas plus léger qu'en Allemagne, il est
  *différent* — et la Suisse étant hors UE, rien du socle RGPD/UE ne se
  transpose mécaniquement. Voir § juridique, la section la plus dense de ce
  plan.
- **La copy marketing.** Même langue ≠ même copy. Toutes les références
  fiscales françaises sont fausses en Suisse. Voir § le français de Suisse
  romande.
- **Le contenu éditorial.** Zéro article suisse aujourd'hui. La cadence
  éditoriale reste le facteur limitant, identique à l'Allemagne.

**Conclusion honnête : la Suisse coûte à peu près la moitié de l'Allemagne, pas
le dixième.** Ce qui disparaît, c'est la traduction et le circuit de contrôle
de la langue. Ce qui reste — juridique, fiscal, devise, contenu, preuve
locale — est l'essentiel du travail d'ouverture d'un marché.

## Le piège suisse n° 1 : la devise

Premier marché non-euro d'izika. Trois niveaux, du plus simple au plus lourd.

**Le formatage était presque prêt.** *(corrigé)* `src/lib/format.ts` expose
`makeFormatters({ numberLocale, currency })`, alimenté par le `Market`, et
`numberLocale: 'fr-CH'` + `currency: 'CHF'` donnent bien la position du code et
le point décimal. **Mais pas l'apostrophe de milliers** : CLDR rend les
milliers `fr-CH` avec une espace fine insécable (`9 750.00 CHF`), là où l'usage
suisse — Fedlex, certificat de salaire, factures — écrit `9’750.00`. D'où un
champ optionnel `Market.numberGroupSeparator`, appliqué par `makeFormatters`
via `formatToParts` (seules les parties `group` sont substituées, l'espace
avant le code monétaire est préservée). Un `chfPerKm()` complète `pence()` pour
l'écriture du taux (`CHF 0.75`, point décimal).

**Le prix ne l'est pas.** `pricing: { yearly: '99', monthly: '10' }` est une
paire de chaînes sans devise attachée, identique sur tous les marchés — c'est
exactement le défaut qui fait afficher des euros sur `/uk`
(`01-procedure-ouverture-marche.md`, couche 3). Trois questions distinctes, à
ne pas confondre :

- **Le niveau.** Le pouvoir d'achat suisse supporte un prix nettement supérieur
  au prix français. Garder 99 €/an converti est un choix légitime ; ce n'en est
  pas moins un choix, et c'est le marché où renoncer à le faire coûte le plus.
- **La conversion ou le prix propre.** Un prix affiché en CHF arrondi
  proprement (`CHF 99.–`) plutôt qu'une conversion flottante.
- **Les moyens de paiement.** TWINT est incontournable en Suisse ; son absence
  coûte des conversions de façon invisible. À vérifier côté prestataire de
  paiement.

**La fiscalité est le vrai sujet.** La Suisse est **hors UE**, donc **hors
OSS** : le guichet unique européen ne couvre pas les ventes suisses. Une
prestation de services électroniques fournie à un client suisse relève de la
TVA suisse à **8,1 %**, avec un seuil d'assujettissement et, au-delà,
l'obligation de désigner un **représentant fiscal** en Suisse. *Montants,
seuils et modalités : à instruire avec la comptabilité — non vérifiés dans ce
plan.* C'est un coût **récurrent**, pas une tâche de lancement, et il doit être
tranché avant l'ouverture des paiements.

## Le piège suisse n° 2 : ce n'est pas un barème national

À ne pas rater, parce que ça change ce que la page conformité a le droit
d'affirmer.

**Le taux.** CHF 0.70/km jusqu'au 31 décembre 2025, **CHF 0.75/km depuis le
1ᵉʳ janvier 2026**, à l'annexe de l'Ordonnance du DFF sur la déduction des
frais professionnels (RS 642.118.1). Forfait unique couvrant tout — carburant,
assurance, amortissement, entretien, pneus. Sous forme affine : `d × 0,75`, une
seule tranche, `fixe = 0`. Niveau A, le module de données le plus simple des
quatre pays étudiés.

*(corrigé)* Trois subtilités, dont deux que la première version de ce plan
avait mal comprises :

- **Ce n'est pas un « taux recommandé », c'est un MAXIMUM admis fiscalement.**
  Une entreprise peut rembourser moins. La limite ne vient pas du droit fiscal
  mais du droit du travail : l'art. 327a al. 2 CO n'admet l'indemnité fixe
  qu'« à la condition qu'elle couvre tous les frais nécessaires ».
- **La « clause du grand-père » joue dans l'autre sens.** Il ne s'agit pas de
  règlements bloqués à 0.70 : une entreprise dont le règlement est déjà agréé
  peut passer à CHF 0.75 **sans nouvelle approbation** (positions publiées par
  Berne, Zoug, Lucerne, Saint-Gall ; ailleurs, vérifier auprès du canton du
  siège). Ce qui reste vrai, et qui justifie d'exposer les deux taux dans le
  calculateur : beaucoup de règlements portent encore 0.70, et le salarié
  remboursé à ce taux n'est pas dans l'erreur. C'est aussi un argument
  commercial chiffrable — l'écart annuel, que le calculateur affiche.
- **Nouveauté 2026 : l'indexation.** Le montant se fonde désormais sur le prix
  au kilomètre publié chaque année par le **TCS**. Il bougera donc sans
  révision législative — d'où la constante `TAUX_ACTUEL` dans
  `src/data/mileage-ch.ts` plutôt qu'un littéral disséminé dans la copy.
- **Taux moto et vélo** : existence et montants **à confirmer** — non vérifiés
  ici. Le calculateur n'en dépend pas : il expose un taux libre.

**La différence de nature avec la France.** En France, le barème CGI est un
texte national opposable à tous. En Suisse, le taux passe par un **règlement de
frais** (*Spesenreglement*) que l'entreprise fait approuver par
l'**administration fiscale de son canton**, sur la base des modèles de la
Conférence suisse des impôts. Il y a 26 cantons.

Conséquence sur la promesse produit : izika ne peut pas dire en Suisse ce
qu'elle dit en France. « Conforme au barème officiel » devient « conforme au
règlement de frais de votre entreprise, au taux recommandé de CHF 0,75/km ».
Le barème personnalisé de l'app, marginal en France, devient ici la
fonctionnalité **centrale** — c'est un argument de vente, pas un repli.

*À confirmer : existence de variations cantonales du taux lui-même, et
plafonds de déduction des frais de déplacement dans les déclarations
d'impôt (fédéral et cantonaux). Ces montants n'ont pas pu être vérifiés.*

## L'angle marketing que la France n'a pas : l'art. 327a CO

En France, l'indemnité kilométrique est une **tolérance fiscale** : l'employeur
peut rembourser sans charges jusqu'au barème. En Suisse, l'**art. 327a du Code
des obligations** fait du remboursement des frais nécessaires une **obligation
de droit du travail** : le salarié y a droit, et la loi interdit de le lui
faire supporter.

C'est un angle éditorial et commercial que ni la France, ni l'Allemagne, ni le
Royaume-Uni n'offrent : on ne s'adresse pas seulement à l'employeur qui veut
optimiser, mais au salarié qui a un **droit**. À exploiter dans les articles et
sur la landing `team`.

## Chemin technique

Le plus léger des quatre pays étudiés, parce qu'aucune langue n'est ajoutée.

### 1. Pays et marché

```ts
// src/i18n/countries.ts
export const countryIds = ['FR', 'GB', 'CH'] as const;
COUNTRIES: { …, CH: { id: 'CH', region: 'europe' } }

// src/i18n/languages.ts  →  AUCUN CHANGEMENT

// src/i18n/markets.ts
export const marketIds = ['fr', 'uk', 'ch-fr'] as const;
```

Le `Market` `ch-fr` : `country: 'CH'`, `language: 'fr'`, `currency: 'CHF'`,
`numberLocale: 'fr-CH'`, `hreflang: 'fr-CH'`, `ogLocale: 'fr_CH'`,
`schemaInLanguage: 'fr-CH'`, `trustpilot` réutilisable (avis francophones),
`legal` à revoir (voir § juridique), `pricing` en CHF.

Ajouter `CH: 'Suisse'` / `'Switzerland'` aux dictionnaires `fr` et `en` —
`dict.countries` est typé par `CountryId`, un pays sans nom ne compile pas.

### 2. Dictionnaire — rien à écrire, une chose à surveiller

`/ch-fr` réutilise `src/i18n/fr.ts` tel quel. **C'est le gain principal du
pays.** Une seule clé pose problème :

- `footer.since` — « Éditeur français indépendant depuis 2014 » : exact mais
  contre-productif en Suisse, où la question posée est celle de la
  souveraineté des données. L'hébergement européen hors cloud américain est
  l'argument qui porte.

Attention : le dictionnaire étant **partagé entre `/fr` et `/ch-fr`**, on ne
peut pas y mettre de copy spécifique à un marché sans l'imposer à l'autre. Tout
ce qui diverge doit vivre dans un module `src/data/*.ch-fr.ts` ou sur le
`Market`, jamais dans `fr.ts`. **C'est la contrainte structurante de ce
lancement, et elle est nouvelle** : c'est le premier marché à partager une
langue avec un autre.

### 3. Slugs

Les slugs français existants se réutilisent tels quels (`solo`, `team`,
`fonctionnalites`, `faq`, `pricing`, `security`…). Deux exceptions à trancher :

| Clé | Slug `fr` | Slug `ch-fr` proposé |
|---|---|---|
| `legal` | `mentions-legales` | `mentions-legales` |
| `privacy` | `charte-de-confidentialite` | `charte-de-confidentialite` |
| `terms` | `cgv` | `cgv` — mais **contenu suisse distinct** |
| `calculator` | `calculateur-indemnites-kilometriques` | **à trancher** — le terme suisse dominant reste à confirmer |

Slugs identiques et langue identique entre `/fr` et `/ch-fr` : voir le risque
de cannibalisation au § SEO.

### 4. Calculateur

Nouveau module `src/data/mileage-ch.ts`, pays-spécifique comme l'imposent les
en-têtes de `bareme-ik.ts` et `mileage-uk.ts`. Le plus simple des quatre :
`d × 0,75`, plus l'historique `d × 0,70` pour les règlements sous clause du
grand-père. Îlot `src/components/MileageCalculatorCH.tsx` réutilisant
`src/components/calculator/shared.tsx`.

La difficulté n'est pas le calcul mais le **cadrage** : expliquer que le taux
dépend du règlement de frais de l'entreprise, et que 0,75 est le taux
recommandé et non un barème opposable.

### 5. Articles et solutions

Collection `src/content/articles/ch-fr/` — la collection Keystatic apparaît
automatiquement. **Contenu original**, pas des reprises des articles français,
qui parlent d'URSSAF et de CV fiscaux.

Trois articles d'ouverture proposés : le taux CHF 0,75 et son entrée en vigueur ;
le règlement de frais, comment il s'établit et se fait approuver ; l'art. 327a
CO et le droit du salarié au remboursement.

Les 5 YAML de solutions se **réutilisent en grande partie** depuis
`src/content/solutions/fr/` — les métiers visés (agents immobiliers,
professions libérales, consultants, artisans) existent en Suisse. À adapter :
références fiscales, témoignages, chiffres.

## Le juridique suisse — bloquant

La section la plus dense, et celle où la Suisse ne coûte **pas** moins que
l'Allemagne. Hors UE : rien du socle RGPD/UE ne se transpose mécaniquement.

### Droit applicable et for — la clause actuelle ne tient pas

Les CGV françaises désignent le droit français et un tribunal français. Face à
un **consommateur** suisse, cette clause est doublement défaillante :

- **Sur le droit.** L'art. 120 al. 2 de la **LDIP** dispose que « l'élection de
  droit est **exclue** » pour les contrats de consommation courante. Ce n'est
  pas le mécanisme de Rome I — choix valable mais plafonné par un plancher
  impératif : devant un juge suisse, la clause « droit français » est
  purement **inopérante**.
- **Sur le for.** La **Convention de Lugano** (à laquelle la France est liée
  comme État membre de l'UE) prévoit à son art. 16 §2 que l'action contre un
  consommateur ne peut être portée que devant les tribunaux de son domicile,
  et à son art. 17 que l'élection de for n'est valable que postérieure au
  litige ou plus favorable au consommateur.

**Et la sanction est opérationnelle, pas seulement théorique.** L'art. 35 §1 de
Lugano refuse la reconnaissance des décisions rendues au mépris de la section
consommateurs. Un jugement français obtenu contre un consommateur suisse **ne
sera ni reconnu ni exécuté en Suisse** — or c'est là que se trouve le débiteur.
La clause est donc inutile, pas seulement invalide. Pour du recouvrement de
petits montants d'abonnement, la voie réaliste est la poursuite pour dettes
suisse, pas le procès.

**Le point à comprendre** : le consommateur choisit son for (Lugano art. 16 §1).
Devant un juge suisse il obtient le droit suisse ; devant un juge français,
Rome I art. 6 §2 valide le choix du droit français, plus protecteur. **izika
est donc exposée au maximum des deux protections, jamais au minimum.**

**En B2B**, rien de tout cela ne s'applique : l'art. 116 LDIP valide l'élection
de droit, l'art. 23 de Lugano valide la clause de for. Droit français et
tribunal français sont parfaitement tenables entre professionnels.

- [ ] Réécrire les clauses de droit applicable et de for en **séparant
      explicitement B2C et B2B**. Un jeu unique de CGV avec une section
      « dispositions spécifiques aux clients résidant en Suisse » est
      préférable à deux jeux complets, qui divergent avec le temps.
- [ ] **Qualifier le client à la souscription** (particulier / professionnel,
      avec identifiant d'entreprise) et documenter la déclaration. C'est le
      seul levier qu'izika contrôle réellement : un professionnel sort du
      régime consommateur, donc de tout ce qui précède.

### Droit de rétractation — il n'existe pas en Suisse, et c'est un piège inversé

Le droit suisse **ne connaît aucun droit de rétractation pour la vente en
ligne**. Les art. 40a et 40b CO limitent la révocation au démarchage à
domicile, dans les transports et sur la voie publique, aux manifestations
publicitaires et — depuis 2016 — au démarchage téléphonique. La liste est
exhaustive et le e-commerce en est **délibérément** exclu : le Conseil fédéral
a renoncé à légiférer en 2005, le Parlement a écarté un avant-projet en ce sens
en 2014, et la motion 22.3476 qui le redemandait a été classée en 2023 sans
débat. Rien n'est en cours.

**Mais izika s'auto-impose les 14 jours par sa propre clause de droit
français.** Devant un juge français, Rome I valide ce choix et le droit
français s'applique, rétractation comprise. Devant un juge suisse, la clause
sera très vraisemblablement lue comme un engagement contractuel — rien
n'interdit d'accorder plus que le minimum légal.

- [x] **Tranché : les 14 jours sont accordés à tous, et c'est écrit.**
      Article 30.3 des CGV `/ch-fr`, formulé comme un engagement contractuel
      (« IZIKA accorde néanmoins […] par la présente clause ») et explicitement
      « identique à celui dont bénéficient ses clients français ». Rien
      n'interdit d'accorder plus que le minimum légal, et cela écarte du même
      coup le risque art. 8 LCD.
- [x] **La piste « exception d'exécution immédiate » est écartée.** Neutraliser
      la rétractation par l'art. L221-28 1° et 13° du code de la consommation
      supposait deux cases et un e-mail de confirmation dans le tunnel — donc
      une mécanique de plus, et un régime qui n'a de sens que sous droit
      français. L'objectif retenu étant l'inverse (aucune différence
      d'implémentation entre la France et la Suisse), la clause contractuelle
      simple gagne. Si cette exception est un jour souhaitée, elle devra être
      décidée **pour tous les marchés à la fois**, pas pour la Suisse.

### Cookies — opt-out en droit suisse, mais garder l'opt-in

L'art. 45c let. b de la **LTC** n'exige que l'information et la **possibilité
de refuser** : c'est un opt-out, il n'y a pas d'équivalent suisse à ePrivacy.
Mais le guide du **PFPDT** du 6 octobre 2025 impose un **opt-in exprès** dès
qu'il y a données sensibles, profilage à risque élevé ou usage manifestement
inattendu, et exige des paramètres par défaut protecteurs.

**Recommandation : garder la CMP en opt-in pour tous les visiteurs.** C'est
déjà obligatoire pour les visiteurs UE, cela satisfait *a fortiori* le droit
suisse, et maintenir deux logiques de consentement géodépendantes est une
source classique de bugs. La conformité suisse est ici un sous-ensemble de la
conformité UE.

- [ ] Version suisse du consentement Axeptio, et `cookiesVersion` du marché
      renseignée — ne pas reproduire l'erreur de `/uk`, resté sur
      `izika-fr-EU` (`docs/mise-en-production.md`, vigilance 2).
- [ ] Vérifier que le **retrait du consentement reste accessible en
      permanence**, et pas seulement au premier affichage.
- [ ] Mentionner explicitement dans la charte de confidentialité la
      **possibilité de refuser**, au sens de l'art. 45c let. b LTC.

### Protection des données — la nLPD s'applique à izika

L'art. 3 de la **nLPD** vise « les états de fait qui déploient des effets en
Suisse, même s'ils se sont produits à l'étranger ». Une société française
ciblant la Suisse y est donc soumise, en plus du RGPD.

- [ ] Évaluer l'obligation de désigner un **représentant en Suisse** (art. 14
      nLPD) : quatre conditions **cumulatives** — offre de biens ou services en
      Suisse, traitement à grande échelle, régulier, et à risque élevé. Pour un
      SaaS de cette taille, l'obligation ne se déclenche a priori pas, mais
      cela dépend de volumétries à vérifier.
- [ ] Charte de confidentialité : mentionner la nLPD à côté du RGPD.

### Informations e-commerce — LCD art. 3 al. 1 let. s

Quatre exigences, applicables indépendamment du droit régissant le contrat, car
la LCD saisit le comportement déployant ses effets sur le marché suisse :
identité et adresse de contact **y compris courriel**, indication des étapes
techniques de conclusion, outils de correction des erreurs de saisie,
confirmation de commande **par courriel** sans délai.

Un tunnel conforme au droit français y satisfait normalement. Un manquement
fréquent et facile à corriger : **publier une adresse e-mail**, pas seulement
un formulaire de contact.

### Garantie légale — il n'y en a pas pour un SaaS

Les art. 197 et 210 CO relèvent du contrat de **vente** et supposent la
livraison d'une **chose**. Un abonnement SaaS n'est pas une vente : en droit
suisse c'est un contrat innommé, relevant de l'inexécution (art. 97 ss CO). Il
n'existe donc **aucune garantie légale de deux ans** applicable.

Conséquence : c'est le **SLA contractuel** qui fait foi, sous réserve de
l'art. 100 CO (nullité de l'exclusion de responsabilité pour dol ou faute
grave) et, en B2C, de l'art. 8 LCD. *Analyse fondée sur le texte ; aucune
jurisprudence du Tribunal fédéral qualifiant un contrat SaaS n'a pu être
vérifiée. À faire valider par un avocat suisse si les enjeux de SLA sont
significatifs.*

### Une action transverse découverte au passage

- [x] **Vérifié : aucune mention RLL/ODR dans le dépôt.** `grep` sur `src/` et
      `docs/` ne remonte rien — ni dans les CGV, ni dans le pied de page, ni
      dans les pages légales de `/fr` et `/uk`. L'action est sans objet côté
      site ; elle reste à vérifier sur les supports hors dépôt (e-mails
      transactionnels, factures, documents commerciaux). Contexte, pour
      mémoire : le
      règlement (UE) 2024/3228 l'a abrogée : dépôt de plainte clos le 20 mars
      2025, plateforme supprimée le 20 juillet 2025. **Cela concerne `/fr` et
      `/uk` aujourd'hui, pas seulement la Suisse** — un lien mort vers une
      plateforme inexistante est en soi une information trompeuse.
- [ ] Conserver la mention du médiateur français (obligatoire pour la
      clientèle française, amende à la clé) mais la formuler de façon
      **inclusive** plutôt que restreinte à l'UE — plus favorable au
      consommateur, donc jamais reprochable. Vérifier auprès du médiateur
      retenu qu'il accepte les dossiers hors UE.

## Le français de Suisse romande

L'équipe maîtrise le français ; elle ne maîtrise pas nécessairement les usages
romands ni le droit suisse. La copy ne se réutilise donc pas telle quelle.

**Ce qui est factuellement faux en Suisse dans la copy existante :** toute
référence à l'URSSAF, au barème CGI, aux chevaux fiscaux, à la majoration de
20 % pour véhicule électrique, aux « experts-comptables » (l'équivalent romand
étant l'expert-comptable diplômé / le fiduciaire), au « RCS », à la « SAS », et
la ligne « Éditeur français indépendant depuis 2014 ». Le pilier « support en
France » de `src/data/compliance-section.fr.ts` doit être reformulé — il est
vrai mais ne rassure pas de la même façon.

**Vocabulaire à vérifier avec un relecteur romand** : « note de frais » contre
« décompte de frais », le terme dominant pour l'indemnité kilométrique en
Suisse (« indemnité kilométrique » n'est peut-être pas l'usage), et les
numéraux (septante, nonante) dans les textes chiffrés. *Terminologie non
vérifiée dans ce plan.*

**Estimation de réutilisation, à valider :**

| Nature | Part estimée | Traitement |
|---|---|---|
| Chrome et interface (`fr.ts`) | ~95 % | Réutilisé tel quel |
| Copy marketing (bénéfices, fonctionnalités) | ~70 % | Adaptation des références |
| Pages conformité et fiscalité | ~0 % | Réécriture complète |
| Pages légales | ~0 % | Rédaction suisse |
| Articles | 0 % | Contenu original |
| Solutions (5 YAML) | ~60 % | Métiers identiques, références à adapter |

Un **relecteur romand** reste indispensable sur la copy marketing et sur tout
ce qui touche au fiscal — pas pour la langue, pour la justesse.

## Positionnement et SEO

### Le risque n° 1 : `/fr` et `/ch-fr` se cannibalisent

Deux marchés, **même langue**, slugs largement identiques. hreflang
(`hreflangAlternates` dans `src/i18n/index.ts`) désambiguïse et s'émet
automatiquement dès qu'une route existe dans ≥ 2 marchés — mais hreflang
n'empêche pas deux pages quasi identiques de se concurrencer.

La réponse n'est pas technique, elle est éditoriale : **chaque marché doit
avoir des pages sans équivalent ailleurs.** Le calculateur suisse, les articles
sur le règlement de frais et sur l'art. 327a CO n'ont pas d'équivalent
français — c'est ce qui donne à `/ch-fr` une raison d'exister aux yeux d'un
moteur.

- [ ] Surveiller dans la Search Console les paires `fr-FR` / `fr-CH` et le
      taux de pages « dupliquée, Google a choisi une autre page ».

### Preuve sociale — l'avantage du marché francophone

Les avis izika sont sur `fr.trustpilot.com`, en français : **directement
réutilisables**, contrairement à l'Allemagne. Le champ `trustpilot` du `Market`
peut être renseigné dès le lancement, badge et widget compris. C'est un levier
de conversion de premier ordre, disponible gratuitement.

### Concurrence et mots-clés

*Non étudiés — le budget de recherche a été épuisé avant cette section.* À
instruire avant le lot marketing : concurrents locaux de la gestion de frais en
Suisse romande, terme dominant pour l'indemnité kilométrique, et volumes. Le
marché romand est petit (environ 2 millions d'habitants) : le volume de
recherche sera faible et la stratégie doit reposer sur la conversion et la
valeur par client plutôt que sur le trafic.

## Produit / App — à confirmer

- [ ] **Le barème CHF 0,75 est-il servable** par le barème personnalisé de
      `go.izika.com` ? Un forfait plat devrait l'être — comme l'Allemagne, et
      contrairement au Royaume-Uni. Si oui, `/ch-fr` se lance sans dette.
- [ ] **La devise dans l'app** : les rapports affichent-ils autre chose que
      l'euro ? Question ouverte, non vérifiable depuis ce dépôt.
- [ ] **Facturation en CHF** et TVA suisse : prérequis à l'ouverture des
      paiements.

## Design / Assets

- [ ] Bannière OpenGraph suisse — `site.defaultOgImage` est globale, donc
      française. Même dette que `/uk` ; le champ devrait passer sur le `Market`
      (voir `01-procedure-ouverture-marche.md`, § « rendre la procédure
      auto-portante »).
- [ ] Captures produit : celles de `/fr` sont en français et **réutilisables**,
      sauf celles montrant des montants en euros ou le barème CGI.

## Dev

- [ ] Premier marché à **partager une langue** avec un autre : vérifier que
      `CountrySwitcher.astro` et `countrySwitcher()` se comportent correctement
      quand deux marchés portent la même langue avec des pays différents.
- [ ] Premier marché **non-euro** : vérifier `makeFormatters` et tous les
      points d'affichage de prix.
- [ ] `npx astro check` puis `npm run build` — le typage liste ce qui manque.

## Reste à faire avant d'annoncer le marché

Le code est prêt ; tout ce qui suit se joue **hors du dépôt**. Rien n'empêche
de mettre `/ch-fr` en ligne dès maintenant — la partialité des routes ne
promet rien qui n'existe — mais les trois premiers points conditionnent le fait
d'en **faire la promotion** et d'**encaisser**.

| # | Action | Chez qui | Bloquant pour |
|---|---|---|---|
| 1 | **TVA suisse et facturation en CHF** — hors UE donc hors OSS ; seuil d'assujettissement, représentant fiscal éventuel | Comptabilité | Ouvrir les paiements |
| 2 | **Validation de l'article 30 des CGV** par un conseil suisse (droit applicable/for B2C-B2B, rétractation contractuelle, garantie, LCD) | Juridique | Ouvrir les paiements |
| 3 | **TWINT** — incontournable en Suisse, son absence coûte des conversions de façon invisible | Prestataire de paiement | Conversion |
| 4 | **App `go.izika.com`** : le taux libre CHF est-il servable ? les rapports affichent-ils autre chose que l'euro ? | Produit | Tenir la promesse du site |
| 5 | **Relecture romande** de la copy marketing et fiscale — pas pour la langue, pour la justesse | Externe | Qualité |
| 6 | **Bannière OpenGraph suisse** (`site.defaultOgImage` est globale, donc française) | Design | SEO social |
| 7 | Version de consentement `izika-ch-fr` dans Axeptio (non bloquant, voir plus haut) | Marketing | Confort |
| 8 | Concurrence et volumes de recherche en Suisse romande | Marketing | Priorisation lot 6 |
| 9 | Ouvrir les 5 solutions en `ch-fr` (`solutionSlugs` + YAML adaptés) | Contenu | Longue traîne |

**Le point 1 reste le chemin critique**, et c'est la différence avec
l'Allemagne : là-bas le blocage était linguistique, ici il est fiscal et il ne
dépend pas de l'équipe produit.

Ce qui a été livré correspond en fait à la **tête de pont** de
`02-bonnes-pratiques-i18n-saas.md` § 6, plus la parité de conversion : home,
calculateur, articles, solo, team, tarifs, FAQ et pages légales. Ce qui manque
— les solutions — est précisément ce qu'il vaut mieux ne financer qu'après
mesure sur un marché de deux millions d'habitants.

## Risques

- **La fiscalité est le vrai blocage, pas la langue.** TVA suisse hors OSS,
  représentant fiscal éventuel, facturation en CHF. C'est un coût récurrent et
  il conditionne l'encaissement.
- **L'article 30 des CGV n'a pas encore été relu par un juriste suisse.** Il
  est rédigé à partir des textes (LDIP, Lugano, CO, LCD) et corrige le défaut
  identifié — l'article 29 seul produirait des jugements inexécutables contre
  un consommateur suisse — mais une rédaction contractuelle non validée reste
  un risque assumé, pas un risque écarté.
- **Cannibalisation `/fr` ↔ `/ch-fr`.** Deux marchés dans la même langue avec
  les mêmes slugs. Sans contenu propre, `/ch-fr` restera invisible.
- **Le dictionnaire partagé.** Toute copy mise dans `fr.ts` pour la Suisse
  s'imposerait à la France. La discipline est posée : `src/i18n/fr.ts` n'a reçu
  que `countries.CH`. Aucune divergence de copy n'a finalement justifié un
  override. Le premier cas réel devra passer par le `Market` ou un module
  `*.ch-fr.ts`, jamais par le dictionnaire.
- **Marché étroit.** Environ 2 millions de francophones. Le retour ne viendra
  pas du volume mais du prix — d'où le tarif suisse propre (CHF 149/an,
  CHF 12/mois/utilisateur) plutôt qu'une conversion de 99 €.
- **Promettre « conforme au barème officiel »** serait faux en Suisse : le taux
  dépend du règlement de frais de l'entreprise, approuvé canton par canton.
  Aucune page de `/ch-fr` ne le promet, et le calculateur le dit explicitement
  — c'est une contrainte permanente sur toute copy future, pas un point réglé
  une fois pour toutes.

## Sources

Consultées le 2026-09-07.

- Taux CHF 0,75 au 01/01/2026 et clause du grand-père — [spesen-app.ch](https://spesen-app.ch/blog-posts/kilometerentschadigung-schweiz-2026), [Rydoo](https://www.rydoo.com/compliance/switzerland/mileage-switzerland/)
- LDIP (RS 291), art. 5, 112, 114, 116, 117, 120 — [Fedlex, état au 01/01/2026](https://www.fedlex.admin.ch/eli/cc/1988/1776_1776_1776/fr)
- Convention de Lugano (RS 0.275.12), art. 15 à 17, 23, 35 — [Office fédéral de la justice](https://www.bj.admin.ch/fr/convention-de-lugano-2007)
- Règlement Rome I (UE 593/2008), art. 2 et 6 — [EUR-Lex](https://eur-lex.europa.eu/eli/reg/2008/593/oj)
- Code des obligations (RS 220), art. 40a à 40f, 97 ss, 100, 197, 210, 327a — [Fedlex, état au 01/01/2026](https://www.fedlex.admin.ch/eli/cc/27/317_321_377/fr)
- Absence de droit de rétractation en ligne — [SECO / Portail PME](https://www.kmu.admin.ch/fr/quest-ce-quun-droit-de-revocation), [SECO](https://www.seco.admin.ch/de/probleme-nach-dem-kauf) ; historique : [Office fédéral de la justice](https://www.bj.admin.ch/fr/protection-des-consommateurs-commerce-electronique)
- LTC (RS 784.10), art. 45c let. b — [Fedlex](https://www.fedlex.admin.ch/eli/cc/1997/2187_2187_2187/fr)
- Guide PFPDT cookies, version 1.1 du 06/10/2025 — [PFPDT](https://www.edoeb.admin.ch/fr/guide-sur-le-traitement-des-donnees-au-moyen-de-cookies)
- LCD (RS 241), art. 3 al. 1 let. s et art. 8 — [Fedlex, état au 01/01/2025](https://www.fedlex.admin.ch/eli/cc/1988/223_223_223/fr)
- nLPD (RS 235.1), art. 3 et 14 — [Fedlex](https://www.fedlex.admin.ch/eli/cc/2022/491/fr)
- Abrogation de la plateforme RLL/ODR — [Règlement (UE) 2024/3228](https://eur-lex.europa.eu/eli/reg/2024/3228/oj)

Sources ajoutées à l'exécution (2026-09-07), qui ont corrigé le plan sur le
taux et servent de base aux trois articles publiés :

- Ordonnance du DFF sur la déduction des frais professionnels, RS 642.118.1 — [Fedlex](https://www.fedlex.admin.ch/eli/cc/1993/1363_1363_1363/fr)
- Passage à 75 ct./km et indexation sur le prix au kilomètre du TCS — [DFF, « Le DFF adapte les barèmes fiscaux au renchérissement »](https://www.efd.admin.ch/fr/newnsb/VzaAUrhkPx2EPde4a6e3O)
- Pas de nouvelle approbation nécessaire pour passer à 0.75, et reconnaissance intercantonale des règlements agréés — [TaxInfo, canton de Berne](https://www.taxinfo.sv.fin.be.ch/taxinfo/59b9b1fa-51f3-4b49-a458-c67ea9323db3?lang=fr)
- Portée du changement pour les règlements de frais, maximum vs obligation — [MME Legal](https://www.mme.ch/en/magazine/articles/increase-in-travel-expense-deductions-as-of-january-1-2026-impact-on-expense-reg-ulations-and-expense-payments)
- Approbation par le canton du siège, règlement type CSI, certificat de salaire (ch. 13.2.2, case F) — [CORE Partner AG](https://www.core-partner.ch/Approbation-des-reglements-de-frais)
- Art. 327, 327a, 327b, 327c CO et leur caractère semi-impératif — [Ville de Lausanne](https://www.lausanne.ch/vie-pratique/travail/protection-des-travailleurs/travailleur/contrat-de-travail-regles/frais-execution-travail.html)
- TF 4A_533/2018 du 23 avril 2019 (frais nécessaires : usage d'une pièce du logement) — [Heidi.news](https://www.heidi.news/articles/teletravail-le-tribunal-federal-contraint-il-les-employeurs-a-verser-une-indemnisation), [Publex](https://www.publex.ch/teletravail-paiement-dun-loyer-au-collaborateur/)

**Toujours non vérifié** — à instruire avant d'annoncer le marché : variations
cantonales du taux ; **plafond exact de la déduction des frais de déplacement
domicile-travail** (les sources consultées donnent des montants divergents — le
site n'avance donc aucun chiffre, seulement l'existence du plafond et la
distinction avec le remboursement employeur) ; taux moto et vélo ; seuils et
modalités de la TVA suisse ; terminologie romande dominante ; concurrence et
volumes de recherche en Suisse romande.

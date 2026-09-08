# Mise en production — izika.com (Cloudflare Pages)

Points de vigilance et checklist de bascule pour le site vitrine `izika/www`
(Astro statique + Keystatic), qui remplace l'ancien Symfony/WordPress
(`/Users/thomas/Workspace/izika/website`).

Document vérifié le 2026-09-07 sur `main` (build : 77 pages, 79 lignes de
`_redirects`).

---

## 0. Le piège n°1 : tout est *build-time*

Toutes les variables `PUBLIC_*` sont des `import.meta.env` **inlinés à la
compilation**, pas des variables runtime. Le site déployé est 100 % statique :
aucun worker ne les relit.

**Conséquence** : définir une variable dans Cloudflare Pages *après* un déploiement
n'a **aucun effet** tant qu'on n'a pas relancé un build. Chaque changement de
variable ⇒ « Retry deployment » / nouveau commit.

Et le défaut est silencieux : sans variable, rien ne casse, le tracking et la
bannière cookies **disparaissent simplement**. Vérifié sur le build local sans
`.env` :

| Variable absente | Effet observé dans `dist/` |
| --- | --- |
| `PUBLIC_GTM_ID` | `containerId: ""`, `enabled: false` → aucun tag ne part |
| `PUBLIC_AXEPTIO_CLIENT_ID` | aucune occurrence de `axept.io` **et** bouton « Consentement des cookies » du footer non rendu |
| `PUBLIC_BREVO_TRACKER_CLIENT_KEY` | SDK Brevo non chargé |

Commande de contrôle après build (doit tout trouver, en prod) :

```sh
grep -o 'containerId: "[^"]*"' dist/fr.html   # attendu : GTM-PJ97WBV
grep -c 'axept.io'            dist/fr.html    # attendu : > 0
grep -c 'footer-consent'      dist/fr.html    # attendu : 1
```

### Variables à créer dans Cloudflare Pages (Settings → Environment variables → Production)

| Variable | Valeur | Statut |
| --- | --- | --- |
| `PUBLIC_GTM_ID` | `GTM-PJ97WBV` (reprise de `website/.env:32`) | **requis** |
| `PUBLIC_AXEPTIO_CLIENT_ID` | `5f64b3306b012e2c5e221168` (reprise du Twig) | **requis** |
| `PUBLIC_BREVO_TRACKER_CLIENT_KEY` | clé Brevo | requis si on garde le tracker |
| `PUBLIC_DEBUG_TRACKING` | `false` | laisser vide/false en prod |
| `PUBLIC_GA4_MEASUREMENT_IDS`, `PUBLIC_LINKEDIN_PARTNER_ID`, `PUBLIC_FACEBOOK_PIXEL_ID` | — | **non lues par le code** : ces tags partent depuis GTM, comme sur l'ancien site. Présentes dans `.env.example` seulement parce que le bundle analytics sait les gérer. |
| `KEYSTATIC_GITHUB_*`, `KEYSTATIC_SECRET` | — | inutiles ici (l'admin n'est pas déployé, voir §6) |

Ne **pas** les définir sur l'environnement Preview : les déploiements de preview
doivent rester muets (pas de pollution des stats, pas de bannière de test).

---

## 1. Axeptio / consentement cookies — le point le plus sensible

### Ce qui est en place

`src/components/head/Analytics.astro` est un portage fidèle du bloc de
`templates/_base.html.twig` de l'ancien site (lignes ~715-768), y compris le
Google Consent Mode :

```js
googleConsentMode: {
  default: { analytics_storage: "denied", ad_storage: "denied",
             ad_user_data: "denied", ad_personalization: "denied",
             wait_for_update: 500 }
}
```

Deux différences volontaires avec l'ancien site :
- le `clientId` n'est plus en dur, il vient de `PUBLIC_AXEPTIO_CLIENT_ID` ;
- `cookiesVersion` n'est plus en dur : c'est une propriété du marché
  (`src/i18n/markets.ts`), passée depuis `BaseLayout.astro`.

### Vigilance 1 — la variable manquante casse deux choses d'un coup

Si `PUBLIC_AXEPTIO_CLIENT_ID` est absente au build :

1. le SDK Axeptio n'est pas injecté → **aucune bannière de consentement**, et GTM
   se déclenche sans CMP (le Consent Mode `denied` par défaut n'est jamais posé
   non plus, puisqu'il est défini dans `window.axeptioSettings`) ;
2. `consentEnabled` dans `src/components/layout/Footer.astro:49` est gardé par la
   **même** variable → le bouton « Consentement des cookies » n'est pas rendu du
   tout. Plus aucun moyen visible de rouvrir le widget = manquement CNIL.

C'est le seul point de la MEP qui a une conséquence réglementaire directe. À
vérifier en premier après bascule.

### Vigilance 2 — `cookiesVersion` du marché `uk` est encore la version FR

`src/i18n/markets.ts` : le marché `uk` porte `cookiesVersion: 'izika-fr-EU'`
(TODO explicite en commentaire). Les visiteurs UK voient donc **l'UI de
consentement en français**.

Action avant d'ouvrir `/uk` au public : créer la version EN dans la console
Axeptio, puis remplacer la valeur (une ligne). Ce n'est pas bloquant pour la
bascule si `/uk` reste non annoncé, mais ça l'est pour le lancement UK.

**Le marché `ch-fr` porte la même valeur, mais volontairement** : l'UI de
consentement y est en français, ce qui est correct en Suisse romande, et un
opt-in satisfait *a fortiori* le régime d'opt-out de l'art. 45c let. b LTC.
Créer `izika-ch-fr` reste souhaitable pour le libellé des finalités (mention
nLPD/PFPDT), ce n'est pas un défaut de langue comme sur `/uk`. Voir le
commentaire dans `src/i18n/markets.ts` et `plans/pays/ch-suisse.md`.

### Vigilance 3 — `hasUserConsent: true` est en dur

`Analytics.astro` conserve tel quel le `hasUserConsent: true, // TODO` de
l'ancien Twig. Le wrapper `IzikaAnalytics` n'attend donc pas le consentement :
c'est **Axeptio + le Consent Mode** qui font le gating côté Google, pas notre
code. Ce comportement est identique à l'ancien site — on ne régresse pas — mais
il faut le savoir si un audit RGPD est demandé : le conteneur GTM se charge, ce
sont les tags à l'intérieur qui doivent respecter le Consent Mode.

### Vigilance 4 — ne pas réintroduire `openAxeptioCookies()`

Le bouton du footer appelle la file officielle du SDK
(`src/components/layout/Footer.astro:158-169`) :

```js
window._axcb = window._axcb || [];
window._axcb.push((sdk) => sdk.requestConsent());
```

La file est drainée par Axeptio à son initialisation, donc un clic avant le
chargement du SDK fonctionne quand même. **Ne pas revenir** à
`href="javascript:openAxeptioCookies()"` : c'était le lien de l'ancien Symfony
(`templates/_sections/footer_bottom_line.html.twig`), la fonction n'a jamais
existé — lien mort depuis toujours, corrigé le 2026-09-04.

### Contrôles post-MEP

- [ ] La bannière s'affiche à la première visite (navigation privée).
- [ ] Le bouton « Consentement des cookies » du footer la rouvre.
- [ ] Avant acceptation : aucun cookie `_ga` / publicitaire déposé.
- [ ] Après acceptation : les tags GTM se déclenchent (voir §2).

---

## 2. GTM / analytics

L'intégration est **conservée à l'identique** depuis l'ancien site :
`public/assets/analytics.js` est le bundle précompilé, binairement identique à
celui du Symfony (`cmp` OK) ; même init `IzikaAnalytics.analytics({ destination:
{ gtm: { containerId } } })` + `IzikaAnalytics.domTracker(...)`, en script inline
(pas de Partytown, volontairement : Axeptio doit s'exécuter avant GTM).

Points de vigilance :

- **Activation** : elle ne dépend plus de `app.environment == 'prod'` mais de la
  simple présence de l'ID (`analyticsEnabled = Boolean(gtmId)`). Le garde-fou
  « pas de tracking hors prod » repose donc entièrement sur le fait de **ne pas**
  définir `PUBLIC_GTM_ID` sur l'environnement Preview.
- **Tracking de clics** : les CTA passent par `src/components/ui/TrackedLink.astro`,
  qui pose l'attribut `data-track-click` lu par le bundle. Le contexte par défaut
  (`page_<dernier segment d'URL>`) reproduit l'ancien `defaultTrackingContext`,
  mais les segments d'URL ont changé (préfixe `/fr`, slugs). **Vérifier dans GTM
  que les déclencheurs/variables basés sur le contexte ou le path fonctionnent
  toujours**, et prévenir l'équipe data d'une rupture de série sur les URLs.
- Le bundle `analytics.js` est chargé sur toutes les pages même sans ID (script
  inerte, `enabled: false`). Sans importance fonctionnelle, mais c'est une
  requête de plus.

Contrôle post-MEP : Tag Assistant / onglet Réseau → `gtm.js?id=GTM-PJ97WBV`
chargé, `dataLayer` alimenté, un clic CTA génère l'événement attendu.

---

## 3. Redirections et SEO — la partie irréversible

C'est le poste de risque le plus élevé de la bascule : 37 articles changent
d'URL (`/{slug}` → `/fr/{slug}`) et la racine part sur `/fr`.

- `public/_redirects` contient les règles écrites à la main ; les 37 lignes
  d'articles sont **ajoutées au build** par `src/integrations/legacy-redirects.mjs`
  à partir du contenu de `src/content/articles/fr/`. Le fichier final fait 79
  lignes (vérifié). La carte de redirection ne peut donc pas dériver du contenu.
- ⚠️ **Ne jamais ajouter de catch-all `/:slug`** dans `_redirects` : sur
  Cloudflare Pages ce fichier est évalué **avant** les fichiers statiques, un
  catch-all avalerait `favicon.ico`, `robots.txt`, `/_astro/*`… Le commentaire en
  tête du fichier le rappelle ; le respecter.
- `/` → `/fr` en 301 est côté Cloudflare. `src/pages/index.astro` ne sert qu'au
  dev (meta-refresh, `noindex`) — en prod il n'est jamais atteint.
- **Décision restante** : `xDefaultMarket` (`src/i18n/markets.ts`) vaut `fr`.
  Basculer `/` et le hreflang x-default vers `/uk` est un changement d'une ligne,
  à trancher avant la MEP plutôt qu'après (changer la cible d'un 301 déjà indexé
  coûte cher).
- `public/wp-content/uploads/` (1,2 Mo) est conservé volontairement : ce sont les
  images des anciens articles WordPress, encore référencées par des liens
  externes. Ne pas nettoyer.
- `public/robots.txt` pointe le sitemap sur `https://izika.com/sitemap.xml`, et
  `site.url` (`src/config/site.ts`) vaut `https://izika.com` — vérifier que le
  domaine de production est bien celui-là (et pas `www.izika.com`) avant de
  brancher le DNS, sinon toutes les URLs canoniques et hreflang sont fausses.

### Après la bascule DNS

- [ ] Tester un échantillon de 301 : `/`, `/vtc`, `/indemnites-kilometriques`,
      `/fonctionnalites`, et 3-4 des 37 articles.
      (Le script `migration/check-redirects.sh` a été supprimé du repo ;
      récupérable via `git show`.)
- [ ] Vérifier qu'aucune redirection n'est en chaîne (les règles pointent
      directement l'URL finale, par construction — le confirmer sur 2-3 cas).
- [ ] Resoumettre `sitemap.xml` à Google Search Console et Bing.
- [ ] Surveiller le rapport hreflang GSC (paires `fr-FR` / `en-GB`).
- [ ] Surveiller les 404 dans les logs Cloudflare la première semaine.

---

## 4. Configuration Cloudflare Pages

- Build command : `npm run build` (= `KEYSTATIC_ADMIN=0 astro build` — désactive
  l'intégration Keystatic, le site déployé n'a donc **aucune route serveur**).
- Output directory : `dist` (déjà déclaré dans `wrangler.jsonc`).
- Node : `>=22.12.0` (`package.json` → `engines`). Fixer `NODE_VERSION` dans les
  variables Cloudflare si la version par défaut de la plateforme est plus basse.
- `public/_headers` ne pose que le cache immuable sur `/_astro/*`. Rien sur les
  en-têtes de sécurité : si un CSP/HSTS est attendu, c'est à ajouter ici (et à
  tester avec les scripts inline d'Axeptio/GTM, qui nécessiteraient des hash ou
  `unsafe-inline`).

---

## 5. Contenu et pages légales

- Les 3 pages légales `/uk` (`legal-notice`, `privacy-policy`, `terms`) sont des
  **traductions de courtoisie** : chaque page affiche « the French version
  prevails » et le droit applicable reste français. **Relecture juriste requise
  avant d'ouvrir `/uk` au public.**
- Bannière OpenGraph : `/uk` partage encore le visuel FR
  (`site.defaultOgImage`), et les captures produit du site anglais sont en
  français. Cosmétique, non bloquant pour la MEP FR.

Le reste du reste-à-faire du marché anglais est dans
`plans/decouplage-langue-pays.md`.

---

## 6. Admin Keystatic

L'admin **n'est pas déployé** : l'API Keystatic n'est pas compatible workerd
aujourd'hui. L'édition se fait en local (`npm run dev` → `/keystatic`, mode
`local`, écriture directe dans `src/content/`), puis commit. Voir
`docs/keystatic-admin.md` pour les options d'admin web (2ᵉ projet sur runtime
Node, mode GitHub).

À faire savoir aux éditeurs **avant** la MEP : publier un article demande un
commit/push, pas un simple clic dans une interface en ligne.

---

## 7. Checklist go / no-go

**Bloquants**

- [ ] `PUBLIC_AXEPTIO_CLIENT_ID` définie en Production **et** build relancé
- [ ] `PUBLIC_GTM_ID` définie en Production **et** build relancé
- [ ] Aucune variable de tracking sur l'environnement Preview
- [ ] Domaine de production = `izika.com` (cohérent avec `site.url`)
- [ ] Décision `xDefaultMarket` (`/` → `/fr` ou `/uk`) tranchée
- [ ] Relecture juriste des pages légales `/uk` (si `/uk` est ouvert au public)

**À vérifier dans l'heure qui suit la bascule**

- [ ] Bannière Axeptio à la première visite + bouton footer fonctionnel
- [ ] `gtm.js?id=GTM-PJ97WBV` chargé, `dataLayer` alimenté, un clic CTA tracké
- [ ] Échantillon de 301 (racine, alias, articles)
- [ ] `sitemap.xml` accessible, resoumis à GSC/Bing

**Dans la semaine**

- [ ] 404 Cloudflare surveillées
- [ ] Rapport hreflang GSC
- [ ] Positions des 37 articles migrés

**Fenêtre conseillée** : avant décembre, pour être stabilisé avant le pic de
recherche « barème kilométrique ».

---

## 8. Rollback

Le site est statique et l'ancien Symfony reste servable : le rollback est un
**changement DNS**, pas un redéploiement. Cloudflare Pages garde par ailleurs
l'historique des déploiements — un « Rollback » sur le déploiement précédent
suffit pour annuler une régression de contenu sans toucher au DNS.

Ne pas oublier : si on rollback le DNS après indexation des nouvelles URLs, les
301 `/{slug}` → `/fr/{slug}` disparaissent. Prévoir de les reproduire côté
Symfony si le retour arrière dure plus de quelques heures.

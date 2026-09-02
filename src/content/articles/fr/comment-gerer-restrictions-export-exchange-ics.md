---
title: Comment gérer les restrictions sur les exports Exchange ICS
description: >-
  Si certains de vos rendez-vous n'apparaissent pas dans notre application,
  alors qu'ils existent bien dans votre calendrier, votre serveur Exchange
  limite probablement la plage de dates exportées via votre lien ICS.
date: '2026-02-17'
---

# Comment gérer les restrictions sur les exports Exchange ICS

Si certains de vos rendez-vous n'apparaissent pas dans notre application, alors qu'ils existent bien dans votre calendrier, votre serveur Exchange limite probablement la plage de dates exportées via votre lien ICS.

Voici comment vérifier la cause et la corriger selon votre situation.

---

## Comprendre d'où vient la restriction

Quand vous connectez votre calendrier à notre application via un lien ICS, c'est votre serveur Exchange qui génère ce lien et décide quels événements y sont inclus. Deux paramètres peuvent être restrictifs :

- **La politique de publication (OWA)** : le serveur est configuré pour n'exporter que les événements des X derniers mois. Les données existent bien sur le serveur, mais ne sont pas incluses dans le lien ICS.
- **La politique de rétention** : le serveur supprime automatiquement les anciens événements après un certain délai. Les données ont disparu du serveur lui-même.

**Comment distinguer les deux ?** Connectez-vous à votre messagerie depuis un navigateur web et vérifiez si vos anciens rendez-vous sont visibles dans votre calendrier en ligne.

- Ils sont visibles → c'est une restriction de publication (cas 1)
- Ils ont disparu → c'est une rétention serveur (cas 2)

---

## Cas 1 — La restriction vient de la politique de publication ICS

Les données sont présentes sur le serveur, mais le lien ICS ne les exporte pas toutes. C'est la situation la plus fréquente.

**La solution dépend de qui gère votre serveur Exchange.**

### Vous utilisez Exchange via OVHcloud (Hosted Exchange ou Private Exchange)

OVH gère la configuration du serveur à votre place. Vous ne pouvez pas modifier ce paramètre vous-même.

**Procédure :**

1. Connectez-vous à votre espace client OVHcloud sur [ovh.com](https://www.ovhcloud.com/fr/)
2. Rendez-vous dans la rubrique **E-mails → Hosted Exchange** (ou Private Exchange)
3. Ouvrez un ticket au support OVH en précisant :

> *"Mon calendrier Exchange est connecté à une application tierce via un lien ICS. Les événements de plus de [X mois] ne sont pas inclus dans l'export. Pouvez-vous augmenter ou supprimer la limite de publication du calendrier ICS pour mon compte ?"*

Le support OVH pourra ajuster ce paramètre depuis leur interface d'administration.

### Vous utilisez Exchange on-premise (serveur géré par votre entreprise ou votre IT)

**Procédure :**

Transmettez ce message à votre administrateur système ou votre prestataire IT :

> *"Notre calendrier Exchange est connecté à une application tierce via un lien ICS. Les événements de plus de [X mois] ne sont pas exportés. Pouvez-vous augmenter ou supprimer la limite de publication du calendrier configurée dans la OwaMailboxPolicy ? La commande PowerShell concernée est `Set-OwaMailboxPolicy`".*

Votre administrateur saura quoi faire avec cette information.

### Vous utilisez Microsoft 365 (Exchange Online)

La configuration se fait depuis le **Centre d'administration Microsoft 365**.

**Procédure :**

Transmettez ce message à votre administrateur Microsoft 365 :

> *"Notre calendrier Exchange est connecté à une application tierce via un lien ICS. Les événements de plus de [X mois] ne sont pas exportés. Pouvez-vous vérifier et modifier les limites de publication de calendrier dans la politique OWA de notre tenant Microsoft 365 ?"*

---

## Cas 2 — Les anciens événements ont disparu du serveur

Si vos rendez-vous anciens n'apparaissent plus même dans votre messagerie web, une politique de rétention les a probablement supprimés ou archivés automatiquement.

### Vous utilisez Exchange via OVHcloud

Contactez le support OVH via votre espace client en précisant :

> *"Des événements de mon calendrier ont disparu. Ils ne sont plus visibles dans OWA. Avez-vous une politique de rétention active sur mon compte qui supprimerait automatiquement les anciens éléments de calendrier ? Si oui, est-il possible de la désactiver ou d'en récupérer les données archivées ?"*

> ⚠️ Si les données ont été définitivement supprimées, leur récupération n'est pas garantie. OVH conserve des sauvegardes quotidiennes pendant 14 jours — au-delà, la récupération n'est généralement plus possible.

### Vous utilisez Exchange on-premise ou Microsoft 365

Contactez votre administrateur système en précisant :

> *"Des événements anciens de mon calendrier ont disparu, y compris dans OWA. Je pense qu'une politique de rétention les supprime automatiquement. Pouvez-vous vérifier les Retention Policies appliquées aux éléments de calendrier sur mon compte et, si possible, récupérer les données archivées ?"*

---

## Toujours pas résolu ?

Si après ces démarches les événements manquants n'apparaissent toujours pas dans notre application, contactez notre support en indiquant :

- Depuis combien de temps en arrière les événements disparaissent dans l'application
- Le résultat de votre vérification dans la messagerie web (les données sont-elles visibles ou non ?)
- Votre type d'hébergement Exchange (OVH, Microsoft 365, serveur interne…)
- La réponse obtenue de votre IT ou de votre hébergeur

Nous pourrons ainsi vous accompagner plus précisément.

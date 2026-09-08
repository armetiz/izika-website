---
title: Intégration iCloud avec izika
description: >-
  Connectez votre agenda iCloud à izika et calculez automatiquement vos
  indemnités kilométriques. Procédure via import local ou lien ICS.
date: '2020-11-05'
note: >-
  Lien utilisé par l'application pour aider l'utilisateur à configurer son
  compte.
---

# Connecter iCloud à izika

**ATTENTION** : l'agenda iCloud **ne publie plus les rendez-vous antérieurs à 3 mois** dans le lien ICS. Conséquence : un lien ICS iCloud dans izika ne donnera accès qu'aux 3 derniers mois de rendez-vous, et ils s'effaceront au fur et à mesure.

**Solution recommandée** : utiliser la sauvegarde locale de votre agenda iCloud importée dans Google Agenda, puis connecter Google Agenda à izika.

### Comment utiliser l'agenda iCloud avec izika

#### Méthode recommandée : sauvegarde locale puis import dans Google Agenda

Pour chaque agenda iCloud à synchroniser, depuis un ordinateur :

1. Cliquez sur l'agenda professionnel dans l'application Calendrier
2. Cliquez sur **Fichier** → **Exporter** → **Exporter**
3. Choisissez le nom du fichier et l'extension ICS
4. Choisissez l'emplacement et validez

Ensuite dans Google Agenda :

1. Rendez-vous sur Google Agenda et **créez un nouvel agenda** en cliquant sur le **+** à côté de *Autres agendas*

![ajouter un agenda dans Google Calendar](/assets/articles/integration-apple-icloud-icalendar/ajouter-un-agenda-dans-google.png)

2. Dans les Paramètres de Google Agenda, cliquez sur **Importer** puis sélectionnez le fichier ICS exporté depuis iCalendar

![importer un agenda ICS dans Google agenda](/assets/articles/integration-apple-icloud-icalendar/importer-un-agenda-ics-dans-google.jpg)

3. Connectez ce Google Agenda à izika depuis les paramètres izika

#### Méthode alternative : lien ICS direct (limite à 3 mois)

Cette méthode ne permet d'accéder qu'aux 3 derniers mois de rendez-vous.

1. Connectez-vous à [icloud.com](https://www.icloud.com/#calendar)
2. Dans la liste des calendriers, cliquez sur le symbole de partage (icône wifi)
3. Cochez **Calendrier Public**
4. Cliquez sur **Copier le lien** puis **OK** — le lien ressemble à : `webcal://p**-calendars.icloud.com/published/*/lettresetchiffres`
5. Dans izika, allez dans **Paramètres** → **Agendas**
6. Cliquez sur **Ajouter un agenda via un lien ICS**
7. Collez le lien et validez

![icloud partage calendrier](/assets/articles/integration-apple-icloud-icalendar/icloud-partage-du-calendrier.jpg)

### En cas d'erreur en collant le lien URL

Si le message suivant s'affiche :

> *Une erreur est survenue. Le fichier que vous essayez d'importer n'est peut-être pas compatible.*

Cette erreur provient du système de sécurité d'iCloud. Résolution :

1. Désactivez le Calendrier public
2. Réactivez le Calendrier public
3. Copiez le **nouveau** lien et collez-le dans izika

### Problème avec l'authentification à deux facteurs (Two-Factor Authentication)

L'authentification à deux facteurs iCloud est incompatible avec la connexion ICS. Pour résoudre ce problème :

1. Allez sur votre [compte Apple ID](https://appleid.apple.com/)
2. Cliquez sur **Modifier** dans la section Sécurité
3. Désactivez le **Two-Factor Authentication**
4. Créez une question de sécurité et vérifiez votre date de naissance

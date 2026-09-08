---
title: Intégration Dolibarr avec izika — export ICS
description: >-
  Activez l'export ICS dans Dolibarr et connectez votre agenda à izika pour un
  calcul automatique des indemnités kilométriques en temps réel.
date: '2019-11-02'
note: >-
  Lien utilisé par l'application pour aider l'utilisateur à configurer son
  compte.
---

# Dolibarr : Module Agenda pour ics / iCalendar

Dolibarr propose un module Agenda permettant d'exporter vos rendez-vous au format ICS (iCalendar). Ce lien ICS est utilisé par izika pour synchroniser vos événements en temps réel.

## Activation du calendrier ICS Dolibarr

Dans l'interface Accueil, cliquez sur **Configuration** :

![Publication agenda Dolibarr ICS 1](/assets/articles/integration-dolibarr-module-agenda/publication-agenda-ics.png)

Ensuite **activez Évènements/agenda** dans les modules :

![Calendrier ICS Dolibarr activation](/assets/articles/integration-dolibarr-module-agenda/activation-calendrier-ics.png)

## Paramétrage du module Actions et agenda

Appliquez la **configuration** suivante sur le module Actions et agenda :

![Agenda Dolibarr configurer](/assets/articles/integration-dolibarr-module-agenda/configuration-agenda.png)

## Génération du lien ICS

Dans l'onglet **Export Calendrier**, cliquez sur **Générer** (la flèche circulaire). Cette action crée une clé d'autorisation aléatoire pour votre lien d'export.

![Calendrier ICS Dolibarr](/assets/articles/integration-dolibarr-module-agenda/calendrier-ics.png)

Copiez le second lien (ical/ics) — il contient la clé alphanumérique en fin d'URL.

## Ajouter l'agenda dans izika

Rendez-vous dans les **Paramètres** izika, onglet **Agendas**, puis utilisez le bouton **ICS** et collez le lien copié depuis Dolibarr.

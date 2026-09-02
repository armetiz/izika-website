---
title: Intégration O2S Harvest avec izika
description: >-
  Connectez O2S Harvest à izika via CalDAV et calculez automatiquement vos
  indemnités kilométriques depuis votre agenda de gestion de patrimoine.
date: '2021-01-10'
---

# Connecter O2S Harvest à izika

O2S est un ERP développé par Harvest pour les conseillers en gestion de patrimoine. Son agenda est accessible via le protocole CalDAV, ce qui permet à izika de synchroniser vos rendez-vous en temps réel.

## Procédure

Dans les paramètres izika, cliquez sur **Ajouter un agenda** puis **[Ajouter un agenda CalDAV](https://go.izika.com/app/settings/calendars/add-caldav)**.

Renseignez les informations suivantes :

- **URL CalDAV** : `https://www.office2s.com/office2s/caldav.php/calendars/**id**/o2s`
  *(remplacez **id** par votre identifiant O2S)*
- **Nom d'utilisateur** : votre identifiant O2S
- **Mot de passe** : votre mot de passe O2S

Cliquez sur **Ajouter l'agenda**.

**Exemple** pour un utilisateur dont l'identifiant est `jean.laval@gmail.com` :

- **URL CalDAV** : `https://www.office2s.com/office2s/caldav.php/calendars/jean.laval@gmail.com/o2s`
- **Nom d'utilisateur** : `jean.laval@gmail.com`

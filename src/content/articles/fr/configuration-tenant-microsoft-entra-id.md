---
title: Configuration d'izika dans votre Tenant Microsoft Entra ID
description: >-
  Ce guide vous accompagne dans l'autorisation de l'application izika au sein de
  votre organisation Microsoft 365 / Entra ID.
date: '2026-02-17'
---

# Configuration d'izika dans votre Tenant Microsoft Entra ID

> **À destination des administrateurs systèmes** — Ce guide vous accompagne dans l'autorisation de l'application izika au sein de votre organisation Microsoft 365 / Entra ID.

**Vous avez rencontré l'erreur "Approbation administrateur requise" en tentant de connecter votre compte Microsoft à izika ?** Vous êtes au bon endroit. Cette erreur apparaît lorsque votre organisation n'a pas encore autorisé izika dans son tenant Microsoft Entra ID — la procédure ci-dessous, à effectuer par un administrateur, résoudra ce blocage. N'hésitez pas à transférer ce lien à votre prestataire ou service technique.

---

## Sommaire

1. [Prérequis](#1-prérequis)
2. [Comprendre le consentement administrateur](#2-comprendre-le-consentement-administrateur)
4. [Configurer le Portail Entra ID](#3-configurer-le-portail-microsoft-entra-id)
5. [Vérification de la configuration](#4-vérification-de-la-configuration)
6. [Permissions accordées](#5-permissions-accordées)
7. [Révoquer l'accès](#6-révoquer-laccès)
8. [FAQ et résolution de problèmes](#7-faq-et-résolution-de-problèmes)

---

## 1. Prérequis

Avant de commencer, assurez-vous de disposer des éléments suivants :

- Un compte Microsoft avec l'un des rôles Entra ID suivants :
    - **Administrateur général** *(Global Administrator)*
    - **Administrateur d'application cloud** *(Cloud Application Administrator)*
    - **Administrateur d'application** *(Application Administrator)*
- Un accès au [portail Microsoft Entra](https://entra.microsoft.com) ou à l'[Azure Portal](https://portal.azure.com)

> ⚠️ **Important** : Sans l'un de ces rôles, vous ne pourrez pas accorder le consentement au nom de votre organisation. Contactez votre équipe IT si vous n'avez pas les droits nécessaires.

---

## 2. Comprendre le consentement administrateur

izika est une application **multi-tenant** enregistrée sur la plateforme Microsoft Identity. Pour que vos utilisateurs puissent connecter leur agenda Microsoft à izika, un administrateur doit au préalable **accorder le consentement à l'échelle du tenant**.

Cette opération :
- Enregistre automatiquement izika comme application d'entreprise dans votre tenant
- Autorise les permissions nécessaires pour tous les utilisateurs de l'organisation
- **N'est à réaliser qu'une seule fois** par l'administrateur — les utilisateurs n'auront pas à le faire individuellement

### Informations de l'application izika

| Champ | Valeur |
|---|---|
| **Nom** | izika |
| **ID Application (Client ID)** | `adfa92a3-ee74-4403-abf1-badc14bef325` |
| **ID Objet** | `4c04e5b5-0de3-40ee-967b-34cb7b9ee347` |
| **Type** | Application multi-tenant |
| **Éditeur** | izika.com |

---

## 3. Configurer le Portail Microsoft Entra ID

Si vous préférez passer par l'interface graphique du portail Entra ID, voici la procédure.

### Étape 1 — Accéder au portail Entra

Rendez-vous sur [https://entra.microsoft.com](https://entra.microsoft.com) et connectez-vous avec un compte administrateur.

### Étape 2 — Créer l'application d'entreprise

Naviguez vers :
**Entra ID → Applications → Applications d'entreprise → Nouvelle application**

Dans la barre de recherche, entrez `izika` ou utilisez l'option **"Ajouter depuis la galerie"**. Si izika n'apparaît pas dans la galerie, sélectionnez **"Créer votre propre application"** et renseignez l'ID Application :

```
adfa92a3-ee74-4403-abf1-badc14bef325
```

### Étape 3 — Accorder le consentement administrateur

Une fois l'application ajoutée, dans le menu de l'application, naviguez vers :
**Sécurité → Permissions → Accorder le consentement administrateur pour [Nom de votre organisation]**

Confirmez en cliquant sur **Oui**.

---

## 4. Vérification de la configuration

Après avoir accordé le consentement, vérifiez que tout est correctement configuré :

1. Allez dans **Entra ID → Applications → Applications d'entreprise**
2. Recherchez **izika** dans la liste
3. Cliquez sur l'application, puis sur **Sécurité → Permissions**
4. Vérifiez que les permissions listées en [section 6](#6-permissions-accordées) sont bien présentes avec le statut **"Accordé pour [votre organisation]"**

Vous pouvez également demander à un utilisateur de votre organisation de tenter d'ajouter son Agenda sur [go.izika.com](https://go.izika.com/app/settings) — il ne devrait pas être bloqué par un écran "Approbation requise".

---

## 5. Permissions accordées

Voici la liste détaillée des permissions que l'application izika demande, et la raison pour laquelle elles sont nécessaires :

| Permission | Type | Justification |
|---|---|---|
| `openid` | Déléguée | Authentification de l'utilisateur via OpenID Connect |
| `profile` | Déléguée | Accès aux informations de base du profil (nom, prénom) |
| `offline_access` | Déléguée | Maintien de la connexion sans ré-authentification fréquente (refresh token) |
| `User.Read` | Déléguée | Lecture des informations du compte Microsoft de l'utilisateur |
| `Calendars.Read` | Déléguée | Lecture des événements du calendrier Microsoft pour l'analyse des déplacements |

> 🔒 **Note de sécurité** : Toutes les permissions sont de type **déléguée** (*Delegated*), ce qui signifie qu'izika agit uniquement au nom de l'utilisateur connecté, et non avec des droits applicatifs globaux. izika n'accède aux données que de l'utilisateur qui a activé la synchronisation.

---

## 6. Révoquer l'accès

Si vous souhaitez retirer l'accès d'izika à votre organisation :

1. Rendez-vous dans **Entra ID → Applications → Applications d'entreprise**
2. Recherchez et sélectionnez **izika**
3. Dans **Propriétés**, cliquez sur **Supprimer**

Cela supprime le consentement accordé.

---

## 7. FAQ et résolution de problèmes

### Un utilisateur voit "Approbation requise" malgré la configuration

Cela peut arriver si le consentement a été accordé mais que l'utilisateur tente de se connecter avec un compte qui n'appartient pas à votre tenant. Vérifiez que l'utilisateur utilise bien son adresse email professionnelle.

Si le problème persiste, vérifiez dans le portail Entra que le consentement est bien marqué comme **"Accordé pour toute l'organisation"** (et non uniquement pour un utilisateur individuel).

### Puis-je limiter l'accès à certains utilisateurs seulement ?

Oui. Dans les propriétés de l'application izika dans Entra ID, activez **"Affectation d'utilisateur requise"** (*User assignment required*), puis affectez uniquement les utilisateurs ou groupes autorisés depuis l'onglet **Utilisateurs et groupes**.

### Comment contacter le support izika ?

Pour toute question relative à cette intégration, ecrivez nous à [contact@izika.com](mailto:contact@izika.com) en précisant votre domaine Microsoft et l'erreur rencontrée.

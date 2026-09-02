---
title: Comment diagnostiquer et résoudre un problème de synchronisation
description: >-
  Lorsque vous créez ou modifiez un rendez-vous sur votre appareil, celui-ci
  doit d'abord être **synchronisé vers le cloud** avant qu'izika puisse le
  récupérer.
date: '2026-02-20'
---

# Mes rendez-vous n'apparaissent pas dans izika — Comment diagnostiquer et résoudre un problème de synchronisation

## Comment fonctionne la connexion entre votre agenda et izika ?

izika ne se connecte pas directement à l'application agenda installée sur votre téléphone ou votre ordinateur. Il se connecte à votre **agenda cloud** — c'est-à-dire la version en ligne de votre calendrier, hébergée chez votre fournisseur (Google, Microsoft, etc.).

La chaîne de données fonctionne ainsi :

```
Votre application agenda (téléphone, PC)
            │
            │  synchronisation
            ▼
      Agenda cloud (Google, Outlook…)
            │
            │  connexion izika
            ▼
           izika
```

Lorsque vous créez ou modifiez un rendez-vous sur votre appareil, celui-ci doit d'abord être **synchronisé vers le cloud** avant qu'izika puisse le récupérer. Si cette première étape ne se produit pas correctement, izika ne verra jamais l'événement — et ce n'est pas un problème de connexion entre izika et votre fournisseur.

Dans la grande majorité des cas signalés, **le lien entre izika et votre agenda cloud fonctionne parfaitement**. Le problème se situe en amont : vos événements ne remontent pas jusqu'au cloud.

---

## Étape 1 — Identifier l'origine du problème

Avant toute chose, il faut déterminer si vos rendez-vous sont bien présents dans votre agenda cloud. Pour cela, rendez-vous directement sur l'interface web de votre fournisseur :

| Fournisseur | Interface web |
|---|---|
| Google Calendar | [calendar.google.com](https://calendar.google.com/) |
| Microsoft Outlook / Exchange | [outlook.office.com/calendar](https://outlook.office.com/calendar) |
| Apple iCloud | [icloud.com/calendar](https://www.icloud.com/calendar) |

**Connectez-vous avec le même compte que celui configuré dans izika**, puis vérifiez les points suivants :

1. **Comment saisissez-vous vos rendez-vous ?**
   Utilisez-vous l'application native de votre téléphone (Google Agenda, Calendrier iOS, Outlook mobile…), une application tierce, ou directement l'interface web ci-dessus ?

2. **Vos rendez-vous sont-ils visibles sur l'interface web ?**
    - **Oui** → Le problème vient d'izika ou de la configuration de la connexion. Contactez notre support en précisant que vos événements sont bien présents sur l'interface web.
    - **Non** → Le problème vient de la synchronisation entre votre appareil et le cloud. La suite de cet article vous guidera pour le résoudre.

3. **Vérifiez le bon calendrier**
   Sur l'interface web, assurez-vous que vous consultez bien le calendrier connecté à izika. Il est fréquent d'avoir plusieurs calendriers (personnel, professionnel, partagé…) et de saisir ses rendez-vous dans le mauvais.

---

## Étape 2 — Résoudre le problème de synchronisation

Si vos rendez-vous n'apparaissent pas sur l'interface web de votre fournisseur, voici les vérifications à effectuer.

### Vérifications générales (tous fournisseurs)

**Connexion internet**
Assurez-vous que votre appareil est bien connecté à internet au moment de la création du rendez-vous. Sans connexion, la synchronisation sera reportée et peut parfois rester bloquée.

**Compte connecté**
Vérifiez que l'application agenda sur votre appareil est bien connectée au même compte que celui configuré dans izika. Il suffit parfois d'une déconnexion silencieuse pour bloquer la synchronisation.

**Synchronisation manuelle**
Sur la plupart des applications, vous pouvez forcer une synchronisation manuellement :
- Ouvrez votre application agenda
- Cherchez une option « Actualiser », « Synchroniser » ou tirez la liste vers le bas (geste pull-to-refresh)

**Redémarrer l'application**
Fermez complètement l'application agenda (sans la laisser en arrière-plan) et rouvrez-la.

**Redémarrer l'appareil**
Un simple redémarrage résout souvent des blocages de synchronisation persistants.

---

### Google Calendar

- Ouvrez les **Paramètres** de votre téléphone > **Comptes** > **Google** > sélectionnez votre compte > vérifiez que **Calendar** est bien activé dans la liste des données synchronisées.
- Si la synchronisation est active mais bloquée, désactivez-la, attendez quelques secondes, puis réactivez-la.
- Sur Android, vous pouvez également aller dans **Paramètres** > **Applications** > **Google Agenda** > **Stockage** > **Vider le cache**, puis relancer l'application.

---

### Microsoft Outlook / Exchange

- Dans l'application Outlook mobile, allez dans **Paramètres** > votre compte > vérifiez que la synchronisation du calendrier est bien activée.
- Si vous utilisez l'application Calendrier native (Windows ou iOS/Android), vérifiez dans les paramètres du compte que la période de synchronisation n'est pas trop restreinte (certains réglages limitent la synchronisation aux 2 dernières semaines, par exemple).
- En entreprise, votre service informatique peut avoir appliqué des politiques restreignant la synchronisation sur certains appareils. N'hésitez pas à les contacter.

---

### Lien ICS (agenda en lecture seule)

Si vous utilisez un lien ICS pour connecter votre agenda à izika, sachez que ce type de connexion est souvent **mis en cache et actualisé toutes les 24 à 48 heures** selon les fournisseurs. Les événements récents peuvent donc apparaître avec un délai. Ce n'est pas un dysfonctionnement mais une limitation inhérente au format ICS.

> Attention : Apple iCloud ne permet pas de synchroniser les agendas au-delà d’une période de six mois.

---

## Toujours bloqué ?

Si après ces vérifications vos rendez-vous n'apparaissent toujours pas sur l'interface web de votre fournisseur, nous vous recommandons de :

1. **Créer un événement de test** directement depuis l'interface web (ex : calendar.google.com) et de vérifier s'il remonte dans izika dans les minutes suivantes. Cela permet de confirmer que la connexion izika ↔ cloud fonctionne bien.
2. **Contacter le support de votre fournisseur d'agenda** (Google, Microsoft…) pour un problème de synchronisation côté compte ou appareil.
3. **Contacter notre support izika** en indiquant clairement :
    - Votre fournisseur d'agenda
    - L'appareil et l'application utilisés pour saisir vos rendez-vous
    - Si vos événements sont visibles ou non sur l'interface web de votre fournisseur
    - Un exemple d'événement manquant avec le titre, date, heure du rendez-vous

Ces informations nous permettront de traiter votre demande beaucoup plus rapidement.

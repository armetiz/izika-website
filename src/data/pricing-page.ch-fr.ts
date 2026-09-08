import type { PricingPageCopy } from './pricing-page';
import { MARKETS } from '../i18n/markets';
import { localizedPath } from '../i18n/routes';
import { TAUX_ACTUEL, TAUX_ANTERIEUR } from './mileage-ch';
import { chfPerKm } from '../lib/format';

const pricing = MARKETS['ch-fr'].pricing;

/**
 * Page /ch-fr/pricing. Écrite, pas dérivée : le tableau comparatif français
 * annonce un « barème électrique » qui n'existe pas ici, et la FAQ
 * d'abonnement doit répondre aux questions suisses — devise, TVA,
 * rétractation, ancienneté de l'éditeur.
 *
 * Prix : plan Stripe suisse — CHF 149/an (Solo ∞) et CHF 12/mois/utilisateur
 * (Team). Ce ne sont PAS des conversions du tarif français : le pouvoir
 * d'achat suisse justifie un prix propre. Source unique :
 * MARKETS['ch-fr'].pricing, qui alimente aussi les offres JSON-LD.
 */
export const pricingPageChFr: PricingPageCopy = {
  hero: {
    heading:
      'Simplifiez vos frais kilométriques avec le logiciel le plus performant du marché.',
  },
  tiers: [
    { name: 'Solo', priceHtml: 'Gratuit' },
    { name: 'Solo', infinity: true, priceHtml: `CHF ${pricing.yearly} /an` },
    { name: 'Team', priceHtml: `CHF ${pricing.monthly} /mois /utilisateur` },
  ],
  tableAria: {
    infinity: 'illimité',
    included: 'inclus',
    notIncluded: 'non inclus',
    limited: 'limité',
  },
  featureSections: [
    {
      title: 'Fonctionnalités conducteur',
      rows: [
        { label: 'Déplacements illimités', cells: [{ limited: '10 déplacements/mois' }, 'yes', 'yes'] },
        { label: 'Calcul automatique des distances', cells: ['yes', 'yes', 'yes'] },
        { label: 'Pièces justificatives', cells: ['yes', 'yes', 'yes'] },
        { label: 'Gestion des provisions mensuelles', cells: ['yes', 'yes', 'no'] },
        { label: 'Synchronisation avec les agendas', cells: ['yes', 'yes', 'yes'] },
        { label: "Création d'adresses favorites", cells: ['yes', 'yes', 'yes'] },
        {
          label: `Gestion multi-véhicules / taux libre (${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou le vôtre)`,
          cells: ['yes', 'yes', 'yes'],
        },
        { label: 'Paramétrage du comportement par défaut (étoile/tournée)', cells: ['yes', 'yes', 'yes'] },
      ],
    },
    {
      title: 'Fonctionnalités entreprise',
      rows: [
        { label: 'Gestion des utilisateurs (équipes/superviseurs)', cells: ['no', 'no', 'yes'] },
        { label: "Flux d'approbation (validation, refus, pointage d'erreur)", cells: ['no', 'no', 'yes'] },
        { label: 'Exports complets personnalisés (gestion analytique)', cells: ['no', 'no', 'yes'] },
      ],
    },
  ],
  featuresCta: 'Découvrir toutes les fonctionnalités',
  faqTitle: "Questions fréquentes concernant l'abonnement",
  subscriptionFaq: [
    {
      question: 'Les prix sont-ils bien en francs suisses ?',
      answer: `<p>Oui. izika applique une tarification suisse propre — CHF ${pricing.yearly} par an pour Solo ∞ et CHF ${pricing.monthly} par mois et par utilisateur pour Team — et non une conversion du tarif français. La facturation se fait en CHF.</p>`,
    },
    {
      question: 'Puis-je annuler mon abonnement ?',
      answer: `<p>
        Oui, vous pouvez annuler votre abonnement quand vous le souhaitez, par e-mail ou depuis l'application.
        Vous aurez alors accès à l'application jusqu'à la fin de votre souscription.
    </p>`,
    },
    {
      question: 'Puis-je me rétracter après avoir souscrit ?',
      answer: `<p>
        Oui. Le droit suisse ne prévoit pas de droit de rétractation pour les achats en ligne, mais
        izika accorde <strong>contractuellement les mêmes 14 jours à ses clients suisses qu'à ses
        clients français</strong> : un seul régime, une seule implémentation, aucune différence
        selon votre pays de résidence.
        Les modalités figurent à l'article&nbsp;30 de nos
        <a href="${localizedPath('terms', 'ch-fr')}" class="underline">conditions générales de vente</a>.
    </p>`,
    },
    {
      question: 'Avez-vous une politique de remboursement ?',
      answer: `<p>Si vous n'êtes pas satisfait, et même si cela n'est pas systématique, nous pouvons effectuer un remboursement.</p>`,
    },
    {
      question: 'Comment se passe la facturation ?',
      answer: `<p>Les indépendants qui choisissent izika Solo reçoivent une facture annuelle par Utilisateur ;
        la souscription est renouvelée par tacite reconduction et le renouvellement peut être annulé à tout moment.
        Les organisations qui optent pour izika Team reçoivent une facture mensuelle
        pour chaque Utilisateur et une facture annuelle pour le compte Manager.
        L'abonnement peut aussi être annulé à tout moment.</p>`,
    },
    {
      question: 'Qui édite izika, et où sont mes données ?',
      answer: `<p>
        izika est édité par IZIKA SAS, société française indépendante fondée en 2014. L'application
        et vos données sont hébergées en Europe, chez un opérateur européen — hors cloud américain.
        Nous appliquons la <a href="${localizedPath('privacy', 'ch-fr')}" class="underline">nLPD suisse et le RGPD</a>
        et nous suivons une <a href="${localizedPath('security', 'ch-fr')}" class="underline">politique de sécurité</a> publique.
    </p>`,
    },
    {
      question: 'Puis-je traiter mes frais kilométriques des années passées ?',
      answer: `<p>Oui, en souscrivant vous accédez à tout l'exercice en cours, ainsi qu'aux 3 années précédentes,
        à condition que votre agenda le permette (ce n'est pas le cas des agendas iCloud par exemple).</p>`,
    },
  ],
};

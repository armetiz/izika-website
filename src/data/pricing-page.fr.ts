import type { PricingPageCopy } from './pricing-page';
import { MARKETS } from '../i18n/markets';
import { localizedPath } from '../i18n/routes';

const pricing = MARKETS.fr.pricing;

export const pricingPageFr: PricingPageCopy = {
  hero: {
    heading: 'Simplifiez vos frais kilométriques avec le logiciel le plus performant du marché.',
  },
  tiers: [
    { name: 'Solo', priceHtml: 'Gratuit' },
    //  : the price line keeps its non-breaking spaces (legacy rendering).
    { name: 'Solo', infinity: true, priceHtml: `${pricing.yearly}<sup>€</sup>  /an` },
    { name: 'Team', priceHtml: `${pricing.monthly}<sup>€</sup> /mois /utilisateur` },
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
        { label: 'Gestion multi-véhicules / barême électrique', cells: ['yes', 'yes', 'yes'] },
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
      question: 'Puis-je annuler mon abonnement ?',
      answer: `<p>
        Oui, vous pouvez annuler votre abonnement quand vous le souhaitez, par e-mail ou depuis l'application.
        Vous aurez alors accès à l'application jusqu'à la fin de votre souscription.
    </p>`,
    },
    {
      question: 'Avez-vous une politique de remboursement ?',
      answer: `<p>Si vous n'êtes pas satisfait, et même si cela n'est pas systématique, nous pouvons effectuer un remboursement.</p>`,
    },
    {
      question: 'Comment se passe la facturation?',
      answer: `<p>Les entrepreneurs choisissant izika Solo ont une facture annuelle par Utilisateur,
        la souscription est renouvelée par tacite reconduction et vous pouvez annuler
        le renouvellement à tout moment.
        Les gestionnaires de flottes qui optent pour izika Team ont une facture mensuelle
        pour chaque Utilisateur et une facture annuelle pour le compte Manager.
        L'abonnement peut aussi être annulé à tout moment.</p>`,
    },
    {
      question: "Qu'en est il de la sécurité et confidentialité ?",
      answer: `<p>
        IZIKA SAS est une société Française qui existe depuis 2014, nous avons une
        <a href="${localizedPath('security', 'fr')}" class="underline">politique de sécurité</a> que nous respectons scrupuleusement.
    </p>`,
    },
    {
      question: 'Est ce que je peux gérer mes indemnités kilométriques pour les années passées ?',
      answer: `<p>Oui, en souscrivant vous accédez à toute l'année en cours, ainsi qu'aux 3 années précédentes,
        à condition que votre agenda le permette (ce n'est pas le cas des agendas iCloud par exemple).</p>`,
    },
  ],
};

import type { HomePageCopy } from './home-page';
import { homePageFr } from './home-page.fr';
import { MARKETS } from '../i18n/markets';
import { TAUX_ACTUEL } from './mileage-ch';
import { chfPerKm } from '../lib/format';

const pricing = MARKETS['ch-fr'].pricing;

/**
 * Accueil du marché suisse. Dérivé de home-page.fr.ts pour tout ce qui décrit
 * le PRODUIT (captures, logos d'agendas, mécanique d'import), réécrit pour
 * tout ce qui touche au PAYS.
 *
 * La règle du marché : `/ch-fr` partage le dictionnaire `src/i18n/fr.ts` avec
 * `/fr`, donc rien de suisse ne peut y descendre. Toute divergence vit ici ou
 * sur le Market. Ce qui est réécrit et pourquoi :
 * - les prix (CHF 149/an, CHF 12/mois/utilisateur — plan Stripe suisse) et
 *   le libellé de devise, absent du contrat de type ;
 * - la promesse fiscale : « conforme aux normes fiscales » n'a pas de
 *   référent suisse, remplacé par le règlement de frais ;
 * - le bloc Team, qui porte ici l'argument de l'art. 327a CO ;
 * - l'ancienneté « 3500 indépendants » est conservée : c'est un fait
 *   d'entreprise, pas une revendication de marché local.
 */
export const homePageChFr: HomePageCopy = {
  ...homePageFr,
  hero: {
    ...homePageFr.hero,
    title: 'Vos frais kilométriques en un temps record',
    lead: `Votre temps est précieux : obtenez votre relevé de frais kilométriques en 10 minutes, au taux de votre règlement de frais.`,
  },
  works: {
    ...homePageFr.works,
    title: 'Comment izika calcule vos indemnités kilométriques ?',
    provisionsCard: {
      ...homePageFr.works.provisionsCard,
      title: 'Vous êtes remboursé mensuellement ?',
      tagline: "Aucun problème, c'est prévu.",
      textHtml:
        "izika calcule des provisions mensuelles indicatives tout au long de l'exercice. Reportez les montants réellement perçus mois par mois et izika en tient compte automatiquement lors de l'édition du relevé annuel.",
    },
    exportCard: {
      ...homePageFr.works.exportCard,
      title: 'Éditez votre relevé de frais',
      tagline: "C'est déjà fini 😮 ? Oui oui.",
      textHtml:
        "Une fois vos rendez-vous importés et vos déplacements affinés, éditez votre relevé prêt à être transmis à votre fiduciaire ou à votre service comptable. izika liste chaque déplacement professionnel avec le motif, l'adresse et la distance — exactement ce que l'administration fiscale demande de justifier.",
    },
    settingsCard: {
      ...homePageFr.works.settingsCard,
      textHtml:
        "Vous pouvez affiner vos paramètres et optimiser les traitements automatiques de l'application :<br> Configurez vos adresses de départ et de retour habituelles, le taux de votre règlement de frais, vos habitudes de déplacements : en tournée ou en étoile...",
    },
  },
  team: {
    ...homePageFr.team,
    eyebrow: 'Entreprises, associations, administrations',
    title: "Vous remboursez les frais de vos collaborateurs ? izika Team, c'est :",
    benefits: [
      'Toutes les fonctionnalités de izika Solo pour vos collaborateurs',
      "La preuve, déplacement par déplacement, que vous remboursez les frais imposés par le travail (art. 327a CO)",
      'Cartographie ultra fiable pour un calcul des distances précis et sans erreurs',
      'Centralisation des demandes de remboursement',
      "Rationalisation des flux d'approbation",
      "Le taux de votre règlement de frais appliqué à toute l'organisation",
    ],
  },
  pricing: {
    title: 'Tarification',
    ariaUnlimited: 'illimité',
    plans: [
      {
        name: 'Solo',
        price: 'Gratuit',
        features: [
          '10 trajets/mois',
          '1 Utilisateur',
          "Gestion d'adresses et de véhicules favoris",
          "Connexion à tous les types d'agenda",
          'Gestion des provisions mensuelles',
          'Relevés limités à 10 déplacements / mois',
        ],
        eventId: 'cta_section_pricing_free',
        ctaLabel: 'Tester gratuitement',
      },
      {
        name: 'Solo',
        nameSuffix: '∞',
        price: `CHF ${pricing.yearly}`,
        priceSuffix: '/ an',
        bigPrice: true,
        featured: true,
        features: [
          'Nombre illimité de trajets',
          '1 Utilisateur',
          "Gestion d'adresses et de véhicules favoris",
          "Connexion à tous les types d'agenda",
          `Taux libre : ${chfPerKm(TAUX_ACTUEL)} ou celui de votre règlement de frais`,
          'Relevé de frais kilométriques complet',
        ],
        eventId: 'cta_section_pricing_solo',
        ctaLabel: 'Tester gratuitement',
      },
      {
        name: 'Team',
        price: `CHF ${pricing.monthly}`,
        priceSuffix: '/ mois / utilisateur',
        features: [
          'Fonctionnalités de Solo',
          'Multi utilisateurs',
          "Gestion des utilisateurs (création d'équipe, définition de superviseur/manageur)",
          "Flux d'approbation des demandes de remboursement",
          'Gestion analytique des rendez-vous',
          'Pièces jointes associées aux rendez-vous',
          'Exports complets personnalisés',
        ],
        plusAfterFirst: true,
        eventId: 'cta_section_pricing_team',
        ctaLabel: 'Tester gratuitement pendant 2 mois',
      },
    ],
  },
};

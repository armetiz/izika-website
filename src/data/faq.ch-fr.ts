import { articlePath, localizedPath } from '../i18n';
import { TAUX_ACTUEL, TAUX_ANTERIEUR } from './mileage-ch';
import { chfPerKm } from '../lib/format';

/**
 * FAQ du marché suisse — source unique de l'accordéon /ch-fr/faq ET du
 * JSON-LD FAQPage (via faqPageSchema). Réponses en HTML rendues avec set:html.
 *
 * Écrite et non dérivée de faq.fr.ts : la version française répond URSSAF,
 * barème CGI, puissance fiscale et CNIL. En Suisse la question sous-jacente
 * n'est pas « quel barème ? » mais « qui fixe le taux, et ai-je droit à ce
 * remboursement ? ».
 */
export const faqEntriesCh: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Qui fixe le taux kilométrique applicable en Suisse ?',
    answer: `
        <p>
            <strong>L'entreprise, dans son règlement de frais</strong>, approuvé par
            l'administration fiscale de son canton sur la base du règlement type de la
            Conférence suisse des impôts. Il n'existe pas de barème kilométrique national
            opposable à tous.
        </p>
        <p>
            Le maximum admis fiscalement est de ${chfPerKm(TAUX_ACTUEL)} depuis le 1ᵉʳ janvier 2026
            (${chfPerKm(TAUX_ANTERIEUR)} auparavant), mais c'est le document approuvé pour votre
            entreprise qui fait foi — et une entreprise peut rembourser moins.
            <a href="${articlePath('reglement-de-frais-suisse', 'ch-fr')}">Comment s'établit un règlement de frais</a>.
        </p>`,
  },
  {
    question: "Mon employeur est-il obligé de rembourser mes frais de déplacement ?",
    answer: `
        <p>
            Oui. L'<strong>article 327a du Code des obligations</strong> impose à l'employeur de
            rembourser tous les frais imposés par l'exécution du travail, et son alinéa 3 frappe de
            nullité tout accord qui les mettrait à la charge du travailleur.
        </p>
        <p>
            Le remboursement n'est donc ni une faveur de l'employeur, ni une simple tolérance
            fiscale : c'est un <strong>droit du salarié</strong>.
            <a href="${articlePath('art-327a-co-remboursement-frais', 'ch-fr')}">Ce que dit exactement l'art. 327a CO</a>.
        </p>`,
  },
  {
    question: 'Comment déclarer ses frais kilométriques ?',
    answer: `
        <p>
            En produisant, pour chaque déplacement professionnel, le <strong>motif</strong> (la
            justification de la dépense dans l'intérêt de l'entreprise), l'<strong>adresse</strong>
            et la <strong>distance</strong>. C'est cette documentation qui rend le remboursement
            opposable à l'administration fiscale et le maintient hors du salaire déterminant.
        </p>
        <p>
            izika reconstitue ces trois informations automatiquement depuis les rendez-vous de
            votre agenda en ligne, et les compile dans un relevé prêt pour votre fiduciaire.
        </p>`,
  },
  {
    question: 'Quels taux kilométriques sont disponibles dans izika ?',
    answer: `
        <p>
            Tous. izika ne vous impose aucun barème : vous saisissez le taux de votre règlement de
            frais — ${chfPerKm(TAUX_ACTUEL)}, ${chfPerKm(TAUX_ANTERIEUR)} ou tout autre montant
            approuvé par votre canton — et l'application l'applique à l'ensemble de vos
            déplacements.
        </p>
        <p>
            Vous pouvez tester votre taux immédiatement avec notre
            <a href="${localizedPath('calculator', 'ch-fr')}">calculateur d'indemnités kilométriques</a>.
        </p>`,
  },
  {
    question: 'Comment connecter mon agenda à izika ?',
    answer: `
        <p>
            Vous pouvez connecter la plupart des agendas en ligne à izika : <strong>Google
            Calendar</strong> est l'agenda recommandé pour sa simplicité d'utilisation et sa
            fiabilité. izika calcule vos frais kilométriques depuis Google Agenda, Outlook, ICS,
            Dolibarr, Zimbra, etc.
        </p>
        <p>
            Des limitations imposées par Apple rendent l'agenda iCloud limité à 6 mois
            d'historique.
        </p>`,
  },
  {
    question: 'Mes données sont-elles en sécurité ?',
    answer: `
        <p>
            Oui. L'application et vos données sont hébergées en Europe, chez un opérateur européen
            — hors cloud américain — avec des systèmes de sécurité élevés. Les données de vos
            rendez-vous restent dans votre agenda en ligne, auquel izika n'accède qu'en lecture.
        </p>
        <p>
            IZIKA SAS traite des données professionnelles depuis 2014 pour plus de 9000 clients.
            Le traitement respecte la <strong>nLPD</strong> suisse — qui s'applique aux traitements
            déployant leurs effets en Suisse, même opérés depuis l'étranger — et le RGPD.
        </p>
        <p>
            <a href="${localizedPath('security', 'ch-fr')}" rel="nofollow">Politique de sécurité</a> ·
            <a href="${localizedPath('privacy', 'ch-fr')}" rel="nofollow">Charte de confidentialité</a>.
        </p>`,
  },
  {
    question: 'Le remboursement kilométrique est-il imposable ?',
    answer: `
        <p>
            Le remboursement de frais prévu par un règlement de frais approuvé n'est pas un élément
            de salaire : il n'est ni imposable ni soumis aux cotisations sociales, et n'a pas à
            figurer au certificat de salaire. Encore faut-il que chaque déplacement soit
            justifiable — date, motif, trajet, distance.
        </p>`,
  },
  {
    question: 'Puis-je me rétracter après avoir souscrit ?',
    answer: `
        <p>
            Oui, dans les 14 jours. Le droit suisse ne connaît pas de droit de rétractation pour la
            vente en ligne (les art. 40a ss CO ne visent que le démarchage), mais izika vous accorde
            <strong>contractuellement</strong> 14 jours pour changer d'avis, quel que soit votre
            pays de résidence.
            Voir l'article 30 de nos
            <a href="${localizedPath('terms', 'ch-fr')}">conditions générales de vente</a>.
        </p>`,
  },
  {
    question: "Je souhaite changer d'e-mail ?",
    answer: `<p>
            Si vous souhaitez modifier l'e-mail associé à votre compte, utilisez le chat pour nous
            contacter 24h/24, ou écrivez à <a href="mailto:contact@izika.com">contact@izika.com</a>.
        </p>`,
  },
];

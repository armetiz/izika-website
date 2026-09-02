import { articlePath, localizedPath } from '../i18n';

/**
 * FAQ entries (French) — single source of truth for the /fr/faq accordion AND
 * the FAQPage JSON-LD (via faqPageSchema). Answers are HTML strings rendered
 * with set:html; copy ported verbatim from templates/content/faq.html.twig.
 */
export const faqEntries: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Comment déclarer ses indemnités kilométriques ?',
    answer: `
        <p>
            Les <strong>indemnités kilométriques</strong> représentent le remboursement
            forfaitaire des frais liés à l’utilisation du véhicule personnel dans le
            cadre professionnel.</p>
        <p>
            Les normes fiscales imposent de justifier la déclaration d’IK en fournissant
            les motifs des déplacements (justification de la dépense dans l’intérêt de
            l’entreprise), l’adresse et la distance de <strong>chaque déplacement
                professionnel</strong> afin qu’il soit déductible et que l’assiette de
            calcul soit justifiée.
        </p>`,
  },
  {
    question: 'Comment connecter mon agenda à IZIKA ?',
    answer: `
        <p>
            Vous pouvez connecter la plupart des agendas en ligne à izika : <strong>Google Calendar</strong> est l'agenda recommandé pour sa simplicité
            d'utilisation et sa fiabilité. IZIKA calcule vos frais kilométriques depuis
            l'agenda Google, Outlook, ICS, Dolibarr, Zimbra, etc etc.
        </p>
        <p>
            Des limitations imposées par Apple rendent l'agenda iCloud limité à 6 mois
            d'historique.
        </p>`,
  },
  {
    question: 'Mes données sont-elles en sécurité ?',
    answer: `<p>
            Absolument :
            nos serveurs sont hébergés en France, chez Scaleway, et disposent de systèmes de
            sécurité élevés. De plus, les données de vos rendez-vous sont hébergées dans
            votre agenda en ligne, izika ne peut y accéder qu'en lecture.
        </p>
        <p>
            IZIKA SAS est une entreprise française de la région montpelliéraine.
            Nous traitons des données professionnelles depuis 2014 pour plus de 9000 clients et ce en
            toute sécurité. Enfin, vos données sont déclarées à la CNIL et traitées dans
            le respect de la RGPD.
        </p>
        <p>
            <a href="${localizedPath('security', 'fr')}" rel="nofollow">Politique de sécurité.</a>
        </p>`,
  },
  {
    question: "Que contient l'abonnement izika ?",
    answer: `<p>Votre abonnement payant à IZIKA vous garantit que vos données ne sont pas
            exploitées car notre seul revenu est votre abonnement. En souscrivant, vous
            accédez à toute l'année en cours jusqu'à la date du renouvellement, ainsi
            qu'à toute l'année précédente. Ex : abonnement le 12 mars 2019 : accès du
            1er janvier 2018 au 12 mars 2020. Si vous avez besoin d'accéder aux années
            précédentes, contactez-nous !
        </p>`,
  },
  {
    question: 'Quels barêmes d’indemnités kilométriques sont disponibles ?',
    answer: `<p>
            Tous les barèmes d'IK français en vigueur sont pré-saisis pour les voitures.</p>
            <p>
            Vous avez une moto ? Vous ne résidez pas en France ? Votre entreprise
            dispose d'un barème d'indemnités kilométriques spécifique ? Vous pouvez
            utiliser notre barème kilométrique sur mesure et appliquer le barème de
            votre choix pour tous les cas précités.
        </p>`,
  },
  {
    question: "Je souhaite changer d'email ?",
    answer: `<p>
            Si vous souhaitez modifier l'email associé à votre compte, utilisez le chat pour nous contacter 24h/24.
        </p>`,
  },
  {
    question: 'Comment izika sécurise la déclaration d’IK ?',
    answer: `<p>
            <strong>Motif du déplacement professionnel : </strong>
            Permet de justifier que le déplacement est fait dans l’intérêt de l’entreprise, conformément à la réglementation fiscale.
        </p>
        <p>
            <strong>Adresse du rendez-vous : </strong>
            Permet de calculer précisément la distance parcourue qui servira d’assiette au calcul du montant de l’indemnité kilométrique.
        </p>
        <p>
            <strong>Distance parcourue pour chaque rendez-vous : </strong>
            Permet de vérifier la justesse des calculs de l’assiette des indemnités kilométriques.
        </p>
        <p>
            <strong>Barème d’indemnités kilométriques retenu : </strong>
            Permet de prouver, en fonction du total kilométrique annuel par véhicule et de sa puissance fiscale en CV, le barème d’indemnités kilométriques à retenir.
        </p>`,
  },
  {
    question: 'Quel est le barème indemnités kilométriques 2025 ?',
    answer: `<p>
            Vous pouvez consultez notre article sur le <a href="${articlePath('bareme-indemnites-kilometriques-2025', 'fr')}">barème indemnités kilométriques 2025</a>.
        </p>`,
  },
];

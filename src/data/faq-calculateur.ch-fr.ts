import { articlePath } from '../i18n';

/**
 * FAQ de /ch-fr/calculateur-indemnites-kilometriques — même contrat que
 * faq-calculateur.fr.ts : ces entrées alimentent l'accordéon visible ET le
 * JSON-LD FAQPage (les deux doivent rester identiques).
 *
 * Copy propre au marché suisse : elle ne partage rien avec la version
 * française, dont chaque réponse (barème CGI, puissance fiscale en CV,
 * majoration électrique, URSSAF) est factuellement fausse en Suisse.
 */
export const faqCalculateurEntriesCh: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Comment se calcule une indemnité kilométrique en Suisse ?',
    answer: `
        <p>
            Par une simple multiplication : <strong>distance × taux</strong>. Il n'y a ni tranche de
            distance, ni puissance fiscale, ni majoration pour véhicule électrique : le même taux
            s'applique à tous vos kilomètres. Le forfait couvre l'ensemble des frais du véhicule
            — carburant ou électricité, assurance, amortissement, entretien, pneus.
        </p>
        <p>
            Exemple pour 12’000 km par an au taux de CHF 0.75 :
            12’000 × 0.75 = <strong>9’000.00&nbsp;CHF</strong>.
        </p>`,
  },
  {
    question: 'CHF 0.75 ou CHF 0.70 : quel taux dois-je appliquer ?',
    answer: `
        <p>
            <strong>Celui que dit le règlement de frais de votre employeur</strong>, et lui seul.
            CHF 0.75 est le <em>maximum admis fiscalement</em> depuis le 1ᵉʳ janvier 2026, CHF 0.70
            l'était jusqu'au 31 décembre 2025.
        </p>
        <p>
            Les deux circulent donc aujourd'hui. Une entreprise dont le règlement de frais est déjà
            approuvé peut passer à CHF 0.75 <strong>sans le faire réapprouver</strong> par son
            canton ; celle qui reste à CHF 0.70 n'est pas en infraction pour autant — sous réserve
            que le forfait couvre réellement les frais, ce qu'exige l'art. 327a al. 2 CO.
        </p>
        <p>
            Détail et sources dans notre article :
            <a href="${articlePath('indemnite-kilometrique-suisse-2026', 'ch-fr')}">indemnité kilométrique en Suisse en 2026</a>.
        </p>`,
  },
  {
    question: "Existe-t-il un barème kilométrique officiel en Suisse ?",
    answer: `
        <p>
            <strong>Non.</strong> Il n'existe pas de barème kilométrique national opposable à
            tous. Le taux applicable figure au <strong>règlement de frais</strong> que
            l'entreprise fait approuver par l'administration fiscale de son canton, sur la base du
            règlement type de la Conférence suisse des impôts. Un règlement agréé par le canton du siège est en
            principe reconnu par les autres cantons.
        </p>
        <p>
            CHF 0.75 est le <em>maximum admis fiscalement</em>, largement repris, mais votre
            référence reste le document approuvé pour votre entreprise. C'est pour cela que ce
            calculateur vous laisse saisir votre propre taux.
        </p>
        <p>
            Comment un règlement de frais s'établit et se fait approuver :
            <a href="${articlePath('reglement-de-frais-suisse', 'ch-fr')}">notre guide du règlement de frais</a>.
        </p>`,
  },
  {
    question: "Mon employeur est-il obligé de me rembourser mes kilomètres ?",
    answer: `
        <p>
            <strong>Oui.</strong> L'article 327a du Code des obligations impose à l'employeur de
            rembourser au travailleur tous les frais imposés par l'exécution du travail, et son
            alinéa 3 frappe de nullité tout accord qui mettrait ces frais à la charge du salarié.
        </p>
        <p>
            Ce n'est pas une simple tolérance fiscale : c'est une
            <strong>obligation de droit du travail</strong>, à laquelle il ne peut pas être dérogé
            au détriment du salarié.
            <a href="${articlePath('art-327a-co-remboursement-frais', 'ch-fr')}">Ce que dit exactement l'art. 327a CO</a>.
        </p>`,
  },
  {
    question: "Les indemnités kilométriques sont-elles imposables en Suisse ?",
    answer: `
        <p>
            Le remboursement de frais effectifs ou forfaitaires prévu par un règlement de frais
            approuvé n'est pas un élément de salaire : il n'est ni imposable ni soumis aux
            cotisations sociales, et n'a pas à figurer au certificat de salaire dès lors que le
            règlement est approuvé par le canton du siège.
        </p>
        <p>
            La contrepartie est documentaire : il faut pouvoir justifier chaque déplacement — date,
            motif professionnel, trajet, distance. C'est exactement ce que produit
            <strong>izika</strong> à partir de votre agenda en ligne, sous forme d'un relevé prêt
            pour la comptabilité.
        </p>`,
  },
  {
    question: 'Et si je roule en véhicule électrique ?',
    answer: `
        <p>
            Le même taux s'applique. Le forfait suisse est indifférent à la motorisation : aucune
            majoration ne s'applique aux véhicules électriques, parce que le forfait est déjà censé
            couvrir l'ensemble des coûts du véhicule, quelle que soit son énergie.
        </p>`,
  },
];

/**
 * FAQ de la page /fr/calculateur-indemnites-kilometriques — même contrat que
 * faq.fr.ts : ces entrées alimentent l'accordéon visible ET le JSON-LD
 * FAQPage (les deux doivent rester identiques).
 */
export const faqCalculateurEntries: ReadonlyArray<{ question: string; answer: string }> = [
  {
    question: 'Comment est calculée une indemnité kilométrique ?',
    answer: `
        <p>
            Le montant se lit dans le <strong>barème kilométrique</strong> publié chaque année par
            l'administration fiscale. La formule dépend de trois paramètres : la
            <strong>puissance fiscale</strong> du véhicule (en CV), la <strong>distance
            professionnelle parcourue sur l'année</strong> et, pour les tranches intermédiaires,
            un <strong>montant forfaitaire</strong> ajouté au produit distance × coefficient.
        </p>
        <p>
            Exemple pour une voiture de 5 CV et 4 000 km par an :
            4 000 × 0,636 = <strong>2 544 €</strong>.
        </p>`,
  },
  {
    question: 'Quel barème utiliser en 2025 ?',
    answer: `
        <p>
            Le barème applicable en 2025 est <strong>identique aux barèmes 2023 et 2024</strong> :
            la dernière revalorisation (+ 5,4 %) date du barème 2023. Vous choisissez l'année du
            barème en fonction de l'année des déplacements que vous déclarez.
        </p>`,
  },
  {
    question: "Pourquoi la distance est-elle ramenée à l'année ?",
    answer: `
        <p>
            Le barème est un <strong>barème annuel par tranches</strong> : jusqu'à 5 000 km,
            de 5 001 à 20 000 km et au-delà de 20 000 km pour une voiture (3 000 et 6 000 km
            pour une moto). Si vous saisissez une distance par semaine ou par mois, le simulateur
            la multiplie par 52 ou par 12 pour déterminer la tranche applicable, puis applique
            la formule de cette tranche à la distance annuelle.
        </p>`,
  },
  {
    question: 'Quelle majoration pour un véhicule électrique ?',
    answer: `
        <p>
            Le montant calculé avec le barème est <strong>majoré de 20 %</strong> pour un véhicule
            exclusivement électrique (voiture comme deux-roues). Un véhicule hybride suit le
            barème thermique, sans majoration.
        </p>`,
  },
  {
    question: 'Les indemnités kilométriques sont-elles imposables ?',
    answer: `
        <p>
            Pour le salarié ou le dirigeant remboursé au barème fiscal, les indemnités
            kilométriques sont <strong>exonérées d'impôt sur le revenu et de cotisations
            sociales</strong>, dans la limite du barème. Pour l'entreprise, elles constituent une
            charge déductible — à condition de pouvoir justifier chaque déplacement (date, motif,
            trajet, distance).
        </p>
        <p>
            C'est exactement ce que fait <strong>izika</strong> : vos déplacements sont détectés
            depuis votre agenda en ligne et votre état de frais kilométriques est généré
            automatiquement, prêt pour la comptabilité.
        </p>`,
  },
];

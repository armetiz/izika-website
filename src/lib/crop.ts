/**
 * Fenêtre de recadrage dans un master, en fractions (0–1) de l'image source.
 *
 * Un écran de l'app = **un seul fichier par marché**. Les cadrages qui étaient
 * autrefois des fichiers dérivés (`card-*`, `*-wide`, `*-tablet`) sont
 * déclarés ici, dans la copie, et rendus par `ScreenCrop.astro` : ils ne
 * coûtent plus un visuel à produire à chaque ouverture de marché.
 * Voir `plans/pays/03-inventaire-assets.md` § 4.3.
 *
 * Les fractions sont indépendantes de la résolution : un master ré-exporté
 * plus grand par la designer garde ses cadrages, tant que la **composition**
 * de l'écran ne bouge pas.
 */
export interface CropRect {
  /** Bord gauche de la fenêtre, en fraction de la largeur du master. */
  x: number;
  /** Bord haut de la fenêtre, en fraction de la hauteur du master. */
  y: number;
  /** Largeur de la fenêtre, en fraction de la largeur du master. */
  w: number;
  /** Hauteur de la fenêtre, en fraction de la hauteur du master. */
  h: number;
}

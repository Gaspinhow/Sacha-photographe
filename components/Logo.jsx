// Logo fourni par Sacha (dossier Logo_final).
//   horizontal : barre du haut, environ 40 px de haut
//   complet    : page Contact, à la place de « Sacha Nahum – Paris »
//   blanc      : même logo horizontal pour un fond sombre
// Les SVG restent nets à toutes les tailles, donc un seul fichier par variante suffit.
const VARIANTES = {
  horizontal: "/logo-horizontal-noir.svg",
  "horizontal-blanc": "/logo-horizontal-blanc.svg",
  complet: "/logo-complet-noir.svg",
};

export default function Logo({ variant = "horizontal", className = "", alt = "Sacha Nahum" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={VARIANTES[variant] || VARIANTES.horizontal}
      alt={alt}
      className={className}
      // Le logo est dans l'en-tête de chaque page : il ne doit jamais arriver en retard.
      loading="eager"
      decoding="async"
    />
  );
}

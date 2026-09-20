import imageSizes from "../data/image-sizes.json";

// Affiche une photo en laissant le navigateur choisir la largeur adaptée à
// l'écran. Les déclinaisons sont produites au build par
// scripts/generate-image-sizes.mjs ; sans entrée dans le manifeste, on retombe
// simplement sur le fichier d'origine.
//
// `sizes` décrit la place que prend la photo dans la page, par exemple
// "(max-width: 768px) 100vw, 50vw". C'est ce qui permet au navigateur de
// télécharger 800 px au lieu de 2400 sur un téléphone.
//
// `fill` reprend le comportement de next/image : la photo remplit son conteneur,
// qui doit être en position relative et porter le format voulu.
export function photoInfo(src) {
  return imageSizes[src] || null;
}

export default function Photo({ src, alt, sizes, priority = false, fill = false, className = "", ...rest }) {
  const info = photoInfo(src);
  const srcSet = info?.variants?.map((v) => `${v.src} ${v.w}w`).join(", ");

  return (
    // On n'utilise pas next/image à dessein : l'optimisation Vercel est désactivée
    // (elle est facturée), et les déclinaisons sont déjà produites au build.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      alt={alt}
      // Sans fill, largeur et hauteur réservent la place exacte : la page ne
      // sursaute pas pendant le chargement.
      width={fill ? undefined : info?.w}
      height={fill ? undefined : info?.h}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      className={fill ? `absolute inset-0 h-full w-full ${className}` : className}
      {...rest}
    />
  );
}

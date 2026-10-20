"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Photo from "./Photo";

// Une ligne de photos qui défile à l'horizontale : flèches sur ordinateur,
// glissement au doigt sur mobile. Les photos gardent leur format d'origine —
// seule la hauteur est fixée, la largeur suit le cadrage, donc rien n'est recadré.
export default function CarrouselPhotos({ images, titre, onOuvrir, lang = "FR", prioritaire = false }) {
  const piste = useRef(null);
  const [auDebut, setAuDebut] = useState(true);
  const [aLaFin, setALaFin] = useState(false);

  const majFleches = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    setAuDebut(el.scrollLeft <= 1);
    setALaFin(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    majFleches();
    const el = piste.current;
    if (!el) return;
    const observer = new ResizeObserver(majFleches);
    observer.observe(el);
    return () => observer.disconnect();
  }, [majFleches, images]);

  const defiler = (sens) => {
    const el = piste.current;
    if (!el) return;
    // On avance d'un écran moins un chevauchement, pour garder un repère visuel.
    el.scrollBy({ left: sens * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  const libelles = lang === "EN"
    ? { prev: `Scroll left — ${titre}`, next: `Scroll right — ${titre}`, ouvrir: (i) => `Open photo ${i}` }
    : { prev: `Défiler vers la gauche — ${titre}`, next: `Défiler vers la droite — ${titre}`, ouvrir: (i) => `Ouvrir la photo ${i}` };

  const fleche =
    "absolute top-1/2 -translate-y-1/2 z-10 hidden md:flex h-10 w-10 items-center justify-center " +
    "border border-black/15 bg-white/95 text-black transition-opacity hover:bg-black hover:text-white " +
    "disabled:pointer-events-none disabled:opacity-0";

  return (
    <div className="relative">
      <button type="button" aria-label={libelles.prev} onClick={() => defiler(-1)} disabled={auDebut} className={`${fleche} left-0`}>
        <span aria-hidden="true" className="text-lg leading-none">←</span>
      </button>

      <ul
        ref={piste}
        onScroll={majFleches}
        // snap-x : le défilement s'arrête proprement sur une photo
        className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((src, index) => (
          <li key={src} className="snap-start shrink-0">
            <button
              type="button"
              onClick={() => onOuvrir(index)}
              aria-label={libelles.ouvrir(index + 1)}
              className="block h-[42vw] max-h-[320px] min-h-[180px] cursor-zoom-in overflow-hidden bg-gray-50"
            >
              <Photo
                src={src}
                alt={`${titre} — ${index + 1}`}
                sizes="(max-width: 768px) 60vw, 420px"
                // Une seule photo de toute la page est prioritaire : marquer la
                // premiere de chaque reportage lancait 15 telechargements d'un coup.
                priority={prioritaire && index === 0}
                className="h-full w-auto max-w-none object-contain"
              />
            </button>
          </li>
        ))}
      </ul>

      <button type="button" aria-label={libelles.next} onClick={() => defiler(1)} disabled={aLaFin} className={`${fleche} right-0`}>
        <span aria-hidden="true" className="text-lg leading-none">→</span>
      </button>
    </div>
  );
}

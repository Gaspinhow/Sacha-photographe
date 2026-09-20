"use client";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// LOGO DU SITE
// Quand Sacha fournit le fichier : le déposer dans public/ (ex. public/logo.png)
// puis remplacer null ci-dessous par son chemin, ex. "/logo.png".
// Tant que c'est null, la place du logo reste blanche : rien de cassé,
// aucune requête inutile, et la mise en page ne bougera pas le jour du changement.
// ─────────────────────────────────────────────────────────────────────────────
export const LOGO_SRC = null;

export default function Logo({ className = "", placeholderClassName = "", alt = "Sacha Nahum" }) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    if (!LOGO_SRC) return;
    // Filet de sécurité : si le chemin est renseigné mais le fichier absent,
    // on garde le blanc plutôt qu'une image cassée.
    const probe = new window.Image();
    probe.onload = () => setAvailable(true);
    probe.src = LOGO_SRC;
  }, []);

  if (!LOGO_SRC || !available) {
    return <span aria-hidden="true" className={`block ${placeholderClassName || className}`} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={LOGO_SRC} alt={alt} className={className} />
  );
}

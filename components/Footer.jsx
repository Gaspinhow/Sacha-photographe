"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from "../app/context/LanguageContext";
import { EMAIL, TELEPHONE_AFFICHE, TELEPHONE_LIEN, LINKEDIN, INSTAGRAM } from "../lib/coordonnees";

export default function Footer() {
  const { lang } = useLanguage();

  const content = {
    FR: {
      copyright: "Tous droits réservés",
      mentions: "Mentions légales",
      confidentialite: "Confidentialité",
      credits: "Conçu par",
      backToTop: "Retour en haut",
      coordonnees: "Coordonnées",
    },
    EN: {
      copyright: "All rights reserved",
      mentions: "Legal notice",
      confidentialite: "Privacy",
      credits: "Designed by",
      backToTop: "Back to top",
      coordonnees: "Contact details",
    }
  };

  const t = content[lang];
  const lien = "hover:opacity-50 transition-opacity";

  return (
    <footer className="w-full bg-white border-t border-black py-14 px-6 md:px-12 font-serif text-black">
      <div className="max-w-[1400px] mx-auto flex flex-col gap-10">

        {/* Coordonnees : le cahier demande email, telephone, LinkedIn et Instagram au pied de page */}
        <nav aria-label={t.coordonnees} className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[10px] uppercase tracking-[0.25em]">
          <a href={`mailto:${EMAIL}`} className={lien}>{EMAIL}</a>
          <a href={`tel:${TELEPHONE_LIEN}`} className={lien}>{TELEPHONE_AFFICHE}</a>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={lien}>LinkedIn</a>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className={lien}>Instagram</a>
          <Link href="/mentions-legales" className={lien}>{t.mentions}</Link>
          <Link href="/confidentialite" className={lien}>{t.confidentialite}</Link>
        </nav>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-t border-black/10 pt-8">
          <p className="text-[10px] uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} Sacha Nahum — {t.copyright}
          </p>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-[9px] uppercase tracking-[0.4em] border-b border-black pb-1 hover:opacity-40 transition-all"
            >
              {t.backToTop}
            </button>
            <span className="text-[10px] uppercase tracking-[0.25em] font-light italic">
              {t.credits} <span className="font-medium not-italic">Gaspar Lebacq</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}

"use client";
import React from 'react';
import Link from 'next/link';
// Vérifie bien ce chemin selon ton dossier app ou src
import { useLanguage } from "../app/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const content = {
    FR: {
      copyright: "Tous droits réservés",
      mentions: "Mentions Légales",
      credits: "Conçu par",
      backToTop: "Retour en haut"
    },
    EN: {
      copyright: "All rights reserved",
      mentions: "Legal Notice",
      credits: "Designed by",
      backToTop: "Back to top"
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-16 px-6 md:px-12 font-serif">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Copyright & Nom - Noir pur et espacement large */}
        <div className="text-[10px] uppercase tracking-[0.4em] text-black font-medium text-center md:text-left">
          © {new Date().getFullYear()} SACHA NAHUM — {content[lang].copyright}
        </div>

        {/* Bouton Retour en haut - Discret et élégant */}
        <button 
          onClick={scrollToTop}
          className="text-[9px] uppercase tracking-[0.5em] text-black border-b border-black pb-1 hover:opacity-40 transition-all"
        >
          {content[lang].backToTop}
        </button>

        {/* Liens secondaires & Crédits avec ta signature */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
          <Link href="/legal" className="text-[10px] uppercase tracking-[0.3em] text-black/50 hover:text-black transition-colors">
            {content[lang].mentions}
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/30 font-light italic">
            {content[lang].credits} <span className="text-black font-medium not-italic">Gaspar Lebacq</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
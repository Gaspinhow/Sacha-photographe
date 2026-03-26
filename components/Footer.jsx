"use client";
import React from 'react';
import Link from 'next/link';
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
    // Suppression du gris (border-t border-black)
    <footer className="w-full bg-white border-t border-black py-16 px-6 md:px-12 font-serif text-black">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
        
        {/* Copyright & Nom - Noir pur strict */}
        <div className="text-[10px] uppercase tracking-[0.4em] font-medium text-center md:text-left">
          © {new Date().getFullYear()} SACHA NAHUM — {content[lang].copyright}
        </div>

        {/* Bouton Retour en haut - Aligné sur le style minimaliste */}
        <button 
          onClick={scrollToTop}
          className="text-[9px] uppercase tracking-[0.5em] border-b border-black pb-1 hover:opacity-40 transition-all"
        >
          {content[lang].backToTop}
        </button>

        {/* Liens & Signature Gaspar Lebacq */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
          {/* CORRECTION DU LIEN : on met /mentions-legales pour stopper la 404 Google */}
          <Link href="/mentions-legales" className="text-[10px] uppercase tracking-[0.3em] hover:opacity-40 transition-opacity">
            {content[lang].mentions}
          </Link>
          
          <span className="text-[10px] uppercase tracking-[0.3em] font-light italic">
            {content[lang].credits} <span className="font-medium not-italic">Gaspar Lebacq</span>
          </span>
        </div>

      </div>
    </footer>
  );
}
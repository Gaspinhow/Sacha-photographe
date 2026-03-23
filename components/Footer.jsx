"use client";
import React from 'react';
import Link from 'next/link';
// 1. IMPORT DU HOOK GLOBAL (Attention au chemin selon ton arborescence)
import { useLanguage } from "../app/context/LanguageContext";

export default function Footer() {
  const { lang } = useLanguage();

  // 2. DICTIONNAIRE DE TRADUCTION
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
    <footer className="w-full bg-white border-t border-gray-100 py-12 px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Copyright & Nom */}
        <div className="text-[10px] uppercase tracking-[0.3em] text-gray-400">
          © {new Date().getFullYear()} SACHA NAHUM — {content[lang].copyright}
        </div>

        {/* Bouton Retour en haut (Optionnel mais pro) */}
        <button 
          onClick={scrollToTop}
          className="text-[9px] uppercase tracking-[0.4em] text-gray-900 border-b border-black pb-1 hover:text-gray-400 hover:border-gray-400 transition-all"
        >
          {content[lang].backToTop}
        </button>

        {/* Liens secondaires & Crédits */}
        <div className="flex gap-8 items-center">
          <Link href="/legal" className="text-[10px] uppercase tracking-[0.3em] text-gray-400 hover:text-black transition-colors">
            {content[lang].mentions}
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-gray-200 font-light">
            {content[lang].credits} <span className="text-gray-400">EPI</span>
          </span>
        </div>

      </div>
    </footer>
  );
}

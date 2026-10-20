"use client";
import React from 'react';
import Link from 'next/link';
import Photo from "../components/Photo";
import { useLanguage } from "./context/LanguageContext";
import { REFERENCES_ACCUEIL } from "../data/clients.config.mjs";

export default function HomeSections() {
  const { lang } = useLanguage();

  const content = {
    FR: {
      documentary: "Documentaire",
      business: "Corporate",
      titre: "Photographe événementiel et corporate à Paris",
      phrase: "Conventions, salons, conférences et portraits pour les entreprises, les agences et les institutions.",
      references: "Ils m'ont fait confiance",
    },
    EN: {
      documentary: "Documentary",
      business: "Corporate",
      titre: "Event and corporate photographer in Paris",
      phrase: "Conventions, trade shows, conferences and portraits for companies, agencies and institutions.",
      references: "Trusted by",
    }
  };

  return (
    <main className="min-h-screen bg-white pt-32 md:pt-48 pb-24 px-4 md:px-12 flex flex-col items-center justify-center font-serif text-black">
      
      {/* Seul ajout demandé par le cahier V2 : un court texte au-dessus des photos */}
      <header className="max-w-[1400px] w-full mb-12 md:mb-20 text-center">
        <h1 className="text-xl md:text-3xl lg:text-4xl tracking-[0.08em] leading-snug">
          {content[lang].titre}
        </h1>
        <p className="mt-5 mx-auto max-w-2xl text-xs md:text-sm leading-relaxed font-light">
          {content[lang].phrase}
        </p>
        <p className="sr-only">{content[lang].references}</p>
        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[9px] md:text-[10px] uppercase tracking-[0.25em] text-black/75">
          {REFERENCES_ACCUEIL.map((nom, i) => (
            <li key={nom} className="flex items-center gap-5">
              {i > 0 && <span aria-hidden="true" className="text-black/30">·</span>}
              {nom}
            </li>
          ))}
        </ul>
      </header>

      {/* Grille Mosaïque (2 colonnes) */}
      <div className="max-w-[1400px] w-full grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-10 items-start">
        
        {/* BLOC DOCUMENTAIRE (Reportage) */}
        <Link href="/reportage" className="group block w-full text-center">
          {/* Conteneur Image avec zoom hover */}
          <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm mb-4 mx-auto">
            <Photo 
              src="/images-compressed/indexacc.webp" 
              alt="Reportage documentaire"
              fill
              className="object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
              sizes="(max-width: 768px) 50vw, 50vw"
              priority
            />
          </div>
          {/* Titre : BIEN CENTRÉ, Noir Pur, toujours visible */}
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-center">
            {content[lang].documentary}
          </h2>
        </Link>

        {/* BLOC CORPORATE */}
        {/* Ajout de 'text-center' pour forcer le centrage de tout le bloc */}
        <Link href="/corporate" className="group block w-full text-center">
          {/* Conteneur Image avec zoom hover */}
          {/* Ajout de 'mx-auto' pour s'assurer que le bloc image est bien au centre */}
          <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm mb-4 mx-auto">
            <Photo 
              src="/images-compressed/indexcorp.webp" 
              alt="Photographie corporate"
              fill
              className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 50vw"
              priority
            />
            {/* L'overlay texte qui apparaissait au survol a été supprimé ici */}
          </div>
          {/* Titre : EN DESSOUS, BIEN CENTRÉ, Noir Pur, toujours visible */}
          <h2 className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-medium text-center">
            {content[lang].business}
          </h2>
        </Link>

      </div>

      {/* Signature finale */}
      <div className="mt-20 md:mt-32 text-center">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] font-medium">
          Sacha Nahum — Photographe
        </p>
      </div>
    </main>
  );
}
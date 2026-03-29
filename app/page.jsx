"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  const content = {
    FR: { documentary: "Documentaire", business: "Corporate" },
    EN: { documentary: "Documentary", business: "Business" }
  };

  return (
    <main className="min-h-screen bg-white pt-32 md:pt-48 pb-24 px-4 md:px-12 flex flex-col items-center justify-center font-serif text-black">
      
      {/* Grille Mosaïque (2 colonnes) */}
      <div className="max-w-[1400px] w-full grid grid-cols-2 gap-x-4 md:gap-x-12 gap-y-10 items-start">
        
        {/* BLOC DOCUMENTAIRE (Reportage) */}
        <Link href="/reportage" className="group block w-full text-center">
          {/* Conteneur Image avec zoom hover */}
          <div className="relative overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm mb-4 mx-auto">
            <Image 
              src="/images/indexacc.jpg" 
              alt="Documentary Section"
              fill
              className="object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
              sizes="(max-width: 768px) 50vw, 50vw"
              quality={85}
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
            <Image 
              src="/images/indexcorp.jpg" 
              alt="Business Section"
              fill
              className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 50vw"
              quality={85}
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
          Sacha Nahum — Photography
        </p>
      </div>
    </main>
  );
}
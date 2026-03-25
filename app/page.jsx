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
    <main className="min-h-screen bg-white pt-32 md:pt-48 pb-24 px-4 md:px-12 flex flex-col items-center justify-center">
      
      {/* Correction Mobile : grid-cols-2 force l'affichage côte à côte.
          L'alignement est respecté selon le cahier des charges[cite: 68, 69].
      */}
      <div className="max-w-[1400px] w-full grid grid-cols-2 gap-4 md:gap-12 items-start">
        
        {/* Bloc Documentaire (Reportage) */}
        <Link 
          href="/reportage" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm"
        >
          <Image 
            src="/images/photo7.jpg" 
            alt="Documentary Section"
            fill
            className="object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
            sizes="(max-width: 768px) 50vw, 50vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-black/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-[10px] md:text-2xl font-serif uppercase tracking-[0.2em] md:tracking-[0.4em] pointer-events-none text-center px-2">
              {content[lang].documentary}
            </h2>
          </div>
        </Link>

        {/* Bloc Business (Corporate) */}
        <Link 
          href="/corporate" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm"
        >
          <Image 
            src="/images/slide6.jpg" 
            alt="Business Section"
            fill
            className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 50vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-black/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-[10px] md:text-2xl font-serif uppercase tracking-[0.2em] md:tracking-[0.4em] pointer-events-none text-center px-2">
              {content[lang].business}
            </h2>
          </div>
        </Link>

      </div>

      {/* Signature en Noir pur conformément au point 6.4 [cite: 64, 65] */}
      <div className="mt-20 md:mt-32 text-center">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-black font-medium">
          Sacha Nahum — Photography
        </p>
      </div>
    </main>
  );
}
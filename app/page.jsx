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
    <main className="min-h-screen bg-white pt-32 md:pt-48 pb-24 px-6 md:px-12 flex flex-col items-center justify-center">
      
      {/* Grille alignée : Plus de décalage mt-32 ou de largeurs différentes */}
      <div className="max-w-[1400px] w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
        
        {/* Bloc Documentaire */}
        <Link 
          href="/reportage" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm"
        >
          <Image 
            src="/images/photo7.jpg" 
            alt="Documentary Section"
            fill
            className="object-cover transition-transform duration-[2.5s] group-hover:scale-105" 
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-black/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].documentary}
            </h2>
          </div>
        </Link>

        {/* Bloc Business / Corporate - Maintenant aligné avec le premier */}
        <Link 
          href="/corporate" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm"
        >
          <Image 
            src="/images/slide6.jpg" 
            alt="Business Section"
            fill
            className="object-cover transition-transform duration-[2.5s] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 md:bg-black/10 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].business}
            </h2>
          </div>
        </Link>

      </div>

      {/* Signature en Noir pur */}
      <div className="mt-20 md:mt-32 text-center">
        <p className="text-[9px] md:text-[10px] uppercase tracking-[0.5em] text-black font-medium">
          Sacha Nahum — Photography
        </p>
      </div>
    </main>
  );
}
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
    <main className="min-h-screen bg-white pt-28 md:pt-40 pb-24 px-6 md:px-12 flex flex-col justify-center">
      
      {/* Container : On utilise items-start pour que le décalage mt-32 fonctionne bien */}
      <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
        
        {/* Bloc Documentaire - Plus large sur mobile */}
        <Link 
          href="/reportage" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-[92%] md:w-full shadow-sm"
        >
          <Image 
            src="/images/photo7.jpg" 
            alt="Documentary Section"
            fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-105 md:grayscale hover:grayscale-0" 
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 md:bg-black/5 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].documentary}
            </h2>
          </div>
        </Link>

        {/* Bloc Business / Corporate - Décalé à droite et vers le bas sur mobile */}
        <Link 
          href="/corporate" 
          className="group relative block overflow-hidden bg-gray-50 aspect-[4/5] md:aspect-[3/4] w-[85%] ml-auto md:w-full mt-12 md:mt-32 shadow-sm"
        >
          <Image 
            src="/images/slide6.jpg" 
            alt="Business Section"
            fill
            className="object-cover transition-transform duration-[2s] group-hover:scale-105 md:grayscale hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={75}
            priority
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 md:bg-black/5 md:opacity-0 group-hover:opacity-100 transition-all duration-700">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].business}
            </h2>
          </div>
        </Link>

      </div>

      <div className="mt-16 md:mt-24 text-center">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-gray-300 font-light italic">
          Sacha Nahum — Photography
        </p>
      </div>
    </main>
  );
}
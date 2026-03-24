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
    //pt-28 sur mobile pour ne pas être collé à la navbar
    <main className="min-h-screen bg-white pt-28 md:pt-40 pb-16 px-4 md:px-12 flex flex-col justify-center">
      
      {/* Container Responsive : 1 col sur mobile, 2 cols décalées sur PC */}
      <div className="max-w-[1300px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        
        {/* Bloc Documentaire */}
        <Link 
          href="/reportage" 
          className="group relative block overflow-hidden bg-gray-100 aspect-[4/5] md:aspect-[3/4] w-full shadow-sm"
        >
          <Image 
            src="/images/photo7.jpg" 
            alt="Documentary Section"
            fill
            // 🔥 RETOUR À OBJECT-COVER + EFFET N&B
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 md:grayscale hover:grayscale-0" 
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Overlay Texte */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 md:bg-black/5 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].documentary}
            </h2>
          </div>
        </Link>

        {/* Bloc Business / Corporate */}
        <Link 
          href="/corporate" 
          // md:mt-32 : garde le décalage élégant sur PC
          className="group relative block overflow-hidden bg-gray-100 aspect-[4/5] md:aspect-[3/4] w-full md:mt-32 shadow-sm"
        >
          <Image 
            src="/images/slide6.jpg" 
            alt="Business Section"
            fill
            // 🔥 RETOUR À OBJECT-COVER + EFFET N&B
            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105 md:grayscale hover:grayscale-0"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Overlay Texte */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/15 md:bg-black/5 md:opacity-0 group-hover:opacity-100 transition-all duration-500">
            <h2 className="text-white text-lg md:text-2xl font-serif uppercase tracking-[0.4em] pointer-events-none">
              {content[lang].business}
            </h2>
          </div>
        </Link>

      </div>

      {/* Signature */}
      <div className="mt-12 md:mt-24 text-center">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.6em] text-gray-300 font-light italic">
          Sacha Nahum — Photography
        </p>
      </div>
    </main>
  );
}
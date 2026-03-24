"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Reportage() {
  const { lang } = useLanguage();
  
  const realProjects = projects ? projects.filter(p => p.category === "reportage") : [];
  const placeholders = Array(6).fill({ isPlaceholder: true });

  const content = {
    FR: {
      quote: "Certaines histoires n'attendent pas. Certaines vies méritent d'être vues.",
      intro: "Au-delà du studio et du monde de l'entreprise, je porte mon appareil là où l'humanité se révèle dans sa forme la plus brute...",
      archive: "Archive"
    },
    EN: {
      quote: "Some stories don't wait. Some lives deserve to be seen.",
      intro: "Beyond the studio and the corporate world, I take my camera where humanity reveals itself in its rawest form...",
      archive: "Archive"
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-4 md:px-12 lg:px-20 text-gray-900">
      
      <header className="max-w-4xl mx-auto text-center mb-16 md:mb-32">
        <h1 className="text-lg md:text-3xl font-serif uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed italic px-2 text-black">
          "{content[lang].quote}"
        </h1>
        <p className="mt-8 md:mt-10 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 font-sans italic max-w-xl mx-auto leading-loose px-4">
          {content[lang].intro}
        </p>
      </header>

      {/* --- GRILLE KEOSYSTYLE MOBILE (2 colonnes asymétriques) --- */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-12 md:hidden px-2">
        {realProjects.map((item, index) => {
          // Alternance de ratios pour déstructurer
          const mobileRatios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[2/3]"];
          const currentRatio = mobileRatios[index % mobileRatios.length];
          // Décalage de la colonne de droite
          const isOffset = index % 2 === 1;

          return (
            <Link 
              key={item.id} 
              href={`/reportage/${item.id}`} 
              className={`group relative block w-full ${isOffset ? 'mt-12' : ''}`}
            >
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-50 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover" // ✅ Couleurs sur mobile
                  sizes="50vw"
                  quality={80}
                  priority={index < 4}
                />
                {/* Titre permanent en bas sur mobile */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                   <p className="text-[10px] uppercase tracking-[0.3em] text-white font-bold border-b border-white/40 pb-1">
                    {item.title}
                   </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* --- GRILLE ARCHIVE DESKTOP (William Keo PC) --- */}
      <div className="hidden md:block max-w-7xl mx-auto columns-2 md:columns-3 lg:columns-5 gap-10 space-y-10">
        {[...realProjects, ...placeholders].map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[2/3]", "aspect-[3/2]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-gray-50/60 border border-gray-100 flex items-center justify-center break-inside-avoid`}>
                <span className="text-[7px] uppercase tracking-[0.4em] text-gray-200">
                  {content[lang].archive} {2025 - index}
                </span>
              </div>
            );
          }

          return (
            <Link key={item.id} href={`/reportage/${item.id}`} className="group block break-inside-avoid mb-10">
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-[2s] group-hover:scale-110 md:grayscale hover:grayscale-0"
                  sizes="25vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
                   <p className="text-[10px] uppercase tracking-[0.4em] text-white font-bold border-b border-white/50 pb-2 leading-relaxed">
                    {item.title}
                   </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
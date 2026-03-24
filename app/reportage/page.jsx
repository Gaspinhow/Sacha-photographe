"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Reportage() {
  const { lang } = useLanguage();
  
  const realProjects = projects ? projects.filter(p => p.category === "reportage") : [];
  // On réduit un peu les placeholders sur mobile pour un meilleur confort de lecture
  const placeholders = Array(6).fill({ isPlaceholder: true });
  const allItems = [...realProjects, ...placeholders];

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
    // On ajuste les paddings pour le mobile (pt-28) et le desktop (pt-44)
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-6 md:px-12 lg:px-20 text-gray-900">
      
      <header className="max-w-4xl mx-auto text-center mb-16 md:mb-32">
        {/* Titre : text-lg sur mobile, text-3xl sur desktop. Tracking adapté */}
        <h1 className="text-lg md:text-3xl font-serif uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed italic px-2">
          "{content[lang].quote}"
        </h1>
        <p className="mt-8 md:mt-10 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 font-sans italic max-w-xl mx-auto leading-loose px-4">
          {content[lang].intro}
        </p>
      </header>

      {/* MOSAÏQUE DÉSTRUCTURÉE RESPONSIVE 
          1 colonne sur mobile, 2 sur tablette, 3 à 5 sur desktop
      */}
      <div className="max-w-7xl mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-6 md:gap-10 space-y-6 md:space-y-10">
        {allItems.map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[2/3]", "aspect-[3/2]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-gray-50/40 border border-gray-100 flex items-center justify-center break-inside-avoid opacity-40 md:opacity-100`}>
                <span className="text-[7px] uppercase tracking-[0.4em] text-gray-200">
                  {content[lang].archive} {2025 - index}
                </span>
              </div>
            );
          }

          return (
            <Link key={item.id} href={`/reportage/${item.id}`} className="group block break-inside-avoid mb-6 md:mb-10">
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-[1.5s] group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                {/* Overlay : Texte visible par défaut sur mobile (ou très léger) */}
                <div className="absolute inset-0 bg-black/30 md:bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                   <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] text-white font-bold border-b border-white/50 pb-2 leading-relaxed">
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
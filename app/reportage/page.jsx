"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Reportage() {
  const { lang } = useLanguage();
  
  const realProjects = projects ? projects.filter(p => p.category === "reportage") : [];
  const placeholders = Array(10).fill({ isPlaceholder: true });

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
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-4 md:px-12 lg:px-20 text-black">
      
      {/* HEADER : ALIGNÉ À GAUCHE & NOIR PUR */}
      <header className="max-w-4xl mx-auto text-left mb-16 md:mb-32">
        <h1 className="text-xl md:text-3xl font-serif uppercase tracking-[0.2em] leading-relaxed text-black">
          {content[lang].quote}
        </h1>
        <p className="mt-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-black font-sans leading-loose max-w-2xl">
          {content[lang].intro}
        </p>
      </header>

      {/* --- GRILLE ALIGNÉE (Mobile & Desktop) --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-10 max-w-7xl mx-auto">
        {[...realProjects, ...placeholders].map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[2/3]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-white border border-gray-100 flex items-center justify-center`}>
                <span className="text-[7px] uppercase tracking-[0.4em] text-black opacity-20">
                  {content[lang].archive}
                </span>
              </div>
            );
          }

          return (
            <Link key={item.id} href={`/reportage/${item.id}`} className="group relative block w-full">
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-50 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 20vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-black/15 md:bg-black/5 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                   <p className="text-[10px] uppercase tracking-[0.3em] text-white font-bold border-b border-white pb-1">
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
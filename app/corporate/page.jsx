"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Corporate() {
  const { lang } = useLanguage();

  const realProjects = projects ? projects.filter(p => p.category === "corporate") : [];
  // On réduit un peu le nombre de placeholders sur mobile pour éviter un scroll infini de cases vides
  const placeholders = Array(4).fill({ isPlaceholder: true });
  const allItems = [...realProjects, ...placeholders];

  const content = {
    FR: {
      title: "Commercial & Corporate",
      subtitle: "Archive Institutionnelle — Sacha Nahum",
      placeholder: "Archive Index"
    },
    EN: {
      title: "Commercial & Business",
      subtitle: "Institutional Archive — Sacha Nahum",
      placeholder: "Archive Index"
    }
  };

  return (
    // pt-28 sur mobile, pt-44 sur desktop
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-10 lg:px-16 text-gray-900">
      
      <header className="max-w-4xl mx-auto text-center mb-16 md:mb-32 px-4">
        {/* text-lg sur mobile, text-3xl sur desktop */}
        <h1 className="text-lg md:text-3xl font-serif uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed">
          {content[lang].title}
        </h1>
        <p className="mt-4 md:mt-6 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-gray-400 font-sans italic">
          {content[lang].subtitle}
        </p>
      </header>

      {/* MOSAÏQUE RESPONSIVE 
          On passe de 1 colonne (mobile) à 2 (tablette) puis 3 à 5 (desktop)
      */}
      <div className="max-w-[1600px] mx-auto columns-1 sm:columns-2 md:columns-3 lg:columns-5 gap-4 md:gap-8 space-y-4 md:space-y-8">
        {allItems.map((item, index) => {
          // Ratios variés pour l'effet mosaïque
          const ratios = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[2/3]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div 
                key={`empty-${index}`} 
                className={`w-full ${currentRatio} bg-gray-50/50 border border-gray-100/50 flex items-center justify-center break-inside-avoid opacity-50 md:opacity-100`}
              >
                <span className="text-[7px] uppercase tracking-[0.3em] text-gray-300">
                  {content[lang].placeholder}
                </span>
              </div>
            );
          }

          return (
            <Link 
              key={item.id} 
              href={`/reportage/${item.id}`} 
              className="group block break-inside-avoid mb-4 md:mb-8"
            >
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0]) || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                
                {/* Overlay : On le rend un peu plus présent sur mobile car pas de hover possible */}
                <div className="absolute inset-0 bg-black/30 md:bg-black/40 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6">
                   <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white font-bold text-center leading-relaxed">
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
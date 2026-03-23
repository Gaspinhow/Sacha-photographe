"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
// 1. On importe le hook pour écouter la langue globale
import { useLanguage } from "../context/LanguageContext"; 

export default function Corporate() {
  // 2. On récupère la langue (FR ou EN)
  const { lang } = useLanguage();

  const realProjects = projects ? projects.filter(p => p.category === "corporate") : [];
  const placeholders = Array(5).fill({ isPlaceholder: true });
  const allItems = [...realProjects, ...placeholders];

  // 3. Ton dictionnaire de traductions
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
    <main className="min-h-screen bg-white pt-40 pb-20 px-10">
      
      <header className="max-w-4xl mx-auto text-center mb-32">
        {/* 4. On utilise la langue ici */}
        <h1 className="text-xl md:text-3xl font-serif uppercase tracking-[0.5em] text-gray-900">
          {content[lang].title}
        </h1>
        <p className="mt-6 text-[10px] uppercase tracking-widest text-gray-400 font-sans italic">
          {content[lang].subtitle}
        </p>
      </header>

      {/* MOSAÏQUE CORPORATE */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-3 lg:columns-5 gap-10 space-y-10">
        {allItems.map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[2/3]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div 
                key={`empty-${index}`} 
                className={`w-full ${currentRatio} bg-gray-50/30 border border-gray-100 flex items-center justify-center break-inside-avoid`}
              >
                <span className="text-[7px] uppercase tracking-[0.3em] text-gray-200">
                  {content[lang].placeholder}
                </span>
              </div>
            );
          }

          return (
            <Link 
              key={item.id} 
              href={`/reportage/${item.id}`} 
              className="group block break-inside-avoid"
            >
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100 mb-2`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0]) || "/images/placeholder.jpg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  sizes="(max-w-768px) 100vw, 20vw"
                />
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                   <p className="text-[9px] uppercase tracking-[0.3em] text-white font-bold text-center leading-relaxed">
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
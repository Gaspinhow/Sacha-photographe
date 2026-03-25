"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Corporate() {
  const { lang } = useLanguage();

  const realProjects = projects ? projects.filter(p => p.category === "corporate") : [];
  const placeholders = Array(10).fill({ isPlaceholder: true });

  const content = {
    FR: { title: "Commercial & Corporate", subtitle: "Archive Institutionnelle — Sacha Nahum", placeholder: "Archive Index" },
    EN: { title: "Commercial & Business", subtitle: "Institutional Archive — Sacha Nahum", placeholder: "Archive Index" }
  };

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-4 md:px-12 lg:px-16">
      
      {/* Header : Aligné à gauche, plus centré, texte NOIR */}
      <header className="max-w-4xl mx-auto text-left mb-16 md:mb-32">
        <h1 className="text-xl md:text-3xl font-serif uppercase tracking-[0.2em] leading-relaxed text-black">
          {content[lang].title}
        </h1>
        <p className="mt-4 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-black font-sans font-medium">
          {content[lang].subtitle}
        </p>
      </header>

      {/* --- GRILLE ALIGNÉE (Mobile & Desktop) --- */}
      {/* On utilise grid au lieu de columns pour forcer l'alignement horizontal des cases */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 max-w-[1600px] mx-auto">
        {[...realProjects, ...placeholders].map((item, index) => {
          // Ratios variables mais HAUTS de cases alignés par la grille
          const ratios = ["aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/2]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-white border border-gray-100 flex items-center justify-center`}>
                <span className="text-[7px] uppercase tracking-[0.3em] text-black opacity-20">{content[lang].placeholder}</span>
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
                   <p className="text-[9px] uppercase tracking-[0.2em] text-white font-bold border-b border-white pb-1">
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
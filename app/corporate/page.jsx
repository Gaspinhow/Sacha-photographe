"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
import { useLanguage } from "../context/LanguageContext"; 

export default function Corporate() {
  const { lang } = useLanguage();

  const realProjects = projects ? projects.filter(p => p.category === "corporate") : [];
  const placeholders = Array(6).fill({ isPlaceholder: true });

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
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-6 md:px-12 lg:px-16 text-gray-900">
      
      <header className="max-w-4xl mx-auto text-center mb-20 md:mb-32 px-4">
        <h1 className="text-lg md:text-3xl font-serif uppercase tracking-[0.3em] md:tracking-[0.5em] leading-relaxed">
          {content[lang].title}
        </h1>
        <p className="mt-4 md:mt-6 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-widest text-gray-400 font-sans italic">
          {content[lang].subtitle}
        </p>
      </header>

      {/* --- FLUX MOSAÏQUE MOBILE (Visible uniquement sur Mobile) --- */}
      <div className="flex flex-col gap-12 md:hidden">
        {realProjects.map((item, index) => (
          <Link 
            key={item.id} 
            href={`/reportage/${item.id}`} 
            className={`group relative ${index % 2 === 0 ? 'w-[92%]' : 'w-[88%] ml-auto'}`}
          >
            <div className={`relative w-full ${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-square'} overflow-hidden bg-gray-50 shadow-sm`}>
              <Image
                src={item.coverImage || (item.images && item.images[0])}
                alt={item.title}
                fill
                className="object-cover"
                sizes="100vw"
                quality={75}
              />
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center p-6 text-center">
                 <p className="text-[9px] uppercase tracking-[0.3em] text-white font-bold border-b border-white/40 pb-2">
                  {item.title}
                 </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* --- GRILLE ARCHIVE DESKTOP (Visible à partir de Tablette) --- */}
      <div className="hidden md:block max-w-[1600px] mx-auto columns-2 md:columns-3 lg:columns-5 gap-8 space-y-8">
        {[...realProjects, ...placeholders].map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[1/1]", "aspect-[4/5]", "aspect-[3/2]", "aspect-[2/3]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div 
                key={`empty-${index}`} 
                className={`w-full ${currentRatio} bg-gray-50/50 border border-gray-100 flex items-center justify-center break-inside-avoid opacity-60`}
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
              className="group block break-inside-avoid mb-8"
            >
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100 shadow-sm`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-[2s] group-hover:scale-110 md:grayscale hover:grayscale-0"
                  sizes="20vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center">
                   <p className="text-[9px] uppercase tracking-[0.3em] text-white font-bold border-b border-white/50 pb-2 leading-relaxed">
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
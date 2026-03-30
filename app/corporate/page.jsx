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
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-4 md:px-12 lg:px-20 text-black font-serif">
      
      <header className="max-w-4xl mx-auto text-left mb-16 md:mb-32">
        <h1 className="text-xl md:text-3xl font-serif uppercase tracking-[0.2em] leading-relaxed text-black">
          {content[lang].title}
        </h1>
        <p className="mt-8 text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-black font-sans leading-loose max-w-2xl">
          {content[lang].subtitle}
        </p>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-10 md:gap-y-16 max-w-7xl mx-auto">
        {[...realProjects, ...placeholders].map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-square", "aspect-[2/3]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-white border border-black/5 flex items-center justify-center`}>
                <span className="text-[7px] uppercase tracking-[0.4em] text-black opacity-20 font-sans">
                  {content[lang].placeholder}
                </span>
              </div>
            );
          }

          return (
            /* IMPORTANT : On pointe vers /reportage/ car c'est là que se trouve ton fichier [id]/page.jsx */
            <Link key={item.id} href={`/reportage/${item.id}`} className="group block w-full text-center">
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-50 shadow-sm mb-4 mx-auto`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={85}
                />
              </div>
              
              <p className="text-[10px] uppercase tracking-[0.3em] text-black font-medium text-center px-2">
                {item.title}
              </p>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
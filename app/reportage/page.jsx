"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { projects } from "../../data/projects/index";
// ✅ IMPORT CORRIGÉ : On remonte d'un dossier pour trouver context
import { useLanguage } from "../context/LanguageContext"; 

export default function Reportage() {
  const { lang } = useLanguage();
  
  const realProjects = projects ? projects.filter(p => p.category === "reportage") : [];
  const placeholders = Array(10).fill({ isPlaceholder: true });
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
    <main className="min-h-screen bg-white pt-40 pb-20 px-10">
      <header className="max-w-4xl mx-auto text-center mb-32">
        <h1 className="text-xl md:text-3xl font-serif uppercase tracking-[0.5em] text-gray-900 leading-relaxed">
          "{content[lang].quote}"
        </h1>
        <p className="mt-10 text-[10px] uppercase tracking-[0.3em] text-gray-400 font-sans italic max-w-xl mx-auto leading-loose">
          {content[lang].intro}
        </p>
      </header>

      {/* MOSAÏQUE DÉSTRUCTURÉE */}
      <div className="max-w-7xl mx-auto columns-1 md:columns-3 lg:columns-5 gap-10 space-y-10">
        {allItems.map((item, index) => {
          const ratios = ["aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[2/3]", "aspect-[3/2]"];
          const currentRatio = ratios[index % ratios.length];

          if (item.isPlaceholder) {
            return (
              <div key={`empty-${index}`} className={`w-full ${currentRatio} bg-gray-50/50 border border-gray-100 flex items-center justify-center break-inside-avoid shadow-sm`}>
                <span className="text-[7px] uppercase tracking-[0.4em] text-gray-200">
                  {content[lang].archive} {2025 - index}
                </span>
              </div>
            );
          }

          return (
            <Link key={item.id} href={`/reportage/${item.id}`} className="group block break-inside-avoid">
              <div className={`relative w-full ${currentRatio} overflow-hidden bg-gray-100`}>
                <Image
                  src={item.coverImage || (item.images && item.images[0])}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                   <p className="text-[10px] uppercase tracking-[0.4em] text-white font-bold border-b border-white pb-2">
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
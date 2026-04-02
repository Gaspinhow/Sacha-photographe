"use client";
import React from 'react';
import Image from 'next/image';
import { useLanguage } from "../context/LanguageContext"; 

export default function QuiSuisJe() {
  const { lang } = useLanguage();

  const texts = {
    FR: {
      intro: "Je parcours le monde en quête de projets humains et sociaux qui racontent l'histoire d'autrui.",
      p1: "Photographe de formation technique et artistique, j'arpente les émotions, les paysages, les identités et les mœurs de nos sociétés en m'efforçant de les retranscrire en images, en histoires qui perdurent dans le temps.",
      p2: "Mon parcours m'a amené à travailler sur des projets variés: événements d'entreprise, reportages institutionnels, portraits artistiques. Mais aussi, plus personnellement, la rencontre avec des porteurs de soufre en Indonésie ou encore la découverte de la vie de marginaux de la banlieue parisienne.",
      p3: "Photographier ce qui nous entoure est une chance qui se doit d'être transmise, partagée entre frontières et générations. C'est, à mes yeux, un devoir de documenter la société humaine avec l'authenticité.",
    },
    EN: {
      intro: "I travel the world in search of human and social projects that tell the stories of others.",
      p1: "A photographer with both technical and artistic training, I explore emotions, landscapes, identities and the ways of our societies — striving to translate them into images, into stories that stand the test of time.",
      p2: "My journey has led me to work on a wide range of projects: corporate events, institutional reportages, artistic portraits. But also, on a more personal level, encounters with sulfur miners in Indonesia or glimpses into the lives of the marginalized in the suburbs of Paris.",
      p3: "Photographing what surrounds us is a privilege that must be passed on, shared across borders and generations. To me, it is a duty to document human society with authenticity.",
    }
  };

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        
        {/* Colonne Image - Look Mosaïque sur Mobile */}
        <div className="relative w-[88%] md:w-full aspect-[4/5] bg-gray-50 overflow-hidden shadow-sm transition-all duration-1000">
          <Image 
            src="/images-compressed/photosach.webp" 
            alt="Sacha Nahum"
            fill
            className="object-cover md:grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(max-width: 768px) 90vw, 50vw"
            quality={80}
            priority
          />
        </div>

        {/* Colonne Texte - Décalée sur mobile pour la mosaïque */}
        <div className="flex flex-col gap-8 md:gap-12 mt-4 md:mt-0 px-2 md:px-0">
          
          <h1 className="text-xl md:text-3xl lg:text-4xl font-serif leading-tight text-gray-900 tracking-tight max-w-lg">
            {texts[lang].intro}
          </h1>

          <div className="space-y-6 md:space-y-8 text-[13px] md:text-base text-gray-600 leading-relaxed font-light max-w-xl">
            <p>{texts[lang].p1}</p>
            <p>{texts[lang].p2}</p>
            
            <div className="pt-4">
              <p className="italic border-l border-gray-200 pl-6 py-2 text-gray-400 text-sm md:text-base leading-relaxed">
                  {texts[lang].p3}
              </p>
            </div>
          </div>

          {/* Signature discrète en bas de page about */}
          <div className="mt-8 pt-8 border-t border-gray-50">
            <p className="text-[9px] uppercase tracking-[0.4em] text-gray-300">
              Sacha Nahum — Paris
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
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
    // pt-24 sur mobile pour ne pas laisser trop de vide sous la Navbar
    <main className="min-h-screen bg-white pt-24 md:pt-44 pb-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
        
        {/* Colonne Image - Elle passe en haut sur mobile */}
        <div className="relative aspect-[4/5] bg-gray-50 overflow-hidden shadow-sm w-full max-w-md mx-auto md:max-w-none">
          <Image 
            src="/images/photosach.jpg" 
            alt="Sacha Nahum"
            fill
            className="object-cover md:grayscale hover:grayscale-0 transition-all duration-1000"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Colonne Texte */}
        <div className="flex flex-col gap-8 md:gap-12">
          
          {/* Intro : texte plus petit sur mobile pour éviter les césures bizarres */}
          <h1 className="text-xl md:text-3xl lg:text-4xl font-serif leading-tight text-gray-900 tracking-tight">
            {texts[lang].intro}
          </h1>

          {/* Paragraphes : text-sm sur mobile (très élégant), md:text-base sur ordi */}
          <div className="space-y-6 md:space-y-8 text-[13px] md:text-base text-gray-600 leading-relaxed font-light max-w-xl">
            <p>{texts[lang].p1}</p>
            <p>{texts[lang].p2}</p>
            
            {/* Citation : bordure plus fine sur mobile */}
            <p className="italic border-l-2 border-gray-100 pl-4 md:pl-6 py-2 text-gray-400 text-sm md:text-base">
                {texts[lang].p3}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
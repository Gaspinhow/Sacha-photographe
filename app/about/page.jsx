"use client";
import React from 'react';
import Image from 'next/image';
// 1. IMPORT DU HOOK GLOBAL
import { useLanguage } from "../context/LanguageContext"; 

export default function QuiSuisJe() {
  // 2. ON UTILISE LE CONTEXTE (On supprime le useState local)
  const { lang } = useLanguage();

  // 3. ADAPTATION DES CLÉS (FR/EN en majuscules pour matcher ton Context)
  const texts = {
    FR: {
      intro: "Je parcours le monde en quête de projets humains et sociaux qui racontent l'histoire d'autrui.",
      p1: "Photographe de formation technique et artistique, j'arpente les émotions, les paysages, les identités et les mœurs de nos sociétés en m'efforçant de les retranscrire en images, en histoires qui perdurent dans le temps.",
      p2: "Mon parcours m'a amené à travailler sur des projets variés: événements d'entreprise, reportages institutionnels, portraits artistiques. Mais aussi, plus personnellement, la rencontre avec des porteurs de soufre en Indonésie ou encore la découverte de la vie de marginaux de la banlieue parisienne.",
      p3: "Photographier ce qui nous entoure est une chance qui se doit d'être transmise, partagée entre frontières et générations. C'est, à mes yeux, un devoir de documenter la société humaine avec authenticité.",
    },
    EN: {
      intro: "I travel the world in search of human and social projects that tell the stories of others.",
      p1: "A photographer with both technical and artistic training, I explore emotions, landscapes, identities and the ways of our societies — striving to translate them into images, into stories that stand the test of time.",
      p2: "My journey has led me to work on a wide range of projects: corporate events, institutional reportages, artistic portraits. But also, on a more personal level, encounters with sulfur miners in Indonesia or glimpses into the lives of the marginalized in the suburbs of Paris.",
      p3: "Photographing what surrounds us is a privilege that must be passed on, shared across borders and generations. To me, it is a duty to document human society with authenticity.",
    }
  };

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Colonne Image */}
        <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden shadow-sm">
          <Image 
            src="/images/sacha-portrait.jpg" 
            alt="Sacha Nahum"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            priority
          />
        </div>

        {/* Colonne Texte */}
        <div className="flex flex-col gap-10">
          {/* Note: On n'a plus besoin du bouton ici car la Navbar gère tout le site ! */}
          
          <h1 className="text-2xl md:text-4xl font-serif leading-tight text-gray-900 tracking-tight">
            {texts[lang].intro}
          </h1>

          <div className="space-y-8 text-sm md:text-base text-gray-600 leading-relaxed font-light max-w-xl">
            <p>{texts[lang].p1}</p>
            <p>{texts[lang].p2}</p>
            <p className="italic border-l-2 border-gray-100 pl-6 py-2 text-gray-400">
                {texts[lang].p3}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
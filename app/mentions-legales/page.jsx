"use client";
import React from 'react';
import { useLanguage } from "../context/LanguageContext";

export default function MentionsLegales() {
  const { lang } = useLanguage();

  const content = {
    FR: {
      title: "Mentions Légales",
      editor: "Éditeur du site",
      host: "Hébergement",
      credits: "Crédits",
      text: "Ce site est édité par Sacha Nahum. Hébergé par Vercel Inc. Photographies par Sacha Nahum. Design et développement par Gaspar Lebacq."
    },
    EN: {
      title: "Legal Notice",
      editor: "Site Editor",
      host: "Hosting",
      credits: "Credits",
      text: "This site is edited by Sacha Nahum. Hosted by Vercel Inc. Photographs by Sacha Nahum. Design and development by Gaspar Lebacq."
    }
  };

  return (
    <main className="min-h-screen bg-white pt-32 md:pt-48 pb-24 px-6 md:px-12 font-serif text-black uppercase tracking-widest">
      <div className="max-w-2xl text-left">
        <h1 className="text-2xl md:text-3xl mb-12 border-b border-black pb-4">
          {content[lang].title}
        </h1>
        
        <div className="space-y-8 text-[10px] leading-relaxed">
          <section>
            <h2 className="font-bold mb-2">{content[lang].editor}</h2>
            <p>Sacha Nahum — Photographe</p>
          </section>

          <section>
            <h2 className="font-bold mb-2">{content[lang].host}</h2>
            <p>Vercel Inc. — 340 S Lemon Ave #4133 Walnut, CA 91789</p>
          </section>

          <section>
            <h2 className="font-bold mb-2">{content[lang].credits}</h2>
            <p>Design & Développement : Gaspar Lebacq</p>
          </section>
        </div>
      </div>
    </main>
  );
}
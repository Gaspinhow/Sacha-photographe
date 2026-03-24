"use client";
import React from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "../../../data/projects/index"; 
import { useLanguage } from "../../context/LanguageContext"; 

export default function ProjectPage() {
  const { id } = useParams();
  const { lang } = useLanguage();
  
  const project = projects ? projects.find(p => p.id === id) : null;

  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
        <p className="uppercase tracking-[0.3em] text-[10px] mb-8 italic text-gray-400">
          Projet "{id}" non trouvé
        </p>
        <Link href="/reportage" className="border-b border-black pb-1 text-[10px] uppercase tracking-widest text-black">
          Retour aux reportages
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE ASYMÉTRIQUE */}
        <header className="mb-24 md:mb-48 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-serif uppercase tracking-[0.1em] md:tracking-[0.15em] mb-8 text-black leading-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-500 text-sm md:text-lg leading-relaxed font-light italic max-w-2xl md:ml-12 border-l border-gray-100 pl-6"
          >
            {project.description}
          </motion.p>
        </header>

        {/* FLUX D'IMAGES MOSAÏQUE (Rythme Keo) */}
        <div className="flex flex-col gap-16 md:gap-32 lg:gap-48">
          {project.images && project.images.map((img, index) => {
            // Cycle de 4 positions pour casser la symétrie
            const mode = index % 4;
            // 0 : Plein centre (Paysage)
            // 1 : Décalé Gauche (Portrait)
            // 2 : Décalé Droite (Paysage serré)
            // 3 : Centré réduit (Carré ou 4/3)

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className={`relative w-full flex ${
                  mode === 1 ? 'justify-start' : 
                  mode === 2 ? 'justify-end' : 
                  'justify-center'
                }`}
              >
                <div className={`relative shadow-sm overflow-hidden bg-gray-50 
                  ${mode === 0 ? "w-full aspect-[3/2] md:aspect-video" : ""}
                  ${mode === 1 ? "w-[85%] md:w-[55%] aspect-[4/5] md:aspect-[3/4]" : ""}
                  ${mode === 2 ? "w-[90%] md:w-[65%] aspect-[3/2] md:aspect-[4/3] -mt-8 md:-mt-24" : ""}
                  ${mode === 3 ? "w-[80%] md:w-[50%] aspect-square" : ""}
                `}>
                  <Image
                    src={img}
                    alt={`${project.title} - ${index}`}
                    fill
                    className="object-cover transition-transform duration-[3s] hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={85}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NAVIGATION BAS DE PAGE */}
        <footer className="mt-32 md:mt-56 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Link href="/reportage" className="text-[10px] uppercase tracking-[0.4em] text-black hover:text-gray-400 transition-colors py-4">
            ← {lang === 'FR' ? 'Reportages' : 'Back'}
          </Link>
          <Link href="/contact" className="text-[10px] uppercase tracking-[0.4em] text-black hover:text-gray-400 transition-colors py-4">
            Sacha Nahum — Contact
          </Link>
        </footer>

      </div>
    </main>
  );
}
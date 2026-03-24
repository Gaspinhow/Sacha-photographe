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
        <p className="uppercase tracking-[0.3em] text-[10px] mb-8 italic text-gray-400">Projet non trouvé</p>
        <Link href="/reportage" className="border-b border-black pb-1 text-[10px] uppercase tracking-widest text-black">Retour</Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* EN-TÊTE ASYMÉTRIQUE */}
        <header className="mb-20 md:mb-32 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-serif uppercase tracking-[0.1em] md:tracking-[0.15em] mb-8 text-black leading-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-500 text-sm md:text-lg leading-relaxed font-light italic max-w-2xl md:ml-12 border-l border-gray-100 pl-6"
          >
            {project.description}
          </motion.p>
        </header>

        {/* GRILLE MOSAÏQUE (Style William Keo / Corporate) */}
        {/* columns-1 sur mobile, columns-2 sur PC pour l'imbrication verticale */}
        <div className="columns-1 md:columns-2 gap-8 md:gap-16 space-y-8 md:space-y-16">
          {project.images && project.images.map((img, index) => {
            // On alterne les ratios pour casser la régularité
            const ratios = ["aspect-[3/2]", "aspect-[4/5]", "aspect-square", "aspect-[2/3]", "aspect-[3/4]"];
            const currentRatio = ratios[index % ratios.length];

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, margin: "-5%" }}
                className="break-inside-avoid relative w-full"
              >
                <div className={`relative shadow-sm overflow-hidden bg-gray-50 ${currentRatio}`}>
                  <Image
                    src={img}
                    alt={`${project.title} - ${index}`}
                    fill
                    className="object-cover transition-transform duration-[2.5s] hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NAVIGATION BAS DE PAGE */}
        <footer className="mt-24 md:mt-48 pt-10 border-t border-gray-100 flex justify-between items-center">
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
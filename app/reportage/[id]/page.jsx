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
        <Link href="/reportage" className="border-b border-black pb-1 text-[10px] uppercase tracking-widest">
          Retour aux reportages
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE DU REPORTAGE */}
        <header className="mb-20 md:mb-32 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-5xl font-light uppercase tracking-[0.15em] md:tracking-[0.2em] mb-6 md:mb-10 text-black leading-tight"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-gray-500 text-sm md:text-lg leading-relaxed font-light italic max-w-2xl"
          >
            {project.description}
          </motion.p>
        </header>

        {/* FLUX D'IMAGES EN MOSAÏQUE */}
        <div className="flex flex-col gap-16 md:gap-40 lg:gap-52">
          {project.images && project.images.map((img, index) => {
            // Logique de mosaïque mobile & desktop
            // Index 0, 3, 6... : Pleine largeur
            // Index 1, 4, 7... : Petit et à gauche
            // Index 2, 5, 8... : Petit et à droite
            const isFull = index % 3 === 0;
            const isLeft = index % 3 === 1;
            const isRight = index % 3 === 2;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true, margin: "-10%" }}
                className={`relative w-full flex ${isLeft ? 'justify-start' : isRight ? 'justify-end' : 'justify-center'}`}
              >
                <div className={`relative shadow-sm overflow-hidden bg-gray-50 transition-all
                  ${isFull 
                    ? "w-full aspect-[3/2] md:aspect-video" 
                    : "w-[85%] md:w-[70%] aspect-[3/2] md:aspect-[4/3]"}`}
                >
                  <Image
                    src={img}
                    alt={`${project.title} - ${index}`}
                    fill
                    className="object-cover transition-transform duration-[2.5s] hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 1200px"
                    quality={75}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* NAVIGATION BAS DE PAGE */}
        <footer className="mt-24 md:mt-48 pt-10 border-t border-gray-100 flex flex-row justify-between items-center">
          <Link href="/reportage" className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-gray-400 transition-colors py-4">
            ← {lang === 'FR' ? 'Reportages' : 'Back to Stories'}
          </Link>
          <Link href="/contact" className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:text-gray-400 transition-colors py-4">
            Contact — Sacha Nahum
          </Link>
        </footer>

      </div>
    </main>
  );
}

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

  if (!project) return null;

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        
        <header className="mb-24 md:mb-40 max-w-4xl">
          <h1 className="text-2xl md:text-5xl font-serif uppercase tracking-[0.1em] mb-8 text-black leading-tight">
            {project.title}
          </h1>
          <p className="text-gray-500 text-sm md:text-lg leading-relaxed font-light italic max-w-2xl border-l border-gray-100 pl-6">
            {project.description}
          </p>
        </header>

        {/* --- LA GRILLE MOSAÏQUE FORCÉE --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-32">
          {project.images && project.images.map((img, index) => {
            // Rythme asymétrique : 
            // - Les images paires sont un peu décalées vers le bas sur PC
            // - On alterne les formats (3/2, 4/5, etc.)
            const isEven = index % 2 === 1;
            const ratios = ["aspect-[3/2]", "aspect-[4/5]", "aspect-square", "aspect-[2/3]"];
            const currentRatio = ratios[index % ratios.length];

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                // md:mt-32 crée le décalage vertical pour l'effet mosaïque sur PC
                className={`relative w-full ${isEven ? 'md:mt-40' : ''}`}
              >
                <div className={`relative shadow-sm overflow-hidden bg-gray-50 ${currentRatio} w-full`}>
                  <Image
                    src={img}
                    alt={`${project.title}-${index}`}
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

        <footer className="mt-40 pt-10 border-t border-gray-100 flex justify-between items-center font-serif">
          <Link href="/reportage" className="text-[10px] uppercase tracking-[0.4em] text-black">
            ← {lang === 'FR' ? 'Reportages' : 'Back'}
          </Link>
          <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300">Sacha Nahum</p>
        </footer>
      </div>
    </main>
  );
}
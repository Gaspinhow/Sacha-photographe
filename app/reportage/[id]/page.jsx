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

  const displayTitle = (lang === 'EN' && project.titleEN) ? project.titleEN : project.title;
  const displayDescription = (lang === 'EN' && project.descriptionEN) ? project.descriptionEN : project.description;

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20 text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-24 md:mb-40 max-w-4xl text-left">
          <h1 className="text-3xl md:text-6xl font-serif uppercase tracking-[0.05em] mb-10 text-black leading-tight">{displayTitle}</h1>
          <p className="text-black text-sm md:text-xl leading-relaxed font-light italic max-w-3xl">{displayDescription}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-16 md:gap-y-32">
          {project.images && project.images.map((img, index) => {
            const isEven = index % 2 === 1;
            // On ajuste les ratios pour que ce soit moins "serré" sur mobile
            const currentRatio = "aspect-[3/2] md:aspect-auto"; 

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className={`relative w-full ${isEven ? 'md:mt-40' : ''}`}
              >
                <div className={`relative shadow-sm overflow-hidden bg-gray-50 ${currentRatio} w-full min-h-[300px]`}>
                  <Image
                    src={img}
                    alt={`${displayTitle}-${index}`}
                    fill
                    // MOBILE: contain (pour voir toute la photo) | DESKTOP: cover (pour le style)
                    className="object-contain md:object-cover" 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        <footer className="mt-40 pt-10 border-t border-gray-100 flex justify-between items-center">
          <Link href={`/${project.category}`} className="text-[10px] uppercase tracking-[0.4em] text-black font-bold">
            ← {lang === 'FR' ? 'Retour' : 'Back'}
          </Link>
          <p className="text-[9px] uppercase tracking-[0.5em] text-black font-medium">Sacha Nahum — Photography</p>
        </footer>
      </div>
    </main>
  );
}
"use client";
import React from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

// ON UTILISE LE VRAI CHEMIN VERS TON INDEX.JS
import { projects } from "../../../data/projects/index"; 

export default function ProjectPage() {
  const { id } = useParams();
  
  // On cherche le projet dans ton vrai fichier data/projects/index.js
  const project = projects ? projects.find(p => p.id === id) : null;

  // Si on ne trouve rien
  if (!project) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
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
    <main className="min-h-screen bg-white pt-40 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        
        {/* EN-TÊTE DU REPORTAGE */}
        <header className="mb-32 max-w-3xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] mb-10 text-black"
          >
            {project.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-lg md:text-xl leading-relaxed font-light italic"
          >
            {project.description}
          </motion.p>
        </header>

        {/* FLUX D'IMAGES (Style William Keo) */}
        <div className="flex flex-col gap-24 md:gap-48">
          {project.images && project.images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="relative w-full"
            >
              {/* Rythme visuel Keo : 1 image large, 2 images plus centrées */}
              <div className={index % 3 === 0 ? "aspect-video w-full" : "aspect-[3/2] md:w-4/5 mx-auto"}>
                <Image
                  src={img}
                  alt={`${project.title} - ${index}`}
                  fill
                  className="object-cover shadow-sm"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* NAVIGATION BAS DE PAGE */}
        <footer className="mt-48 pt-10 border-t border-gray-100 flex justify-between">
          <Link href="/reportage" className="text-[10px] uppercase tracking-[0.4em] hover:text-gray-400 transition-colors">
            ← Reportages
          </Link>
          <Link href="/contact" className="text-[10px] uppercase tracking-[0.4em] hover:text-gray-400 transition-colors">
            Contact
          </Link>
        </footer>

      </div>
    </main>
  );
}
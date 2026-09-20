"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { motion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import Photo, { photoInfo } from "../../../components/Photo";
import { useLanguage } from "../../context/LanguageContext";

const DEFAULT_SIZE = { w: 2400, h: 1600 };
const sizeOf = (src) => photoInfo(src) || DEFAULT_SIZE;

export default function ProjectGallery({ project }) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(-1);

  const displayTitle = (lang === 'EN' && project.titleEN) ? project.titleEN : project.title;
  const displayDescription = (lang === 'EN' && project.descriptionEN) ? project.descriptionEN : project.description;
  const images = project.images || [];

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-4 md:px-12 lg:px-20 text-black">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 md:mb-24 max-w-4xl text-left">
          <h1 className="text-3xl md:text-6xl font-serif uppercase tracking-[0.05em] mb-10 text-black leading-tight">{displayTitle}</h1>
          <p className="text-black text-sm md:text-xl leading-relaxed font-light italic max-w-3xl">{displayDescription}</p>
        </header>

        {/* Colonnes CSS plutôt qu'une grille : les photos s'empilent au plus près,
            sans trou laissé par la plus haute de la rangée. */}
        <div className="columns-1 md:columns-2 gap-4 md:gap-6 [column-fill:_balance]">
          {images.map((img, index) => (
            <motion.button
              key={img}
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={
                lang === 'EN'
                  ? `Open photo ${index + 1} of ${images.length} — ${displayTitle}`
                  : `Ouvrir la photo ${index + 1} sur ${images.length} — ${displayTitle}`
              }
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true, margin: "0px 0px -50px 0px" }}
              className="group relative mb-4 md:mb-6 block w-full break-inside-avoid cursor-zoom-in overflow-hidden bg-gray-50 shadow-sm"
            >
              <Photo
                src={img}
                alt={`${displayTitle} — ${index + 1}`}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={index < 2}
                // w-full + h-auto : la photo garde son format d'origine, portrait comme paysage
                className="w-full h-auto transition-transform duration-[1.5s] md:group-hover:scale-[1.02]"
              />
            </motion.button>
          ))}
        </div>

        <Lightbox
          open={openIndex >= 0}
          index={openIndex < 0 ? 0 : openIndex}
          close={() => setOpenIndex(-1)}
          slides={images.map((img, i) => {
            const { w, h } = sizeOf(img);
            return { src: img, width: w, height: h, alt: `${displayTitle} — ${i + 1}` };
          })}
          plugins={[Zoom, Counter]}
          carousel={{ finite: true }}
          controller={{ closeOnBackdropClick: true }}
          styles={{ container: { backgroundColor: "#ffffff" } }}
          labels={lang === 'EN'
            ? undefined
            : { Previous: "Photo précédente", Next: "Photo suivante", Close: "Fermer", "Zoom in": "Agrandir", "Zoom out": "Réduire" }}
          render={{
            iconPrev: () => <span className="text-2xl text-black px-4">←</span>,
            iconNext: () => <span className="text-2xl text-black px-4">→</span>,
            iconClose: () => <span className="text-2xl text-black px-4">×</span>,
          }}
        />

        <footer className="mt-32 pt-10 border-t border-black/10 flex justify-between items-center">
          <Link href={`/${project.category}`} className="text-[10px] uppercase tracking-[0.4em] text-black font-bold">
            ← {lang === 'FR' ? 'Retour' : 'Back'}
          </Link>
          <p className="text-[9px] uppercase tracking-[0.5em] text-black font-medium">Sacha Nahum — Photography</p>
        </footer>
      </div>
    </main>
  );
}

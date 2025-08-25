"use client";
import { useMemo, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Image from "next/image";

export default function Gallery({ projects }){
  const [cat, setCat] = useState("Tous");
  const [open, setOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  const categories = useMemo(()=>["Tous", ...Array.from(new Set(projects.map(p=>p.category)))], [projects]);
  const filtered = useMemo(()=> cat==="Tous" ? projects : projects.filter(p=>p.category===cat), [cat, projects]);

  function openLightbox(images, startIndex=0){
    setSlides(images.map(src => ({ src })));
    setIndex(startIndex);
    setOpen(true);
  }

  // Fonction pour déterminer la grille optimale selon le nombre d'images
  function getGridClass(imageCount) {
    if (imageCount === 1) return "grid-cols-1";
    if (imageCount === 2) return "grid-cols-1 sm:grid-cols-2";
    if (imageCount === 3) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    if (imageCount === 4) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4";
    if (imageCount === 5) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    if (imageCount >= 6) return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap gap-2 mb-8 mt-8">
        {categories.map(c => (
          <button key={c}
            onClick={()=>setCat(c)}
            className={`px-4 py-2 rounded-lg border ${cat===c ? "bg-accent text-white" : "border-gray-300 hover:bg-gray-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((p,pi)=>(
          <section key={pi}>
            <div className="flex items-baseline justify-start mb-3">
              <h3 className="text-xl md:text-2xl font-semibold">{p.title}</h3>
            </div>
            {p.description && <p className="text-gray-700 mb-3 whitespace-pre-line">{p.description}</p>}
            
            {/* Grille dynamique qui s'adapte au nombre d'images */}
            <div className={`grid ${getGridClass(p.images.length)} gap-3`}>
              {p.images.map((src, i)=>(
                <div key={i} className="relative w-full rounded-lg overflow-hidden">
                  <Image
                    src={src}
                    alt={`${p.title} - Image ${i + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={()=>openLightbox(p.images, i)}
                    loading={i < 6 ? "eager" : "lazy"}
                    onError={(e) => {
                      console.log('Image failed to load:', src);
                      // Au lieu de cacher l'image, on affiche un placeholder
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                    priority={i < 3}
                  />
                  {/* Placeholder en cas d'erreur de chargement */}
                  <div 
                    className="hidden absolute inset-0 bg-gray-200 flex items-center justify-center text-gray-500 text-sm"
                    style={{display: 'none'}}
                  >
                    Image non disponible
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Lightbox open={open} close={()=>setOpen(false)} index={index} slides={slides} />
    </div>
  );
}

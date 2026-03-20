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
            
            <div className={`grid ${getGridClass(p.images.length)} gap-3`}>
              {p.images.map((src, i)=>(
                <div key={i} className="relative w-full rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]">
                  <Image
                    src={src}
                    alt={`Photographie par Sacha Nahum - ${p.title} - Image ${i + 1}`}
                    fill
                    className="object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={()=>openLightbox(p.images, i)}
                    loading={i < 6 ? "eager" : "lazy"}
                    priority={i < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={80}
                  />
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
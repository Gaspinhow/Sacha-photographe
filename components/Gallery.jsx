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

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-wrap gap-2 mb-8 mt-8">
        {categories.map(c => (
          <button key={c}
            onClick={()=>setCat(c)}
            className={`px-4 py-2 rounded-full border ${cat===c ? "bg-accent text-white" : "border-gray-300 hover:bg-gray-50"}`}>
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {filtered.map((p,pi)=>(
          <section key={pi}>
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="text-xl md:text-2xl font-semibold">{p.title}</h3>
            </div>
            {p.description && <p className="text-gray-700 mb-3 whitespace-pre-line">{p.description}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 auto-rows-auto">
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
                      e.target.style.display = 'none';
                    }}
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

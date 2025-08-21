import Link from "next/link";
import Image from "next/image";
import Reveal from "./Reveal";

export default function CategoryTiles(){
  const cats=[
    {slug:"salon",label:"Salon",img:"/images/slide1.jpg"},
    {slug:"entreprise",label:"Entreprise",img:"/images/slide2.jpg"},
    {slug:"institution",label:"Institution",img:"/images/slide3.jpg"},
    {slug:"reportage",label:"Reportage",img:"/images/repo.jpg"}
  ];
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {cats.map((c,idx)=>(
          <Reveal key={c.slug} delay={idx*80}>
            <Link href={`/gallery?cat=${c.slug}`} className="relative rounded-xl overflow-hidden group block shadow-lg">
              <Image 
                src={c.img} 
                alt={c.label}
                width={400}
                height={300}
                className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-[1.04]" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-black/50 px-2 sm:px-3 py-1 rounded text-sm sm:text-base">{c.label}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

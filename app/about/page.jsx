import Link from "next/link";
import Reveal from "../../components/Reveal";
import Image from "next/image";

export default function About(){
  // Sélection de quelques photos représentatives
  const galleryImages = [
    "/images/1.jpg",
    "/images/2.jpg", 
    "/images/3.jpg",
    "/images/4.jpg",
    "/images/5.jpg",
    "/images/6.jpg",
    "/images/photo7.jpg",
    "/images/photo8.jpg",
    "/images/photo9.jpg",
    "/images/photo10.jpg",
    "/images/photo11.jpg",
    "/images/photo12.jpg"
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Reveal>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-8">Qui suis-je</h1>
        </Reveal>
        
        <div className="space-y-8">
          <Reveal>
            <p className="text-gray-700 leading-relaxed">
              Passionné de photographie depuis mon plus jeune âge, j&apos;ai développé une approche unique 
              qui allie technique et créativité. Chaque cliché raconte une histoire, capture une émotion, 
              immortalise un moment précieux.
            </p>
          </Reveal>
          
          <Reveal>
            <p className="text-gray-700 leading-relaxed">
              Mon parcours m&apos;a amené à travailler sur des projets variés : événements d&apos;entreprise, 
              reportages institutionnels, portraits artistiques. Chaque mission est une nouvelle aventure 
              qui me permet de repousser mes limites créatives.
            </p>
          </Reveal>
          
          <Reveal>
            <p className="text-gray-700 leading-relaxed">
              Mon objectif : créer des images qui vous ressemblent, qui racontent votre histoire 
              avec authenticité et élégance. Chaque projet est unique, chaque client mérite 
              une approche personnalisée.
            </p>
          </Reveal>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/contact" className="px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">Me contacter</Link>
          <Link href="/gallery" className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Voir la galerie</Link>
        </div>

        {/* Petite galerie d'images */}
        <Reveal>
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6 text-center">Quelques-unes de mes photos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <Image
                    src={img}
                    alt={`Photo ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

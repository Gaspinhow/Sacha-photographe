import Hero from "../components/Hero";
import CategoryTiles from "../components/CategoryTiles";
import Reveal from "../components/Reveal";

export default function Home(){
  return (
    <main>
      {/* Image de tête (arrière-plan diaporama) */}
      <Hero/>
      
      {/* Titre centré sous l'image */}
      <section className="text-center py-8 sm:py-12 md:py-16 bg-white px-4 sm:px-6">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6 sm:mb-8">
            Photographe professionnel
          </h1>
        </Reveal>
      </section>
      
      {/* Court texte de présentation */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 bg-gray-50">
        <Reveal>
          <div className="text-center space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
              Je suis Sacha Nahum, photographe à Paris, passionné par l&apos;art de capturer l&apos;instant vrai. 
              Mon style mêle authenticité et esthétique soignée, que ce soit pour un reportage, un événement 
              ou un portrait. Mon objectif : raconter votre histoire en images, avec émotion, précision et créativité.
            </p>
          </div>
        </Reveal>
      </section>
      
      <CategoryTiles/>
    </main>
  );
}

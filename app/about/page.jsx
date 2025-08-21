import Reveal from "../../components/Reveal";
import Link from "next/link";

export const metadata = { title: "Qui suis‑je — À propos" };

export default function AboutPage(){
  return (
    <main className="pt-[96px] px-6">
      <section className="max-w-4xl mx-auto py-10 space-y-8">
        <Reveal>
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">Sacha Nahum</h1>
        </Reveal>
        <Reveal delay={100}>
          <p className="text-gray-700 leading-relaxed">
            {`Je m'appelle Sacha Nahum, photographe basé à Paris, spécialisé dans la photographie de reportage,
            d'événementiel et de portrait. Après plusieurs années d'expérience dans le domaine du reportage et
            de la photographie de soirées, j'ai affiné un style qui mêle authenticité, sens du détail et sensibilité
            artistique. Je travaille aussi bien pour des événements privés (mariages, portraits, séances lifestyle)
            que pour des reportages plus documentaires, où l'image raconte une histoire.`}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <p className="text-gray-700 leading-relaxed">
            {`J'accorde une attention particulière à la composition, à la lumière naturelle et à la captation des
            émotions spontanées. Mon approche est simple : créer des images qui reflètent la vérité du moment,
            tout en apportant une touche artistique personnelle. Chaque séance photo se pense comme une rencontre,
            où l'échange avec le client est aussi important que la prise de vue. Si vous cherchez un photographe
            proche de ses sujets, à l'écoute, et capable de capturer des instants uniques, vous êtes au bon endroit.`}
          </p>
        </Reveal>
        <Reveal delay={260}>
          <div className="flex gap-3">
            <Link href="/contact" className="px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">Me contacter</Link>
            <Link href="/gallery" className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">Voir la galerie</Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}

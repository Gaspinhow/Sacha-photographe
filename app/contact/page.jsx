import Reveal from "../../components/Reveal";
import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contact — Sacha Nahum" };

export default function ContactPage(){
  return (
    <main className="pt-[96px] px-6">
      <section className="max-w-6xl mx-auto py-10 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-3">
          <Reveal>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-6">Me contacter</h1>
          </Reveal>
          <ContactForm />
        </div>
        <aside className="md:col-span-2 space-y-6">
          <Reveal>
            <div className="rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold mb-2">Coordonnées</h2>
              <ul className="space-y-1 text-gray-700">
                <li>E‑mail : <a className="underline hover:text-accent" href="mailto:sacha.nahum@gmail.com">sacha.nahum@gmail.com</a></li>
                <li>Téléphone : <a className="underline hover:text-accent" href="tel:+33686622987">06 86 62 29 87</a></li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <blockquote className="rounded-xl border border-gray-200 p-6 text-gray-700">
              {`Un projet en tête ou simplement une question ? Parlons‑en ensemble et voyons comment je peux lui donner vie. Contactez‑moi sans hésiter !`}
            </blockquote>
          </Reveal>
        </aside>
      </section>
    </main>
  );
}

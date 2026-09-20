"use client";
import Link from "next/link";
import { useLanguage } from "./context/LanguageContext";

// Sans ce fichier, Next sert sa page par défaut : non stylée et en anglais.
export default function NotFound() {
  const { lang } = useLanguage();

  const content = {
    FR: {
      code: "Erreur 404",
      title: "Cette page n'existe pas",
      text: "Le lien est peut-être ancien, ou l'adresse comporte une faute de frappe.",
      reportage: "Voir les reportages",
      corporate: "Voir le corporate",
      home: "Retour à l'accueil",
    },
    EN: {
      code: "Error 404",
      title: "This page does not exist",
      text: "The link may be outdated, or the address contains a typo.",
      reportage: "See documentary work",
      corporate: "See business work",
      home: "Back to home",
    },
  };

  const t = content[lang];

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-6 md:px-12 lg:px-20 font-serif text-black">
      <div className="max-w-2xl">
        <p className="text-[10px] uppercase tracking-[0.4em] text-black/60 mb-8">{t.code}</p>
        <h1 className="text-2xl md:text-4xl uppercase tracking-[0.15em] leading-relaxed mb-8">{t.title}</h1>
        <p className="text-sm md:text-base font-light italic leading-relaxed mb-16">{t.text}</p>

        <nav className="flex flex-col sm:flex-row gap-6 sm:gap-10">
          <Link href="/reportage" className="w-fit text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
            {t.reportage}
          </Link>
          <Link href="/corporate" className="w-fit text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
            {t.corporate}
          </Link>
          <Link href="/" className="w-fit text-[10px] uppercase tracking-[0.3em] border-b border-black pb-1 hover:opacity-50 transition-opacity">
            {t.home}
          </Link>
        </nav>
      </div>
    </main>
  );
}

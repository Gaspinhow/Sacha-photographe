"use client";
import Link from 'next/link';
import { useLanguage } from "./context/LanguageContext";

export default function Home() {
  const { lang } = useLanguage();

  const labels = {
    FR: { reportage: "Reportage", corporate: "Corporate" },
    EN: { reportage: "Documentary", corporate: "Business" }
  };

  return (
    <main className="flex min-h-screen">
      {/* SECTION REPORTAGE */}
      <Link href="/reportage" className="relative flex-1 group overflow-hidden">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
        {/* Ton image ici */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white text-4xl md:text-6xl font-serif uppercase tracking-[0.4em]">
            {labels[lang].reportage}
          </h2>
        </div>
      </Link>

      {/* SECTION CORPORATE */}
      <Link href="/corporate" className="relative flex-1 group overflow-hidden border-l border-white/20">
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10" />
        {/* Ton image ici */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <h2 className="text-white text-4xl md:text-6xl font-serif uppercase tracking-[0.4em]">
            {labels[lang].corporate}
          </h2>
        </div>
      </Link>
    </main>
  );
}
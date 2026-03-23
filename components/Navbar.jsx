"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// 1. On importe le hook global
import { useLanguage } from "../app/context/LanguageContext"; 

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // 2. On utilise la "télécommande universelle" au lieu du useState local
  const { lang, toggleLang } = useLanguage(); 

  // 3. On définit les traductions des liens
  const links = {
    FR: [
      { href: "/", label: "Accueil" },
      { href: "/reportage", label: "Reportage" },
      { href: "/corporate", label: "Corporate" },
      { href: "/about", label: "Qui suis-je" },
      { href: "/contact", label: "Contact" },
    ],
    EN: [
      { href: "/", label: "Home" },
      { href: "/reportage", label: "Documentary" },
      { href: "/corporate", label: "Business" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ]
  };

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white border-b border-gray-100 font-sans">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link href="/" className="text-sm font-bold tracking-widest uppercase text-black">
          Sacha Nahum
        </Link>

        {/* Desktop liens - On utilise links[lang] */}
        <ul className="hidden md:flex items-center gap-8">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "text-xs tracking-widest uppercase transition-colors",
                  pathname === l.href
                    ? "text-black border-b border-black pb-0.5"
                    : "text-gray-400 hover:text-black"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-6">
          
          {/* Switch de langue - Appelle toggleLang du contexte */}
          <button 
            onClick={toggleLang}
            className="text-[10px] font-bold tracking-widest hover:text-gray-400 transition-colors border border-black px-2 py-0.5 rounded-sm uppercase"
          >
            {lang}
          </button>

          {/* Icônes réseaux sociaux  */}
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="mailto:contact@sacha-nahum.com" className="text-gray-400 hover:text-black transition-colors">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sacha-nahum" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="flex flex-col gap-1.5">
            <span className={clsx("w-5 h-px bg-black transition-all", mobileMenuOpen ? "rotate-45 translate-y-2" : "")}></span>
            <span className={clsx("w-5 h-px bg-black transition-all", mobileMenuOpen ? "opacity-0" : "")}></span>
            <span className={clsx("w-5 h-px bg-black transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={clsx(
        "md:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden",
        mobileMenuOpen ? "max-h-80" : "max-h-0"
      )}>
        <ul className="px-6 py-4 flex flex-col gap-4">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "text-xs tracking-widest uppercase",
                  pathname === l.href ? "text-black" : "text-gray-400"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex items-center gap-6 pt-2 border-t border-gray-50 mt-2">
             <button onClick={toggleLang} className="text-[10px] font-bold tracking-widest border border-black px-2 py-0.5 rounded-sm">
              {lang}
            </button>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-[10px] tracking-widest uppercase">Instagram</a>
              <a href="mailto:contact@sacha-nahum.com" className="text-gray-400 text-[10px] tracking-widest uppercase">Mail</a>
              <a href="https://www.linkedin.com/in/sacha-nahum" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-[10px] tracking-widest uppercase">LinkedIn</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
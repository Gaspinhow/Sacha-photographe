"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLanguage } from "../app/context/LanguageContext"; 

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage(); 

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
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 font-serif">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-28 flex items-center justify-between transition-all">

        {/* LOGO : SACHA NAHUM (Agrandi & Espacé) */}
        <Link 
          href="/" 
          className="text-lg md:text-2xl font-medium tracking-[0.4em] uppercase text-black hover:opacity-60 transition-opacity"
        >
          Sacha Nahum
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-14">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "text-[10px] md:text-[11px] tracking-[0.3em] uppercase transition-all duration-300",
                  pathname === l.href
                    ? "text-black border-b border-black pb-1 font-bold"
                    : "text-black/40 hover:text-black"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions & Socials */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={toggleLang}
            className="text-[10px] font-bold tracking-[0.2em] border border-black px-3 py-1 hover:bg-black hover:text-white transition-all uppercase"
          >
            {lang}
          </button>

          <div className="flex items-center gap-5 text-black">
            <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="mailto:contact@sacha-nahum.com" className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/sacha-nahum" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile burger */}
        <button className="md:hidden p-2 text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className="flex flex-col gap-1.5">
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "rotate-45 translate-y-2" : "")}></span>
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "opacity-0" : "")}></span>
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={clsx(
        "md:hidden bg-white border-t border-gray-100 transition-all duration-500 overflow-hidden",
        mobileMenuOpen ? "max-h-screen pb-10" : "max-h-0"
      )}>
        <ul className="px-8 py-10 flex flex-col gap-8 text-left">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "text-sm tracking-[0.4em] uppercase font-medium",
                  pathname === l.href ? "text-black border-l-2 border-black pl-4" : "text-black/40 pl-4"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-col gap-8 pt-8 border-t border-gray-50 mt-4 pl-4">
             <button onClick={toggleLang} className="w-fit text-[10px] font-bold tracking-widest border border-black px-4 py-1.5 uppercase">
              {lang}
            </button>
            <div className="flex gap-6 text-black/60">
              <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase">Instagram</a>
              <a href="mailto:contact@sacha-nahum.com" className="text-[10px] tracking-[0.2em] uppercase">Email</a>
              <a href="https://www.linkedin.com/in/sacha-nahum" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.2em] uppercase">LinkedIn</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
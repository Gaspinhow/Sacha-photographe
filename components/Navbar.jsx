"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useLanguage } from "../app/context/LanguageContext";
import Logo from "./Logo";

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
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-black/10">
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-28 flex items-center justify-between transition-all">

        {/* LOGO */}
        <Link 
          href="/" 
          aria-label={lang === "EN" ? "Sacha Nahum — home" : "Sacha Nahum — accueil"}
          className="flex shrink-0 items-center pr-8 hover:opacity-60 transition-opacity"
        >
          <Logo className="h-7 md:h-9 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-8 xl:gap-12">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "whitespace-nowrap text-[10px] xl:text-[11px] tracking-[0.03em] transition-all duration-300",
                  pathname === l.href
                    ? "text-black border-b border-black pb-1 font-semibold"
                    : "text-black/80 hover:text-black"
                )}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Actions & Socials */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <button 
            type="button"
            onClick={toggleLang}
            aria-label={lang === "FR" ? "Switch to English" : "Passer en français"}
            className="text-[10px] font-semibold tracking-[0.03em] border border-black px-3 py-1 hover:bg-black hover:text-white transition-all"
          >
            {lang}
          </button>

          <div className="flex items-center gap-5 text-black">
            <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="mailto:photo@sacha-nahum.com" aria-label={lang === "EN" ? "Send an email" : "Envoyer un e-mail"} className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <polyline points="2,4 12,13 22,4"/>
              </svg>
            </a>
            <a href="https://fr.linkedin.com/in/sacha-nahum-a06279281" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-50 transition-opacity">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="lg:hidden p-2 text-black"
          aria-label={mobileMenuOpen ? (lang === "EN" ? "Close menu" : "Fermer le menu") : (lang === "EN" ? "Open menu" : "Ouvrir le menu")}
          aria-expanded={mobileMenuOpen}
          aria-controls="menu-mobile"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="flex flex-col gap-1.5">
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "rotate-45 translate-y-2" : "")}></span>
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "opacity-0" : "")}></span>
            <span className={clsx("w-6 h-px bg-black transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-2" : "")}></span>
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div id="menu-mobile" className={clsx(
        "lg:hidden bg-white border-t border-black/10 transition-all duration-500 overflow-hidden",
        mobileMenuOpen ? "max-h-screen pb-10" : "max-h-0"
      )}>
        <ul className="px-8 py-10 flex flex-col gap-8 text-left">
          {links[lang].map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={clsx(
                  "text-sm tracking-[0.06em] font-semibold",
                  pathname === l.href ? "text-black border-l-2 border-black pl-4" : "text-black/80 pl-4"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="flex flex-col gap-8 pt-8 border-t border-black/10 mt-4 pl-4">
             <button type="button" onClick={toggleLang} aria-label={lang === "FR" ? "Switch to English" : "Passer en français"} className="w-fit text-[10px] font-semibold tracking-widest border border-black px-4 py-1.5">
              {lang}
            </button>
            <div className="flex gap-6 text-black/80">
              <a href="https://www.instagram.com/sacha_nahum" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.03em]">Instagram</a>
              <a href="mailto:photo@sacha-nahum.com" className="text-[10px] tracking-[0.03em]">Email</a>
              <a href="https://fr.linkedin.com/in/sacha-nahum-a06279281" target="_blank" rel="noopener noreferrer" className="text-[10px] tracking-[0.03em]">LinkedIn</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/gallery", label: "Galerie" },
  { href: "/about", label: "Qui suis-je" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar(){
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  useEffect(()=>{
    const onScroll = ()=> setCompact(window.scrollY > 10);
    onScroll(); window.addEventListener("scroll", onScroll);
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <nav className={clsx(
      "fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-expo bg-white/90 backdrop-blur border-b border-gray-200 shadow-sm",
      compact ? "py-3" : "py-5"
    )}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-wide text-lg sm:text-xl">Sacha Nahum</Link>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8">
          {links.map(l=>(
            <li key={l.href}>
              <Link href={l.href} className={clsx("hover:text-accent transition-colors", pathname===l.href && "text-accent")}>{l.label}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-3 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center items-center space-y-1">
            <span className={clsx("w-5 h-0.5 bg-gray-700 transition-all", mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1")}></span>
            <span className={clsx("w-5 h-0.5 bg-gray-700 transition-all", mobileMenuOpen ? "opacity-0" : "opacity-100")}></span>
            <span className={clsx("w-5 h-0.5 bg-gray-700 transition-all", mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1")}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={clsx(
        "md:hidden bg-white border-t border-gray-200 transition-all duration-300 ease-in-out overflow-hidden",
        mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
      )}>
        <ul className="px-4 py-4 space-y-3">
          {links.map(l=>(
            <li key={l.href}>
              <Link 
                href={l.href} 
                className={clsx(
                  "block py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors",
                  pathname===l.href ? "text-accent bg-accent/10" : "text-gray-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

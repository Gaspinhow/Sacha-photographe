"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const STORAGE_KEY = 'sn-lang';

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('FR');

  // Le choix de langue était perdu à chaque rafraîchissement.
  // On le relit au montage, et pas avant : le serveur rend toujours du FR,
  // donc lire plus tôt provoquerait une différence serveur / navigateur.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'EN' || saved === 'FR') setLang(saved);
    } catch {
      // navigation privée ou stockage bloqué : on reste en FR
    }
  }, []);

  // L'attribut lang de la page restait à "fr" même en anglais : les lecteurs
  // d'écran prononçaient le contenu anglais avec la phonétique française.
  useEffect(() => {
    document.documentElement.lang = lang === 'EN' ? 'en' : 'fr';
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // stockage indisponible : le choix vaut pour la visite en cours
    }
  }, [lang]);

  const toggleLang = () => setLang((prev) => (prev === 'FR' ? 'EN' : 'FR'));

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé à l'intérieur d'un LanguageProvider");
  }
  return context;
};

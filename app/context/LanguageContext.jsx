"use client";
import React, { createContext, useContext, useState } from 'react';

// On crée la boîte qui contiendra la langue
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Par défaut, on met en FR
  const [lang, setLang] = useState('FR');

  // La fonction pour switcher entre FR et EN
  const toggleLang = () => {
    setLang((prev) => (prev === 'FR' ? 'EN' : 'FR'));
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

// C'est ce petit hook qu'on utilisera dans tes pages pour récupérer la langue
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage doit être utilisé à l'intérieur d'un LanguageProvider");
  }
  return context;
};
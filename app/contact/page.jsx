"use client";
import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext"; 
import { motion } from "framer-motion";

export default function Contact() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState(null);

  const content = {
    FR: {
      title: "Contact",
      subtitle: "Pour toute demande de reportage, collaboration ou tirage.",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Adresse e-mail",
      phone: "Téléphone (optionnel)",
      message: "Votre message...",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Message envoyé avec succès !",
      error: "Une erreur est survenue. Veuillez réessayer.",
      info: "Basé à Paris — Disponible à l'international."
    },
    EN: {
      title: "Get in Touch",
      subtitle: "For any reportage inquiries, collaborations, or prints.",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      phone: "Phone (optional)",
      message: "Your message...",
      send: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "An error occurred. Please try again.",
      info: "Based in Paris — Available for assignments worldwide."
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    const formData = new FormData(e.target);
    const data = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus('success');
        e.target.reset();
      } else { setStatus('error'); }
    } catch (err) { setStatus('error'); }
  };

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-6 md:px-12 lg:px-24 text-gray-900">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-24">
        
        {/* Colonne de gauche : Titre (Décalé style mosaïque) */}
        <header className="md:w-1/3 flex flex-col items-start space-y-6">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl md:text-5xl font-serif uppercase tracking-[0.2em] md:tracking-[0.3em] leading-tight"
          >
            {content[lang].title}
          </motion.h1>
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-gray-400 font-light italic leading-relaxed">
            {content[lang].subtitle}
          </p>
          <div className="hidden md:block pt-12">
             <p className="text-[9px] uppercase tracking-[0.5em] text-gray-300 font-light">
               Sacha Nahum — Paris
             </p>
          </div>
        </header>

        {/* Colonne de droite : Formulaire */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <input 
                name="firstName" type="text" required placeholder={content[lang].firstName}
                className="w-full border-b border-gray-100 py-4 text-[11px] uppercase tracking-[0.2em] outline-none focus:border-black transition-all bg-transparent rounded-none placeholder-gray-300"
              />
              <input 
                name="lastName" type="text" required placeholder={content[lang].lastName}
                className="w-full border-b border-gray-100 py-4 text-[11px] uppercase tracking-[0.2em] outline-none focus:border-black transition-all bg-transparent rounded-none placeholder-gray-300"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <input 
                name="email" type="email" required placeholder={content[lang].email}
                className="w-full border-b border-gray-100 py-4 text-[11px] uppercase tracking-[0.2em] outline-none focus:border-black transition-all bg-transparent rounded-none placeholder-gray-300"
              />
              <input 
                name="phone" type="tel" placeholder={content[lang].phone}
                className="w-full border-b border-gray-100 py-4 text-[11px] uppercase tracking-[0.2em] outline-none focus:border-black transition-all bg-transparent rounded-none placeholder-gray-300"
              />
            </div>

            <textarea 
              name="message" rows="5" required placeholder={content[lang].message}
              className="w-full border-b border-gray-100 py-4 text-[11px] uppercase tracking-[0.2em] outline-none focus:border-black transition-all bg-transparent resize-none rounded-none placeholder-gray-300"
            ></textarea>

            <div className="flex flex-col gap-10 pt-4">
              <button 
                disabled={status === 'loading'}
                className="w-full md:w-fit px-20 py-5 border border-black/10 hover:border-black text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 bg-black text-white md:bg-transparent md:text-black md:hover:bg-black md:hover:text-white"
              >
                {status === 'loading' ? content[lang].sending : content[lang].send}
              </button>
              
              <div className="space-y-4">
                {status === 'success' && <p className="text-green-600 text-[10px] uppercase tracking-widest">{content[lang].success}</p>}
                {status === 'error' && <p className="text-red-600 text-[10px] uppercase tracking-widest">{content[lang].error}</p>}
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-300 italic">
                  {content[lang].info}
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
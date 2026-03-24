"use client";
import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext"; 

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
    // pt-28 sur mobile pour laisser respirer sous la navbar
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-20 px-6 md:px-10 text-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        
        {/* Header : Tracking réduit légèrement sur mobile pour éviter que ça dépasse */}
        <header className="mb-12 md:mb-20 space-y-4">
          <h1 className="text-2xl md:text-4xl font-serif uppercase tracking-[0.3em] md:tracking-[0.5em]">
            {content[lang].title}
          </h1>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 italic px-4">
            {content[lang].subtitle}
          </p>
        </header>

        {/* Formulaire : gap réduit sur mobile pour plus de compacité */}
        <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <input 
              name="firstName"
              type="text" 
              required
              placeholder={content[lang].firstName}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none"
            />
            <input 
              name="lastName"
              type="text" 
              required
              placeholder={content[lang].lastName}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <input 
              name="email"
              type="email" 
              required
              placeholder={content[lang].email}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none"
            />
            <input 
              name="phone"
              type="tel" 
              placeholder={content[lang].phone}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent rounded-none appearance-none"
            />
          </div>

          <textarea 
            name="message"
            rows="4" 
            required
            placeholder={content[lang].message}
            className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent resize-none rounded-none appearance-none"
          ></textarea>

          <div className="flex flex-col items-center gap-8 md:gap-10 pt-6 md:pt-10">
            <button 
              disabled={status === 'loading'}
              className="w-full md:w-auto px-16 py-4 border border-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white disabled:opacity-50 transition-all duration-500"
            >
              {status === 'loading' ? content[lang].sending : content[lang].send}
            </button>
            
            {status === 'success' && <p className="text-green-600 text-[10px] uppercase tracking-widest text-center">{content[lang].success}</p>}
            {status === 'error' && <p className="text-red-600 text-[10px] uppercase tracking-widest text-center">{content[lang].error}</p>}

            <p className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-gray-300 text-center">
              {content[lang].info}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
"use client";
import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext"; 

export default function Contact() {
  const { lang } = useLanguage();
  const [status, setStatus] = useState(null); // 'loading', 'success', 'error'

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
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <main className="min-h-screen bg-white pt-40 pb-20 px-10 text-gray-900">
      <div className="max-w-3xl mx-auto text-center">
        
        <header className="mb-20 space-y-4">
          <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.5em]">
            {content[lang].title}
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 italic">
            {content[lang].subtitle}
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-12 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <input 
              name="firstName"
              type="text" 
              required
              placeholder={content[lang].firstName}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent"
            />
            <input 
              name="lastName"
              type="text" 
              required
              placeholder={content[lang].lastName}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <input 
              name="email"
              type="email" 
              required
              placeholder={content[lang].email}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent"
            />
            <input 
              name="phone"
              type="tel" 
              placeholder={content[lang].phone}
              className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

          <textarea 
            name="message"
            rows="4" 
            required
            placeholder={content[lang].message}
            className="w-full border-b border-gray-200 py-3 text-[11px] uppercase tracking-widest outline-none focus:border-black transition-colors bg-transparent resize-none"
          ></textarea>

          <div className="flex flex-col items-center gap-10 pt-10">
            <button 
              disabled={status === 'loading'}
              className="px-16 py-4 border border-black text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-black hover:text-white disabled:opacity-50 transition-all duration-500"
            >
              {status === 'loading' ? content[lang].sending : content[lang].send}
            </button>
            
            {/* Messages de retour */}
            {status === 'success' && <p className="text-green-600 text-[10px] uppercase tracking-widest">{content[lang].success}</p>}
            {status === 'error' && <p className="text-red-600 text-[10px] uppercase tracking-widest">{content[lang].error}</p>}

            <p className="text-[9px] uppercase tracking-[0.2em] text-gray-300">
              {content[lang].info}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
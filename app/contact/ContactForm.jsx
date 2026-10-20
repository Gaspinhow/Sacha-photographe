"use client";
import React, { useState } from 'react';
import { useLanguage } from "../context/LanguageContext";
import { EMAIL, TELEPHONE_AFFICHE, TELEPHONE_LIEN, LINKEDIN } from "../../lib/coordonnees"; 
import { motion } from "framer-motion";
import Logo from "../../components/Logo";

const inputClass =
  "w-full border-b border-black/55 py-3 text-[12px] tracking-[0.1em] outline-none focus:border-black transition-colors bg-transparent rounded-none";

function Field({ id, label, type = "text", autoComplete, required = false, textarea = false }) {
  const common = {
    id,
    name: id,
    required,
    autoComplete,
    className: inputClass + (textarea ? " resize-none" : ""),
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[10px] uppercase tracking-[0.25em] text-black">
        {label}
      </label>
      {textarea ? <textarea rows="5" {...common} /> : <input type={type} {...common} />}
    </div>
  );
}

export default function ContactForm() {
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
      message: "Votre message",
      send: "Envoyer le message",
      sending: "Envoi en cours...",
      success: "Merci, je reviens vers vous sous 24 h.",
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
      message: "Your message",
      send: "Send Message",
      sending: "Sending...",
      success: "Thank you, I will get back to you within 24 hours.",
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
      website: formData.get('website'), // champ piège, toujours vide chez un humain
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
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.3em] text-black/80 font-light italic leading-relaxed">
            {content[lang].subtitle}
          </p>
          <div className="hidden md:block pt-12">
             <Logo variant="complet" className="h-28 w-auto object-contain" />
          </div>

          {/* Coordonnees : le cahier demande un telephone cliquable et un seul LinkedIn */}
          <address className="not-italic flex flex-col gap-3 pt-2 text-[11px] tracking-[0.15em] text-black">
            <a href={`mailto:${EMAIL}`} className="w-fit border-b border-black/40 pb-0.5 hover:opacity-60 transition-opacity">
              {EMAIL}
            </a>
            <a href={`tel:${TELEPHONE_LIEN}`} className="w-fit border-b border-black/40 pb-0.5 hover:opacity-60 transition-opacity">
              {TELEPHONE_AFFICHE}
            </a>
            <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="w-fit border-b border-black/40 pb-0.5 hover:opacity-60 transition-opacity">
              LinkedIn
            </a>
          </address>
        </header>

        {/* Colonne de droite : Formulaire */}
        <div className="md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-12 md:space-y-16" noValidate={false}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <Field id="firstName" label={content[lang].firstName} type="text" autoComplete="given-name" required />
              <Field id="lastName" label={content[lang].lastName} type="text" autoComplete="family-name" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
              <Field id="email" label={content[lang].email} type="email" autoComplete="email" required />
              <Field id="phone" label={content[lang].phone} type="tel" autoComplete="tel" />
            </div>

            <Field id="message" label={content[lang].message} textarea required />

            {/* Piège à robots : invisible et hors du parcours clavier. Un humain
                ne le remplit jamais, un robot d'envoi automatique si. */}
            <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="website">Ne pas remplir</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div className="flex flex-col gap-10 pt-4">
              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full md:w-fit px-20 py-5 border border-black/40 hover:border-black text-[10px] font-bold uppercase tracking-[0.5em] transition-all duration-700 bg-black text-white md:bg-transparent md:text-black md:hover:bg-black md:hover:text-white disabled:opacity-50"
              >
                {status === 'loading' ? content[lang].sending : content[lang].send}
              </button>

              <div className="space-y-4">
                {/* aria-live : le lecteur d'écran annonce le résultat sans que
                    l'utilisateur ait à partir le chercher dans la page. */}
                <div aria-live="polite" className="space-y-2">
                  {status === 'success' && <p className="text-[10px] uppercase tracking-widest" style={{ color: '#15803d' }}>{content[lang].success}</p>}
                  {status === 'error' && <p className="text-[10px] uppercase tracking-widest" style={{ color: '#b91c1c' }}>{content[lang].error}</p>}
                </div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-black/80 italic">
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
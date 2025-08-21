"use client";
import { useState } from "react";

export default function ContactForm(){
  const [status, setStatus] = useState(null);
  async function onSubmit(event){
    event.preventDefault();
    setStatus(null);
    const form = event.currentTarget;
    const data = {
      lastName: form.lastName.value.trim(),
      firstName: form.firstName.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      message: form.message.value.trim(),
    };
    if(!data.lastName || !data.firstName || !data.email || !data.message){
      setStatus({ ok:false, msg:"Merci de remplir tous les champs obligatoires."});
      return;
    }
    const emailRe = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    if(!emailRe.test(data.email)){
      setStatus({ ok:false, msg:"E‑mail invalide."});
      return;
    }
    try{
      const res = await fetch("/api/contact", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(data)});
      const json = await res.json();
      if(json.ok){
        const extra = json.previewUrl ? ` Prévisualisation: ${json.previewUrl}` : "";
        setStatus({ ok:true, msg:"Merci, votre message a bien été envoyé." + extra});
        form.reset();
      } else {
        setStatus({ ok:false, msg: json.error || "Une erreur est survenue."});
      }
    }catch(e){
      setStatus({ ok:false, msg:"Impossible d’envoyer pour le moment."});
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-gray-200 p-6 bg-gray-50">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700">Nom</label>
          <input name="lastName" type="text" required className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-accent" placeholder="Dupont" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700">Prénom</label>
          <input name="firstName" type="text" required className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-accent" placeholder="Sacha" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1 text-gray-700">E‑mail</label>
          <input name="email" type="email" required className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-accent" placeholder="sacha.nahum@gmail.com" />
        </div>
        <div>
          <label className="block text-sm mb-1 text-gray-700">Téléphone</label>
          <input name="phone" type="tel" className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-accent" placeholder="06 86 62 29 87" />
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1 text-gray-700">Message</label>
        <textarea name="message" required rows="6" className="w-full bg-white rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:border-accent" placeholder="Parlez‑moi de votre projet..." />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gray-500">En envoyant ce message, vous acceptez d&apos;être recontacté.</p>
        <button type="submit" className="px-5 py-2 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors">Envoyer</button>
      </div>
      {status && (
        <div aria-live="polite" className={`text-sm ${status.ok ? "text-green-600" : "text-red-600"}`}>
          {status.msg}
        </div>
      )}
    </form>
  );
}

"use client";
import React from 'react';
import Link from 'next/link';
import { useLanguage } from "../context/LanguageContext";
import { EMAIL, TELEPHONE_AFFICHE, TELEPHONE_LIEN, LEGAL } from "../../lib/coordonnees";

export default function LegalContent() {
  const { lang } = useLanguage();
  const fr = lang !== 'EN';

  // Les identifiants que Sacha n'a pas encore fournis restent vides dans
  // lib/coordonnees.js : la ligne est alors omise plutot que remplie au hasard.
  const editeur = [
    ["Nom", "Sacha Nahum"],
    ["Statut", LEGAL.statut],
    ["SIRET", LEGAL.siret],
    ["TVA intracommunautaire", LEGAL.tva],
    ["Adresse", LEGAL.adresse],
    [fr ? "Directeur de la publication" : "Publication director", LEGAL.directeurPublication],
  ].filter(([, valeur]) => valeur);

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-6 md:px-12 font-serif text-black">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl uppercase tracking-[0.15em] mb-12 border-b border-black pb-4">
          {fr ? "Mentions légales" : "Legal notice"}
        </h1>

        <div className="space-y-10 text-[13px] leading-relaxed font-light">
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
              {fr ? "Éditeur du site" : "Site editor"}
            </h2>
            <dl className="space-y-1">
              {editeur.map(([cle, valeur]) => (
                <div key={cle} className="flex flex-wrap gap-x-2">
                  <dt className="font-medium">{cle} :</dt>
                  <dd>{valeur}</dd>
                </div>
              ))}
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-medium">{fr ? "Contact" : "Contact"} :</dt>
                <dd>
                  <a href={`mailto:${EMAIL}`} className="border-b border-black/40 hover:opacity-60">{EMAIL}</a>
                  {" — "}
                  <a href={`tel:${TELEPHONE_LIEN}`} className="border-b border-black/40 hover:opacity-60">{TELEPHONE_AFFICHE}</a>
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
              {fr ? "Hébergement" : "Hosting"}
            </h2>
            <p>Vercel Inc. — 340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
              {fr ? "Propriété intellectuelle" : "Intellectual property"}
            </h2>
            <p>
              {fr
                ? "L'ensemble des photographies présentées sur ce site est la propriété exclusive de Sacha Nahum. Toute reproduction, représentation, diffusion ou réutilisation, même partielle, est interdite sans autorisation écrite préalable."
                : "All photographs on this site are the exclusive property of Sacha Nahum. Any reproduction, display, distribution or reuse, even partial, is prohibited without prior written permission."}
            </p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
              {fr ? "Données personnelles" : "Personal data"}
            </h2>
            <p>
              {fr ? "Le traitement des données envoyées via le formulaire est décrit dans la " : "How data sent through the form is handled is described in the "}
              <Link href="/confidentialite" className="border-b border-black/40 hover:opacity-60">
                {fr ? "politique de confidentialité" : "privacy policy"}
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">
              {fr ? "Crédits" : "Credits"}
            </h2>
            <p>{fr ? "Photographies : Sacha Nahum. Conception et développement : Gaspar Lebacq." : "Photographs: Sacha Nahum. Design and development: Gaspar Lebacq."}</p>
          </section>
        </div>
      </div>
    </main>
  );
}

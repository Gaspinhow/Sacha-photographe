"use client";
import React, { useState } from 'react';
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/counter.css";
import CarrouselPhotos from "../../components/CarrouselPhotos";
import { photoInfo } from "../../components/Photo";
import clients from "../../data/clients.json";
import { useLanguage } from "../context/LanguageContext";

const DEFAUT = { w: 2400, h: 1600 };

export default function CorporateClients() {
  const { lang } = useLanguage();
  // La visionneuse s'ouvre sur un reportage précis, pas sur toute la page :
  // les flèches font défiler les photos de ce reportage uniquement.
  const [ouvert, setOuvert] = useState(null);

  const t = lang === 'EN'
    ? { titre: "Corporate", intro: "Conventions, trade shows, conferences and portraits for companies, agencies and institutions." }
    : { titre: "Corporate", intro: "Conventions, salons, conférences et portraits pour les entreprises, les agences et les institutions." };

  const slides = ouvert
    ? ouvert.images.map((src, i) => {
        const { w, h } = photoInfo(src) || DEFAUT;
        return { src, width: w, height: h, alt: `${ouvert.titre} — ${i + 1}` };
      })
    : [];

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 text-black font-serif">
      <header className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 mb-14 md:mb-20">
        <h1 className="text-xl md:text-3xl uppercase tracking-[0.2em] leading-relaxed">{t.titre}</h1>
        <p className="mt-6 max-w-2xl text-[11px] md:text-xs uppercase tracking-[0.2em] leading-loose">{t.intro}</p>
      </header>

      <div className="space-y-20 md:space-y-28">
        {clients.map((client, indexClient) => (
          <section
            key={client.ancre}
            id={client.ancre}
            // La barre du haut est fixe : sans cette marge, l'ancre d'un mail de
            // prospection ferait atterrir le titre du client sous le menu.
            // content-visibility : le navigateur ne calcule la mise en page d'une
            // section qu'en l'approchant. Sur une page qui porte 122 photos, ça
            // évite de tout disposer et peindre d'un coup. Les ancres restent
            // exactes, c'est vérifié.
            style={{ contentVisibility: "auto", containIntrinsicSize: "auto 600px" }}
            className="scroll-mt-24 md:scroll-mt-36 max-w-7xl mx-auto px-4 md:px-12 lg:px-20"
          >
            <h2 className="text-lg md:text-2xl tracking-[0.12em] mb-8 pb-4 border-b border-black/15">
              {client.nom}
            </h2>

            <div className="space-y-10 md:space-y-14">
              {client.reportages.map((reportage, indexReportage) => (
                <article key={reportage.id}>
                  <h3 className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] mb-4">
                    {reportage.titre}
                  </h3>
                  <CarrouselPhotos
                    images={reportage.images}
                    titre={reportage.titre}
                    lang={lang}
                    prioritaire={indexClient === 0 && indexReportage === 0}
                    onOuvrir={(index) => setOuvert({ ...reportage, index })}
                  />
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Lightbox
        open={ouvert !== null}
        index={ouvert?.index ?? 0}
        close={() => setOuvert(null)}
        slides={slides}
        plugins={[Zoom, Counter]}
        carousel={{ finite: true }}
        controller={{ closeOnBackdropClick: true }}
        styles={{ container: { backgroundColor: "#ffffff" } }}
        labels={lang === 'EN' ? undefined : { Previous: "Photo précédente", Next: "Photo suivante", Close: "Fermer", "Zoom in": "Agrandir", "Zoom out": "Réduire" }}
        render={{
          iconPrev: () => <span className="text-2xl text-black px-4">←</span>,
          iconNext: () => <span className="text-2xl text-black px-4">→</span>,
          iconClose: () => <span className="text-2xl text-black px-4">×</span>,
        }}
      />
    </main>
  );
}

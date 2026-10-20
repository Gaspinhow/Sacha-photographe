"use client";
import React from 'react';
import { useLanguage } from "../context/LanguageContext";
import { EMAIL } from "../../lib/coordonnees";

// Le site ne pose aucun traceur et ne collecte rien en dehors du formulaire :
// cette page décrit exactement ce que fait le code, rien de plus.
export default function PrivacyContent() {
  const { lang } = useLanguage();

  const fr = {
    title: "Politique de confidentialité",
    updated: "Dernière mise à jour : octobre 2026",
    sections: [
      ["Responsable du traitement",
       [`Sacha Nahum, photographe. Pour toute question sur vos données : ${EMAIL}.`]],
      ["Données collectées",
       ["Seul le formulaire de contact collecte des données. Les champs transmis sont : prénom, nom, entreprise, adresse e-mail, téléphone, type de prestation, date et lieu de l'événement, et le contenu de votre message.",
        "Aucune autre donnée n'est collectée : le site ne pose ni cookie de mesure d'audience, ni traceur publicitaire, ni outil de statistiques."]],
      ["Pourquoi ces données",
       ["Elles servent uniquement à répondre à votre demande et, le cas échéant, à établir un devis. Elles ne sont jamais vendues, louées ni utilisées à des fins publicitaires."]],
      ["Base légale",
       ["Votre consentement, donné en cochant la case sous le formulaire, et les démarches précontractuelles entreprises à votre demande."]],
      ["Qui y a accès",
       ["Sacha Nahum uniquement. Deux prestataires techniques interviennent dans l'acheminement : Resend, qui achemine le message par e-mail, et Vercel, qui héberge le site. Aucun autre destinataire."]],
      ["Durée de conservation",
       ["Les messages sont conservés trois ans à compter du dernier échange, puis supprimés. Si votre demande débouche sur une mission, les documents liés sont conservés selon les obligations comptables en vigueur."]],
      ["Vos droits",
       ["Vous pouvez demander l'accès à vos données, leur rectification, leur effacement, la limitation de leur traitement, ou vous opposer à leur traitement. Vous pouvez aussi en demander une copie exploitable.",
        `Pour exercer ces droits, écrivez à ${EMAIL}. Une réponse vous sera apportée sous un mois.`,
        "Si la réponse ne vous satisfait pas, vous pouvez saisir la CNIL (www.cnil.fr)."]],
      ["Sécurité",
       ["Le site est servi en HTTPS. Le formulaire est protégé contre les envois automatisés et limite le nombre de messages par visiteur."]],
      ["Cookies",
       ["Le site n'utilise aucun cookie de suivi. Votre choix de langue est conservé dans votre navigateur, sur votre appareil uniquement : cette information ne nous est jamais transmise."]],
    ],
  };

  const en = {
    title: "Privacy policy",
    updated: "Last updated: October 2026",
    sections: [
      ["Data controller", [`Sacha Nahum, photographer. For any question about your data: ${EMAIL}.`]],
      ["Data collected",
       ["Only the contact form collects data: first name, last name, company, email address, phone, type of assignment, date and place of the event, and your message.",
        "Nothing else is collected: the site sets no analytics cookie, no advertising tracker and no statistics tool."]],
      ["Why", ["Solely to answer your request and, where relevant, prepare a quote. Your data is never sold, rented or used for advertising."]],
      ["Legal basis", ["Your consent, given by ticking the box below the form, and pre-contractual steps taken at your request."]],
      ["Who has access", ["Sacha Nahum only. Two technical providers are involved in delivery: Resend, which sends the email, and Vercel, which hosts the site."]],
      ["Retention", ["Messages are kept for three years from the last exchange, then deleted."]],
      ["Your rights",
       ["You may request access to your data, its correction or deletion, restriction of its processing, or object to it. You may also request a portable copy.",
        `Write to ${EMAIL}; you will receive an answer within one month.`,
        "If the answer does not satisfy you, you may refer the matter to the CNIL (www.cnil.fr)."]],
      ["Security", ["The site is served over HTTPS. The form is protected against automated submissions and limits the number of messages per visitor."]],
      ["Cookies", ["The site uses no tracking cookie. Your language choice is stored in your browser, on your device only."]],
    ],
  };

  const t = lang === 'EN' ? en : fr;

  return (
    <main className="min-h-screen bg-white pt-28 md:pt-44 pb-24 px-6 md:px-12 font-serif text-black">
      <div className="max-w-2xl">
        <h1 className="text-2xl md:text-3xl uppercase tracking-[0.15em] mb-3 border-b border-black pb-4">
          {t.title}
        </h1>
        <p className="text-[10px] uppercase tracking-[0.25em] text-black/70 mb-12">{t.updated}</p>

        <div className="space-y-10">
          {t.sections.map(([titre, paragraphes]) => (
            <section key={titre}>
              <h2 className="text-[11px] uppercase tracking-[0.25em] font-bold mb-3">{titre}</h2>
              <div className="space-y-3 text-[13px] leading-relaxed font-light">
                {paragraphes.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

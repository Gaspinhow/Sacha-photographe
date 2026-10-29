import { EMAIL, TELEPHONE_LIEN, LINKEDIN, INSTAGRAM, LEGAL } from "../lib/coordonnees";

// Données structurées lues par Google. Une personne seule ne dit pas qu'on vend
// une prestation : on déclare aussi un service professionnel, avec ce qu'il
// propose et pour qui. Rien n'est inventé — l'adresse postale n'est ajoutée que
// si Sacha l'a renseignée dans lib/coordonnees.js.
export default function StructuredData() {
  const SITE = "https://www.sacha-nahum.com";

  const personne = {
    "@type": "Person",
    "@id": `${SITE}/#sacha`,
    name: "Sacha Nahum",
    jobTitle: "Photographe",
    url: SITE,
    email: EMAIL,
    telephone: TELEPHONE_LIEN,
    image: `${SITE}/images-compressed/photosach.webp`,
    sameAs: [LINKEDIN, INSTAGRAM],
  };

  const service = {
    "@type": "ProfessionalService",
    "@id": `${SITE}/#service`,
    name: "Sacha Nahum — Photographe événementiel et corporate",
    description:
      "Conventions, salons, conférences et portraits pour les entreprises, les agences et les institutions.",
    url: SITE,
    email: EMAIL,
    telephone: TELEPHONE_LIEN,
    image: `${SITE}/images-compressed/indexcorp.webp`,
    priceRange: "$$",
    founder: { "@id": `${SITE}/#sacha` },
    areaServed: [
      { "@type": "City", name: "Paris" },
      { "@type": "Country", name: "France" },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
      ...(LEGAL.adresse ? { streetAddress: LEGAL.adresse } : {}),
    },
    makesOffer: [
      "Photographie d'événement d'entreprise",
      "Couverture de salon et de congrès",
      "Reportage institutionnel",
      "Portraits en entreprise",
      "Photographie de conférence",
    ].map((nom) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: nom } })),
  };

  const siteWeb = {
    "@type": "WebSite",
    "@id": `${SITE}/#site`,
    url: SITE,
    name: "Sacha Nahum",
    inLanguage: "fr-FR",
    publisher: { "@id": `${SITE}/#sacha` },
  };

  const donnees = { "@context": "https://schema.org", "@graph": [personne, service, siteWeb] };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(donnees) }} />
  );
}

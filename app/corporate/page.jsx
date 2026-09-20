import CorporateGrid from "./CorporateGrid";

export const metadata = {
  title: "Corporate — Sacha Nahum, photographe d'entreprise",
  description:
    "Photographie d'événements d'entreprise et de reportages institutionnels : séminaires, assemblées générales, remises de diplômes et campagnes de marque.",
  alternates: { canonical: "/corporate" },
  openGraph: {
    title: "Corporate — Sacha Nahum",
    description: "Événements d'entreprise et reportages institutionnels.",
    url: "/corporate",
    type: "website",
  },
};

export default function CorporatePage() {
  return <CorporateGrid />;
}

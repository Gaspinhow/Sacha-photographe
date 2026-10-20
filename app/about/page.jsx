import AboutContent from "./AboutContent";

export const metadata = {
  title: "Qui suis-je — Sacha Nahum, photographe",
  description:
    "Sacha Nahum parcourt le monde à la recherche de projets humains et sociaux qui racontent l'histoire d'autrui.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Qui suis-je — Sacha Nahum",
    description: "Entre reportage documentaire et commande institutionnelle.",
    url: "/about",
    type: "profile",
    images: [{ url: "/images-compressed/photosach.webp", alt: "Sacha Nahum" }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}

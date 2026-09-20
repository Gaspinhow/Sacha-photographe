import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact — Sacha Nahum, photographe",
  description:
    "Contacter Sacha Nahum pour un reportage, une couverture d'événement, une collaboration ou un tirage. Basé à Paris, disponible à l'international.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Sacha Nahum",
    description: "Pour toute demande de reportage, collaboration ou tirage.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactForm />;
}

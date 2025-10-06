import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
export const metadata = {
  title: "Sacha Nahum – Photographe professionnel | Événements, Corporate, Portraits",
  description: "Sacha Nahum, photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques. Photographie corporate, soirées et projets personnels à Paris.",
  keywords: "Sacha Nahum, photographe, photographe professionnel, photographie événement, photographie corporate, reportage institutionnel, portrait artistique, Paris, événements d'entreprise",
  authors: [{ name: "Sacha Nahum" }],
  creator: "Sacha Nahum",
  publisher: "Sacha Nahum",
  openGraph: {
    title: "Sacha Nahum – Photographe professionnel",
    description: "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    type: "website",
    locale: "fr_FR",
    siteName: "Sacha Nahum Photographe",
    images: [
      {
        url: "/images/repo.jpg",
        width: 1200,
        height: 630,
        alt: "Sacha Nahum - Photographe professionnel"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacha Nahum – Photographe professionnel",
    description: "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    images: ["/images/repo.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "votre-code-verification-google", // À remplacer par votre code Google Search Console
  }
};
export default function RootLayout({children}){
  return (
    <html lang="fr">
      <head>
        <StructuredData />
      </head>
      <body>
        <div className="cursor-glow" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

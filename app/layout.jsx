import "./globals.css";
import { Cormorant_Garamond } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
// ✅ IMPORT DU CONTEXTE POUR LE BILINGUE
import { LanguageProvider } from "./context/LanguageContext"; 

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

export const metadata = {
  metadataBase: new URL("https://www.sacha-nahum.com"),
  title: "Sacha Nahum – Photographe professionnel | Événements, Corporate, Portraits",
  description: "Sacha Nahum, photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
  keywords: "Sacha Nahum, photographe, photographe professionnel, photographie événement, photographie corporate, reportage institutionnel, portrait artistique, Paris",
  authors: [{ name: "Sacha Nahum" }],
  creator: "Sacha Nahum",
  publisher: "Sacha Nahum",
  openGraph: {
    title: "Sacha Nahum – Photographe professionnel",
    description: "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    type: "website",
    locale: "fr_FR",
    siteName: "Sacha Nahum Photographe",
    images: [{ url: "/images-compressed/repo.webp", width: 1200, height: 630, alt: "Sacha Nahum - Photographe professionnel" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacha Nahum – Photographe professionnel",
    description: "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    images: ["/images-compressed/repo.webp"]
  },
  robots: { index: true, follow: true },
  verification: { google: "google5e410f2d46014fbe" }
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={cormorant.variable}>
      <head>
        <StructuredData />
      </head>
      {/* Changement ici : font-serif pour activer la Garamond sur tout le texte du site */}
      <body className="font-serif antialiased text-black bg-white">
        <LanguageProvider>
          <div className="cursor-glow" />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
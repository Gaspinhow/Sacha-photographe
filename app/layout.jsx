import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export const metadata={title:"Sacha Nahum – Photographe professionnel"};
export default function RootLayout({children}){
  return (
    <html lang="fr">
      <body>
        <div className="cursor-glow" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

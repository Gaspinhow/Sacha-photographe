import PrivacyContent from "./PrivacyContent";

export const metadata = {
  title: "Politique de confidentialité — Sacha Nahum",
  description:
    "Comment les données envoyées via le formulaire de contact du site de Sacha Nahum sont utilisées, conservées et protégées.",
  alternates: { canonical: "/confidentialite" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}

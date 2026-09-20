import LegalContent from "./LegalContent";

export const metadata = {
  title: "Mentions légales — Sacha Nahum",
  description: "Mentions légales du site de Sacha Nahum, photographe.",
  alternates: { canonical: "/mentions-legales" },
  robots: { index: false, follow: true },
};

export default function LegalPage() {
  return <LegalContent />;
}

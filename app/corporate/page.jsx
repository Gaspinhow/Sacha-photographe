import CorporateClients from "./CorporateClients";
import clients from "../../data/clients.json";

export const metadata = {
  title: "Reportages d'entreprise et institutionnels | Sacha Nahum",
  description:
    "Conventions, salons, conférences et remises de prix photographiés pour McDonald's, ESCP Business School, l'Ambassade de la RDC, la SITL, l'AUTF, le Crédit Agricole et d'autres.",
  alternates: { canonical: "/corporate" },
  openGraph: {
    title: "Reportages d'entreprise et institutionnels | Sacha Nahum",
    description: "McDonald's, ESCP Business School, Ambassade de la RDC, SITL, AUTF, Crédit Agricole…",
    url: "/corporate",
    type: "website",
    images: clients[0]?.couverture ? [{ url: clients[0].couverture, alt: clients[0].nom }] : undefined,
  },
};

export default function CorporatePage() {
  return <CorporateClients />;
}

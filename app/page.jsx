import HomeSections from "./HomeSections";

export const metadata = {
  title: "Photographe événementiel et corporate à Paris | Sacha Nahum",
  description:
    "Conventions, salons, conférences et portraits pour les entreprises, les agences et les institutions. Reportages pour McDonald's, ESCP, le Parlement européen, l'Ambassade de la RDC, la SITL et l'AUTF.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Photographe événementiel et corporate à Paris | Sacha Nahum",
    description: "Conventions, salons, conférences et portraits pour les entreprises, les agences et les institutions.",
    url: "/",
    type: "website",
  },
};

export default function HomePage() {
  return <HomeSections />;
}

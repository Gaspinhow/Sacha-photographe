import ReportageGrid from "./ReportageGrid";

export const metadata = {
  title: "Reportage — Sacha Nahum, photographe documentaire",
  description:
    "Reportages documentaires de Sacha Nahum : porteurs de soufre en Indonésie, tour du Mont Blanc, pêche en Laponie et rencontres au long cours.",
  alternates: { canonical: "/reportage" },
  openGraph: {
    title: "Reportage — Sacha Nahum",
    description: "Reportages documentaires : Indonésie, Mont Blanc, Laponie et rencontres au long cours.",
    url: "/reportage",
    type: "website",
  },
};

export default function ReportagePage() {
  return <ReportageGrid />;
}

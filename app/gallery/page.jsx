import projects from "../../data/projects";
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("../../components/Gallery"), { ssr: false });

export const metadata = { title: "Galerie — Projets" };

export default function Page() {
  return <Gallery projects={projects} />;
}

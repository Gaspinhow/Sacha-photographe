import { notFound } from "next/navigation";
import { projects } from "../../../data/projects/index";
import { photoInfo } from "../../../components/Photo";
import ProjectGallery from "./ProjectGallery";

const findProject = (id) => projects.find((p) => p.id === id);

// Chaque projet est connu au build : les 18 pages sont générées en statique.
export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

// Sans ça les 18 pages projet partageaient le titre et la description du site,
// et Google les voyait comme dix-huit fois la même page.
export function generateMetadata({ params }) {
  const project = findProject(params.id);
  if (!project) return { title: "Page introuvable — Sacha Nahum" };

  const cover = project.coverImage || (project.images && project.images[0]);
  const info = cover ? photoInfo(cover) : null;
  const title = `${project.title} — Sacha Nahum, photographe`;
  const url = `/reportage/${project.id}`;
  const images = cover ? [{ url: cover, width: info?.w, height: info?.h, alt: project.title }] : undefined;

  return {
    title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { title, description: project.description, type: "article", url, images },
    twitter: { card: "summary_large_image", title, description: project.description, images: cover ? [cover] : undefined },
  };
}

export default function ProjectPage({ params }) {
  const project = findProject(params.id);
  if (!project) notFound(); // un identifiant inconnu renvoyait un 200 avec une page blanche

  return <ProjectGallery project={project} />;
}

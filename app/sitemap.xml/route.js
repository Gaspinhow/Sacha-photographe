import { projects } from '../../data/projects/index';

export async function GET() {
  const baseUrl = 'https://www.sacha-nahum.com';
  const lastModified = new Date().toISOString();

  const pages = [
    { url: '', changeFrequency: 'monthly', priority: 1 },
    { url: '/reportage', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/corporate', changeFrequency: 'weekly', priority: 0.9 },
    { url: '/about', changeFrequency: 'monthly', priority: 0.8 },
    { url: '/contact', changeFrequency: 'monthly', priority: 0.7 },
    // Mentions legales et confidentialite sont en noindex : les lister ici
    // enverrait a Google deux signaux contradictoires.
    // Une entrée par projet : ce sont ces pages-là que Google doit trouver.
    ...projects.map(p => ({ url: `/reportage/${p.id}`, changeFrequency: 'monthly', priority: 0.8 })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
  )
  .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}

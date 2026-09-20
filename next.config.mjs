/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimisation Vercel désactivée : elle est facturée, et les déclinaisons
    // sont déjà produites au build par scripts/generate-image-sizes.mjs.
    unoptimized: true
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Empêche l'affichage du site dans une iframe sur un autre domaine
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          // Empêche le navigateur de deviner un type de fichier différent de celui annoncé
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Ne transmet pas l'adresse complète de la page aux sites externes
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
        ],
      },
      {
        // Les photos ne changent jamais sans changer de nom : inutile de les
        // revalider à chaque visite, ce qui était le cas par défaut.
        source: '/images-compressed/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' },
        ],
      },
    ];
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Optimisation Vercel désactivée : elle est facturée, et les déclinaisons
    // sont déjà produites au build par scripts/generate-image-sizes.mjs.
    unoptimized: true
  },

  // Les reportages d'entreprise avaient chacun leur page ; ils sont maintenant
  // regroupés par client sur /corporate. On renvoie les anciennes adresses vers
  // la bonne section plutôt que de les laisser tomber en 404.
  async redirects() {
    const versCorporate = {
      'mcdonalds': 'mcdonalds',
      'escp-diplome': 'escp',
      'escp-parlement': 'escp',
      'ambassade-rdc': 'ambassade-rdc',
      'sitl-2025': 'sitl',
      'sce-supply': 'supply-chain-event',
      'autf-pro': 'autf',
      'credit-agricole': 'credit-agricole',
      'epita': 'epita',
      'dsm-firmenich': 'dsm-firmenich',
      'hogan-reseautage': 'hogan-lovells',
      'hogan-recital': 'hogan-lovells',
      'snitem-roland-garros': 'snitem',
    };
    return Object.entries(versCorporate).map(([ancien, ancre]) => ({
      source: `/reportage/${ancien}`,
      destination: `/corporate#${ancre}`,
      permanent: true,
    }));
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

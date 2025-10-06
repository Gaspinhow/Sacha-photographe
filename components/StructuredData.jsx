export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sacha Nahum",
    "jobTitle": "Photographe professionnel",
    "description": "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    "url": "https://votre-domaine.com",
    "sameAs": [
      // Ajoutez ici vos réseaux sociaux si vous en avez
    ],
    "knowsAbout": [
      "Photographie d'événements",
      "Photographie corporate", 
      "Reportage institutionnel",
      "Portrait artistique",
      "Photographie de soirées",
      "Photographie d'entreprise"
    ],
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Photographe professionnel",
      "description": "Spécialisé dans la photographie d'événements, corporate et portraits",
      "skills": [
        "Photographie d'événements d'entreprise",
        "Reportages institutionnels", 
        "Portraits artistiques",
        "Photographie corporate",
        "Photographie de soirées"
      ]
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Paris",
      "addressCountry": "France"
    },
    "image": "https://votre-domaine.com/images/repo.jpg"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

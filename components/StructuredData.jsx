export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Sacha Nahum",
    "jobTitle": "Photographe professionnel",
    "description": "Photographe professionnel spécialisé dans les événements d'entreprise, reportages institutionnels et portraits artistiques.",
    "url": "https://www.sacha-nahum.com",
    "sameAs": [
      "https://fr.linkedin.com/in/sacha-nahum-a06279281",
      "https://www.instagram.com/sacha_nahum"
    ],
    "email": "photo@sacha-nahum.com",
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
    "image": "https://www.sacha-nahum.com/images-compressed/photosach.webp"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

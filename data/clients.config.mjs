// Classement et intitulés de la page Corporate, repris du cahier des charges V2.
// Règle d'affichage : plus le client est gros et connu, plus il est haut.
// Un client = une section ; plusieurs éditions d'un même événement = un seul
// reportage, et le titre le dit.
//
// `dossier` renvoie au dossier de photos livré, `ancre` sert aux liens directs
// des mails de prospection (sacha-nahum.com/corporate#escp).
export const CLIENTS = [
  {
    rang: 1, ancre: "mcdonalds", nom: "McDonald's", dossier: "01_McDonalds",
    reportages: [{ titre: "Campagne filière pomme de terre" }],
  },
  {
    rang: 2, ancre: "escp", nom: "ESCP Business School", dossier: "02_ESCP",
    reportages: [
      { sousDossier: "a_Parlement-europeen-2-editions", titre: "Séminaires au Parlement européen — éditions 2024 et 2026" },
      { sousDossier: "b_Remise-des-diplomes", titre: "Remise des diplômes" },
      { sousDossier: "c_ESCP-Woman", titre: "ESCP Woman" },
      { sousDossier: "d_Conference", titre: "Conférence" },
    ],
  },
  {
    rang: 3, ancre: "ambassade-rdc", nom: "Ambassade de la RDC", dossier: "03_Ambassade-RDC",
    reportages: [{ titre: "Conférence et réception, Paris" }],
  },
  {
    rang: 4, ancre: "sitl", nom: "SITL", dossier: "04_SITL-2-editions",
    reportages: [{ titre: "SITL — éditions 2025 et 2026" }],
  },
  {
    rang: 5, ancre: "supply-chain-event", nom: "Supply Chain Event", dossier: "05_Supply-Chain-Event",
    reportages: [{ titre: "Couverture du salon" }],
  },
  {
    rang: 6, ancre: "autf", nom: "AUTF", dossier: "06_AUTF-2-editions",
    reportages: [{ titre: "AUTF — éditions 2024 et 2026" }],
  },
  {
    rang: 7, ancre: "credit-agricole", nom: "Crédit Agricole", dossier: "07_Credit-Agricole",
    reportages: [{ titre: "Nouveau bâtiment, Limoges" }],
  },
  {
    rang: 8, ancre: "epita", nom: "EPITA", dossier: "08_EPITA",
    reportages: [{ titre: "Vie de campus" }],
  },
  {
    rang: 9, ancre: "dsm-firmenich", nom: "dsm-firmenich", dossier: "09_dsm-firmenich",
    reportages: [{ titre: "Capital Markets Day 2024" }],
  },
  {
    rang: 10, ancre: "hogan-lovells", nom: "Hogan Lovells", dossier: "10_Hogan-Lovells",
    reportages: [
      { sousDossier: "a_Soiree-reseautage", titre: "Soirée réseautage" },
      { sousDossier: "b_Recital-salle-Cortot", titre: "Récital salle Cortot" },
    ],
  },
  {
    rang: 11, ancre: "snitem", nom: "Snitem", dossier: "11_Snitem",
    reportages: [{ titre: "Assemblée générale, Roland-Garros" }],
  },
];

// Ligne de références de l'accueil, dans l'ordre du classement.
export const REFERENCES_ACCUEIL = [
  "McDonald's", "ESCP", "Parlement européen", "Ambassade de la RDC", "SITL", "AUTF",
];

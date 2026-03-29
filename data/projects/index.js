// --- REPORTAGES ---
import indonesie from './indonesie.json';
import TMB from './TMB.json';
import bagarre from './bagarre.json';
import laponie from './laponie.json';
import Bruno from './bruno.json';
// --- CORPORATE (Missions Business & Institutionnelles) ---
import ambassade from './ambassade-rdc-france.json';
import creditAgricole from './credit-agricole-limousin.json';
import mcdonalds from './campagne-mcdonalds.json';
import epita from './epita-communication.json';
import dsm from './dsm-firmenich-capital-market-day-2024.json'; 
import escpDiplome from './remise-de-diplomes-escp-hotel-potocki-paris.json';

// Les nouveaux que tu viens de me donner (Vérifie bien l'extension .json dans ton dossier)
import hoganReseautage from './soiree-hogan-lovells-reseautage-et-convivialite.json';
import hoganRecital from './soiree-organ-levels-recital-a-la-salle-cortot.json'; // Note: J'ai gardé 'organ-levels' comme tu l'as écrit
import sitl from './sitl-2025-innovations-et-rencontres-cles-du-secteur.json';
import escpParlement from './seminaire-escp-au-parlement-europeen.json';
import sceSupply from './scesupplychainevents-couverture-photographique.json';
import autf from './autf-evenement-professionnel-sectoriel.json';
import snitem from './assemblee-generale-du-snitem-roland-garros.json';

export const projects = [
  // SECTION REPORTAGE
  { ...indonesie, id: "indonesie", category: "reportage" },
  { ...TMB, id: "TMB", category: "reportage" },
  { ...Bruno, id: "Bruno", category: "reportage" },
  { ...bagarre, id: "bagarre", category: "reportage" },
  { ...laponie, id: "laponie", category: "reportage" },

  // SECTION CORPORATE
  { ...ambassade, id: "ambassade-rdc", category: "corporate" },
  { ...creditAgricole, id: "credit-agricole", category: "corporate" },
  { ...mcdonalds, id: "mcdonalds", category: "corporate" },
  { ...epita, id: "epita", category: "corporate" },
  { ...dsm, id: "dsm-firmenich", category: "corporate" },
  { ...escpDiplome, id: "escp-diplome", category: "corporate" },
  { ...hoganReseautage, id: "hogan-reseautage", category: "corporate" },
  { ...hoganRecital, id: "hogan-recital", category: "corporate" },
  { ...sitl, id: "sitl-2025", category: "corporate" },
  { ...escpParlement, id: "escp-parlement", category: "corporate" },
  { ...sceSupply, id: "sce-supply", category: "corporate" },
  { ...autf, id: "autf-pro", category: "corporate" },
  { ...snitem, id: "snitem-roland-garros", category: "corporate" }
];
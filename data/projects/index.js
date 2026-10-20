// Séries personnelles de la section Reportage.
// Les reportages d'entreprise ne sont plus des pages séparées : depuis la V2
// ils vivent dans la page Corporate, un client par section (voir data/clients.json).
import indonesie from './indonesie.json';
import TMB from './TMB.json';
import bagarre from './bagarre.json';
import laponie from './laponie.json';
import Bruno from './bruno.json';

export const projects = [
  { ...indonesie, id: "indonesie", category: "reportage" },
  { ...TMB, id: "TMB", category: "reportage" },
  { ...Bruno, id: "Bruno", category: "reportage" },
  { ...bagarre, id: "bagarre", category: "reportage" },
  { ...laponie, id: "laponie", category: "reportage" },
];

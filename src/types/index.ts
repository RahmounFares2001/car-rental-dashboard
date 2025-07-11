
export interface Vehicle {
  id: string;
  marque: string;
  modele: string;
  type: 'Économique' | 'SUV' | 'Luxe';
  statut: 'Disponible' | 'Loué';
  prixParJour: number;
  photo?: string;
  createdAt: Date;
}

export interface Client {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  adresse?: string;
  dateNaissance?: Date;
  createdAt: Date;
}

export interface Reservation {
  id: string;
  clientId: string;
  vehicleId: string;
  dateDebut: Date;
  dateFin: Date;
  prixTotal: number;
  statut: 'En cours' | 'Terminée' | 'Annulée';
}

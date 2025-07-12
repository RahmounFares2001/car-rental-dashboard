
import { useState, useMemo } from "react";
import { Search, Filter, Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReservationCard } from "@/components/ReservationCard";
import { ReservationUpdateModal } from "@/components/ReservationUpdateModal";
import { NewReservationModal } from "@/components/NewReservationModal";
import { Reservation } from "@/types";

// Données de démonstration
const mockReservations: Reservation[] = [
  {
    id: "1",
    client: {
      id: "1",
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@email.com",
      telephone: "06 12 34 56 78",
      createdAt: new Date(),
    },
    vehicule: {
      id: "1",
      marque: "BMW",
      modele: "Série 3",
      type: "Luxe",
      statut: "Loué",
      prixParJour: 120,
      createdAt: new Date(),
    },
    dateDebut: new Date('2024-01-15'),
    dateFin: new Date('2024-01-20'),
    prixTotal: 600,
    statut: "Confirmée",
    createdAt: new Date(),
  },
  {
    id: "2",
    client: {
      id: "2",
      nom: "Martin",
      prenom: "Marie",
      email: "marie.martin@email.com",
      telephone: "06 87 65 43 21",
      createdAt: new Date(),
    },
    vehicule: {
      id: "2",
      marque: "Mercedes",
      modele: "Classe A",
      type: "Économique",
      statut: "Disponible",
      prixParJour: 80,
      createdAt: new Date(),
    },
    dateDebut: new Date('2024-01-22'),
    dateFin: new Date('2024-01-25'),
    prixTotal: 240,
    statut: "En attente",
    createdAt: new Date(),
  },
  {
    id: "3",
    client: {
      id: "3",
      nom: "Bernard",
      prenom: "Pierre",
      email: "pierre.bernard@email.com",
      telephone: "06 11 22 33 44",
      createdAt: new Date(),
    },
    vehicule: {
      id: "3",
      marque: "Audi",
      modele: "Q5",
      type: "SUV",
      statut: "Disponible",
      prixParJour: 150,
      createdAt: new Date(),
    },
    dateDebut: new Date('2024-01-10'),
    dateFin: new Date('2024-01-12'),
    prixTotal: 300,
    statut: "Annulée",
    createdAt: new Date(),
  },
  {
    id: "4",
    client: {
      id: "4",
      nom: "Petit",
      prenom: "Sophie",
      email: "sophie.petit@email.com",
      telephone: "06 55 66 77 88",
      createdAt: new Date(),
    },
    vehicule: {
      id: "4",
      marque: "Porsche",
      modele: "911",
      type: "Luxe",
      statut: "Disponible",
      prixParJour: 350,
      createdAt: new Date(),
    },
    dateDebut: new Date('2024-01-28'),
    dateFin: new Date('2024-02-02'),
    prixTotal: 1750,
    statut: "Confirmée",
    createdAt: new Date(),
  },
  {
    id: "5",
    client: {
      id: "5",
      nom: "Durand",
      prenom: "Lucas",
      email: "lucas.durand@email.com",
      telephone: "06 99 88 77 66",
      createdAt: new Date(),
    },
    vehicule: {
      id: "5",
      marque: "Range Rover",
      modele: "Evoque",
      type: "SUV",
      statut: "Loué",
      prixParJour: 200,
      createdAt: new Date(),
    },
    dateDebut: new Date('2024-02-05'),
    dateFin: new Date('2024-02-08'),
    prixTotal: 600,
    statut: "En attente",
    createdAt: new Date(),
  },
];

export default function Reservations() {
  const [reservations, setReservations] = useState<Reservation[]>(mockReservations);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isNewReservationModalOpen, setIsNewReservationModalOpen] = useState(false);

  const itemsPerPage = 10;

  const filteredReservations = useMemo(() => {
    return reservations.filter((reservation) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        reservation.client.nom.toLowerCase().includes(searchLower) ||
        reservation.client.prenom.toLowerCase().includes(searchLower) ||
        reservation.client.email.toLowerCase().includes(searchLower) ||
        reservation.vehicule.marque.toLowerCase().includes(searchLower) ||
        reservation.vehicule.modele.toLowerCase().includes(searchLower);
      
      const matchesStatus = statusFilter === "all" || reservation.statut === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [reservations, searchTerm, statusFilter]);

  const paginatedReservations = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReservations.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReservations, currentPage]);

  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);

  const handleUpdateStatus = (reservation: Reservation) => {
    setSelectedReservation(reservation);
    setIsUpdateModalOpen(true);
  };

  const handleReservationUpdate = (updatedReservation: Reservation) => {
    setReservations(prev => 
      prev.map(res => 
        res.id === updatedReservation.id ? updatedReservation : res
      )
    );
  };

  const handleNewReservation = (newReservation: Reservation) => {
    setReservations(prev => [newReservation, ...prev]);
  };

  const handleViewDetails = (reservation: Reservation) => {
    console.log("Voir détails réservation:", reservation);
    // Ici on pourrait ouvrir une modale avec tous les détails
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Réservations</h1>
          <p className="text-muted-foreground mt-1">
            {filteredReservations.length} réservation{filteredReservations.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button 
          className="premium-gradient text-black font-medium"
          onClick={() => setIsNewReservationModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Nouvelle réservation
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher par nom, email ou véhicule..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="En attente">En attente</SelectItem>
              <SelectItem value="Confirmée">Confirmée</SelectItem>
              <SelectItem value="Annulée">Annulée</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Liste des réservations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paginatedReservations.map((reservation) => (
          <ReservationCard
            key={reservation.id}
            reservation={reservation}
            onUpdateStatus={handleUpdateStatus}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredReservations.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">Aucune réservation trouvée</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Précédent
          </Button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              onClick={() => setCurrentPage(page)}
              className={currentPage === page ? "premium-gradient text-black" : ""}
            >
              {page}
            </Button>
          ))}
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}

      {/* Modal de mise à jour */}
      {selectedReservation && (
        <ReservationUpdateModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedReservation(null);
          }}
          reservation={selectedReservation}
          onUpdate={handleReservationUpdate}
        />
      )}

      {/* Modal de nouvelle réservation */}
      <NewReservationModal
        isOpen={isNewReservationModalOpen}
        onClose={() => setIsNewReservationModalOpen(false)}
        onAdd={handleNewReservation}
      />
    </div>
  );
}

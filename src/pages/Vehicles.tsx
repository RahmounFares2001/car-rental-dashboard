import { useState, useMemo } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VehicleCard } from "@/components/VehicleCard";
import { VehicleForm } from "@/components/VehicleForm";
import { Vehicle } from "@/types";
import { VehicleDetailsModal } from "@/components/VehicleDetailsModal";

// Données de démonstration
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    marque: "BMW",
    modele: "Série 3",
    type: "Luxe",
    statut: "Disponible",
    prixParJour: 120,
    createdAt: new Date(),
  },
  {
    id: "2",
    marque: "Mercedes",
    modele: "Classe A",
    type: "Économique",
    statut: "Loué",
    prixParJour: 80,
    createdAt: new Date(),
  },
  {
    id: "3",
    marque: "Audi",
    modele: "Q5",
    type: "SUV",
    statut: "Disponible",
    prixParJour: 150,
    createdAt: new Date(),
  },
  {
    id: "4",
    marque: "Porsche",
    modele: "911",
    type: "Luxe",
    statut: "Disponible",
    prixParJour: 350,
    createdAt: new Date(),
  },
  {
    id: "5",
    marque: "Range Rover",
    modele: "Evoque",
    type: "SUV",
    statut: "Loué",
    prixParJour: 200,
    createdAt: new Date(),
  },
  {
    id: "6",
    marque: "Volkswagen",
    modele: "Golf",
    type: "Économique",
    statut: "Disponible",
    prixParJour: 60,
    createdAt: new Date(),
  },
];

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Vehicle | undefined>();
  const [selectedVehicleForDetails, setSelectedVehicleForDetails] = useState<Vehicle | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const itemsPerPage = 12;

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      const matchesSearch = 
        vehicle.marque.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.modele.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === "all" || vehicle.type === typeFilter;
      const matchesStatus = statusFilter === "all" || vehicle.statut === statusFilter;
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [vehicles, searchTerm, typeFilter, statusFilter]);

  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredVehicles.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredVehicles, currentPage]);

  const totalPages = Math.ceil(filteredVehicles.length / itemsPerPage);

  const handleAddVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    const newVehicle: Vehicle = {
      ...vehicleData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const handleEditVehicle = (vehicleData: Omit<Vehicle, 'id' | 'createdAt'>) => {
    if (editingVehicle) {
      setVehicles(vehicles.map(v => 
        v.id === editingVehicle.id 
          ? { ...vehicleData, id: editingVehicle.id, createdAt: editingVehicle.createdAt }
          : v
      ));
      setEditingVehicle(undefined);
    }
  };

  const openEditForm = (vehicle: Vehicle) => {
    setEditingVehicle(vehicle);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingVehicle(undefined);
  };

  const handleViewDetails = (vehicle: Vehicle) => {
    setSelectedVehicleForDetails(vehicle);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Véhicules</h1>
          <p className="text-muted-foreground mt-1">
            {filteredVehicles.length} véhicule{filteredVehicles.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="premium-gradient text-black font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un véhicule
        </Button>
      </div>

      {/* Filtres et recherche */}
      <div className="glass-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher par marque ou modèle..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous types</SelectItem>
              <SelectItem value="Économique">Économique</SelectItem>
              <SelectItem value="SUV">SUV</SelectItem>
              <SelectItem value="Luxe">Luxe</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous statuts</SelectItem>
              <SelectItem value="Disponible">Disponible</SelectItem>
              <SelectItem value="Loué">Loué</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grille des véhicules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {paginatedVehicles.map((vehicle) => (
          <VehicleCard
            key={vehicle.id}
            vehicle={vehicle}
            onEdit={openEditForm}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

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

      {/* Formulaire d'ajout/modification */}
      <VehicleForm
        open={isFormOpen}
        onClose={closeForm}
        onSubmit={editingVehicle ? handleEditVehicle : handleAddVehicle}
        vehicle={editingVehicle}
      />

      {/* Modal des détails du véhicule */}
      {selectedVehicleForDetails && (
        <VehicleDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedVehicleForDetails(null);
          }}
          vehicle={selectedVehicleForDetails}
        />
      )}
    </div>
  );
}

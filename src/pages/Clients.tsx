import { useState, useMemo } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClientCard } from "@/components/ClientCard";
import { Client } from "@/types";
import { ClientDetailsModal } from "@/components/ClientDetailsModal";

// Données de démonstration
const mockClients: Client[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Jean",
    email: "jean.dupont@email.com",
    telephone: "06 12 34 56 78",
    createdAt: new Date(),
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Marie",
    email: "marie.martin@email.com",
    telephone: "06 87 65 43 21",
    createdAt: new Date(),
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Pierre",
    email: "pierre.bernard@email.com",
    telephone: "06 11 22 33 44",
    createdAt: new Date(),
  },
  {
    id: "4",
    nom: "Petit",
    prenom: "Sophie",
    email: "sophie.petit@email.com",
    telephone: "06 55 66 77 88",
    createdAt: new Date(),
  },
  {
    id: "5",
    nom: "Durand",
    prenom: "Lucas",
    email: "lucas.durand@email.com",
    telephone: "06 99 88 77 66",
    createdAt: new Date(),
  },
  {
    id: "6",
    nom: "Moreau",
    prenom: "Emma",
    email: "emma.moreau@email.com",
    telephone: "06 33 44 55 66",
    createdAt: new Date(),
  },
  {
    id: "7",
    nom: "Simon",
    prenom: "Thomas",
    email: "thomas.simon@email.com",
    telephone: "06 77 88 99 00",
    createdAt: new Date(),
  },
  {
    id: "8",
    nom: "Laurent",
    prenom: "Camille",
    email: "camille.laurent@email.com",
    telephone: "06 22 33 44 55",
    createdAt: new Date(),
  },
  {
    id: "9",
    nom: "Lefebvre",
    prenom: "Antoine",
    email: "antoine.lefebvre@email.com",
    telephone: "06 66 77 88 99",
    createdAt: new Date(),
  },
  {
    id: "10",
    nom: "Roux",
    prenom: "Clara",
    email: "clara.roux@email.com",
    telephone: "06 44 55 66 77",
    createdAt: new Date(),
  },
];

export default function Clients() {
  const [clients, setClients] = useState<Client[]>(mockClients);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClientForDetails, setSelectedClientForDetails] = useState<Client | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const itemsPerPage = 10;

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        client.nom.toLowerCase().includes(searchLower) ||
        client.prenom.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.telephone.includes(searchTerm)
      );
    });
  }, [clients, searchTerm]);

  const paginatedClients = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredClients.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredClients, currentPage]);

  const totalPages = Math.ceil(filteredClients.length / itemsPerPage);

  const handleEditClient = (client: Client) => {
    console.log("Modifier client:", client);
  };

  const handleViewDetails = (client: Client) => {
    setSelectedClientForDetails(client);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des Clients</h1>
          <p className="text-muted-foreground mt-1">
            {filteredClients.length} client{filteredClients.length > 1 ? 's' : ''} au total
          </p>
        </div>
        <Button className="premium-gradient text-black font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un client
        </Button>
      </div>

      {/* Barre de recherche */}
      <div className="glass-card p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un client..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Liste des clients */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {paginatedClients.map((client) => (
          <ClientCard
            key={client.id}
            client={client}
            onEdit={handleEditClient}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {/* Message si aucun résultat */}
      {filteredClients.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Aucun client trouvé</p>
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

      {/* Modal des détails du client */}
      {selectedClientForDetails && (
        <ClientDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedClientForDetails(null);
          }}
          client={selectedClientForDetails}
        />
      )}
    </div>
  );
}

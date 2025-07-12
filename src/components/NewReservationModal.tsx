
import { useState } from "react";
import { Calendar, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Reservation, Client, Vehicle } from "@/types";
import { useToast } from "@/hooks/use-toast";

interface NewReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (reservation: Reservation) => void;
}

// Mock data pour les clients et véhicules
const mockClients: Client[] = [
  { id: "1", nom: "Dupont", prenom: "Jean", email: "jean.dupont@email.com", telephone: "06 12 34 56 78", createdAt: new Date() },
  { id: "2", nom: "Martin", prenom: "Marie", email: "marie.martin@email.com", telephone: "06 87 65 43 21", createdAt: new Date() },
];

const mockVehicles: Vehicle[] = [
  { id: "1", marque: "BMW", modele: "Série 3", type: "Luxe", statut: "Disponible", prixParJour: 120, createdAt: new Date() },
  { id: "2", marque: "Mercedes", modele: "Classe A", type: "Économique", statut: "Disponible", prixParJour: 80, createdAt: new Date() },
];

export function NewReservationModal({ isOpen, onClose, onAdd }: NewReservationModalProps) {
  const [clientId, setClientId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!clientId || !vehicleId || !startDate || !endDate) {
      toast({
        title: "Erreur",
        description: "Tous les champs sont obligatoires",
        variant: "destructive",
      });
      return;
    }

    const client = mockClients.find(c => c.id === clientId);
    const vehicle = mockVehicles.find(v => v.id === vehicleId);

    if (!client || !vehicle) {
      toast({
        title: "Erreur",
        description: "Client ou véhicule introuvable",
        variant: "destructive",
      });
      return;
    }

    const days = Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24));
    const totalPrice = days * vehicle.prixParJour;

    const newReservation: Reservation = {
      id: Date.now().toString(),
      client,
      vehicule: vehicle,
      dateDebut: new Date(startDate),
      dateFin: new Date(endDate),
      prixTotal: totalPrice,
      statut: "En attente",
      createdAt: new Date(),
    };

    onAdd(newReservation);
    onClose();
    
    // Reset form
    setClientId("");
    setVehicleId("");
    setStartDate("");
    setEndDate("");

    toast({
      title: "Succès",
      description: "Réservation créée avec succès",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Plus className="w-5 h-5 text-primary" />
            Nouvelle réservation
          </DialogTitle>
          <DialogDescription>
            Créer une nouvelle réservation pour un client
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client" className="text-sm font-medium text-foreground">
              Client
            </Label>
            <Select value={clientId} onValueChange={setClientId} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un client" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.prenom} {client.nom}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicle" className="text-sm font-medium text-foreground">
              Véhicule
            </Label>
            <Select value={vehicleId} onValueChange={setVehicleId} required>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner un véhicule" />
              </SelectTrigger>
              <SelectContent>
                {mockVehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.marque} {vehicle.modele} - {vehicle.prixParJour}€/jour
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate" className="text-sm font-medium text-foreground">
                Date début
              </Label>
              <Input
                id="startDate"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate" className="text-sm font-medium text-foreground">
                Date fin
              </Label>
              <Input
                id="endDate"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 premium-gradient text-black font-medium">
              Créer la réservation
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

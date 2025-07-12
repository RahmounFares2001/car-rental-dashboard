
import { useState } from "react";
import { Calendar, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
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
import { Reservation } from "@/types";

interface ReservationUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
  onUpdate: (reservation: Reservation) => void;
}

export function ReservationUpdateModal({ 
  isOpen, 
  onClose, 
  reservation, 
  onUpdate 
}: ReservationUpdateModalProps) {
  const [status, setStatus] = useState<Reservation['statut']>(reservation.statut);
  const [startDate, setStartDate] = useState(
    reservation.dateDebut.toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState(
    reservation.dateFin.toISOString().split('T')[0]
  );
  const [totalPrice, setTotalPrice] = useState(reservation.prixTotal.toString());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedReservation: Reservation = {
      ...reservation,
      statut: status,
      dateDebut: new Date(startDate),
      dateFin: new Date(endDate),
      prixTotal: parseFloat(totalPrice),
    };

    onUpdate(updatedReservation);
    onClose();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            Mettre à jour la réservation
          </DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
            <X className="h-4 w-4" />
            <span className="sr-only">Fermer</span>
          </DialogClose>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Client</Label>
            <p className="text-sm text-muted-foreground">
              {reservation.client.prenom} {reservation.client.nom}
            </p>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Véhicule</Label>
            <p className="text-sm text-muted-foreground">
              {reservation.vehicule.marque} {reservation.vehicule.modele}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status" className="text-sm font-medium text-foreground">
              Statut
            </Label>
            <Select value={status} onValueChange={(value: Reservation['statut']) => setStatus(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Confirmée">Confirmée</SelectItem>
                <SelectItem value="Annulée">Annulée</SelectItem>
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

          <div className="space-y-2">
            <Label htmlFor="totalPrice" className="text-sm font-medium text-foreground">
              Prix total (€)
            </Label>
            <Input
              id="totalPrice"
              type="number"
              step="0.01"
              value={totalPrice}
              onChange={(e) => setTotalPrice(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 premium-gradient text-black font-medium">
              Mettre à jour
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

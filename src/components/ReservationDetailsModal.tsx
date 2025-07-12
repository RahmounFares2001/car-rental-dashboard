
import { Calendar, User, Car, MapPin, CreditCard, Clock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Reservation } from "@/types";

interface ReservationDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reservation: Reservation;
}

export function ReservationDetailsModal({ 
  isOpen, 
  onClose, 
  reservation 
}: ReservationDetailsModalProps) {
  const getStatusColor = (statut: Reservation['statut']) => {
    switch (statut) {
      case 'En attente':
        return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Confirmée':
        return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Annulée':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const duration = Math.ceil((reservation.dateFin.getTime() - reservation.dateDebut.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            Détails de la réservation
          </DialogTitle>
          <DialogDescription>
            Réservation #{reservation.id}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Statut</span>
            <Badge className={getStatusColor(reservation.statut)}>
              {reservation.statut}
            </Badge>
          </div>

          <Separator />

          {/* Client Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Informations client
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Nom complet</span>
                <p className="text-foreground">{reservation.client.prenom} {reservation.client.nom}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Email</span>
                <p className="text-foreground">{reservation.client.email}</p>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Téléphone</span>
                <p className="text-foreground">{reservation.client.telephone}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Vehicle Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Car className="w-5 h-5 text-primary" />
              Véhicule
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Véhicule</span>
                <p className="text-foreground">{reservation.vehicule.marque} {reservation.vehicule.modele}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Type</span>
                <p className="text-foreground">{reservation.vehicule.type}</p>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Prix par jour</span>
                <p className="text-foreground">{reservation.vehicule.prixParJour}€</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rental Period */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Période de location
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Date de début</span>
                <p className="text-foreground">{formatDate(reservation.dateDebut)}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Date de fin</span>
                <p className="text-foreground">{formatDate(reservation.dateFin)}</p>
              </div>
              <div className="col-span-2">
                <span className="text-sm font-medium text-muted-foreground">Durée</span>
                <p className="text-foreground">{duration} jour{duration > 1 ? 's' : ''}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Tarification
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Prix par jour</span>
                <span className="text-foreground">{reservation.vehicule.prixParJour}€</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nombre de jours</span>
                <span className="text-foreground">{duration}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-primary">{reservation.prixTotal}€</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

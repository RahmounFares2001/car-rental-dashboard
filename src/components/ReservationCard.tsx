
import { Calendar, User, Car, Eye, RotateCcw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reservation } from "@/types";

interface ReservationCardProps {
  reservation: Reservation;
  onUpdateStatus: (reservation: Reservation) => void;
  onViewDetails: (reservation: Reservation) => void;
}

export function ReservationCard({ reservation, onUpdateStatus, onViewDetails }: ReservationCardProps) {
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
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Card className="glass-card hover-scale group">
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {reservation.client.prenom} {reservation.client.nom}
              </h3>
              <p className="text-sm text-muted-foreground">{reservation.client.email}</p>
            </div>
            <Badge className={getStatusColor(reservation.statut)}>
              {reservation.statut}
            </Badge>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Car className="w-4 h-4 text-primary" />
              <span className="text-foreground">
                {reservation.vehicule.marque} {reservation.vehicule.modele}
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Du {formatDate(reservation.dateDebut)} au {formatDate(reservation.dateFin)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-xl font-bold text-primary">
                {reservation.prixTotal}€
              </span>
              <span className="text-muted-foreground">
                ({Math.ceil((reservation.dateFin.getTime() - reservation.dateDebut.getTime()) / (1000 * 60 * 60 * 24))} jours)
              </span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onUpdateStatus(reservation)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Mettre à jour
            </Button>
            <Button
              size="sm"
              onClick={() => onViewDetails(reservation)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Eye className="w-4 h-4 mr-1" />
              Détails
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

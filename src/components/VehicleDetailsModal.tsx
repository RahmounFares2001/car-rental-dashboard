
import { Car, DollarSign, Info, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Vehicle } from "@/types";

interface VehicleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle;
}

export function VehicleDetailsModal({ 
  isOpen, 
  onClose, 
  vehicle 
}: VehicleDetailsModalProps) {
  const getTypeColor = (type: Vehicle['type']) => {
    switch (type) {
      case 'Luxe': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'SUV': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Économique': return 'bg-green-500/20 text-green-300 border-green-500/30';
    }
  };

  const getStatusColor = (statut: Vehicle['statut']) => {
    return statut === 'Disponible' 
      ? 'bg-green-500/20 text-green-300 border-green-500/30'
      : 'bg-red-500/20 text-red-300 border-red-500/30';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <Car className="w-5 h-5 text-primary" />
            Détails du véhicule
          </DialogTitle>
          <DialogDescription>
            {vehicle.marque} {vehicle.modele}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Vehicle Image */}
          <div className="aspect-video bg-gradient-to-br from-accent to-muted rounded-lg flex items-center justify-center">
            {vehicle.photo ? (
              <img 
                src={vehicle.photo} 
                alt={`${vehicle.marque} ${vehicle.modele}`}
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <Car className="w-24 h-24 text-muted-foreground" />
            )}
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Informations générales
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Marque</span>
                <p className="text-foreground">{vehicle.marque}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Modèle</span>
                <p className="text-foreground">{vehicle.modele}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Type</span>
                <Badge className={getTypeColor(vehicle.type)}>
                  {vehicle.type}
                </Badge>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">Statut</span>
                <Badge className={getStatusColor(vehicle.statut)}>
                  {vehicle.statut}
                </Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Pricing */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              Tarification
            </h3>
            <div className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
              <span className="text-muted-foreground">Prix par jour</span>
              <span className="text-2xl font-bold text-primary">{vehicle.prixParJour}€</span>
            </div>
          </div>

          <Separator />

          {/* Additional Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Informations système
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Ajouté le</span>
                <p className="text-foreground">
                  {vehicle.createdAt.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

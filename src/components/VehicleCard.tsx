
import { Car, Edit, Eye, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/types";

interface VehicleCardProps {
  vehicle: Vehicle;
  onEdit: (vehicle: Vehicle) => void;
  onViewDetails: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onEdit, onViewDetails }: VehicleCardProps) {
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
    <Card className="glass-card hover-scale group cursor-pointer">
      <CardContent className="p-0">
        <div className="aspect-video bg-gradient-to-br from-accent to-muted rounded-t-lg flex items-center justify-center">
          {vehicle.photo ? (
            <img 
              src={vehicle.photo} 
              alt={`${vehicle.marque} ${vehicle.modele}`}
              className="w-full h-full object-cover rounded-t-lg"
            />
          ) : (
            <Car className="w-16 h-16 text-muted-foreground" />
          )}
        </div>
        
        <div className="p-4 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {vehicle.marque} {vehicle.modele}
            </h3>
            <div className="flex gap-2 mt-2">
              <Badge className={getTypeColor(vehicle.type)}>
                {vehicle.type}
              </Badge>
              <Badge className={getStatusColor(vehicle.statut)}>
                {vehicle.statut}
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">
              {vehicle.prixParJour}€
              <span className="text-sm font-normal text-muted-foreground">/jour</span>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(vehicle);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(vehicle);
                }}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

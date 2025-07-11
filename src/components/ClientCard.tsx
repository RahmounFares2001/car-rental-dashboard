
import { User, Edit, Eye, Phone, Mail } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Client } from "@/types";

interface ClientCardProps {
  client: Client;
  onEdit: (client: Client) => void;
  onViewDetails: (client: Client) => void;
}

export function ClientCard({ client, onEdit, onViewDetails }: ClientCardProps) {
  return (
    <Card className="glass-card hover-scale group">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              {client.prenom} {client.nom}
            </h3>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{client.telephone}</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(client)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Edit className="w-4 h-4 mr-1" />
                Modifier
              </Button>
              <Button
                size="sm"
                onClick={() => onViewDetails(client)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="w-4 h-4 mr-1" />
                Détails
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import { User, Mail, Phone, Calendar } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Client } from "@/types";

interface ClientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: Client;
}

export function ClientDetailsModal({ 
  isOpen, 
  onClose, 
  client 
}: ClientDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <User className="w-5 h-5 text-primary" />
            Détails du client
          </DialogTitle>
          <DialogDescription>
            Profil client complet
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Basic Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground text-center">
              {client.prenom} {client.nom}
            </h3>
          </div>

          <Separator />

          {/* Contact Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-medium text-muted-foreground block">Email</span>
                <span className="text-foreground">{client.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
              <Phone className="w-5 h-5 text-primary" />
              <div>
                <span className="text-sm font-medium text-muted-foreground block">Téléphone</span>
                <span className="text-foreground">{client.telephone}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Info */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Informations du compte
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <span className="text-sm font-medium text-muted-foreground">Client depuis le</span>
                <p className="text-foreground">
                  {client.createdAt.toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">ID Client</span>
                <p className="text-foreground font-mono">#{client.id}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

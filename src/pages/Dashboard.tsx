
import { Car, Users, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
  const stats = [
    {
      title: "Véhicules Total",
      value: "24",
      change: "+2 ce mois",
      icon: Car,
      color: "text-blue-400",
    },
    {
      title: "Clients Actifs",
      value: "156",
      change: "+12 ce mois",
      icon: Users,
      color: "text-green-400",
    },
    {
      title: "Locations en Cours",
      value: "8",
      change: "+3 aujourd'hui",
      icon: TrendingUp,
      color: "text-yellow-400",
    },
    {
      title: "Revenus du Mois",
      value: "12,850€",
      change: "+18% vs mois dernier",
      icon: DollarSign,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Aperçu de votre activité de location de véhicules de luxe
        </p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="glass-card hover-scale">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Section principale */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-foreground">Véhicules Populaires</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { nom: "BMW Série 3", locations: 15, revenus: "1,800€" },
              { nom: "Mercedes Classe A", locations: 12, revenus: "960€" },
              { nom: "Audi Q5", locations: 10, revenus: "1,500€" },
              { nom: "Porsche 911", locations: 8, revenus: "2,800€" },
            ].map((vehicle) => (
              <div key={vehicle.nom} className="flex items-center justify-between p-3 bg-accent/50 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">{vehicle.nom}</p>
                  <p className="text-sm text-muted-foreground">{vehicle.locations} locations</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{vehicle.revenus}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-foreground">Activité Récente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { action: "Nouvelle location", client: "Jean Dupont", vehicule: "BMW Série 3", time: "Il y a 2h" },
              { action: "Retour véhicule", client: "Marie Martin", vehicule: "Audi Q5", time: "Il y a 4h" },
              { action: "Nouveau client", client: "Pierre Bernard", vehicule: "-", time: "Il y a 6h" },
              { action: "Location terminée", client: "Sophie Petit", vehicule: "Mercedes Classe A", time: "Hier" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.client} {activity.vehicule !== "-" && `- ${activity.vehicule}`}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

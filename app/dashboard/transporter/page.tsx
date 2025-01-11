'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, TrendingUp, Clock, Star, Truck } from 'lucide-react'

export default function TransporterDashboard() {
  const [isAvailable, setIsAvailable] = useState(false)
  const [deliveryOpportunities] = useState([
    { id: 1, from: 'Dakar', to: 'Thiès', date: '2023-06-16', price: '15000 FCFA', distance: '70 km' },
    { id: 2, from: 'Saint-Louis', to: 'Louga', date: '2023-06-17', price: '12000 FCFA', distance: '50 km' },
    { id: 3, from: 'Ziguinchor', to: 'Kolda', date: '2023-06-18', price: '20000 FCFA', distance: '120 km' },
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord Transporteur</h1>
        <div className="flex items-center space-x-2">
          <Switch
            checked={isAvailable}
            onCheckedChange={setIsAvailable}
            id="available-mode"
          />
          <label htmlFor="available-mode" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {isAvailable ? 'Disponible' : 'Indisponible'}
          </label>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Livraisons du mois
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+10% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenus du mois
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">250000 FCFA</div>
            <p className="text-xs text-muted-foreground">+15% par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temps moyen par livraison
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45 min</div>
            <p className="text-xs text-muted-foreground">-5 min par rapport au mois dernier</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Note moyenne
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Basée sur 50 évaluations</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunités de livraison</TabsTrigger>
          <TabsTrigger value="history">Historique des livraisons</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities" className="space-y-4">
          {deliveryOpportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardContent className="flex justify-between items-center p-6">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>PX</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{opportunity.from} → {opportunity.to}</h3>
                    <p className="text-sm text-muted-foreground">{opportunity.date} • {opportunity.distance}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold">{opportunity.price}</span>
                  <Button size="sm">Accepter</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des livraisons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Dakar → Mbour</p>
                    <p className="text-sm text-muted-foreground">Effectuée le 12/06/2023</p>
                  </div>
                  <Badge>18000 FCFA</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Thiès → Touba</p>
                    <p className="text-sm text-muted-foreground">Effectuée le 08/06/2023</p>
                  </div>
                  <Badge>15000 FCFA</Badge>
                </li>
                <li className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">Saint-Louis → Louga</p>
                    <p className="text-sm text-muted-foreground">Effectuée le 05/06/2023</p>
                  </div>
                  <Badge>22000 FCFA</Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Renseigner mes trajets futurs</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Ajouter un trajet</Button>
        </CardContent>
      </Card>
    </div>
  )
}


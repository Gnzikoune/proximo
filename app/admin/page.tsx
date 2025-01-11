'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { toast } from '@/components/ui/use-toast'

type User = {
  id: number
  name: string
  email: string
  type: 'client' | 'transporteur'
  status: 'actif' | 'inactif'
}

type Delivery = {
  id: number
  from: string
  to: string
  status: 'en_attente' | 'en_cours' | 'terminée'
}

export default function AdminDashboard() {
  const [users] = useState<User[]>([
    { id: 1, name: 'Alice Dupont', email: 'alice@example.com', type: 'client', status: 'actif' },
    { id: 2, name: 'Bob Martin', email: 'bob@example.com', type: 'transporteur', status: 'actif' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', type: 'client', status: 'inactif' },
  ])

  const [deliveries] = useState<Delivery[]>([
    { id: 1, from: 'Paris', to: 'Lyon', status: 'en_cours' },
    { id: 2, from: 'Marseille', to: 'Nice', status: 'en_attente' },
    { id: 3, from: 'Bordeaux', to: 'Toulouse', status: 'terminée' },
  ])

  const handleUpdateTarifs = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    toast({
      title: "Tarifs mis à jour",
      description: "Les nouveaux tarifs ont été appliqués avec succès.",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Tableau de bord administrateur</h1>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="deliveries">Livraisons</TabsTrigger>
          <TabsTrigger value="stats">Statistiques</TabsTrigger>
          <TabsTrigger value="settings">Paramètres</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {users.map((user) => (
                  <li key={user.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${
                        user.status === 'actif' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                      <Button size="sm" variant="outline">Modifier</Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deliveries">
          <Card>
            <CardHeader>
              <CardTitle>Suivi des livraisons</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {deliveries.map((delivery) => (
                  <li key={delivery.id} className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Livraison #{delivery.id}</p>
                      <p className="text-sm text-gray-500">{delivery.from} → {delivery.to}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-sm ${
                      delivery.status === 'en_attente' ? 'bg-yellow-200 text-yellow-800' :
                      delivery.status === 'en_cours' ? 'bg-blue-200 text-blue-800' :
                      'bg-green-200 text-green-800'
                    }`}>
                      {delivery.status}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques de la plateforme</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">1,234</p>
                  <p className="text-sm text-gray-500">Utilisateurs inscrits</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">5,678</p>
                  <p className="text-sm text-gray-500">Livraisons effectuées</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">98%</p>
                  <p className="text-sm text-gray-500">Taux de satisfaction</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres de la plateforme</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateTarifs} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="baseTarif">Tarif de base</Label>
                  <Input id="baseTarif" type="number" min="0" step="0.01" placeholder="10.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kmTarif">Tarif par km</Label>
                  <Input id="kmTarif" type="number" min="0" step="0.01" placeholder="0.50" required />
                </div>
                <Button type="submit">Mettre à jour les tarifs</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}


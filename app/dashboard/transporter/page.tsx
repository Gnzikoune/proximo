'use client'

import { useState } from 'react'
import { useRequestStore } from '@/store/requestStore'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package, TrendingUp, Clock, Star, Truck, MapPin, User, Phone } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

export default function TransporterDashboard() {
  const [isAvailable, setIsAvailable] = useState(false)
  const requests = useRequestStore((state) => state.requests)
  const updateRequest = useRequestStore((state) => state.updateRequest)

  // Filtrer les demandes en attente
  const pendingRequests = requests.filter(request => request.status === 'pending')
  // Filtrer les demandes acceptées par ce transporteur
  const acceptedRequests = requests.filter(request => 
    request.status === 'accepted' && request.carrier?.id === 'TR-123' // À remplacer par l'ID réel du transporteur
  )

  const handleAcceptRequest = (requestId: string) => {
    if (!isAvailable) {
      toast({
        title: "Action impossible",
        description: "Vous devez être disponible pour accepter des demandes.",
        variant: "destructive"
      })
      return
    }

    updateRequest(requestId, {
      status: 'accepted',
      carrier: {
        id: 'TR-123', // À remplacer par l'ID réel du transporteur
        name: 'John Doe', // À remplacer par le nom réel du transporteur
        phone: '+221 77 000 00 00' // À remplacer par le numéro réel du transporteur
      }
    })

    toast({
      title: "Demande acceptée",
      description: "Vous avez accepté cette demande de livraison.",
    })
  }

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
            <div className="text-2xl font-bold">{acceptedRequests.length}</div>
            <p className="text-xs text-muted-foreground">Livraisons en cours</p>
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
            <div className="text-2xl font-bold">
              {acceptedRequests.reduce((sum, request) => sum + request.payment.amount, 0).toLocaleString('fr-FR')} FCFA
            </div>
            <p className="text-xs text-muted-foreground">Revenus des livraisons en cours</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Demandes en attente
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Opportunités disponibles</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Statut
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isAvailable ? 'Disponible' : 'Indisponible'}</div>
            <p className="text-xs text-muted-foreground">Status actuel</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4">
        <TabsList>
          <TabsTrigger value="opportunities">Opportunités de livraison</TabsTrigger>
          <TabsTrigger value="history">Mes livraisons en cours</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">Aucune demande disponible</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Il n'y a actuellement aucune demande de livraison en attente.
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">Demande #{request.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          Créée le {new Date(request.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-lg font-bold">
                        {request.payment.amount.toLocaleString('fr-FR')} FCFA
                      </Badge>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Adresse de départ</p>
                            <p className="text-sm text-muted-foreground">{request.sender.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Expéditeur</p>
                            <p className="text-sm text-muted-foreground">{request.sender.name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Téléphone</p>
                            <p className="text-sm text-muted-foreground">{request.sender.phone}</p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Adresse de livraison</p>
                            <p className="text-sm text-muted-foreground">{request.recipient.address}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Destinataire</p>
                            <p className="text-sm text-muted-foreground">{request.recipient.name}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                          <div>
                            <p className="font-medium">Téléphone</p>
                            <p className="text-sm text-muted-foreground">{request.recipient.phone}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={() => handleAcceptRequest(request.id)}
                        disabled={!isAvailable}
                      >
                        Accepter la demande
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          {acceptedRequests.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Truck className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">Aucune livraison en cours</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Vous n'avez pas encore accepté de demande de livraison.
                </p>
              </CardContent>
            </Card>
          ) : (
            acceptedRequests.map((request) => (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Livraison #{request.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        Acceptée le {new Date(request.updatedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <Badge>
                      {request.payment.amount.toLocaleString('fr-FR')} FCFA
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <p className="font-medium">{request.sender.address} → {request.recipient.address}</p>
                    <p className="text-sm text-muted-foreground">En cours de livraison</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}


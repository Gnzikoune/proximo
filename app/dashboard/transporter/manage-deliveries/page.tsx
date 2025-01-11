'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import { Package, Truck, MapPin, Calendar } from 'lucide-react'
import QRCodeGenerator from '@/components/QRCodeGenerator'

type Delivery = {
  id: string
  from: string
  to: string
  status: 'en_attente' | 'en_transit' | 'livré'
  details: string
  weight: number
  dimensions: string
  pickupDate: string
  deliveryDate: string
  senderName: string
  recipientName: string
}

export default function ManageDeliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([
    { 
      id: '1', 
      from: 'Dakar', 
      to: 'Thiès', 
      status: 'en_attente', 
      details: 'Colis fragile, 5kg', 
      weight: 5,
      dimensions: '30x20x15',
      pickupDate: '2023-06-20',
      deliveryDate: '2023-06-21',
      senderName: 'Alice Diop',
      recipientName: 'Moussa Sow'
    },
    { 
      id: '2', 
      from: 'Saint-Louis', 
      to: 'Louga', 
      status: 'en_transit', 
      details: 'Documents urgents', 
      weight: 1,
      dimensions: '25x35x5',
      pickupDate: '2023-06-19',
      deliveryDate: '2023-06-20',
      senderName: 'Fatou Diallo',
      recipientName: 'Ibrahima Ndiaye'
    },
    { 
      id: '3', 
      from: 'Ziguinchor', 
      to: 'Kolda', 
      status: 'livré', 
      details: 'Produits alimentaires', 
      weight: 10,
      dimensions: '40x30x20',
      pickupDate: '2023-06-18',
      deliveryDate: '2023-06-19',
      senderName: 'Omar Seck',
      recipientName: 'Aminata Ba'
    },
  ])

  const updateDeliveryStatus = (id: string, newStatus: Delivery['status']) => {
    setDeliveries(deliveries.map(delivery => 
      delivery.id === id ? { ...delivery, status: newStatus } : delivery
    ))
    toast({
      title: "Statut mis à jour",
      description: `La livraison #${id} est maintenant ${newStatus === 'en_attente' ? 'en attente' : newStatus === 'en_transit' ? 'en transit' : 'livrée'}.`,
    })
  }

  const reportProblem = (id: string) => {
    toast({
      title: "Problème signalé",
      description: `Un problème a été signalé pour la livraison #${id}. Notre équipe va vous contacter rapidement.`,
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Gestion des livraisons</h1>
      {deliveries.map((delivery) => (
        <Card key={delivery.id}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Livraison #{delivery.id}: {delivery.from} → {delivery.to}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="font-semibold">Détails:</p>
                <p>{delivery.details}</p>
              </div>
              <div>
                <p className="font-semibold">Dimensions:</p>
                <p>{delivery.dimensions}</p>
              </div>
              <div>
                <p className="font-semibold">Poids:</p>
                <p>{delivery.weight} kg</p>
              </div>
              <div>
                <p className="font-semibold">Statut:</p>
                <p>{delivery.status}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <div>
                  <p className="font-semibold">Expéditeur:</p>
                  <p>{delivery.senderName}</p>
                </div>
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2" />
                <div>
                  <p className="font-semibold">Destinataire:</p>
                  <p>{delivery.recipientName}</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <div>
                  <p className="font-semibold">Date de collecte:</p>
                  <p>{delivery.pickupDate}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-2" />
                <div>
                  <p className="font-semibold">Date de livraison:</p>
                  <p>{delivery.deliveryDate}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <RadioGroup
                value={delivery.status}
                onValueChange={(value) => updateDeliveryStatus(delivery.id, value as Delivery['status'])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en_attente" id={`en_attente-${delivery.id}`} />
                  <Label htmlFor={`en_attente-${delivery.id}`}>En attente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en_transit" id={`en_transit-${delivery.id}`} />
                  <Label htmlFor={`en_transit-${delivery.id}`}>En transit</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="livré" id={`livré-${delivery.id}`} />
                  <Label htmlFor={`livré-${delivery.id}`}>Livré</Label>
                </div>
              </RadioGroup>
              <Button variant="outline" onClick={() => reportProblem(delivery.id)}>
                Signaler un problème
              </Button>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">QR Code de la livraison</h3>
              <QRCodeGenerator
                deliveryInfo={{
                  id: delivery.id,
                  weight: delivery.weight,
                  dimensions: delivery.dimensions,
                  contentType: 'general',
                  sender: {
                    name: delivery.senderName,
                    contact: '[encrypted]',
                    address: delivery.from,
                  },
                  recipient: {
                    name: delivery.recipientName,
                    contact: '[encrypted]',
                    address: delivery.to,
                  },
                  pickup: {
                    address: delivery.from,
                    datetime: delivery.pickupDate,
                  },
                  delivery: {
                    address: delivery.to,
                    datetime: delivery.deliveryDate,
                  },
                  status: delivery.status,
                  validationCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
                  carrier: {
                    name: 'Nom du transporteur',
                    transportType: 'Véhicule',
                    vehicleInfo: 'Informations du véhicule',
                  },
                  payment: {
                    amount: 5000, // Exemple de montant
                    status: 'en_attente',
                  },
                  trackingUrl: `https://proximo.com/tracking/${delivery.id}`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


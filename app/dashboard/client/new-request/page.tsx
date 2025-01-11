'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from '@/components/ui/use-toast'
import QRCodeGenerator from '@/components/QRCodeGenerator'
import { v4 as uuidv4 } from 'uuid'

interface DeliveryInfo {
  id: string;
  weight: number;
  dimensions: string;
  contentType: string;
  sender: {
    name: string;
    contact: string;
    address: string;
  };
  recipient: {
    name: string;
    contact: string;
    address: string;
  };
  pickup: {
    address: string;
    datetime: string;
  };
  delivery: {
    address: string;
    datetime: string;
  };
  status: 'en_attente';
  validationCode: string;
  carrier: {
    name: string;
    transportType: string;
    vehicleInfo: string;
  };
  payment: {
    amount: number;
    status: 'en_attente';
  };
  trackingUrl: string;
}

export default function NewRequest() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simuler une requête de création de demande
    await new Promise(resolve => setTimeout(resolve, 2000))

    const deliveryInfo = {
      id: uuidv4(),
      weight: 5, // Exemple de poids
      dimensions: '30x20x10', // Exemple de dimensions
      contentType: 'general',
      sender: {
        name: 'John Doe',
        contact: '+221 70 123 45 67',
        address: 'Dakar, Sénégal',
      },
      recipient: {
        name: 'Jane Doe',
        contact: '+221 76 765 43 21',
        address: 'Thiès, Sénégal',
      },
      pickup: {
        address: 'Dakar, Sénégal',
        datetime: new Date().toISOString(),
      },
      delivery: {
        address: 'Thiès, Sénégal',
        datetime: new Date(Date.now() + 86400000).toISOString(), // +24 heures
      },
      status: 'en_attente' as const,
      validationCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      carrier: {
        name: 'À assigner',
        transportType: 'À déterminer',
        vehicleInfo: 'À déterminer',
      },
      payment: {
        amount: 5000, // Exemple de montant
        status: 'en_attente' as const,
      },
      trackingUrl: `https://proximo.com/tracking/${uuidv4()}`,
    }

    setDeliveryInfo(deliveryInfo)
    setIsLoading(false)
    toast({
      title: "Demande créée",
      description: "Votre demande de livraison a été créée avec succès.",
    })

    router.push('/dashboard/client')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle demande de livraison</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Adresse de départ</Label>
            <Input id="pickupAddress" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Adresse de destination</Label>
            <Input id="deliveryAddress" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="packageDetails">Détails du colis</Label>
          <Textarea id="packageDetails" placeholder="Dimensions, poids, type de contenu..." required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Nom du destinataire</Label>
            <Input id="recipientName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientEmail">Email du destinataire</Label>
            <Input id="recipientEmail" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientPhone">Téléphone du destinataire</Label>
            <Input id="recipientPhone" type="tel" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mode de livraison</Label>
          <RadioGroup defaultValue="pickup">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup">Enlèvement à domicile</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dropoff" id="dropoff" />
              <Label htmlFor="dropoff">Dépôt à un point de collecte</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-lg font-semibold mb-2">Estimation des frais de livraison</h2>
          <p className="text-2xl font-bold">5000 FCFA</p>
        </div>

        {deliveryInfo && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">QR Code de votre livraison</h3>
            <QRCodeGenerator deliveryInfo={deliveryInfo} />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Création en cours...' : 'Créer la demande'}
        </Button>
      </form>
    </div>
  )
}


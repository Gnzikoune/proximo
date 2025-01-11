'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/use-toast'
import { v4 as uuidv4 } from 'uuid'
import { useRequestStore } from '@/store/requestStore'
import { calculateDeliveryCost, estimateDistance, determineZone } from '@/utils/delivery-cost'

export default function NewRequest() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [estimatedCost, setEstimatedCost] = useState(2000)
  const addRequest = useRequestStore((state) => state.addRequest)

  // État pour les champs du formulaire
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    weight: '',
    dimensions: '',
    contentType: 'standard',
    isUrgent: false,
  })

  // Mettre à jour l'estimation des coûts lorsque les champs changent
  useEffect(() => {
    if (formData.pickupAddress && formData.deliveryAddress && formData.weight) {
      const distance = estimateDistance(formData.pickupAddress, formData.deliveryAddress)
      const zone = determineZone(formData.deliveryAddress)
      
      const cost = calculateDeliveryCost({
        weight: Number(formData.weight),
        dimensions: formData.dimensions,
        contentType: formData.contentType as any,
        distance,
        zone,
        isUrgent: formData.isUrgent
      })
      
      setEstimatedCost(cost)
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      contentType: value
    }))
  }

  const handleUrgentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      isUrgent: value === 'urgent'
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    const formDataObj = new FormData(event.currentTarget)
    
    const request = {
      id: uuidv4(),
      status: 'pending' as const,
      weight: Number(formData.weight),
      dimensions: formData.dimensions,
      contentType: formData.contentType,
      sender: {
        name: formDataObj.get('senderName') as string,
        contact: formDataObj.get('senderContact') as string,
        address: formData.pickupAddress,
      },
      recipient: {
        name: formDataObj.get('recipientName') as string,
        contact: formDataObj.get('recipientPhone') as string,
        address: formData.deliveryAddress,
      },
      pickup: {
        address: formData.pickupAddress,
        datetime: new Date().toISOString(),
      },
      delivery: {
        address: formData.deliveryAddress,
        datetime: new Date(Date.now() + 86400000).toISOString(),
      },
      destination: formData.deliveryAddress,
      date: new Date().toISOString(),
      validationCode: Math.random().toString(36).substr(2, 6).toUpperCase(),
      payment: {
        amount: estimatedCost,
        status: 'pending' as const,
      },
      trackingUrl: `https://proximo.com/tracking/${uuidv4()}`,
      amount: estimatedCost,
    }

    addRequest(request)

    setIsLoading(false)
    toast({
      title: "Demande créée",
      description: "Votre demande de livraison a été créée avec succès.",
    })

    router.push('/dashboard/client/requests')
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Créer une nouvelle demande de livraison</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="pickupAddress">Adresse de départ</Label>
            <Input 
              id="pickupAddress" 
              name="pickupAddress" 
              value={formData.pickupAddress}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deliveryAddress">Adresse de destination</Label>
            <Input 
              id="deliveryAddress" 
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Poids (kg)</Label>
            <Input 
              id="weight" 
              name="weight" 
              type="number"
              value={formData.weight}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions</Label>
            <Input 
              id="dimensions" 
              name="dimensions" 
              placeholder="LxlxH en cm"
              value={formData.dimensions}
              onChange={handleInputChange}
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contentType">Type de contenu</Label>
            <Select name="contentType" onValueChange={handleSelectChange} defaultValue="standard">
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="fragile">Fragile</SelectItem>
                <SelectItem value="valeur">Valeur</SelectItem>
                <SelectItem value="refrigere">Réfrigéré</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="senderName">Nom de l'expéditeur</Label>
            <Input id="senderName" name="senderName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="senderContact">Contact de l'expéditeur</Label>
            <Input id="senderContact" name="senderContact" type="tel" required />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="recipientName">Nom du destinataire</Label>
            <Input id="recipientName" name="recipientName" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipientPhone">Téléphone du destinataire</Label>
            <Input id="recipientPhone" name="recipientPhone" type="tel" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Type de livraison</Label>
          <RadioGroup defaultValue="standard" name="deliveryType" onValueChange={handleUrgentChange}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="standard" id="standard" />
              <Label htmlFor="standard">Standard</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="urgent" id="urgent" />
              <Label htmlFor="urgent">Urgent (+50%)</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="bg-gray-100 p-6 rounded-lg space-y-4">
          <h2 className="text-lg font-semibold">Estimation des frais de livraison</h2>
          <dl className="space-y-2">
            <div className="flex justify-between">
              <dt className="text-gray-600">Prix de base</dt>
              <dd>2000 FCFA</dd>
            </div>
            {formData.pickupAddress && formData.deliveryAddress && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Distance estimée</dt>
                <dd>{Math.round(estimateDistance(formData.pickupAddress, formData.deliveryAddress))} km</dd>
              </div>
            )}
            {formData.weight && (
              <div className="flex justify-between">
                <dt className="text-gray-600">Supplément poids</dt>
                <dd>+{Number(formData.weight) * 200} FCFA</dd>
              </div>
            )}
            <div className="pt-2 border-t">
              <div className="flex justify-between text-lg font-semibold">
                <dt>Total estimé</dt>
                <dd>{estimatedCost.toLocaleString('fr-FR')} FCFA</dd>
              </div>
            </div>
          </dl>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Création en cours...' : 'Créer la demande'}
        </Button>
      </form>
    </div>
  )
}


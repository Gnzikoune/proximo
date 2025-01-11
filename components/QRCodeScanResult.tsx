'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle2, XCircle, Package, MapPin, User, Truck, Clock } from "lucide-react"
import { DeliveryQRData } from "@/types/delivery"

interface QRCodeScanResultProps {
  isOpen: boolean
  onClose: () => void
  data: DeliveryQRData | null
}

export function QRCodeScanResult({ isOpen, onClose, data }: QRCodeScanResultProps) {
  if (!data) return null

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600'
      case 'in_progress':
        return 'text-blue-600'
      default:
        return 'text-yellow-600'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-600" />
      case 'in_progress':
        return <Clock className="w-6 h-6 text-blue-600" />
      default:
        return <XCircle className="w-6 h-6 text-yellow-600" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {getStatusIcon(data.status)}
            <span>Détails de la livraison</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Informations principales */}
          <div className="grid gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-gray-500" />
              <span className="font-medium">ID:</span>
              <code className="px-2 py-1 bg-gray-100 rounded">{data.id}</code>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Statut:</span>
              <span className={getStatusColor(data.status)}>
                {data.status === 'completed' ? 'Livré' : 
                 data.status === 'in_progress' ? 'En cours' : 'En attente'}
              </span>
            </div>
          </div>

          {/* Détails du colis */}
          <div className="grid gap-4 p-4 border rounded-lg">
            <h3 className="font-medium">Détails du colis</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Poids:</span>
                <p>{data.package?.weight || 'N/A'} kg</p>
              </div>
              <div>
                <span className="text-gray-500">Type:</span>
                <p>{data.package?.contentType || 'N/A'}</p>
              </div>
              <div>
                <span className="text-gray-500">Dimensions:</span>
                <p>
                  {data.package?.dimensions ? 
                    `${data.package.dimensions.length}x${data.package.dimensions.width}x${data.package.dimensions.height} cm` : 
                    'N/A'}
                </p>
              </div>
              <div>
                <span className="text-gray-500">Fragile:</span>
                <p>{data.package?.isFragile ? 'Oui' : 'Non'}</p>
              </div>
            </div>
          </div>

          {/* Expéditeur et Destinataire */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <User className="w-4 h-4" />
                Expéditeur
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Nom:</span> {data.sender?.name}</p>
                <p><span className="text-gray-500">Contact:</span> {data.sender?.contact}</p>
                <p className="flex gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  {data.sender?.address}
                </p>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <User className="w-4 h-4" />
                Destinataire
              </h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500">Nom:</span> {data.recipient?.name}</p>
                <p><span className="text-gray-500">Contact:</span> {data.recipient?.contact}</p>
                <p className="flex gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 shrink-0" />
                  {data.recipient?.address}
                </p>
              </div>
            </div>
          </div>

          {/* Transporteur */}
          {data.carrier && (
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium flex items-center gap-2 mb-3">
                <Truck className="w-4 h-4" />
                Transporteur
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><span className="text-gray-500">Nom:</span> {data.carrier.name}</p>
                <p><span className="text-gray-500">Contact:</span> {data.carrier.contact}</p>
                <p><span className="text-gray-500">Type:</span> {data.carrier.transportType}</p>
                <p><span className="text-gray-500">Véhicule:</span> {data.carrier.vehicleInfo}</p>
              </div>
            </div>
          )}

          {/* Paiement */}
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h3 className="font-medium">Paiement</h3>
              <p className="text-sm text-gray-500">
                {data.payment.status === 'paid' ? 'Payé' : 'En attente de paiement'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{data.payment.amount} {data.payment.currency}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 
'use client'

import { useParams } from 'next/navigation'
import { useRequestStore } from '@/store/requestStore'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Package, MapPin, Calendar, User, Truck } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { QRCodeDisplay } from '@/components/QRCodeDisplay'

function InfoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </Card>
  )
}

function InfoItem({ 
  label, 
  value, 
  icon: Icon, 
  className 
}: { 
  label: string
  value: string
  icon?: any
  className?: string
}) {
  return (
    <div className="flex items-start space-x-3">
      {Icon && <Icon className="w-5 h-5 text-gray-400 mt-0.5" />}
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={cn("mt-1", className)}>{value}</p>
      </div>
    </div>
  )
}

function RequestStatus({ status }: { status: string }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm ${
      status === 'completed' 
        ? 'bg-green-100 text-green-800'
        : status === 'in_progress'
        ? 'bg-blue-100 text-blue-800'
        : 'bg-yellow-100 text-yellow-800'
    }`}>
      {status === 'completed' 
        ? 'Complété'
        : status === 'in_progress'
        ? 'En cours'
        : 'En attente'}
    </span>
  )
}

export default function RequestDetails() {
  const params = useParams()
  const requests = useRequestStore((state) => state.requests)
  const request = requests.find((r) => r.id === params.id)

  if (!request) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/dashboard/client/requests" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux demandes
          </Link>
        </Button>
        <Card className="p-6">
          <p className="text-center text-gray-500">Demande non trouvée</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Button variant="ghost" asChild>
          <Link href="/dashboard/client/requests" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour aux demandes
          </Link>
        </Button>
        <RequestStatus status={request.status} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Informations principales */}
          <InfoSection title="Informations de la demande">
            <div className="grid gap-4 sm:grid-cols-2">
              <InfoItem 
                label="ID de la demande" 
                value={request.id}
                icon={Package}
                className="font-mono"
              />
              <InfoItem 
                label="Date de création" 
                value={new Date(request.date).toLocaleDateString()}
                icon={Calendar}
              />
              <InfoItem 
                label="Montant" 
                value={`${request.amount.toLocaleString('fr-FR')} FCFA`}
              />
              <InfoItem 
                label="Code de validation" 
                value={request.validationCode}
                className="font-mono"
              />
            </div>
          </InfoSection>

          {/* Détails du colis */}
          <InfoSection title="Détails du colis">
            <div className="grid gap-4 sm:grid-cols-3">
              <InfoItem 
                label="Poids" 
                value={`${request.weight} kg`}
                icon={Package}
              />
              <InfoItem 
                label="Dimensions" 
                value={request.dimensions}
              />
              <InfoItem 
                label="Type de contenu" 
                value={request.contentType}
              />
            </div>
          </InfoSection>

          {/* Adresses */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Expéditeur */}
            <InfoSection title="Expéditeur">
              <div className="space-y-4">
                <InfoItem 
                  label="Nom" 
                  value={request.sender.name}
                  icon={User}
                />
                <InfoItem 
                  label="Contact" 
                  value={request.sender.contact}
                />
                <InfoItem 
                  label="Adresse" 
                  value={request.sender.address}
                  icon={MapPin}
                />
              </div>
            </InfoSection>

            {/* Destinataire */}
            <InfoSection title="Destinataire">
              <div className="space-y-4">
                <InfoItem 
                  label="Nom" 
                  value={request.recipient.name}
                  icon={User}
                />
                <InfoItem 
                  label="Contact" 
                  value={request.recipient.contact}
                />
                <InfoItem 
                  label="Adresse" 
                  value={request.recipient.address}
                  icon={MapPin}
                />
              </div>
            </InfoSection>
          </div>

          {/* Transporteur */}
          {request.carrier && (
            <InfoSection title="Transporteur">
              <div className="grid gap-4 sm:grid-cols-3">
                <InfoItem 
                  label="Nom" 
                  value={request.carrier.name}
                  icon={Truck}
                />
                <InfoItem 
                  label="Type de transport" 
                  value={request.carrier.transportType}
                />
                <InfoItem 
                  label="Véhicule" 
                  value={request.carrier.vehicleInfo}
                />
              </div>
            </InfoSection>
          )}
        </div>

        {/* QR Code et validation */}
        <div className="space-y-6">
          <QRCodeDisplay data={request} />
          <InfoSection title="Étapes de validation">
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-3">1</div>
                <div>
                  <p className="font-medium">Création de la demande</p>
                  <p className="text-gray-500">{new Date(request.date).toLocaleString()}</p>
                </div>
              </div>
              <div className="ml-4 w-0.5 h-6 bg-gray-200 mx-auto" />
              <div className="flex items-center text-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  request.status === 'in_progress' || request.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-400'
                }`}>2</div>
                <div>
                  <p className="font-medium">Prise en charge</p>
                  {request.carrier && (
                    <p className="text-gray-500">Par {request.carrier.name}</p>
                  )}
                </div>
              </div>
              <div className="ml-4 w-0.5 h-6 bg-gray-200 mx-auto" />
              <div className="flex items-center text-sm">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  request.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-400'
                }`}>3</div>
                <div>
                  <p className="font-medium">Livraison</p>
                  <p className="text-gray-500">En attente de confirmation</p>
                </div>
              </div>
            </div>
          </InfoSection>
        </div>
      </div>
    </div>
  )
} 
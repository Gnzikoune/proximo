'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { QrCode, CheckCircle, XCircle } from 'lucide-react'

export default function DeliveryValidation() {
  const router = useRouter()
  const [qrCode, setQrCode] = useState('')
  const [deliveryDetails, setDeliveryDetails] = useState<null | {
    id: string
    from: string
    to: string
    date: string
    status: string
  }>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleScanQR = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simuler une requête pour obtenir les détails de la livraison
    await new Promise(resolve => setTimeout(resolve, 1000))
    setDeliveryDetails({
      id: 'DEL-123456',
      from: 'Dakar',
      to: 'Thiès',
      date: '2023-06-20',
      status: 'En cours'
    })
    setIsLoading(false)
  }

  const handleConfirmDelivery = async () => {
    setIsLoading(true)
    // Simuler une requête pour confirmer la livraison
    await new Promise(resolve => setTimeout(resolve, 1000))
    toast({
      title: "Livraison confirmée",
      description: "La livraison a été validée avec succès.",
    })
    setIsLoading(false)
    router.push('/dashboard')
  }

  const handleReportProblem = () => {
    router.push('/report-problem')
  }

  return (
    <div className="container mx-auto max-w-md py-10">
      <Card>
        <CardHeader>
          <CardTitle>Validation de la livraison</CardTitle>
          <CardDescription>Scannez le QR code pour valider la livraison</CardDescription>
        </CardHeader>
        <CardContent>
          {!deliveryDetails ? (
            <form onSubmit={handleScanQR}>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="qr-code">Code QR</Label>
                  <Input
                    id="qr-code"
                    placeholder="Scannez ou entrez le code QR"
                    value={qrCode}
                    onChange={(e) => setQrCode(e.target.value)}
                  />
                </div>
                <Button type="submit" size="icon" disabled={isLoading}>
                  <QrCode className="h-4 w-4" />
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <Label>ID de livraison</Label>
                <p className="text-sm font-medium">{deliveryDetails.id}</p>
              </div>
              <div>
                <Label>De</Label>
                <p className="text-sm font-medium">{deliveryDetails.from}</p>
              </div>
              <div>
                <Label>À</Label>
                <p className="text-sm font-medium">{deliveryDetails.to}</p>
              </div>
              <div>
                <Label>Date</Label>
                <p className="text-sm font-medium">{deliveryDetails.date}</p>
              </div>
              <div>
                <Label>Statut</Label>
                <p className="text-sm font-medium">{deliveryDetails.status}</p>
              </div>
            </div>
          )}
        </CardContent>
        {deliveryDetails && (
          <CardFooter className="flex justify-between">
            <Button onClick={handleConfirmDelivery} disabled={isLoading}>
              <CheckCircle className="mr-2 h-4 w-4" />
              Confirmer la réception
            </Button>
            <Button variant="outline" onClick={handleReportProblem}>
              <XCircle className="mr-2 h-4 w-4" />
              Signaler un problème
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}


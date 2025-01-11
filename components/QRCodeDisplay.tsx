'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Download, Scan, Lock } from 'lucide-react'
import { useRef } from 'react'
import { DeliveryQRData } from '@/types/delivery'
import { encryptData } from '@/lib/crypto'

// Interface temporaire pour la transition
interface LegacyDeliveryData {
  id: string
  validationCode: string
  status: string
  amount?: number
  sender?: {
    name: string
    contact: string
  }
  recipient?: {
    name: string
    contact: string
  }
  payment?: {
    amount: number
    status: string
  }
}

interface QRCodeDisplayProps {
  data: LegacyDeliveryData
  size?: number
  showDetails?: boolean
}

export function QRCodeDisplay({ data, size = 200, showDetails = false }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null)

  const downloadQR = () => {
    if (!qrRef.current) return
    
    const canvas = qrRef.current.querySelector('canvas')
    if (!canvas) return

    const image = canvas.toDataURL("image/png")
    const link = document.createElement('a')
    link.href = image
    link.download = `proximo-delivery-${data.id}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Créer un objet avec les informations essentielles pour le QR code
  const qrData = {
    id: data.id,
    validationCode: data.validationCode,
    status: data.status,
    recipient: data.recipient || {
      name: '',
      contact: ''
    },
    payment: {
      amount: data.payment?.amount || data.amount || 0,
      status: data.payment?.status || 'pending'
    },
    version: '1.0'
  }

  // Encoder et crypter les données
  const encryptedData = encryptData(JSON.stringify(qrData))

  return (
    <Card className="p-6 flex flex-col items-center space-y-4">
      <div ref={qrRef} className="bg-white p-4 rounded-lg">
        <QRCodeSVG
          value={encryptedData}
          size={size}
          level="H"
          includeMargin
          imageSettings={{
            src: "/logo.png",
            x: undefined,
            y: undefined,
            height: 24,
            width: 24,
            excavate: true,
          }}
        />
      </div>
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Lock className="w-4 h-4 text-gray-500" />
          <p className="text-sm text-gray-500">Code de validation</p>
        </div>
        <p className="font-mono text-lg font-bold">{data.validationCode}</p>
      </div>
      {showDetails && (
        <div className="w-full text-sm space-y-2 border-t pt-4 mt-4">
          <p><strong>ID:</strong> {data.id}</p>
          <p><strong>Statut:</strong> {data.status}</p>
          {data.payment?.amount && (
            <p><strong>Montant:</strong> {data.payment.amount} FCFA</p>
          )}
        </div>
      )}
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={downloadQR}>
          <Download className="w-4 h-4 mr-2" />
          Télécharger
        </Button>
        <Button variant="default" size="sm">
          <Scan className="w-4 h-4 mr-2" />
          Scanner
        </Button>
      </div>
    </Card>
  )
} 
'use client'

import { useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { decryptData } from '@/lib/crypto'
import { DeliveryQRData } from '@/types/delivery'
import { QRCodeScanResult } from './QRCodeScanResult'

interface QRCodeScannerProps {
  onScanSuccess?: (result: DeliveryQRData) => void
  onScanError?: (error: string) => void
}

export function QRCodeScanner({ onScanSuccess, onScanError }: QRCodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<DeliveryQRData | null>(null)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (!isScanning) return

    const scanner = new Html5QrcodeScanner('qr-reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
      rememberLastUsedCamera: true,
      aspectRatio: 1
    }, false);

    scanner.render(
      (decodedText) => {
        try {
          // Décrypter les données
          const decryptedData = decryptData(decodedText)
          // Parser les données JSON
          const result = JSON.parse(decryptedData) as DeliveryQRData
          
          // Vérifier la version et la structure des données
          if (!result.version || !result.id || !result.validationCode) {
            throw new Error('Format de QR code invalide')
          }

          // Simuler des données complètes pour la démo
          const completeData: DeliveryQRData = {
            ...result,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            package: {
              weight: 2.5,
              dimensions: {
                length: 30,
                width: 20,
                height: 15
              },
              contentType: 'Électronique',
              isFragile: true
            },
            sender: {
              name: 'Jean Dupont',
              address: '123 Rue du Commerce, Abidjan',
              contact: '+225 0123456789'
            },
            recipient: result.recipient || {
              name: 'Marie Koné',
              address: '456 Avenue Centrale, Abidjan',
              contact: '+225 9876543210'
            },
            carrier: {
              id: 'TR-123',
              name: 'Express Delivery',
              transportType: 'Moto',
              contact: '+225 5555555555',
              vehicleInfo: 'Yamaha 125cc'
            },
            payment: {
              amount: result.payment?.amount || 5000,
              status: result.payment?.status || 'pending',
              currency: 'FCFA'
            },
            tracking: [
              {
                timestamp: new Date().toISOString(),
                location: {
                  latitude: 5.316667,
                  longitude: -4.033333
                },
                status: 'in_progress',
                description: 'Colis en cours de livraison'
              }
            ],
            status: result.status || 'pending',
            version: '1.0'
          }

          setScanResult(completeData)
          setShowResult(true)
          onScanSuccess?.(completeData)
          scanner.clear()
          setIsScanning(false)
          toast.success('QR Code scanné avec succès')
        } catch (error) {
          onScanError?.('Format de QR code invalide')
          toast.error('Format de QR code invalide')
        }
      },
      (error) => {
        if (typeof error === 'string') {
          onScanError?.(error)
        } else {
          onScanError?.('Erreur lors du scan')
        }
      }
    )

    return () => {
      scanner.clear()
    }
  }, [isScanning, onScanSuccess, onScanError])

  return (
    <>
      <Card className="p-6">
        <div className="space-y-4">
          {!isScanning ? (
            <Button onClick={() => setIsScanning(true)} className="w-full">
              Démarrer le scan
            </Button>
          ) : (
            <>
              <div id="qr-reader" className="w-full max-w-sm mx-auto" />
              <Button 
                variant="outline" 
                onClick={() => setIsScanning(false)} 
                className="w-full"
              >
                Arrêter le scan
              </Button>
            </>
          )}
        </div>
      </Card>

      <QRCodeScanResult
        isOpen={showResult}
        onClose={() => setShowResult(false)}
        data={scanResult}
      />
    </>
  )
} 
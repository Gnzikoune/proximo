'use client'

import { useState } from 'react'
import { QRCodeScanner } from '@/components/QRCodeScanner'
import { validateDeliveryCode, getValidationHistory } from '@/lib/services/validation'
import { Card } from '@/components/ui/card'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

interface ValidationHistoryItem {
  requestId: string
  timestamp: string
  status: 'success' | 'failed'
}

export default function ValidateDelivery() {
  const { user } = useAuth()
  const [history, setHistory] = useState<ValidationHistoryItem[]>([])

  const handleScanSuccess = async (result: any) => {
    try {
      const validationResult = await validateDeliveryCode(
        result.id,
        result.validationCode,
        user?.id || 'unknown'
      )

      if (validationResult.success) {
        toast.success(validationResult.message)
        // Mettre à jour l'historique
        const newHistory = getValidationHistory()
          .map(item => ({
            requestId: item.requestId,
            timestamp: item.timestamp,
            status: item.status
          }))
        setHistory(newHistory)
      } else {
        toast.error(validationResult.message)
      }
    } catch (error) {
      toast.error('Erreur lors de la validation')
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Validation des livraisons</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold mb-4">Scanner un QR code</h2>
          <QRCodeScanner 
            onScanSuccess={handleScanSuccess}
            onScanError={(error) => toast.error(error)}
          />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Historique des validations</h2>
          <Card className="p-4">
            <div className="space-y-4">
              {history.length === 0 ? (
                <p className="text-gray-500 text-center">Aucune validation</p>
              ) : (
                history.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-2 border-b last:border-0"
                  >
                    <div>
                      <p className="font-mono text-sm">{item.requestId}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.status === 'success'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status === 'success' ? 'Validé' : 'Échec'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
} 
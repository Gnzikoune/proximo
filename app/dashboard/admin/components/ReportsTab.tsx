'use client'

import { useRequestStore } from '@/store/requestStore'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function ReportsTab() {
  const requests = useRequestStore((state) => state.requests)
  
  // Statistiques
  const totalRequests = requests.length
  const pendingRequests = requests.filter(r => r.status === 'pending').length
  const acceptedRequests = requests.filter(r => r.status === 'accepted').length
  const completedRequests = requests.filter(r => r.status === 'completed').length
  const totalRevenue = requests
    .filter(r => r.payment.status === 'completed')
    .reduce((sum, r) => sum + r.payment.amount, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Statistiques des livraisons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Par statut</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
                  <p className="text-sm text-gray-500">En attente</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{acceptedRequests}</p>
                  <p className="text-sm text-gray-500">En cours</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{completedRequests}</p>
                  <p className="text-sm text-gray-500">Terminées</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Performance</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Taux de livraison</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Délai moyen</span>
                  <span className="font-medium">2.3 jours</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Satisfaction client</span>
                  <span className="font-medium">4.8/5</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques financières</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Revenus</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {totalRevenue.toLocaleString('fr-FR')} FCFA
                  </p>
                  <p className="text-sm text-gray-500">Total</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">
                    {(totalRevenue / requests.length).toLocaleString('fr-FR')} FCFA
                  </p>
                  <p className="text-sm text-gray-500">Moyenne par livraison</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">Paiements</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Taux de conversion</span>
                  <span className="font-medium">95%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Délai moyen de paiement</span>
                  <span className="font-medium">1.5 jours</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Card } from '@/components/ui/card'
import { useRequestStore } from '@/store/requestStore'

export default function ClientDashboard() {
  const { user } = useAuth()
  const requests = useRequestStore((state) => state.requests)
  
  const pendingRequests = requests.filter(r => r.status === 'pending').length
  const completedRequests = requests.filter(r => r.status === 'completed').length
  const pendingPayments = requests.filter(r => r.payment.status === 'pending').length

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Bienvenue, {user?.email}</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Demandes en cours</h3>
          <p className="text-2xl font-bold">{pendingRequests}</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Demandes complétées</h3>
          <p className="text-2xl font-bold">{completedRequests}</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-2">Paiements en attente</h3>
          <p className="text-2xl font-bold">{pendingPayments}</p>
        </Card>
      </div>
    </div>
  )
}


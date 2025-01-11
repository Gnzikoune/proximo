'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, TrendingUp, Clock } from 'lucide-react'
import dynamic from 'next/dynamic'
import { RecentRequests } from '@/components/RecentRequests'
import { useToast } from '@/hooks/use-toast'

const DynamicMap = dynamic(() => import('@/components/Map'), {
  loading: () => <p>Chargement de la carte...</p>,
  ssr: false
})

interface Request {
  id: string
  status: 'pending' | 'in_progress' | 'delivered'
  destination: string
  date: string
  amount: number
}

export default function ClientDashboard() {
  const [requests, setRequests] = useState<Request[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/requests')
        const data = await response.json()
        setRequests(data)
      } catch (error) {
        toast({
          title: "Erreur",
          description: "Impossible de charger les demandes récentes",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchRequests()

    // Simuler des mises à jour périodiques
    const interval = setInterval(fetchRequests, 30000) // Rafraîchir toutes les 30 secondes

    return () => {
      clearInterval(interval)
    }
  }, [toast])

  // Calculer les statistiques à partir des données fictives
  const inProgressCount = requests.filter(r => r.status === 'in_progress').length
  const totalAmount = requests
    .filter(r => {
      const requestDate = new Date(r.date)
      const now = new Date()
      return requestDate.getMonth() === now.getMonth() && 
             requestDate.getFullYear() === now.getFullYear()
    })
    .reduce((sum, r) => sum + r.amount, 0)

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <Button asChild>
          <Link href="/dashboard/client/new-request">
            <Package className="mr-2 h-4 w-4" /> Nouvelle demande
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Livraisons en cours
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inProgressCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dépenses du mois
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAmount.toLocaleString('fr-FR')} FCFA</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Temps moyen de livraison
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.5 heures</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Satisfaction client
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading ? (
          <div>Chargement des demandes...</div>
        ) : (
          <RecentRequests requests={requests} />
        )}
        <DynamicMap />
      </div>
    </div>
  )
}


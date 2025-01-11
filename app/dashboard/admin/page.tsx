'use client'

import { useRequestStore } from '@/store/requestStore'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Package,
  Users,
  Truck,
  TrendingUp,
} from 'lucide-react'
import { RequestsTab } from './components/RequestsTab'
import { UsersTab } from './components/UsersTab'
import { PaymentsTab } from './components/PaymentsTab'
import { ReportsTab } from './components/ReportsTab'

export default function AdminDashboard() {
  const requests = useRequestStore((state) => state.requests)
  
  // Statistiques globales
  const totalRequests = requests.length
  const pendingRequests = requests.filter(r => r.status === 'pending').length
  const acceptedRequests = requests.filter(r => r.status === 'accepted').length
  const completedRequests = requests.filter(r => r.status === 'completed').length
  const totalRevenue = requests
    .filter(r => r.payment.status === 'completed')
    .reduce((sum, r) => sum + r.payment.amount, 0)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tableau de bord Administrateur</h1>

      {/* Statistiques générales */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total des demandes
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests}</div>
            <div className="text-xs text-muted-foreground mt-1">
              {pendingRequests} en attente • {acceptedRequests} en cours • {completedRequests} terminées
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Chiffre d'affaires
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRevenue.toLocaleString('fr-FR')} FCFA</div>
            <p className="text-xs text-muted-foreground">Total des paiements reçus</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Clients actifs
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 nouveaux cette semaine</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Transporteurs actifs
            </CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 disponibles actuellement</p>
          </CardContent>
        </Card>
      </div>

      {/* Tableau de bord principal */}
      <Tabs defaultValue="requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="requests">Demandes de livraison</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="payments">Paiements</TabsTrigger>
          <TabsTrigger value="reports">Rapports</TabsTrigger>
        </TabsList>

        <TabsContent value="requests">
          <RequestsTab />
        </TabsContent>

        <TabsContent value="users">
          <UsersTab />
        </TabsContent>

        <TabsContent value="payments">
          <PaymentsTab />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsTab />
        </TabsContent>
      </Tabs>
    </div>
  )
} 